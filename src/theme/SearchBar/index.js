import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {useWindowSize} from '@docusaurus/theme-common';
import styles from './styles.module.css';
const {
  CONTENT_FORM_LABELS,
  ENTRY_ROLE_LABELS,
  getDomainLabel,
  getJourneyStageLabel,
} = require('@site/src/data/knowledgeModel');

const RESULT_GROUPS = [
  {id: 'knowledge', label: '知识文档', limit: 4},
  {id: 'video', label: '视频', limit: 3},
  {id: 'course', label: '课程', limit: 3},
];
const DESKTOP_RESULTS_ID = 'global-site-search-results';
const MOBILE_RESULTS_ID = 'global-site-mobile-search-results';
const MOBILE_DIALOG_ID = 'global-site-mobile-search';

let cachedSearchEntries = null;
let searchEntriesPromise = null;

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

async function loadSearchEntries() {
  if (cachedSearchEntries) {
    return cachedSearchEntries;
  }

  if (!searchEntriesPromise) {
    searchEntriesPromise = import(
      '@generated/aicode-search-index/default/site-search-index.json'
    ).then((module) => {
      const entries = Array.isArray(module.default?.entries)
        ? module.default.entries
        : [];
      cachedSearchEntries = entries;
      return entries;
    });
  }

  return searchEntriesPromise;
}

function scoreEntry(entry, query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const queryParts = normalizedQuery.split(/\s+/).filter(Boolean);
  const title = normalizeText(entry.title);
  const description = normalizeText(entry.description);
  const tags = normalizeText((entry.tags ?? []).join(' '));
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

function formatResultMeta(entry) {
  const metaParts = [entry.sectionLabel];
  const domainLabel = getDomainLabel(entry.domain, {short: true});

  if (domainLabel) {
    metaParts.push(domainLabel);
  }

  if (entry.entryRole && ['start', 'index', 'archive', 'admin'].includes(entry.entryRole)) {
    metaParts.push(ENTRY_ROLE_LABELS[entry.entryRole] ?? entry.entryRole);
  }

  if (entry.journeyStage) {
    metaParts.push(getJourneyStageLabel(entry.journeyStage) ?? entry.journeyStage);
  }

  if (
    entry.contentForm &&
    !(entry.entityType !== 'knowledge' && ['resource', 'brief'].includes(entry.contentForm)) &&
    entry.contentForm !== 'brief'
  ) {
    metaParts.push(CONTENT_FORM_LABELS[entry.contentForm] ?? entry.contentForm);
  }

  return metaParts.join(' · ');
}

function findMatches(entries, query) {
  const scoredEntries = entries
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, query),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  return RESULT_GROUPS.map((group) => ({
    ...group,
    items: scoredEntries
      .filter((entry) => entry.entityType === group.id)
      .slice(0, group.limit),
  })).filter((group) => group.items.length > 0);
}

function SearchResults({groups, onResultClick}) {
  return (
    <div className={styles.resultGroups}>
      {groups.map((group) => (
        <section className={styles.resultGroup} key={group.id}>
          <p className={styles.resultGroupTitle}>{group.label}</p>
          <ul className={styles.resultsList}>
            {group.items.map((match) => (
              <li key={match.permalink}>
                <Link
                  className={styles.resultLink}
                  onClick={onResultClick}
                  to={match.permalink}
                >
                  <span className={styles.resultMeta}>{formatResultMeta(match)}</span>
                  <strong className={styles.resultTitle}>{match.title}</strong>
                  {match.description ? (
                    <span className={styles.resultDescription}>{match.description}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchEntries, setSearchEntries] = useState(cachedSearchEntries);
  const [searchIndexStatus, setSearchIndexStatus] = useState(
    cachedSearchEntries ? 'ready' : 'idle',
  );
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const history = useHistory();
  const windowSize = useWindowSize();
  const isMobile = windowSize === 'mobile';
  const hasQuery = query.trim().length > 0;
  const showPanel = !isMobile && isOpen && hasQuery;
  const showMobileOverlay = isMobile && isOpen;
  const groups =
    hasQuery && Array.isArray(searchEntries) ? findMatches(searchEntries, query) : [];
  const firstMatch =
    groups
      .flatMap((group) => group.items)
      .sort((left, right) => right.score - left.score)[0] ?? null;
  const isSearchIndexPending =
    searchIndexStatus === 'loading' || (searchIndexStatus === 'idle' && (isOpen || hasQuery));

  useEffect(() => {
    if (!isOpen && !hasQuery) {
      return undefined;
    }

    if (searchIndexStatus !== 'idle') {
      return undefined;
    }

    let cancelled = false;
    setSearchIndexStatus('loading');

    loadSearchEntries()
      .then((entries) => {
        if (cancelled) {
          return;
        }

        setSearchEntries(entries);
        setSearchIndexStatus('ready');
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setSearchEntries([]);
        setSearchIndexStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [hasQuery, isOpen, searchIndexStatus]);

  useEffect(() => {
    if (isMobile) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isMobile]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!showMobileOverlay) {
      return undefined;
    }

    inputRef.current?.focus();

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [showMobileOverlay]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!firstMatch) {
      return;
    }

    history.push(firstMatch.permalink);
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

  function renderSearchBody() {
    if (isSearchIndexPending) {
      return <div className={styles.emptyState}>正在加载搜索索引...</div>;
    }

    if (searchIndexStatus === 'error') {
      return <div className={styles.emptyState}>搜索索引加载失败，请刷新后重试。</div>;
    }

    if (!hasQuery) {
      return (
        <div className={styles.emptyState}>
          输入关键词搜索知识文档、日报动态和视频资源。
        </div>
      );
    }

    if (groups.length) {
      return <SearchResults groups={groups} onResultClick={handleResultClick} />;
    }

    return <div className={styles.emptyState}>没有找到匹配内容</div>;
  }

  if (isMobile) {
    return (
      <div className={styles.mobileSearch} ref={containerRef}>
        <button
          aria-controls={showMobileOverlay ? MOBILE_DIALOG_ID : undefined}
          aria-expanded={showMobileOverlay}
          aria-haspopup="dialog"
          aria-label="打开全站搜索"
          className={styles.mobileSearchButton}
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <span aria-hidden="true" className={styles.mobileSearchIcon} />
          <span className={styles.mobileSearchLabel}>搜索</span>
        </button>
        {showMobileOverlay ? (
          <div
            aria-label="搜索全站内容"
            aria-modal="true"
            className={styles.mobileOverlay}
            id={MOBILE_DIALOG_ID}
            role="dialog"
          >
            <div className={styles.mobileOverlayPanel}>
              <div className={styles.mobileOverlayHeader}>
                <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
                  <span aria-hidden="true" className={styles.searchIcon} />
                  <input
                    aria-controls={MOBILE_RESULTS_ID}
                    aria-expanded={showMobileOverlay}
                    aria-label="搜索全站内容"
                    className={styles.searchInput}
                    onChange={handleChange}
                    placeholder="搜索知识文档、动态、视频..."
                    ref={inputRef}
                    type="search"
                    value={query}
                  />
                </form>
                <button
                  className={styles.mobileCloseButton}
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  关闭
                </button>
              </div>
              <div className={styles.mobileResults} id={MOBILE_RESULTS_ID}>
                {renderSearchBody()}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.searchBar} ref={containerRef}>
      <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
        <span aria-hidden="true" className={styles.searchIcon} />
        <input
          aria-controls={DESKTOP_RESULTS_ID}
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
        <div className={styles.resultsPanel} id={DESKTOP_RESULTS_ID}>
          {renderSearchBody()}
        </div>
      )}
    </div>
  );
}
