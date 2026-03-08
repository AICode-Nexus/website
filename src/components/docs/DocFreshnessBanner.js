import React from 'react';
import styles from './DocFreshnessBanner.module.css';
const {
  MARKET_STATUS_LABELS,
  getDomainLabel,
  getJourneyStageLabel,
  resolveDomainKey,
  resolveJourneyStageKey,
} = require('@site/src/data/knowledgeModel');

function formatDateValue(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return null;
}

export default function DocFreshnessBanner({frontMatter}) {
  const domain = resolveDomainKey(frontMatter);
  const journeyStage = resolveJourneyStageKey(frontMatter);
  const reviewedAt = formatDateValue(frontMatter?.reviewed_at);
  const sourceWindowEnd = formatDateValue(frontMatter?.source_window_end);
  const marketStatus = frontMatter?.market_status;

  if (!domain || !reviewedAt || !sourceWindowEnd || !marketStatus) {
    return null;
  }

  return (
    <aside className={styles.banner}>
      <div className={styles.header}>
        <p className={styles.kicker}>Content Status</p>
        <h2 className={styles.title}>这篇文档的归类与复核窗口</h2>
      </div>
      <dl className={styles.grid}>
        <div className={styles.item}>
          <dt>知识方向</dt>
          <dd>{getDomainLabel(domain) || domain}</dd>
        </div>
        {journeyStage ? (
          <div className={styles.item}>
            <dt>流程阶段</dt>
            <dd>{getJourneyStageLabel(journeyStage) || journeyStage}</dd>
          </div>
        ) : null}
        <div className={styles.item}>
          <dt>人工复核</dt>
          <dd>{reviewedAt}</dd>
        </div>
        <div className={styles.item}>
          <dt>事实截止</dt>
          <dd>{sourceWindowEnd}</dd>
        </div>
        <div className={styles.item}>
          <dt>市场状态</dt>
          <dd>{MARKET_STATUS_LABELS[marketStatus] ?? marketStatus}</dd>
        </div>
      </dl>
    </aside>
  );
}
