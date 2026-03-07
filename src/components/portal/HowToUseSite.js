import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import SectionBlock from './SectionBlock';

const {howToUse} = portalContent;

export default function HowToUseSite() {
  return (
    <SectionBlock kicker={howToUse.kicker} title={howToUse.title}>
      <div className={styles.usagePanel}>
        {howToUse.items.map((item) => (
          <div key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.sectionActionRow}>
        <Link className={styles.primaryAction} to={howToUse.primaryAction.href}>
          {howToUse.primaryAction.label}
        </Link>
      </div>
    </SectionBlock>
  );
}
