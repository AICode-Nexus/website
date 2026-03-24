function normalizeRoute(value) {
  if (!value) {
    return '/';
  }

  return String(value).startsWith('/') ? String(value) : `/${value}`;
}

export function buildGitHubPagesUrl(repo, routeOrUrl) {
  const value = String(routeOrUrl ?? '').trim();
  if (!value) {
    throw new Error('Missing issue reply target URL or route.');
  }

  if (/^https?:\/\//u.test(value)) {
    return value;
  }

  const [organizationName, projectName] = String(repo || 'AICode-Nexus/website').split('/');
  const isUserSite = projectName === `${organizationName}.github.io`;
  const baseUrl = isUserSite ? '' : `/${projectName}`;

  return `https://${organizationName}.github.io${baseUrl}${normalizeRoute(value)}`;
}

export function buildIssueReplyMarker({issueNumber, targetUrl}) {
  return `<!-- codex-issue-reply issue=${issueNumber} target=${targetUrl} -->`;
}

export function buildIssueReplyComment({
  issueNumber,
  title,
  contentType,
  publishedAt,
  summary,
  targetUrl,
  marker,
}) {
  if (!issueNumber) {
    throw new Error('Missing issue number for reply comment.');
  }
  if (!targetUrl) {
    throw new Error('Missing target URL for issue reply comment.');
  }

  const lines = [
    marker ?? buildIssueReplyMarker({issueNumber, targetUrl}),
    '已根据这条 issue 补充内容，并把可直接访问的入口放在下面。',
    '',
    `- 内容类型：${contentType || '内容更新'}`,
    `- 标题：${title || '未命名内容'}`,
    `- 地址：<${targetUrl}>`,
  ];

  if (publishedAt) {
    lines.push(`- 处理时间：${publishedAt}`);
  }

  if (summary) {
    lines.push(`- 说明：${summary}`);
  }

  lines.push('');
  lines.push('如果你还希望我继续补充同一主题的示例、对比或模板，可以直接在这个 issue 下面继续补充。');

  return `${lines.join('\n')}\n`;
}

export function findExistingIssueReply(comments, marker) {
  return (comments || []).find((comment) => String(comment?.body ?? '').includes(marker)) ?? null;
}
