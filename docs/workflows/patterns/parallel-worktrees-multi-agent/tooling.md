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

并行工作流的工具组合，不该从“哪个 agent 最会写代码”开始，而要从“谁来做 owner、谁来跑 lane、谁来做最终收口”开始。lane 一多，工具只是壳，owner 和证据链才是骨架。

## 默认组合

| 角色 | 默认工具 | 作用 | 什么时候切换 |
| --- | --- | --- | --- |
| Owner 控制面 | [VS Code Agents](/docs/tools/control-planes/vscode-agents) | 负责分 lane、看状态、收集结果。 | 如果 owner 更习惯平台收口，也可改平台层。 |
| 并行执行栈 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 适合把独立 lane 切成更长执行链。 | 只做少量高控制 lane 时，可回终端入口。 |
| 开放式补位 | [Cline](/docs/tools/terminal-agents/cline) | 适合需要额外工具权限或实验性 lane。 | 正式主线不应默认依赖开放壳层。 |

## 选择顺序

1. 先确认谁做 owner，而不是先确认哪条 lane 用哪个 agent。
2. 再确认哪些 lane 可以独立验证。
3. 最后才决定每条 lane 用什么工具。

## 默认搭配建议

- 不要先选工具，再倒推 lane。
- lane 越独立，越适合给更强执行栈。
- owner 最重要的能力是合流和判断，不是和每条 lane 一起执行。
- 需要开放实验能力时，再让 [Cline](/docs/tools/terminal-agents/cline) 之类工具进入个别 lane。

## 最小落地包

- 一个 lane 拆分模板。
- 一个 owner 汇总模板，能收集每条 lane 的状态、diff 和验证。
- 一个合流顺序和冲突处理规则。
- 一套“什么时候关闭 lane、什么时候并回主线”的准则。

## 什么时候换组合

- owner 需要更强控制面时，VS Code Agents 更自然。
- lane 变成正式长任务执行时，Codex 之类执行栈更稳。
- lane 需要外部工具或实验性组合时，才让开放壳层补位。
- 如果并行本身不再成立，直接回 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling) 或 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。

## 下一步

- [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)
