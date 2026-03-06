import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {fetchBilibiliVideoMetadata} from './lib/teaching-video-scraper.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const seedPath = path.join(workspaceRoot, 'src/data/teachingVideos.seed.json');
const generatedPath = path.join(workspaceRoot, 'src/data/teachingVideos.generated.json');
const checkMode = process.argv.includes('--check');

function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Teaching video seed field "${fieldName}" must be a non-empty string.`);
  }

  return value.trim();
}

function ensureStringArray(value, fieldName) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new Error(`Teaching video seed field "${fieldName}" must be an array of non-empty strings.`);
  }

  return value.map((item) => item.trim());
}

function validateSeed(seedCatalog) {
  ensureString(seedCatalog?.title, 'title');
  ensureString(seedCatalog?.description, 'description');

  if (!Array.isArray(seedCatalog?.sources) || !Array.isArray(seedCatalog?.items)) {
    throw new Error('Teaching video seed must include "sources" and "items" arrays.');
  }

  const sourceIds = new Set();

  seedCatalog.sources.forEach((source, index) => {
    const sourceId = ensureString(source?.id, `sources[${index}].id`);
    ensureString(source?.title, `sources[${index}].title`);
    ensureString(source?.description, `sources[${index}].description`);

    if (sourceIds.has(sourceId)) {
      throw new Error(`Teaching video seed contains duplicate source id "${sourceId}".`);
    }

    sourceIds.add(sourceId);
  });

  const itemIds = new Set();

  seedCatalog.items.forEach((item, index) => {
    const itemId = ensureString(item?.id, `items[${index}].id`);
    ensureString(item?.platform, `items[${index}].platform`);
    ensureString(item?.href, `items[${index}].href`);
    ensureString(item?.summary, `items[${index}].summary`);
    ensureString(item?.sourceId, `items[${index}].sourceId`);
    ensureStringArray(item?.tags, `items[${index}].tags`);

    if (!sourceIds.has(item.sourceId)) {
      throw new Error(`Teaching video seed item "${itemId}" references unknown sourceId "${item.sourceId}".`);
    }

    if (itemIds.has(itemId)) {
      throw new Error(`Teaching video seed contains duplicate item id "${itemId}".`);
    }

    itemIds.add(itemId);
  });
}

function buildGeneratedItem(seedItem, scrapedMetadata) {
  const generatedItem = {
    id: seedItem.id,
    platform: seedItem.platform,
    title: seedItem.titleOverride ?? scrapedMetadata.title,
    creator: seedItem.creatorOverride ?? scrapedMetadata.creator,
    publishedAt: seedItem.publishedAtOverride ?? scrapedMetadata.publishedAt,
    href: scrapedMetadata.href,
    tags: seedItem.tags,
    summary: seedItem.summary,
    sourceId: seedItem.sourceId,
  };

  if (seedItem.sourceNote) {
    generatedItem.sourceNote = seedItem.sourceNote;
  }

  if (scrapedMetadata.thumbnailUrl) {
    generatedItem.thumbnailUrl = scrapedMetadata.thumbnailUrl;
  }

  if (scrapedMetadata.description) {
    generatedItem.scrapedDescription = scrapedMetadata.description;
  }

  if (scrapedMetadata.keywords?.length) {
    generatedItem.keywords = scrapedMetadata.keywords;
  }

  if (scrapedMetadata.episodeCount) {
    generatedItem.episodeCount = scrapedMetadata.episodeCount;
  }

  return generatedItem;
}

async function loadSeedCatalog() {
  const seedContent = await readFile(seedPath, 'utf8');
  const seedCatalog = JSON.parse(seedContent);
  validateSeed(seedCatalog);
  return seedCatalog;
}

async function generateCatalog(existingCatalog = null) {
  const seedCatalog = await loadSeedCatalog();
  const generatedAt = existingCatalog?.generatedAt ?? new Date().toISOString();
  const generatedItems = [];

  for (const seedItem of seedCatalog.items) {
    const scrapedMetadata = await fetchBilibiliVideoMetadata(seedItem.href);
    generatedItems.push(buildGeneratedItem(seedItem, scrapedMetadata));
  }

  return {
    title: seedCatalog.title,
    description: seedCatalog.description,
    generatedAt,
    generator: {
      script: 'scripts/sync-teaching-videos.mjs',
      strategy: 'bilibili-public-video-page',
    },
    sources: seedCatalog.sources,
    items: generatedItems,
  };
}

async function main() {
  if (checkMode) {
    const currentContent = await readFile(generatedPath, 'utf8');
    const currentCatalog = JSON.parse(currentContent);
    const generatedCatalog = await generateCatalog(currentCatalog);
    const nextContent = `${JSON.stringify(generatedCatalog, null, 2)}\n`;

    if (currentContent !== nextContent) {
      throw new Error(
        'Teaching video catalog is stale. Run "npm run sync:teaching-videos" and commit the regenerated file.',
      );
    }

    console.log('Teaching video catalog is up to date.');
    return;
  }

  const generatedCatalog = await generateCatalog();
  const nextContent = `${JSON.stringify(generatedCatalog, null, 2)}\n`;
  await writeFile(generatedPath, nextContent, 'utf8');
  console.log(`Teaching video catalog synced to ${path.relative(workspaceRoot, generatedPath)}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
