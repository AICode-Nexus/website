import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import SectionBlock from './SectionBlock';

const {featuredDocs} = portalContent;

function FeaturedColumn({kicker, title, description, href, linkLabel, items}) {
  return (
    <div className={styles.featureColumn}>
      <div className={styles.featureColumnHeader}>
        {kicker ? <p className={styles.cardBadge}>{kicker}</p> : null}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.featureColumnBody}>
        {items.map((item) => (
          <Link className={styles.featureCard} key={item.id} to={item.href}>
            <strong>{item.title}</strong>
            {item.meta ? <p className={styles.cardMeta}>{item.meta}</p> : null}
            <p>{item.description}</p>
            {Array.isArray(item.tags) && item.tags.length > 0 ? (
              <div className={styles.tagList}>
                {item.tags.map((tag) => (
                  <span className={styles.tagPill} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
      <Link className={styles.cardLink} to={href}>
        {linkLabel}
      </Link>
    </div>
  );
}

export default function FeaturedDocs() {
  const portalData = usePluginData('aicode-portal-data', undefined, {failfast: true});
  const itemGroups = new Map(
    portalData.featuredDocs.collections.map((collection) => [collection.id, collection.items]),
  );
  const collections = featuredDocs.collections
    .map((collection) => ({
      ...collection,
      items: itemGroups.get(collection.id) ?? [],
    }))
    .filter((collection) => collection.items.length > 0);

  if (collections.length === 0) {
    return null;
  }

  return (
    <SectionBlock
      description={featuredDocs.description}
      kicker={featuredDocs.kicker}
      title={featuredDocs.title}
    >
      <div className={styles.featureGrid}>
        {collections.map((collection) => (
          <FeaturedColumn
            key={collection.id}
            description={collection.description}
            href={collection.href}
            items={collection.items}
            kicker={collection.kicker}
            linkLabel={collection.linkLabel}
            title={collection.title}
          />
        ))}
      </div>
    </SectionBlock>
  );
}
