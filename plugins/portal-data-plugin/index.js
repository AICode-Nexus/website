const FEATURED_DOC_COLLECTIONS = [
  {id: 'comparison', kind: 'comparison'},
  {id: 'playbook', kind: 'playbook'},
  {id: 'insight', kind: 'insight'},
];

const VALID_PILLARS = new Set([
  'development-modes',
  'workflows',
  'tools',
  'standards',
  'architecture',
]);

const VALID_MARKET_STATUSES = new Set(['current', 'watch', 'legacy']);

const PILLAR_LABELS = {
  'development-modes': 'AI 开发方式',
  workflows: 'AI 工作流',
  tools: 'AI 编程工具',
  standards: 'AI 规范',
  architecture: 'AI 架构',
};

const MARKET_STATUS_LABELS = {
  current: '当前主线',
  watch: '持续观察',
  legacy: '旧赛道透镜',
};

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
  const pillar = frontMatter.pillar;
  const marketStatus = frontMatter.market_status;

  if (!VALID_PILLARS.has(pillar)) {
    throw new Error(
      `Knowledge doc "${doc.id}" must define a valid frontmatter.pillar (${Array.from(
        VALID_PILLARS,
      ).join(', ')}).`,
    );
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
}

function toFeaturedDocItem(doc) {
  const frontMatter = doc.frontMatter ?? {};
  const reviewedAt = ensureDateField(frontMatter.reviewed_at, 'reviewed_at', doc.id);

  return {
    id: doc.id.replace(/\//g, '-'),
    title: doc.title,
    description: ensureDocSummary(doc),
    href: doc.permalink,
    meta: `${PILLAR_LABELS[frontMatter.pillar]} · 复核 ${reviewedAt}`,
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
              frontMatter.kind === collection.kind &&
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
