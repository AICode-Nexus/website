import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {learningPath} = portalContent;

export default function LearningPath() {
  return (
    <SectionBlock
      description={learningPath.description}
      kicker={learningPath.kicker}
      title={learningPath.title}
    >
      <div className={styles.pathGrid}>
        {learningPath.items.map((item) => (
          <ContentCard
            key={item.id}
            badge={item.badge}
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
