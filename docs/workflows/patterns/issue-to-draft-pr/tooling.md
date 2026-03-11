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

这条主线的工具组合核心不是“哪个最强”，而是“谁负责任务系统、谁负责仓库执行、谁负责最终 review”。平台型工作流最怕角色打架，所以工具组合必须围绕责任链设计。

## 默认组合

| 角色 | 默认工具 | 作用 | 什么时候切换 |
| --- | --- | --- | --- |
| 平台入口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 把任务系统、PR 和 review 串起来。 | 平台无法承接本地深潜时切执行补位。 |
| 仓库执行补位 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 适合补阶段推进和更重执行。 | 只做局部修补时没必要上重执行栈。 |
| 本地快速修补 | [Cursor](/docs/tools/ide-first/cursor) | 适合局部改动后回到 PR 流。 | 如果主要靠终端定位问题，改用 [Claude Code](/docs/tools/terminal-agents/claude-code)。 |

## 选择顺序

1. 先看任务系统在哪，是 GitHub、Jira 还是别的工单系统。
2. 再看改动主要发生在哪，是本地 IDE、终端还是长任务执行栈。
3. 最后看 review 在哪里收口，而不是先选一个“大家都喜欢的工具”。

## 默认搭配建议

- GitHub-first 团队优先让平台承担主线。
- 需要更强执行层时，再用 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) 补长链路推进。
- 只做局部修补时，用 [Cursor](/docs/tools/ide-first/cursor) 回补后再回到 PR 流。
- 如果终端内排查价值更高，补看 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)。

## 最小落地包

- 一个可复用的 issue / PR 模板。
- 一个默认平台入口，不要同时开三种平台流。
- 一种执行补位入口，用来承接平台解决不了的仓库工作。
- 一套 reviewer 看得懂的验证和风险说明格式。

## 什么时候换组合

- 平台负责不了本地探索时，增加终端或执行栈补位。
- reviewer 越来越看不懂 PR 时，先修任务模板，不要先换工具。
- 平台流开始承载模糊需求时，改回 [Spec-First Tooling](/docs/workflows/patterns/spec-first/tooling)。
- 如果平台不是主要协作场所，这套组合本身就不该做默认主线。

## 下一步

- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
