import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {parseArgs} from './lib/content-utils.mjs';
import {
  buildGitHubPagesUrl,
  buildIssueReplyComment,
  buildIssueReplyMarker,
  findExistingIssueReply,
} from './lib/repo-issue-reply.mjs';

const execFileAsync = promisify(execFile);

function toShanghaiDisplay(value) {
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatter.format(value).replace(' ', ' ') + ' +08:00';
}

async function ghJson(args) {
  const {stdout} = await execFileAsync('gh', args);
  return JSON.parse(stdout);
}

async function ghRun(args) {
  await execFileAsync('gh', args);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repo = args.repo || 'AICode-Nexus/website';
  const issueNumber = Number.parseInt(args.issue || args.number, 10);
  const targetUrl = buildGitHubPagesUrl(repo, args.url || args.route);
  const marker = buildIssueReplyMarker({issueNumber, targetUrl});
  const commentBody = buildIssueReplyComment({
    issueNumber,
    title: args.title,
    contentType: args['content-type'],
    publishedAt: args['published-at'] || toShanghaiDisplay(new Date()),
    summary: args.summary,
    targetUrl,
    marker,
  });

  if (!Number.isInteger(issueNumber) || issueNumber <= 0) {
    throw new Error('Missing or invalid --issue value.');
  }

  if (args['dry-run']) {
    console.log(commentBody);
    return;
  }

  const issue = await ghJson(['issue', 'view', String(issueNumber), '--repo', repo, '--json', 'comments']);
  const existing = findExistingIssueReply(issue.comments, marker);

  if (existing) {
    console.log(`Issue #${issueNumber} already has a Codex reply for ${targetUrl}`);
    return;
  }

  await ghRun(['issue', 'comment', String(issueNumber), '--repo', repo, '--body', commentBody]);
  console.log(`Posted reply to issue #${issueNumber}: ${targetUrl}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
