import path from 'node:path';
import {readdir} from 'node:fs/promises';
import {
  fileExists,
  formatIsoDate,
  listMarkdownFiles,
  parseArgs,
  readJson,
  readMarkdownDocument,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';

const RELEASES_DIR = path.join(workspaceRoot, 'content-sources', 'tool-updates');
const STALE_DIR = path.join(workspaceRoot, 'content-sources', 'stale-docs');
const DOCS_ROOT = path.join(workspaceRoot, 'docs');
const STALE_THRESHOLD_DAYS = 90;

function daysBetween(dateA, dateB) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return Math.floor((b - a) / (1000 * 60 * 60 * 24));
}

async function loadLatestReleaseReport() {
  if (!(await fileExists(RELEASES_DIR))) return null;

  const files = await readdir(RELEASES_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('-releases.json')).sort().reverse();
  if (jsonFiles.length === 0) return null;

  return readJson(path.join(RELEASES_DIR, jsonFiles[0]));
}

async function scanDocs() {
  const docs = [];
  if (!(await fileExists(DOCS_ROOT))) return docs;

  const files = await listMarkdownFiles(DOCS_ROOT);
  for (const filePath of files) {
    try {
      const doc = await readMarkdownDocument(filePath);
      docs.push({
        filePath: path.relative(workspaceRoot, filePath),
        title: doc.frontMatter.title,
        domain: doc.frontMatter.domain,
        reviewedAt: doc.frontMatter.reviewed_at,
        contentForm: doc.frontMatter.content_form,
      });
    } catch {
      // skip unreadable
    }
  }

  return docs;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  const {mkdir} = await import('node:fs/promises');
  await mkdir(STALE_DIR, {recursive: true});

  const releaseReport = await loadLatestReleaseReport();
  const docs = await scanDocs();

  const staleDocs = [];

  // Check docs against tool releases
  if (releaseReport) {
    for (const update of releaseReport.updates) {
      const toolName = update.title.toLowerCase();
      const releasedAt = update.publishedAt?.slice(0, 10);
      if (!releasedAt) continue;

      // Find docs that mention this tool
      for (const doc of docs) {
        const pathLower = doc.filePath.toLowerCase();
        const titleLower = (doc.title || '').toLowerCase();
        const idLower = update.id.toLowerCase();

        if (pathLower.includes(idLower) || titleLower.includes(toolName)) {
          if (!doc.reviewedAt || doc.reviewedAt < releasedAt) {
            staleDocs.push({
              filePath: doc.filePath,
              title: doc.title,
              reason: 'tool-release',
              toolId: update.id,
              toolVersion: update.latestVersion,
              releasedAt,
              docReviewedAt: doc.reviewedAt || 'never',
            });
          }
        }
      }
    }
  }

  // Check for generally stale docs (not reviewed in 90+ days)
  for (const doc of docs) {
    if (!doc.reviewedAt) continue;
    const age = daysBetween(doc.reviewedAt, date);
    if (age >= STALE_THRESHOLD_DAYS) {
      const alreadyFlagged = staleDocs.some((s) => s.filePath === doc.filePath);
      if (!alreadyFlagged) {
        staleDocs.push({
          filePath: doc.filePath,
          title: doc.title,
          reason: 'age',
          daysSinceReview: age,
          docReviewedAt: doc.reviewedAt,
        });
      }
    }
  }

  const report = {
    date,
    totalDocsScanned: docs.length,
    staleDocs,
  };

  const outputPath = path.join(STALE_DIR, `${date}-stale-report.json`);
  await writeTextFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Stale docs report: ${path.relative(workspaceRoot, outputPath)}`);
  console.log(`Total docs scanned: ${docs.length}, Stale: ${staleDocs.length}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
