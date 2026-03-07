import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import {useWindowSize} from '@docusaurus/theme-common';
import {teachingVideoCatalog, teachingVideoCatalogSync} from '@site/src/data/teachingVideos';
import {
  formatTeachingVideoDuration,
  getTeachingVideoCourseAnchorId,
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

function findFocusedCourse(courseId) {
  return teachingVideoCatalog.courses.find((course) => course.id === courseId) ?? null;
}

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

export default function TeachingVideoCatalogPage() {
  const history = useHistory();
  const location = useLocation();
  const windowSize = useWindowSize();
  const videoSectionRef = useRef(null);
  const pendingScrollRef = useRef('');
  const [catalogState, setCatalogState] = useState(() => parseTeachingVideoCatalogSearch(''));
  const isMobileCatalog = windowSize === 'mobile';
  const filteredItems = filterTeachingVideoItems(
    teachingVideoCatalog.items,
    catalogState.filters,
    catalogState.query,
  );
  const {currentPage, totalPages, pageItems, rangeStart, rangeEnd, hasMore} = buildTeachingVideoPagination({
    items: filteredItems,
    requestedPage: catalogState.requestedPage,
    hasRequestedPage: catalogState.hasRequestedPage,
    targetVideoId: catalogState.targetVideoId,
    mode: isMobileCatalog ? 'mobile' : 'desktop',
  });
  const focusedCourse = findFocusedCourse(catalogState.targetCourseId);
  const featuredCourses = catalogState.targetCourseId && focusedCourse
    ? [focusedCourse, ...teachingVideoCatalog.courses.filter((course) => course.id !== catalogState.targetCourseId).slice(0, 5)]
    : teachingVideoCatalog.courses.slice(0, 6);
  const visibleCourseIds = featuredCourses.map((course) => course.id).join('|');
  const visibleVideoIds = pageItems.map((item) => item.id).join('|');
  const targetAnchorId = catalogState.targetVideoId
    ? getTeachingVideoItemAnchorId(catalogState.targetVideoId)
    : catalogState.targetCourseId
      ? getTeachingVideoCourseAnchorId(catalogState.targetCourseId)
      : '';
  const paginationTokens = isMobileCatalog ? [] : buildTeachingVideoPaginationTokens(currentPage, totalPages);
  const lastSyncedAt = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(teachingVideoCatalog.generatedAt));
  const stale = teachingVideoCatalog.metrics.stale.isStale;
  const resultsMeta = isMobileCatalog
    ? `当前筛选命中 ${filteredItems.length} 条视频，已加载 ${rangeEnd} 条，共 ${totalPages} 批。`
    : `当前筛选命中 ${filteredItems.length} 条视频，当前显示 ${rangeStart}-${rangeEnd} 条，第 ${currentPage}/${totalPages} 页。`;

  useEffect(() => {
    setCatalogState(parseTeachingVideoCatalogSearch(location.search));
  }, [location.search]);

  function scrollToVideoSection() {
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
      if (scroll === 'video-section') {
        scrollToVideoSection();
      }
      return;
    }

    if (method === 'push') {
      history.push(nextUrl);
      return;
    }

    history.replace(nextUrl);
  }

  useEffect(() => {
    if (!targetAnchorId && pendingScrollRef.current !== 'video-section') {
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

      if (pendingScrollRef.current === 'video-section') {
        videoSectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
        pendingScrollRef.current = '';
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.search, targetAnchorId, visibleCourseIds, visibleVideoIds]);

  useEffect(() => {
    if (!searchFocusesTeachingVideoResults(location.search)) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      videoSectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.search, visibleVideoIds]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTitleRow}>
          <h2 className={styles.heroTitle}>近 90 天 AI Code 教学视频中心</h2>
          <span className={stale ? `${styles.statusPill} ${styles.statusPillCritical}` : styles.statusPill}>
            {stale ? '数据陈旧' : teachingVideoCatalogSync.pillLabel}
          </span>
        </div>
        <p className={styles.heroDescription}>
          当前目录只展示 {teachingVideoCatalog.windowStart} 到 {teachingVideoCatalog.windowEnd} 的公开教学内容。
          站内同时保留视频数和课程数双口径，优先覆盖主流 AI coding 工具的上手、规则、MCP、工作流与实战内容。
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
            <Link className={styles.quickFilter} key={filter.id} to={filter.href}>
              {filter.label} · {filter.count}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.filtersPanel}>
        <div>
          <h3 className={styles.sectionTitle}>筛选目录</h3>
          <p className={styles.sectionLead}>
            支持按平台、语言、工具、主题、形式和难度过滤；默认按最新发布时间展示。
          </p>
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
        <label className={styles.filterLabel}>
          <span>关键词</span>
          <input
            className={styles.filterInput}
            onChange={(event) => {
              navigateCatalogState(
                {
                  query: event.target.value,
                },
                {resetPage: true, clearTargets: true},
              );
            }}
            placeholder="搜索标题、作者、工具、摘要或主题"
            type="search"
            value={catalogState.query}
          />
        </label>
      </section>

      <section className={styles.page}>
        <div>
          <h3 className={styles.sectionTitle}>课程聚合</h3>
          <p className={styles.sectionLead}>
            课程数用于识别系列教程与单视频课程，默认展示最新课程；如果通过搜索命中了特定课程，会优先置顶。
          </p>
        </div>
        <div className={styles.courseGrid}>
          {featuredCourses.map((course) => (
            <article
              className={course.id === catalogState.targetCourseId ? `${styles.courseCard} ${styles.cardTarget}` : styles.courseCard}
              id={getTeachingVideoCourseAnchorId(course.id)}
              key={course.id}>
              <div className={styles.cardBody}>
                <h3>{course.title}</h3>
                <p className={styles.courseMeta}>
                  {course.creator} · {getTeachingVideoLanguageLabel(course.language)} · {course.tool}
                </p>
                <p className={styles.courseSummary}>
                  首次发布时间 {course.publishedAt}，最近更新 {course.latestEpisodeAt}，当前聚合 {course.episodeCount} 个视频。
                </p>
              </div>
              <Link className={styles.videoLink} to={getTeachingVideoItemPermalink(course.coverVideoId)}>
                查看课程代表视频
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className={clsx(styles.page, styles.resultsSection)}
        id={TEACHING_VIDEO_RESULTS_SECTION_ID}
        ref={videoSectionRef}
      >
        <div>
          <h3 className={styles.sectionTitle}>视频明细</h3>
          <p className={styles.resultsMeta}>{resultsMeta}</p>
        </div>
        {pageItems.length ? (
          <>
            <div className={styles.videoGrid}>
              {pageItems.map((video) => (
                <article
                  className={video.id === catalogState.targetVideoId ? `${styles.videoCard} ${styles.cardTarget}` : styles.videoCard}
                  id={getTeachingVideoItemAnchorId(video.id)}
                  key={video.id}>
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
                  <Link
                    className={styles.videoLink}
                    rel="noreferrer"
                    target="_blank"
                    to={video.canonicalUrl}
                  >
                    打开视频
                  </Link>
                </article>
              ))}
            </div>
            {isMobileCatalog ? (
              <div className={styles.loadMorePanel}>
                <div className={styles.paginationSummary}>
                  <p className={styles.paginationEyebrow}>连续浏览</p>
                  <strong className={styles.paginationHeadline}>已加载 {rangeEnd} / {filteredItems.length}</strong>
                  <p className={styles.paginationCaption}>
                    {hasMore
                      ? `当前位于第 ${currentPage}/${totalPages} 批，继续加载下一批 ${Math.min(
                        TEACHING_VIDEO_PAGE_SIZE,
                        filteredItems.length - rangeEnd,
                      )} 条视频。`
                      : '已经加载全部视频，可以直接回到视频区顶部继续筛选。'}
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
                          {clearTargets: true},
                        );
                      }}
                      type="button"
                    >
                      加载更多视频
                    </button>
                  ) : (
                    <button
                      className={styles.paginationButton}
                      onClick={() => {
                        scrollToVideoSection();
                      }}
                      type="button"
                    >
                      返回视频区顶部
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.paginationPanel}>
                <div className={styles.paginationSummary}>
                  <p className={styles.paginationEyebrow}>视频列表导航</p>
                  <strong className={styles.paginationHeadline}>
                    显示 {rangeStart}-{rangeEnd} / {filteredItems.length}
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
                            clearTargets: true,
                            scroll: 'video-section',
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
                            clearTargets: true,
                            scroll: 'video-section',
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
                                clearTargets: true,
                                scroll: 'video-section',
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
          <div className={styles.emptyState}>
            当前筛选没有命中结果，建议先清空关键词或切回“全部”。
          </div>
        )}
      </section>
    </div>
  );
}
