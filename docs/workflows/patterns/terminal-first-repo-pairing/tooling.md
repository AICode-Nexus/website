---
title: "Terminal-First Repo Pairing Tooling"
description: "为终端主入口工作流选择默认工具组合：谁负责执行，谁负责补平台或长任务。"
slug: "/workflows/patterns/terminal-first-repo-pairing/tooling"
sidebar_label: "工具组合"
sidebar_position: 5
tags: ["ai-coding", "workflow", "terminal-first"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Terminal-First Repo Pairing Tooling

## 默认组合

| 角色 | 默认工具 | 作用 |
| --- | --- | --- |
| 终端主入口 | [Claude Code](/docs/tools/terminal-agents/claude-code) | 仓库内读代码、跑命令、保留验证证据。 |
| 长任务执行 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 补阶段推进和更长链路执行。 |
| 平台收口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 收口 issue、PR 和 review。 |

## 选择顺序

1. 先看执行发生在哪里。
2. 再看 review 发生在哪里。
3. 最后再决定是否需要平台补位。

## 组合建议

- 默认先把终端作为执行主线，不要一开始就把平台和 IDE 混进来。
- 需要长任务推进时再补 Codex。
- 需要最终平台收口时再补 GitHub Copilot。

## 下一步

- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
