import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import {useWindowSize} from '@docusaurus/theme-common';
import {teachingVideoCatalog, teachingVideoCatalogSync} from '@site/src/data/teachingVideos';
import {
  formatTeachingVideoDuration,
  getTeachingVideoCatalogPermalink,
  getTeachingVideoCourseAnchorId,
  getTeachingVideoCoursePermalink,
  getTeachingVideoItemPermalink,
  getTeachingVideoItemAnchorId,
  getTeachingVideoLanguageLabel,
  searchFocusesTeachingVideoResults,
  TEACHING_VIDEO_RESULTS_SECTION_ID,
} from '@site/src/utils/teachingVideos';
import {
  buildTeachingVideoPagination,
  buildTeachingVideoPaginationTokens,
  createTeachingVideoCatalogSearch,
  filterTeachingVideoItems,
  getUpdatedTeachingVideoCatalogState,
  parseTeachingVideoCatalogSearch,
  TEACHING_VIDEO_PAGE_SIZE,
} from '@site/src/utils/teachingVideoCatalogState.mjs';
import styles from './styles.module.css';

const COURSE_MAP = new Map(teachingVideoCatalog.courses.map((course) => [course.id, course]));

const RESOURCE_COPY = {
  videos: {
    id: 'videos',
    heroTitle: 'AI Code 视频资源中心',
    heroDescription:
      '当前视图只聚焦可直接播放的视频条目。课程聚合已经拆到独立资源页，避免筛选链路被中间层打断。',
    sectionTitle: '视频结果',
    sectionLead: '按平台、语言、工具、主题、形式和难度过滤；结果页只显示当前命中的视频条目。',
    resultsLabel: '条视频',
    summaryLabel: '全部视频',
    emptyState: '当前筛选没有命中视频，建议先清空关键词或切回“全部”。',
  },
  courses: {
    id: 'courses',
    heroTitle: 'AI Code 课程资源中心',
    heroDescription:
      '课程视图基于当前筛选命中的视频结果实时聚合，不再展示与本次筛选无关的全量课程卡片。',
    sectionTitle: '课程结果',
    sectionLead: '课程目录由当前命中的视频集合实时汇总，每门课程都能继续下钻到对应视频列表。',
    resultsLabel: '门课程',
    summaryLabel: '课程目录',
    emptyState: '当前筛选没有聚合出课程，建议先放宽筛选条件或直接回到全部视频。',
  },
};

function FacetSelect({label, value, options, onChange}) {
  return (
    <label className={styles.filterLabel}>
      <span>{label}</span>
      <select className={styles.filterSelect} onChange={onChange} value={value}>
        <option value="all">全部</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label} ({option.count})
          </option>
        ))}
      </select>
    </label>
  );
}

function PaginationPageButton({page, currentPage, onSelect}) {
  return (
    <button
      aria-current={page === currentPage ? 'page' : undefined}
      className={styles.paginationButton}
      onClick={() => {
        if (page !== currentPage) {
          onSelect(page);
        }
      }}
      type="button"
    >
      {page}
    </button>
  );
}

function buildCourseResults(items) {
  const courseBuckets = new Map();

  items.forEach((item) => {
    if (!courseBuckets.has(item.courseId)) {
      courseBuckets.set(item.courseId, []);
    }

    courseBuckets.get(item.courseId).push(item);
  });

  return Array.from(courseBuckets.entries())
    .map(([courseId, videos]) => {
      const course = COURSE_MAP.get(courseId);

      if (!course) {
        return null;
      }

      const sortedVideos = [...videos].sort((left, right) => {
        if (right.publishedAt !== left.publishedAt) {
          return right.publishedAt.localeCompare(left.publishedAt, 'zh-CN');
        }

        return right.featuredScore - left.featuredScore;
      });
      const topicCounts = sortedVideos.reduce((accumulator, video) => {
        video.topics.forEach((topic) => {
          accumulator[topic] = (accumulator[topic] ?? 0) + 1;
        });
        return accumulator;
      }, {});
      const topics = Object.entries(topicCounts)
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'zh-CN'))
        .slice(0, 3)
        .map(([topic]) => topic);

      return {
        ...course,
        coverVideoId: sortedVideos[0]?.id ?? course.coverVideoId,
        filteredEpisodeCount: sortedVideos.length,
        latestFilteredAt: sortedVideos[0]?.publishedAt ?? course.latestEpisodeAt,
        featuredVideos: sortedVideos.slice(0, 3),
        topics,
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (right.latestFilteredAt !== left.latestFilteredAt) {
        return right.latestFilteredAt.localeCompare(left.latestFilteredAt, 'zh-CN');
      }

      return right.filteredEpisodeCount - left.filteredEpisodeCount;
    });
}

function buildCatalogPermalink(resourceType, catalogState, overrides = {}) {
  return getTeachingVideoCatalogPermalink({
    resourceType,
    filters: overrides.filters ?? catalogState.filters,
    query: overrides.query ?? catalogState.query,
    requestedPage: overrides.requestedPage ?? null,
    videoId: overrides.videoId ?? '',
    courseId: overrides.courseId ?? '',
    focusResults: overrides.focusResults ?? false,
  });
}

export default function TeachingVideoCatalogPage({resourceType = 'videos'}) {
  const resource = RESOURCE_COPY[resourceType] ?? RESOURCE_COPY.videos;
  const history = useHistory();
  const location = useLocation();
  const windowSize = useWindowSize();
  const videoSectionRef = useRef(null);
  const pendingScrollRef = useRef('');
  const [catalogState, setCatalogState] = useState(() => parseTeachingVideoCatalogSearch(''));
  const [queryDraft, setQueryDraft] = useState('');
  const isMobileCatalog = windowSize === 'mobile';
  const filteredItems = filterTeachingVideoItems(
    teachingVideoCatalog.items,
    catalogState.filters,
    catalogState.query,
  );
  const scopedVideoItems =
    resource.id === 'videos' && catalogState.targetCourseId
      ? filteredItems.filter((item) => item.courseId === catalogState.targetCourseId)
      : filteredItems;
  const filteredCourses = buildCourseResults(filteredItems);
  const pagedItems = resource.id === 'courses' ? filteredCourses : scopedVideoItems;
  const targetItemId = resource.id === 'courses' ? catalogState.targetCourseId : catalogState.targetVideoId;
  const {currentPage, totalPages, pageItems, rangeStart, rangeEnd, hasMore} = buildTeachingVideoPagination({
    items: pagedItems,
    requestedPage: catalogState.requestedPage,
    hasRequestedPage: catalogState.hasRequestedPage,
    targetItemId,
    mode: isMobileCatalog ? 'mobile' : 'desktop',
  });
  const targetAnchorId = targetItemId
    ? resource.id === 'courses'
      ? getTeachingVideoCourseAnchorId(targetItemId)
      : getTeachingVideoItemAnchorId(targetItemId)
    : '';
  const visibleResultIds = pageItems.map((item) => item.id).join('|');
  const paginationTokens = isMobileCatalog ? [] : buildTeachingVideoPaginationTokens(currentPage, totalPages);
  const lastSyncedAt = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(teachingVideoCatalog.generatedAt));
  const stale = teachingVideoCatalog.metrics.stale.isStale;
  const focusResults = searchFocusesTeachingVideoResults(location.search);
  const preserveTargetsOnPagination = resource.id === 'videos' && Boolean(catalogState.targetCourseId);
  const resultsMeta = resource.id === 'courses'
    ? `当前筛选命中 ${filteredCourses.length} 门课程，对应 ${filteredItems.length} 条视频；当前显示 ${rangeStart}-${rangeEnd} 门课程。`
    : isMobileCatalog
      ? `当前筛选命中 ${scopedVideoItems.length} 条视频，已加载 ${rangeEnd} 条，共 ${totalPages} 批。`
      : `当前筛选命中 ${scopedVideoItems.length} 条视频，当前显示 ${rangeStart}-${rangeEnd} 条，第 ${currentPage}/${totalPages} 页。`;

  useEffect(() => {
    setCatalogState(parseTeachingVideoCatalogSearch(location.search));
  }, [location.search]);

  useEffect(() => {
    setQueryDraft(catalogState.query);
  }, [catalogState.query]);

  function scrollToResultsSection() {
    if (!videoSectionRef.current) {
      return;
    }

    videoSectionRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  function navigateCatalogState(
    patch,
    {
      method = 'replace',
      resetPage = false,
      clearTargets = false,
      scroll = 'none',
    } = {},
  ) {
    const nextState = getUpdatedTeachingVideoCatalogState(catalogState, patch, {resetPage, clearTargets});
    const nextSearch = createTeachingVideoCatalogSearch(nextState);
    const nextUrl = `${location.pathname}${nextSearch}${location.hash || ''}`;
    const currentUrl = `${location.pathname}${location.search}${location.hash || ''}`;

    pendingScrollRef.current = scroll;

    if (nextUrl === currentUrl) {
      if (scroll === 'results-section') {
        scrollToResultsSection();
      }
      return;
    }

    if (method === 'push') {
      history.push(nextUrl);
      return;
    }

    history.replace(nextUrl);
  }

  function applyKeywordSearch(event) {
    event.preventDefault();
    navigateCatalogState(
      {
        query: queryDraft,
      },
      {resetPage: true, clearTargets: true},
    );
  }

  useEffect(() => {
    if (!targetAnchorId && pendingScrollRef.current !== 'results-section') {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (targetAnchorId) {
        const targetElement = document.getElementById(targetAnchorId);

        if (targetElement) {
          targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        pendingScrollRef.current = '';
        return;
      }

      if (pendingScrollRef.current === 'results-section') {
        videoSectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
        pendingScrollRef.current = '';
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.search, targetAnchorId, visibleResultIds]);

  useEffect(() => {
    if (!focusResults) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      videoSectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [focusResults, visibleResultIds]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTitleRow}>
          <h2 className={styles.heroTitle}>{resource.heroTitle}</h2>
          <span className={stale ? `${styles.statusPill} ${styles.statusPillCritical}` : styles.statusPill}>
            {stale ? '数据陈旧' : teachingVideoCatalogSync.pillLabel}
          </span>
        </div>
        <p className={styles.heroDescription}>
          当前目录只展示 {teachingVideoCatalog.windowStart} 到 {teachingVideoCatalog.windowEnd} 的公开教学内容。
          {resource.heroDescription}
        </p>
        <div className={styles.heroMetaRow}>
          <p className={styles.heroMetaText}>最近同步：{lastSyncedAt}</p>
          <p className={styles.heroMetaText}>自动同步周期：{teachingVideoCatalogSync.intervalLabel}</p>
          <p className={styles.heroMetaText}>分页大小：{TEACHING_VIDEO_PAGE_SIZE} 条</p>
          <p className={styles.heroMetaText}>来源：{teachingVideoCatalog.sources.length} 个启用源</p>
        </div>
        <div className={styles.metricsGrid}>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>近 7 天</span>
            <strong className={styles.metricValue}>{teachingVideoCatalog.metrics.recentCounts.days7}</strong>
          </article>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>近 30 天</span>
            <strong className={styles.metricValue}>{teachingVideoCatalog.metrics.recentCounts.days30}</strong>
          </article>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>近 90 天视频数</span>
            <strong className={styles.metricValue}>{teachingVideoCatalog.metrics.videoCount}</strong>
          </article>
          <article className={styles.metricCard}>
            <span className={styles.metricLabel}>近 90 天课程数</span>
            <strong className={styles.metricValue}>{teachingVideoCatalog.metrics.courseCount}</strong>
          </article>
        </div>
        <div className={styles.quickFilters}>
          {teachingVideoCatalog.featured.quickFilters.map((filter) => (
            <Link
              className={styles.quickFilter}
              key={filter.id}
              to={buildCatalogPermalink(resource.id, catalogState, {
                filters: {
                  ...catalogState.filters,
                  [filter.parameter]: filter.value,
                },
                requestedPage: null,
                focusResults: true,
              })}
            >
              {filter.label} · {filter.count}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.filtersPanel}>
        <div className={styles.resourceSwitchRow}>
          <div>
            <h3 className={styles.sectionTitle}>{resource.summaryLabel}</h3>
            <p className={styles.sectionLead}>{resource.sectionLead}</p>
          </div>
          <div className={styles.resourceSwitches}>
            {Object.values(RESOURCE_COPY).map((entry) => (
              <Link
                className={clsx(
                  styles.resourceSwitch,
                  entry.id === resource.id && styles.resourceSwitchActive,
                )}
                key={entry.id}
                to={buildCatalogPermalink(entry.id, catalogState, {
                  requestedPage: null,
                  focusResults,
                })}
              >
                {entry.summaryLabel}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.filterGrid}>
          <FacetSelect
            label="平台"
            onChange={(event) => {
              navigateCatalogState(
                {
                  filters: {
                    platform: event.target.value,
                  },
                },
                {resetPage: true, clearTargets: true},
              );
            }}
            options={teachingVideoCatalog.facets.platforms}
            value={catalogState.filters.platform}
          />
          <FacetSelect
            label="语言"
            onChange={(event) => {
              navigateCatalogState(
                {
                  filters: {
                    language: event.target.value,
                  },
                },
                {resetPage: true, clearTargets: true},
              );
            }}
            options={teachingVideoCatalog.facets.languages}
            value={catalogState.filters.language}
          />
          <FacetSelect
            label="工具"
            onChange={(event) => {
              navigateCatalogState(
                {
                  filters: {
                    tool: event.target.value,
                  },
                },
                {resetPage: true, clearTargets: true},
              );
            }}
            options={teachingVideoCatalog.facets.tools}
            value={catalogState.filters.tool}
          />
          <FacetSelect
            label="主题"
            onChange={(event) => {
              navigateCatalogState(
                {
                  filters: {
                    topic: event.target.value,
                  },
                },
                {resetPage: true, clearTargets: true},
              );
            }}
            options={teachingVideoCatalog.facets.topics}
            value={catalogState.filters.topic}
          />
          <FacetSelect
            label="形式"
            onChange={(event) => {
              navigateCatalogState(
                {
                  filters: {
                    format: event.target.value,
                  },
                },
                {resetPage: true, clearTargets: true},
              );
            }}
            options={teachingVideoCatalog.facets.formats}
            value={catalogState.filters.format}
          />
          <FacetSelect
            label="难度"
            onChange={(event) => {
              navigateCatalogState(
                {
                  filters: {
                    level: event.target.value,
                  },
                },
                {resetPage: true, clearTargets: true},
              );
            }}
            options={teachingVideoCatalog.facets.levels}
            value={catalogState.filters.level}
          />
        </div>
        <div className={styles.filterLabel}>
          <label htmlFor={`teaching-video-catalog-query-${resource.id}`}>关键词</label>
          <form className={styles.searchForm} onSubmit={applyKeywordSearch}>
            <input
              className={styles.filterInput}
              id={`teaching-video-catalog-query-${resource.id}`}
              onChange={(event) => {
                setQueryDraft(event.target.value);
              }}
              placeholder="搜索标题、作者、工具、摘要或主题"
              type="search"
              value={queryDraft}
            />
            <button
              className={clsx(styles.paginationButton, styles.paginationButtonPrimary, styles.searchButton)}
              type="submit"
            >
              搜索
            </button>
          </form>
        </div>
      </section>

      <section
        className={clsx(styles.page, styles.resultsSection)}
        id={TEACHING_VIDEO_RESULTS_SECTION_ID}
        ref={videoSectionRef}
      >
        <div>
          <h3 className={styles.sectionTitle}>{resource.sectionTitle}</h3>
          <p className={styles.resultsMeta}>{resultsMeta}</p>
        </div>
        {pageItems.length ? (
          <>
            {resource.id === 'courses' ? (
              <div className={styles.courseGrid}>
                {pageItems.map((course) => (
                  <article
                    className={course.id === catalogState.targetCourseId ? `${styles.courseCard} ${styles.cardTarget}` : styles.courseCard}
                    id={getTeachingVideoCourseAnchorId(course.id)}
                    key={course.id}
                  >
                    <div className={styles.cardBody}>
                      <h3>{course.title}</h3>
                      <p className={styles.courseMeta}>
                        {course.creator} · {getTeachingVideoLanguageLabel(course.language)} · {course.tool}
                      </p>
                      <p className={styles.courseSummary}>
                        当前筛选命中 {course.filteredEpisodeCount} / {course.episodeCount} 条视频，最近命中时间 {course.latestFilteredAt}。
                      </p>
                      <div className={styles.pillRow}>
                        <span className={styles.topicPill}>{course.tool}</span>
                        <span className={styles.topicPill}>{getTeachingVideoLanguageLabel(course.language)}</span>
                        {course.topics.map((topic) => (
                          <span className={styles.topicPill} key={topic}>
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className={styles.inlineList}>
                        {course.featuredVideos.map((video) => (
                          <Link className={styles.inlineLink} key={video.id} to={getTeachingVideoItemPermalink(video.id)}>
                            {video.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className={styles.cardActions}>
                      <Link
                        className={styles.videoLink}
                        to={buildCatalogPermalink('videos', catalogState, {
                          videoId: '',
                          courseId: course.id,
                          requestedPage: null,
                          focusResults: true,
                        })}
                      >
                        查看课程视频
                      </Link>
                      <Link className={styles.secondaryLink} to={getTeachingVideoItemPermalink(course.coverVideoId)}>
                        代表视频
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.videoGrid}>
                {pageItems.map((video) => (
                  <article
                    className={video.id === catalogState.targetVideoId ? `${styles.videoCard} ${styles.cardTarget}` : styles.videoCard}
                    id={getTeachingVideoItemAnchorId(video.id)}
                    key={video.id}
                  >
                    <div className={styles.cardBody}>
                      <h3>{video.title}</h3>
                      <p className={styles.videoMeta}>
                        {video.creator} · {video.publishedAt} · {video.platform} · {formatTeachingVideoDuration(video.durationSec)}
                      </p>
                      <p className={styles.videoSummary}>{video.editorSummary ?? video.summary}</p>
                      <div className={styles.pillRow}>
                        <span className={styles.topicPill}>{video.tool}</span>
                        <span className={styles.topicPill}>{getTeachingVideoLanguageLabel(video.language)}</span>
                        <span className={styles.topicPill}>{video.format}</span>
                        <span className={styles.topicPill}>{video.level}</span>
                        {video.topics.slice(0, 2).map((topic) => (
                          <span className={styles.topicPill} key={topic}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.cardActions}>
                      <Link
                        className={styles.videoLink}
                        rel="noreferrer"
                        target="_blank"
                        to={video.canonicalUrl}
                      >
                        打开视频
                      </Link>
                      <Link
                        className={styles.secondaryLink}
                        to={getTeachingVideoCoursePermalink(video.courseId, {
                          filters: catalogState.filters,
                          query: catalogState.query,
                          focusResults: true,
                        })}
                      >
                        所属课程
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {isMobileCatalog ? (
              <div className={styles.loadMorePanel}>
                <div className={styles.paginationSummary}>
                  <p className={styles.paginationEyebrow}>连续浏览</p>
                  <strong className={styles.paginationHeadline}>
                    已加载 {rangeEnd} / {pagedItems.length} {resource.resultsLabel}
                  </strong>
                  <p className={styles.paginationCaption}>
                    {hasMore
                      ? `当前位于第 ${currentPage}/${totalPages} 批，继续加载下一批 ${Math.min(
                        TEACHING_VIDEO_PAGE_SIZE,
                        pagedItems.length - rangeEnd,
                      )} ${resource.resultsLabel}。`
                      : '已经加载全部结果，可以直接回到结果区顶部继续筛选。'}
                  </p>
                </div>
                <div className={styles.loadMoreActions}>
                  {hasMore ? (
                    <button
                      className={clsx(styles.paginationButton, styles.paginationButtonPrimary)}
                      onClick={() => {
                        navigateCatalogState(
                          {
                            requestedPage: currentPage + 1,
                            hasRequestedPage: true,
                          },
                          {clearTargets: !preserveTargetsOnPagination},
                        );
                      }}
                      type="button"
                    >
                      加载更多结果
                    </button>
                  ) : (
                    <button
                      className={styles.paginationButton}
                      onClick={() => {
                        scrollToResultsSection();
                      }}
                      type="button"
                    >
                      返回结果区顶部
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.paginationPanel}>
                <div className={styles.paginationSummary}>
                  <p className={styles.paginationEyebrow}>{resource.summaryLabel}</p>
                  <strong className={styles.paginationHeadline}>
                    显示 {rangeStart}-{rangeEnd} / {pagedItems.length}
                  </strong>
                  <p className={styles.paginationCaption}>
                    第 {currentPage} / {totalPages} 页 · 每页 {TEACHING_VIDEO_PAGE_SIZE} 条
                  </p>
                </div>
                <div className={styles.paginationControls}>
                  <div className={styles.paginationButtons}>
                    <button
                      className={styles.paginationButton}
                      disabled={currentPage <= 1}
                      onClick={() => {
                        navigateCatalogState(
                          {
                            requestedPage: currentPage - 1,
                            hasRequestedPage: currentPage - 1 > 1,
                          },
                          {
                            method: 'push',
                            clearTargets: !preserveTargetsOnPagination,
                            scroll: 'results-section',
                          },
                        );
                      }}
                      type="button"
                    >
                      上一页
                    </button>
                    <button
                      className={styles.paginationButton}
                      disabled={currentPage >= totalPages}
                      onClick={() => {
                        navigateCatalogState(
                          {
                            requestedPage: currentPage + 1,
                            hasRequestedPage: true,
                          },
                          {
                            method: 'push',
                            clearTargets: !preserveTargetsOnPagination,
                            scroll: 'results-section',
                          },
                        );
                      }}
                      type="button"
                    >
                      下一页
                    </button>
                  </div>
                  <div className={styles.paginationPages}>
                    {paginationTokens.map((token) =>
                      token.type === 'ellipsis' ? (
                        <span className={styles.paginationEllipsis} key={token.id}>
                          ...
                        </span>
                      ) : (
                        <PaginationPageButton
                          currentPage={currentPage}
                          key={token.page}
                          onSelect={(page) => {
                            navigateCatalogState(
                              {
                                requestedPage: page,
                                hasRequestedPage: page > 1,
                              },
                              {
                                method: 'push',
                                clearTargets: !preserveTargetsOnPagination,
                                scroll: 'results-section',
                              },
                            );
                          }}
                          page={token.page}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>{resource.emptyState}</div>
        )}
      </section>
    </div>
  );
}
