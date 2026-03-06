import React from 'react';
import Layout from '@theme/Layout';
import HomeHero from '@site/src/components/portal/HomeHero';
import QuickActions from '@site/src/components/portal/QuickActions';
import ToolMatrix from '@site/src/components/portal/ToolMatrix';
import TrackMap from '@site/src/components/portal/TrackMap';
import LearningPath from '@site/src/components/portal/LearningPath';
import FeaturedDocs from '@site/src/components/portal/FeaturedDocs';
import LatestBriefs from '@site/src/components/portal/LatestBriefs';
import HowToUseSite from '@site/src/components/portal/HowToUseSite';
import styles from '@site/src/components/portal/styles.module.css';

export default function HomePage() {
  return (
    <Layout
      title="AICode-Nexus 门户"
      description="帮助个人工程师选工具、学 workflow、跟趋势的 AI coding 门户站。"
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
          <HowToUseSite />
        </div>
      </main>
    </Layout>
  );
}
