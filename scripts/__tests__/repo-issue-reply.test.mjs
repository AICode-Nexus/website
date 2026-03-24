import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGitHubPagesUrl,
  buildIssueReplyComment,
  buildIssueReplyMarker,
  findExistingIssueReply,
} from '../content/lib/repo-issue-reply.mjs';

test('buildGitHubPagesUrl resolves project-site docs routes', () => {
  const url = buildGitHubPagesUrl('AICode-Nexus/website', '/docs/tools/openrouter-routing-playbook');
  assert.equal(url, 'https://AICode-Nexus.github.io/website/docs/tools/openrouter-routing-playbook');
});

test('buildGitHubPagesUrl preserves absolute URLs', () => {
  const url = buildGitHubPagesUrl('AICode-Nexus/website', 'https://example.com/custom-article');
  assert.equal(url, 'https://example.com/custom-article');
});

test('buildIssueReplyComment renders Chinese issue reply with artifact link', () => {
  const targetUrl = 'https://AICode-Nexus.github.io/website/docs/tools/openrouter-routing-playbook';
  const marker = buildIssueReplyMarker({issueNumber: 2, targetUrl});
  const comment = buildIssueReplyComment({
    issueNumber: 2,
    title: 'OpenRouter 接入与路由方案',
    contentType: '独立方案页',
    publishedAt: '2026-03-24 16:30 +08:00',
    summary: '这次补的是接入场景、边界和最小落地路径。',
    targetUrl,
    marker,
  });

  assert.match(comment, /OpenRouter 接入与路由方案/);
  assert.match(comment, /内容类型：独立方案页/);
  assert.match(comment, /地址：<https:\/\/AICode-Nexus\.github\.io\/website\/docs\/tools\/openrouter-routing-playbook>/);
  assert.match(comment, /处理时间：2026-03-24 16:30 \+08:00/);
  assert.match(comment, /如果你还希望我继续补充同一主题/);
  assert.match(comment, /codex-issue-reply/);
});

test('findExistingIssueReply detects duplicate reply by marker', () => {
  const marker = buildIssueReplyMarker({
    issueNumber: 2,
    targetUrl: 'https://AICode-Nexus.github.io/website/docs/tools/openrouter-routing-playbook',
  });
  const comments = [
    {id: '1', body: '普通评论'},
    {id: '2', body: `${marker}\n已处理。`},
  ];

  const existing = findExistingIssueReply(comments, marker);

  assert.deepEqual(existing, comments[1]);
});
