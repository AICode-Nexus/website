function decodeHtmlEntities(value) {
  return String(value ?? '')
    .replace(/&quot;/gu, '"')
    .replace(/&#39;/gu, "'")
    .replace(/&amp;/gu, '&')
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>');
}

export const PROXY_ENV_KEYS = [
  'http_proxy',
  'https_proxy',
  'all_proxy',
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'ALL_PROXY',
];

function isLoopbackProxyUrl(value) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(String(value));
    return ['127.0.0.1', 'localhost', '::1', '[::1]'].includes(url.hostname);
  } catch {
    return false;
  }
}

export function stripLoopbackProxyEnv(env = process.env) {
  const nextEnv = {...env};
  const clearedKeys = [];

  for (const key of PROXY_ENV_KEYS) {
    if (isLoopbackProxyUrl(nextEnv[key])) {
      delete nextEnv[key];
      clearedKeys.push(key);
    }
  }

  return {
    env: nextEnv,
    clearedKeys,
  };
}

function stripHtml(value) {
  return decodeHtmlEntities(String(value ?? ''))
    .replace(/<[^>]+>/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function normalizeIssue(record, source) {
  const labels = record.labels?.edges
    ? record.labels.edges.map((edge) => edge?.node?.name).filter(Boolean)
    : (record.labels ?? []).map((label) => label?.name ?? label).filter(Boolean);

  return {
    number: record.number,
    title: stripHtml(record.titleHtml || record.title),
    state: record.state,
    url:
      record.url ||
      (record.repository?.owner?.login && record.repository?.name
        ? `https://github.com/${record.repository.owner.login}/${record.repository.name}/issues/${record.number}`
        : null),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    closedAt: record.closedAt ?? null,
    body: stripHtml(record.body ?? ''),
    author: record.author?.login ?? null,
    labels,
    issueType: record.issueType?.name ?? null,
    source,
  };
}

export function buildIssueSearchQuery(startIsoDate) {
  return `is:issue sort:updated-desc updated:>=${startIsoDate}`;
}

export function detectChangeTypes(issue, windowStartIso, windowEndIso) {
  const windowStart = Date.parse(windowStartIso);
  const windowEnd = Date.parse(windowEndIso);
  const createdAt = Date.parse(issue.createdAt);
  const updatedAt = Date.parse(issue.updatedAt);
  const closedAt = issue.closedAt ? Date.parse(issue.closedAt) : Number.NaN;
  const changeTypes = [];

  if (createdAt >= windowStart && createdAt <= windowEnd) {
    changeTypes.push('created');
  }

  if (Number.isFinite(closedAt) && closedAt >= windowStart && closedAt <= windowEnd) {
    changeTypes.push('closed');
  }

  if (
    updatedAt >= windowStart &&
    updatedAt <= windowEnd &&
    updatedAt !== createdAt &&
    !changeTypes.includes('closed')
  ) {
    changeTypes.push(issue.state === 'OPEN' ? 'updated' : 'updated-while-closed');
  }

  return changeTypes;
}

export function filterIssuesInWindow(issues, windowStartIso, windowEndIso) {
  const windowStart = Date.parse(windowStartIso);
  const windowEnd = Date.parse(windowEndIso);

  return issues
    .map((issue) => ({
      ...issue,
      changeTypes: detectChangeTypes(issue, windowStartIso, windowEndIso),
    }))
    .filter((issue) => {
      const createdAt = Date.parse(issue.createdAt);
      const updatedAt = Date.parse(issue.updatedAt);
      const closedAt = issue.closedAt ? Date.parse(issue.closedAt) : Number.NaN;
      return (
        (createdAt >= windowStart && createdAt <= windowEnd) ||
        (updatedAt >= windowStart && updatedAt <= windowEnd) ||
        (Number.isFinite(closedAt) && closedAt >= windowStart && closedAt <= windowEnd)
      );
    });
}

export function extractIssuesFromGitHubIssuesHtml(html) {
  const embeddedJsonMatch = html.match(
    /<script type="application\/json" data-target="react-app\.embeddedData">([\s\S]*?)<\/script>/u,
  );

  if (!embeddedJsonMatch) {
    throw new Error('GitHub issues HTML 中缺少 react-app.embeddedData，无法解析 issue 列表。');
  }

  const embeddedData = JSON.parse(embeddedJsonMatch[1]);
  const edges =
    embeddedData?.payload?.preloadedQueries?.[0]?.result?.data?.repository?.search?.edges ?? [];

  return edges
    .map((edge) => edge?.node)
    .filter((node) => node?.__typename === 'Issue')
    .map((node) => normalizeIssue(node, 'github-html'));
}

export function parseGhIssueList(stdout) {
  const records = JSON.parse(stdout);
  return records.map((record) => normalizeIssue(record, 'gh'));
}
