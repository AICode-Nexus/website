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
  resolveDomainKey,
} = require('../../src/data/knowledgeModel');

const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const DOMAIN_DIRS = new Set(DOMAIN_ORDER);

function relativeFromRoot(filePath) {
  return path.relative(workspaceRoot, filePath).replace(/\\/gu, '/');
}

function getExpectedDomain(relativePath) {
  const [, topLevel] = relativePath.split('/');
  return DOMAIN_DIRS.has(topLevel) ? topLevel : '';
}

async function main() {
  const documents = await Promise.all(
    (await listMarkdownFiles(DOCS_ROOT)).map((filePath) => readMarkdownDocument(filePath)),
  );
  const unexpectedMismatches = [];

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
