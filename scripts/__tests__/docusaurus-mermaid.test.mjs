import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';

const require = createRequire(import.meta.url);
const config = require('../../docusaurus.config.js');
const customCss = readFileSync(new URL('../../src/css/custom.css', import.meta.url), 'utf8');

test('docusaurus config enables mermaid markdown rendering', () => {
  assert.equal(
    config.markdown?.mermaid,
    true,
    'Expected docusaurus.config.js to enable markdown.mermaid for Mermaid code fences.',
  );
});

test('docusaurus registers the mermaid theme package', () => {
  assert.ok(Array.isArray(config.themes), 'Expected docusaurus.config.js to define config.themes.');
  assert.ok(
    config.themes.includes('@docusaurus/theme-mermaid'),
    'Expected docusaurus.config.js to register @docusaurus/theme-mermaid.',
  );
});

test('docs mermaid labels reset paragraph line-height to avoid clipping', () => {
  assert.match(
    customCss,
    /\.docusaurus-mermaid-container\s+\.nodeLabel\s+p[\s\S]*line-height:\s*1\.5;/,
    'Expected Mermaid node labels to override the docs paragraph line-height so text is not clipped.',
  );
});
