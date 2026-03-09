---
title: "Parallel Worktrees / Multi-Agent Tooling"
description: "为并行 lane 选择默认工具组合：谁负责 owner，谁负责执行，谁负责最终审阅。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/tooling"
sidebar_label: "工具组合"
sidebar_position: 5
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "advanced"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Parallel Worktrees / Multi-Agent Tooling

## 默认组合

| 角色 | 默认工具 | 作用 |
| --- | --- | --- |
| Owner 控制面 | [VS Code Agents](/docs/tools/control-planes/vscode-agents) | 负责分 lane、看状态、收集结果。 |
| 并行执行栈 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 适合把独立 lane 切成更长执行链。 |
| 开放式补位 | [Cline](/docs/tools/terminal-agents/cline) | 适合需要额外工具权限或实验性 lane。 |

## 选择顺序

1. 先确认谁做 owner。
2. 再确认哪些 lane 可以独立验证。
3. 最后才决定每条 lane 用什么工具。

## 组合建议

- 不要先选工具，再倒推 lane。
- lane 越独立，越适合给更强执行栈。
- owner 最重要的能力是合流和判断，不是和每条 lane 一起执行。

## 下一步

- [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)
