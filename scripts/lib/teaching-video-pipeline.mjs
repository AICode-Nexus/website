import {execFile} from 'node:child_process';

const MAX_BUFFER_BYTES = 64 * 1024 * 1024;
const SHANGHAI_TIME_ZONE = 'Asia/Shanghai';
const DETAIL_BATCH_SIZE = 20;
const YT_DLP_TIMEOUT_MS = 90 * 1000;
const YT_DLP_MAX_ATTEMPTS = 3;
const DIRECT_QUERY_RESULT_LIMIT = 12;
const DISCOVERY_RESULT_LIMIT = 50;
const MIN_QUALITY_SCORE = 42;
const FEATURED_COUNT = 8;
const QUICK_FILTER_COUNT = 4;
const SEARCH_RESULT_LIMIT = 6;
const titleCollator = new Intl.Collator('zh-CN', {
  numeric: true,
  sensitivity: 'base',
});

const PLATFORM_LABELS = {
  YouTube: 'YouTube',
  Bilibili: 'Bilibili',
};

const LANGUAGE_LABELS = {
  en: 'English',
  zh: '中文',
  mixed: '双语',
};

function normalizeWhitespace(value) {
  return String(value ?? '')
    .replace(/\s+/gu, ' ')
    .trim();
}

function formatDateParts(date, timeZone = SHANGHAI_TIME_ZONE) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(date);
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

export function getShanghaiDateString(date = new Date()) {
  return formatDateParts(date, SHANGHAI_TIME_ZONE);
}

export function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function slugify(value) {
  const normalized = normalizeWhitespace(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLowerCase();

  const cjkAware = normalized
    .replace(/[^a-z0-9\u4e00-\u9fff]+/gu, '-')
    .replace(/^-+|-+$/gu, '')
    .replace(/-+/gu, '-');

  return cjkAware || 'item';
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTextCollection(values) {
  return ensureArray(values)
    .map((value) => normalizeWhitespace(value))
    .filter(Boolean);
}

function toSearchableText(values) {
  return values
    .map((value) => normalizeWhitespace(value).toLowerCase())
    .filter(Boolean)
    .join(' ');
}

function containsCjk(value) {
  return /[\u3400-\u9fff]/u.test(value);
}

function formatUploadDate(value, timestamp) {
  if (typeof value === 'string' && /^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }

  if (Number.isFinite(timestamp)) {
    return new Date(timestamp * 1000).toISOString().slice(0, 10);
  }

  return null;
}

function normalizeDescription(description, taxonomy) {
  const stopPhrases = new Set(
    ensureArray(taxonomy.summaryStopPhrases).map((phrase) => normalizeWhitespace(phrase).toLowerCase()),
  );

  const lines = String(description ?? '')
    .split(/\n+/u)
    .map((line) =>
      normalizeWhitespace(
        line
          .replace(/https?:\/\/\S+/gu, ' ')
          .replace(/www\.\S+/gu, ' ')
          .replace(/#[\p{L}\p{N}_-]+/gu, ' '),
      ),
    )
    .filter(Boolean)
    .filter((line) => {
      const lowerLine = line.toLowerCase();
      return !Array.from(stopPhrases).some((phrase) => lowerLine.includes(phrase));
    });

  return normalizeWhitespace(lines.join(' '));
}

function includesKeyword(text, keywords) {
  return ensureArray(keywords).some((keyword) => text.includes(normalizeWhitespace(keyword).toLowerCase()));
}

function countKeywordHits(text, keywords) {
  return ensureArray(keywords).reduce((total, keyword) => {
    return total + (text.includes(normalizeWhitespace(keyword).toLowerCase()) ? 1 : 0);
  }, 0);
}

function detectLanguage(title, description, sourceLanguage) {
  const combined = `${title} ${description}`;
  if (containsCjk(combined)) {
    return sourceLanguage === 'en' ? 'mixed' : 'zh';
  }

  if (sourceLanguage === 'zh') {
    return 'zh';
  }

  return 'en';
}

function detectTool(text, sourceTools, taxonomy) {
  const explicitSourceTools = normalizeTextCollection(sourceTools);

  if (explicitSourceTools.length === 1 && explicitSourceTools[0] !== 'AI Coding') {
    return explicitSourceTools[0];
  }

  let winner = explicitSourceTools[0] || 'AI Coding';
  let bestScore = 0;

  for (const rule of ensureArray(taxonomy.toolRules)) {
    const score = countKeywordHits(text, rule.keywords);
    if (score > bestScore) {
      bestScore = score;
      winner = rule.id;
    }
  }

  return winner;
}

function detectTopics(text, taxonomy) {
  const topics = [];

  for (const rule of ensureArray(taxonomy.topicRules)) {
    if (includesKeyword(text, rule.keywords)) {
      topics.push(rule.id);
    }
  }

  return topics.length ? topics : ['基础上手'];
}

function detectFormat(titleText, fullText, durationSec, taxonomy) {
  for (const rule of ensureArray(taxonomy.formatRules)) {
    if (includesKeyword(fullText, rule.keywords) || includesKeyword(titleText, rule.keywords)) {
      return rule.id;
    }
  }

  if (durationSec >= 3600) {
    return '完整教程';
  }

  if (durationSec >= 900) {
    return '实战演示';
  }

  return '技巧速览';
}

function detectLevel(fullText, taxonomy) {
  for (const rule of ensureArray(taxonomy.levelRules)) {
    if (includesKeyword(fullText, rule.keywords)) {
      return rule.id;
    }
  }

  return '入门';
}

function extractEpisodeNumber(title) {
  const patterns = [
    /(?:episode|ep\.?|part|lesson)\s*(\d{1,3})/iu,
    /(?:第\s*)(\d{1,3})(?:\s*[集课期])/u,
    /(?:^|\s)#(\d{1,3})(?:\s|$)/u,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) {
      return Number.parseInt(match[1], 10);
    }
  }

  return null;
}

function normalizeCreatorName(value) {
  return normalizeWhitespace(value)
    .replace(/[^\p{L}\p{N}\u4e00-\u9fff]+/gu, ' ')
    .toLowerCase();
}

function buildCourseStem(title) {
  return normalizeWhitespace(
    title
      .replace(/\[[^\]]+\]/gu, ' ')
      .replace(/\([^)]*\)/gu, ' ')
      .replace(/(?:episode|ep\.?|part|lesson)\s*\d{1,3}/giu, ' ')
      .replace(/第\s*\d{1,3}\s*[集课期]/gu, ' ')
      .replace(/#\d{1,3}/gu, ' ')
      .replace(/\b\d{1,3}\b(?=\s*[-:：])/gu, ' ')
      .replace(/\s*[-:：|]\s*/gu, ' ')
      .replace(/\s+/gu, ' '),
  );
}

function buildSummary(description, fallbackTitle, tool, topics, format) {
  const sentenceCandidates = normalizeDescription(description, {summaryStopPhrases: []})
    .split(/(?<=[。！？.!?])\s+/u)
    .map((sentence) => normalizeWhitespace(sentence))
    .filter(Boolean)
    .filter((sentence) => sentence.length >= 18);

  const selectedSentence = sentenceCandidates.find((sentence) => sentence.length <= 120) ?? sentenceCandidates[0];

  if (selectedSentence) {
    return selectedSentence.slice(0, 140);
  }

  const topic = topics[0] ?? '基础上手';
  return `${tool} ${format}，聚焦${topic}。${fallbackTitle}`;
}

function isTeachingVideo(fullText, source, taxonomy, durationSec) {
  const teachingHits = countKeywordHits(fullText, taxonomy.teachingKeywords);
  const blockedHits = countKeywordHits(fullText, taxonomy.blockedKeywords);
  const hasSourceTool = normalizeTextCollection(source.tools).length > 0;

  if (blockedHits >= 2 && teachingHits === 0) {
    return false;
  }

  if (teachingHits > 0) {
    return true;
  }

  return hasSourceTool && durationSec >= 300;
}

function scoreQuality({durationSec, viewCount, likeCount, descriptionLength, verified, chapters, sourceTier, titleText, fullText}) {
  let score = 24;

  if (durationSec >= 300 && durationSec <= 5400) {
    score += 16;
  } else if (durationSec > 0) {
    score += 8;
  }

  if (viewCount > 0) {
    score += Math.min(18, Math.round(Math.log10(viewCount + 1) * 4));
  }

  if (likeCount > 0) {
    score += Math.min(10, Math.round(Math.log10(likeCount + 1) * 3));
  }

  if (descriptionLength >= 180) {
    score += 8;
  } else if (descriptionLength >= 60) {
    score += 4;
  }

  if (chapters > 0) {
    score += 8;
  }

  if (verified) {
    score += 6;
  }

  if (sourceTier === 'primary') {
    score += 6;
  } else if (sourceTier === 'secondary') {
    score += 3;
  }

  if (includesKeyword(titleText, ['full course', 'crash course', '完整教程', '保姆级', 'for beginners', '入门'])) {
    score += 6;
  }

  if (includesKeyword(fullText, ['workflow', '实战', 'rules', 'claude.md', 'mcp', 'github actions'])) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
}

function scoreFreshness(publishedAt, windowEnd) {
  const ageInDays = Math.abs(
    (new Date(`${windowEnd}T00:00:00Z`).valueOf() - new Date(`${publishedAt}T00:00:00Z`).valueOf()) /
      (24 * 60 * 60 * 1000),
  );

  return Math.max(0, 20 - Math.round(ageInDays / 5));
}

function buildMirrorKey(record) {
  return [
    record.language,
    normalizeCreatorName(record.creator),
    slugify(buildCourseStem(record.title)),
  ].join('|');
}

function buildPlatformCounts(items) {
  const counts = new Map();

  items.forEach((item) => {
    counts.set(item.platform, (counts.get(item.platform) ?? 0) + 1);
  });

  return Object.fromEntries(
    Array.from(counts.entries()).sort((left, right) => right[1] - left[1] || titleCollator.compare(left[0], right[0])),
  );
}

function buildFacetEntries(items, fieldName) {
  const counts = new Map();

  items.forEach((item) => {
    const values = Array.isArray(item[fieldName]) ? item[fieldName] : [item[fieldName]];
    values
      .filter(Boolean)
      .forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  });

  return Array.from(counts.entries())
    .map(([id, count]) => ({id, label: id, count}))
    .sort((left, right) => right.count - left.count || titleCollator.compare(left.label, right.label));
}

function buildQuickFilters(toolFacetEntries) {
  return toolFacetEntries.slice(0, QUICK_FILTER_COUNT).map((entry) => ({
    id: slugify(entry.id),
    label: entry.label,
    parameter: 'tool',
    value: entry.id,
    count: entry.count,
    href: `/docs/ai-code-teaching-videos?tool=${encodeURIComponent(entry.id)}`,
  }));
}

function computeRecentWindowCount(items, windowEnd, days) {
  const lowerBound = addDays(windowEnd, -(days - 1));
  return items.filter((item) => item.publishedAt >= lowerBound).length;
}

export function computeStaleStatus(generatedAt, now = new Date()) {
  const generatedValue = new Date(generatedAt).valueOf();
  if (Number.isNaN(generatedValue)) {
    return {
      isStale: true,
      ageHours: Number.POSITIVE_INFINITY,
    };
  }

  const ageHours = (now.valueOf() - generatedValue) / (60 * 60 * 1000);
  return {
    isStale: ageHours > 48,
    ageHours,
  };
}

function selectFeaturedItems(items, limit = FEATURED_COUNT) {
  const remaining = [...items];
  const selected = [];
  const toolCounts = new Map();
  const languageCounts = new Map();
  const platformCounts = new Map();

  while (selected.length < limit && remaining.length > 0) {
    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    remaining.forEach((item, index) => {
      let dynamicScore = item.featuredScore;
      dynamicScore += (toolCounts.get(item.tool) ?? 0) === 0 ? 12 : -4 * (toolCounts.get(item.tool) ?? 0);
      dynamicScore += (languageCounts.get(item.language) ?? 0) === 0 ? 6 : -3 * (languageCounts.get(item.language) ?? 0);
      dynamicScore += (platformCounts.get(item.platform) ?? 0) === 0 ? 4 : -2 * (platformCounts.get(item.platform) ?? 0);

      if (dynamicScore > bestScore) {
        bestScore = dynamicScore;
        bestIndex = index;
      }
    });

    const [nextItem] = remaining.splice(bestIndex, 1);
    selected.push(nextItem);
    toolCounts.set(nextItem.tool, (toolCounts.get(nextItem.tool) ?? 0) + 1);
    languageCounts.set(nextItem.language, (languageCounts.get(nextItem.language) ?? 0) + 1);
    platformCounts.set(nextItem.platform, (platformCounts.get(nextItem.platform) ?? 0) + 1);
  }

  return selected;
}

function sortItems(items) {
  return [...items].sort((left, right) => {
    if (left.publishedAt !== right.publishedAt) {
      return right.publishedAt.localeCompare(left.publishedAt);
    }

    if (left.featuredScore !== right.featuredScore) {
      return right.featuredScore - left.featuredScore;
    }

    if (left.qualityScore !== right.qualityScore) {
      return right.qualityScore - left.qualityScore;
    }

    return titleCollator.compare(left.title, right.title);
  });
}

function groupCourses(items) {
  const grouped = new Map();

  items.forEach((item) => {
    const current = grouped.get(item.courseId);
    if (!current) {
      grouped.set(item.courseId, {
        id: item.courseId,
        title: buildCourseStem(item.title),
        creator: item.creator,
        language: item.language,
        tool: item.tool,
        publishedAt: item.publishedAt,
        latestEpisodeAt: item.publishedAt,
        coverVideoId: item.id,
        episodeCount: 1,
      });
      return;
    }

    current.episodeCount += 1;
    if (item.publishedAt < current.publishedAt) {
      current.publishedAt = item.publishedAt;
    }
    if (item.publishedAt > current.latestEpisodeAt) {
      current.latestEpisodeAt = item.publishedAt;
      current.coverVideoId = item.id;
    }
  });

  return Array.from(grouped.values()).sort((left, right) => {
    if (left.latestEpisodeAt !== right.latestEpisodeAt) {
      return right.latestEpisodeAt.localeCompare(left.latestEpisodeAt);
    }

    if (left.episodeCount !== right.episodeCount) {
      return right.episodeCount - left.episodeCount;
    }

    return titleCollator.compare(left.title, right.title);
  });
}

function mergeMirrorRecords(records) {
  const grouped = new Map();

  records.forEach((record) => {
    const key = buildMirrorKey(record);
    const current = grouped.get(key);
    if (!current) {
      grouped.set(key, record);
      return;
    }

    const currentPrimary = current.qualityScore + current.featuredScore;
    const nextPrimary = record.qualityScore + record.featuredScore;
    const winner = nextPrimary > currentPrimary ? record : current;
    const loser = winner === record ? current : record;

    winner.alternateUrls = Array.from(new Set([...winner.alternateUrls, loser.canonicalUrl, ...loser.alternateUrls]));
    grouped.set(key, winner);
  });

  return sortItems(Array.from(grouped.values()));
}

export async function runYtDlp(args) {
  let lastError = null;
  let fallbackStdout = '';

  for (let attempt = 1; attempt <= YT_DLP_MAX_ATTEMPTS; attempt += 1) {
    try {
      const result = await new Promise((resolve, reject) => {
        execFile(
          'yt-dlp',
          args,
          {
            encoding: 'utf8',
            maxBuffer: MAX_BUFFER_BYTES,
            timeout: YT_DLP_TIMEOUT_MS,
          },
          (error, stdout, stderr) => {
            if (error) {
              reject({
                error,
                stdout,
                stderr,
              });
              return;
            }

            resolve({
              stdout,
              stderr,
            });
          },
        );
      });

      return result.stdout ?? '';
    } catch (failure) {
      const error = failure?.error ?? failure;
      const stdout = typeof failure?.stdout === 'string' ? failure.stdout.trim() : '';
      const stderr = typeof failure?.stderr === 'string' ? failure.stderr.trim() : '';

      if (stdout) {
        fallbackStdout = stdout;
      }

      if (error?.code === 'ETIMEDOUT' || error?.killed) {
        lastError = new Error(`yt-dlp timed out after ${YT_DLP_TIMEOUT_MS / 1000}s.`);
      } else {
        lastError = new Error(
          `yt-dlp failed on attempt ${attempt}/${YT_DLP_MAX_ATTEMPTS}: ${
            stderr || error?.message || String(error)
          }`.trim(),
        );
      }

      if (attempt < YT_DLP_MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 600));
      }
    }
  }

  if (fallbackStdout) {
    return fallbackStdout;
  }

  throw lastError ?? new Error('yt-dlp failed without returning output.');
}

function setQueryResultSize(discoveryUrl, resultCount, mode = 'cap') {
  const match = discoveryUrl.match(/^(ytsearchdate|ytsearch|bilisearch)(\d+):(.*)$/u);
  if (!match) {
    return discoveryUrl;
  }

  const [, prefix, count, query] = match;
  const currentCount = Number.parseInt(count, 10);
  const nextCount = mode === 'override' ? resultCount : Math.min(currentCount, resultCount);
  return `${prefix}${nextCount}:${query}`;
}

export async function discoverSourceCandidates(source) {
  if (source.platform === 'YouTube' && source.kind === 'query') {
    const stdout = await runYtDlp([
      '--dump-single-json',
      '--ignore-errors',
      setQueryResultSize(source.discoveryUrl, DIRECT_QUERY_RESULT_LIMIT, 'cap'),
    ]);
    const payload = JSON.parse(stdout);
    const detailedEntries = ensureArray(payload.entries)
      .filter(Boolean)
      .map((entry) => ({
        sourceId: source.id,
        source,
        entry,
      }));

    return {
      candidates: [],
      detailedEntries,
      strategy: 'direct-detailed-query',
    };
  }

  const stdout = await runYtDlp([
    '--dump-single-json',
    '--flat-playlist',
    '--ignore-errors',
    setQueryResultSize(source.discoveryUrl, DISCOVERY_RESULT_LIMIT, 'override'),
  ]);
  const payload = JSON.parse(stdout);
  const entries = ensureArray(payload.entries).filter(Boolean);
  const candidates = entries
    .map((entry) => {
      const url = normalizeWhitespace(entry.url || entry.webpage_url || entry.original_url);
      if (!url) {
        return null;
      }

      if (source.platform === 'Bilibili' && !url.includes('/video/')) {
        return null;
      }

      return {
        sourceId: source.id,
        source,
        platform: source.platform,
        title: normalizeWhitespace(entry.title),
        creator: normalizeWhitespace(entry.uploader || entry.channel),
        url,
      };
    })
    .filter(Boolean);

  return {
    candidates,
    detailedEntries: [],
    strategy: 'candidate-discovery',
  };
}

function parseLineDelimitedJson(output) {
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('{') && line.endsWith('}'))
    .map((line) => JSON.parse(line));
}

export async function fetchDetailedEntries(candidates) {
  const details = [];

  for (let index = 0; index < candidates.length; index += DETAIL_BATCH_SIZE) {
    const batch = candidates.slice(index, index + DETAIL_BATCH_SIZE);
    try {
      const parsed = await fetchDetailBatch(batch);
      details.push(...parsed);
      console.log(`Fetched ${parsed.length} detailed items from batch ${Math.floor(index / DETAIL_BATCH_SIZE) + 1}.`);
    } catch (error) {
      console.warn(
        `Falling back to per-item detail fetch for batch ${Math.floor(index / DETAIL_BATCH_SIZE) + 1}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      for (const candidate of batch) {
        try {
          const parsed = await fetchDetailBatch([candidate]);
          details.push(...parsed);
        } catch (itemError) {
          console.warn(
            `Skipping detail fetch for ${candidate.url}: ${
              itemError instanceof Error ? itemError.message : String(itemError)
            }`,
          );
        }
      }
    }
  }

  return details;
}

async function fetchDetailBatch(batch) {
  const batchMap = new Map(
    batch.flatMap((candidate) => [
      [candidate.url, candidate],
      [candidate.url.replace(/^http:\/\//u, 'https://'), candidate],
      [candidate.url.replace(/\/$/u, ''), candidate],
    ]),
  );
  const stdout = await runYtDlp([
    '--dump-json',
    '--skip-download',
    '--no-playlist',
    '--ignore-errors',
    '--socket-timeout',
    '20',
    ...batch.map((candidate) => candidate.url),
  ]);

  return parseLineDelimitedJson(stdout).map((entry, parsedIndex) => {
    const entryUrl = normalizeWhitespace(entry.webpage_url || entry.original_url || '');
    const fallbackCandidate =
      batchMap.get(entryUrl) ??
      batchMap.get(entryUrl.replace(/\/$/u, '')) ??
      batch[parsedIndex];
    return {
      sourceId: fallbackCandidate?.sourceId,
      source: fallbackCandidate?.source,
      entry,
    };
  });
}

export function normalizeDetailedRecord(detail, taxonomy, windowStart, windowEnd, collectedAt) {
  const source = detail.source;
  const entry = detail.entry;
  const title = normalizeWhitespace(entry.title);
  const creator = normalizeWhitespace(entry.uploader || entry.channel || '');
  const description = normalizeDescription(entry.description, taxonomy);
  const publishedAt = formatUploadDate(entry.upload_date, entry.timestamp);
  const canonicalUrl = normalizeWhitespace(entry.webpage_url || entry.original_url || '');

  if (!title || !creator || !publishedAt || !canonicalUrl) {
    return null;
  }

  if (publishedAt < windowStart || publishedAt > windowEnd) {
    return null;
  }

  const tags = normalizeTextCollection(entry.tags);
  const chapters = ensureArray(entry.chapters).length;
  const durationSec = Number.isFinite(entry.duration) ? Math.round(entry.duration) : 0;
  const fullText = toSearchableText([title, description, ...tags]);

  if (!isTeachingVideo(fullText, source, taxonomy, durationSec)) {
    return null;
  }

  const tool = detectTool(fullText, source.tools, taxonomy);
  const topics = detectTopics(fullText, taxonomy);
  const format = detectFormat(title.toLowerCase(), fullText, durationSec, taxonomy);
  const level = detectLevel(fullText, taxonomy);
  const language = detectLanguage(title, description, source.language);
  const episodeNumber = extractEpisodeNumber(title);
  const courseStem = buildCourseStem(title) || title;
  const courseId = slugify([tool, creator, courseStem].join(' '));
  const qualityScore = scoreQuality({
    durationSec,
    viewCount: Number.isFinite(entry.view_count) ? entry.view_count : 0,
    likeCount: Number.isFinite(entry.like_count) ? entry.like_count : 0,
    descriptionLength: description.length,
    verified: Boolean(entry.channel_is_verified),
    chapters,
    sourceTier: source.tier,
    titleText: title.toLowerCase(),
    fullText,
  });

  if (qualityScore < MIN_QUALITY_SCORE) {
    return null;
  }

  const featuredScore = qualityScore + scoreFreshness(publishedAt, windowEnd);
  const alternateUrls = Array.from(
    new Set(
      [entry.original_url, entry.webpage_url]
        .map((value) => normalizeWhitespace(value))
        .filter((value) => value && value !== canonicalUrl),
    ),
  );

  return {
    id: slugify([source.platform, entry.id || title, creator].join(' ')),
    canonicalUrl,
    alternateUrls,
    platform: source.platform,
    creator,
    language,
    publishedAt,
    collectedAt,
    tool,
    topics,
    format,
    level,
    courseId,
    episodeNumber,
    title,
    summary: buildSummary(description, title, tool, topics, format),
    editorSummary: null,
    thumbnailUrl: normalizeWhitespace(entry.thumbnail || ''),
    durationSec,
    qualityScore,
    featuredScore,
    sourceId: source.id,
  };
}

export function buildCatalog({title, description, sources, items, generatedAt, windowStart, windowEnd}) {
  const normalizedItems = mergeMirrorRecords(sortItems(items));
  const courses = groupCourses(normalizedItems);
  const platformFacetEntries = buildFacetEntries(normalizedItems, 'platform');
  const languageFacetEntries = buildFacetEntries(normalizedItems, 'language');
  const toolFacetEntries = buildFacetEntries(normalizedItems, 'tool');
  const topicFacetEntries = buildFacetEntries(normalizedItems, 'topics');
  const formatFacetEntries = buildFacetEntries(normalizedItems, 'format');
  const levelFacetEntries = buildFacetEntries(normalizedItems, 'level');
  const featuredItems = selectFeaturedItems(normalizedItems, FEATURED_COUNT);
  const staleStatus = computeStaleStatus(generatedAt);

  return {
    title,
    description,
    windowStart,
    windowEnd,
    generatedAt,
    metrics: {
      videoCount: normalizedItems.length,
      courseCount: courses.length,
      recentCounts: {
        days7: computeRecentWindowCount(normalizedItems, windowEnd, 7),
        days30: computeRecentWindowCount(normalizedItems, windowEnd, 30),
        days90: computeRecentWindowCount(normalizedItems, windowEnd, 90),
      },
      platformCounts: buildPlatformCounts(normalizedItems),
      languageCounts: buildPlatformCounts(normalizedItems.map((item) => ({platform: item.language}))),
      toolCounts: buildPlatformCounts(normalizedItems.map((item) => ({platform: item.tool}))),
      stale: staleStatus,
    },
    facets: {
      platforms: platformFacetEntries.map((entry) => ({
        ...entry,
        label: PLATFORM_LABELS[entry.label] ?? entry.label,
      })),
      languages: languageFacetEntries.map((entry) => ({
        ...entry,
        label: LANGUAGE_LABELS[entry.label] ?? entry.label,
      })),
      tools: toolFacetEntries,
      topics: topicFacetEntries,
      formats: formatFacetEntries,
      levels: levelFacetEntries,
    },
    featured: {
      items: featuredItems,
      quickFilters: buildQuickFilters(toolFacetEntries),
      searchResultLimit: SEARCH_RESULT_LIMIT,
    },
    sources,
    courses,
    items: normalizedItems,
  };
}

function ensureString(value, fieldName) {
  if (typeof value !== 'string' || normalizeWhitespace(value) === '') {
    throw new Error(`Teaching video field "${fieldName}" must be a non-empty string.`);
  }
}

function ensureDateString(value, fieldName) {
  ensureString(value, fieldName);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Teaching video field "${fieldName}" must use YYYY-MM-DD format.`);
  }
}

export function validateCatalogContract(catalog, now = new Date()) {
  if (!catalog || typeof catalog !== 'object') {
    throw new Error('Teaching video catalog must be an object.');
  }

  ensureString(catalog.title, 'title');
  ensureString(catalog.description, 'description');
  ensureDateString(catalog.windowStart, 'windowStart');
  ensureDateString(catalog.windowEnd, 'windowEnd');
  ensureString(catalog.generatedAt, 'generatedAt');

  if (!catalog.metrics || typeof catalog.metrics !== 'object') {
    throw new Error('Teaching video catalog must define metrics.');
  }

  if (!catalog.facets || typeof catalog.facets !== 'object') {
    throw new Error('Teaching video catalog must define facets.');
  }

  if (!catalog.featured || typeof catalog.featured !== 'object') {
    throw new Error('Teaching video catalog must define featured.');
  }

  if (!Array.isArray(catalog.items) || !Array.isArray(catalog.courses) || !Array.isArray(catalog.sources)) {
    throw new Error('Teaching video catalog must define sources, courses, and items arrays.');
  }

  catalog.items.forEach((item, index) => {
    ensureString(item.id, `items[${index}].id`);
    ensureString(item.canonicalUrl, `items[${index}].canonicalUrl`);
    if (!Array.isArray(item.alternateUrls)) {
      throw new Error(`Teaching video field "items[${index}].alternateUrls" must be an array.`);
    }
    ensureString(item.platform, `items[${index}].platform`);
    ensureString(item.creator, `items[${index}].creator`);
    ensureString(item.language, `items[${index}].language`);
    ensureDateString(item.publishedAt, `items[${index}].publishedAt`);
    ensureString(item.collectedAt, `items[${index}].collectedAt`);
    ensureString(item.tool, `items[${index}].tool`);
    if (!Array.isArray(item.topics) || item.topics.length === 0) {
      throw new Error(`Teaching video field "items[${index}].topics" must be a non-empty array.`);
    }
    ensureString(item.format, `items[${index}].format`);
    ensureString(item.level, `items[${index}].level`);
    ensureString(item.courseId, `items[${index}].courseId`);
    ensureString(item.title, `items[${index}].title`);
    ensureString(item.summary, `items[${index}].summary`);
    ensureString(item.thumbnailUrl, `items[${index}].thumbnailUrl`);
    if (!Number.isInteger(item.durationSec) || item.durationSec < 0) {
      throw new Error(`Teaching video field "items[${index}].durationSec" must be a non-negative integer.`);
    }
    if (!Number.isInteger(item.qualityScore) || !Number.isInteger(item.featuredScore)) {
      throw new Error(`Teaching video field "items[${index}].qualityScore/featuredScore" must be integers.`);
    }
    ensureString(item.sourceId, `items[${index}].sourceId`);

    if (item.publishedAt < catalog.windowStart || item.publishedAt > catalog.windowEnd) {
      throw new Error(`Teaching video item "${item.id}" falls outside the active 90-day window.`);
    }
  });

  if (catalog.metrics.videoCount !== catalog.items.length) {
    throw new Error('Teaching video metrics.videoCount must match items.length.');
  }

  if (catalog.metrics.courseCount !== catalog.courses.length) {
    throw new Error('Teaching video metrics.courseCount must match courses.length.');
  }

  if (catalog.metrics.videoCount < 300) {
    throw new Error('Teaching video catalog must contain at least 300 videos in the active 90-day window.');
  }

  if (!Array.isArray(catalog.featured.items) || catalog.featured.items.length < FEATURED_COUNT) {
    throw new Error(`Teaching video featured.items must contain at least ${FEATURED_COUNT} items.`);
  }

  if (!Array.isArray(catalog.featured.quickFilters) || catalog.featured.quickFilters.length < QUICK_FILTER_COUNT) {
    throw new Error(`Teaching video featured.quickFilters must contain at least ${QUICK_FILTER_COUNT} items.`);
  }

  const staleStatus = computeStaleStatus(catalog.generatedAt, now);
  if (staleStatus.isStale) {
    throw new Error('Teaching video catalog is stale. Run the sync workflow to refresh it.');
  }

  return catalog;
}
