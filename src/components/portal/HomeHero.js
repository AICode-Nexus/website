import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';

const {hero} = portalContent;

export default function HomeHero() {
  const brandMarkSrc = useBaseUrl(hero.brand.markSrc);

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <div className={styles.brandLockup}>
          <img
            className={styles.brandMark}
            src={brandMarkSrc}
            alt={hero.brand.markAlt}
            width="44"
            height="44"
          />
          <div className={styles.brandMeta}>
            <strong>{hero.brand.name}</strong>
            <span>{hero.brand.label}</span>
          </div>
        </div>
        <p className={styles.kicker}>{hero.kicker}</p>
        <h1 className={styles.heroTitle}>{hero.title}</h1>
        <p className={styles.heroLead}>{hero.description}</p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to={hero.primaryAction.href}>
            {hero.primaryAction.label}
          </Link>
          <Link className={styles.secondaryAction} to={hero.secondaryAction.href}>
            {hero.secondaryAction.label}
          </Link>
        </div>
      </div>
      <div className={styles.signalPanel}>
        <p className={styles.panelTitle}>{hero.panelTitle}</p>
        {hero.signals.map((signal) => (
          <div className={styles.signalRow} key={signal}>
            <span className={styles.signalDot} />
            <span>{signal}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
