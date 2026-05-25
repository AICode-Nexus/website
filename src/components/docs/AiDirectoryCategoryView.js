import React from 'react';
import {getAiDirectoryCategoryById, getAiDirectoryEntriesByCategory} from '@site/src/data/aiDirectory';
import styles from './AiDirectoryGrid.module.css';
import AiDirectoryGrid from './AiDirectoryGrid';

export default function AiDirectoryCategoryView({categoryId}) {
  const category = getAiDirectoryCategoryById(categoryId);

  if (!category) {
    throw new Error(`Unknown AI directory category: ${categoryId}`);
  }

  const entries = getAiDirectoryEntriesByCategory(categoryId);
  const hotCount = entries.filter((entry) => entry.trendStatus === 'hot').length;
  const risingCount = entries.filter((entry) => entry.trendStatus === 'rising').length;

  return (
    <>
      <div className={styles.directorySummary}>
        <span className={styles.summaryPill}>{entries.length} 个入口</span>
        {hotCount > 0 ? <span className={styles.summaryPill}>热门 {hotCount}</span> : null}
        {risingCount > 0 ? <span className={styles.summaryPill}>上升 {risingCount}</span> : null}
      </div>
      <AiDirectoryGrid entries={entries} />
    </>
  );
}
