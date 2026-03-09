import React from 'react';
import Layout from '@theme/Layout';
import HomeHero from '@site/src/components/portal/HomeHero';
import StarterTracks from '@site/src/components/portal/StarterTracks';
import FeaturedCollection from '@site/src/components/portal/FeaturedCollection';
import CaseStudiesAndUpdates from '@site/src/components/portal/CaseStudiesAndUpdates';
import styles from '@site/src/components/portal/styles.module.css';
import {portalContent} from '@site/src/data/portalContent';

export default function HomePage() {
  return (
    <Layout
      title={portalContent.meta.title}
      description={portalContent.meta.description}
    >
      <main className="container">
        <div className={styles.page}>
          <HomeHero />
          <StarterTracks />
          <FeaturedCollection collectionKey="featuredToolTutorials" sectionKey="featuredToolTutorials" />
          <FeaturedCollection collectionKey="featuredWorkflowTutorials" sectionKey="featuredWorkflowTutorials" />
          <CaseStudiesAndUpdates />
        </div>
      </main>
    </Layout>
  );
}
