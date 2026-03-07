import path from 'node:path';
import {
  fileExists,
  formatIsoDate,
  parseArgs,
  readJson,
  serializeFrontMatter,
  slugify,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';

const WATCHLIST_PATH = path.join(workspaceRoot, 'content-sources', 'source-watchlist.json');

function normalizeList(value, fallback) {
  if (Array.isArray(value) && value.length > 0) {
    return value;
  }
  return fallback;
}

function buildSourceLines(sources) {
  return sources.map((source) => {
    const note = source.note ? `: ${source.note}` : '';
    return `- [${source.title}](${source.url})${note}`;
  });
}

function buildRelatedDocLines(relatedDocs) {
  return relatedDocs.map((link) => `- [${link.label}](${link.href})`);
}

async function loadManifest(manifestPath, date, slug, title) {
  if (await fileExists(manifestPath)) {
    return readJson(manifestPath);
  }

  const watchlist = await readJson(WATCHLIST_PATH);
  const manifest = {
    date,
    slug,
    title,
    description: `${date} AI coding 日报草稿，待补全标题描述、判断和来源。`,
    tags: ['ai-coding', 'daily-brief'],
    draft: true,
    intro: `这是一篇基于 ${date} 观察窗口自动生成的 Daily Brief 草稿。发布前请补全事实、判断与链接。`,
    summaryBullets: ['待补充今天最重要的 3 条变化。'],
    keyChanges: [
      {
        title: '待补充变化 1',
        details: ['待补充事实。', '待补充工程影响。'],
      },
    ],
    whyItMatters: ['待补充这件事为什么值得团队或个人工程师关注。'],
    whatToTest: ['待补充今天值得验证的动作。'],
    watchlist: ['待补充接下来需要继续观察的事项。'],
    relatedDocs: watchlist.defaultRelatedDocs,
    sources: watchlist.defaultDailySources,
  };

  await writeTextFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

function normalizeDailyTitle(date, title) {
  return title.startsWith('AI Coding Daily Brief') ? title : `AI Coding Daily Brief | ${date} | ${title}`;
}

function buildMarkdown(manifest) {
  const frontMatter = serializeFrontMatter({
    slug: manifest.slug,
    title: normalizeDailyTitle(manifest.date, manifest.title),
    description: manifest.description,
    tags: normalizeList(manifest.tags, ['ai-coding', 'daily-brief']),
    draft: manifest.draft !== false,
  });

  const keyChanges = normalizeList(manifest.keyChanges, []).map((change, index) => {
    const title = change.title || `待补充变化 ${index + 1}`;
    const details = normalizeList(change.details, ['待补充细节。']).map((detail) => `- ${detail}`).join('\n');
    return `### ${title}\n\n${details}`;
  });

  const lines = [
    frontMatter.trimEnd(),
    '',
    manifest.intro || `这是一篇基于 ${manifest.date} 观察窗口自动生成的 Daily Brief 草稿。`,
    '',
    '<!-- truncate -->',
    '',
    '## TL;DR',
    '',
    ...normalizeList(manifest.summaryBullets, ['- 待补充 TL;DR。']).map((item) => `- ${item.replace(/^-+\s*/u, '')}`),
    '',
    '## What changed today',
    '',
    ...keyChanges,
    '',
    '## Why it matters',
    '',
    ...normalizeList(manifest.whyItMatters, ['待补充为什么这件事值得关注。']).map((item) => `- ${item}`),
    '',
    '## What to test',
    '',
    ...normalizeList(manifest.whatToTest, ['待补充今天值得测试的动作。']).map((item, index) => `${index + 1}. ${item}`),
    '',
    '## Watchlist',
    '',
    ...normalizeList(manifest.watchlist, ['待补充接下来需要继续观察的事项。']).map((item) => `- ${item}`),
    '',
    '## Sources',
    '',
    ...buildSourceLines(normalizeList(manifest.sources, [])),
    '',
    '## Related docs',
    '',
    ...buildRelatedDocLines(normalizeList(manifest.relatedDocs, [])),
    '',
  ];

  return `${lines.join('\n')}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());
  const slug = slugify(args.slug || args.title || 'ai-coding-daily-draft');
  const title = args.title || '待确认主题';
  const manifestPath = args.manifest
    ? path.resolve(workspaceRoot, args.manifest)
    : path.join(workspaceRoot, 'content-sources', 'daily', `${date}-${slug}.json`);
  const outputPath = args.output
    ? path.resolve(workspaceRoot, args.output)
    : path.join(workspaceRoot, 'blog', 'daily', `${date}-${slug}.md`);

  const manifest = await loadManifest(manifestPath, date, slug, title);
  manifest.date = date;
  manifest.slug = slug;
  manifest.title = manifest.title || title;
  if (args.draft === 'false' || args.publish === true) {
    manifest.draft = false;
  }

  await writeTextFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeTextFile(outputPath, buildMarkdown(manifest));

  console.log(`Daily brief manifest: ${path.relative(workspaceRoot, manifestPath)}`);
  console.log(`Daily brief draft: ${path.relative(workspaceRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
