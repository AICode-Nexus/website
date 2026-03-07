import React from 'react';
import Link from '@docusaurus/Link';
import styles from './HandbookBlocks.module.css';

export default function RelatedReadings({title = '继续阅读', description, items}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <div className={styles.linkList}>
        {items.map((item) => (
          <div className={styles.linkItem} key={item.href}>
            <p className={styles.linkItemTitle}>
              <Link to={item.href}>{item.title}</Link>
            </p>
            {item.description ? <p className={styles.linkItemDescription}>{item.description}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
