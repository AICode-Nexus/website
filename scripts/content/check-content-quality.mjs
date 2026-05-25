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
  template: {minChars: 24, minHeadings: 2},
  tutorial: {minChars: 320, minHeadings: 4},
  'case-study': {minChars: 360, minHeadings: 5},
  comparison: {minChars: 420, minHeadings: 4, requiresTable: true},
  playbook: {minChars: 420, minHeadings: 4},
  insight: {minChars: 420, minHeadings: 4},
  resource: {minChars: 24, minHeadings: 0},
};

const FAMILY_RULES = {
  tutorialDoc: {
    minChars: 320,
    minHeadings: 4,
    minInternalDocLinks: 3,
  },
  caseStudyDoc: {
    minChars: 360,
    minHeadings: 5,
    minInternalDocLinks: 3,
  },
  actionGuide: {
    minChars: 240,
    minHeadings: 4,
    minInternalDocLinks: 2,
  },
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
  supplementaryTool: {
    minChars: 520,
    minHeadings: 5,
    minInternalDocLinks: 3,
    minSourceLinks: 2,
  },
  supplementaryWorkflow: {
    minChars: 520,
    minHeadings: 5,
    minInternalDocLinks: 3,
    minSourceLinks: 1,
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

const ACTION_TEMPLATE_PATTERN = /\/(?:quick-start|common-tasks|troubleshooting|best-practices|runbook|examples|pitfalls|tooling)\.md$/u;
const TUTORIAL_LINK_REQUIRED_PATHS = new Set([
  'docs/case-studies/index.md',
  'docs/overview/start-here.mdx',
  'docs/overview/learning-paths.md',
  'docs/overview/tool-selection-map.md',
  'docs/overview/journey-map.md',
  'docs/overview/taxonomy.md',
  'docs/overview/content-index.md',
  'docs/tools/index.mdx',
  'docs/workflows/index.mdx',
  'docs/development-modes/index.md',
  'docs/standards/index.md',
  'docs/architecture/index.md',
  'docs/ecosystem/index.md',
  'docs/comparisons/index.md',
  'docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex.md',
  'docs/comparisons/cursor-vs-windsurf-vs-cline.md',
  'docs/insights/index.md',
  'docs/insights/agentic-coding-patterns.md',
  'docs/insights/monthly-brief-2026-03.md',
  'docs/tools/terminal-agents/claude-code/index.md',
  'docs/tools/execution-stacks/openai-codex/index.md',
  'docs/tools/ide-first/cursor/index.md',
  'docs/tools/platforms/github-copilot/index.md',
  'docs/tools/control-planes/vscode-agents/index.md',
  'docs/tools/terminal-agents/gemini-cli/index.md',
  'docs/tools/terminal-agents/cline/index.md',
  'docs/tools/ide-first/windsurf/index.md',
  'docs/workflows/patterns/bugfix-refactor-test/index.md',
  'docs/workflows/patterns/terminal-first-repo-pairing/index.md',
  'docs/workflows/patterns/issue-to-draft-pr/index.md',
  'docs/workflows/patterns/spec-first/index.md',
  'docs/workflows/patterns/parallel-worktrees-multi-agent/index.md',
  'docs/workflows/patterns/local-to-background-to-cloud/index.md',
]);

const HOMEPAGE_GATEWAY_REQUIREMENTS = new Map([
  ['docs/case-studies/index.md', {minTutorialLinks: 4}],
  ['docs/tools/index.mdx', {minTutorialLinks: 6}],
  ['docs/workflows/index.mdx', {minTutorialLinks: 6}],
  ['docs/overview/start-here.mdx', {minTutorialLinks: 4}],
  ['docs/overview/learning-paths.md', {minTutorialLinks: 5}],
  ['docs/overview/tool-selection-map.md', {minTutorialLinks: 4}],
  ['docs/overview/journey-map.md', {minTutorialLinks: 3}],
  ['docs/overview/content-index.md', {minTutorialLinks: 3}],
]);

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

function countLinksToSpecificRoutes(value, allowedRoutes) {
  const routes = new Set();

  extractLinkTargets(value).forEach((target) => {
    const route = normalizeRoutePath(target);
    if (route && allowedRoutes.has(route)) {
      routes.add(route);
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

function isSupplementaryDoc(frontMatter) {
  return typeof frontMatter.sidebar_label === 'string' && /^补充：/u.test(frontMatter.sidebar_label);
}

function getFamilyRule(relativePath, frontMatter) {
  const contentForm = resolveContentFormKey(frontMatter);
  const supplementaryDoc = isSupplementaryDoc(frontMatter);

  if (contentForm === 'tutorial') {
    return {name: 'tutorialDoc', rule: FAMILY_RULES.tutorialDoc};
  }

  if (contentForm === 'case-study') {
    return {name: 'caseStudyDoc', rule: FAMILY_RULES.caseStudyDoc};
  }

  if (ACTION_TEMPLATE_PATTERN.test(relativePath)) {
    return {name: 'actionGuide', rule: FAMILY_RULES.actionGuide};
  }

  if (
    /^docs\/tools\/(?:platforms|control-planes|execution-stacks|terminal-agents|ide-first)\//u.test(relativePath) ||
    relativePath.startsWith('docs/ecosystem/integrations/')
  ) {
    if (supplementaryDoc) {
      return {name: 'supplementaryTool', rule: FAMILY_RULES.supplementaryTool};
    }
    return {name: 'generatedTool', rule: FAMILY_RULES.generatedTool};
  }

  if (/^docs\/workflows\/(?:patterns|frameworks|community-frameworks)\//u.test(relativePath)) {
    if (supplementaryDoc) {
      return {name: 'supplementaryWorkflow', rule: FAMILY_RULES.supplementaryWorkflow};
    }
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

function validateFamilyShape(relativePath, document, frontMatter, errors, validDocRoutes) {
  const family = getFamilyRule(relativePath, frontMatter);
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

function validateTutorialRequirements(relativePath, frontMatter, document, errors) {
  if (resolveContentFormKey(frontMatter) !== 'tutorial') {
    return;
  }

  ensure(
    Array.isArray(frontMatter.tutorial_series) && frontMatter.tutorial_series.length > 0,
    errors,
    `${relativePath}: tutorial docs must define frontmatter.tutorial_series.`,
  );
  ensure(
    (typeof frontMatter.estimated_time === 'number' && frontMatter.estimated_time > 0) ||
      (typeof frontMatter.estimated_time === 'string' && /^\d+$/u.test(frontMatter.estimated_time)),
    errors,
    `${relativePath}: tutorial docs must define a positive frontmatter.estimated_time.`,
  );
  ensure(
    Array.isArray(frontMatter.prerequisites) && frontMatter.prerequisites.length > 0,
    errors,
    `${relativePath}: tutorial docs must define frontmatter.prerequisites.`,
  );
  ensure(
    typeof frontMatter.deliverable === 'string' && frontMatter.deliverable.trim() !== '',
    errors,
    `${relativePath}: tutorial docs must define frontmatter.deliverable.`,
  );

  const joinedHeadings = document.headings.join('\n');
  ensure(
    /(前置条件|准备工作|开始前|Prerequisites)/u.test(joinedHeadings),
    errors,
    `${relativePath}: tutorial docs must include a 前置条件/Prerequisites H2.`,
  );
  ensure(
    /(步骤|操作|Runbook|任务流程)/u.test(joinedHeadings),
    errors,
    `${relativePath}: tutorial docs must include a 步骤/Runbook H2.`,
  );
  ensure(
    /(验证|验收)/u.test(joinedHeadings),
    errors,
    `${relativePath}: tutorial docs must include a 验证/验收 H2.`,
  );
  ensure(
    /(下一步|继续阅读)/u.test(joinedHeadings),
    errors,
    `${relativePath}: tutorial docs must include a 下一步/继续阅读 H2.`,
  );
}

function validateCaseStudyRequirements(relativePath, frontMatter, document, errors) {
  if (resolveContentFormKey(frontMatter) !== 'case-study') {
    return;
  }

  ensure(
    typeof frontMatter.case_type === 'string' && frontMatter.case_type.trim() !== '',
    errors,
    `${relativePath}: case-study docs must define frontmatter.case_type.`,
  );
  ensure(
    typeof frontMatter.scenario === 'string' && frontMatter.scenario.trim() !== '',
    errors,
    `${relativePath}: case-study docs must define frontmatter.scenario.`,
  );
  ensure(
    Array.isArray(frontMatter.tool_stack) && frontMatter.tool_stack.length > 0,
    errors,
    `${relativePath}: case-study docs must define frontmatter.tool_stack.`,
  );
  ensure(
    typeof frontMatter.verification === 'string' && frontMatter.verification.trim() !== '',
    errors,
    `${relativePath}: case-study docs must define frontmatter.verification.`,
  );

  const joinedHeadings = document.headings.join('\n');
  ensure(/背景/u.test(joinedHeadings), errors, `${relativePath}: case-study docs must include a 背景 H2.`);
  ensure(
    /(输入约束|输入条件)/u.test(joinedHeadings),
    errors,
    `${relativePath}: case-study docs must include an 输入约束/输入条件 H2.`,
  );
  ensure(
    /(执行过程|执行步骤)/u.test(joinedHeadings),
    errors,
    `${relativePath}: case-study docs must include an 执行过程/执行步骤 H2.`,
  );
  ensure(/结果/u.test(joinedHeadings), errors, `${relativePath}: case-study docs must include a 结果 H2.`);
  ensure(/复盘/u.test(joinedHeadings), errors, `${relativePath}: case-study docs must include a 复盘 H2.`);
}

function buildTutorialRoutes(documents) {
  const routes = new Set();

  documents.forEach((document) => {
    const contentForm = resolveContentFormKey(document.frontMatter);
    if (!['tutorial', 'playbook', 'case-study'].includes(contentForm)) {
      return;
    }

    const route = normalizeRoutePath(
      document.frontMatter.slug?.startsWith('/docs/')
        ? document.frontMatter.slug
        : `/docs${document.frontMatter.slug?.startsWith('/') ? document.frontMatter.slug : `/${document.frontMatter.slug}`}`,
    );

    if (route) {
      routes.add(route);
    }
  });

  return routes;
}

function validateConceptTutorialLinks(relativePath, document, tutorialRoutes, errors) {
  if (!TUTORIAL_LINK_REQUIRED_PATHS.has(relativePath)) {
    return;
  }

  const tutorialLinks = countLinksToSpecificRoutes(document.body, tutorialRoutes);
  ensure(
    tutorialLinks >= 1,
    errors,
    `${relativePath}: concept landing pages must link to at least one tutorial/playbook/case-study doc.`,
  );
}

function validateHomepageGatewayLinks(relativePath, document, tutorialRoutes, errors) {
  const requirement = HOMEPAGE_GATEWAY_REQUIREMENTS.get(relativePath);
  if (!requirement) {
    return;
  }

  const tutorialLinks = countLinksToSpecificRoutes(document.body, tutorialRoutes);
  ensure(
    tutorialLinks >= requirement.minTutorialLinks,
    errors,
    `${relativePath}: homepage gateway pages must link to at least ${requirement.minTutorialLinks} tutorial/playbook/case-study docs (${tutorialLinks} found).`,
  );
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
  const tutorialRoutes = buildTutorialRoutes(documents);

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
    validateFamilyShape(relativePath, document, frontMatter, errors, validDocRoutes);
    validateTutorialRequirements(relativePath, frontMatter, document, errors);
    validateCaseStudyRequirements(relativePath, frontMatter, document, errors);
    validateConceptTutorialLinks(relativePath, document, tutorialRoutes, errors);
    validateHomepageGatewayLinks(relativePath, document, tutorialRoutes, errors);
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
