import React from 'react';
import {getAiDirectoryCategoryById, getAiDirectoryEntriesByCategory} from '@site/src/data/aiDirectory';
import styles from './HandbookBlocks.module.css';
import AiDirectoryTable from './AiDirectoryTable';

export default function AiDirectoryCategoryView({categoryId}) {
  const category = getAiDirectoryCategoryById(categoryId);

  if (!category) {
    throw new Error(`Unknown AI directory category: ${categoryId}`);
  }

  const entries = getAiDirectoryEntriesByCategory(categoryId);
  const featuredCount = entries.filter((entry) => entry.featured).length;

  return (
    <>
      <section className={styles.panel}>
        <div className={styles.header}>
          <h3 className={styles.title}>{category.title}</h3>
          <p className={styles.description}>{category.description}</p>
        </div>
        <p className={styles.resourceMeta}>
          当前收录 {entries.length} 个入口
          {featuredCount > 0 ? ` · 其中 ${featuredCount} 个标记为精选` : ''}
        </p>
      </section>
      <AiDirectoryTable entries={entries} />
    </>
  );
}
