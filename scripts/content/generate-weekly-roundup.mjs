import path from 'node:path';
import {
  addDays,
  fileExists,
  formatIsoDate,
  inferDateFromFileName,
  listMarkdownFiles,
  mondayForDate,
  parseArgs,
  readJson,
  readMarkdownDocument,
  serializeFrontMatter,
  slugify,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';
import {generateWeeklyRoundupContent} from './llm-writer.mjs';

const DAILY_ROOT = path.join(workspaceRoot, 'blog', 'daily');
const DAILY_MANIFEST_ROOT = path.join(workspaceRoot, 'content-sources', 'daily');
const WATCHLIST_PATH = path.join(workspaceRoot, 'content-sources', 'source-watchlist.json');

function inRange(date, start, end) {
  return date >= start && date <= end;
}

async function collectDailyPosts(startDate, endDate) {
  if (!(await fileExists(DAILY_ROOT))) {
    return [];
  }

  const files = await listMarkdownFiles(DAILY_ROOT);
  const posts = [];

  for (const filePath of files) {
    const fileDate = inferDateFromFileName(filePath);
    if (!fileDate || !inRange(fileDate, startDate, endDate)) {
      continue;
    }

    const document = await readMarkdownDocument(filePath);
    if (document.frontMatter.draft === true) {
      continue;
    }

    posts.push({
      date: fileDate,
      slug: document.frontMatter.slug,
      title: document.frontMatter.title,
      description: document.frontMatter.description,
    });
  }

  return posts.sort((left, right) => left.date.localeCompare(right.date));
}

async function loadManifest(manifestPath, weekEnding) {
  if (await fileExists(manifestPath)) {
    return readJson(manifestPath);
  }

  const watchlist = await readJson(WATCHLIST_PATH);
  const manifest = {
    weekEnding,
    slug: 'weekly-roundup',
    title: '待确认本周主题',
    description: `${weekEnding} 周报草稿，待补充本周模式判断。`,
    draft: true,
    tlDr: ['待补充本周最重要的 3 条结论。'],
    patterns: ['待补充本周最值得长期跟踪的模式。'],
    whatToTest: ['待补充下周最值得验证的动作。'],
    watchlist: ['待补充下周继续观察的事项。'],
    relatedDocs: watchlist.defaultRelatedDocs,
    extraSources: [],
  };

  await writeTextFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

function buildMarkdown(manifest, posts, weekStart) {
  const frontMatter = serializeFrontMatter({
    slug: `${manifest.slug}-${manifest.weekEnding}`,
    title: `AI Coding Weekly Roundup | ${weekStart} - ${manifest.weekEnding} | ${manifest.title}`,
    description: manifest.description,
    tags: ['ai-coding', 'weekly-roundup'],
    draft: manifest.draft !== false,
  });

  const sourceLines = [
    ...posts.map((post) => `- [${post.title}](/blog/${post.slug})`),
    ...(manifest.extraSources ?? []).map((source) => `- [${source.title}](${source.url})`),
  ];

  const relatedDocs = (manifest.relatedDocs ?? []).map((link) => `- [${link.label}](${link.href})`);
  const thisWeekLines =
    posts.length > 0
      ? posts.map((post) => `- ${post.date}: [${post.title}](/blog/${post.slug})${post.description ? `，${post.description}` : ''}`)
      : ['- 本周还没有可汇总的已发布 Daily Brief，可先补充草稿或手动调整 manifest。'];

  const lines = [
    frontMatter.trimEnd(),
    '',
    `这是一篇覆盖 ${weekStart} 到 ${manifest.weekEnding} 的 Weekly Roundup 草稿。`,
    '',
    '<!-- truncate -->',
    '',
    '## TL;DR',
    '',
    ...(manifest.tlDr ?? ['待补充本周 TL;DR。']).map((item) => `- ${item.replace(/^-+\s*/u, '')}`),
    '',
    '## This week',
    '',
    ...thisWeekLines,
    '',
    '## Patterns to watch',
    '',
    ...(manifest.patterns ?? ['待补充模式判断。']).map((item) => `- ${item}`),
    '',
    '## What to test next',
    '',
    ...(manifest.whatToTest ?? ['待补充下周测试动作。']).map((item, index) => `${index + 1}. ${item}`),
    '',
    '## Watchlist',
    '',
    ...(manifest.watchlist ?? ['待补充 watchlist。']).map((item) => `- ${item}`),
    '',
    '## Sources',
    '',
    ...sourceLines,
    '',
    '## Related docs',
    '',
    ...relatedDocs,
    '',
  ];

  return `${lines.join('\n')}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const weekEnding = args['week-ending'] ? formatIsoDate(args['week-ending']) : formatIsoDate(new Date());
  const weekStart = mondayForDate(weekEnding);
  const slug = slugify(args.slug || 'weekly-roundup');
  const manifestPath = args.manifest
    ? path.resolve(workspaceRoot, args.manifest)
    : path.join(workspaceRoot, 'content-sources', 'weekly', `${weekEnding}-${slug}.json`);
  const outputPath = args.output
    ? path.resolve(workspaceRoot, args.output)
    : path.join(workspaceRoot, 'blog', 'weekly', `${weekEnding}-${slug}.md`);

  const manifest = await loadManifest(manifestPath, weekEnding);
  manifest.weekEnding = weekEnding;
  manifest.slug = slug;
  if (args.draft === 'false' || args.publish === true) {
    manifest.draft = false;
  }

  const posts = await collectDailyPosts(weekStart, addDays(weekEnding, 0));

  // LLM enhancement: synthesize weekly trends from daily brief manifests
  if (posts.length > 0) {
    try {
      const dailyBriefs = [];
      const {readdir} = await import('node:fs/promises');
      if (await fileExists(DAILY_MANIFEST_ROOT)) {
        const files = await readdir(DAILY_MANIFEST_ROOT);
        for (const file of files) {
          if (!file.endsWith('.json')) continue;
          const fileDate = file.slice(0, 10);
          if (fileDate >= weekStart && fileDate <= weekEnding) {
            try {
              const m = await readJson(path.join(DAILY_MANIFEST_ROOT, file));
              dailyBriefs.push({
                date: m.date,
                title: m.title,
                description: m.description,
                summaryBullets: m.summaryBullets,
              });
            } catch { /* skip */ }
          }
        }
      }

      if (dailyBriefs.length > 0) {
        const llmContent = await generateWeeklyRoundupContent({weekStart, weekEnding, dailyBriefs});
        if (llmContent) {
          if (llmContent.title) manifest.title = llmContent.title;
          if (llmContent.description) manifest.description = llmContent.description;
          if (Array.isArray(llmContent.tlDr)) manifest.tlDr = llmContent.tlDr;
          if (Array.isArray(llmContent.patterns)) manifest.patterns = llmContent.patterns;
          if (Array.isArray(llmContent.whatToTest)) manifest.whatToTest = llmContent.whatToTest;
          if (Array.isArray(llmContent.watchlist)) manifest.watchlist = llmContent.watchlist;
          manifest.draft = false;
          console.log('LLM enhancement applied to weekly roundup.');
        }
      }
    } catch (error) {
      console.warn(`LLM enhancement skipped: ${error instanceof Error ? error.message : error}`);
    }
  }

  await writeTextFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeTextFile(outputPath, buildMarkdown(manifest, posts, weekStart));

  console.log(`Weekly roundup manifest: ${path.relative(workspaceRoot, manifestPath)}`);
  console.log(`Weekly roundup draft: ${path.relative(workspaceRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
