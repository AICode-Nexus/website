import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import SectionBlock from './SectionBlock';

const {featuredDocs} = portalContent;

function FeaturedColumn({title, items}) {
  return (
    <div className={styles.featureColumn}>
      <div className={styles.featureColumnHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.featureColumnBody}>
        {items.map((item) => (
          <Link className={styles.featureCard} key={item.id} to={item.href}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedDocs() {
  return (
    <SectionBlock kicker={featuredDocs.kicker} title={featuredDocs.title}>
      <div className={styles.featureGrid}>
        {featuredDocs.columns.map((column) => (
          <FeaturedColumn key={column.id} items={column.items} title={column.title} />
        ))}
      </div>
    </SectionBlock>
  );
}
