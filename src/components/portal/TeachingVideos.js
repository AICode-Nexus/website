import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import {teachingVideoCatalog, teachingVideoCatalogSync} from '@site/src/data/teachingVideos';
import {getTeachingVideoLanguageLabel} from '@site/src/utils/teachingVideos';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {teachingVideos} = portalContent;

function formatLastSyncedAt(isoString) {
  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(isoString));
}

export default function TeachingVideos() {
  const featuredVideos = teachingVideoCatalog.featured.items.slice(0, 8);
  const quickFilters = teachingVideoCatalog.featured.quickFilters.slice(0, 4);
  const stale = teachingVideoCatalog.metrics.stale.isStale;

  return (
    <SectionBlock
      description={teachingVideos.description}
      kicker={teachingVideos.kicker}
      title={teachingVideos.title}
    >
      <div className={styles.videoStatusRow}>
        <span className={stale ? `${styles.videoStatusPill} ${styles.videoStatusPillCritical}` : styles.videoStatusPill}>
          {stale ? '数据陈旧' : teachingVideoCatalogSync.pillLabel}
        </span>
        <p className={styles.videoStatusText}>
          最近同步 {formatLastSyncedAt(teachingVideoCatalog.generatedAt)} · 自动同步周期 {teachingVideoCatalogSync.intervalLabel} · 时间窗 {teachingVideoCatalog.windowStart} 至 {teachingVideoCatalog.windowEnd}
        </p>
      </div>

      <div className={styles.videoStatsGrid}>
        <article className={styles.videoStatCard}>
          <span className={styles.videoStatLabel}>近 7 天</span>
          <strong className={styles.videoStatValue}>{teachingVideoCatalog.metrics.recentCounts.days7}</strong>
        </article>
        <article className={styles.videoStatCard}>
          <span className={styles.videoStatLabel}>近 30 天</span>
          <strong className={styles.videoStatValue}>{teachingVideoCatalog.metrics.recentCounts.days30}</strong>
        </article>
        <article className={styles.videoStatCard}>
          <span className={styles.videoStatLabel}>近 90 天视频数</span>
          <strong className={styles.videoStatValue}>{teachingVideoCatalog.metrics.videoCount}</strong>
        </article>
        <article className={styles.videoStatCard}>
          <span className={styles.videoStatLabel}>近 90 天课程数</span>
          <strong className={styles.videoStatValue}>{teachingVideoCatalog.metrics.courseCount}</strong>
        </article>
      </div>

      <div className={styles.videoFilterRow}>
        {quickFilters.map((filter) => (
          <Link className={styles.videoFilterChip} key={filter.id} to={filter.href}>
            {filter.label} · {filter.count}
          </Link>
        ))}
      </div>

      <div className={styles.videoGrid}>
        {featuredVideos.map((video) => (
          <ContentCard
            key={video.id}
            badge={video.platform}
            className={styles.briefCard}
            description={video.editorSummary ?? video.summary}
            href={video.canonicalUrl}
            linkLabel="打开视频"
            linkRel="noreferrer"
            linkTarget="_blank"
            meta={`${video.creator} · ${video.publishedAt} · ${getTeachingVideoLanguageLabel(video.language)}`}
            tags={[video.tool, video.format, video.level]}
            title={video.title}
          />
        ))}
      </div>
      <div className={styles.sectionActionRow}>
        <Link className={styles.primaryAction} to={teachingVideos.primaryAction.href}>
          {teachingVideos.primaryAction.label}
        </Link>
        {teachingVideos.secondaryAction ? (
          <Link className={styles.secondaryAction} to={teachingVideos.secondaryAction.href}>
            {teachingVideos.secondaryAction.label}
          </Link>
        ) : null}
      </div>
    </SectionBlock>
  );
}
