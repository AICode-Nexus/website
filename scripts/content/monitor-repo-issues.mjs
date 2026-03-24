import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {
  formatIsoDate,
  parseArgs,
  workspaceRoot,
  writeTextFile,
} from './lib/content-utils.mjs';
import {
  buildIssueSearchQuery,
  extractIssuesFromGitHubIssuesHtml,
  filterIssuesInWindow,
  parseGhIssueList,
  PROXY_ENV_KEYS,
  stripLoopbackProxyEnv,
} from './lib/repo-issue-monitor.mjs';

const execFileAsync = promisify(execFile);

function toShanghaiIso(value) {
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formatter.format(value).replace(' ', 'T') + '+08:00';
}

async function fetchIssuesViaGh(repo, startDateIso, env = process.env) {
  const fields = [
    'number',
    'title',
    'state',
    'createdAt',
    'updatedAt',
    'closedAt',
    'url',
    'body',
    'author',
    'labels',
  ];
  const {stdout} = await execFileAsync(
    'gh',
    [
      'issue',
      'list',
      '--repo',
      repo,
      '--state',
      'all',
      '--limit',
      '100',
      '--search',
      buildIssueSearchQuery(startDateIso),
      '--json',
      fields.join(','),
    ],
    {env},
  );

  return parseGhIssueList(stdout);
}

async function withScopedProxyEnv(env, callback) {
  const previousValues = new Map(PROXY_ENV_KEYS.map((key) => [key, process.env[key]]));

  for (const key of PROXY_ENV_KEYS) {
    if (env[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = env[key];
    }
  }

  try {
    return await callback();
  } finally {
    for (const [key, value] of previousValues.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

async function fetchIssuesViaPublicHtml(repo, startDateIso, env = process.env) {
  const searchParams = new URLSearchParams({
    q: buildIssueSearchQuery(startDateIso),
  });
  const url = `https://github.com/${repo}/issues?${searchParams.toString()}`;
  const response = await withScopedProxyEnv(env, () =>
    fetch(url, {
      headers: {
        'user-agent': 'AICode-Nexus-RepoIssueMonitor/1.0',
        accept: 'text/html,application/xhtml+xml',
      },
    }),
  );

  if (!response.ok) {
    throw new Error(`GitHub issues HTML 返回 ${response.status}`);
  }

  return {
    url,
    issues: extractIssuesFromGitHubIssuesHtml(await response.text()),
  };
}

function classifyMaterialChanges(issues) {
  return issues
    .filter((issue) => issue.changeTypes.includes('created') || issue.changeTypes.includes('updated'))
    .map((issue) => {
      const lowerBody = issue.body.toLowerCase();
      const lowerTitle = issue.title.toLowerCase();
      const touchesPlaywright = lowerTitle.includes('playwright') || lowerBody.includes('playwright');
      return {
        number: issue.number,
        title: issue.title,
        url: issue.url,
        changeTypes: issue.changeTypes,
        whyItMatters: touchesPlaywright
          ? '这条 issue 直接提出了 Playwright 自动化测试方案需求，属于可回流为测试/交付内容入口的高信号。'
          : '这条 issue 在观察窗口内发生了可见变化，需要人工判断是否值得沉淀为内容。',
      };
    });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const now = args.date ? new Date(`${args.date}T16:00:00+08:00`) : new Date();
  const repo = args.repo || 'AICode-Nexus/website';
  const windowHours = Number.parseInt(args.hours || '24', 10);
  const end = now;
  const start = new Date(end.getTime() - windowHours * 60 * 60 * 1000);
  const date = formatIsoDate(end);
  const outputPath =
    args.output ||
    path.join(workspaceRoot, 'content-sources', 'issues', `${date}-repo-issue-monitor.json`);

  const accessAttempts = [];
  let issues = [];
  const sourceUrls = [];
  let status = 'ok';
  const sanitizedProxy = stripLoopbackProxyEnv(process.env);
  const canRetryWithoutLoopbackProxy = sanitizedProxy.clearedKeys.length > 0;

  try {
    issues = await fetchIssuesViaGh(repo, formatIsoDate(start));
    accessAttempts.push({
      method: 'gh issue list',
      result: 'success',
      observedAt: toShanghaiIso(new Date()),
      details: '直接调用 `gh issue list` 成功返回 issue 列表，未把 `gh auth status` 作为前置门槛。',
    });
  } catch (error) {
    accessAttempts.push({
      method: 'gh issue list',
      result: 'failed',
      observedAt: toShanghaiIso(new Date()),
      details: error instanceof Error ? error.message : String(error),
    });

    if (canRetryWithoutLoopbackProxy) {
      try {
        issues = await fetchIssuesViaGh(repo, formatIsoDate(start), sanitizedProxy.env);
        accessAttempts.push({
          method: 'gh issue list',
          result: 'success',
          observedAt: toShanghaiIso(new Date()),
          details: `检测到本地回环代理配置，已清除 ${sanitizedProxy.clearedKeys.join(', ')} 后重试成功。`,
        });
      } catch (retryError) {
        accessAttempts.push({
          method: 'gh issue list',
          result: 'failed',
          observedAt: toShanghaiIso(new Date()),
          details: `检测到本地回环代理配置，已清除 ${sanitizedProxy.clearedKeys.join(', ')} 后重试，但仍失败：${
            retryError instanceof Error ? retryError.message : String(retryError)
          }`,
        });
      }
    }

    if (!issues.length) {
      try {
        const htmlResult = await fetchIssuesViaPublicHtml(
          repo,
          formatIsoDate(start),
          canRetryWithoutLoopbackProxy ? sanitizedProxy.env : process.env,
        );
        issues = htmlResult.issues;
        sourceUrls.push(htmlResult.url);
        accessAttempts.push({
          method: 'GitHub public issues HTML',
          result: 'success',
          observedAt: toShanghaiIso(new Date()),
          details: canRetryWithoutLoopbackProxy
            ? `公开 issues 搜索页在清除本地回环代理 ${sanitizedProxy.clearedKeys.join(', ')} 后返回成功，并从内嵌结构化 JSON 中解析出 issue 列表。`
            : '公开 issues 搜索页成功返回，并从内嵌结构化 JSON 中解析出 issue 列表。',
        });
        status = 'html-fallback';
      } catch (htmlError) {
        accessAttempts.push({
          method: 'GitHub public issues HTML',
          result: 'failed',
          observedAt: toShanghaiIso(new Date()),
          details: htmlError instanceof Error ? htmlError.message : String(htmlError),
        });
        status = 'capture-failed';
      }
    }
  }

  const windowedIssues = filterIssuesInWindow(issues, start.toISOString(), end.toISOString());
  const materialChanges = classifyMaterialChanges(windowedIssues);

  if (!sourceUrls.length) {
    sourceUrls.push(
      `https://github.com/${repo}/issues?q=${encodeURIComponent(buildIssueSearchQuery(formatIsoDate(start)))}`,
    );
  }

  const report = {
    date,
    repo,
    generatedAt: toShanghaiIso(new Date()),
    window: {
      start: toShanghaiIso(start),
      end: toShanghaiIso(end),
    },
    language: 'zh-CN',
    status,
    summary:
      status === 'capture-failed'
        ? '本轮未能完成 GitHub issue 采集校验，因此无法确认过去 24 小时内是否存在新建、关闭、重开或实质更新的 issue；这不等于没有变化。'
        : windowedIssues.length > 0
        ? `在观察窗口内验证到 ${windowedIssues.length} 条 issue 变化。`
        : '在观察窗口内未验证到符合条件的 issue 变化。',
    observations: {
      verifiedIssueChanges: windowedIssues,
      accessAttempts,
      sourceUrls,
    },
    materialChanges,
  };

  await writeTextFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Repo issue report written to ${path.relative(workspaceRoot, outputPath)}`);
  console.log(`Verified issue changes: ${windowedIssues.length}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
