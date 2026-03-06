import React from 'react';
import styles from './DocFreshnessBanner.module.css';

const PILLAR_LABELS = {
  'development-modes': 'AI 开发方式',
  workflows: 'AI 工作流',
  tools: 'AI 编程工具',
  standards: 'AI 规范',
  architecture: 'AI 架构',
};

const MARKET_STATUS_LABELS = {
  current: '当前主线',
  watch: '持续观察',
  legacy: '旧赛道透镜',
};

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
  const pillar = frontMatter?.pillar;
  const reviewedAt = formatDateValue(frontMatter?.reviewed_at);
  const sourceWindowEnd = formatDateValue(frontMatter?.source_window_end);
  const marketStatus = frontMatter?.market_status;

  if (!pillar || !reviewedAt || !sourceWindowEnd || !marketStatus) {
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
          <dt>知识支柱</dt>
          <dd>{PILLAR_LABELS[pillar] ?? pillar}</dd>
        </div>
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
