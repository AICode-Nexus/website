import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {portalContent} from '@site/src/data/portalContent';
import {teachingVideoCatalog} from '@site/src/data/teachingVideos';
import ContentCard from './ContentCard';
import SectionBlock from './SectionBlock';

const {teachingVideos} = portalContent;

export default function TeachingVideos() {
  const featuredVideos = teachingVideoCatalog.items.slice(0, 4);

  return (
    <SectionBlock
      description={teachingVideos.description}
      kicker={teachingVideos.kicker}
      title={teachingVideos.title}
    >
      <div className={styles.briefGrid}>
        {featuredVideos.map((video) => (
          <ContentCard
            key={video.id}
            badge={video.platform}
            className={styles.briefCard}
            description={video.summary}
            href={video.href}
            linkLabel="打开视频"
            linkRel="noreferrer"
            linkTarget="_blank"
            meta={`${video.creator} · ${video.publishedAt}`}
            tags={video.tags}
            title={video.title}
          />
        ))}
      </div>
      <div className={styles.sectionActionRow}>
        <Link className={styles.primaryAction} to={teachingVideos.primaryAction.href}>
          {teachingVideos.primaryAction.label}
        </Link>
      </div>
    </SectionBlock>
  );
}
