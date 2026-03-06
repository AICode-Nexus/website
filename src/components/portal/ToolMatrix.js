import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {toolMatrix} = portalContent;

export default function ToolMatrix() {
  return (
    <SectionBlock
      description={toolMatrix.description}
      kicker={toolMatrix.kicker}
      title={toolMatrix.title}
    >
      <div className={styles.toolGrid}>
        {toolMatrix.items.map((tool) => (
          <ContentCard
            key={tool.id}
            badge={tool.badge}
            className={styles.toolCard}
            description={tool.description}
            href={tool.href}
            linkLabel={tool.linkLabel}
            title={tool.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
