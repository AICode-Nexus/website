import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {directionMap} = portalContent;

export default function DirectionMap() {
  return (
    <SectionBlock
      description={directionMap.description}
      kicker={directionMap.kicker}
      title={directionMap.title}
    >
      <div className={styles.trackGrid}>
        {directionMap.items.map((item) => (
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
