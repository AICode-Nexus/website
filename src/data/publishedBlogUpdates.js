const blogMetadataContext = require.context(
  '@generated/docusaurus-plugin-content-blog/default',
  false,
  /^\.\/site-blog-.*\.json$/,
);

function stripDailyBriefPrefix(title) {
  return String(title ?? '').replace(/^AI Coding Daily Brief \| \d{4}-\d{2}-\d{2} \| /u, '').trim();
}

function normalizeUpdate(metadata) {
  if (!metadata?.title || !metadata?.permalink || metadata.unlisted || metadata.draft) {
    return null;
  }

  const frontMatter = metadata.frontMatter ?? {};
  if (frontMatter.draft === true) {
    return null;
  }

  const badge = typeof metadata.date === 'string' ? metadata.date.slice(0, 10) : '';
  const normalizedTitle = stripDailyBriefPrefix(metadata.title) || metadata.title;

  return {
    id: metadata.id ?? metadata.permalink,
    badge,
    title: normalizedTitle,
    description: metadata.description ?? '',
    href: metadata.permalink,
    linkLabel: '阅读日报',
  };
}

export function getLatestPublishedBlogUpdates(limit = 3) {
  const updates = blogMetadataContext
    .keys()
    .map((key) => normalizeUpdate(blogMetadataContext(key)))
    .filter(Boolean);

  const uniqueUpdates = Array.from(
    updates.reduce((map, update) => {
      if (!map.has(update.href)) {
        map.set(update.href, update);
      }
      return map;
    }, new Map()).values(),
  );

  return uniqueUpdates
    .sort((left, right) => right.badge.localeCompare(left.badge))
    .slice(0, limit);
}
