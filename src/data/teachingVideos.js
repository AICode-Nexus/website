import teachingVideoCatalogData from './teachingVideos.generated.json';
import {
  defineTeachingVideoCatalog,
  getTeachingVideoCatalogFilterPermalink,
} from '@site/src/utils/teachingVideos';

function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/gu, '-')
    .replace(/^-+|-+$/gu, '')
    .replace(/-+/gu, '-');
}

function containsCjk(value) {
  return /[\u3400-\u9fff]/u.test(String(value ?? ''));
}

function inferLanguage(item) {
  const combined = `${item.title ?? ''} ${item.summary ?? ''} ${(item.tags ?? []).join(' ')}`;
  return containsCjk(combined) ? 'zh' : 'en';
}

function inferTool(item) {
  const haystack = `${item.title ?? ''} ${item.summary ?? ''} ${(item.tags ?? []).join(' ')} ${(
    item.keywords ?? []
  ).join(' ')}`
    .toLowerCase()
    .trim();

  if (haystack.includes('copilot')) {
    return 'GitHub Copilot';
  }
  if (haystack.includes('claude')) {
    return 'Claude Code';
  }
  if (haystack.includes('gemini')) {
    return 'Gemini CLI';
  }
  if (haystack.includes('codex')) {
    return 'OpenAI Codex';
  }
  if (haystack.includes('cursor')) {
    return 'Cursor';
  }
  if (haystack.includes('windsurf')) {
    return 'Windsurf';
  }
  if (haystack.includes('cline')) {
    return 'Cline';
  }
  if (haystack.includes('vscode') || haystack.includes('visual studio code') || haystack.includes('agent')) {
    return 'VS Code Agents';
  }
  return 'AI Coding';
}

function inferTopics(item) {
  const normalized = (item.tags ?? []).map((tag) => String(tag).trim()).filter(Boolean);
  if (normalized.length > 0) {
    return normalized.slice(0, 3);
  }
  return ['基础上手'];
}

function inferFormat(item) {
  const haystack = `${item.title ?? ''} ${item.summary ?? ''} ${(item.tags ?? []).join(' ')}`.toLowerCase();
  if (haystack.includes('系列')) {
    return '系列课程';
  }
  if (haystack.includes('实战')) {
    return '实战演示';
  }
  if (haystack.includes('教程') || haystack.includes('入门') || haystack.includes('保姆级')) {
    return '完整教程';
  }
  return '技巧速览';
}

function inferLevel(item) {
  const haystack = `${item.title ?? ''} ${item.summary ?? ''} ${(item.tags ?? []).join(' ')}`.toLowerCase();
  if (haystack.includes('入门') || haystack.includes('保姆级')) {
    return '入门';
  }
  if (haystack.includes('进阶') || haystack.includes('实战')) {
    return '进阶';
  }
  return '混合';
}

function countBy(items, selector) {
  return items.reduce((accumulator, item) => {
    const key = selector(item);
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});
}

function buildFacetEntries(counts, labels = {}) {
  return Object.entries(counts)
    .map(([id, count]) => ({id, label: labels[id] ?? id, count}))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label, 'zh-CN'));
}

function toDateOnly(value) {
  return String(value).slice(0, 10);
}

function diffDays(later, earlier) {
  return Math.floor((new Date(later).valueOf() - new Date(earlier).valueOf()) / 86400000);
}

function createQuickFilters(toolCounts, platformCounts) {
  const toolFilters = Object.entries(toolCounts)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([tool, count]) => ({
      id: `tool-${slugify(tool)}`,
      label: tool,
      parameter: 'tool',
      value: tool,
      count,
      href: getTeachingVideoCatalogFilterPermalink('tool', tool, {focusResults: true}),
    }));

  const platformFilter = Object.entries(platformCounts)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 1)
    .map(([platform, count]) => ({
      id: `platform-${slugify(platform)}`,
      label: platform,
      parameter: 'platform',
      value: platform,
      count,
      href: getTeachingVideoCatalogFilterPermalink('platform', platform, {focusResults: true}),
    }));

  return [...toolFilters, ...platformFilter].slice(0, 4);
}

function normalizeQuickFilters(quickFilters = []) {
  return quickFilters.map((filter) => ({
    ...filter,
    href: getTeachingVideoCatalogFilterPermalink(filter.parameter, filter.value, {focusResults: true}),
  }));
}

function normalizeLegacyCatalog(rawCatalog) {
  const generatedAt = rawCatalog.generatedAt ?? new Date().toISOString();
  const fallbackWindowEnd = toDateOnly(generatedAt);
  const items = (rawCatalog.items ?? []).map((item, index) => {
    const tool = inferTool(item);

    return {
      id: item.id ?? `legacy-video-${index + 1}`,
      canonicalUrl: item.href,
      alternateUrls: [],
      platform: item.platform ?? 'Bilibili',
      creator: item.creator ?? '未知作者',
      language: inferLanguage(item),
      publishedAt: item.publishedAt ?? fallbackWindowEnd,
      collectedAt: generatedAt,
      tool,
      topics: inferTopics(item),
      format: inferFormat(item),
      level: inferLevel(item),
      courseId: `course-${item.id ?? index + 1}`,
      episodeNumber: 1,
      title: item.title ?? '未命名视频',
      summary: item.summary ?? '暂无摘要。',
      editorSummary: item.sourceNote ?? null,
      thumbnailUrl: item.thumbnailUrl ?? 'https://placehold.co/640x360?text=AI+Code',
      durationSec: 0,
      qualityScore: 60,
      featuredScore: Math.max(50, 80 - index),
      sourceId: item.sourceId ?? 'legacy-source',
    };
  });

  const windowStart =
    items.length > 0
      ? items.reduce((earliest, item) => (item.publishedAt < earliest ? item.publishedAt : earliest), items[0].publishedAt)
      : fallbackWindowEnd;
  const windowEnd =
    items.length > 0
      ? items.reduce((latest, item) => (item.publishedAt > latest ? item.publishedAt : latest), fallbackWindowEnd)
      : fallbackWindowEnd;

  const courses = items.map((item) => ({
    id: item.courseId,
    title: item.title,
    creator: item.creator,
    language: item.language,
    tool: item.tool,
    publishedAt: item.publishedAt,
    latestEpisodeAt: item.publishedAt,
    episodeCount: 1,
    coverVideoId: item.id,
  }));

  const platformCounts = countBy(items, (item) => item.platform);
  const languageCounts = countBy(items, (item) => item.language);
  const toolCounts = countBy(items, (item) => item.tool);
  const topicCounts = items.reduce((accumulator, item) => {
    item.topics.forEach((topic) => {
      accumulator[topic] = (accumulator[topic] ?? 0) + 1;
    });
    return accumulator;
  }, {});
  const formatCounts = countBy(items, (item) => item.format);
  const levelCounts = countBy(items, (item) => item.level);
  const featuredItems = [...items]
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt, 'zh-CN'))
    .slice(0, 8);

  const daysSinceGenerated = diffDays(new Date().toISOString(), generatedAt);

  return {
    title: rawCatalog.title ?? 'AI Code 教学视频库',
    description:
      rawCatalog.description ??
      '兼容旧版生成结果的教学视频目录。建议后续重新运行同步脚本，以获得完整的新数据契约。',
    windowStart,
    windowEnd,
    generatedAt,
    metrics: {
      videoCount: items.length,
      courseCount: courses.length,
      recentCounts: {
        days7: items.filter((item) => diffDays(windowEnd, item.publishedAt) <= 6).length,
        days30: items.filter((item) => diffDays(windowEnd, item.publishedAt) <= 29).length,
        days90: items.filter((item) => diffDays(windowEnd, item.publishedAt) <= 89).length,
      },
      platformCounts,
      languageCounts,
      toolCounts,
      stale: {
        isStale: daysSinceGenerated > 14,
        daysSinceGenerated,
      },
    },
    facets: {
      platforms: buildFacetEntries(platformCounts),
      languages: buildFacetEntries(languageCounts, {zh: '中文', en: 'English', mixed: '双语'}),
      tools: buildFacetEntries(toolCounts),
      topics: buildFacetEntries(topicCounts),
      formats: buildFacetEntries(formatCounts),
      levels: buildFacetEntries(levelCounts),
    },
    featured: {
      items: featuredItems,
      quickFilters: createQuickFilters(toolCounts, platformCounts),
      searchResultLimit: 6,
    },
    sources: (rawCatalog.sources ?? []).map((source, index) => ({
      id: source.id ?? `legacy-source-${index + 1}`,
      platform: source.platform ?? 'Bilibili',
      kind: source.kind ?? 'legacy-import',
      language: source.language ?? 'zh',
      tier: source.tier ?? 'legacy',
      tools: source.tools ?? ['AI Coding'],
      discoveryUrl: source.discoveryUrl ?? 'https://www.bilibili.com',
      title: source.title,
      description: source.description,
    })),
    courses,
    items,
  };
}

function normalizeTeachingVideoCatalog(rawCatalog) {
  if (
    rawCatalog &&
    rawCatalog.windowStart &&
    rawCatalog.windowEnd &&
    rawCatalog.metrics &&
    rawCatalog.facets &&
    rawCatalog.featured &&
    rawCatalog.courses
  ) {
    return {
      ...rawCatalog,
      featured: {
        ...rawCatalog.featured,
        quickFilters: normalizeQuickFilters(rawCatalog.featured.quickFilters),
      },
    };
  }

  return normalizeLegacyCatalog(rawCatalog);
}

export const teachingVideoCatalogSync = Object.freeze({
  intervalHours: 6,
  intervalLabel: '每 6 小时',
  pillLabel: '每 6 小时自动同步',
  description: 'GitHub Actions 每 6 小时自动刷新一次目录数据',
});

export const teachingVideoCatalog = defineTeachingVideoCatalog(
  normalizeTeachingVideoCatalog(teachingVideoCatalogData),
);
