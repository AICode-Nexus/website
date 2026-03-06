import React from 'react';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import SectionBlock from './SectionBlock';
import LinkTile from './LinkTile';

const {quickActions} = portalContent;

export default function QuickActions() {
  return (
    <SectionBlock kicker={quickActions.kicker} title={quickActions.title}>
      <div className={styles.quickGrid}>
        {quickActions.items.map((item) => (
          <LinkTile
            key={item.id}
            className={styles.quickCard}
            description={item.description}
            href={item.href}
            title={item.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
