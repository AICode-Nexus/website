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
import {llmGenerate} from '../content/llm-writer.mjs';

const METRICS_DIR = path.join(workspaceRoot, 'content-sources', 'analytics');
const EXPERIMENTS_PATH = path.join(METRICS_DIR, 'active-experiments.json');
const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const MAX_EXPERIMENTS_PER_RUN = 3;

async function loadLatestMetrics() {
  if (!(await fileExists(METRICS_DIR))) return null;
  const files = await readdir(METRICS_DIR);
  const metricFiles = files.filter((f) => f.endsWith('-metrics.json')).sort().reverse();
  if (metricFiles.length === 0) return null;
  return readJson(path.join(METRICS_DIR, metricFiles[0]));
}

async function loadExperiments() {
  if (!(await fileExists(EXPERIMENTS_PATH))) return {experiments: []};
  return readJson(EXPERIMENTS_PATH);
}

async function saveExperiments(data) {
  await writeTextFile(EXPERIMENTS_PATH, `${JSON.stringify(data, null, 2)}\n`);
}

function findLowPerformingPages(metrics) {
  if (!metrics || !metrics.pages) return [];

  // Find docs pages with low engagement
  return metrics.pages
    .filter((p) => p.path.startsWith('/docs/') && p.pageviews >= 5)
    .filter((p) => p.bounceRate > 0.7 || p.avgDuration < 30)
    .sort((a, b) => b.pageviews - a.pageviews)
    .slice(0, 10);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  const {mkdir} = await import('node:fs/promises');
  await mkdir(METRICS_DIR, {recursive: true});

  const metrics = await loadLatestMetrics();
  const experimentData = await loadExperiments();

  // Filter out pages that already have active experiments
  const activePages = new Set(experimentData.experiments.map((e) => e.pagePath));
  const candidates = findLowPerformingPages(metrics).filter((p) => !activePages.has(p.path));

  if (candidates.length === 0) {
    console.log('No SEO experiment candidates found.');
    return;
  }

  const toOptimize = candidates.slice(0, MAX_EXPERIMENTS_PER_RUN);
  console.log(`Running SEO experiments on ${toOptimize.length} pages...`);

  for (const page of toOptimize) {
    // Find the corresponding doc file
    const docPath = page.path.replace(/\/$/, '').replace(/^\//, '');
    const possiblePaths = [
      path.join(workspaceRoot, `${docPath}.md`),
      path.join(workspaceRoot, `${docPath}/index.md`),
    ];

    let filePath = null;
    for (const p of possiblePaths) {
      if (await fileExists(p)) {
        filePath = p;
        break;
      }
    }

    if (!filePath) {
      console.warn(`Doc file not found for ${page.path}`);
      continue;
    }

    const doc = await readMarkdownDocument(filePath);
    const originalTitle = doc.frontMatter.title || '';
    const originalDescription = doc.frontMatter.description || '';

    try {
      const result = await llmGenerate({
        promptName: 'seo-optimizer',
        userMessage: JSON.stringify({
          pagePath: page.path,
          currentTitle: originalTitle,
          currentDescription: originalDescription,
          pageviews: page.pageviews,
          bounceRate: page.bounceRate,
          avgDuration: page.avgDuration,
        }),
      });

      if (!result || (!result.title && !result.description)) continue;

      // Record the experiment before applying changes
      experimentData.experiments.push({
        pagePath: page.path,
        filePath: path.relative(workspaceRoot, filePath),
        startDate: date,
        originalTitle,
        originalDescription,
        newTitle: result.title || originalTitle,
        newDescription: result.description || originalDescription,
        baselineMetrics: {
          pageviews: page.pageviews,
          bounceRate: page.bounceRate,
          avgDuration: page.avgDuration,
        },
        status: 'active',
      });

      // Apply changes to the file
      let content = doc.source;
      if (result.title && result.title !== originalTitle) {
        content = content.replace(
          new RegExp(`title:\\s*['"]?${escapeRegExp(originalTitle)}['"]?`, 'u'),
          `title: '${result.title}'`,
        );
      }
      if (result.description && result.description !== originalDescription) {
        content = content.replace(
          new RegExp(`description:\\s*['"]?${escapeRegExp(originalDescription)}['"]?`, 'u'),
          `description: '${result.description}'`,
        );
      }

      await writeTextFile(filePath, content);
      console.log(`SEO experiment applied: ${page.path}`);
    } catch (error) {
      console.warn(`SEO experiment failed for ${page.path}: ${error instanceof Error ? error.message : error}`);
    }
  }

  await saveExperiments(experimentData);
  console.log(`Active experiments: ${experimentData.experiments.length}`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
