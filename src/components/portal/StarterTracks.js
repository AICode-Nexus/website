import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {starterTracks} = portalContent;

export default function StarterTracks() {
  return (
    <SectionBlock
      description={starterTracks.description}
      kicker={starterTracks.kicker}
      title={starterTracks.title}
    >
      <div className={styles.pathGrid}>
        {starterTracks.items.map((item) => (
          <ContentCard
            key={item.id}
            badge={item.badge}
            bullets={item.bullets}
            className={styles.pathCard}
            description={item.description}
            href={item.href}
            linkLabel={item.linkLabel}
            title={item.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
