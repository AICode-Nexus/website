import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

export default function FeaturedCollection({collectionKey, sectionKey}) {
  const portalData = usePluginData('aicode-portal-data', undefined, {failfast: true});
  const section = portalContent[sectionKey];
  const items = portalData[collectionKey]?.items ?? [];

  if (!section || items.length === 0) {
    return null;
  }

  return (
    <SectionBlock
      description={section.description}
      kicker={section.kicker}
      title={section.title}
    >
      <div className={styles.trackGrid}>
        {items.map((item) => (
          <ContentCard
            key={item.id}
            badge={item.badge}
            bullets={item.bullets}
            className={styles.trackCard}
            description={item.description}
            href={item.href}
            linkLabel={item.linkLabel}
            meta={item.meta}
            tags={item.tags}
            title={item.title}
          />
        ))}
      </div>
      <div className={styles.sectionActionRow}>
        <Link className={styles.cardLink} to={section.primaryAction.href}>
          {section.primaryAction.label}
        </Link>
      </div>
    </SectionBlock>
  );
}
