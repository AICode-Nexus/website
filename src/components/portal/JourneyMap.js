import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {journeyMap} = portalContent;

export default function JourneyMap() {
  return (
    <SectionBlock
      description={journeyMap.description}
      kicker={journeyMap.kicker}
      title={journeyMap.title}
    >
      <div className={styles.journeyGrid}>
        {journeyMap.items.map((item) => (
          <ContentCard
            key={item.id}
            badge={item.badge}
            bullets={item.bullets}
            className={styles.trackCard}
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
