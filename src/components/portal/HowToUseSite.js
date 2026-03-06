import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HowToUseSite() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>How To Use</p>
        <h2>如何使用本站</h2>
      </div>
      <div className={styles.usagePanel}>
        <div>
          <strong>门户首页</strong>
          <p>负责找路：选工具、选赛道、选学习路径。</p>
        </div>
        <div>
          <strong>知识库 /docs</strong>
          <p>负责长期知识：对比、guide、playbook、insight 都在这里沉淀。</p>
        </div>
        <div>
          <strong>Daily Brief /blog</strong>
          <p>负责时效更新：用日期和来源追踪最新变化，再回流到知识文档。</p>
        </div>
        <Link className={styles.primaryAction} to="/docs/">
          进入知识库
        </Link>
      </div>
    </section>
  );
}
