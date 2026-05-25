function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`AI directory field "${fieldName}" must be a non-empty string.`);
  }

  return value;
}

function ensureArray(value, fieldName) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`AI directory field "${fieldName}" must be a non-empty array.`);
  }

  return value;
}

function ensureObject(value, fieldName) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`AI directory field "${fieldName}" must be an object.`);
  }

  return value;
}

function ensureIsoDate(value, fieldName) {
  const dateValue = ensureString(value, fieldName);

  if (!/^\d{4}-\d{2}-\d{2}$/u.test(dateValue)) {
    throw new Error(`AI directory field "${fieldName}" must use YYYY-MM-DD format.`);
  }

  return dateValue;
}

function ensureOptionalHttpUrl(value, fieldName) {
  if (value === undefined) {
    return undefined;
  }

  const url = ensureString(value, fieldName);

  if (!/^https?:\/\//u.test(url)) {
    throw new Error(`AI directory field "${fieldName}" must be an absolute http(s) URL.`);
  }

  return url;
}

function ensureUniqueIds(items, fieldName) {
  const ids = new Set();

  items.forEach((item, index) => {
    const itemId = ensureString(item.id, `${fieldName}[${index}].id`);

    if (ids.has(itemId)) {
      throw new Error(`AI directory field "${fieldName}" contains duplicate id "${itemId}".`);
    }

    ids.add(itemId);
  });
}

function ensureEnumValue(value, fieldName, allowedValues) {
  const normalizedValue = ensureString(value, fieldName);

  if (!allowedValues.includes(normalizedValue)) {
    throw new Error(
      `AI directory field "${fieldName}" must be one of ${allowedValues.join(', ')}; received "${normalizedValue}".`,
    );
  }

  return normalizedValue;
}

function ensureOptionalEnumValue(value, fieldName, allowedValues) {
  if (value === undefined) {
    return undefined;
  }

  return ensureEnumValue(value, fieldName, allowedValues);
}

function ensureStringArray(value, fieldName) {
  return ensureArray(value, fieldName).map((item, index) => ensureString(item, `${fieldName}[${index}]`));
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

export const AI_DIRECTORY_RESOURCE_TYPE_LABELS = {
  'official-product': '官方产品',
  'official-platform': '官方平台',
  'official-docs': '官方文档',
  'official-course': '官方课程',
  'official-cookbook': '官方 Cookbook',
  'official-repo': '官方仓库',
  'research-lab': '研究机构',
  'open-source-project': '开源项目',
  'community-curation': '社区精选',
  'community-course': '社区课程',
  'community-repo': '社区仓库',
  'industry-resource': '行业资源',
  'tool-directory': '工具目录',
  'media-library': '媒体资料库',
};

export const AI_DIRECTORY_AUDIENCE_LABELS = {
  developer: '研发',
  product: '产品',
  design: '设计',
  operations: '运营',
  marketing: '市场',
  sales: '销售',
  data: '数据',
  productivity: '办公效率',
  management: '管理',
  industry: '行业专题',
  general: '通用',
};

export const AI_DIRECTORY_TRUST_LEVEL_LABELS = {
  official: '官方',
  institutional: '机构可信',
  'established-community': '成熟社区',
  'emerging-community': '观察社区',
  watch: '待观察',
};

export const AI_DIRECTORY_COLLECTION_PRIORITY_LABELS = {
  core: '核心',
  important: '重要',
  supplemental: '补充',
};

export const AI_DIRECTORY_MARKET_STATUS_LABELS = {
  current: '当前可用',
  watch: '观察中',
  legacy: '历史保留',
};

export const AI_DIRECTORY_TREND_STATUS_LABELS = {
  hot: '最新热门',
  rising: '快速上升',
  watch: '值得关注',
  evergreen: '长期核心',
};

const VALID_RESOURCE_TYPES = Object.keys(AI_DIRECTORY_RESOURCE_TYPE_LABELS);
const AI_DIRECTORY_ROUTE_PATTERN = /^\/docs\/ai-directory(?:\/[^/]+)?$/u;
const PRIORITY_RANK = {
  core: 0,
  important: 1,
  supplemental: 2,
};
const TREND_RANK = {
  hot: 0,
  rising: 1,
  watch: 2,
  evergreen: 3,
};

export function defineAiDirectoryCatalog(catalog) {
  const input = ensureObject(catalog, 'aiDirectoryCatalog');
  const categories = ensureArray(input.categories, 'aiDirectoryCatalog.categories').map((item, index) => {
    const category = ensureObject(item, `aiDirectoryCatalog.categories[${index}]`);
    const fieldName = `aiDirectoryCatalog.categories[${index}]`;
    const slug = ensureString(category.slug, `${fieldName}.slug`);

    if (!AI_DIRECTORY_ROUTE_PATTERN.test(slug)) {
      throw new Error(`AI directory field "${fieldName}.slug" must point to a /docs/ai-directory route.`);
    }

    return {
      id: ensureString(category.id, `${fieldName}.id`),
      title: ensureString(category.title, `${fieldName}.title`),
      description: ensureString(category.description, `${fieldName}.description`),
      slug,
      sidebarLabel: ensureString(category.sidebarLabel, `${fieldName}.sidebarLabel`),
    };
  });
  ensureUniqueIds(categories, 'aiDirectoryCatalog.categories');

  const categoryIds = new Set(categories.map((category) => category.id));
  const entries = ensureArray(input.entries, 'aiDirectoryCatalog.entries').map((item, index) => {
    const entry = ensureObject(item, `aiDirectoryCatalog.entries[${index}]`);
    const fieldName = `aiDirectoryCatalog.entries[${index}]`;
    const categoryId = ensureString(entry.categoryId, `${fieldName}.categoryId`);

    if (!categoryIds.has(categoryId)) {
      throw new Error(`AI directory field "${fieldName}.categoryId" must match a declared category.`);
    }

    const officialUrl = ensureOptionalHttpUrl(entry.officialUrl, `${fieldName}.officialUrl`);
    const docsUrl = ensureOptionalHttpUrl(entry.docsUrl, `${fieldName}.docsUrl`);
    const repoUrl = ensureOptionalHttpUrl(entry.repoUrl, `${fieldName}.repoUrl`);
    const audience = ensureOptionalEnumValue(
      entry.audience,
      `${fieldName}.audience`,
      Object.keys(AI_DIRECTORY_AUDIENCE_LABELS),
    );
    const language = ensureOptionalEnumValue(entry.language, `${fieldName}.language`, ['en', 'zh', 'multi']);
    const region = ensureOptionalEnumValue(entry.region, `${fieldName}.region`, [
      'global',
      'china',
      'us',
      'europe',
      'other',
    ]);
    const trustLevel = ensureOptionalEnumValue(
      entry.trustLevel,
      `${fieldName}.trustLevel`,
      Object.keys(AI_DIRECTORY_TRUST_LEVEL_LABELS),
    );
    const marketStatus = ensureOptionalEnumValue(
      entry.marketStatus,
      `${fieldName}.marketStatus`,
      Object.keys(AI_DIRECTORY_MARKET_STATUS_LABELS),
    );
    const collectionPriority = ensureOptionalEnumValue(
      entry.collectionPriority,
      `${fieldName}.collectionPriority`,
      Object.keys(AI_DIRECTORY_COLLECTION_PRIORITY_LABELS),
    );
    const trendStatus = ensureOptionalEnumValue(
      entry.trendStatus,
      `${fieldName}.trendStatus`,
      Object.keys(AI_DIRECTORY_TREND_STATUS_LABELS),
    );
    const normalizedTrendStatus = trendStatus ?? 'evergreen';

    if (!officialUrl && !docsUrl && !repoUrl) {
      throw new Error(
        `AI directory field "${fieldName}" must provide at least one accessible URL among officialUrl, docsUrl, or repoUrl.`,
      );
    }

    if (normalizedTrendStatus !== 'evergreen' && entry.trendWindowEnd === undefined) {
      throw new Error(`AI directory field "${fieldName}.trendWindowEnd" is required for non-evergreen trendStatus.`);
    }

    return {
      id: ensureString(entry.id, `${fieldName}.id`),
      categoryId,
      name: ensureString(entry.name, `${fieldName}.name`),
      resourceType: ensureEnumValue(entry.resourceType, `${fieldName}.resourceType`, VALID_RESOURCE_TYPES),
      officialUrl,
      docsUrl,
      repoUrl,
      summary: ensureString(entry.summary, `${fieldName}.summary`),
      bestFor: ensureString(entry.bestFor, `${fieldName}.bestFor`),
      whyListed: ensureString(entry.whyListed, `${fieldName}.whyListed`),
      tags: ensureStringArray(entry.tags, `${fieldName}.tags`),
      reviewedAt: ensureIsoDate(entry.reviewedAt, `${fieldName}.reviewedAt`),
      sourceWindowEnd: ensureIsoDate(entry.sourceWindowEnd, `${fieldName}.sourceWindowEnd`),
      audience: audience ?? 'developer',
      language: language ?? 'en',
      region: region ?? 'global',
      trustLevel: trustLevel ?? 'official',
      marketStatus: marketStatus ?? 'current',
      collectionPriority: collectionPriority ?? 'important',
      trendStatus: normalizedTrendStatus,
      ...(entry.featured === undefined ? {} : {featured: Boolean(entry.featured)}),
      ...(entry.updateTrigger === undefined
        ? {}
        : {updateTrigger: ensureString(entry.updateTrigger, `${fieldName}.updateTrigger`)}),
      ...(entry.trendReason === undefined
        ? {}
        : {trendReason: ensureString(entry.trendReason, `${fieldName}.trendReason`)}),
      ...(entry.trendWindowEnd === undefined
        ? {}
        : {trendWindowEnd: ensureIsoDate(entry.trendWindowEnd, `${fieldName}.trendWindowEnd`)}),
    };
  });
  ensureUniqueIds(entries, 'aiDirectoryCatalog.entries');

  const frozenCategories = deepFreeze(categories);
  const frozenEntries = deepFreeze(entries);
  const categoryMap = new Map(frozenCategories.map((category) => [category.id, category]));

  return deepFreeze({
    categories: frozenCategories,
    entries: frozenEntries,
    getAiDirectoryCategoryById(categoryId) {
      return categoryMap.get(categoryId) ?? null;
    },
    getAiDirectoryEntriesByCategory(categoryId) {
      if (!categoryMap.has(categoryId)) {
        return [];
      }

      return frozenEntries
        .filter((entry) => entry.categoryId === categoryId)
        .sort((left, right) => {
          const trendDelta = TREND_RANK[left.trendStatus] - TREND_RANK[right.trendStatus];
          if (trendDelta !== 0) {
            return trendDelta;
          }

          if (Boolean(left.featured) !== Boolean(right.featured)) {
            return left.featured ? -1 : 1;
          }

          const priorityDelta = PRIORITY_RANK[left.collectionPriority] - PRIORITY_RANK[right.collectionPriority];
          if (priorityDelta !== 0) {
            return priorityDelta;
          }

          return left.name.localeCompare(right.name, 'en');
        });
    },
  });
}
