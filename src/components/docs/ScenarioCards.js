import React from 'react';
import Link from '@docusaurus/Link';
import styles from './HandbookBlocks.module.css';

export default function ScenarioCards({title, description, items}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section className={styles.panel}>
      {(title || description) && (
        <div className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      )}
      <div className={styles.cardGrid}>
        {items.map((item) => (
          <article className={styles.card} key={item.id}>
            {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
            <h3 className={styles.cardTitle}>
              {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
            </h3>
            {item.description ? <p className={styles.cardDescription}>{item.description}</p> : null}
            {Array.isArray(item.bullets) && item.bullets.length > 0 ? (
              <ul className={styles.bulletList}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
