import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {
  formatIsoDate,
  parseArgs,
  readJson,
  slugify,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';
import {generateDailyBriefContent} from './llm-writer.mjs';

const execFileAsync = promisify(execFile);
const WATCHLIST_PATH = path.join(workspaceRoot, 'content-sources', 'source-watchlist.json');
const DAILY_GENERATOR_PATH = path.join(workspaceRoot, 'scripts', 'content', 'generate-daily-brief.mjs');
const FETCH_HEADERS = {
  'user-agent': 'Mozilla/5.0 (compatible; AICode-Nexus-DailyBrief/1.0; +https://github.com/AICode-Nexus/website)',
  accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8',
};

const ENTITY_MAP = new Map([
  ['amp', '&'],
  ['lt', '<'],
  ['gt', '>'],
  ['quot', '"'],
  ['apos', "'"],
  ['nbsp', ' '],
  ['hellip', '...'],
  ['mdash', '-'],
  ['ndash', '-'],
  ['rsquo', "'"],
  ['lsquo', "'"],
  ['rdquo', '"'],
  ['ldquo', '"'],
]);

const TAG_RULES = [
  {tag: 'agent', pattern: /\bagent\b|jira|background|skills|hooks|memory/u},
  {tag: 'copilot', pattern: /copilot/u},
  {tag: 'vscode', pattern: /vs[\s-]?code|visual studio code/u},
  {tag: 'codex', pattern: /codex/u},
  {tag: 'mcp', pattern: /\bmcp\b/u},
  {tag: 'model', pattern: /gpt|model|frontier/u},
  {tag: 'security', pattern: /security|vulnerab|patch|audit/u},
  {tag: 'workflow', pattern: /workflow|pull request|pr\b|issue|review|browser|terminal/u},
];

const TITLE_THEME_LABELS = [
  ['agent', 'Agent'],
  ['model', '模型'],
  ['workflow', '工作流'],
  ['mcp', 'MCP'],
  ['security', '安全'],
  ['copilot', 'Copilot'],
  ['vscode', 'VS Code'],
  ['codex', 'Codex'],
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function stripCdata(value) {
  return String(value ?? '').replace(/^<!\[CDATA\[/u, '').replace(/\]\]>$/u, '');
}

function decodeEntities(value) {
  return stripCdata(value).replace(/&(#x?[0-9a-f]+|[a-z]+);/giu, (match, entity) => {
    const normalized = entity.toLowerCase();
    if (ENTITY_MAP.has(normalized)) {
      return ENTITY_MAP.get(normalized);
    }

    if (normalized.startsWith('#x')) {
      const codePoint = Number.parseInt(normalized.slice(2), 16);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }

    if (normalized.startsWith('#')) {
      const codePoint = Number.parseInt(normalized.slice(1), 10);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }

    return match;
  });
}

function stripHtml(value) {
  return decodeEntities(value)
    .replace(/<script\b[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function sanitizeText(value) {
  return stripHtml(value)
    .replace(/\bRead the full article\b.*$/iu, '')
    .replace(/\s+/gu, ' ')
    .trim();
}

function extractTagValue(block, tagName) {
  const pattern = new RegExp(`<${escapeRegExp(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`, 'iu');
  const match = block.match(pattern);
  return match ? match[1] : '';
}

function extractTagValues(block, tagName) {
  const pattern = new RegExp(`<${escapeRegExp(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`, 'giu');
  return Array.from(block.matchAll(pattern), (match) => match[1]);
}

function extractBlocks(xml, tagName) {
  const pattern = new RegExp(`<${escapeRegExp(tagName)}\\b[\\s\\S]*?<\\/${escapeRegExp(tagName)}>`, 'giu');
  return Array.from(xml.matchAll(pattern), (match) => match[0]);
}

function extractAtomLink(block) {
  const linkTags = block.match(/<link\b[^>]*>/giu) ?? [];
  const preferredTag =
    linkTags.find((tag) => /\brel="alternate"/iu.test(tag) && /\bhref="/iu.test(tag)) ??
    linkTags.find((tag) => /\bhref="/iu.test(tag)) ??
    '';
  const hrefMatch = preferredTag.match(/\bhref="([^"]+)"/iu);
  return hrefMatch ? decodeEntities(hrefMatch[1]).trim() : '';
}

function formatLocalDate(value, timeZone) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) {
    return null;
  }

  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildKeywordMatchers(keywords) {
  return (keywords ?? [])
    .map((keyword) => String(keyword).trim().toLowerCase())
    .filter(Boolean)
    .map((keyword) => ({keyword, pattern: new RegExp(escapeRegExp(keyword), 'iu')}));
}

function inferTagsFromText(text) {
  const normalized = text.toLowerCase();
  return TAG_RULES.filter(({pattern}) => pattern.test(normalized)).map(({tag}) => tag);
}

function dedupe(values) {
  return Array.from(new Set(values));
}

function formatTitleLabels(labels) {
  if (labels.length <= 1) {
    return labels[0] ?? '';
  }

  if (labels.length === 2) {
    return `${labels[0]}与${labels[1]}`;
  }

  return `${labels.slice(0, -1).join('、')}与${labels.at(-1)}`;
}

function summarizeDescription(value) {
  return sanitizeText(value)
    .replace(/\s+/gu, ' ')
    .trim();
}

function parseRssFeed(xml, source, timeZone) {
  return extractBlocks(xml, 'item')
    .map((block) => {
      const publishedAt = sanitizeText(extractTagValue(block, 'pubDate'));
      const localDate = formatLocalDate(publishedAt, timeZone);
      const publishedEpoch = Date.parse(publishedAt);
      return {
        sourceId: source.id,
        sourceTitle: source.title,
        title: sanitizeText(extractTagValue(block, 'title')),
        link: sanitizeText(extractTagValue(block, 'link')),
        summary: summarizeDescription(extractTagValue(block, 'description') || extractTagValue(block, 'content:encoded')),
        publishedAt,
        publishedEpoch: Number.isNaN(publishedEpoch) ? 0 : publishedEpoch,
        localDate,
        categories: extractTagValues(block, 'category').map((value) => sanitizeText(value)).filter(Boolean),
      };
    })
    .filter((item) => item.title && item.link && item.localDate);
}

function parseAtomFeed(xml, source, timeZone) {
  return extractBlocks(xml, 'entry')
    .map((block) => {
      const publishedAt =
        sanitizeText(extractTagValue(block, 'updated')) ||
        sanitizeText(extractTagValue(block, 'published'));
      const localDate = formatLocalDate(publishedAt, timeZone);
      const publishedEpoch = Date.parse(publishedAt);
      return {
        sourceId: source.id,
        sourceTitle: source.title,
        title: sanitizeText(extractTagValue(block, 'title')),
        link: extractAtomLink(block),
        summary: summarizeDescription(extractTagValue(block, 'summary') || extractTagValue(block, 'content')),
        publishedAt,
        publishedEpoch: Number.isNaN(publishedEpoch) ? 0 : publishedEpoch,
        localDate,
        categories: Array.from(block.matchAll(/<category\b[^>]*\bterm="([^"]+)"/giu), (match) =>
          sanitizeText(match[1]),
        ).filter(Boolean),
      };
    })
    .filter((item) => item.title && item.link && item.localDate);
}

function countKeywordHits(item, keywordMatchers) {
  const haystack = `${item.title} ${item.summary} ${item.categories.join(' ')}`;
  return keywordMatchers.reduce(
    (total, matcher) => (matcher.pattern.test(haystack) ? total + 1 : total),
    0,
  );
}

function isRelevantSignal(item, keywordMatchers) {
  return countKeywordHits(item, keywordMatchers) > 0;
}

function classifySignal(item, keywordMatchers) {
  const tags = dedupe([
    ...inferTagsFromText(`${item.title} ${item.summary} ${item.categories.join(' ')}`),
    ...keywordMatchers
      .map((matcher) => matcher.keyword)
      .filter((keyword) => new RegExp(escapeRegExp(keyword), 'iu').test(`${item.title} ${item.summary}`))
      .flatMap((keyword) => inferTagsFromText(keyword)),
  ]);

  return {
    ...item,
    tags,
  };
}

function scoreSignal(item, targetDate, sourceOrder, keywordMatchers) {
  const recencyScore = item.localDate === targetDate ? 100 : 60;
  const sourceScore = Math.max(0, 20 - sourceOrder * 4);
  const keywordScore = countKeywordHits(item, keywordMatchers) * 8;
  const tagScore = item.tags.length * 4;
  return recencyScore + sourceScore + keywordScore + tagScore;
}

async function fetchText(url) {
  const response = await fetch(url, {headers: FETCH_HEADERS});
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function collectSignalsForSource(source, timeZone, windowStart, targetDate, sourceOrder) {
  const xml = await fetchText(source.feedUrl);
  const keywordMatchers = buildKeywordMatchers(source.includeKeywords);
  const rawSignals =
    source.feedType === 'atom'
      ? parseAtomFeed(xml, source, timeZone)
      : parseRssFeed(xml, source, timeZone);

  return rawSignals
    .filter((item) => item.localDate >= windowStart && item.localDate <= targetDate)
    .filter((item) => isRelevantSignal(item, keywordMatchers))
    .map((item) => classifySignal(item, keywordMatchers))
    .map((item) => ({
      ...item,
      score: scoreSignal(item, targetDate, sourceOrder, keywordMatchers),
    }));
}

function dedupeSignalsByLink(signals) {
  const seen = new Set();
  return signals.filter((signal) => {
    if (seen.has(signal.link)) {
      return false;
    }

    seen.add(signal.link);
    return true;
  });
}

function selectTopSignals(signals, maxItems) {
  return dedupeSignalsByLink(signals)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return right.publishedEpoch - left.publishedEpoch;
    })
    .slice(0, maxItems);
}

function deriveTitleSuffix(signals) {
  const counts = new Map();
  signals.forEach((signal) => {
    signal.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  const topLabels = TITLE_THEME_LABELS.map(([tag, label]) => ({
    tag,
    label,
    count: counts.get(tag) ?? 0,
  }))
    .filter((entry) => entry.count > 0)
    .sort((left, right) => right.count - left.count)
    .slice(0, 3)
    .map((entry) => entry.label);

  if (topLabels.length === 0) {
    return '官方源里的最新工程信号';
  }

  return `${formatTitleLabels(topLabels)}的最新工程信号`;
}

function buildDescription(date, signals) {
  const items = signals.map((signal) => `${signal.sourceTitle} 的 ${signal.title}`).slice(0, 3);
  if (items.length === 0) {
    return `${date} AI coding 日报：GitHub、VS Code 和 OpenAI 官方源没有出现新的高信号编码更新。`;
  }

  return `${date} AI coding 日报：${items.join('；')}。`;
}

function summarizeImpact(signal) {
  if (signal.tags.includes('security')) {
    return '这类更新值得放进安全验证清单，重点看误报率、补丁质量和是否能进入现有评审流程。';
  }

  if (signal.tags.includes('mcp')) {
    return '这说明工具上下文和外部系统接入还在继续标准化，适合评估是否纳入现有开发工作台。';
  }

  if (signal.tags.includes('agent')) {
    return '这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。';
  }

  if (signal.tags.includes('model')) {
    return '这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。';
  }

  if (signal.tags.includes('workflow')) {
    return '这会改变规则、验证和交接是如何串进日常交付流程的。';
  }

  return '这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。';
}

function buildNoSignalManifest(date, windowStart, watchlist) {
  return {
    date,
    slug: `daily-brief-${date}`,
    title: '官方源没有出现新的高信号 AI coding 更新',
    description: `${date} AI coding no-signal brief：GitHub、VS Code 和 OpenAI 官方源没有出现新的高信号编码发布。`,
    tags: ['ai-coding', 'daily-brief', 'watchlist'],
    draft: false,
    intro: `这篇 Daily Brief 覆盖 ${windowStart} 到 ${date} 的官方观察窗口。今天没有足够强的新发布，比强行拼凑热点更有价值的是明确记录“无新增结论”。`,
    summaryBullets: [
      `截至 ${date}，GitHub Changelog、VS Code 和 OpenAI News 的官方 feed 没有出现新的高信号 AI coding 更新。`,
      '自动日报继续保留来源检查和 watchlist，方便下一次更新直接做增量判断。',
      '没有新增信号时，最合理的动作是回头验证最近一周已经发布的模型、Agent 和工作台能力。',
    ],
    keyChanges: [
      {
        title: `今天没有新的高信号正式发布（观察窗口 ${windowStart} 到 ${date}）`,
        details: [
          '已检查 GitHub Changelog、VS Code Feed 和 OpenAI News RSS。',
          '没有发现足以改变 AI coding 选型或工作流判断的新条目。',
          '这不代表没有任何更新，只代表没有达到“值得单独发布日报结论”的强度。',
        ],
      },
    ],
    whyItMatters: [
      '承认“今天没有新增结论”比发布低信噪比热点更可靠。',
      '对团队来说，更高价值的动作是复盘最近几天已发布能力是否真正进入了工程实践。',
      '稳定的 no-signal brief 也能证明自动化链路仍在正常工作，并持续检查官方来源。',
    ],
    whatToTest: [
      '把最近一周已经进入正式发布的模型或 Agent 更新拉进固定回归任务，记录返工率和交付稳定性。',
      '检查现有规则文件、hooks、memory 和 review 流程是否已经覆盖最近一轮产品变化。',
      '继续观察明天的官方 feed，确认今天的“无高信号更新”是否仍然成立。',
    ],
    watchlist: [
      '更强编码模型是否继续进入主流开发入口。',
      'Agent 是否继续往 issue、PR、browser、MCP 和安全修复链路延伸。',
      '工作台能力是否继续把 hooks、skills、memory 和验证流程绑定在一起。',
    ],
    relatedDocs: watchlist.defaultRelatedDocs,
    sources: watchlist.defaultDailySources,
    generatedBy: 'generate-daily-brief-auto',
  };
}

function buildSignalManifest(date, windowStart, signals, watchlist) {
  const tags = dedupe([
    'ai-coding',
    'daily-brief',
    ...signals.flatMap((signal) => signal.tags).filter((tag) => tag !== 'model'),
  ]).slice(0, 6);

  const summaryBullets = signals.map(
    (signal) => `${signal.localDate}，${signal.sourceTitle} 发布《${signal.title}》，${summarizeImpact(signal)}`,
  );

  const keyChanges = signals.map((signal, index) => ({
    title: `${index + 1}. ${signal.localDate}，${signal.sourceTitle}：${signal.title}`,
    details: [
      `事实：${signal.sourceTitle} 在 ${signal.localDate} 发布了这条更新。`,
      `官方摘要：${signal.summary || '官方 feed 已收录该条目，完整内容可通过原文进一步核查。'} `,
      `工程影响：${summarizeImpact(signal)}`,
    ],
  }));

  const whyItMatters = dedupe([
    signals.some((signal) => signal.tags.includes('model'))
      ? '主流产品仍在持续抬高编码模型上限，模型切换已经直接影响日常交付质量。'
      : null,
    signals.some((signal) => signal.tags.includes('agent'))
      ? 'Agent 正在继续从聊天入口走向可持续执行、可连接流程系统的工程组件。'
      : null,
    signals.some((signal) => signal.tags.includes('mcp') || signal.tags.includes('workflow'))
      ? '工具接入、hooks、browser、MCP 与工作流控制面正在变成 AI coding 落地的关键差异点。'
      : null,
    '对工程团队来说，更有价值的动作是把这些变化放进固定验证清单，而不是只看发布标题。',
  ].filter(Boolean));

  const whatToTest = dedupe(
    signals.flatMap((signal) => {
      if (signal.tags.includes('security')) {
        return ['用一组已知漏洞或安全回归样本验证这类安全 Agent 的误报率、补丁质量和 review 成本。'];
      }

      if (signal.tags.includes('mcp')) {
        return ['在隔离仓库里接入对应 MCP server，验证上下文注入、权限边界和回滚路径是否满足团队要求。'];
      }

      if (signal.tags.includes('agent')) {
        return ['挑一个边界清晰的任务，实际跑一次 Agent 执行链路，记录交接成本、失败模式和人工收口时间。'];
      }

      if (signal.tags.includes('model')) {
        return ['拿现有仓库里的重构、多文件修改或审查任务，与当前默认模型做并排测试，记录返工率与稳定性。'];
      }

      return ['把这条更新放进日常主工作台里试跑一次真实任务，而不是只看演示页面。'];
    }),
  ).slice(0, 4);

  const watchlistItems = dedupe([
    signals.some((signal) => signal.tags.includes('model'))
      ? '更强编码模型进入主流入口后，速度、配额和稳定性是否足以支撑高频使用。'
      : null,
    signals.some((signal) => signal.tags.includes('agent'))
      ? 'Agent 新能力是否真的降低了 issue 到 PR 的人工交接成本，而不是把压力后移到 review。'
      : null,
    signals.some((signal) => signal.tags.includes('mcp'))
      ? 'MCP 或工具接入能力是否会在更多主流工作台里收敛成默认标准。'
      : null,
    signals.some((signal) => signal.tags.includes('security'))
      ? 'AI 安全修复能力是否能在真实项目里保持低误报和高可验证性。'
      : null,
    '如果接下来两三天同一主题持续重复出现，就值得回流到长期 docs，而不只停留在日报层。',
  ].filter(Boolean)).slice(0, 5);

  const sources = signals.map((signal) => ({
    title: `${signal.sourceTitle}, ${signal.localDate}: ${signal.title}`,
    url: signal.link,
  }));

  return {
    date,
    slug: `daily-brief-${date}`,
    title: deriveTitleSuffix(signals),
    description: buildDescription(date, signals),
    tags,
    draft: false,
    intro: `这篇 Daily Brief 覆盖 ${windowStart} 到 ${date} 的官方观察窗口，只保留会改变工程实践的 AI coding 信号。`,
    summaryBullets,
    keyChanges,
    whyItMatters,
    whatToTest,
    watchlist: watchlistItems,
    relatedDocs: watchlist.defaultRelatedDocs,
    sources,
    generatedBy: 'generate-daily-brief-auto',
    signalCount: signals.length,
  };
}

async function runDailyBriefGenerator({date, slug, title, manifestPath, outputPath}) {
  const args = [
    DAILY_GENERATOR_PATH,
    `--date=${date}`,
    `--slug=${slug}`,
    `--title=${title}`,
    `--manifest=${path.relative(workspaceRoot, manifestPath)}`,
    `--output=${path.relative(workspaceRoot, outputPath)}`,
    '--publish',
  ];

  const {stdout, stderr} = await execFileAsync(process.execPath, args, {
    cwd: workspaceRoot,
  });

  if (stdout.trim()) {
    process.stdout.write(`${stdout.trim()}\n`);
  }

  if (stderr.trim()) {
    process.stderr.write(`${stderr.trim()}\n`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const watchlist = await readJson(WATCHLIST_PATH);
  const automationConfig = watchlist.automation ?? {};
  const timeZone = automationConfig.timeZone ?? 'Asia/Shanghai';
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());
  const lookbackDays = Number.isInteger(automationConfig.lookbackDays) ? automationConfig.lookbackDays : 2;
  const maxItems = Number.isInteger(automationConfig.maxItems) ? automationConfig.maxItems : 4;
  const minItemsForFullBrief = Number.isInteger(automationConfig.minItemsForFullBrief)
    ? automationConfig.minItemsForFullBrief
    : 3;
  const windowStart = addDays(date, -lookbackDays);
  const sourceConfigs = Array.isArray(automationConfig.sources) ? automationConfig.sources : [];

  const fetchResults = await Promise.allSettled(
    sourceConfigs.map((source, index) => collectSignalsForSource(source, timeZone, windowStart, date, index)),
  );

  const signals = [];
  const fetchWarnings = [];

  fetchResults.forEach((result, index) => {
    const source = sourceConfigs[index];
    if (result.status === 'fulfilled') {
      signals.push(...result.value);
      return;
    }

    fetchWarnings.push(`${source?.title ?? source?.id ?? `source-${index}`}: ${result.reason instanceof Error ? result.reason.message : result.reason}`);
  });

  if (signals.length === 0 && fetchWarnings.length === sourceConfigs.length && sourceConfigs.length > 0) {
    throw new Error(`Failed to fetch every official feed: ${fetchWarnings.join(' | ')}`);
  }

  const selectedSignals = selectTopSignals(signals, maxItems);
  const manifest =
    selectedSignals.length > 0
      ? buildSignalManifest(date, windowStart, selectedSignals, watchlist)
      : buildNoSignalManifest(date, windowStart, watchlist);

  if (fetchWarnings.length > 0) {
    manifest.watchlist = dedupe([
      ...manifest.watchlist,
      `自动化注意：本次有官方源抓取失败（${fetchWarnings.join('；')}），明天需要确认这些源是否恢复。`,
    ]).slice(0, 6);
  }

  if (selectedSignals.length > 0 && selectedSignals.length < minItemsForFullBrief) {
    manifest.watchlist = dedupe([
      ...manifest.watchlist,
      `本次只有 ${selectedSignals.length} 条高信号更新进入正式日报，说明当天有效增量偏少，后续要确认是否需要在周报层补充上下文。`,
    ]).slice(0, 6);
  }

  // LLM enhancement: if API key is available and we have signals, enrich the manifest
  if (selectedSignals.length > 0) {
    try {
      const llmContent = await generateDailyBriefContent(manifest);
      if (llmContent) {
        if (llmContent.title) manifest.title = llmContent.title;
        if (llmContent.description) manifest.description = llmContent.description;
        if (Array.isArray(llmContent.summaryBullets)) manifest.summaryBullets = llmContent.summaryBullets;
        if (Array.isArray(llmContent.keyChanges)) manifest.keyChanges = llmContent.keyChanges;
        if (Array.isArray(llmContent.whyItMatters)) manifest.whyItMatters = llmContent.whyItMatters;
        if (Array.isArray(llmContent.whatToTest)) manifest.whatToTest = llmContent.whatToTest;
        if (Array.isArray(llmContent.watchlist)) manifest.watchlist = llmContent.watchlist;
        manifest.generatedBy = 'generate-daily-brief-auto+llm';
        console.log('LLM enhancement applied to daily brief.');
      }
    } catch (error) {
      console.warn(`LLM enhancement skipped: ${error instanceof Error ? error.message : error}`);
    }
  }

  const manifestBaseName = `${date}-daily-brief`;
  const manifestPath = path.join(workspaceRoot, 'content-sources', 'daily', `${manifestBaseName}.json`);
  const outputPath = path.join(workspaceRoot, 'blog', 'daily', `${manifestBaseName}.md`);

  await writeTextFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await runDailyBriefGenerator({
    date,
    slug: manifest.slug,
    title: manifest.title,
    manifestPath,
    outputPath,
  });

  console.log(`Automated daily brief manifest: ${path.relative(workspaceRoot, manifestPath)}`);
  console.log(`Automated daily brief post: ${path.relative(workspaceRoot, outputPath)}`);
  console.log(`Signals selected: ${selectedSignals.length}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
