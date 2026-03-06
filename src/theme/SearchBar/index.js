import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {useWindowSize} from '@docusaurus/theme-common';
import styles from './styles.module.css';

const docMetadataContext = require.context(
  '@generated/docusaurus-plugin-content-docs/default',
  false,
  /^\.\/site-docs-.*\.json$/,
);

const blogMetadataContext = require.context(
  '@generated/docusaurus-plugin-content-blog/default',
  false,
  /^\.\/site-blog-.*\.json$/,
);

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

function buildSearchEntry(section, metadata) {
  if (!metadata?.title || !metadata?.permalink || metadata.unlisted || metadata.draft) {
    return null;
  }

  return {
    id: metadata.id ?? metadata.permalink,
    title: metadata.title,
    description: metadata.description ?? '',
    permalink: metadata.permalink,
    section,
    tags: Array.isArray(metadata.tags)
      ? metadata.tags
          .map((tag) => tag?.label)
          .filter(Boolean)
      : [],
    keywords: [
      metadata.id,
      metadata.source,
      metadata.sourceDirName,
      metadata.frontMatter?.sidebar_label,
      metadata.frontMatter?.track,
      metadata.frontMatter?.pillar,
      metadata.frontMatter?.audience,
      metadata.frontMatter?.kind,
      metadata.frontMatter?.reviewed_at,
      metadata.frontMatter?.source_window_end,
      metadata.frontMatter?.market_status,
    ]
      .filter(Boolean)
      .join(' '),
  };
}

function loadEntries(context, section) {
  return context
    .keys()
    .sort()
    .map((key) => buildSearchEntry(section, context(key)))
    .filter(Boolean);
}

function dedupeEntries(entries) {
  const uniqueEntries = new Map();

  entries.forEach((entry) => {
    if (!uniqueEntries.has(entry.permalink)) {
      uniqueEntries.set(entry.permalink, entry);
    }
  });

  return Array.from(uniqueEntries.values());
}

const searchEntries = dedupeEntries([
  ...loadEntries(docMetadataContext, '知识库'),
  ...loadEntries(blogMetadataContext, 'Daily Brief'),
]);

function scoreEntry(entry, query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const queryParts = normalizedQuery.split(/\s+/).filter(Boolean);
  const title = normalizeText(entry.title);
  const description = normalizeText(entry.description);
  const tags = normalizeText(entry.tags.join(' '));
  const keywords = normalizeText(entry.keywords);
  const permalink = normalizeText(entry.permalink);

  let score = 0;

  if (title === normalizedQuery) {
    score += 140;
  }

  if (title.startsWith(normalizedQuery)) {
    score += 90;
  }

  if (title.includes(normalizedQuery)) {
    score += 60;
  }

  if (tags.includes(normalizedQuery)) {
    score += 35;
  }

  if (description.includes(normalizedQuery)) {
    score += 25;
  }

  if (keywords.includes(normalizedQuery)) {
    score += 20;
  }

  if (permalink.includes(normalizedQuery)) {
    score += 15;
  }

  queryParts.forEach((part) => {
    if (title.includes(part)) {
      score += 16;
    }

    if (tags.includes(part)) {
      score += 10;
    }

    if (description.includes(part)) {
      score += 8;
    }

    if (keywords.includes(part)) {
      score += 6;
    }
  });

  return score;
}

function findMatches(query) {
  return searchEntries
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, query),
    }))
    .filter(({score}) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6)
    .map(({entry}) => entry);
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const history = useHistory();
  const windowSize = useWindowSize();

  const matches = findMatches(query);
  const hasQuery = query.trim().length > 0;
  const showPanel = isOpen && hasQuery;

  useEffect(() => {
    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (windowSize === 'mobile') {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!matches.length) {
      return;
    }

    history.push(matches[0].permalink);
    setIsOpen(false);
    setQuery('');
  }

  function handleChange(event) {
    setQuery(event.target.value);
    setIsOpen(true);
  }

  function handleResultClick() {
    setIsOpen(false);
    setQuery('');
  }

  return (
    <div className={styles.searchBar} ref={containerRef}>
      <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
        <span aria-hidden="true" className={styles.searchIcon} />
        <input
          aria-controls="global-site-search-results"
          aria-expanded={showPanel}
          aria-label="搜索全站内容"
          className={styles.searchInput}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder="搜索全站..."
          type="search"
          value={query}
        />
      </form>
      {showPanel && (
        <div className={styles.resultsPanel} id="global-site-search-results">
          {matches.length ? (
            <ul className={styles.resultsList}>
              {matches.map((match) => (
                <li key={match.permalink}>
                  <Link
                    className={styles.resultLink}
                    onClick={handleResultClick}
                    to={match.permalink}
                  >
                    <span className={styles.resultMeta}>{match.section}</span>
                    <strong className={styles.resultTitle}>{match.title}</strong>
                    {match.description ? (
                      <span className={styles.resultDescription}>
                        {match.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>没有找到匹配内容</div>
          )}
        </div>
      )}
    </div>
  );
}
