import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {trackCards} from '@site/src/utils/docsCatalog';

export default function TrackMap() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>Knowledge Tracks</p>
        <h2>四条主赛道</h2>
      </div>
      <div className={styles.trackGrid}>
        {trackCards.map((track) => (
          <article className={styles.trackCard} key={track.title}>
            <h3>{track.title}</h3>
            <p>{track.description}</p>
            <ul className={styles.bullets}>
              {track.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Link className={styles.cardLink} to={track.href}>
              进入专题
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
