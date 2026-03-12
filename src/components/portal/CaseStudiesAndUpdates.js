import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {featuredCaseStudies, latestUpdates} = portalContent;

export default function CaseStudiesAndUpdates() {
  const portalData = usePluginData('aicode-portal-data', undefined, {failfast: true});
  const searchData = usePluginData('aicode-search-index', undefined, {failfast: true});
  const caseStudies = portalData.featuredCaseStudies?.items ?? [];
  const latestPublishedUpdates = (searchData.latestPublishedBlogUpdates ?? []).slice(
    0,
    latestUpdates.items.length,
  );
  const updateItems = latestPublishedUpdates.length > 0 ? latestPublishedUpdates : latestUpdates.items;

  return (
    <SectionBlock
      description={featuredCaseStudies.description}
      kicker={featuredCaseStudies.kicker}
      title={featuredCaseStudies.title}
    >
      <div className={styles.splitGrid}>
        <div className={styles.trackGrid}>
          {caseStudies.map((item) => (
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
        <aside className={styles.updateColumn}>
          <div className={styles.featureColumnHeader}>
            <p className={styles.cardBadge}>{latestUpdates.kicker}</p>
            <h3>{latestUpdates.title}</h3>
            <p>保留值得继续观察的最新变化，但不让动态抢走教程主线。</p>
          </div>
          <div className={styles.updateList}>
            {updateItems.map((item) => (
              <ContentCard
                key={item.id}
                badge={item.badge}
                className={styles.briefCard}
                description={item.description}
                href={item.href}
                linkLabel={item.linkLabel}
                title={item.title}
              />
            ))}
          </div>
        </aside>
      </div>
      <div className={styles.sectionActionRow}>
        <Link className={styles.cardLink} to={featuredCaseStudies.primaryAction.href}>
          {featuredCaseStudies.primaryAction.label}
        </Link>
      </div>
    </SectionBlock>
  );
}
