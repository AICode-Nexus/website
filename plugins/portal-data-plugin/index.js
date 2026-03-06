const FEATURED_DOC_COLLECTIONS = [
  {id: 'comparison', kind: 'comparison'},
  {id: 'playbook', kind: 'playbook'},
  {id: 'insight', kind: 'insight'},
];

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

function toFeaturedDocItem(doc) {
  return {
    id: doc.id.replace(/\//g, '-'),
    title: doc.title,
    description: ensureDocSummary(doc),
    href: doc.permalink,
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
