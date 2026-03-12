import React, {useEffect} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import {teachingVideoCourseCatalogAvailable} from '@site/src/data/teachingVideos';
import {
  getTeachingVideoCatalogPermalink,
  searchFocusesTeachingVideoResults,
} from '@site/src/utils/teachingVideos';
import {parseTeachingVideoCatalogSearch} from '@site/src/utils/teachingVideoCatalogState.mjs';
import styles from './styles.module.css';

export default function LegacyTeachingVideoCatalogRedirect() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const legacyState = parseTeachingVideoCatalogSearch(location.search);
    const nextResourceType =
      teachingVideoCourseCatalogAvailable &&
      legacyState.targetCourseId &&
      !legacyState.targetVideoId
        ? 'courses'
        : 'videos';
    const nextUrl = getTeachingVideoCatalogPermalink({
      resourceType: nextResourceType,
      filters: legacyState.filters,
      query: legacyState.query,
      requestedPage: legacyState.hasRequestedPage ? legacyState.requestedPage : null,
      videoId: legacyState.targetVideoId,
      courseId: teachingVideoCourseCatalogAvailable ? legacyState.targetCourseId : '',
      focusResults: searchFocusesTeachingVideoResults(location.search),
    });

    history.replace(nextUrl);
  }, [history, location.search]);

  return (
    <div className={styles.emptyState}>
      旧版教学视频入口已迁移，正在跳转到新的资源中心。
    </div>
  );
}
