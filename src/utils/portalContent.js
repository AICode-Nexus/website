function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Portal content field \"${fieldName}\" must be a non-empty string.`);
  }

  return value;
}

const ACTIONABLE_PORTAL_ROUTE_PATTERN =
  /^\/docs\/(?:start\/30-minute-quick-start|workflows\/playbooks\/[^/]+|case-studies(?:\/[^/]+)?|tools\/(?:platforms|control-planes|execution-stacks|terminal-agents|ide-first)\/[^/]+\/quick-start|workflows\/patterns\/[^/]+\/runbook)$/u;

const HUB_PORTAL_ROUTE_PATTERN =
  /^\/docs\/(?:tools|workflows|case-studies|development-modes|standards|architecture|ecosystem)$/u;

const BLOG_POST_ROUTE_PATTERN = /^\/blog\/[^/]+(?:\/[^/]+)*$/u;

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

function validateRouteByPattern(href, fieldName, pattern, expectation) {
  if (!pattern.test(href)) {
    throw new Error(`Portal content field "${fieldName}.href" must ${expectation}. Received: ${href}`);
  }
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
  validateRouteByPattern(
    content.hero.primaryAction.href,
    'hero.primaryAction',
    ACTIONABLE_PORTAL_ROUTE_PATTERN,
    'point directly to an actionable tutorial, runbook, playbook, or case-study route',
  );
  validateRouteByPattern(
    content.hero.secondaryAction.href,
    'hero.secondaryAction',
    ACTIONABLE_PORTAL_ROUTE_PATTERN,
    'point directly to an actionable tutorial, runbook, playbook, or case-study route',
  );
  ensureString(content.hero.panelTitle, 'hero.panelTitle');
  ensureArray(content.hero.signals, 'hero.signals').forEach((signal, index) => {
    ensureString(signal, `hero.signals[${index}]`);
  });

  validateSection(content.advancedTopics, 'advancedTopics');
  validateItems(content.advancedTopics.items, 'advancedTopics.items', ['id', 'title', 'description', 'href']);
  content.advancedTopics.items.forEach((item, index) => {
    validateRouteByPattern(
      item.href,
      `advancedTopics.items[${index}]`,
      HUB_PORTAL_ROUTE_PATTERN,
      'point to an advanced-topic hub route',
    );
  });

  validateSection(content.starterTracks, 'starterTracks');
  validateItems(content.starterTracks.items, 'starterTracks.items', [
    'id',
    'title',
    'description',
    'href',
    'badge',
    'linkLabel',
  ]);
  content.starterTracks.items.forEach((item, index) => {
    ensureArray(item.bullets, `starterTracks.items[${index}].bullets`).forEach((bullet, bulletIndex) => {
      ensureString(bullet, `starterTracks.items[${index}].bullets[${bulletIndex}]`);
    });
    validateRouteByPattern(
      item.href,
      `starterTracks.items[${index}]`,
      ACTIONABLE_PORTAL_ROUTE_PATTERN,
      'point directly to an actionable tutorial, runbook, playbook, or case-study route',
    );
  });

  ['featuredToolTutorials', 'featuredWorkflowTutorials', 'featuredCaseStudies'].forEach((fieldName) => {
    validateSection(content[fieldName], fieldName);
    validateLink(content[fieldName].primaryAction, `${fieldName}.primaryAction`);
  });
  validateRouteByPattern(
    content.featuredToolTutorials.primaryAction.href,
    'featuredToolTutorials.primaryAction',
    HUB_PORTAL_ROUTE_PATTERN,
    'point to the tools hub route',
  );
  validateRouteByPattern(
    content.featuredWorkflowTutorials.primaryAction.href,
    'featuredWorkflowTutorials.primaryAction',
    HUB_PORTAL_ROUTE_PATTERN,
    'point to the workflows hub route',
  );
  validateRouteByPattern(
    content.featuredCaseStudies.primaryAction.href,
    'featuredCaseStudies.primaryAction',
    HUB_PORTAL_ROUTE_PATTERN,
    'point to the case-studies hub route',
  );

  validateSection(content.latestUpdates, 'latestUpdates');
  validateItems(content.latestUpdates.items, 'latestUpdates.items', ['id', 'title', 'description', 'href', 'badge', 'linkLabel']);
  content.latestUpdates.items.forEach((item, index) => {
    validateRouteByPattern(
      item.href,
      `latestUpdates.items[${index}]`,
      BLOG_POST_ROUTE_PATTERN,
      'point to a concrete blog post route',
    );
  });

  return deepFreeze(content);
}
