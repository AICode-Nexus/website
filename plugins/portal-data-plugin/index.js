const HOMEPAGE_COLLECTIONS = [
  {
    key: 'featuredToolTutorials',
    contentForm: 'tutorial',
    domain: 'tools',
    limit: 4,
  },
  {
    key: 'featuredWorkflowTutorials',
    contentForm: 'tutorial',
    domain: 'workflows',
    limit: 4,
  },
  {
    key: 'featuredCaseStudies',
    contentForm: 'case-study',
    limit: 4,
  },
];

const {
  MARKET_STATUS_LABELS,
  VALID_MARKET_STATUSES,
  VALID_CONTENT_FORMS,
  VALID_DOMAINS,
  VALID_ENTRY_ROLES,
  VALID_JOURNEY_STAGES,
  getDomainLabel,
  getJourneyStageLabel,
  resolveContentFormKey,
  resolveDomainKey,
  resolveEntryRoleKey,
  resolveJourneyStageKey,
} = require('../../src/data/knowledgeModel');

const titleCollator = new Intl.Collator('zh-CN', {
  numeric: true,
  sensitivity: 'base',
});

function flattenSidebarDocIds(items, docIds = []) {
  items.forEach((item) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    if (item.type === 'doc' || item.type === 'ref') {
      docIds.push(item.id);
      return;
    }

    if (item.type === 'category') {
      if (item.link?.type === 'doc') {
        docIds.push(item.link.id);
      }
      flattenSidebarDocIds(item.items, docIds);
    }
  });

  return docIds;
}

function createSidebarOrderMap(version) {
  const orderedIds = Object.values(version.sidebars ?? {}).flatMap((sidebar) =>
    flattenSidebarDocIds(sidebar),
  );

  return new Map(orderedIds.map((id, index) => [id, index]));
}

function getCurrentDocsVersion(loadedVersions) {
  return (
    loadedVersions.find((version) => version.versionName === 'current') ??
    loadedVersions.find((version) => version.isLast) ??
    loadedVersions[0]
  );
}

function ensureDocSummary(doc) {
  if (typeof doc.description !== 'string' || doc.description.trim() === '') {
    throw new Error(
      `Featured homepage doc "${doc.id}" must define a non-empty description/frontmatter.description.`,
    );
  }

  return doc.description.trim();
}

function isKnowledgeDoc(doc) {
  return !doc.id.startsWith('site-admin/');
}

function formatDateValue(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return null;
}

function ensureDateField(value, fieldName, docId) {
  const formatted = formatDateValue(value);

  if (!formatted) {
    throw new Error(
      `Knowledge doc "${docId}" must define frontmatter.${fieldName} in YYYY-MM-DD format.`,
    );
  }

  return formatted;
}

function ensureStringField(value, fieldName, docId) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Knowledge doc "${docId}" must define a non-empty frontmatter.${fieldName}.`);
  }

  return value.trim();
}

function ensureArrayField(value, fieldName, docId) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Knowledge doc "${docId}" must define a non-empty frontmatter.${fieldName}.`);
  }

  return value.map((item) => String(item).trim()).filter(Boolean);
}

function ensureEstimatedTime(value, docId) {
  if (typeof value === 'number' && value > 0) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '' && /^\d+$/.test(value.trim())) {
    return Number.parseInt(value.trim(), 10);
  }

  throw new Error(`Knowledge doc "${docId}" must define a positive frontmatter.estimated_time.`);
}

function validateTutorialFields(frontMatter, docId) {
  ensureArrayField(frontMatter.tutorial_series, 'tutorial_series', docId);
  ensureEstimatedTime(frontMatter.estimated_time, docId);
  ensureArrayField(frontMatter.prerequisites, 'prerequisites', docId);
  ensureStringField(frontMatter.deliverable, 'deliverable', docId);
}

function validateCaseStudyFields(frontMatter, docId) {
  ensureStringField(frontMatter.case_type, 'case_type', docId);
  ensureStringField(frontMatter.scenario, 'scenario', docId);
  ensureArrayField(frontMatter.tool_stack, 'tool_stack', docId);
  ensureStringField(frontMatter.verification, 'verification', docId);
}

function validateKnowledgeDoc(doc) {
  const frontMatter = doc.frontMatter ?? {};
  const domain = resolveDomainKey(frontMatter);
  const marketStatus = frontMatter.market_status;
  const journeyStage = resolveJourneyStageKey(frontMatter);
  const entryRole = resolveEntryRoleKey(frontMatter);
  const contentForm = resolveContentFormKey(frontMatter);

  if (!frontMatter.domain || !VALID_DOMAINS.has(domain)) {
    throw new Error(
      `Knowledge doc "${doc.id}" must define a valid frontmatter.domain (${Array.from(
        VALID_DOMAINS,
      ).join(', ')}).`,
    );
  }

  if (Object.hasOwn(frontMatter, 'pillar')) {
    throw new Error(`Knowledge doc "${doc.id}" must not define legacy frontmatter.pillar.`);
  }

  ensureDateField(frontMatter.reviewed_at, 'reviewed_at', doc.id);
  ensureDateField(frontMatter.source_window_end, 'source_window_end', doc.id);

  if (!VALID_MARKET_STATUSES.has(marketStatus)) {
    throw new Error(
      `Knowledge doc "${doc.id}" must define a valid frontmatter.market_status (${Array.from(
        VALID_MARKET_STATUSES,
      ).join(', ')}).`,
    );
  }

  if (!frontMatter.journey_stage || !VALID_JOURNEY_STAGES.has(journeyStage)) {
    throw new Error(
      `Knowledge doc "${doc.id}" must define a valid frontmatter.journey_stage (${Array.from(
        VALID_JOURNEY_STAGES,
      ).join(', ')}).`,
    );
  }

  if (!frontMatter.entry_role || !VALID_ENTRY_ROLES.has(entryRole)) {
    throw new Error(
      `Knowledge doc "${doc.id}" must define a valid frontmatter.entry_role (${Array.from(
        VALID_ENTRY_ROLES,
      ).join(', ')}).`,
    );
  }

  if (!frontMatter.content_form || !VALID_CONTENT_FORMS.has(contentForm)) {
    throw new Error(
      `Knowledge doc "${doc.id}" must define a valid frontmatter.content_form (${Array.from(
        VALID_CONTENT_FORMS,
      ).join(', ')}).`,
    );
  }

  if (contentForm === 'tutorial') {
    validateTutorialFields(frontMatter, doc.id);
  }

  if (contentForm === 'case-study') {
    validateCaseStudyFields(frontMatter, doc.id);
  }
}

function toFeaturedDocItem(doc) {
  const frontMatter = doc.frontMatter ?? {};
  const contentForm = resolveContentFormKey(frontMatter);
  const reviewedAt = ensureDateField(frontMatter.reviewed_at, 'reviewed_at', doc.id);
  const domain = resolveDomainKey(frontMatter);
  const journeyStage = resolveJourneyStageKey(frontMatter);
  const tags = [MARKET_STATUS_LABELS[frontMatter.market_status]];
  const bullets = [];
  const metaParts = [getDomainLabel(domain)];

  if (contentForm === 'tutorial') {
    const estimatedTime = ensureEstimatedTime(frontMatter.estimated_time, doc.id);
    const deliverable = ensureStringField(frontMatter.deliverable, 'deliverable', doc.id);
    const prerequisites = ensureArrayField(frontMatter.prerequisites, 'prerequisites', doc.id);
    const tutorialSeries = ensureArrayField(frontMatter.tutorial_series, 'tutorial_series', doc.id);

    metaParts.push(`${estimatedTime} 分钟`);
    bullets.push(`前置条件：${prerequisites[0]}`);
    bullets.push(`交付物：${deliverable}`);
    tags.push(...tutorialSeries.slice(0, 2));

    return {
      id: doc.id.replace(/\//g, '-'),
      badge: '教程',
      title: doc.title,
      description: ensureDocSummary(doc),
      href: doc.permalink,
      linkLabel: '进入教程',
      meta: metaParts.filter(Boolean).join(' · '),
      tags: tags.filter(Boolean),
      bullets,
    };
  }

  if (contentForm === 'case-study') {
    const caseType = ensureStringField(frontMatter.case_type, 'case_type', doc.id);
    const scenario = ensureStringField(frontMatter.scenario, 'scenario', doc.id);
    const toolStack = ensureArrayField(frontMatter.tool_stack, 'tool_stack', doc.id);
    const verification = ensureStringField(frontMatter.verification, 'verification', doc.id);

    metaParts.push(caseType);
    bullets.push(`场景：${scenario}`);
    bullets.push(`验证：${verification}`);
    tags.push(...toolStack.slice(0, 3));

    return {
      id: doc.id.replace(/\//g, '-'),
      badge: '案例',
      title: doc.title,
      description: ensureDocSummary(doc),
      href: doc.permalink,
      linkLabel: '查看案例',
      meta: metaParts.filter(Boolean).join(' · '),
      tags: tags.filter(Boolean),
      bullets,
    };
  }

  if (journeyStage) {
    metaParts.push(getJourneyStageLabel(journeyStage));
  }

  metaParts.push(`复核 ${reviewedAt}`);

  return {
    id: doc.id.replace(/\//g, '-'),
    title: doc.title,
    description: ensureDocSummary(doc),
    href: doc.permalink,
    linkLabel: '查看内容',
    meta: metaParts.filter(Boolean).join(' · '),
    tags: tags.filter(Boolean),
  };
}

function sortDocs(docs, sidebarOrder) {
  return docs.sort((left, right) => {
    const leftOrder = sidebarOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = sidebarOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return titleCollator.compare(left.title, right.title);
  });
}

module.exports = function portalDataPlugin() {
  return {
    name: 'aicode-portal-data',

    async allContentLoaded({allContent, actions}) {
      const docsPluginData = allContent['docusaurus-plugin-content-docs']?.default;

      if (!docsPluginData?.loadedVersions?.length) {
        throw new Error('aicode-portal-data requires the default docs plugin to be enabled.');
      }

      const docsVersion = getCurrentDocsVersion(docsPluginData.loadedVersions);
      const sidebarOrder = createSidebarOrderMap(docsVersion);
      const knowledgeDocs = docsVersion.docs.filter((doc) => isKnowledgeDoc(doc) && !doc.unlisted && !doc.draft);

      knowledgeDocs.forEach(validateKnowledgeDoc);

      const homepageCollections = HOMEPAGE_COLLECTIONS.reduce((collections, collection) => {
        const items = sortDocs(
          docsVersion.docs.filter((doc) => {
            const frontMatter = doc.frontMatter ?? {};
            const contentForm = resolveContentFormKey(frontMatter);
            const domain = resolveDomainKey(frontMatter);

            if (frontMatter.featured !== true || doc.unlisted || doc.draft) {
              return false;
            }

            if (contentForm !== collection.contentForm) {
              return false;
            }

            if (collection.domain && domain !== collection.domain) {
              return false;
            }

            return true;
          }),
          sidebarOrder,
        )
          .slice(0, collection.limit)
          .map(toFeaturedDocItem);

        collections[collection.key] = {items};
        return collections;
      }, {});

      if (
        !homepageCollections.featuredToolTutorials.items.length ||
        !homepageCollections.featuredWorkflowTutorials.items.length ||
        !homepageCollections.featuredCaseStudies.items.length
      ) {
        throw new Error(
          'aicode-portal-data requires featured tool tutorials, workflow tutorials, and case studies for the homepage.',
        );
      }

      actions.setGlobalData(homepageCollections);
    },
  };
};
