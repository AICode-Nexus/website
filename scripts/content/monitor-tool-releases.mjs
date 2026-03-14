import path from 'node:path';
import {
  fileExists,
  formatIsoDate,
  parseArgs,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';

const RELEASES_DIR = path.join(workspaceRoot, 'content-sources', 'tool-updates');
const GITHUB_API = 'https://api.github.com';

// Tools with GitHub repos to monitor for releases
const MONITORED_TOOLS = [
  {id: 'cursor', repo: 'getcursor/cursor', title: 'Cursor'},
  {id: 'continue', repo: 'continuedev/continue', title: 'Continue'},
  {id: 'aider', repo: 'Aider-AI/aider', title: 'Aider'},
  {id: 'cline', repo: 'cline/cline', title: 'Cline'},
  {id: 'copilot-cli', repo: 'github/copilot-cli', title: 'Copilot CLI'},
  {id: 'openai-codex', repo: 'openai/codex', title: 'OpenAI Codex CLI'},
  {id: 'claude-code', repo: 'anthropics/claude-code', title: 'Claude Code'},
];

async function fetchLatestRelease(repo) {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'AICode-Nexus-Monitor/1.0',
  };
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(`${GITHUB_API}/repos/${repo}/releases/latest`, {headers});

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`GitHub API error for ${repo}: ${response.status}`);
  }

  const data = await response.json();
  return {
    tagName: data.tag_name,
    name: data.name,
    publishedAt: data.published_at,
    htmlUrl: data.html_url,
    body: (data.body || '').slice(0, 500),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  const {mkdir} = await import('node:fs/promises');
  await mkdir(RELEASES_DIR, {recursive: true});

  console.log(`Checking releases for ${MONITORED_TOOLS.length} tools...`);

  const results = await Promise.allSettled(
    MONITORED_TOOLS.map(async (tool) => {
      const release = await fetchLatestRelease(tool.repo);
      return {...tool, release};
    }),
  );

  const updates = [];
  const errors = [];

  results.forEach((result, index) => {
    const tool = MONITORED_TOOLS[index];
    if (result.status === 'fulfilled' && result.value.release) {
      updates.push(result.value);
    } else if (result.status === 'rejected') {
      errors.push({id: tool.id, error: result.reason?.message});
    }
  });

  const report = {
    date,
    checkedAt: new Date().toISOString(),
    updates: updates.map((u) => ({
      id: u.id,
      title: u.title,
      repo: u.repo,
      latestVersion: u.release.tagName,
      releaseName: u.release.name,
      publishedAt: u.release.publishedAt,
      url: u.release.htmlUrl,
      summary: u.release.body,
    })),
    errors,
  };

  const outputPath = path.join(RELEASES_DIR, `${date}-releases.json`);
  await writeTextFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Release report: ${path.relative(workspaceRoot, outputPath)}`);
  console.log(`Tools with releases: ${updates.length}, Errors: ${errors.length}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
