import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {learningPath} from '@site/src/utils/docsCatalog';

export default function LearningPath() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>Learning Path</p>
        <h2>个人工程师 7 天起步路线</h2>
      </div>
      <div className={styles.pathGrid}>
        {learningPath.map((item) => (
          <article className={styles.pathCard} key={item.day}>
            <p className={styles.cardBadge}>{item.day}</p>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <Link className={styles.cardLink} to={item.href}>
              查看步骤
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
