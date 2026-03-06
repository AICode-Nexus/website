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

function ensureDateString(value, fieldName) {
  const dateValue = ensureString(value, fieldName);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    throw new Error(`Teaching video field "${fieldName}" must use YYYY-MM-DD format.`);
  }

  return dateValue;
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

export function defineTeachingVideoCatalog(catalog) {
  if (!catalog || typeof catalog !== 'object') {
    throw new Error('Teaching video catalog must be an object.');
  }

  ensureString(catalog.title, 'title');
  ensureString(catalog.description, 'description');

  const sources = ensureArray(catalog.sources, 'sources');
  ensureUniqueIds(sources, 'sources');

  sources.forEach((source, index) => {
    ensureString(source.id, `sources[${index}].id`);
    ensureString(source.title, `sources[${index}].title`);
    ensureString(source.description, `sources[${index}].description`);
  });

  const sourceIds = new Set(sources.map((source) => source.id));
  const items = ensureArray(catalog.items, 'items');
  ensureUniqueIds(items, 'items');

  items.forEach((item, index) => {
    ensureString(item.id, `items[${index}].id`);
    ensureString(item.platform, `items[${index}].platform`);
    ensureString(item.title, `items[${index}].title`);
    ensureString(item.creator, `items[${index}].creator`);
    ensureDateString(item.publishedAt, `items[${index}].publishedAt`);
    ensureString(item.href, `items[${index}].href`);
    ensureString(item.summary, `items[${index}].summary`);
    ensureString(item.sourceId, `items[${index}].sourceId`);

    if (!sourceIds.has(item.sourceId)) {
      throw new Error(
        `Teaching video item "${item.id}" references an unknown sourceId "${item.sourceId}".`,
      );
    }

    ensureArray(item.tags, `items[${index}].tags`).forEach((tag, tagIndex) => {
      ensureString(tag, `items[${index}].tags[${tagIndex}]`);
    });

    if (item.sourceNote !== undefined) {
      ensureString(item.sourceNote, `items[${index}].sourceNote`);
    }
  });

  return deepFreeze(catalog);
}
