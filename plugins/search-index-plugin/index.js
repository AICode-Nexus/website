const {
  resolveContentFormKey,
  resolveDomainKey,
  resolveEntryRoleKey,
  resolveJourneyStageKey,
} = require('../../src/data/knowledgeModel');
const teachingVideoCatalog = require('../../src/data/teachingVideos.generated.json');

const TEACHING_VIDEO_VIDEO_CATALOG_PATH = '/docs/resources/videos';
const TEACHING_VIDEO_COURSE_CATALOG_PATH = '/docs/resources/courses';
const SEARCH_INDEX_MODULE_NAME = 'site-search-index.json';

function normalizeTagValues(tags = []) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map((tag) => {
      if (typeof tag === 'string') {
        return tag.trim();
      }

      if (tag && typeof tag === 'object') {
        return String(tag.label ?? tag.name ?? '').trim();
      }

      return '';
    })
    .filter(Boolean);
}

function buildSearchEntry(sectionLabel, metadata, overrides = {}) {
  if (!metadata?.title || !metadata?.permalink || metadata.unlisted || metadata.draft) {
    return null;
  }

  const frontMatter = metadata.frontMatter ?? {};
  const domain = overrides.domain ?? resolveDomainKey(frontMatter);
  const journeyStage = overrides.journeyStage ?? resolveJourneyStageKey(frontMatter);
  const entryRole = overrides.entryRole ?? resolveEntryRoleKey(frontMatter);
  const contentForm = resolveContentFormKey(frontMatter, overrides.contentForm);

  return {
    id: metadata.id ?? metadata.permalink,
    title: metadata.title,
    description: metadata.description ?? '',
    permalink: metadata.permalink,
    sectionLabel,
    tags:
      overrides.tags ??
      normalizeTagValues(metadata.tags ?? frontMatter.tags),
    keywords:
      overrides.keywords ??
      [
        metadata.id,
        metadata.source,
        metadata.sourceDirName,
        frontMatter.sidebar_label,
        frontMatter.track,
        domain,
        frontMatter.entry_role,
        frontMatter.content_form,
        frontMatter.journey_stage,
        frontMatter.audience,
        frontMatter.kind,
        frontMatter.reviewed_at,
        frontMatter.source_window_end,
        frontMatter.market_status,
      ]
        .filter(Boolean)
        .join(' '),
    entityType: overrides.entityType ?? 'knowledge',
    domain,
    journeyStage,
    entryRole,
    contentForm,
    resourceType: overrides.resourceType ?? '',
  };
}

function getCurrentDocsVersion(loadedVersions) {
  return (
    loadedVersions.find((version) => version.versionName === 'current') ??
    loadedVersions.find((version) => version.isLast) ??
    loadedVersions[0]
  );
}

function buildCatalogPermalink({resourceType = 'videos', videoId = '', courseId = ''} = {}) {
  const params = new URLSearchParams();

  if (videoId) {
    params.set('video', videoId);
  }

  if (courseId) {
    params.set('course', courseId);
  }

  const basePath =
    resourceType === 'courses'
      ? TEACHING_VIDEO_COURSE_CATALOG_PATH
      : TEACHING_VIDEO_VIDEO_CATALOG_PATH;
  const search = params.toString();

  return `${basePath}${search ? `?${search}` : ''}`;
}

function getTeachingVideoLanguageLabel(language) {
  return (
    {
      zh: '中文',
      en: 'English',
      mixed: '双语',
    }[language] ?? language
  );
}

function stripDailyBriefPrefix(title) {
  return String(title ?? '')
    .replace(/^AI Coding Daily Brief \| \d{4}-\d{2}-\d{2} \| /u, '')
    .trim();
}

function isPublishedBlogPost(blogPost) {
  const frontMatter = blogPost?.metadata?.frontMatter ?? {};

  return !blogPost?.metadata?.unlisted && frontMatter.draft !== true;
}

function toBlogSearchEntry(blogPost) {
  const metadata = blogPost?.metadata;

  if (!metadata || !isPublishedBlogPost(blogPost)) {
    return null;
  }

  return buildSearchEntry('Daily Brief', metadata, {
    contentForm: 'brief',
    entryRole: 'brief',
    tags: normalizeTagValues(metadata.tags),
  });
}

function toBlogUpdate(blogPost) {
  const metadata = blogPost?.metadata;

  if (!metadata || !isPublishedBlogPost(blogPost)) {
    return null;
  }

  const badge =
    metadata.date instanceof Date
      ? metadata.date.toISOString().slice(0, 10)
      : String(metadata.date ?? '').slice(0, 10);

  return {
    id: blogPost.id ?? metadata.permalink,
    badge,
    title: stripDailyBriefPrefix(metadata.title) || metadata.title,
    description: metadata.description ?? '',
    href: metadata.permalink,
    linkLabel: '阅读日报',
  };
}

function compareBlogPostsByDate(left, right) {
  const leftTime = new Date(left?.metadata?.date ?? 0).valueOf();
  const rightTime = new Date(right?.metadata?.date ?? 0).valueOf();

  if (rightTime !== leftTime) {
    return rightTime - leftTime;
  }

  return String(left?.metadata?.title ?? '').localeCompare(
    String(right?.metadata?.title ?? ''),
    'zh-CN',
  );
}

function toTeachingVideoEntry(item) {
  return buildSearchEntry(
    '全部视频',
    {
      id: `video-${item.id}`,
      title: item.title,
      description: `${item.creator} · ${item.publishedAt} · ${item.tool} · ${item.platform}`,
      permalink: buildCatalogPermalink({resourceType: 'videos', videoId: item.id}),
      tags: [
        {label: item.tool},
        {label: item.platform},
        {label: getTeachingVideoLanguageLabel(item.language)},
        {label: item.format},
        {label: item.level},
      ],
      frontMatter: {
        domain: 'tools',
        entry_role: 'resource',
        content_form: 'resource',
      },
    },
    {
      entityType: 'video',
      domain: 'tools',
      entryRole: 'resource',
      contentForm: 'resource',
      resourceType: 'video',
      keywords: [item.creator, item.summary, item.topics.join(' '), item.courseId].join(' '),
    },
  );
}

function toTeachingVideoCourseEntry(course) {
  return buildSearchEntry(
    '课程目录',
    {
      id: `course-${course.id}`,
      title: course.title,
      description: `${course.creator} · ${course.tool} · ${course.episodeCount} 个视频`,
      permalink: buildCatalogPermalink({resourceType: 'courses', courseId: course.id}),
      tags: [
        {label: course.tool},
        {label: getTeachingVideoLanguageLabel(course.language)},
      ],
      frontMatter: {
        domain: 'tools',
        entry_role: 'resource',
        content_form: 'resource',
      },
    },
    {
      entityType: 'course',
      domain: 'tools',
      entryRole: 'resource',
      contentForm: 'resource',
      resourceType: 'course',
      keywords: [course.creator, course.latestEpisodeAt, course.coverVideoId].join(' '),
    },
  );
}

function dedupeEntries(entries) {
  const uniqueEntries = new Map();

  entries.forEach((entry) => {
    if (entry && !uniqueEntries.has(entry.permalink)) {
      uniqueEntries.set(entry.permalink, entry);
    }
  });

  return Array.from(uniqueEntries.values());
}

function hasMeaningfulCourseCatalog(catalog) {
  return Array.isArray(catalog?.courses)
    ? catalog.courses.some(
        (course) => Number.isInteger(course?.episodeCount) && course.episodeCount > 1,
      )
    : false;
}

module.exports = function searchIndexPlugin() {
  return {
    name: 'aicode-search-index',

    async allContentLoaded({allContent, actions}) {
      const docsPluginData = allContent['docusaurus-plugin-content-docs']?.default;
      const blogPluginData = allContent['docusaurus-plugin-content-blog']?.default;

      if (!docsPluginData?.loadedVersions?.length) {
        throw new Error('aicode-search-index requires the default docs plugin to be enabled.');
      }

      const docsVersion = getCurrentDocsVersion(docsPluginData.loadedVersions);
      const courseCatalogAvailable = hasMeaningfulCourseCatalog(teachingVideoCatalog);
      const docEntries = docsVersion.docs
        .filter((doc) => !doc.unlisted && !doc.draft)
        .map((doc) =>
          buildSearchEntry('知识文档', {
            id: doc.id,
            title: doc.title,
            description: doc.description ?? '',
            permalink: doc.permalink,
            source: doc.source,
            sourceDirName: doc.sourceDirName,
            tags: doc.tags ?? doc.frontMatter?.tags,
            frontMatter: doc.frontMatter,
          }),
        )
        .filter(Boolean);
      const blogEntries = (blogPluginData?.blogPosts ?? [])
        .map(toBlogSearchEntry)
        .filter(Boolean);
      const teachingVideoEntries = teachingVideoCatalog.items
        .map(toTeachingVideoEntry)
        .filter(Boolean);
      const teachingVideoCourseEntries = courseCatalogAvailable
        ? teachingVideoCatalog.courses.map(toTeachingVideoCourseEntry).filter(Boolean)
        : [];
      const latestPublishedBlogUpdates = (blogPluginData?.blogPosts ?? [])
        .filter(isPublishedBlogPost)
        .sort(compareBlogPostsByDate)
        .map(toBlogUpdate)
        .filter(Boolean);

      const entries = dedupeEntries([
        ...docEntries,
        ...blogEntries,
        ...teachingVideoEntries,
        ...teachingVideoCourseEntries,
      ]);

      await actions.createData(SEARCH_INDEX_MODULE_NAME, {
        generatedAt: new Date().toISOString(),
        entries,
      });

      actions.setGlobalData({
        courseCatalogAvailable,
        latestPublishedBlogUpdates,
      });
    },
  };
};
