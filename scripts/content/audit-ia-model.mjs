import path from 'node:path';
import {createRequire} from 'node:module';

import {
  listMarkdownFiles,
  readMarkdownDocument,
  workspaceRoot,
} from './lib/content-utils.mjs';

const require = createRequire(import.meta.url);
const {
  DOMAIN_ORDER,
  resolveContentFormKey,
  resolveDomainKey,
} = require('../../src/data/knowledgeModel');
const sidebars = require('../../sidebars.js');
const docusaurusConfig = require('../../docusaurus.config.js');

const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const DOMAIN_DIRS = new Set(DOMAIN_ORDER);
const ACTIONABLE_CONTENT_FORMS = new Set(['tutorial', 'playbook', 'case-study']);
const EXPECTED_SIDEBAR_ENTRY_DOCS = {
  gettingStartedSidebar: 'overview/minute-quick-start',
  toolTutorialsSidebar: 'tools/index',
  workflowTutorialsSidebar: 'workflows/index',
  caseStudiesSidebar: 'case-studies/index',
  advancedTopicsSidebar: 'standards/index',
};
const EXPECTED_NAVBAR_LEFT_ITEMS = [
  {
    label: '开始上手',
    type: 'docSidebar',
    sidebarId: 'gettingStartedSidebar',
  },
  {
    label: '工具教程',
    type: 'docSidebar',
    sidebarId: 'toolTutorialsSidebar',
  },
  {
    label: '工作流教程',
    type: 'docSidebar',
    sidebarId: 'workflowTutorialsSidebar',
  },
  {
    label: '实战案例',
    type: 'docSidebar',
    sidebarId: 'caseStudiesSidebar',
  },
  {
    label: '进阶专题',
    type: 'docSidebar',
    sidebarId: 'advancedTopicsSidebar',
  },
  {
    label: '动态',
    to: '/blog',
  },
];
const EXPECTED_NAVBAR_RIGHT_ITEMS = [
  {
    label: '视频资源',
    to: '/docs/resources/videos',
  },
  {
    label: 'GitHub',
    href: 'github',
  },
  {
    type: 'search',
  },
];
const EXPECTED_ACTION_CATEGORIES = [
  {
    sidebarId: 'toolTutorialsSidebar',
    label: '先跑 Quick Start',
    minimumDocs: 8,
    requiredSuffix: '/quick-start',
  },
  {
    sidebarId: 'workflowTutorialsSidebar',
    label: '先跑 Runbook',
    minimumDocs: 6,
    requiredSuffix: '/runbook',
  },
];
const HOMEPAGE_CLICK_BUDGETS = [
  {
    name: 'homepage hero primary action',
    route: '/docs/start/30-minute-quick-start',
    maxClicks: 1,
  },
  {
    name: 'homepage hero secondary action',
    route: '/docs/workflows/playbooks/workflow-playbook',
    maxClicks: 1,
  },
  {
    name: 'homepage starter track: 30 分钟上手',
    route: '/docs/start/30-minute-quick-start',
    maxClicks: 1,
  },
  {
    name: 'homepage starter track: 7 天跑通第一套工作流',
    route: '/docs/workflows/playbooks/first-7-days-ai-coding',
    maxClicks: 1,
  },
  {
    name: 'homepage starter track: 搭个人默认栈',
    route: '/docs/workflows/playbooks/personal-engineer-stack-setup',
    maxClicks: 1,
  },
  {
    name: 'homepage starter track: 按任务找教程',
    route: '/docs/workflows/playbooks/workflow-playbook',
    maxClicks: 1,
  },
  {
    name: 'homepage featured tool tutorials CTA',
    route: '/docs/tools',
    maxClicks: 2,
    minActionableLinks: 6,
  },
  {
    name: 'homepage featured workflow tutorials CTA',
    route: '/docs/workflows',
    maxClicks: 2,
    minActionableLinks: 6,
  },
  {
    name: 'homepage featured case studies CTA',
    route: '/docs/case-studies',
    maxClicks: 2,
    minActionableLinks: 4,
  },
];
const NAVIGATION_CLICK_BUDGETS = [
  {
    name: 'navbar 开始上手',
    sidebarId: 'gettingStartedSidebar',
    maxClicks: 1,
  },
  {
    name: 'navbar 工具教程',
    sidebarId: 'toolTutorialsSidebar',
    maxClicks: 2,
    minActionableLinks: 6,
  },
  {
    name: 'navbar 工作流教程',
    sidebarId: 'workflowTutorialsSidebar',
    maxClicks: 2,
    minActionableLinks: 6,
  },
  {
    name: 'navbar 实战案例',
    sidebarId: 'caseStudiesSidebar',
    maxClicks: 2,
    minActionableLinks: 4,
  },
  {
    name: 'navbar 进阶专题',
    sidebarId: 'advancedTopicsSidebar',
    maxClicks: 2,
    minActionableLinks: 1,
  },
];

function relativeFromRoot(filePath) {
  return path.relative(workspaceRoot, filePath).replace(/\\/gu, '/');
}

function getExpectedDomain(relativePath) {
  const [, topLevel] = relativePath.split('/');
  return DOMAIN_DIRS.has(topLevel) ? topLevel : '';
}

function normalizeRoutePath(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return '';
  }

  const trimmedValue = value.trim().replace(/^https?:\/\/[^/]+/u, '');

  if (!trimmedValue.startsWith('/')) {
    return '';
  }

  const [withoutQuery] = trimmedValue.split('?');
  const [withoutHash] = withoutQuery.split('#');

  if (withoutHash === '/') {
    return '/';
  }

  return withoutHash.replace(/\/+$/u, '');
}

function extractLinkTargets(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return [];
  }

  const targets = [];
  const patterns = [
    /(?<!!)\[[^\]]+\]\(([^)\s]+)\)/gu,
    /\b(?:href|to)\s*:\s*['"]([^'"]+)['"]/gu,
    /\b(?:href|to)\s*=\s*['"]([^'"]+)['"]/gu,
  ];

  patterns.forEach((pattern) => {
    for (const match of value.matchAll(pattern)) {
      targets.push(match[1]);
    }
  });

  return targets;
}

function relativePathToDocId(relativePath) {
  return relativePath
    .replace(/^docs\//u, '')
    .replace(/\.(?:md|mdx)$/u, '');
}

function getDocumentRoute(relativePath, frontMatter) {
  if (typeof frontMatter.slug === 'string' && frontMatter.slug.trim() !== '') {
    const slug = frontMatter.slug.trim();
    return normalizeRoutePath(slug.startsWith('/docs/') ? slug : `/docs${slug.startsWith('/') ? slug : `/${slug}`}`);
  }

  const docId = relativePathToDocId(relativePath);
  const normalizedDocId = docId.replace(/\/index$/u, '');
  return normalizeRoutePath(`/docs/${normalizedDocId}`);
}

function getFirstNavigableDoc(items) {
  for (const item of items) {
    const docId = getFirstNavigableDocFromItem(item);

    if (docId) {
      return docId;
    }
  }

  return '';
}

function getFirstNavigableDocFromItem(item) {
  if (typeof item === 'string') {
    return item;
  }

  if (!item || typeof item !== 'object') {
    return '';
  }

  if (item.type === 'doc' || item.type === 'ref') {
    return item.id || item.docId || '';
  }

  if (item.type === 'category') {
    if (item.link?.type === 'doc' && item.link.id) {
      return item.link.id;
    }

    return getFirstNavigableDoc(item.items || []);
  }

  return '';
}

function collectCategoryLabels(items, labels = new Set()) {
  for (const item of items) {
    if (!item || typeof item !== 'object' || item.type !== 'category') {
      continue;
    }

    if (item.label) {
      labels.add(item.label);
    }

    collectCategoryLabels(item.items || [], labels);
  }

  return labels;
}

function findCategoryByLabel(items, targetLabel) {
  for (const item of items) {
    if (!item || typeof item !== 'object' || item.type !== 'category') {
      continue;
    }

    if (item.label === targetLabel) {
      return item;
    }

    const nestedMatch = findCategoryByLabel(item.items || [], targetLabel);

    if (nestedMatch) {
      return nestedMatch;
    }
  }

  return null;
}

function collectDocIds(items, docs = []) {
  for (const item of items) {
    if (typeof item === 'string') {
      docs.push(item);
      continue;
    }

    if (!item || typeof item !== 'object') {
      continue;
    }

    if (item.type === 'doc' || item.type === 'ref') {
      if (item.id || item.docId) {
        docs.push(item.id || item.docId);
      }
      continue;
    }

    if (item.type === 'category') {
      if (item.link?.type === 'doc' && item.link.id) {
        docs.push(item.link.id);
      }

      collectDocIds(item.items || [], docs);
    }
  }

  return docs;
}

function normalizeNavbarItem(item) {
  return {
    label: item?.label || '',
    type: item?.type || '',
    sidebarId: item?.sidebarId || '',
    to: item?.to || '',
    href: item?.href || '',
    className: item?.className || '',
    position: item?.position || 'right',
  };
}

function countActionableLinks(document, actionableRoutes) {
  const routes = new Set();

  extractLinkTargets(document.body).forEach((target) => {
    const route = normalizeRoutePath(target);

    if (route && actionableRoutes.has(route)) {
      routes.add(route);
    }
  });

  return routes.size;
}

function validateClickBudgetEntry(entry, docByRoute, actionableRoutes, failures) {
  const document = docByRoute.get(entry.route);

  if (!document) {
    failures.push(`- ${entry.name} points to "${entry.route}", but that route does not resolve to a local docs page.`);
    return;
  }

  if (actionableRoutes.has(entry.route)) {
    if (entry.maxClicks < 1) {
      failures.push(`- ${entry.name} should allow at least one click to reach "${entry.route}".`);
    }
    return;
  }

  if (entry.maxClicks < 2) {
    failures.push(`- ${entry.name} points to non-actionable route "${entry.route}" but only allows ${entry.maxClicks} click(s).`);
    return;
  }

  const actionableLinks = countActionableLinks(document, actionableRoutes);
  const requiredLinks = entry.minActionableLinks ?? 1;

  if (actionableLinks < requiredLinks) {
    failures.push(
      `- ${entry.name} should reach an actionable tutorial/case-study within ${entry.maxClicks} clicks. Route "${entry.route}" only exposes ${actionableLinks} direct actionable link(s); expected at least ${requiredLinks}.`,
    );
  }
}

function validateEntryClickBudgets(documents, failures) {
  const docByRoute = new Map();
  const docIdToRoute = new Map();
  const actionableRoutes = new Set();

  documents.forEach((document) => {
    const relativePath = relativeFromRoot(document.filePath);
    const route = getDocumentRoute(relativePath, document.frontMatter ?? {});
    const docId = relativePathToDocId(relativePath);

    if (route) {
      docByRoute.set(route, document);
    }

    docIdToRoute.set(docId, route);

    if (ACTIONABLE_CONTENT_FORMS.has(resolveContentFormKey(document.frontMatter ?? {})) && route) {
      actionableRoutes.add(route);
    }
  });

  HOMEPAGE_CLICK_BUDGETS.forEach((entry) => {
    validateClickBudgetEntry(entry, docByRoute, actionableRoutes, failures);
  });

  NAVIGATION_CLICK_BUDGETS.forEach(({name, sidebarId, ...entry}) => {
    const route = docIdToRoute.get(EXPECTED_SIDEBAR_ENTRY_DOCS[sidebarId]);

    validateClickBudgetEntry(
      {
        name,
        route,
        ...entry,
      },
      docByRoute,
      actionableRoutes,
      failures,
    );
  });
}

function validateNavigationGuards(failures) {
  Object.entries(EXPECTED_SIDEBAR_ENTRY_DOCS).forEach(([sidebarId, expectedDocId]) => {
    const sidebarItems = sidebars[sidebarId];

    if (!Array.isArray(sidebarItems)) {
      failures.push(`- Missing sidebar definition "${sidebarId}".`);
      return;
    }

    const actualDocId = getFirstNavigableDoc(sidebarItems);

    if (actualDocId !== expectedDocId) {
      failures.push(
        `- Sidebar "${sidebarId}" should open on "${expectedDocId}", found "${actualDocId || 'missing'}".`,
      );
    }
  });

  EXPECTED_ACTION_CATEGORIES.forEach(({sidebarId, label, minimumDocs, requiredSuffix}) => {
    const sidebarItems = sidebars[sidebarId];
    const categoryLabels = collectCategoryLabels(sidebarItems || []);

    if (!categoryLabels.has(label)) {
      failures.push(`- Sidebar "${sidebarId}" is missing the action category "${label}".`);
      return;
    }

    const category = findCategoryByLabel(sidebarItems, label);
    const docIds = collectDocIds(category?.items || []);

    if (docIds.length < minimumDocs) {
      failures.push(
        `- Sidebar "${sidebarId}" action category "${label}" should expose at least ${minimumDocs} docs, found ${docIds.length}.`,
      );
    }

    const invalidDocs = docIds.filter((docId) => !docId.endsWith(requiredSuffix));

    if (invalidDocs.length > 0) {
      failures.push(
        `- Sidebar "${sidebarId}" action category "${label}" must only contain "${requiredSuffix}" docs. Invalid entries: ${invalidDocs.join(', ')}.`,
      );
    }
  });

  const actualLeftItems = (docusaurusConfig.themeConfig?.navbar?.items || [])
    .map(normalizeNavbarItem)
    .filter((item) => item.position === 'left');

  if (actualLeftItems.length !== EXPECTED_NAVBAR_LEFT_ITEMS.length) {
    failures.push(
      `- Navbar should expose exactly ${EXPECTED_NAVBAR_LEFT_ITEMS.length} left-side primary items, found ${actualLeftItems.length}.`,
    );
    return;
  }

  EXPECTED_NAVBAR_LEFT_ITEMS.forEach((expectedItem, index) => {
    const actualItem = actualLeftItems[index];
    const mismatches = Object.entries(expectedItem).filter(([key, value]) => actualItem[key] !== value);

    if (mismatches.length > 0) {
      failures.push(
        `- Navbar item ${index + 1} should be ${JSON.stringify(expectedItem)}, found ${JSON.stringify(actualItem)}.`,
      );
    }
  });

  const actualRightItems = (docusaurusConfig.themeConfig?.navbar?.items || [])
    .map(normalizeNavbarItem)
    .filter((item) => item.position === 'right')
    .map((item) => ({
      ...item,
      href: item.href.includes('github.com/') ? 'github' : item.href,
    }));

  if (actualRightItems.length !== EXPECTED_NAVBAR_RIGHT_ITEMS.length) {
    failures.push(
      `- Navbar should expose exactly ${EXPECTED_NAVBAR_RIGHT_ITEMS.length} right-side items, found ${actualRightItems.length}.`,
    );
    return;
  }

  EXPECTED_NAVBAR_RIGHT_ITEMS.forEach((expectedItem, index) => {
    const actualItem = actualRightItems[index];
    const mismatches = Object.entries(expectedItem).filter(([key, value]) => actualItem[key] !== value);

    if (mismatches.length > 0) {
      failures.push(
        `- Right-side navbar item ${index + 1} should be ${JSON.stringify(expectedItem)}, found ${JSON.stringify(actualItem)}.`,
      );
    }
  });
}

async function main() {
  const documents = await Promise.all(
    (await listMarkdownFiles(DOCS_ROOT)).map((filePath) => readMarkdownDocument(filePath)),
  );
  const unexpectedMismatches = [];
  const navigationFailures = [];
  const clickBudgetFailures = [];

  documents.forEach((document) => {
    const relativePath = relativeFromRoot(document.filePath);
    const expectedDomain = getExpectedDomain(relativePath);

    if (!expectedDomain) {
      return;
    }

    const actualDomain = resolveDomainKey(document.frontMatter);

    if (actualDomain === expectedDomain) {
      return;
    }

    unexpectedMismatches.push({relativePath, actualDomain, expectedDomain});
  });

  if (unexpectedMismatches.length > 0) {
    console.error('IA audit failed. Unexpected path/domain mismatches found:\n');
    unexpectedMismatches.forEach(({relativePath, actualDomain, expectedDomain}) => {
      console.error(
        `- ${relativePath}: expected domain "${expectedDomain}" from path, found "${actualDomain || 'missing'}".`,
      );
    });
  }

  validateNavigationGuards(navigationFailures);
  validateEntryClickBudgets(documents, clickBudgetFailures);

  if (navigationFailures.length > 0) {
    console.error('IA audit failed. Navigation guard violations found:\n');
    navigationFailures.forEach((failure) => {
      console.error(failure);
    });
  }

  if (clickBudgetFailures.length > 0) {
    console.error('IA audit failed. Entry click-budget violations found:\n');
    clickBudgetFailures.forEach((failure) => {
      console.error(failure);
    });
  }

  if (unexpectedMismatches.length > 0 || navigationFailures.length > 0 || clickBudgetFailures.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log('IA audit passed.');
  console.log('Allowed path/domain exceptions: 0');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
