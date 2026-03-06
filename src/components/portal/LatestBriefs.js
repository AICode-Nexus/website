import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {latestBriefs} = portalContent;

export default function LatestBriefs() {
  return (
    <SectionBlock kicker={latestBriefs.kicker} title={latestBriefs.title}>
      <div className={styles.briefGrid}>
        {latestBriefs.items.map((brief) => (
          <ContentCard
            key={brief.id}
            badge={brief.badge}
            className={styles.briefCard}
            description={brief.description}
            href={brief.href}
            linkLabel={brief.linkLabel}
            title={brief.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
