---
title: "Issue / Jira -> Draft PR Tooling"
description: "为平台交接流选择默认工具组合：谁负责任务系统、谁负责仓库执行、谁负责最终 review。"
slug: "/workflows/patterns/issue-to-draft-pr/tooling"
sidebar_label: "工具组合"
sidebar_position: 5
tags: ["ai-coding", "workflow", "issue-to-pr"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Issue / Jira -> Draft PR Tooling

## 默认组合

| 角色 | 默认工具 | 作用 |
| --- | --- | --- |
| 平台入口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 把任务系统、PR 和 review 串起来。 |
| 仓库执行补位 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 适合补阶段推进和更重执行。 |
| 本地快速修补 | [Cursor](/docs/tools/ide-first/cursor) | 适合局部改动后回到 PR 流。 |

## 选择顺序

1. 先看任务系统在哪。
2. 再看改动发生在哪。
3. 最后看 review 在哪里收口。

## 组合建议

- GitHub-first 团队优先让平台承担主线。
- 需要更强执行层时，再用 Codex 补长链路推进。
- 只做局部修补时，用 Cursor 回补后再回到 PR 流。

## 下一步

- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
