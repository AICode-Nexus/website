import path from 'node:path';
import {createRequire} from 'node:module';
import {
  extractHeadings,
  fileExists,
  hasMarkdownLink,
  listMarkdownFiles,
  parseFrontMatter,
  readMarkdownDocument,
  splitSections,
  workspaceRoot,
} from './lib/content-utils.mjs';

const require = createRequire(import.meta.url);
const {
  VALID_CONTENT_FORMS,
  VALID_DOMAINS,
  VALID_ENTRY_ROLES,
  VALID_JOURNEY_STAGES,
  resolveContentFormKey,
  resolveDomainKey,
  resolveEntryRoleKey,
  resolveJourneyStageKey,
} = require('../../src/data/knowledgeModel');

const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const BLOG_ROOT = path.join(workspaceRoot, 'blog');

const DOMAIN_DIRS = new Map([
  ['development-modes', 'development-modes'],
  ['workflows', 'workflows'],
  ['tools', 'tools'],
  ['standards', 'standards'],
  ['architecture', 'architecture'],
  ['ecosystem', 'ecosystem'],
]);

const KIND_RULES = {
  hub: {minChars: 260, minHeadings: 3},
  guide: {minChars: 260, minHeadings: 3},
  comparison: {minChars: 420, minHeadings: 4, requiresTable: true},
  playbook: {minChars: 420, minHeadings: 4},
  insight: {minChars: 420, minHeadings: 4},
};

const FAMILY_RULES = {
  generatedTool: {
    minChars: 900,
    minHeadings: 5,
    minInternalDocLinks: 3,
    minSourceLinks: 2,
    requiresTable: true,
  },
  generatedWorkflow: {
    minChars: 850,
    minHeadings: 5,
    minInternalDocLinks: 3,
    minSourceLinks: 1,
    requiresTable: true,
  },
  hubOverview: {
    minChars: 700,
    minHeadings: 4,
    minInternalDocLinks: 6,
  },
  archiveLens: {
    minChars: 160,
    minHeadings: 2,
    minInternalDocLinks: 2,
    requiredHeadingPatterns: [
      {
        label: '定位或用途',
        pattern: /(背景|定位|这里仍然保留什么|结论先行|适用场景|这类透镜现在怎么用)/u,
      },
      {
        label: '继续阅读',
        pattern: /(延伸阅读|相关文档|继续阅读|下一步|后续方向)/u,
      },
    ],
  },
  siteAdminProcess: {
    minChars: 260,
    minHeadings: 4,
    minInternalDocLinks: 2,
    requiredHeadingPatterns: [
      {
        label: '定位或用途',
        pattern: /(目标|背景|适用场景|当前阶段|推荐结构|标准流程)/u,
      },
      {
        label: '继续阅读',
        pattern: /(相关文档|继续阅读|后续方向)/u,
      },
    ],
  },
};

const DAILY_BRIEF_SECTIONS = [
  'TL;DR',
  'What changed today',
  'Why it matters',
  'What to test',
  'Watchlist',
  'Sources',
  'Related docs',
];

function relativeFromRoot(filePath) {
  return path.relative(workspaceRoot, filePath).replace(/\\/gu, '/');
}

function normalizeRoutePath(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }

  const trimmedValue = value.trim().replace(/^https?:\/\/[^/]+/u, '');
  if (!trimmedValue.startsWith('/')) {
    return null;
  }

  const [withoutQuery] = trimmedValue.split('?');
  const [withoutHash] = withoutQuery.split('#');
  if (withoutHash === '/') {
    return '/';
  }

  return withoutHash.replace(/\/+$/u, '');
}

function normalizeExternalUrl(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }

  return value.trim().replace(/[),.;]+$/u, '');
}

function extractLinkTargets(value) {
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

function extractRawUrls(value) {
  return value.match(/https?:\/\/[^\s<>"')]+/gu) ?? [];
}

function getDocKind(relativePath, frontMatter) {
  if (relativePath.startsWith('docs/site-admin/')) {
    return frontMatter.kind || 'guide';
  }
  return frontMatter.kind;
}

function ensure(condition, errors, message) {
  if (!condition) {
    errors.push(message);
  }
}

function validateDocDirectory(relativePath, frontMatter, errors) {
  if (relativePath.startsWith('docs/archive/')) {
    return;
  }

  const resolvedDomain = resolveDomainKey(frontMatter);

  for (const [directoryName, domain] of DOMAIN_DIRS.entries()) {
    if (relativePath.startsWith(`docs/${directoryName}/`)) {
      ensure(
        resolvedDomain === domain,
        errors,
        `${relativePath}: expected domain "${domain}" for this directory but found "${frontMatter.domain ?? frontMatter.pillar ?? 'missing'}".`,
      );
      return;
    }
  }
}

function validateFrontMatterModel(relativePath, frontMatter, errors) {
  const domain = resolveDomainKey(frontMatter);
  const journeyStage = resolveJourneyStageKey(frontMatter);
  const entryRole = resolveEntryRoleKey(frontMatter);
  const contentForm = resolveContentFormKey(frontMatter);

  ensure(Boolean(frontMatter.domain), errors, `${relativePath}: missing frontmatter.domain.`);
  ensure(
    !Object.hasOwn(frontMatter, 'pillar'),
    errors,
    `${relativePath}: legacy frontmatter.pillar is no longer allowed; use frontmatter.domain only.`,
  );
  ensure(VALID_DOMAINS.has(domain), errors, `${relativePath}: invalid frontmatter.domain "${frontMatter.domain ?? 'missing'}".`);
  ensure(
    Boolean(frontMatter.journey_stage),
    errors,
    `${relativePath}: missing frontmatter.journey_stage.`,
  );
  ensure(
    VALID_JOURNEY_STAGES.has(journeyStage),
    errors,
    `${relativePath}: invalid frontmatter.journey_stage "${frontMatter.journey_stage ?? 'missing'}".`,
  );
  ensure(Boolean(frontMatter.entry_role), errors, `${relativePath}: missing frontmatter.entry_role.`);
  ensure(
    VALID_ENTRY_ROLES.has(entryRole),
    errors,
    `${relativePath}: invalid frontmatter.entry_role "${frontMatter.entry_role ?? 'missing'}".`,
  );
  ensure(
    Boolean(frontMatter.content_form),
    errors,
    `${relativePath}: missing frontmatter.content_form.`,
  );
  ensure(
    VALID_CONTENT_FORMS.has(contentForm),
    errors,
    `${relativePath}: invalid frontmatter.content_form "${frontMatter.content_form ?? 'missing'}".`,
  );
}

function validateKindShape(relativePath, document, kind, errors) {
  if (relativePath.startsWith('docs/archive/')) {
    return;
  }

  const rule = KIND_RULES[kind];
  if (!rule) {
    errors.push(`${relativePath}: unsupported or missing kind "${kind ?? 'missing'}".`);
    return;
  }

  ensure(
    document.plainText.length >= rule.minChars,
    errors,
    `${relativePath}: body is too short for kind "${kind}" (${document.plainText.length} < ${rule.minChars}).`,
  );
  ensure(
    document.headings.length >= rule.minHeadings,
    errors,
    `${relativePath}: expected at least ${rule.minHeadings} H2 sections for kind "${kind}".`,
  );

  if (rule.requiresTable) {
    ensure(
      /\|.+\|/u.test(document.body),
      errors,
      `${relativePath}: kind "${kind}" must include at least one markdown table.`,
    );
  }
}

function buildValidDocRoutes(documents) {
  const routes = new Set(['/docs']);

  documents.forEach((document) => {
    const slug = document.frontMatter.slug;
    if (typeof slug !== 'string' || slug.trim() === '') {
      return;
    }

    const route = normalizeRoutePath(slug.startsWith('/docs/') ? slug : `/docs${slug.startsWith('/') ? slug : `/${slug}`}`);
    if (route) {
      routes.add(route);
    }
  });

  return routes;
}

function isCountableInternalRoute(target, validDocRoutes) {
  const route = normalizeRoutePath(target);
  if (!route) {
    return false;
  }

  if (route === '/blog' || route.startsWith('/blog/')) {
    return true;
  }

  return validDocRoutes.has(route);
}

function countInternalDocLinks(value, validDocRoutes) {
  const routes = new Set();

  extractLinkTargets(value).forEach((target) => {
    if (isCountableInternalRoute(target, validDocRoutes)) {
      routes.add(normalizeRoutePath(target));
    }
  });

  return routes.size;
}

function countSourceLinks(document) {
  const sourceCandidate =
    document.sections.get('来源') ??
    document.sections.get('Sources') ??
    document.sections.get('官方事实与工程判断') ??
    document.sections.get('当前官方事实') ??
    document.body;
  const urls = new Set();

  extractLinkTargets(sourceCandidate).forEach((target) => {
    if (/^https?:\/\//u.test(target)) {
      const normalizedTarget = normalizeExternalUrl(target);
      if (normalizedTarget) {
        urls.add(normalizedTarget);
      }
    }
  });

  extractRawUrls(sourceCandidate).forEach((target) => {
    const normalizedTarget = normalizeExternalUrl(target);
    if (normalizedTarget) {
      urls.add(normalizedTarget);
    }
  });

  return urls.size;
}

function getFamilyRule(relativePath) {
  if (
    /^docs\/tools\/(?:platforms|control-planes|execution-stacks|terminal-agents|ide-first)\//u.test(relativePath) ||
    relativePath.startsWith('docs/ecosystem/integrations/')
  ) {
    return {name: 'generatedTool', rule: FAMILY_RULES.generatedTool};
  }

  if (/^docs\/workflows\/(?:patterns|frameworks|community-frameworks)\//u.test(relativePath)) {
    return {name: 'generatedWorkflow', rule: FAMILY_RULES.generatedWorkflow};
  }

  if (
    relativePath === 'docs/tools/index.mdx' ||
    relativePath === 'docs/workflows/index.mdx' ||
    relativePath.startsWith('docs/overview/')
  ) {
    return {name: 'hubOverview', rule: FAMILY_RULES.hubOverview};
  }

  if (relativePath.startsWith('docs/archive/')) {
    return {name: 'archiveLens', rule: FAMILY_RULES.archiveLens};
  }

  if (relativePath.startsWith('docs/site-admin/')) {
    return {name: 'siteAdminProcess', rule: FAMILY_RULES.siteAdminProcess};
  }

  return null;
}

function validateFamilyShape(relativePath, document, errors, validDocRoutes) {
  const family = getFamilyRule(relativePath);
  if (!family) {
    return;
  }

  const {rule, name} = family;

  ensure(
    document.plainText.length >= rule.minChars,
    errors,
    `${relativePath}: body is too short for family "${name}" (${document.plainText.length} < ${rule.minChars}).`,
  );
  ensure(
    document.headings.length >= rule.minHeadings,
    errors,
    `${relativePath}: expected at least ${rule.minHeadings} H2 sections for family "${name}".`,
  );

  if (rule.requiresTable) {
    ensure(
      /\|.+\|/u.test(document.body),
      errors,
      `${relativePath}: family "${name}" must include at least one markdown table.`,
    );
  }

  if (rule.minInternalDocLinks) {
    const internalDocLinks = countInternalDocLinks(document.body, validDocRoutes);
    ensure(
      internalDocLinks >= rule.minInternalDocLinks,
      errors,
      `${relativePath}: family "${name}" must include at least ${rule.minInternalDocLinks} internal docs/blog links (${internalDocLinks} found).`,
    );
  }

  if (rule.minSourceLinks) {
    const sourceLinks = countSourceLinks(document);
    ensure(
      sourceLinks >= rule.minSourceLinks,
      errors,
      `${relativePath}: family "${name}" must include at least ${rule.minSourceLinks} source links (${sourceLinks} found).`,
    );
  }

  if (rule.requiredHeadingPatterns) {
    const joinedHeadings = document.headings.join('\n');
    rule.requiredHeadingPatterns.forEach(({label, pattern}) => {
      ensure(
        pattern.test(joinedHeadings),
        errors,
        `${relativePath}: family "${name}" must include an H2 that covers ${label}.`,
      );
    });
  }
}

function validateDailyBrief(relativePath, source, frontMatter, errors) {
  ensure(
    Array.isArray(frontMatter.tags) && frontMatter.tags.includes('daily-brief'),
    errors,
    `${relativePath}: daily brief posts must include the "daily-brief" tag.`,
  );

  const {body} = parseFrontMatter(source);
  const sections = splitSections(body);
  DAILY_BRIEF_SECTIONS.forEach((section) => {
    ensure(sections.has(section), errors, `${relativePath}: missing daily brief section "${section}".`);
  });

  const sources = sections.get('Sources') ?? '';
  const relatedDocs = sections.get('Related docs') ?? '';

  ensure(hasMarkdownLink(sources), errors, `${relativePath}: Sources section must include at least one markdown link.`);
  ensure(
    /\[[^\]]+\]\(\/docs\/[^)]*\)/u.test(relatedDocs),
    errors,
    `${relativePath}: Related docs section must link to at least one /docs/ page.`,
  );
}

async function validateDocs() {
  const errors = [];
  const docFiles = await listMarkdownFiles(DOCS_ROOT);
  const documents = await Promise.all(docFiles.map((filePath) => readMarkdownDocument(filePath)));
  const validDocRoutes = buildValidDocRoutes(documents);

  documents.forEach((document) => {
    const relativePath = relativeFromRoot(document.filePath);
    const frontMatter = document.frontMatter;

    ensure(Boolean(frontMatter.title), errors, `${relativePath}: missing frontmatter.title.`);
    ensure(Boolean(frontMatter.description), errors, `${relativePath}: missing frontmatter.description.`);
    ensure(Boolean(frontMatter.slug), errors, `${relativePath}: missing frontmatter.slug.`);

    if (frontMatter.unlisted === true) {
      return;
    }

    const kind = getDocKind(relativePath, frontMatter);
    validateFrontMatterModel(relativePath, frontMatter, errors);
    validateDocDirectory(relativePath, frontMatter, errors);
    validateKindShape(relativePath, document, kind, errors);
    validateFamilyShape(relativePath, document, errors, validDocRoutes);
  });

  return errors;
}

async function validateBlog() {
  const errors = [];
  if (!(await fileExists(BLOG_ROOT))) {
    return errors;
  }

  const blogFiles = await listMarkdownFiles(BLOG_ROOT);
  for (const filePath of blogFiles) {
    const relativePath = relativeFromRoot(filePath);
    const source = await documentRead(filePath);
    const {data: frontMatter, body} = parseFrontMatter(source);
    if (frontMatter.draft === true) {
      continue;
    }

    ensure(Boolean(frontMatter.title), errors, `${relativePath}: missing frontmatter.title.`);
    ensure(Boolean(frontMatter.description), errors, `${relativePath}: missing frontmatter.description.`);

    const headings = extractHeadings(body);
    ensure(headings.length >= 5, errors, `${relativePath}: blog posts must contain at least 5 H2 sections.`);

    if (relativePath.startsWith('blog/daily/')) {
      validateDailyBrief(relativePath, source, frontMatter, errors);
    }
  }

  return errors;
}

async function documentRead(filePath) {
  const document = await readMarkdownDocument(filePath);
  return document.source;
}

async function main() {
  const errors = [...(await validateDocs()), ...(await validateBlog())];

  if (errors.length > 0) {
    console.error('Content quality check failed:\n');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log('Content quality check passed.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
