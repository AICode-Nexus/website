import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const config = require('../../docusaurus.config.js');

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
