import React from 'react';
import Layout from '@theme/Layout';
import HomeHero from '@site/src/components/portal/HomeHero';
import QuickActions from '@site/src/components/portal/QuickActions';
import ToolMatrix from '@site/src/components/portal/ToolMatrix';
import TrackMap from '@site/src/components/portal/TrackMap';
import LearningPath from '@site/src/components/portal/LearningPath';
import FeaturedDocs from '@site/src/components/portal/FeaturedDocs';
import LatestBriefs from '@site/src/components/portal/LatestBriefs';
import TeachingVideos from '@site/src/components/portal/TeachingVideos';
import HowToUseSite from '@site/src/components/portal/HowToUseSite';
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
          <QuickActions />
          <ToolMatrix />
          <TrackMap />
          <LearningPath />
          <FeaturedDocs />
          <LatestBriefs />
          <TeachingVideos />
          <HowToUseSite />
        </div>
      </main>
    </Layout>
  );
}
