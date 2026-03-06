import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {pillarMap} = portalContent;

export default function PillarMap() {
  return (
    <SectionBlock
      description={pillarMap.description}
      kicker={pillarMap.kicker}
      title={pillarMap.title}
    >
      <div className={styles.trackGrid}>
        {pillarMap.items.map((pillar) => (
          <ContentCard
            key={pillar.id}
            badge={pillar.badge}
            bullets={pillar.bullets}
            className={styles.trackCard}
            description={pillar.description}
            href={pillar.href}
            linkLabel={pillar.linkLabel}
            title={pillar.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
