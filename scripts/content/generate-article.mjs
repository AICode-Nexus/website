import path from 'node:path';
import {readdir} from 'node:fs/promises';
import {
  fileExists,
  formatIsoDate,
  listMarkdownFiles,
  parseArgs,
  readJson,
  readMarkdownDocument,
  serializeFrontMatter,
  slugify,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';
import {generateArticleContent} from './llm-writer.mjs';

const DAILY_MANIFEST_ROOT = path.join(workspaceRoot, 'content-sources', 'daily');
const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const LOGS_PATH = path.join(workspaceRoot, 'logs', 'auto-article-failures.json');
const MAX_ARTICLES_PER_RUN = 1;
const LOOKBACK_DAYS = 7;
const MIN_TOPIC_FREQUENCY = 2;

const DOMAIN_CONTENT_FORM_MAP = {
  'development-modes': 'guide',
  workflows: 'playbook',
  tools: 'comparison',
  standards: 'guide',
  architecture: 'guide',
  ecosystem: 'insight',
};

function addDaysLocal(dateStr, days) {
  const date = new Date(dateStr);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function loadRecentManifests(date) {
  const startDate = addDaysLocal(date, -LOOKBACK_DAYS);
  if (!(await fileExists(DAILY_MANIFEST_ROOT))) {
    return [];
  }

  const files = await readdir(DAILY_MANIFEST_ROOT);
  const manifests = [];

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const fileDate = file.slice(0, 10);
    if (fileDate < startDate || fileDate > date) continue;

    try {
      const manifest = await readJson(path.join(DAILY_MANIFEST_ROOT, file));
      manifests.push(manifest);
    } catch {
      // skip malformed manifests
    }
  }

  return manifests;
}

function extractTopicFrequency(manifests) {
  const tagCounts = new Map();
  const tagSignals = new Map();

  for (const manifest of manifests) {
    const signals = manifest.signals ?? [];
    for (const signal of signals) {
      for (const tag of signal.tags ?? []) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
        if (!tagSignals.has(tag)) tagSignals.set(tag, []);
        tagSignals.get(tag).push({
          title: signal.title,
          summary: signal.summary,
          date: manifest.date,
        });
      }
    }
  }

  return Array.from(tagCounts.entries())
    .filter(([, count]) => count >= MIN_TOPIC_FREQUENCY)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({tag, count, signals: tagSignals.get(tag)}));
}

async function collectExistingDocTitles() {
  const titles = [];
  if (!(await fileExists(DOCS_ROOT))) return titles;

  const files = await listMarkdownFiles(DOCS_ROOT);
  for (const filePath of files) {
    try {
      const doc = await readMarkdownDocument(filePath);
      if (doc.frontMatter.title) {
        titles.push(doc.frontMatter.title);
      }
    } catch {
      // skip unreadable docs
    }
  }

  return titles;
}

function inferDomain(tag) {
  const domainMap = {
    agent: 'development-modes',
    copilot: 'tools',
    vscode: 'tools',
    codex: 'tools',
    mcp: 'architecture',
    model: 'development-modes',
    security: 'standards',
    workflow: 'workflows',
  };
  return domainMap[tag] ?? 'ecosystem';
}

async function logFailure(entry) {
  let failures = [];
  if (await fileExists(LOGS_PATH)) {
    try {
      failures = await readJson(LOGS_PATH);
    } catch {
      failures = [];
    }
  }

  failures.push({...entry, timestamp: new Date().toISOString()});
  // Keep last 50 failures
  if (failures.length > 50) failures = failures.slice(-50);
  await writeTextFile(LOGS_PATH, `${JSON.stringify(failures, null, 2)}\n`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  console.log(`Analyzing daily brief manifests from last ${LOOKBACK_DAYS} days...`);
  const manifests = await loadRecentManifests(date);

  if (manifests.length === 0) {
    console.log('No recent daily brief manifests found. Skipping article generation.');
    return;
  }

  const topics = extractTopicFrequency(manifests);
  if (topics.length === 0) {
    console.log(`No topics appeared ${MIN_TOPIC_FREQUENCY}+ times. Skipping article generation.`);
    return;
  }

  console.log(`Found ${topics.length} recurring topics: ${topics.map((t) => `${t.tag}(${t.count})`).join(', ')}`);

  const existingDocs = await collectExistingDocTitles();
  let articlesGenerated = 0;

  for (const topic of topics) {
    if (articlesGenerated >= MAX_ARTICLES_PER_RUN) break;

    const domain = inferDomain(topic.tag);
    const contentForm = DOMAIN_CONTENT_FORM_MAP[domain] ?? 'guide';

    console.log(`Generating article for topic "${topic.tag}" in domain "${domain}"...`);

    try {
      const result = await generateArticleContent({
        topic: topic.tag,
        domain,
        contentForm,
        signals: topic.signals.slice(0, 8),
        existingDocs: existingDocs.slice(0, 30),
      });

      if (!result || !result.body) {
        console.warn(`LLM returned empty result for topic "${topic.tag}". Skipping.`);
        continue;
      }

      const articleSlug = slugify(result.title || topic.tag);
      const articleDomain = result.domain || domain;
      const articleDir = path.join(DOCS_ROOT, articleDomain);

      if (!(await fileExists(articleDir))) {
        console.warn(`Domain directory ${articleDomain} does not exist. Skipping.`);
        continue;
      }

      const frontMatter = serializeFrontMatter({
        title: result.title,
        description: result.description,
        domain: articleDomain,
        journey_stage: result.journeyStage || 'implementation',
        entry_role: result.entryRole || 'developer',
        content_form: result.contentForm || contentForm,
        reviewed_at: date,
      });

      const markdown = `${frontMatter.trimEnd()}\n\n${result.body}\n`;
      const outputPath = path.join(articleDir, `${articleSlug}.md`);

      await writeTextFile(outputPath, markdown);
      console.log(`Article generated: ${path.relative(workspaceRoot, outputPath)}`);
      articlesGenerated += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to generate article for "${topic.tag}": ${message}`);
      await logFailure({topic: topic.tag, domain, error: message});
    }
  }

  console.log(`Articles generated this run: ${articlesGenerated}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
