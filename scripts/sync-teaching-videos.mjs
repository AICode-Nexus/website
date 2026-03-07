import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  addDays,
  buildCatalog,
  discoverSourceCandidates,
  fetchDetailedEntries,
  getShanghaiDateString,
  normalizeDetailedRecord,
  validateCatalogContract,
} from './lib/teaching-video-pipeline.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const sourceRegistryPath = path.join(workspaceRoot, 'src/data/teachingVideoSources.json');
const taxonomyPath = path.join(workspaceRoot, 'src/data/teachingVideoTaxonomy.json');
const generatedPath = path.join(workspaceRoot, 'src/data/teachingVideos.generated.json');
const checkMode = process.argv.includes('--check');

function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Teaching video field "${fieldName}" must be a non-empty string.`);
  }

  return value.trim();
}

function ensureBoolean(value, fieldName) {
  if (typeof value !== 'boolean') {
    throw new Error(`Teaching video source field "${fieldName}" must be a boolean.`);
  }

  return value;
}

function ensureStringArray(value, fieldName) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new Error(`Teaching video source field "${fieldName}" must be an array of non-empty strings.`);
  }

  return value.map((item) => item.trim());
}

function validateSourceRegistry(sourceRegistry) {
  if (!sourceRegistry || typeof sourceRegistry !== 'object' || !Array.isArray(sourceRegistry.sources)) {
    throw new Error('Teaching video source registry must define a "sources" array.');
  }

  const ids = new Set();

  sourceRegistry.sources.forEach((source, index) => {
    const sourceId = ensureString(source?.id, `sources[${index}].id`);
    ensureString(source?.platform, `sources[${index}].platform`);
    ensureString(source?.kind, `sources[${index}].kind`);
    ensureString(source?.language, `sources[${index}].language`);
    ensureString(source?.tier, `sources[${index}].tier`);
    ensureStringArray(source?.tools, `sources[${index}].tools`);
    ensureString(source?.discoveryUrl, `sources[${index}].discoveryUrl`);
    ensureBoolean(source?.enabled, `sources[${index}].enabled`);

    if (ids.has(sourceId)) {
      throw new Error(`Teaching video source registry contains duplicate source id "${sourceId}".`);
    }

    ids.add(sourceId);
  });
}

function validateTaxonomy(taxonomy) {
  if (!taxonomy || typeof taxonomy !== 'object') {
    throw new Error('Teaching video taxonomy must be an object.');
  }

  [
    'teachingKeywords',
    'blockedKeywords',
    'summaryStopPhrases',
    'toolRules',
    'topicRules',
    'formatRules',
    'levelRules',
  ].forEach((fieldName) => {
    if (!Array.isArray(taxonomy[fieldName])) {
      throw new Error(`Teaching video taxonomy field "${fieldName}" must be an array.`);
    }
  });
}

async function loadJsonFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  return JSON.parse(content);
}

async function loadSourceRegistry() {
  const sourceRegistry = await loadJsonFile(sourceRegistryPath);
  validateSourceRegistry(sourceRegistry);
  return sourceRegistry.sources;
}

async function loadTaxonomy() {
  const taxonomy = await loadJsonFile(taxonomyPath);
  validateTaxonomy(taxonomy);
  return taxonomy;
}

function selectActiveSources(sources) {
  const enabledSources = sources.filter((source) => source.enabled);
  const domesticSources = enabledSources.filter((source) => source.platform === 'Bilibili');

  // Prefer Chinese public sources when overseas platforms are unstable.
  return domesticSources.length > 0 ? domesticSources : enabledSources;
}

function dedupeCandidates(candidates) {
  const unique = new Map();

  candidates.forEach((candidate) => {
    const key = `${candidate.sourceId}:${candidate.url}`;
    if (!unique.has(key)) {
      unique.set(key, candidate);
    }
  });

  return Array.from(unique.values());
}

async function generateCatalog() {
  const [sources, taxonomy] = await Promise.all([loadSourceRegistry(), loadTaxonomy()]);
  const enabledSources = selectActiveSources(sources);
  const generatedAt = new Date().toISOString();
  const windowEnd = getShanghaiDateString(new Date(generatedAt));
  const windowStart = addDays(windowEnd, -89);
  const discoveredCandidates = [];
  const discoveredDetailedEntries = [];

  for (const source of enabledSources) {
    try {
      const discovery = await discoverSourceCandidates(source);
      discoveredCandidates.push(...discovery.candidates);
      discoveredDetailedEntries.push(...discovery.detailedEntries);
      console.log(
        `Discovered ${discovery.detailedEntries.length} detailed entries and ${discovery.candidates.length} candidates from ${source.id} via ${discovery.strategy}.`,
      );
    } catch (error) {
      console.warn(
        `Skipping source ${source.id}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  const uniqueCandidates = dedupeCandidates(discoveredCandidates);
  const fetchedDetailedEntries =
    uniqueCandidates.length > 0 ? await fetchDetailedEntries(uniqueCandidates) : [];
  const items = [...discoveredDetailedEntries, ...fetchedDetailedEntries]
    .map((detail) => normalizeDetailedRecord(detail, taxonomy, windowStart, windowEnd, generatedAt))
    .filter(Boolean);

  const catalog = buildCatalog({
    title: 'AI Code 教学视频库',
    description:
      '聚焦近 90 天内的 AI coding 教学内容，以可播放视频数和课程数双口径组织多平台公开资源，并通过规则化分类与质量阈值维持首页入口质量。',
    sources: enabledSources,
    items,
    generatedAt,
    windowStart,
    windowEnd,
  });

  catalog.generator = {
    script: 'scripts/sync-teaching-videos.mjs',
    strategy: 'ytdlp-query-channel-playlist-pipeline',
  };

  validateCatalogContract(catalog);
  return catalog;
}

async function checkCatalog() {
  const currentContent = await readFile(generatedPath, 'utf8');
  const currentCatalog = JSON.parse(currentContent);
  validateCatalogContract(currentCatalog);
  console.log('Teaching video catalog passed freshness and contract checks.');
}

async function writeCatalog() {
  const generatedCatalog = await generateCatalog();
  const nextContent = `${JSON.stringify(generatedCatalog, null, 2)}\n`;
  await writeFile(generatedPath, nextContent, 'utf8');
  console.log(`Teaching video catalog synced to ${path.relative(workspaceRoot, generatedPath)}.`);
}

async function main() {
  if (checkMode) {
    await checkCatalog();
    return;
  }

  await writeCatalog();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
