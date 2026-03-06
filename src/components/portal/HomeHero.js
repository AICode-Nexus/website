import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {portalSignals} from '@site/src/utils/docsCatalog';

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>AICODE-NEXUS PORTAL</p>
        <h1 className={styles.heroTitle}>帮助个人工程师选工具、学 workflow、跟主线，而不是淹没在 AI coding 噪音里。</h1>
        <p className={styles.heroLead}>
          这里不是普通文档首页。它是一个工具导航型门户：先帮你选主平台，再带你进入可复用工作流，最后用对比文和 Daily Brief 把阶段性变化讲清楚。
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to="/docs/tool-selection">
            开始选工具
          </Link>
          <Link className={styles.secondaryAction} to="/docs/playbooks/first-7-days-ai-coding">
            从 7 天路线开始
          </Link>
        </div>
      </div>
      <div className={styles.signalPanel}>
        <p className={styles.panelTitle}>这一页优先解决</p>
        {portalSignals.map((signal) => (
          <div className={styles.signalRow} key={signal}>
            <span className={styles.signalDot} />
            <span>{signal}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
