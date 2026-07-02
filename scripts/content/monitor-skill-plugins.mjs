import crypto from 'node:crypto';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {readdir} from 'node:fs/promises';
import {
  fileExists,
  formatIsoDate,
  parseArgs,
  readJson,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';

const SKILL_PLUGIN_DIR = path.join(workspaceRoot, 'content-sources', 'skill-plugins');
const WATCHLIST_PATH = path.join(SKILL_PLUGIN_DIR, 'watchlist.json');
const REPORT_SUFFIX = '-candidates.json';
const FETCH_LIMIT_CHARS = 24000;

export const CANDIDATE_TYPES = [
  'skill-standard',
  'skill-runtime-docs',
  'plugin-marketplace',
  'methodology-pack',
  'authoring-tool',
  'mcp-bundle',
];

export const REPORT_STATUSES = ['new', 'changed', 'watch'];
export const CONFIDENCE_LEVELS = ['high', 'medium', 'low'];

function ensureObject(value, fieldName) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${fieldName} must be an object.`);
  }

  return value;
}

function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${fieldName} must be a non-empty string.`);
  }

  return value.trim();
}

function ensureOptionalString(value, fieldName) {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  return ensureString(value, fieldName);
}

function ensureHttpUrl(value, fieldName) {
  const url = ensureString(value, fieldName);

  if (!/^https?:\/\//u.test(url)) {
    throw new Error(`${fieldName} must be an absolute http(s) URL.`);
  }

  return url;
}

function ensureOptionalHttpUrl(value, fieldName) {
  const url = ensureOptionalString(value, fieldName);

  if (!url) {
    return '';
  }

  if (!/^https?:\/\//u.test(url)) {
    throw new Error(`${fieldName} must be an absolute http(s) URL when provided.`);
  }

  return url;
}

function ensureStringArray(value, fieldName) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${fieldName} must be a non-empty array.`);
  }

  return value.map((item, index) => ensureString(item, `${fieldName}[${index}]`));
}

function ensureEnum(value, fieldName, allowedValues) {
  const normalized = ensureString(value, fieldName);

  if (!allowedValues.includes(normalized)) {
    throw new Error(`${fieldName} must be one of ${allowedValues.join(', ')}.`);
  }

  return normalized;
}

function hashText(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function normalizeCandidateType(record) {
  if (record.candidateType !== undefined) {
    return ensureEnum(record.candidateType, `${record.id ?? 'candidate'}.candidateType`, CANDIDATE_TYPES);
  }

  const name = String(record.name ?? '').toLowerCase();
  const sourceUrl = String(record.sourceUrl ?? '').toLowerCase();
  const tags = new Set((record.suggestedTags ?? []).map((tag) => String(tag).toLowerCase()));

  if (tags.has('skill-standard') || sourceUrl.includes('agentskills.io')) {
    return 'skill-standard';
  }

  if (tags.has('plugin-marketplace') || name.includes('plugin') || name.includes('marketplace')) {
    return 'plugin-marketplace';
  }

  if (tags.has('methodology-pack') || name.includes('superpowers')) {
    return 'methodology-pack';
  }

  if (tags.has('mcp-bundle')) {
    return 'mcp-bundle';
  }

  if (tags.has('authoring-tool')) {
    return 'authoring-tool';
  }

  return 'skill-runtime-docs';
}

export function validateWatchlist(watchlist) {
  const input = ensureObject(watchlist, 'skill plugin watchlist');

  if (!Array.isArray(input.sources) || input.sources.length === 0) {
    throw new Error('skill plugin watchlist.sources must be a non-empty array.');
  }

  return input.sources.map((item, index) => {
    const source = ensureObject(item, `skill plugin watchlist.sources[${index}]`);
    const id = ensureString(source.id, `skill plugin watchlist.sources[${index}].id`);

    return {
      id,
      name: ensureString(source.name, `${id}.name`),
      candidateType: normalizeCandidateType(source),
      sourceUrl: ensureHttpUrl(source.sourceUrl, `${id}.sourceUrl`),
      repoUrl: ensureOptionalHttpUrl(source.repoUrl, `${id}.repoUrl`),
      reason: ensureString(source.reason, `${id}.reason`),
      suggestedTags: ensureStringArray(source.suggestedTags, `${id}.suggestedTags`),
      confidence: source.confidence === undefined
        ? 'medium'
        : ensureEnum(source.confidence, `${id}.confidence`, CONFIDENCE_LEVELS),
    };
  });
}

export function dedupeWatchlistEntries(entries) {
  const byId = new Map();
  const duplicateErrorsById = new Map();

  entries.forEach((entry) => {
    if (!byId.has(entry.id)) {
      byId.set(entry.id, entry);
      return;
    }

    const errors = duplicateErrorsById.get(entry.id) ?? [];
    errors.push(`Duplicate watchlist entry ignored for id "${entry.id}".`);
    duplicateErrorsById.set(entry.id, errors);
  });

  return {
    entries: Array.from(byId.values()),
    duplicateErrorsById,
  };
}

async function fetchTextSnapshot(url, fetchImpl) {
  const response = await fetchImpl(url, {
    headers: {
      accept: 'text/html,application/json,text/plain;q=0.9,*/*;q=0.8',
      'user-agent': 'AICode-Nexus-SkillPluginMonitor/1.0',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const text = await response.text();
  return text.slice(0, FETCH_LIMIT_CHARS);
}

export async function inspectWatchlistEntry(entry, fetchImpl = fetch) {
  const targets = [...new Set([entry.sourceUrl, entry.repoUrl].filter(Boolean))];
  const errors = [];
  const snapshots = [];

  for (const target of targets) {
    try {
      const text = await fetchTextSnapshot(target, fetchImpl);
      snapshots.push(`${target}\n${text}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${target}: ${message}`);
    }
  }

  const fingerprintBase = snapshots.length > 0
    ? snapshots.join('\n---AICODE-NEXUS-SOURCE---\n')
    : `${entry.id}\n${entry.sourceUrl}\n${entry.repoUrl}`;

  return {
    fingerprint: hashText(fingerprintBase),
    errors,
  };
}

function resolveStatus(entryId, fingerprint, previousReport) {
  const previousFingerprint = previousReport?.fingerprints?.[entryId];

  if (!previousFingerprint) {
    return 'new';
  }

  return previousFingerprint === fingerprint ? 'watch' : 'changed';
}

export async function createCandidateReport({
  watchlist,
  date,
  checkedAt,
  previousReport = null,
  fetchImpl = fetch,
}) {
  const validatedEntries = validateWatchlist(watchlist);
  const {entries, duplicateErrorsById} = dedupeWatchlistEntries(validatedEntries);
  const candidates = [];
  const fingerprints = {};

  for (const entry of entries) {
    const inspection = await inspectWatchlistEntry(entry, fetchImpl);
    const errors = [
      ...(duplicateErrorsById.get(entry.id) ?? []),
      ...inspection.errors,
    ];
    const status = resolveStatus(entry.id, inspection.fingerprint, previousReport);

    fingerprints[entry.id] = inspection.fingerprint;
    candidates.push({
      id: entry.id,
      name: entry.name,
      candidateType: entry.candidateType,
      sourceUrl: entry.sourceUrl,
      repoUrl: entry.repoUrl,
      reason: entry.reason,
      evidenceDate: date,
      suggestedTags: entry.suggestedTags,
      confidence: entry.confidence,
      status,
      errors,
    });
  }

  return {
    date,
    checkedAt,
    sourceCount: entries.length,
    candidates,
    fingerprints,
  };
}

async function loadLatestPreviousReport(date) {
  if (!(await fileExists(SKILL_PLUGIN_DIR))) {
    return null;
  }

  const files = await readdir(SKILL_PLUGIN_DIR);
  const reportFile = files
    .filter((fileName) => fileName.endsWith(REPORT_SUFFIX))
    .filter((fileName) => fileName.slice(0, 10) < date)
    .sort()
    .at(-1);

  if (!reportFile) {
    return null;
  }

  return readJson(path.join(SKILL_PLUGIN_DIR, reportFile));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());
  const checkedAt = new Date().toISOString();
  const watchlist = await readJson(WATCHLIST_PATH);
  const previousReport = await loadLatestPreviousReport(date);
  const report = await createCandidateReport({
    watchlist,
    date,
    checkedAt,
    previousReport,
  });
  const outputPath = path.join(SKILL_PLUGIN_DIR, `${date}${REPORT_SUFFIX}`);

  await writeTextFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

  const changedCount = report.candidates.filter((candidate) => candidate.status === 'changed').length;
  const newCount = report.candidates.filter((candidate) => candidate.status === 'new').length;
  const errorCount = report.candidates.filter((candidate) => candidate.errors.length > 0).length;

  console.log(`Skill/plugin candidate report: ${path.relative(workspaceRoot, outputPath)}`);
  console.log(`Sources: ${report.sourceCount}, New: ${newCount}, Changed: ${changedCount}, With errors: ${errorCount}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
