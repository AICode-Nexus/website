const FEATURED_DOC_COLLECTIONS = [
  {id: 'comparison', kind: 'comparison'},
  {id: 'playbook', kind: 'playbook'},
  {id: 'insight', kind: 'insight'},
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
}

function toFeaturedDocItem(doc) {
  const frontMatter = doc.frontMatter ?? {};
  const reviewedAt = ensureDateField(frontMatter.reviewed_at, 'reviewed_at', doc.id);
  const domain = resolveDomainKey(frontMatter);
  const journeyStage = resolveJourneyStageKey(frontMatter);
  const metaParts = [getDomainLabel(domain)];

  if (journeyStage) {
    metaParts.push(getJourneyStageLabel(journeyStage));
  }

  metaParts.push(`复核 ${reviewedAt}`);

  return {
    id: doc.id.replace(/\//g, '-'),
    title: doc.title,
    description: ensureDocSummary(doc),
    href: doc.permalink,
    meta: metaParts.filter(Boolean).join(' · '),
    tags: [MARKET_STATUS_LABELS[frontMatter.market_status]],
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

      const featuredDocs = FEATURED_DOC_COLLECTIONS.map((collection) => {
        const items = sortDocs(
          docsVersion.docs.filter((doc) => {
            const frontMatter = doc.frontMatter ?? {};
            return (
              frontMatter.featured === true &&
              resolveContentFormKey(frontMatter) === collection.kind &&
              !doc.unlisted &&
              !doc.draft
            );
          }),
          sidebarOrder,
        ).map(toFeaturedDocItem);

        return {
          id: collection.id,
          items,
        };
      });

      if (!featuredDocs.some((collection) => collection.items.length > 0)) {
        throw new Error(
          'aicode-portal-data could not find any featured docs for homepage collections.',
        );
      }

      actions.setGlobalData({
        featuredDocs: {
          collections: featuredDocs,
        },
      });
    },
  };
};
