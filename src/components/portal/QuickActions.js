import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {quickActions} from '@site/src/utils/docsCatalog';

export default function QuickActions() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>Quick Start</p>
        <h2>我现在最想解决什么</h2>
      </div>
      <div className={styles.quickGrid}>
        {quickActions.map((item) => (
          <Link key={item.title} className={styles.quickCard} to={item.href}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
