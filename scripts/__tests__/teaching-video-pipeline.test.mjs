import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDays,
  buildCatalog,
  normalizeDetailedRecord,
  validateCatalogContract,
} from '../lib/teaching-video-pipeline.mjs';

const taxonomy = {
  teachingKeywords: ['tutorial', 'guide', 'for beginners', '教程', '入门', '实战'],
  blockedKeywords: ['news', 'review', '评测', '对比'],
  summaryStopPhrases: ['newsletter', '资源下载'],
  toolRules: [
    {id: 'Claude Code', keywords: ['claude code']},
    {id: 'GitHub Copilot', keywords: ['github copilot']},
    {id: 'Cursor', keywords: ['cursor']},
    {id: 'AI Coding', keywords: ['ai coding', 'ai 编程']},
  ],
  topicRules: [
    {id: '安装配置', keywords: ['install', 'setup', '安装']},
    {id: '工作流', keywords: ['workflow', '工作流']},
    {id: '实战构建', keywords: ['build', '实战', 'project']},
  ],
  formatRules: [
    {id: '系列课程', keywords: ['episode', 'part ', '第', '集']},
    {id: '完整教程', keywords: ['full course', 'complete', '完整教程']},
    {id: '入门教程', keywords: ['for beginners', 'getting started', '入门']},
  ],
  levelRules: [
    {id: '高级', keywords: ['advanced', '高级']},
    {id: '进阶', keywords: ['workflow', '实战', '进阶']},
    {id: '入门', keywords: ['for beginners', 'beginner', '入门']},
  ],
};

function buildDetailEntry({
  id,
  title,
  creator,
  uploadDate,
  description,
  url,
  source,
  duration = 1200,
  viewCount = 10000,
  likeCount = 500,
  verified = true,
}) {
  return {
    sourceId: source.id,
    source,
    entry: {
      id,
      title,
      uploader: creator,
      channel: creator,
      upload_date: uploadDate,
      description,
      webpage_url: url,
      original_url: url,
      duration,
      view_count: viewCount,
      like_count: likeCount,
      channel_is_verified: verified,
      thumbnail: `${url}/thumb.jpg`,
      tags: ['tutorial', 'ai coding'],
      chapters: [{start_time: 0, title: 'intro', end_time: 60}],
    },
  };
}

function buildCatalogFixture() {
  const source = {
    id: 'yt-ai-coding-tutorial-en',
    platform: 'YouTube',
    kind: 'query',
    language: 'en',
    tier: 'primary',
    tools: ['AI Coding'],
    discoveryUrl: 'ytsearchdate30:AI coding tutorial',
    enabled: true,
  };
  const windowEnd = '2026-03-07';
  const windowStart = addDays(windowEnd, -89);
  const generatedAt = '2026-03-07T08:00:00.000Z';
  const items = [];
  const toolTitles = [
    'Claude Code Tutorial for Beginners',
    'GitHub Copilot Tutorial for Beginners',
    'Cursor Tutorial for Beginners',
    'OpenAI Codex Tutorial for Beginners',
  ];

  for (let index = 0; index < 300; index += 1) {
    const publishedAt = addDays(windowEnd, -(index % 30));
    const toolTitle = toolTitles[index % toolTitles.length];
    items.push(
      normalizeDetailedRecord(
        buildDetailEntry({
          id: `video-${index + 1}`,
          title: `${toolTitle} Build ${index + 1}`,
          creator: index % 2 === 0 ? 'Kevin Stratvert' : 'Tech With Tim',
          uploadDate: publishedAt.replace(/-/gu, ''),
          description:
            `A practical ${toolTitle} that covers install, setup, workflow, and building a project.`,
          url: `https://www.youtube.com/watch?v=video-${index + 1}`,
          source,
          duration: 900 + index,
          viewCount: 10000 + index * 20,
          likeCount: 400 + index,
          verified: true,
        }),
        taxonomy,
        windowStart,
        windowEnd,
        generatedAt,
      ),
    );
  }

  return buildCatalog({
    title: 'AI Code 教学视频库',
    description: 'fixture catalog',
    sources: [source],
    items,
    generatedAt,
    windowStart,
    windowEnd,
  });
}

test('normalizeDetailedRecord discards entries outside the active 90-day window', () => {
  const source = {
    id: 'yt-ai-coding-tutorial-en',
    platform: 'YouTube',
    kind: 'query',
    language: 'en',
    tier: 'secondary',
    tools: ['AI Coding'],
    discoveryUrl: 'ytsearchdate30:AI coding tutorial',
    enabled: true,
  };

  const record = normalizeDetailedRecord(
    buildDetailEntry({
      id: 'too-old',
      title: 'AI Coding Tutorial for Beginners',
      creator: 'Example Channel',
      uploadDate: '20251101',
      description: 'A tutorial video.',
      url: 'https://www.youtube.com/watch?v=too-old',
      source,
    }),
    taxonomy,
    '2025-12-08',
    '2026-03-07',
    '2026-03-07T08:00:00.000Z',
  );

  assert.equal(record, null);
});

test('buildCatalog produces metrics, facets, courses, and featured collections', () => {
  const catalog = buildCatalogFixture();

  assert.equal(catalog.metrics.videoCount, 300);
  assert.ok(catalog.metrics.courseCount > 0);
  assert.equal(catalog.metrics.recentCounts.days90, 300);
  assert.equal(catalog.featured.items.length, 8);
  assert.equal(catalog.featured.quickFilters.length >= 1, true);
  assert.ok(catalog.facets.tools.some((entry) => entry.id === 'Claude Code'));
  assert.ok(catalog.courses[0].episodeCount >= 1);
});

test('validateCatalogContract rejects underfilled catalogs and stale outputs', () => {
  const catalog = buildCatalogFixture();
  const underfilled = {
    ...catalog,
    metrics: {
      ...catalog.metrics,
      videoCount: 299,
    },
    items: catalog.items.slice(0, 299),
  };

  assert.throws(
    () => validateCatalogContract(underfilled, new Date('2026-03-07T09:00:00.000Z')),
    /at least 300 videos/u,
  );

  assert.throws(
    () => validateCatalogContract(catalog, new Date('2026-03-10T10:30:00.000Z')),
    /stale/u,
  );
});

test('validateCatalogContract accepts a fresh 300-video catalog', () => {
  const catalog = buildCatalogFixture();

  assert.doesNotThrow(() =>
    validateCatalogContract(catalog, new Date('2026-03-07T09:00:00.000Z')),
  );
});
