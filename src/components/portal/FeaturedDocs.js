import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {featuredDocs} from '@site/src/utils/docsCatalog';

function Column({title, items}) {
  return (
    <div className={styles.featureColumn}>
      <div className={styles.featureColumnHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.featureColumnBody}>
        {items.map((item) => (
          <Link className={styles.featureCard} key={item.title} to={item.href}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedDocs() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>Featured</p>
        <h2>热门对比与可执行 Playbooks</h2>
      </div>
      <div className={styles.featureGrid}>
        <Column title="热门对比" items={featuredDocs.comparisons} />
        <Column title="可立即执行的 Playbooks" items={featuredDocs.playbooks} />
      </div>
    </section>
  );
}
