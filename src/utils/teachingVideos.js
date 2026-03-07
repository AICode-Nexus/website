function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Teaching video field "${fieldName}" must be a non-empty string.`);
  }

  return value.trim();
}

function ensureArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new Error(`Teaching video field "${fieldName}" must be an array.`);
  }

  return value;
}

function ensureObject(value, fieldName) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Teaching video field "${fieldName}" must be an object.`);
  }

  return value;
}

function ensureDateString(value, fieldName) {
  const dateValue = ensureString(value, fieldName);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    throw new Error(`Teaching video field "${fieldName}" must use YYYY-MM-DD format.`);
  }

  return dateValue;
}

function ensureIsoString(value, fieldName) {
  const isoValue = ensureString(value, fieldName);

  if (Number.isNaN(new Date(isoValue).valueOf())) {
    throw new Error(`Teaching video field "${fieldName}" must be a valid ISO date-time string.`);
  }

  return isoValue;
}

function ensureInteger(value, fieldName, minimum = null) {
  if (!Number.isInteger(value)) {
    throw new Error(`Teaching video field "${fieldName}" must be an integer.`);
  }

  if (minimum !== null && value < minimum) {
    throw new Error(`Teaching video field "${fieldName}" must be >= ${minimum}.`);
  }

  return value;
}

function ensureUniqueIds(items, fieldName) {
  const ids = new Set();

  items.forEach((item, index) => {
    const itemId = ensureString(item.id, `${fieldName}[${index}].id`);
    if (ids.has(itemId)) {
      throw new Error(`Teaching video field "${fieldName}" contains a duplicate id: ${itemId}`);
    }
    ids.add(itemId);
  });
}

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);
  Object.values(value).forEach((nestedValue) => {
    deepFreeze(nestedValue);
  });

  return value;
}

function validateRecord(item, fieldName) {
  ensureString(item.id, `${fieldName}.id`);
  ensureString(item.canonicalUrl, `${fieldName}.canonicalUrl`);
  ensureArray(item.alternateUrls, `${fieldName}.alternateUrls`).forEach((alternateUrl, index) => {
    ensureString(alternateUrl, `${fieldName}.alternateUrls[${index}]`);
  });
  ensureString(item.platform, `${fieldName}.platform`);
  ensureString(item.creator, `${fieldName}.creator`);
  ensureString(item.language, `${fieldName}.language`);
  ensureDateString(item.publishedAt, `${fieldName}.publishedAt`);
  ensureIsoString(item.collectedAt, `${fieldName}.collectedAt`);
  ensureString(item.tool, `${fieldName}.tool`);
  ensureArray(item.topics, `${fieldName}.topics`).forEach((topic, index) => {
    ensureString(topic, `${fieldName}.topics[${index}]`);
  });
  ensureString(item.format, `${fieldName}.format`);
  ensureString(item.level, `${fieldName}.level`);
  ensureString(item.courseId, `${fieldName}.courseId`);

  if (item.episodeNumber !== null && item.episodeNumber !== undefined) {
    ensureInteger(item.episodeNumber, `${fieldName}.episodeNumber`, 1);
  }

  ensureString(item.title, `${fieldName}.title`);
  ensureString(item.summary, `${fieldName}.summary`);

  if (item.editorSummary !== null && item.editorSummary !== undefined) {
    ensureString(item.editorSummary, `${fieldName}.editorSummary`);
  }

  ensureString(item.thumbnailUrl, `${fieldName}.thumbnailUrl`);
  ensureInteger(item.durationSec, `${fieldName}.durationSec`, 0);
  ensureInteger(item.qualityScore, `${fieldName}.qualityScore`, 0);
  ensureInteger(item.featuredScore, `${fieldName}.featuredScore`, 0);
  ensureString(item.sourceId, `${fieldName}.sourceId`);
}

function validateCourse(course, fieldName) {
  ensureString(course.id, `${fieldName}.id`);
  ensureString(course.title, `${fieldName}.title`);
  ensureString(course.creator, `${fieldName}.creator`);
  ensureString(course.language, `${fieldName}.language`);
  ensureString(course.tool, `${fieldName}.tool`);
  ensureDateString(course.publishedAt, `${fieldName}.publishedAt`);
  ensureDateString(course.latestEpisodeAt, `${fieldName}.latestEpisodeAt`);
  ensureInteger(course.episodeCount, `${fieldName}.episodeCount`, 1);
  ensureString(course.coverVideoId, `${fieldName}.coverVideoId`);
}

function validateFacetEntry(entry, fieldName) {
  ensureString(entry.id, `${fieldName}.id`);
  ensureString(entry.label, `${fieldName}.label`);
  ensureInteger(entry.count, `${fieldName}.count`, 0);
}

export function defineTeachingVideoCatalog(catalog) {
  ensureObject(catalog, 'catalog');
  ensureString(catalog.title, 'title');
  ensureString(catalog.description, 'description');
  ensureDateString(catalog.windowStart, 'windowStart');
  ensureDateString(catalog.windowEnd, 'windowEnd');
  ensureIsoString(catalog.generatedAt, 'generatedAt');

  const metrics = ensureObject(catalog.metrics, 'metrics');
  ensureInteger(metrics.videoCount, 'metrics.videoCount', 0);
  ensureInteger(metrics.courseCount, 'metrics.courseCount', 0);
  ensureObject(metrics.recentCounts, 'metrics.recentCounts');
  ensureInteger(metrics.recentCounts.days7, 'metrics.recentCounts.days7', 0);
  ensureInteger(metrics.recentCounts.days30, 'metrics.recentCounts.days30', 0);
  ensureInteger(metrics.recentCounts.days90, 'metrics.recentCounts.days90', 0);
  ensureObject(metrics.platformCounts, 'metrics.platformCounts');
  ensureObject(metrics.languageCounts, 'metrics.languageCounts');
  ensureObject(metrics.toolCounts, 'metrics.toolCounts');
  ensureObject(metrics.stale, 'metrics.stale');

  const facets = ensureObject(catalog.facets, 'facets');
  ['platforms', 'languages', 'tools', 'topics', 'formats', 'levels'].forEach((facetField) => {
    ensureArray(facets[facetField], `facets.${facetField}`).forEach((entry, index) => {
      validateFacetEntry(entry, `facets.${facetField}[${index}]`);
    });
  });

  const featured = ensureObject(catalog.featured, 'featured');
  const featuredItems = ensureArray(featured.items, 'featured.items');
  const quickFilters = ensureArray(featured.quickFilters, 'featured.quickFilters');
  ensureInteger(featured.searchResultLimit, 'featured.searchResultLimit', 1);
  ensureUniqueIds(featuredItems, 'featured.items');
  featuredItems.forEach((item, index) => validateRecord(item, `featured.items[${index}]`));
  quickFilters.forEach((filter, index) => {
    ensureString(filter.id, `featured.quickFilters[${index}].id`);
    ensureString(filter.label, `featured.quickFilters[${index}].label`);
    ensureString(filter.parameter, `featured.quickFilters[${index}].parameter`);
    ensureString(filter.value, `featured.quickFilters[${index}].value`);
    ensureInteger(filter.count, `featured.quickFilters[${index}].count`, 0);
    ensureString(filter.href, `featured.quickFilters[${index}].href`);
  });

  const sources = ensureArray(catalog.sources, 'sources');
  ensureUniqueIds(sources, 'sources');
  sources.forEach((source, index) => {
    ensureString(source.id, `sources[${index}].id`);
    ensureString(source.platform, `sources[${index}].platform`);
    ensureString(source.kind, `sources[${index}].kind`);
    ensureString(source.language, `sources[${index}].language`);
    ensureString(source.tier, `sources[${index}].tier`);
    ensureArray(source.tools, `sources[${index}].tools`).forEach((tool, toolIndex) => {
      ensureString(tool, `sources[${index}].tools[${toolIndex}]`);
    });
    ensureString(source.discoveryUrl, `sources[${index}].discoveryUrl`);
  });

  const courses = ensureArray(catalog.courses, 'courses');
  ensureUniqueIds(courses, 'courses');
  courses.forEach((course, index) => validateCourse(course, `courses[${index}]`));

  const items = ensureArray(catalog.items, 'items');
  ensureUniqueIds(items, 'items');
  items.forEach((item, index) => validateRecord(item, `items[${index}]`));

  if (metrics.videoCount !== items.length) {
    throw new Error('Teaching video metrics.videoCount must match items.length.');
  }

  if (metrics.courseCount !== courses.length) {
    throw new Error('Teaching video metrics.courseCount must match courses.length.');
  }

  return deepFreeze(catalog);
}

const TEACHING_VIDEO_CATALOG_PATH = '/docs/ai-code-teaching-videos';

export const TEACHING_VIDEO_RESULTS_SECTION_ID = 'video-results';
export const TEACHING_VIDEO_RESULTS_SECTION_PARAM = 'section';
export const TEACHING_VIDEO_RESULTS_SECTION_VALUE = 'results';

function normalizeCatalogRouteValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function setCatalogSearchParam(params, key, value) {
  const normalizedValue = normalizeCatalogRouteValue(value);

  if (key && normalizedValue) {
    params.set(key, normalizedValue);
  }
}

export function getTeachingVideoCatalogPermalink({
  filters = {},
  query = '',
  requestedPage = null,
  videoId = '',
  courseId = '',
  focusResults = false,
} = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    const normalizedValue = normalizeCatalogRouteValue(value);

    if (normalizedValue && normalizedValue !== 'all') {
      params.set(key, normalizedValue);
    }
  });

  setCatalogSearchParam(params, 'q', query);

  if (Number.isInteger(requestedPage) && requestedPage > 1) {
    params.set('page', String(requestedPage));
  }

  if (focusResults) {
    params.set(TEACHING_VIDEO_RESULTS_SECTION_PARAM, TEACHING_VIDEO_RESULTS_SECTION_VALUE);
  }

  setCatalogSearchParam(params, 'video', videoId);
  setCatalogSearchParam(params, 'course', courseId);

  const search = params.toString();

  return `${TEACHING_VIDEO_CATALOG_PATH}${search ? `?${search}` : ''}`;
}

export function getTeachingVideoCatalogFilterPermalink(parameter, value, options = {}) {
  return getTeachingVideoCatalogPermalink({
    ...options,
    filters: {[parameter]: value},
  });
}

export function searchFocusesTeachingVideoResults(search) {
  return (
    new URLSearchParams(search).get(TEACHING_VIDEO_RESULTS_SECTION_PARAM) ===
    TEACHING_VIDEO_RESULTS_SECTION_VALUE
  );
}

export function getTeachingVideoItemPermalink(itemId) {
  return getTeachingVideoCatalogPermalink({videoId: itemId});
}

export function getTeachingVideoCoursePermalink(courseId) {
  return getTeachingVideoCatalogPermalink({courseId});
}

export function getTeachingVideoItemAnchorId(itemId) {
  return `video-${itemId}`;
}

export function getTeachingVideoCourseAnchorId(courseId) {
  return `course-${courseId}`;
}

export function getTeachingVideoLanguageLabel(language) {
  return (
    {
      zh: '中文',
      en: 'English',
      mixed: '双语',
    }[language] ?? language
  );
}

export function formatTeachingVideoDuration(durationSec) {
  const safeDuration = Number.isFinite(durationSec) ? durationSec : 0;
  const hours = Math.floor(safeDuration / 3600);
  const minutes = Math.floor((safeDuration % 3600) / 60);
  const seconds = safeDuration % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
