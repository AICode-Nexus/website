import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function ContentCard({
  badge,
  title,
  meta,
  description,
  href,
  linkLabel,
  linkTarget,
  linkRel,
  bullets,
  tags,
  className,
}) {
  return (
    <article className={clsx(styles.contentCard, className)}>
      {badge ? <p className={styles.cardBadge}>{badge}</p> : null}
      <h3>{title}</h3>
      {meta ? <p className={styles.cardMeta}>{meta}</p> : null}
      <p>{description}</p>
      {Array.isArray(bullets) && bullets.length > 0 ? (
        <ul className={styles.bullets}>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {Array.isArray(tags) && tags.length > 0 ? (
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <span className={styles.tagPill} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {href && linkLabel ? (
        <Link className={styles.cardLink} rel={linkRel} target={linkTarget} to={href}>
          {linkLabel}
        </Link>
      ) : null}
    </article>
  );
}
