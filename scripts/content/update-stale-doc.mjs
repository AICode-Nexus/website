import path from 'node:path';
import {readdir, readFile} from 'node:fs/promises';
import {
  fileExists,
  formatIsoDate,
  parseArgs,
  readJson,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';
import {llmGenerate} from './llm-writer.mjs';

const STALE_DIR = path.join(workspaceRoot, 'content-sources', 'stale-docs');
const RELEASES_DIR = path.join(workspaceRoot, 'content-sources', 'tool-updates');
const LOGS_PATH = path.join(workspaceRoot, 'logs', 'auto-update-failures.json');
const MAX_UPDATES_PER_RUN = 2;

async function loadLatestStaleReport() {
  if (!(await fileExists(STALE_DIR))) return null;
  const files = await readdir(STALE_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('-stale-report.json')).sort().reverse();
  if (jsonFiles.length === 0) return null;
  return readJson(path.join(STALE_DIR, jsonFiles[0]));
}

async function loadLatestReleaseReport() {
  if (!(await fileExists(RELEASES_DIR))) return null;
  const files = await readdir(RELEASES_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('-releases.json')).sort().reverse();
  if (jsonFiles.length === 0) return null;
  return readJson(path.join(RELEASES_DIR, jsonFiles[0]));
}

function getReleaseNotes(releaseReport, toolId) {
  if (!releaseReport) return '';
  const update = releaseReport.updates?.find((u) => u.id === toolId);
  return update ? `${update.releaseName || update.latestVersion}: ${update.summary}` : '';
}

async function logFailure(entry) {
  let failures = [];
  if (await fileExists(LOGS_PATH)) {
    try { failures = await readJson(LOGS_PATH); } catch { failures = []; }
  }
  failures.push({...entry, timestamp: new Date().toISOString()});
  if (failures.length > 50) failures = failures.slice(-50);
  await writeTextFile(LOGS_PATH, `${JSON.stringify(failures, null, 2)}\n`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  const staleReport = await loadLatestStaleReport();
  if (!staleReport || staleReport.staleDocs.length === 0) {
    console.log('No stale docs to update.');
    return;
  }

  const releaseReport = await loadLatestReleaseReport();

  // Prioritize tool-release staleness over age-based
  const sorted = [...staleReport.staleDocs].sort((a, b) => {
    if (a.reason === 'tool-release' && b.reason !== 'tool-release') return -1;
    if (b.reason === 'tool-release' && a.reason !== 'tool-release') return 1;
    return 0;
  });

  const toUpdate = sorted.slice(0, MAX_UPDATES_PER_RUN);
  console.log(`Updating ${toUpdate.length} stale docs...`);

  let updated = 0;

  for (const staleDoc of toUpdate) {
    const filePath = path.join(workspaceRoot, staleDoc.filePath);
    if (!(await fileExists(filePath))) {
      console.warn(`File not found: ${staleDoc.filePath}`);
      continue;
    }

    const originalContent = await readFile(filePath, 'utf8');
    const releaseNotes = staleDoc.toolId ? getReleaseNotes(releaseReport, staleDoc.toolId) : '';

    const userMessage = JSON.stringify({
      task: 'update',
      filePath: staleDoc.filePath,
      reason: staleDoc.reason,
      toolVersion: staleDoc.toolVersion || null,
      releaseNotes: releaseNotes || null,
      currentContent: originalContent,
      today: date,
    }, null, 2);

    try {
      const result = await llmGenerate({
        promptName: 'doc-updater',
        userMessage,
        maxTokens: 8192,
      });

      if (!result || !result.updatedContent) {
        console.warn(`LLM returned no content for ${staleDoc.filePath}. Skipping.`);
        continue;
      }

      // Replace reviewed_at in the updated content
      let content = result.updatedContent;
      content = content.replace(/reviewed_at:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/u, `reviewed_at: '${date}'`);

      await writeTextFile(filePath, content);
      console.log(`Updated: ${staleDoc.filePath}`);
      updated += 1;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`Failed to update ${staleDoc.filePath}: ${msg}`);
      await logFailure({filePath: staleDoc.filePath, reason: staleDoc.reason, error: msg});
    }
  }

  console.log(`Docs updated: ${updated}/${toUpdate.length}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
