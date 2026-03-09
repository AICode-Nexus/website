import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import toolDocNavigation from '@site/src/data/toolDocNavigation.json';
import {
  formatTeachingVideoDuration,
  getTeachingVideoCatalogFilterPermalink,
  getTeachingVideoItemPermalink,
} from '@site/src/utils/teachingVideos';
import {getToolTeachingVideoResourceSet} from '@site/src/utils/toolLearningResources';
import styles from './DocRightRail.module.css';

const TOOL_DOCS = [...toolDocNavigation.coreTools, ...toolDocNavigation.extendedTools];

function findToolByDocId(docId) {
  if (typeof docId !== 'string' || docId.trim() === '') {
    return null;
  }

  return (
    TOOL_DOCS.find((tool) => docId === `${tool.id}/index` || docId.startsWith(`${tool.id}/`)) ?? null
  );
}

function buildVideoMeta(item) {
  const segments = [item.creator, item.platform, item.publishedAt];

  if (item.durationSec > 0) {
    segments.push(formatTeachingVideoDuration(item.durationSec));
  }

  return segments.join(' · ');
}

export default function DocRightRail({toc}) {
  const {metadata} = useDoc();
  const tool = findToolByDocId(metadata.id);
  const {sourceTool, items: videos} = tool
    ? getToolTeachingVideoResourceSet(tool.videoTools ?? [tool.label], 3)
    : {sourceTool: null, items: []};
  const usesFallbackVideos = tool && sourceTool && sourceTool !== tool.label;

  if (!toc && videos.length === 0) {
    return null;
  }

  return (
    <aside className={styles.rail}>
      {videos.length > 0 ? (
        <section className={styles.card} aria-labelledby="doc-right-rail-videos">
          <p className={styles.eyebrow}>视频资源</p>
          <h2 className={styles.title} id="doc-right-rail-videos">
            {tool.label}
          </h2>
          <p className={styles.description}>
            {usesFallbackVideos
              ? `当前目录里还没有足够的 ${tool.label} 独立条目，先给你 ${sourceTool} 方向的公开视频。`
              : '右侧直接给你当前工具的公开视频入口，不用再回资源页翻。'}
          </p>
          <div className={styles.list}>
            {videos.map((item) => (
              <article className={styles.item} key={item.id}>
                <p className={styles.itemTitle}>
                  <Link to={getTeachingVideoItemPermalink(item.id)}>{item.title}</Link>
                </p>
                <p className={styles.itemMeta}>{buildVideoMeta(item)}</p>
                <p className={styles.itemSummary}>{item.summary}</p>
              </article>
            ))}
          </div>
          <Link
            className={styles.action}
            to={getTeachingVideoCatalogFilterPermalink('tool', sourceTool ?? tool.label, {focusResults: true})}
          >
            查看全部 {sourceTool ?? tool.label} 视频
          </Link>
        </section>
      ) : null}
      {toc ? <div className={styles.toc}>{toc}</div> : null}
    </aside>
  );
}
