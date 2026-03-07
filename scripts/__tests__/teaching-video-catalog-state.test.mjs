import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTeachingVideoPagination,
  createTeachingVideoCatalogSearch,
  getUpdatedTeachingVideoCatalogState,
  parseTeachingVideoCatalogSearch,
  TEACHING_VIDEO_PAGE_SIZE,
} from '../../src/utils/teachingVideoCatalogState.mjs';

function buildItems(count) {
  return Array.from({length: count}, (_, index) => ({
    id: `video-${index + 1}`,
    platform: index % 2 === 0 ? 'Bilibili' : 'YouTube',
    creator: `Creator ${index + 1}`,
    language: index % 3 === 0 ? 'en' : 'zh',
    tool: index % 2 === 0 ? 'Cursor' : 'Claude Code',
    topics: ['基础上手', '工作流'],
    format: '完整教程',
    level: '入门',
    title: `Video ${index + 1}`,
    summary: `Summary ${index + 1}`,
  }));
}

test('buildTeachingVideoPagination clamps invalid page numbers to the last available batch', () => {
  const items = buildItems(70);

  const pagination = buildTeachingVideoPagination({
    items,
    requestedPage: 999,
    hasRequestedPage: true,
    targetVideoId: '',
    mode: 'desktop',
  });

  assert.equal(pagination.currentPage, 3);
  assert.equal(pagination.totalPages, 3);
  assert.equal(pagination.rangeStart, 49);
  assert.equal(pagination.rangeEnd, 70);
});

test('buildTeachingVideoPagination returns single-page and stacked slices for the same page parameter', () => {
  const items = buildItems(80);

  const desktopPagination = buildTeachingVideoPagination({
    items,
    requestedPage: 3,
    hasRequestedPage: true,
    targetVideoId: '',
    mode: 'desktop',
  });
  const mobilePagination = buildTeachingVideoPagination({
    items,
    requestedPage: 3,
    hasRequestedPage: true,
    targetVideoId: '',
    mode: 'mobile',
  });

  assert.equal(desktopPagination.rangeStart, 49);
  assert.equal(desktopPagination.rangeEnd, 72);
  assert.equal(desktopPagination.pageItems.length, TEACHING_VIDEO_PAGE_SIZE);
  assert.equal(desktopPagination.pageItems[0].id, 'video-49');
  assert.equal(desktopPagination.pageItems.at(-1).id, 'video-72');

  assert.equal(mobilePagination.rangeStart, 1);
  assert.equal(mobilePagination.rangeEnd, 72);
  assert.equal(mobilePagination.pageItems.length, 72);
  assert.equal(mobilePagination.pageItems[0].id, 'video-1');
  assert.equal(mobilePagination.pageItems.at(-1).id, 'video-72');
});

test('buildTeachingVideoPagination derives the target batch when page is not explicitly set', () => {
  const items = buildItems(90);

  const pagination = buildTeachingVideoPagination({
    items,
    requestedPage: 1,
    hasRequestedPage: false,
    targetVideoId: 'video-50',
    mode: 'desktop',
  });

  assert.equal(pagination.currentPage, 3);
  assert.equal(pagination.rangeStart, 49);
  assert.equal(pagination.rangeEnd, 72);
  assert.ok(pagination.pageItems.some((item) => item.id === 'video-50'));
});

test('getUpdatedTeachingVideoCatalogState resets page state and clears stale deep links', () => {
  const currentState = parseTeachingVideoCatalogSearch('?tool=Cursor&q=cursor&page=5&video=video-42&course=course-42');

  const nextState = getUpdatedTeachingVideoCatalogState(
    currentState,
    {
      query: 'claude code',
      filters: {
        tool: 'Claude Code',
      },
    },
    {
      resetPage: true,
      clearTargets: true,
    },
  );

  assert.equal(nextState.query, 'claude code');
  assert.equal(nextState.filters.tool, 'Claude Code');
  assert.equal(nextState.requestedPage, 1);
  assert.equal(nextState.hasRequestedPage, false);
  assert.equal(nextState.targetVideoId, '');
  assert.equal(nextState.targetCourseId, '');
});

test('createTeachingVideoCatalogSearch omits default values and keeps non-default URL state shareable', () => {
  const defaultSearch = createTeachingVideoCatalogSearch(
    parseTeachingVideoCatalogSearch('?platform=all&q=&page=1'),
  );

  const populatedSearch = createTeachingVideoCatalogSearch({
    ...parseTeachingVideoCatalogSearch('?tool=Cursor&q=cursor'),
    requestedPage: 3,
    hasRequestedPage: true,
  });

  assert.equal(defaultSearch, '');
  assert.equal(populatedSearch, '?tool=Cursor&q=cursor&page=3');
});
