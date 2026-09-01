import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const workspaceRoot = new URL('../..', import.meta.url);
const aiDirectorySource = readFileSync(new URL('../../src/data/aiDirectory.js', import.meta.url), 'utf8');
const logoMapSource = readFileSync(new URL('../../src/data/aiDirectoryLogos.js', import.meta.url), 'utf8');
const logoJson = JSON.parse(readFileSync(new URL('../../src/data/aiDirectoryLogoPaths.json', import.meta.url), 'utf8'));

const LOGO_EXTENSION_PATTERN = /\.(?:svg|png|webp|jpg|jpeg|ico|avif)$/u;

function extractEntryIds(source) {
  return Array.from(source.matchAll(/\bentry\(\{\s+id:\s+'([^']+)'/gu), (match) => match[1]);
}

function extractLogoMap(source) {
  return new Map(
    Array.from(source.matchAll(/'([^']+)':\s+'(\/img\/ai-directory\/logos\/[^']+)'/gu), (match) => [
      match[1],
      match[2],
    ]),
  );
}

function isRenderableImage(buffer, logoSrc) {
  if (logoSrc.endsWith('.svg')) {
    return /<svg[\s>]/iu.test(buffer.toString('utf8', 0, Math.min(buffer.length, 2048)));
  }

  if (logoSrc.endsWith('.png')) {
    return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  if (logoSrc.endsWith('.jpg') || logoSrc.endsWith('.jpeg')) {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (logoSrc.endsWith('.webp')) {
    return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
  }

  if (logoSrc.endsWith('.ico')) {
    return buffer.subarray(0, 4).toString('hex') === '00000100';
  }

  if (logoSrc.endsWith('.avif')) {
    return buffer.subarray(4, 12).toString('ascii').includes('ftypavif');
  }

  return false;
}

test('all AI directory entries declare a local official logo asset', () => {
  const entryIds = extractEntryIds(aiDirectorySource);
  const logoById = extractLogoMap(logoMapSource);
  const missing = entryIds.filter((id) => !logoById.has(id));

  assert.equal(missing.length, 0, `Missing logo declarations for: ${missing.join(', ')}`);
});

test('AI directory logo JSON stays aligned with the generated logo map', () => {
  const logoById = extractLogoMap(logoMapSource);

  assert.deepEqual(
    logoJson,
    Object.fromEntries(
      Array.from(logoById.entries(), ([id, logoSrc]) => [id, logoSrc.replace(/^\//u, '')]),
    ),
  );
});

test('AI directory logo declarations point to existing image files', () => {
  const logoById = extractLogoMap(logoMapSource);
  const missingAssets = [];
  const invalidAssets = [];

  for (const [id, logoSrc] of logoById.entries()) {
    assert.match(logoSrc, LOGO_EXTENSION_PATTERN, `${id} logo must use a supported image extension.`);

    const assetPath = join(workspaceRoot.pathname, 'static', logoSrc.replace(/^\//u, ''));
    if (!existsSync(assetPath)) {
      missingAssets.push(`${id}: ${logoSrc}`);
      continue;
    }

    const buffer = readFileSync(assetPath);
    if (!isRenderableImage(buffer, logoSrc)) {
      invalidAssets.push(`${id}: ${logoSrc}`);
    }
  }

  assert.equal(missingAssets.length, 0, `Missing logo asset files:\n${missingAssets.join('\n')}`);
  assert.equal(invalidAssets.length, 0, `Invalid logo asset files:\n${invalidAssets.join('\n')}`);
});
