import React from 'react';
import Link from '@docusaurus/Link';
import {aiDirectoryCategories, aiDirectoryEntries, getAiDirectoryEntriesByCategory} from '@site/src/data/aiDirectory';
import AiDirectoryGrid from './AiDirectoryGrid';
import styles from './AiDirectoryGrid.module.css';

function countEntries(predicate) {
  return aiDirectoryEntries.filter(predicate).length;
}

export default function AiDirectoryCatalogView() {
  const hotCount = countEntries((entry) => entry.trendStatus === 'hot');
  const risingCount = countEntries((entry) => entry.trendStatus === 'rising');

  return (
    <>
      <div className={styles.directorySummary}>
        <span className={styles.summaryPill}>{aiDirectoryCategories.length} 个分类</span>
        <span className={styles.summaryPill}>{aiDirectoryEntries.length} 个入口</span>
        <span className={styles.summaryPill}>热门 {hotCount}</span>
        <span className={styles.summaryPill}>上升 {risingCount}</span>
      </div>
      <nav className={styles.categoryNav} aria-label="AI 资源分类">
        {aiDirectoryCategories.map((category) => (
          <Link className={styles.categoryPill} to={category.slug} key={category.id}>
            {category.sidebarLabel}
          </Link>
        ))}
      </nav>
      {aiDirectoryCategories.map((category) => {
        const entries = getAiDirectoryEntriesByCategory(category.id);

        return (
          <section className={styles.categorySection} id={category.id} key={category.id}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryMeta}>{entries.length} 个入口</p>
            </div>
            <AiDirectoryGrid entries={entries} />
          </section>
        );
      })}
    </>
  );
}
