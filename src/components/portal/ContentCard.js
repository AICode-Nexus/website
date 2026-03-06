import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function ContentCard({
  badge,
  title,
  description,
  href,
  linkLabel,
  bullets,
  className,
}) {
  return (
    <article className={clsx(styles.contentCard, className)}>
      {badge ? <p className={styles.cardBadge}>{badge}</p> : null}
      <h3>{title}</h3>
      <p>{description}</p>
      {Array.isArray(bullets) && bullets.length > 0 ? (
        <ul className={styles.bullets}>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {href && linkLabel ? (
        <Link className={styles.cardLink} to={href}>
          {linkLabel}
        </Link>
      ) : null}
    </article>
  );
}
