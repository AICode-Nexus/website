import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {aiDirectoryCategories, aiDirectoryEntries, getAiDirectoryEntriesByCategory} from '@site/src/data/aiDirectory';
import AiDirectoryGrid from './AiDirectoryGrid';
import styles from './AiDirectoryGrid.module.css';

function countEntries(predicate) {
  return aiDirectoryEntries.filter(predicate).length;
}

function getEntrySearchText(entry, category) {
  return [
    entry.name,
    entry.summary,
    entry.bestFor,
    entry.whyListed,
    entry.officialUrl,
    entry.docsUrl,
    entry.resourceType,
    entry.collectionPriority,
    entry.trendStatus,
    category.title,
    category.sidebarLabel,
    category.description,
    ...(entry.tags || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export default function AiDirectoryCatalogView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(aiDirectoryCategories[0]?.id ?? '');
  const brokenLinks = useBrokenLinks();
  const hotCount = countEntries((entry) => entry.trendStatus === 'hot');
  const risingCount = countEntries((entry) => entry.trendStatus === 'rising');
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categoryGroups = aiDirectoryCategories.map((category) => {
    const allEntries = getAiDirectoryEntriesByCategory(category.id);
    const entries = normalizedQuery
      ? allEntries.filter((entry) => getEntrySearchText(entry, category).includes(normalizedQuery))
      : allEntries;

    return {
      allEntries,
      category,
      entries,
    };
  });
  const visibleCount = categoryGroups.reduce((count, group) => count + group.entries.length, 0);

  aiDirectoryCategories.forEach((category) => {
    brokenLinks.collectAnchor(category.id);
  });

  useEffect(() => {
    const categoryIds = aiDirectoryCategories.map((category) => category.id);
    let animationFrameId = 0;

    function getAnchorOffset() {
      return (document.querySelector('.navbar')?.getBoundingClientRect().height ?? 0) + 24;
    }

    function updateActiveCategory() {
      const sections = categoryIds
        .map((categoryId) => document.getElementById(categoryId))
        .filter(Boolean);

      if (sections.length === 0) {
        return;
      }

      const markerY = getAnchorOffset();
      const isNearPageEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      let nextActiveCategoryId = sections[0].id;

      if (isNearPageEnd) {
        nextActiveCategoryId = sections[sections.length - 1].id;
      } else {
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= markerY) {
            nextActiveCategoryId = section.id;
          }
        });
      }

      setActiveCategoryId((previousCategoryId) =>
        previousCategoryId === nextActiveCategoryId ? previousCategoryId : nextActiveCategoryId,
      );
    }

    function requestActiveCategoryUpdate() {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveCategory);
    }

    updateActiveCategory();
    window.addEventListener('scroll', requestActiveCategoryUpdate, {passive: true});
    window.addEventListener('resize', requestActiveCategoryUpdate);
    window.addEventListener('hashchange', requestActiveCategoryUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', requestActiveCategoryUpdate);
      window.removeEventListener('resize', requestActiveCategoryUpdate);
      window.removeEventListener('hashchange', requestActiveCategoryUpdate);
    };
  }, []);

  useEffect(() => {
    const sidebarLinks = document.querySelectorAll('.theme-doc-sidebar-menu .menu__link[href*="/docs/ai-directory"]');

    sidebarLinks.forEach((link) => {
      link.classList.remove('menu__link--active');
      link.removeAttribute('aria-current');
    });

    if (!activeCategoryId) {
      return;
    }

    document
      .querySelectorAll(`.theme-doc-sidebar-menu .menu__link[href$="#${activeCategoryId}"]`)
      .forEach((link) => {
        link.classList.add('menu__link--active');
        link.setAttribute('aria-current', 'page');
      });
  }, [activeCategoryId]);

  return (
    <>
      <div className={styles.directorySummary}>
        <span className={styles.summaryPill}>{aiDirectoryCategories.length} 个分类</span>
        <span className={styles.summaryPill}>{aiDirectoryEntries.length} 个入口</span>
        <span className={styles.summaryPill}>热门 {hotCount}</span>
        <span className={styles.summaryPill}>上升 {risingCount}</span>
      </div>
      <div className={styles.directoryControls}>
        <label className={styles.searchLabel} htmlFor="ai-directory-search">
          搜索资源
        </label>
        <input
          className={styles.searchInput}
          id="ai-directory-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="搜索名称、官网、标签、适用场景"
        />
        {normalizedQuery ? <p className={styles.searchResultMeta}>命中 {visibleCount} 个入口</p> : null}
        <nav className={styles.categoryNav} aria-label="AI 资源分类锚点">
          {aiDirectoryCategories.map((category) => (
            <Link
              className={[styles.categoryPill, activeCategoryId === category.id ? styles.categoryPillActive : '']
                .filter(Boolean)
                .join(' ')}
              to={`#${category.id}`}
              key={category.id}>
              {category.sidebarLabel}
            </Link>
          ))}
        </nav>
      </div>
      {categoryGroups.map(({allEntries, category, entries}) => {
        return (
          <section className={styles.categorySection} id={category.id} key={category.id}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIntro}>
                <h2 className={styles.categoryTitle}>{category.title}</h2>
                <p className={styles.categoryDescription}>{category.description}</p>
              </div>
              <p className={styles.categoryMeta}>
                {normalizedQuery ? `${entries.length} / ${allEntries.length}` : allEntries.length} 个入口
              </p>
            </div>
            {entries.length > 0 ? (
              <AiDirectoryGrid entries={entries} />
            ) : (
              <p className={styles.emptyState}>当前搜索没有命中这个分类。</p>
            )}
          </section>
        );
      })}
      {normalizedQuery && visibleCount === 0 ? (
        <p className={styles.emptyState}>没有找到匹配资源，可以换一个工具名、官网域名或中文场景词。</p>
      ) : null}
    </>
  );
}
