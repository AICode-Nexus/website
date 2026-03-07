function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Handbook catalog field "${fieldName}" must be a non-empty string.`);
  }

  return value;
}

function ensureArray(value, fieldName) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Handbook catalog field "${fieldName}" must be a non-empty array.`);
  }

  return value;
}

function ensureMinimumLength(value, fieldName, minimum) {
  const items = ensureArray(value, fieldName);
  if (items.length < minimum) {
    throw new Error(
      `Handbook catalog field "${fieldName}" must contain at least ${minimum} item(s), received ${items.length}.`,
    );
  }
  return items;
}

function ensureStringArray(value, fieldName, minimum = 1) {
  return ensureMinimumLength(value, fieldName, minimum).map((item, index) =>
    ensureString(item, `${fieldName}[${index}]`),
  );
}

function ensureObject(value, fieldName) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Handbook catalog field "${fieldName}" must be an object.`);
  }

  return value;
}

function ensureEnumValue(value, fieldName, allowedValues) {
  const normalizedValue = ensureString(value, fieldName);
  if (!allowedValues.includes(normalizedValue)) {
    throw new Error(
      `Handbook catalog field "${fieldName}" must be one of ${allowedValues.join(', ')}; received "${normalizedValue}".`,
    );
  }
  return normalizedValue;
}

function ensureHttpUrl(value, fieldName) {
  const url = ensureString(value, fieldName);
  if (!/^https?:\/\//u.test(url)) {
    throw new Error(`Handbook catalog field "${fieldName}" must be an absolute http(s) URL.`);
  }
  return url;
}

function ensureInternalDocHref(value, fieldName) {
  const href = ensureString(value, fieldName);
  if (!/^\/docs\//u.test(href) && !/^\/blog(?:\/|$)/u.test(href)) {
    throw new Error(`Handbook catalog field "${fieldName}" must point to an internal /docs or /blog route.`);
  }
  return href;
}

function ensureIsoDate(value, fieldName) {
  const dateValue = ensureString(value, fieldName);
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(dateValue)) {
    throw new Error(`Handbook catalog field "${fieldName}" must use YYYY-MM-DD format.`);
  }
  return dateValue;
}

function ensureLinkObject(value, fieldName) {
  const link = ensureObject(value, fieldName);
  ensureString(link.title, `${fieldName}.title`);
  ensureInternalDocHref(link.href, `${fieldName}.href`);
  ensureString(link.description, `${fieldName}.description`);

  return link;
}

function ensureSourceObject(value, fieldName) {
  const source = ensureObject(value, fieldName);
  ensureString(source.label, `${fieldName}.label`);
  ensureHttpUrl(source.url, `${fieldName}.url`);

  return source;
}

function ensureUniqueIds(items, fieldName) {
  const ids = new Set();

  items.forEach((item, index) => {
    const itemId = ensureString(item.id, `${fieldName}[${index}].id`);
    if (ids.has(itemId)) {
      throw new Error(`Handbook catalog field "${fieldName}" contains duplicate id "${itemId}".`);
    }
    ids.add(itemId);
  });
}

function ensureStepArray(value, fieldName, minimum = 1) {
  return ensureMinimumLength(value, fieldName, minimum).map((item, index) => {
    const step = ensureObject(item, `${fieldName}[${index}]`);
    ensureString(step.name, `${fieldName}[${index}].name`);
    ensureString(step.description, `${fieldName}[${index}].description`);
    ensureString(step.artifact, `${fieldName}[${index}].artifact`);
    return step;
  });
}

function ensureExampleArray(value, fieldName, minimum = 1) {
  return ensureMinimumLength(value, fieldName, minimum).map((item, index) => {
    const example = ensureObject(item, `${fieldName}[${index}]`);
    ensureString(example.title, `${fieldName}[${index}].title`);
    ensureString(example.description, `${fieldName}[${index}].description`);
    return example;
  });
}

function ensureRoleArray(value, fieldName, minimum = 1) {
  return ensureStringArray(value, fieldName, minimum);
}

function ensureStageArray(value, fieldName, minimum = 1) {
  return ensureMinimumLength(value, fieldName, minimum).map((item, index) => {
    const stage = ensureObject(item, `${fieldName}[${index}]`);
    ensureString(stage.name, `${fieldName}[${index}].name`);
    ensureString(stage.description, `${fieldName}[${index}].description`);
    ensureString(stage.artifact, `${fieldName}[${index}].artifact`);
    return stage;
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

const TOOL_CATEGORIES = [
  'platforms',
  'control-planes',
  'execution-stacks',
  'terminal-agents',
  'ide-first',
];

const WORKFLOW_GROUPS = ['pattern', 'framework', 'community-framework'];

export function defineToolCatalog(catalog) {
  const items = ensureArray(catalog, 'toolCatalog');
  ensureUniqueIds(items, 'toolCatalog');

  items.forEach((item, index) => {
    const fieldName = `toolCatalog[${index}]`;
    const record = ensureObject(item, fieldName);

    ensureString(record.id, `${fieldName}.id`);
    ensureString(record.title, `${fieldName}.title`);

    const category = ensureEnumValue(record.category, `${fieldName}.category`, TOOL_CATEGORIES);
    const docsRoot = ensureString(record.docsRoot, `${fieldName}.docsRoot`);
    if (!docsRoot.startsWith(`/docs/tools/${category}/`)) {
      throw new Error(
        `Handbook catalog field "${fieldName}.docsRoot" must start with "/docs/tools/${category}/".`,
      );
    }

    ensureHttpUrl(record.officialUrl, `${fieldName}.officialUrl`);
    ensureString(record.audience, `${fieldName}.audience`);
    ensureString(record.stage, `${fieldName}.stage`);
    ensureString(record.summary, `${fieldName}.summary`);
    ensureString(record.role, `${fieldName}.role`);
    ensureIsoDate(record.reviewedAt, `${fieldName}.reviewedAt`);
    ensureString(record.marketStatus, `${fieldName}.marketStatus`);

    ensureStringArray(record.bestFor, `${fieldName}.bestFor`, 1);
    ensureMinimumLength(record.workflows, `${fieldName}.workflows`, 1).forEach((entry, entryIndex) =>
      ensureLinkObject(entry, `${fieldName}.workflows[${entryIndex}]`),
    );
    ensureStringArray(record.badFit, `${fieldName}.badFit`, 1);
    ensureMinimumLength(record.combos, `${fieldName}.combos`, 1).forEach((entry, entryIndex) =>
      ensureLinkObject(entry, `${fieldName}.combos[${entryIndex}]`),
    );
    ensureStringArray(record.typicalTasks, `${fieldName}.typicalTasks`, 1);
    ensureStringArray(record.rules, `${fieldName}.rules`, 1);
    ensureStringArray(record.memory, `${fieldName}.memory`, 2);
    ensureStringArray(record.tools, `${fieldName}.tools`, 2);
    ensureStringArray(record.repoAdvice, `${fieldName}.repoAdvice`, 2);
    ensureStringArray(record.integrations, `${fieldName}.integrations`, 1);
    ensureStringArray(record.reviewEvidence, `${fieldName}.reviewEvidence`, 1);
    ensureStringArray(record.governance, `${fieldName}.governance`, 2);
    ensureStringArray(record.strengths, `${fieldName}.strengths`, 2);
    ensureStringArray(record.limits, `${fieldName}.limits`, 2);
    ensureMinimumLength(record.alternatives, `${fieldName}.alternatives`, 1).forEach((entry, entryIndex) =>
      ensureLinkObject(entry, `${fieldName}.alternatives[${entryIndex}]`),
    );
    ensureStringArray(record.exitSignals, `${fieldName}.exitSignals`, 2);
    ensureMinimumLength(record.sources, `${fieldName}.sources`, 2).forEach((entry, entryIndex) =>
      ensureSourceObject(entry, `${fieldName}.sources[${entryIndex}]`),
    );
  });

  return deepFreeze(items);
}

function validatePatternWorkflow(record, fieldName) {
  ensureStringArray(record.bestFor, `${fieldName}.bestFor`, 1);
  ensureStringArray(record.signals, `${fieldName}.signals`, 3);
  ensureStringArray(record.notFor, `${fieldName}.notFor`, 3);
  ensureStepArray(record.steps, `${fieldName}.steps`, 1);
  ensureStringArray(record.handoffs, `${fieldName}.handoffs`, 2);
  ensureStringArray(record.inputs, `${fieldName}.inputs`, 1);
  ensureStringArray(record.outputs, `${fieldName}.outputs`, 1);
  ensureStringArray(record.evidence, `${fieldName}.evidence`, 1);
  ensureStringArray(record.governance, `${fieldName}.governance`, 1);
  ensureStringArray(record.risks, `${fieldName}.risks`, 3);
  ensureStringArray(record.scopeReduction, `${fieldName}.scopeReduction`, 3);
  ensureExampleArray(record.examples, `${fieldName}.examples`, 1);
  ensureMinimumLength(record.toolFit, `${fieldName}.toolFit`, 1).forEach((entry, entryIndex) =>
    ensureLinkObject(entry, `${fieldName}.toolFit[${entryIndex}]`),
  );
}

function validateFrameworkWorkflow(record, fieldName) {
  ensureStringArray(record.bestFor, `${fieldName}.bestFor`, 3);
  ensureString(record.entry, `${fieldName}.entry`);
  ensureStringArray(record.signals, `${fieldName}.signals`, 1);
  ensureRoleArray(record.roles, `${fieldName}.roles`, 1);
  ensureStageArray(record.stages, `${fieldName}.stages`, 1);
  ensureStringArray(record.artifacts, `${fieldName}.artifacts`, 1);
  ensureStringArray(record.handoffs, `${fieldName}.handoffs`, 2);
  ensureStringArray(record.adoption, `${fieldName}.adoption`, 4);
  ensureStringArray(record.integration, `${fieldName}.integration`, 1);
  ensureMinimumLength(record.alternatives, `${fieldName}.alternatives`, 1).forEach((entry, entryIndex) =>
    ensureLinkObject(entry, `${fieldName}.alternatives[${entryIndex}]`),
  );
  ensureStringArray(record.notFor, `${fieldName}.notFor`, 1);
  ensureMinimumLength(record.comboPatterns, `${fieldName}.comboPatterns`, 1).forEach((entry, entryIndex) =>
    ensureLinkObject(entry, `${fieldName}.comboPatterns[${entryIndex}]`),
  );
  ensureStringArray(record.misuse, `${fieldName}.misuse`, 1);
  ensureStringArray(record.maintenanceCosts, `${fieldName}.maintenanceCosts`, 3);
  ensureStringArray(record.exitSignals, `${fieldName}.exitSignals`, 3);
}

export function defineWorkflowCatalog(catalog) {
  const items = ensureArray(catalog, 'workflowCatalog');
  ensureUniqueIds(items, 'workflowCatalog');

  items.forEach((item, index) => {
    const fieldName = `workflowCatalog[${index}]`;
    const record = ensureObject(item, fieldName);

    ensureString(record.id, `${fieldName}.id`);
    ensureString(record.title, `${fieldName}.title`);

    const group = ensureEnumValue(record.group, `${fieldName}.group`, WORKFLOW_GROUPS);
    const docsRoot = ensureString(record.docsRoot, `${fieldName}.docsRoot`);
    const expectedPrefixByGroup = {
      pattern: '/docs/workflows/patterns/',
      framework: '/docs/workflows/frameworks/',
      'community-framework': '/docs/workflows/community-frameworks/',
    };
    if (!docsRoot.startsWith(expectedPrefixByGroup[group])) {
      throw new Error(
        `Handbook catalog field "${fieldName}.docsRoot" must start with "${expectedPrefixByGroup[group]}".`,
      );
    }

    ensureHttpUrl(record.officialUrl, `${fieldName}.officialUrl`);
    ensureString(record.audience, `${fieldName}.audience`);
    ensureString(record.stage, `${fieldName}.stage`);
    ensureString(record.summary, `${fieldName}.summary`);
    ensureIsoDate(record.reviewedAt, `${fieldName}.reviewedAt`);
    ensureString(record.marketStatus, `${fieldName}.marketStatus`);
    ensureMinimumLength(record.sources, `${fieldName}.sources`, 1).forEach((entry, entryIndex) =>
      ensureSourceObject(entry, `${fieldName}.sources[${entryIndex}]`),
    );

    if (group === 'pattern') {
      validatePatternWorkflow(record, fieldName);
      return;
    }

    validateFrameworkWorkflow(record, fieldName);
  });

  return deepFreeze(items);
}
