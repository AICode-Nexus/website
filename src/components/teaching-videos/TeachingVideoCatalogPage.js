import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {teachingVideoCatalog} from '@site/src/data/teachingVideos';
import {
  formatTeachingVideoDuration,
  getTeachingVideoCourseAnchorId,
  getTeachingVideoItemPermalink,
  getTeachingVideoItemAnchorId,
  getTeachingVideoLanguageLabel,
} from '@site/src/utils/teachingVideos';
import styles from './styles.module.css';

const PAGE_SIZE = 24;
const DEFAULT_FILTERS = {
  platform: 'all',
  language: 'all',
  tool: 'all',
  topic: 'all',
  format: 'all',
  level: 'all',
};

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

function parseSearchParams(search) {
  const params = new URLSearchParams(search);

  return {
    filters: {
      platform: params.get('platform') || 'all',
      language: params.get('language') || 'all',
      tool: params.get('tool') || 'all',
      topic: params.get('topic') || 'all',
      format: params.get('format') || 'all',
      level: params.get('level') || 'all',
    },
    query: params.get('q') || '',
    requestedPage: Number.parseInt(params.get('page') || '1', 10),
    hasRequestedPage: params.has('page'),
    targetVideoId: params.get('video') || '',
    targetCourseId: params.get('course') || '',
  };
}

function filterItems(items, filters, query) {
  const normalizedQuery = normalizeText(query);

  return items.filter((item) => {
    if (filters.platform !== 'all' && item.platform !== filters.platform) {
      return false;
    }

    if (filters.language !== 'all' && item.language !== filters.language) {
      return false;
    }

    if (filters.tool !== 'all' && item.tool !== filters.tool) {
      return false;
    }

    if (filters.topic !== 'all' && !item.topics.includes(filters.topic)) {
      return false;
    }

    if (filters.format !== 'all' && item.format !== filters.format) {
      return false;
    }

    if (filters.level !== 'all' && item.level !== filters.level) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = normalizeText(
      [
        item.title,
        item.creator,
        item.tool,
        item.summary,
        item.topics.join(' '),
        item.format,
        item.level,
      ].join(' '),
    );

    return haystack.includes(normalizedQuery);
  });
}

function findFocusedCourse(courseId) {
  return teachingVideoCatalog.courses.find((course) => course.id === courseId) ?? null;
}

function buildPageItems(items, requestedPage, hasRequestedPage, targetVideoId) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  let safePage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  if (!hasRequestedPage && targetVideoId) {
    const targetIndex = items.findIndex((item) => item.id === targetVideoId);
    if (targetIndex >= 0) {
      safePage = Math.floor(targetIndex / PAGE_SIZE) + 1;
    }
  }

  const currentPage = Math.min(safePage, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  return {
    currentPage,
    totalPages,
    pageItems: items.slice(startIndex, startIndex + PAGE_SIZE),
  };
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

export default function TeachingVideoCatalogPage() {
  const location = useLocation();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [query, setQuery] = useState('');
  const [requestedPage, setRequestedPage] = useState(1);
  const [hasRequestedPage, setHasRequestedPage] = useState(false);
  const [targetVideoId, setTargetVideoId] = useState('');
  const [targetCourseId, setTargetCourseId] = useState('');

  useEffect(() => {
    const parsed = parseSearchParams(location.search);
    setFilters(parsed.filters);
    setQuery(parsed.query);
    setRequestedPage(Number.isFinite(parsed.requestedPage) ? parsed.requestedPage : 1);
    setHasRequestedPage(parsed.hasRequestedPage);
    setTargetVideoId(parsed.targetVideoId);
    setTargetCourseId(parsed.targetCourseId);
  }, [location.search]);

  const filteredItems = filterItems(teachingVideoCatalog.items, filters, query);
  const {currentPage, totalPages, pageItems} = buildPageItems(
    filteredItems,
    requestedPage,
    hasRequestedPage,
    targetVideoId,
  );
  const focusedCourse = findFocusedCourse(targetCourseId);
  const featuredCourses = targetCourseId && focusedCourse
    ? [focusedCourse, ...teachingVideoCatalog.courses.filter((course) => course.id !== targetCourseId).slice(0, 5)]
    : teachingVideoCatalog.courses.slice(0, 6);
  const visibleCourseIds = featuredCourses.map((course) => course.id).join('|');
  const visibleVideoIds = pageItems.map((item) => item.id).join('|');
  const targetAnchorId = targetVideoId
    ? getTeachingVideoItemAnchorId(targetVideoId)
    : targetCourseId
      ? getTeachingVideoCourseAnchorId(targetCourseId)
      : '';

  const lastSyncedAt = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(teachingVideoCatalog.generatedAt));

  const stale = teachingVideoCatalog.metrics.stale.isStale;

  useEffect(() => {
    if (!targetAnchorId) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const targetElement = document.getElementById(targetAnchorId);

      if (targetElement) {
        targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [currentPage, targetAnchorId, visibleCourseIds, visibleVideoIds]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTitleRow}>
          <h2 className={styles.heroTitle}>近 90 天 AI Code 教学视频中心</h2>
          <span className={stale ? `${styles.statusPill} ${styles.statusPillCritical}` : styles.statusPill}>
            {stale ? '数据陈旧' : '自动同步中'}
          </span>
        </div>
        <p className={styles.heroDescription}>
          当前目录只展示 {teachingVideoCatalog.windowStart} 到 {teachingVideoCatalog.windowEnd} 的公开教学内容。
          站内同时保留视频数和课程数双口径，优先覆盖主流 AI coding 工具的上手、规则、MCP、工作流与实战内容。
        </p>
        <div className={styles.heroMetaRow}>
          <p className={styles.heroMetaText}>最近同步：{lastSyncedAt}</p>
          <p className={styles.heroMetaText}>分页大小：{PAGE_SIZE} 条</p>
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
              setRequestedPage(1);
              setFilters((current) => ({...current, platform: event.target.value}));
            }}
            options={teachingVideoCatalog.facets.platforms}
            value={filters.platform}
          />
          <FacetSelect
            label="语言"
            onChange={(event) => {
              setRequestedPage(1);
              setFilters((current) => ({...current, language: event.target.value}));
            }}
            options={teachingVideoCatalog.facets.languages}
            value={filters.language}
          />
          <FacetSelect
            label="工具"
            onChange={(event) => {
              setRequestedPage(1);
              setFilters((current) => ({...current, tool: event.target.value}));
            }}
            options={teachingVideoCatalog.facets.tools}
            value={filters.tool}
          />
          <FacetSelect
            label="主题"
            onChange={(event) => {
              setRequestedPage(1);
              setFilters((current) => ({...current, topic: event.target.value}));
            }}
            options={teachingVideoCatalog.facets.topics}
            value={filters.topic}
          />
          <FacetSelect
            label="形式"
            onChange={(event) => {
              setRequestedPage(1);
              setFilters((current) => ({...current, format: event.target.value}));
            }}
            options={teachingVideoCatalog.facets.formats}
            value={filters.format}
          />
          <FacetSelect
            label="难度"
            onChange={(event) => {
              setRequestedPage(1);
              setFilters((current) => ({...current, level: event.target.value}));
            }}
            options={teachingVideoCatalog.facets.levels}
            value={filters.level}
          />
        </div>
        <label className={styles.filterLabel}>
          <span>关键词</span>
          <input
            className={styles.filterInput}
            onChange={(event) => {
              setRequestedPage(1);
              setQuery(event.target.value);
            }}
            placeholder="搜索标题、作者、工具、摘要或主题"
            type="search"
            value={query}
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
              className={course.id === targetCourseId ? `${styles.courseCard} ${styles.cardTarget}` : styles.courseCard}
              id={getTeachingVideoCourseAnchorId(course.id)}
              key={course.id}>
              <h3>{course.title}</h3>
              <p className={styles.courseMeta}>
                {course.creator} · {getTeachingVideoLanguageLabel(course.language)} · {course.tool}
              </p>
              <p className={styles.courseSummary}>
                首次发布时间 {course.publishedAt}，最近更新 {course.latestEpisodeAt}，当前聚合 {course.episodeCount} 个视频。
              </p>
              <Link className={styles.videoLink} to={getTeachingVideoItemPermalink(course.coverVideoId)}>
                查看课程代表视频
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.page}>
        <div>
          <h3 className={styles.sectionTitle}>视频明细</h3>
          <p className={styles.resultsMeta}>
            当前筛选命中 {filteredItems.length} 条视频，当前第 {currentPage}/{totalPages} 页。
          </p>
        </div>
        {pageItems.length ? (
          <>
            <div className={styles.videoGrid}>
              {pageItems.map((video) => (
                <article
                  className={video.id === targetVideoId ? `${styles.videoCard} ${styles.cardTarget}` : styles.videoCard}
                  id={getTeachingVideoItemAnchorId(video.id)}
                  key={video.id}>
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
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                disabled={currentPage <= 1}
                onClick={() => setRequestedPage((page) => Math.max(1, page - 1))}
                type="button"
              >
                上一页
              </button>
              <button
                className={styles.paginationButton}
                disabled={currentPage >= totalPages}
                onClick={() => setRequestedPage((page) => Math.min(totalPages, page + 1))}
                type="button"
              >
                下一页
              </button>
            </div>
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
