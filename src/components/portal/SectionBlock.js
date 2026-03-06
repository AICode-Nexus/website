import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function SectionBlock({kicker, title, description, className, children}) {
  return (
    <section className={clsx(styles.section, className)}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>{kicker}</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
