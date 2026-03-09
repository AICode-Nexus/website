import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import toolDocNavigation from '@site/src/data/toolDocNavigation.json';
import DocFreshnessBanner from '@site/src/components/docs/DocFreshnessBanner';
import DocRightRail from '@site/src/components/docs/DocRightRail';
import styles from './styles.module.css';

const TOOL_DOCS = [...toolDocNavigation.coreTools, ...toolDocNavigation.extendedTools];

function isToolDoc(docId) {
  return TOOL_DOCS.some((tool) => docId === `${tool.id}/index` || docId.startsWith(`${tool.id}/`));
}

function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const isDesktop = windowSize === 'desktop' || windowSize === 'ssr';

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop = canRender && isDesktop ? <DocItemTOCDesktop /> : undefined;

  return {
    hidden,
    isDesktop,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}) {
  const docTOC = useDocTOC();
  const {metadata, frontMatter} = useDoc();
  const shouldRenderRightRail = docTOC.isDesktop && (docTOC.desktop || isToolDoc(metadata.id));

  return (
    <div className="row">
      <div className={clsx('col', shouldRenderRightRail && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
            <DocFreshnessBanner frontMatter={frontMatter} />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {shouldRenderRightRail ? (
        <div className={clsx('col col--3', styles.docAsideCol)}>
          <DocRightRail toc={docTOC.desktop} />
        </div>
      ) : null}
    </div>
  );
}
