import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {featuredBriefs} from '@site/src/data/featuredBriefs';

export default function LatestBriefs() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>Daily Brief</p>
        <h2>最近值得看的 3 条观察</h2>
      </div>
      <div className={styles.briefGrid}>
        {featuredBriefs.map((brief) => (
          <article className={styles.briefCard} key={brief.href}>
            <p className={styles.cardBadge}>{brief.date}</p>
            <h3>{brief.title}</h3>
            <p>{brief.summary}</p>
            <Link className={styles.cardLink} to={brief.href}>
              阅读日报
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
