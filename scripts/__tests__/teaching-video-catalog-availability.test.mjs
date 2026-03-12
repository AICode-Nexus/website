import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMeaningfulTeachingVideoCourseCount,
  hasMeaningfulTeachingVideoCourseCatalog,
} from '../../src/utils/teachingVideoCatalogAvailability.mjs';

test('getMeaningfulTeachingVideoCourseCount counts only multi-episode courses', () => {
  const catalog = {
    courses: [
      {id: 'single-1', episodeCount: 1},
      {id: 'series-1', episodeCount: 3},
      {id: 'series-2', episodeCount: 2},
      {id: 'single-2', episodeCount: 1},
    ],
  };

  assert.equal(getMeaningfulTeachingVideoCourseCount(catalog), 2);
});

test('hasMeaningfulTeachingVideoCourseCatalog rejects one-video-per-course catalogs', () => {
  const catalog = {
    courses: [
      {id: 'single-1', episodeCount: 1},
      {id: 'single-2', episodeCount: 1},
    ],
  };

  assert.equal(hasMeaningfulTeachingVideoCourseCatalog(catalog), false);
});

test('hasMeaningfulTeachingVideoCourseCatalog accepts catalogs with real series aggregation', () => {
  const catalog = {
    courses: [
      {id: 'series-1', episodeCount: 4},
      {id: 'single-1', episodeCount: 1},
    ],
  };

  assert.equal(hasMeaningfulTeachingVideoCourseCatalog(catalog), true);
});
