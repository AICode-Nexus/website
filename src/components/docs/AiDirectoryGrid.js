import React from 'react';
import Link from '@docusaurus/Link';
import {
  AI_DIRECTORY_AUDIENCE_LABELS,
  AI_DIRECTORY_TREND_STATUS_LABELS,
  AI_DIRECTORY_TRUST_LEVEL_LABELS,
} from '@site/src/utils/aiDirectory';
import styles from './AiDirectoryGrid.module.css';

function getEntryLinks(entry) {
  return [
    entry.officialUrl ? {label: '官网', href: entry.officialUrl} : null,
    entry.docsUrl ? {label: 'Docs', href: entry.docsUrl} : null,
    entry.repoUrl ? {label: 'GitHub', href: entry.repoUrl} : null,
  ].filter(Boolean);
}

function getPrimaryLink(entry) {
  return getEntryLinks(entry)[0];
}

function getHostname(href) {
  try {
    return new URL(href).hostname.replace(/^www\./u, '');
  } catch {
    return '';
  }
}

function getShortTrendLabel(trendStatus) {
  if (trendStatus === 'hot') {
    return '热门';
  }

  if (trendStatus === 'rising') {
    return '上升';
  }

  if (trendStatus === 'watch') {
    return '关注';
  }

  return '';
}

const LOGO_TONES = [
  {background: '#e0f2fe', color: '#075985'},
  {background: '#dcfce7', color: '#166534'},
  {background: '#fef3c7', color: '#92400e'},
  {background: '#fce7f3', color: '#9d174d'},
  {background: '#ede9fe', color: '#5b21b6'},
  {background: '#ccfbf1', color: '#0f766e'},
  {background: '#fee2e2', color: '#991b1b'},
  {background: '#e0e7ff', color: '#3730a3'},
];

function getLogoTone(id) {
  const seed = id.split('').reduce((total, character) => total + character.charCodeAt(0), 0);
  return LOGO_TONES[seed % LOGO_TONES.length];
}

function getLogoText(name) {
  const compactName = name.replace(/[^a-zA-Z0-9\u4e00-\u9fff]+/gu, ' ').trim();
  const words = compactName.split(/\s+/u).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0].slice(0, 1)}${words[1].slice(0, 1)}`.toUpperCase();
  }

  return (words[0] ?? name).slice(0, 2).toUpperCase();
}

function ResourceCard({entry}) {
  const primaryLink = getPrimaryLink(entry);
  const href = primaryLink?.href ?? '#';
  const host = getHostname(href);
  const logoTone = getLogoTone(entry.id);
  const trendLabel = getShortTrendLabel(entry.trendStatus);
  const fullTrendLabel = AI_DIRECTORY_TREND_STATUS_LABELS[entry.trendStatus];
  const trustLabel = AI_DIRECTORY_TRUST_LEVEL_LABELS[entry.trustLevel] ?? entry.trustLevel;
  const audienceLabel = AI_DIRECTORY_AUDIENCE_LABELS[entry.audience] ?? entry.audience;

  return (
    <Link className={styles.resourceCard} to={href} title={entry.summary} aria-label={`${entry.name}: ${entry.summary}`}>
      <span className={styles.logoWrap} aria-hidden="true">
        <span
          className={styles.logoMark}
          style={{
            '--directory-logo-bg': logoTone.background,
            '--directory-logo-color': logoTone.color,
          }}>
          {getLogoText(entry.name)}
        </span>
      </span>
      <span className={styles.resourceName}>{entry.name}</span>
      <span className={styles.resourceHost}>{host}</span>
      <span className={styles.badgeRow} aria-hidden="true">
        {entry.featured ? <span className={styles.resourceBadge}>精选</span> : null}
        {trendLabel ? <span className={styles.resourceBadge}>{trendLabel}</span> : null}
      </span>
      <span className={styles.hoverPanel}>
        <strong className={styles.hoverTitle}>{entry.name}</strong>
        <span className={styles.hoverSummary}>{entry.summary}</span>
        <span className={styles.hoverMeta}>
          {audienceLabel} · {trustLabel}
          {fullTrendLabel && entry.trendStatus !== 'evergreen' ? ` · ${fullTrendLabel}` : ''}
        </span>
        <span className={styles.tagRow}>
          {entry.tags.slice(0, 4).map((tag) => (
            <span className={styles.resourceTag} key={`${entry.id}-${tag}`}>
              {tag}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

export default function AiDirectoryGrid({entries}) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return <p className={styles.emptyState}>当前分类还没有可展示的资源条目。</p>;
  }

  return (
    <div className={styles.resourceGrid}>
      {entries.map((entry) => (
        <ResourceCard entry={entry} key={entry.id} />
      ))}
    </div>
  );
}
