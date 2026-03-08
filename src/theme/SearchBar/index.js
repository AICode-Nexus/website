import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {useWindowSize} from '@docusaurus/theme-common';
import {teachingVideoCatalog} from '@site/src/data/teachingVideos';
import {
  getTeachingVideoCoursePermalink,
  getTeachingVideoItemPermalink,
  getTeachingVideoLanguageLabel,
} from '@site/src/utils/teachingVideos';
import styles from './styles.module.css';
const {
  CONTENT_FORM_LABELS,
  ENTRY_ROLE_LABELS,
  getDomainLabel,
  getJourneyStageLabel,
  resolveContentFormKey,
  resolveDomainKey,
  resolveEntryRoleKey,
  resolveJourneyStageKey,
} = require('@site/src/data/knowledgeModel');

const RESULT_GROUPS = [
  {id: 'knowledge', label: '知识文档', limit: 4},
  {id: 'video', label: '视频', limit: 3},
  {id: 'course', label: '课程', limit: 3},
];

const docMetadataContext = require.context(
  '@generated/docusaurus-plugin-content-docs/default',
  false,
  /^\.\/site-docs-.*\.json$/,
);

const blogMetadataContext = require.context(
  '@generated/docusaurus-plugin-content-blog/default',
  false,
  /^\.\/site-blog-.*\.json$/,
);

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
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
    tags: Array.isArray(metadata.tags)
      ? metadata.tags
          .map((tag) => tag?.label)
          .filter(Boolean)
      : [],
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

function loadEntries(context, sectionLabel, overrides = {}) {
  return context
    .keys()
    .sort()
    .map((key) => buildSearchEntry(sectionLabel, context(key), overrides))
    .filter(Boolean);
}

function buildTeachingVideoEntries() {
  const videoEntries = teachingVideoCatalog.items.map((video) =>
    buildSearchEntry(
      '视频目录',
      {
        id: `video-${video.id}`,
        title: video.title,
        description: `${video.creator} · ${video.publishedAt} · ${video.tool} · ${video.platform}`,
        permalink: getTeachingVideoItemPermalink(video.id),
        tags: [
          {label: video.tool},
          {label: video.platform},
          {label: getTeachingVideoLanguageLabel(video.language)},
          {label: video.format},
          {label: video.level},
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
        keywords: [video.creator, video.summary, video.topics.join(' '), video.courseId].join(' '),
      },
    ),
  );

  const courseEntries = teachingVideoCatalog.courses.map((course) =>
    buildSearchEntry(
      '课程目录',
      {
        id: `course-${course.id}`,
        title: course.title,
        description: `${course.creator} · ${course.tool} · ${course.episodeCount} 个视频`,
        permalink: getTeachingVideoCoursePermalink(course.id),
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
    ),
  );

  return [...videoEntries, ...courseEntries];
}

function dedupeEntries(entries) {
  const uniqueEntries = new Map();

  entries.forEach((entry) => {
    if (!uniqueEntries.has(entry.permalink)) {
      uniqueEntries.set(entry.permalink, entry);
    }
  });

  return Array.from(uniqueEntries.values());
}

const searchEntries = dedupeEntries([
  ...loadEntries(docMetadataContext, '知识文档'),
  ...loadEntries(blogMetadataContext, 'Daily Brief', {
    contentForm: 'brief',
    entryRole: 'brief',
  }),
  ...buildTeachingVideoEntries(),
]);

function scoreEntry(entry, query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const queryParts = normalizedQuery.split(/\s+/).filter(Boolean);
  const title = normalizeText(entry.title);
  const description = normalizeText(entry.description);
  const tags = normalizeText(entry.tags.join(' '));
  const keywords = normalizeText(entry.keywords);
  const permalink = normalizeText(entry.permalink);

  let score = 0;

  if (title === normalizedQuery) {
    score += 140;
  }

  if (title.startsWith(normalizedQuery)) {
    score += 90;
  }

  if (title.includes(normalizedQuery)) {
    score += 60;
  }

  if (tags.includes(normalizedQuery)) {
    score += 35;
  }

  if (description.includes(normalizedQuery)) {
    score += 25;
  }

  if (keywords.includes(normalizedQuery)) {
    score += 20;
  }

  if (permalink.includes(normalizedQuery)) {
    score += 15;
  }

  queryParts.forEach((part) => {
    if (title.includes(part)) {
      score += 16;
    }

    if (tags.includes(part)) {
      score += 10;
    }

    if (description.includes(part)) {
      score += 8;
    }

    if (keywords.includes(part)) {
      score += 6;
    }
  });

  return score;
}

function formatResultMeta(entry) {
  const metaParts = [entry.sectionLabel];
  const domainLabel = getDomainLabel(entry.domain, {short: true});

  if (domainLabel) {
    metaParts.push(domainLabel);
  }

  if (entry.entryRole && ['start', 'index', 'archive', 'admin'].includes(entry.entryRole)) {
    metaParts.push(ENTRY_ROLE_LABELS[entry.entryRole] ?? entry.entryRole);
  }

  if (entry.journeyStage) {
    metaParts.push(getJourneyStageLabel(entry.journeyStage) ?? entry.journeyStage);
  }

  if (
    entry.contentForm &&
    !(entry.entityType !== 'knowledge' && ['resource', 'brief'].includes(entry.contentForm)) &&
    entry.contentForm !== 'brief'
  ) {
    metaParts.push(CONTENT_FORM_LABELS[entry.contentForm] ?? entry.contentForm);
  }

  return metaParts.join(' · ');
}

function findMatches(query) {
  const scoredEntries = searchEntries
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, query),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  return RESULT_GROUPS.map((group) => ({
    ...group,
    items: scoredEntries
      .filter((entry) => entry.entityType === group.id)
      .slice(0, group.limit),
  })).filter((group) => group.items.length > 0);
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const history = useHistory();
  const windowSize = useWindowSize();

  const groups = findMatches(query);
  const firstMatch =
    groups
      .flatMap((group) => group.items)
      .sort((left, right) => right.score - left.score)[0] ?? null;
  const hasQuery = query.trim().length > 0;
  const showPanel = isOpen && hasQuery;

  useEffect(() => {
    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (windowSize === 'mobile') {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!firstMatch) {
      return;
    }

    history.push(firstMatch.permalink);
    setIsOpen(false);
    setQuery('');
  }

  function handleChange(event) {
    setQuery(event.target.value);
    setIsOpen(true);
  }

  function handleResultClick() {
    setIsOpen(false);
    setQuery('');
  }

  return (
    <div className={styles.searchBar} ref={containerRef}>
      <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
        <span aria-hidden="true" className={styles.searchIcon} />
        <input
          aria-controls="global-site-search-results"
          aria-expanded={showPanel}
          aria-label="搜索全站内容"
          className={styles.searchInput}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder="搜索全站..."
          type="search"
          value={query}
        />
      </form>
      {showPanel && (
        <div className={styles.resultsPanel} id="global-site-search-results">
          {groups.length ? (
            <div className={styles.resultGroups}>
              {groups.map((group) => (
                <section className={styles.resultGroup} key={group.id}>
                  <p className={styles.resultGroupTitle}>{group.label}</p>
                  <ul className={styles.resultsList}>
                    {group.items.map((match) => (
                      <li key={match.permalink}>
                        <Link
                          className={styles.resultLink}
                          onClick={handleResultClick}
                          to={match.permalink}
                        >
                          <span className={styles.resultMeta}>{formatResultMeta(match)}</span>
                          <strong className={styles.resultTitle}>{match.title}</strong>
                          {match.description ? (
                            <span className={styles.resultDescription}>
                              {match.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>没有找到匹配内容</div>
          )}
        </div>
      )}
    </div>
  );
}
