import path from 'node:path';
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

const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const BLOG_ROOT = path.join(workspaceRoot, 'blog');

const PILLAR_DIRS = new Map([
  ['development-modes', 'development-modes'],
  ['workflows', 'workflows'],
  ['tools', 'tools'],
  ['standards', 'standards'],
  ['architecture', 'architecture'],
]);

const KIND_RULES = {
  hub: {minChars: 260, minHeadings: 3},
  guide: {minChars: 260, minHeadings: 3},
  comparison: {minChars: 420, minHeadings: 4, requiresTable: true},
  playbook: {minChars: 420, minHeadings: 4},
  insight: {minChars: 420, minHeadings: 4},
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

  for (const [directoryName, pillar] of PILLAR_DIRS.entries()) {
    if (relativePath.startsWith(`docs/${directoryName}/`)) {
      ensure(
        frontMatter.pillar === pillar,
        errors,
        `${relativePath}: expected pillar "${pillar}" for this directory but found "${frontMatter.pillar ?? 'missing'}".`,
      );
      return;
    }
  }
}

function validateKindShape(relativePath, document, kind, errors) {
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

  for (const filePath of docFiles) {
    const relativePath = relativeFromRoot(filePath);
    if (relativePath.startsWith('docs/archive/')) {
      continue;
    }

    const document = await readMarkdownDocument(filePath);
    const frontMatter = document.frontMatter;

    ensure(Boolean(frontMatter.title), errors, `${relativePath}: missing frontmatter.title.`);
    ensure(Boolean(frontMatter.description), errors, `${relativePath}: missing frontmatter.description.`);
    ensure(Boolean(frontMatter.slug), errors, `${relativePath}: missing frontmatter.slug.`);

    const kind = getDocKind(relativePath, frontMatter);
    validateDocDirectory(relativePath, frontMatter, errors);
    validateKindShape(relativePath, document, kind, errors);
  }

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
