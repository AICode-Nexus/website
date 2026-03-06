function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Portal content field \"${fieldName}\" must be a non-empty string.`);
  }

  return value;
}

function ensureArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new Error(`Portal content field \"${fieldName}\" must be an array.`);
  }

  return value;
}

function validateLink(link, fieldName) {
  if (!link || typeof link !== 'object') {
    throw new Error(`Portal content field \"${fieldName}\" must be an object.`);
  }

  ensureString(link.label, `${fieldName}.label`);
  ensureString(link.href, `${fieldName}.href`);

  return link;
}

function validateSection(section, fieldName) {
  if (!section || typeof section !== 'object') {
    throw new Error(`Portal content section \"${fieldName}\" must be an object.`);
  }

  ensureString(section.kicker, `${fieldName}.kicker`);
  ensureString(section.title, `${fieldName}.title`);

  if (section.description !== undefined) {
    ensureString(section.description, `${fieldName}.description`);
  }

  return section;
}

function validateCollectionMetadata(items, fieldName) {
  const validatedItems = ensureArray(items, fieldName).map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Portal content item "${fieldName}[${index}]" must be an object.`);
    }

    ensureString(item.id, `${fieldName}[${index}].id`);
    ensureString(item.title, `${fieldName}[${index}].title`);
    ensureString(item.description, `${fieldName}[${index}].description`);
    ensureString(item.href, `${fieldName}[${index}].href`);

    if (item.kicker !== undefined) {
      ensureString(item.kicker, `${fieldName}[${index}].kicker`);
    }

    if (item.linkLabel !== undefined) {
      ensureString(item.linkLabel, `${fieldName}[${index}].linkLabel`);
    }

    return item;
  });

  ensureUniqueIds(validatedItems, fieldName);

  return validatedItems;
}

function validateMeta(meta) {
  if (!meta || typeof meta !== 'object') {
    throw new Error('Portal content field "meta" must be an object.');
  }

  ensureString(meta.title, 'meta.title');
  ensureString(meta.description, 'meta.description');

  return meta;
}

function validateBrand(brand, fieldName) {
  if (!brand || typeof brand !== 'object') {
    throw new Error(`Portal content field "${fieldName}" must be an object.`);
  }

  ensureString(brand.name, `${fieldName}.name`);
  ensureString(brand.label, `${fieldName}.label`);
  ensureString(brand.markSrc, `${fieldName}.markSrc`);
  ensureString(brand.markAlt, `${fieldName}.markAlt`);

  return brand;
}

function ensureUniqueIds(items, fieldName) {
  const ids = new Set();

  items.forEach((item, index) => {
    const itemId = ensureString(item.id, `${fieldName}[${index}].id`);
    if (ids.has(itemId)) {
      throw new Error(`Portal content field "${fieldName}" contains a duplicate id: ${itemId}`);
    }
    ids.add(itemId);
  });
}

function validateItems(items, fieldName, requiredFields) {
  const validatedItems = ensureArray(items, fieldName).map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Portal content item \"${fieldName}[${index}]\" must be an object.`);
    }

    requiredFields.forEach((requiredField) => {
      ensureString(item[requiredField], `${fieldName}[${index}].${requiredField}`);
    });

    return item;
  });

  ensureUniqueIds(validatedItems, fieldName);

  return validatedItems;
}

function validateUsageItems(items, fieldName) {
  const validatedItems = ensureArray(items, fieldName).map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Portal content item \"${fieldName}[${index}]\" must be an object.`);
    }

    ensureString(item.id, `${fieldName}[${index}].id`);
    ensureString(item.title, `${fieldName}[${index}].title`);
    ensureString(item.description, `${fieldName}[${index}].description`);
    return item;
  });

  ensureUniqueIds(validatedItems, fieldName);

  return validatedItems;
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

export function definePortalContent(content) {
  if (!content || typeof content !== 'object') {
    throw new Error('Portal content must be an object.');
  }

  validateMeta(content.meta);
  validateSection(content.hero, 'hero');
  validateBrand(content.hero.brand, 'hero.brand');
  validateLink(content.hero.primaryAction, 'hero.primaryAction');
  validateLink(content.hero.secondaryAction, 'hero.secondaryAction');
  ensureString(content.hero.panelTitle, 'hero.panelTitle');
  ensureArray(content.hero.signals, 'hero.signals').forEach((signal, index) => {
    ensureString(signal, `hero.signals[${index}]`);
  });

  validateSection(content.quickActions, 'quickActions');
  validateItems(content.quickActions.items, 'quickActions.items', ['id', 'title', 'description', 'href']);

  validateSection(content.toolMatrix, 'toolMatrix');
  validateItems(content.toolMatrix.items, 'toolMatrix.items', ['id', 'title', 'description', 'href', 'badge', 'linkLabel']);

  validateSection(content.trackMap, 'trackMap');
  validateItems(content.trackMap.items, 'trackMap.items', ['id', 'title', 'description', 'href', 'linkLabel']);
  content.trackMap.items.forEach((item, index) => {
    ensureArray(item.bullets, `trackMap.items[${index}].bullets`).forEach((bullet, bulletIndex) => {
      ensureString(bullet, `trackMap.items[${index}].bullets[${bulletIndex}]`);
    });
  });

  validateSection(content.learningPath, 'learningPath');
  validateItems(content.learningPath.items, 'learningPath.items', ['id', 'title', 'description', 'href', 'badge', 'linkLabel']);

  validateSection(content.featuredDocs, 'featuredDocs');
  validateCollectionMetadata(content.featuredDocs.collections, 'featuredDocs.collections');

  validateSection(content.latestBriefs, 'latestBriefs');
  validateItems(content.latestBriefs.items, 'latestBriefs.items', ['id', 'title', 'description', 'href', 'badge', 'linkLabel']);

  validateSection(content.teachingVideos, 'teachingVideos');
  validateLink(content.teachingVideos.primaryAction, 'teachingVideos.primaryAction');

  validateSection(content.howToUse, 'howToUse');
  validateUsageItems(content.howToUse.items, 'howToUse.items');
  validateLink(content.howToUse.primaryAction, 'howToUse.primaryAction');

  return deepFreeze(content);
}
