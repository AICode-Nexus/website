import {mkdir, readFile, rm, stat, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';

const workspaceRoot = new URL('../..', import.meta.url).pathname;
const dataPath = path.join(workspaceRoot, 'src/data/aiDirectory.js');
const logoMapPath = path.join(workspaceRoot, 'src/data/aiDirectoryLogos.js');
const logoJsonPath = path.join(workspaceRoot, 'src/data/aiDirectoryLogoPaths.json');
const logoAssetDir = path.join(workspaceRoot, 'static/img/ai-directory/logos');
const supportedExtensions = new Set(['.svg', '.png', '.webp', '.jpg', '.jpeg', '.ico', '.avif']);
const requestHeaders = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
};
const additionalIconCandidatesById = {
  'maze-ai': ['https://www.datocms-assets.com/38511/1762960626-image.png?w=180&h=180'],
};

function extractEntries(source) {
  const blocks = source.match(/\bentry\(\{[\s\S]*?\n    \}\),/gu) ?? [];

  return blocks.map((block) => {
    const getString = (fieldName) => {
      const match = block.match(new RegExp(`\\b${fieldName}:\\s+'([^']+)'`, 'u'));
      return match?.[1] ?? '';
    };

    return {
      id: getString('id'),
      name: getString('name'),
      officialUrl: getString('officialUrl'),
      docsUrl: getString('docsUrl'),
      repoUrl: getString('repoUrl'),
    };
  }).filter((entry) => entry.id && entry.name);
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'iu'));
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? '';
}

function scoreIconLink(tag) {
  const rel = getAttribute(tag, 'rel').toLowerCase();
  const sizes = getAttribute(tag, 'sizes');
  const largestSize = Math.max(0, ...Array.from(sizes.matchAll(/\d+/gu), (match) => Number(match[0])));

  if (rel.includes('apple-touch-icon')) {
    return 1000 + largestSize;
  }

  if (rel.includes('mask-icon')) {
    return 850 + largestSize;
  }

  if (rel.includes('icon')) {
    return 700 + largestSize;
  }

  return 0;
}

function extractImageCandidates(html, pageUrl) {
  const candidates = [];

  for (const match of html.matchAll(/<link\b[^>]*>/giu)) {
    const tag = match[0];
    const href = getAttribute(tag, 'href');
    const score = scoreIconLink(tag);

    if (!href || href.startsWith('data:') || score === 0) {
      continue;
    }

    candidates.push({url: new URL(href, pageUrl).href, score});
  }

  for (const match of html.matchAll(/<meta\b[^>]*>/giu)) {
    const tag = match[0];
    const property = `${getAttribute(tag, 'property')} ${getAttribute(tag, 'name')}`.toLowerCase();
    const content = getAttribute(tag, 'content');

    if (!content || content.startsWith('data:')) {
      continue;
    }

    if (property.includes('og:image') || property.includes('twitter:image')) {
      candidates.push({url: new URL(content, pageUrl).href, score: 200});
    }
  }

  return candidates.sort((left, right) => right.score - left.score).map((candidate) => candidate.url);
}

function getGithubOwnerAvatar(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'github.com') {
      return '';
    }

    const [owner] = parsedUrl.pathname.split('/').filter(Boolean);
    return owner ? `https://github.com/${owner}.png?size=256` : '';
  } catch {
    return '';
  }
}

function getFallbackCandidates(url) {
  try {
    const parsedUrl = new URL(url);
    const origin = parsedUrl.origin;
    const hostname = parsedUrl.hostname.replace(/^www\./u, '');

    return [
      `${origin}/apple-touch-icon.png`,
      `${origin}/favicon.ico`,
      `https://icon.horse/icon/${hostname}`,
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(parsedUrl.hostname)}&sz=256`,
    ];
  } catch {
    return [];
  }
}

async function fetchWithTimeout(url, responseType = 'arrayBuffer') {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      headers: requestHeaders,
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    if (responseType === 'text') {
      return {
        contentType: response.headers.get('content-type') ?? '',
        body: await response.text(),
      };
    }

    return {
      contentType: response.headers.get('content-type') ?? '',
      body: Buffer.from(await response.arrayBuffer()),
    };
  } finally {
    clearTimeout(timeout);
  }
}

function inferExtension(url, contentType, buffer) {
  const normalizedType = contentType.toLowerCase();
  const textStart = buffer.subarray(0, 256).toString('utf8').trimStart();

  if (textStart.startsWith('<svg') || textStart.startsWith('<?xml')) {
    return '.svg';
  }

  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return '.png';
  }

  if (buffer.subarray(0, 4).toString('hex') === '00000100') {
    return '.ico';
  }

  if (buffer.subarray(0, 12).toString('ascii').includes('WEBP')) {
    return '.webp';
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return '.jpg';
  }

  if (buffer.subarray(4, 12).toString('ascii').includes('ftypavif')) {
    return '.avif';
  }

  if (normalizedType.includes('svg')) {
    return '.svg';
  }
  if (normalizedType.includes('png')) {
    return '.png';
  }
  if (normalizedType.includes('webp')) {
    return '.webp';
  }
  if (normalizedType.includes('jpeg') || normalizedType.includes('jpg')) {
    return '.jpg';
  }
  if (normalizedType.includes('icon') || normalizedType.includes('ico')) {
    return '.ico';
  }
  if (normalizedType.includes('avif')) {
    return '.avif';
  }

  const extension = path.extname(new URL(url).pathname).toLowerCase();
  if (supportedExtensions.has(extension)) {
    return extension;
  }

  return '';
}

function isUsableImage(buffer, extension) {
  if (!buffer || buffer.length < 32 || !extension) {
    return false;
  }

  if (extension === '.svg') {
    return /<svg[\s>]/iu.test(buffer.toString('utf8', 0, Math.min(buffer.length, 2048)));
  }

  if (extension === '.png') {
    return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  if (extension === '.jpg' || extension === '.jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (extension === '.webp') {
    return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
  }

  if (extension === '.ico') {
    return buffer.subarray(0, 4).toString('hex') === '00000100';
  }

  if (extension === '.avif') {
    return buffer.subarray(4, 12).toString('ascii').includes('ftypavif');
  }

  return false;
}

async function collectCandidates(entry) {
  const seedUrls = [entry.officialUrl, entry.docsUrl, entry.repoUrl].filter(Boolean);
  const candidates = [...(additionalIconCandidatesById[entry.id] ?? [])];

  for (const seedUrl of seedUrls) {
    const githubAvatar = getGithubOwnerAvatar(seedUrl);
    if (githubAvatar) {
      candidates.push(githubAvatar);
    }

    candidates.push(...getFallbackCandidates(seedUrl));

    try {
      const {contentType, body} = await fetchWithTimeout(seedUrl, 'text');
      if (contentType.toLowerCase().includes('html')) {
        candidates.push(...extractImageCandidates(body, seedUrl));
      }
    } catch {
      // Keep going with deterministic fallback candidates.
    }
  }

  return [...new Set(candidates)];
}

async function downloadLogo(entry) {
  const candidates = await collectCandidates(entry);

  for (const candidate of candidates) {
    try {
      const {contentType, body} = await fetchWithTimeout(candidate);
      const extension = inferExtension(candidate, contentType, body);

      if (!isUsableImage(body, extension)) {
        continue;
      }

      const assetPath = path.join(logoAssetDir, `${entry.id}${extension}`);
      await writeFile(assetPath, body);

      return {
        id: entry.id,
        src: `/img/ai-directory/logos/${entry.id}${extension}`,
        source: candidate,
      };
    } catch {
      // Try the next candidate for this entry.
    }
  }

  return {
    id: entry.id,
    src: '',
    source: '',
  };
}

async function runPool(items, worker, concurrency = 8) {
  const results = [];
  let nextIndex = 0;

  async function runNext() {
    const currentIndex = nextIndex;
    nextIndex += 1;

    if (currentIndex >= items.length) {
      return;
    }

    results[currentIndex] = await worker(items[currentIndex], currentIndex);
    await runNext();
  }

  await Promise.all(Array.from({length: Math.min(concurrency, items.length)}, () => runNext()));
  return results;
}

function formatLogoMap(results) {
  const lines = [
    '// Generated by scripts/content/sync-ai-directory-logos.mjs.',
    '// Do not edit by hand; rerun the sync script after changing src/data/aiDirectory.js.',
    '',
    'export const AI_DIRECTORY_LOGO_SRC_BY_ID = Object.freeze({',
  ];

  for (const result of results) {
    lines.push(`  '${result.id}': '${result.src}',`);
  }

  lines.push('});', '');
  return lines.join('\n');
}

function formatLogoJson(results) {
  const logoPaths = Object.fromEntries(
    results.map((result) => [result.id, result.src.replace(/^\//u, '')]),
  );

  return `${JSON.stringify(logoPaths, null, 2)}\n`;
}

async function main() {
  await mkdir(logoAssetDir, {recursive: true});

  const source = await readFile(dataPath, 'utf8');
  const entries = extractEntries(source);
  const results = await runPool(entries, async (entry, index) => {
    for (const extension of supportedExtensions) {
      const existingPath = path.join(logoAssetDir, `${entry.id}${extension}`);
      if (existsSync(existingPath)) {
        const existingBuffer = await readFile(existingPath);
        if (isUsableImage(existingBuffer, extension)) {
          return {
            id: entry.id,
            src: `/img/ai-directory/logos/${entry.id}${extension}`,
            source: 'existing-local-file',
          };
        }

        await rm(existingPath);
      }
    }

    const result = await downloadLogo(entry);
    const label = result.src ? 'ok' : 'missing';
    console.log(`[${index + 1}/${entries.length}] ${label} ${entry.id} ${result.source}`);
    return result;
  });

  const missing = results.filter((result) => !result.src);
  await writeFile(logoMapPath, formatLogoMap(results), 'utf8');
  await writeFile(logoJsonPath, formatLogoJson(results), 'utf8');

  if (missing.length > 0) {
    throw new Error(`Could not resolve logos for: ${missing.map((result) => result.id).join(', ')}`);
  }

  const generatedStat = await stat(logoMapPath);
  console.log(`Generated ${path.relative(workspaceRoot, logoMapPath)} (${generatedStat.size} bytes).`);
  const generatedJsonStat = await stat(logoJsonPath);
  console.log(`Generated ${path.relative(workspaceRoot, logoJsonPath)} (${generatedJsonStat.size} bytes).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
