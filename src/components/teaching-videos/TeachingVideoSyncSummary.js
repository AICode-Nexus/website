import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {teachingVideoCatalogSync} from '@site/src/data/teachingVideos';
import {
  formatTeachingVideoSyncTimestamp,
  getTeachingVideoSyncStatus,
} from '@site/src/utils/teachingVideoSyncStatus.mjs';
import styles from './styles.module.css';

function getStatusPillClassName(kind) {
  if (kind === 'stale') {
    return styles.statusPillCritical;
  }

  if (kind === 'delayed') {
    return styles.statusPillWarning;
  }

  return styles.statusPillOk;
}

export default function TeachingVideoSyncSummary({
  generatedAt,
  showMeta = true,
  showNote = true,
  showPill = false,
}) {
  const [status, setStatus] = useState(() =>
    getTeachingVideoSyncStatus(generatedAt, teachingVideoCatalogSync, new Date(generatedAt)),
  );
  const lastSyncedAt = formatTeachingVideoSyncTimestamp(generatedAt);

  useEffect(() => {
    function updateStatus() {
      setStatus(getTeachingVideoSyncStatus(generatedAt, teachingVideoCatalogSync, new Date()));
    }

    updateStatus();
    const intervalId = window.setInterval(updateStatus, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, [generatedAt]);

  return (
    <>
      {showPill ? (
        <span className={clsx(styles.statusPill, getStatusPillClassName(status.kind))}>{status.pillLabel}</span>
      ) : null}
      {showMeta ? <p className={styles.heroMetaText}>最近一次同步：{lastSyncedAt}</p> : null}
      {showMeta ? (
        <p className={styles.heroMetaText}>自动同步周期：{teachingVideoCatalogSync.intervalLabel}</p>
      ) : null}
      {showNote && status.kind !== 'fresh' ? (
        <p
          className={clsx(
            styles.heroMetaText,
            status.kind === 'stale' ? styles.syncMetaCritical : styles.syncMetaWarning,
          )}
        >
          {status.detailText}
        </p>
      ) : null}
    </>
  );
}
