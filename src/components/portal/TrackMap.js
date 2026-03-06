import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {trackMap} = portalContent;

export default function TrackMap() {
  return (
    <SectionBlock kicker={trackMap.kicker} title={trackMap.title}>
      <div className={styles.trackGrid}>
        {trackMap.items.map((track) => (
          <ContentCard
            key={track.id}
            bullets={track.bullets}
            className={styles.trackCard}
            description={track.description}
            href={track.href}
            linkLabel={track.linkLabel}
            title={track.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
