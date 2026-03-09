import React from 'react';
import Link from '@docusaurus/Link';
import {
  getTeachingVideoCatalogFilterPermalink,
  formatTeachingVideoDuration,
  getTeachingVideoItemPermalink,
  getTeachingVideoCoursePermalink,
} from '@site/src/utils/teachingVideos';
import toolDocNavigation from '@site/src/data/toolDocNavigation.json';
import {getToolTeachingVideoResourceSet} from '@site/src/utils/toolLearningResources';
import styles from './HandbookBlocks.module.css';

const TOOL_VIDEO_SOURCES = new Map(
  [...toolDocNavigation.coreTools, ...toolDocNavigation.extendedTools].map((toolEntry) => [
    toolEntry.label,
    toolEntry.videoTools ?? [toolEntry.label],
  ]),
);

export default function LearningResources({
  title = '精选视频与课程',
  tool,
  description,
  limit = 4,
}) {
  const videoTools = TOOL_VIDEO_SOURCES.get(tool) ?? [tool];
  const {sourceTool, items: featuredItems} = getToolTeachingVideoResourceSet(videoTools, limit);

  if (featuredItems.length === 0) {
    return null;
  }

  return (
    <section className={styles.panel}>
      <div className={styles.resourceHeader}>
        <div>
          <h2 className={styles.resourceTitle}>{title}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        <Link
          className={styles.resourceAction}
          to={getTeachingVideoCatalogFilterPermalink('tool', sourceTool ?? tool, {focusResults: true})}
        >
          查看 {sourceTool ?? tool} 全部教学内容
        </Link>
      </div>
      <div className={styles.resourceList}>
        {featuredItems.map((item) => (
          <article className={styles.resourceItem} key={item.id}>
            <p className={styles.resourceMeta}>
              {item.creator} · {item.platform} · {item.publishedAt}
              {item.durationSec > 0 ? ` · ${formatTeachingVideoDuration(item.durationSec)}` : ''}
            </p>
            <p className={styles.linkItemTitle}>
              <Link to={getTeachingVideoItemPermalink(item.id)}>{item.title}</Link>
            </p>
            <p className={styles.resourceSummary}>{item.summary}</p>
            <p className={styles.resourceMeta}>
              <Link to={getTeachingVideoCoursePermalink(item.courseId)}>查看所属课程</Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
