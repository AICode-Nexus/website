import path from 'node:path';
import {readdir} from 'node:fs/promises';
import {
  fileExists,
  formatIsoDate,
  listMarkdownFiles,
  parseArgs,
  readJson,
  readMarkdownDocument,
  workspaceRoot,
  writeTextFile,
} from '../content/lib/content-utils.mjs';

const METRICS_DIR = path.join(workspaceRoot, 'content-sources', 'analytics');
const DAILY_MANIFEST_ROOT = path.join(workspaceRoot, 'content-sources', 'daily');
const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const GAPS_DIR = path.join(METRICS_DIR, 'gaps');
const LOOKBACK_DAYS = 14;

function addDaysStr(dateStr, days) {
  const d = new Date(dateStr);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

async function loadRecentSignalTags(date) {
  const startDate = addDaysStr(date, -LOOKBACK_DAYS);
  const tagCounts = new Map();

  if (!(await fileExists(DAILY_MANIFEST_ROOT))) return tagCounts;

  const files = await readdir(DAILY_MANIFEST_ROOT);
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const fileDate = file.slice(0, 10);
    if (fileDate < startDate || fileDate > date) continue;

    try {
      const manifest = await readJson(path.join(DAILY_MANIFEST_ROOT, file));
      for (const signal of manifest.signals ?? []) {
        for (const tag of signal.tags ?? []) {
          tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
        }
      }
    } catch { /* skip */ }
  }

  return tagCounts;
}

async function loadDocCoverage() {
  const coverage = new Map();
  if (!(await fileExists(DOCS_ROOT))) return coverage;

  const files = await listMarkdownFiles(DOCS_ROOT);
  for (const filePath of files) {
    try {
      const doc = await readMarkdownDocument(filePath);
      const domain = doc.frontMatter.domain;
      if (domain) {
        coverage.set(domain, (coverage.get(domain) ?? 0) + 1);
      }
    } catch { /* skip */ }
  }

  return coverage;
}

async function loadLatestMetrics() {
  if (!(await fileExists(METRICS_DIR))) return null;
  const files = await readdir(METRICS_DIR);
  const metricFiles = files.filter((f) => f.endsWith('-metrics.json')).sort().reverse();
  if (metricFiles.length === 0) return null;
  return readJson(path.join(METRICS_DIR, metricFiles[0]));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  const {mkdir} = await import('node:fs/promises');
  await mkdir(GAPS_DIR, {recursive: true});

  const signalTags = await loadRecentSignalTags(date);
  const docCoverage = await loadDocCoverage();
  const metrics = await loadLatestMetrics();

  // Identify high-signal topics with low doc coverage
  const gaps = [];

  const tagToDomain = {
    agent: 'development-modes',
    copilot: 'tools',
    vscode: 'tools',
    codex: 'tools',
    mcp: 'architecture',
    model: 'development-modes',
    security: 'standards',
    workflow: 'workflows',
  };

  for (const [tag, count] of signalTags.entries()) {
    if (count < 3) continue; // Only consider frequently mentioned topics

    const domain = tagToDomain[tag] ?? 'ecosystem';
    const docCount = docCoverage.get(domain) ?? 0;

    // High signal frequency + relatively low doc count = gap
    gaps.push({
      topic: tag,
      signalFrequency: count,
      domain,
      existingDocCount: docCount,
      priority: count / Math.max(docCount, 1),
    });
  }

  // Also check for high-traffic pages with no related deep content
  const searchGaps = [];
  if (metrics?.pages) {
    const highTrafficDocs = metrics.pages
      .filter((p) => p.path.startsWith('/docs/') && p.pageviews >= 20)
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 10);

    for (const page of highTrafficDocs) {
      if (page.bounceRate > 0.6) {
        searchGaps.push({
          path: page.path,
          pageviews: page.pageviews,
          bounceRate: page.bounceRate,
          suggestion: 'High traffic but high bounce — may need deeper content or better internal linking',
        });
      }
    }
  }

  const report = {
    date,
    lookbackDays: LOOKBACK_DAYS,
    topicGaps: gaps.sort((a, b) => b.priority - a.priority).slice(0, 10),
    engagementGaps: searchGaps,
    totalSignalTags: signalTags.size,
    totalDocs: Array.from(docCoverage.values()).reduce((sum, n) => sum + n, 0),
  };

  const outputPath = path.join(GAPS_DIR, `${date}-content-gaps.json`);
  await writeTextFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Content gap analysis: ${path.relative(workspaceRoot, outputPath)}`);
  console.log(`Topic gaps: ${report.topicGaps.length}, Engagement gaps: ${report.engagementGaps.length}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
