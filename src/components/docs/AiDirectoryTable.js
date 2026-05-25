import React from 'react';
import Link from '@docusaurus/Link';
import {
  AI_DIRECTORY_AUDIENCE_LABELS,
  AI_DIRECTORY_COLLECTION_PRIORITY_LABELS,
  AI_DIRECTORY_RESOURCE_TYPE_LABELS,
  AI_DIRECTORY_TREND_STATUS_LABELS,
  AI_DIRECTORY_TRUST_LEVEL_LABELS,
} from '@site/src/utils/aiDirectory';
import styles from './HandbookBlocks.module.css';

function getEntryLinks(entry) {
  const candidates = [
    entry.officialUrl ? {label: '官网', href: entry.officialUrl} : null,
    entry.docsUrl ? {label: 'Docs', href: entry.docsUrl} : null,
    entry.repoUrl ? {label: 'GitHub', href: entry.repoUrl} : null,
  ].filter(Boolean);

  const uniqueLinks = [];
  const seenHrefs = new Set();

  candidates.forEach((link) => {
    if (seenHrefs.has(link.href)) {
      return;
    }

    seenHrefs.add(link.href);
    uniqueLinks.push(link);
  });

  return uniqueLinks;
}

export default function AiDirectoryTable({entries}) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return (
      <section className={styles.panel}>
        <p className={styles.emptyState}>当前分类还没有可展示的资源条目。</p>
      </section>
    );
  }

  return (
    <section className={styles.panel}>
      <div className={styles.tableWrap}>
        <table className={styles.matrix}>
          <thead>
            <tr>
              <th>资源</th>
              <th>类型</th>
              <th>入口</th>
              <th>更适合什么</th>
              <th>为什么值得收录</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  {entry.featured ? <span className={styles.meta}>精选</span> : null}
                  {entry.trendStatus !== 'evergreen' ? (
                    <span className={styles.meta}>{AI_DIRECTORY_TREND_STATUS_LABELS[entry.trendStatus]}</span>
                  ) : null}
                  <strong className={styles.entryName}>{entry.name}</strong>
                  <div className={styles.tagGroup}>
                    <span className={styles.meta}>{AI_DIRECTORY_AUDIENCE_LABELS[entry.audience] ?? entry.audience}</span>
                    <span className={styles.meta}>
                      {AI_DIRECTORY_TRUST_LEVEL_LABELS[entry.trustLevel] ?? entry.trustLevel}
                    </span>
                    <span className={styles.meta}>
                      {AI_DIRECTORY_COLLECTION_PRIORITY_LABELS[entry.collectionPriority] ?? entry.collectionPriority}
                    </span>
                  </div>
                  <p className={styles.resourceSummary}>{entry.summary}</p>
                  {entry.trendReason ? <p className={styles.resourceSummary}>{entry.trendReason}</p> : null}
                  <div className={styles.tagGroup}>
                    {entry.tags.map((tag) => (
                      <span className={styles.tagPill} key={`${entry.id}-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{AI_DIRECTORY_RESOURCE_TYPE_LABELS[entry.resourceType] ?? entry.resourceType}</td>
                <td>
                  <div className={styles.linkStack}>
                    {getEntryLinks(entry).map((link) => (
                      <Link key={`${entry.id}-${link.label}`} to={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </td>
                <td>{entry.bestFor}</td>
                <td>{entry.whyListed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
