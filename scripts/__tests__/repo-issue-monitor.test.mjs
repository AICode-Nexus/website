import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectChangeTypes,
  extractIssuesFromGitHubIssuesHtml,
  filterIssuesInWindow,
} from '../content/lib/repo-issue-monitor.mjs';

test('extractIssuesFromGitHubIssuesHtml parses embedded issue JSON from public GitHub HTML', () => {
  const html = `
    <html>
      <body>
        <script type="application/json" data-target="react-app.embeddedData">
          {"payload":{"preloadedQueries":[{"result":{"data":{"repository":{"search":{"edges":[{"node":{"__typename":"Issue","number":1,"title":"plawright","state":"OPEN","url":"https://github.com/AICode-Nexus/website/issues/1","createdAt":"2026-03-23T08:40:40Z","updatedAt":"2026-03-23T08:40:57Z","closedAt":null,"author":{"login":"trsoliu"},"labels":{"edges":[]}}}]}}}}}]}}
        </script>
      </body>
    </html>
  `;

  const issues = extractIssuesFromGitHubIssuesHtml(html);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].number, 1);
  assert.equal(issues[0].title, 'plawright');
  assert.equal(issues[0].state, 'OPEN');
  assert.equal(issues[0].source, 'github-html');
});

test('detectChangeTypes marks newly created issues inside the observation window', () => {
  const issue = {
    createdAt: '2026-03-23T08:40:40Z',
    updatedAt: '2026-03-23T08:40:57Z',
    closedAt: null,
    state: 'OPEN',
  };

  const changeTypes = detectChangeTypes(
    issue,
    '2026-03-22T08:40:00Z',
    '2026-03-23T09:00:00Z',
  );

  assert.deepEqual(changeTypes, ['created', 'updated']);
});

test('filterIssuesInWindow excludes issues outside the observation window', () => {
  const issues = [
    {
      number: 1,
      title: 'inside',
      createdAt: '2026-03-23T08:40:40Z',
      updatedAt: '2026-03-23T08:40:57Z',
      closedAt: null,
      state: 'OPEN',
    },
    {
      number: 2,
      title: 'outside',
      createdAt: '2026-03-20T08:40:40Z',
      updatedAt: '2026-03-20T08:40:57Z',
      closedAt: null,
      state: 'OPEN',
    },
  ];

  const filtered = filterIssuesInWindow(
    issues,
    '2026-03-22T08:40:00Z',
    '2026-03-23T09:00:00Z',
  );

  assert.deepEqual(filtered.map((issue) => issue.number), [1]);
});
