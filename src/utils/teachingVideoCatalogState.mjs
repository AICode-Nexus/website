export const TEACHING_VIDEO_PAGE_SIZE = 24;

export const DEFAULT_TEACHING_VIDEO_FILTERS = Object.freeze({
  platform: 'all',
  language: 'all',
  tool: 'all',
  topic: 'all',
  format: 'all',
  level: 'all',
});

const FILTER_KEYS = Object.freeze(['platform', 'language', 'tool', 'topic', 'format', 'level']);

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

function normalizeString(value, fallback = '') {
  if (typeof value !== 'string') {
    return fallback;
  }

  return value.trim();
}

function normalizeFilters(filters = {}) {
  return FILTER_KEYS.reduce((result, key) => {
    const nextValue = normalizeString(filters[key], DEFAULT_TEACHING_VIDEO_FILTERS[key]);
    result[key] = nextValue || DEFAULT_TEACHING_VIDEO_FILTERS[key];
    return result;
  }, {});
}

function normalizeRequestedPage(value) {
  if (!Number.isInteger(value) || value < 1) {
    return 1;
  }

  return value;
}

export function parseTeachingVideoCatalogSearch(search) {
  const params = new URLSearchParams(search);

  return {
    filters: normalizeFilters(
      FILTER_KEYS.reduce((result, key) => {
        result[key] = params.get(key) ?? DEFAULT_TEACHING_VIDEO_FILTERS[key];
        return result;
      }, {}),
    ),
    query: params.get('q') ?? '',
    requestedPage: normalizeRequestedPage(Number.parseInt(params.get('page') || '1', 10)),
    hasRequestedPage: params.has('page'),
    targetVideoId: normalizeString(params.get('video')),
    targetCourseId: normalizeString(params.get('course')),
  };
}

export function createTeachingVideoCatalogSearch(state) {
  const params = new URLSearchParams();
  const normalizedState = {
    ...state,
    filters: normalizeFilters(state.filters),
  };

  FILTER_KEYS.forEach((key) => {
    const value = normalizedState.filters[key];
    if (value !== DEFAULT_TEACHING_VIDEO_FILTERS[key]) {
      params.set(key, value);
    }
  });

  const query = normalizeString(normalizedState.query);
  if (query) {
    params.set('q', query);
  }

  if (normalizedState.hasRequestedPage && normalizedState.requestedPage > 1) {
    params.set('page', String(normalizedState.requestedPage));
  }

  if (normalizeString(normalizedState.targetVideoId)) {
    params.set('video', normalizeString(normalizedState.targetVideoId));
  }

  if (normalizeString(normalizedState.targetCourseId)) {
    params.set('course', normalizeString(normalizedState.targetCourseId));
  }

  const nextSearch = params.toString();
  return nextSearch ? `?${nextSearch}` : '';
}

export function getUpdatedTeachingVideoCatalogState(
  currentState,
  patch = {},
  {resetPage = false, clearTargets = false} = {},
) {
  const nextState = {
    ...currentState,
    ...patch,
    filters: normalizeFilters({
      ...currentState.filters,
      ...(patch.filters ?? {}),
    }),
  };

  if (resetPage) {
    nextState.requestedPage = 1;
    nextState.hasRequestedPage = false;
  } else {
    nextState.requestedPage = normalizeRequestedPage(nextState.requestedPage);
    nextState.hasRequestedPage = patch.hasRequestedPage ?? currentState.hasRequestedPage;
  }

  if (clearTargets) {
    nextState.targetVideoId = '';
    nextState.targetCourseId = '';
  } else {
    nextState.targetVideoId = normalizeString(nextState.targetVideoId);
    nextState.targetCourseId = normalizeString(nextState.targetCourseId);
  }

  nextState.query = patch.query ?? currentState.query;

  return nextState;
}

export function filterTeachingVideoItems(items, filters, query) {
  const normalizedQuery = normalizeText(query);

  return items.filter((item) => {
    if (filters.platform !== 'all' && item.platform !== filters.platform) {
      return false;
    }

    if (filters.language !== 'all' && item.language !== filters.language) {
      return false;
    }

    if (filters.tool !== 'all' && item.tool !== filters.tool) {
      return false;
    }

    if (filters.topic !== 'all' && !item.topics.includes(filters.topic)) {
      return false;
    }

    if (filters.format !== 'all' && item.format !== filters.format) {
      return false;
    }

    if (filters.level !== 'all' && item.level !== filters.level) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = normalizeText(
      [
        item.title,
        item.creator,
        item.tool,
        item.summary,
        item.topics.join(' '),
        item.format,
        item.level,
      ].join(' '),
    );

    return haystack.includes(normalizedQuery);
  });
}

export function buildTeachingVideoPagination({
  items,
  requestedPage,
  hasRequestedPage,
  targetItemId = '',
  targetVideoId,
  mode = 'desktop',
  pageSize = TEACHING_VIDEO_PAGE_SIZE,
}) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  let safePage = normalizeRequestedPage(requestedPage);
  const focusItemId = normalizeString(targetItemId || targetVideoId);

  if (!hasRequestedPage && focusItemId) {
    const targetIndex = items.findIndex((item) => item.id === focusItemId);
    if (targetIndex >= 0) {
      safePage = Math.floor(targetIndex / pageSize) + 1;
    }
  }

  const currentPage = Math.min(safePage, totalPages);
  const desktopStartIndex = (currentPage - 1) * pageSize;
  const visibleEndIndex = mode === 'mobile'
    ? Math.min(items.length, currentPage * pageSize)
    : Math.min(items.length, desktopStartIndex + pageSize);
  const visibleStartIndex = mode === 'mobile' || items.length === 0 ? 0 : desktopStartIndex;
  const pageItems = items.slice(visibleStartIndex, visibleEndIndex);

  return {
    currentPage,
    totalPages,
    pageItems,
    rangeStart: items.length === 0 ? 0 : visibleStartIndex + 1,
    rangeEnd: visibleEndIndex,
    visibleCount: pageItems.length,
    hasMore: visibleEndIndex < items.length,
  };
}

export function buildTeachingVideoPaginationTokens(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({length: totalPages}, (_, index) => ({
      type: 'page',
      page: index + 1,
    }));
  }

  const pages = new Set([1, totalPages]);

  if (currentPage <= 4) {
    [2, 3, 4, 5].forEach((page) => pages.add(page));
  } else if (currentPage >= totalPages - 3) {
    [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1].forEach((page) => pages.add(page));
  } else {
    [currentPage - 1, currentPage, currentPage + 1].forEach((page) => pages.add(page));
  }

  const sortedPages = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((left, right) => left - right);

  return sortedPages.reduce((tokens, page) => {
    const previousPage = tokens.length > 0 ? tokens[tokens.length - 1].page : null;

    if (previousPage !== null) {
      if (page - previousPage === 2) {
        tokens.push({type: 'page', page: previousPage + 1});
      } else if (page - previousPage > 2) {
        tokens.push({
          type: 'ellipsis',
          id: `ellipsis-${previousPage}-${page}`,
        });
      }
    }

    tokens.push({type: 'page', page});
    return tokens;
  }, []);
}
