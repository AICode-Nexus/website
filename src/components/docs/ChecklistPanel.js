import React from 'react';
import styles from './HandbookBlocks.module.css';

export default function ChecklistPanel({title, description, items}) {
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
      <ul className={styles.bulletList}>
        {items.map((item) => {
          const value = typeof item === 'string' ? {id: item, label: item} : item;
          return (
            <li key={value.id ?? value.label}>
              <strong>{value.label}</strong>
              {value.description ? `：${value.description}` : ''}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
