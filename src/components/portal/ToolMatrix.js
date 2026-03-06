import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {toolMatrix} from '@site/src/utils/docsCatalog';

export default function ToolMatrix() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>Tool Navigation</p>
        <h2>先选主平台，再谈所有细节</h2>
        <p>第一阶段先把常见入口放回正确层次里理解：平台、控制台、执行栈和开放式 IDE。</p>
      </div>
      <div className={styles.toolGrid}>
        {toolMatrix.map((tool) => (
          <article className={styles.toolCard} key={tool.name}>
            <p className={styles.cardBadge}>{tool.tone}</p>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <Link className={styles.cardLink} to={tool.href}>
              查看入口
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
