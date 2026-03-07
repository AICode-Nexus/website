import React from 'react';
import Link from '@docusaurus/Link';
import {teachingVideoCatalog} from '@site/src/data/teachingVideos';
import {
  formatTeachingVideoDuration,
  getTeachingVideoItemPermalink,
  getTeachingVideoCoursePermalink,
} from '@site/src/utils/teachingVideos';
import styles from './HandbookBlocks.module.css';

function sortResources(items) {
  return [...items].sort((left, right) => {
    if (right.featuredScore !== left.featuredScore) {
      return right.featuredScore - left.featuredScore;
    }
    return right.publishedAt.localeCompare(left.publishedAt, 'zh-CN');
  });
}

function uniqueByCourse(items) {
  const seen = new Set();

  return items.filter((item) => {
    if (seen.has(item.courseId)) {
      return false;
    }
    seen.add(item.courseId);
    return true;
  });
}

export default function LearningResources({
  title = '精选视频与课程',
  tool,
  description,
  limit = 4,
}) {
  const filteredItems = teachingVideoCatalog.items.filter((item) => item.tool === tool);
  const featuredItems = uniqueByCourse(sortResources(filteredItems)).slice(0, limit);

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
          to={`/docs/ai-code-teaching-videos?tool=${encodeURIComponent(tool)}`}
        >
          查看 {tool} 全部教学内容
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
