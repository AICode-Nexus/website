---
title: "VS Code Agents：规则、记忆与工具边界"
description: "VS Code Agents 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/control-planes/vscode-agents/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "vscode-agents"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# VS Code Agents：规则、记忆与工具边界

一旦一个入口开始支持 rules、memory、background task 或 MCP，它就不再只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，会直接决定这个入口是否能长期留在标准栈里。

## 规则分层

- 编辑器级工作区配置应与 repo 规则相互对照，而不是成为第二套事实来源。
- 当团队启用 custom agents 或 reusable prompts 时，仍要明确职责归属。
- 本地与后台 agent 共享的任务合同最好回写到仓库或工单，而不是只留在会话里。

## 状态与记忆边界

- 编辑器会保留会话上下文和 background task 状态，但 repo 级长期规则仍应版本化。
- 适合承载“当前任务”与“当前工作区”的短中期状态。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | 编辑器级工作区配置应与 repo 规则相互对照，而不是成为第二套事实来源。 | 当团队启用 custom agents 或 reusable prompts 时，仍要明确职责归属。 |
| 状态与记忆 | 编辑器会保留会话上下文和 background task 状态，但 repo 级长期规则仍应版本化。 | 适合承载“当前任务”与“当前工作区”的短中期状态。 |
| 执行边界 | 编辑器内代码理解、diff、终端和 background agents 是主要优势。 | 第三方 agents 与扩展机制让它更像控制面，而不是单一 vendor agent。 |
| 仓库合同 | 把常用验证命令、任务模板和目录边界写回仓库文件，减少 editor 特有配置漂移。 | 背景任务必须有 owner 和 handoff 规则，不能把编辑器当异步黑盒。 |

## 仓库接入建议

- 把常用验证命令、任务模板和目录边界写回仓库文件，减少 editor 特有配置漂移。
- 背景任务必须有 owner 和 handoff 规则，不能把编辑器当异步黑盒。
- 视觉验证、浏览器操作和终端验证最好有固定时机，不要混成一锅。

如果你已经在 repo 里有 AGENTS.md、目录边界、验证命令和 review checklist，那么 VS Code Agents 更应该做的是补足入口体验，而不是再造第二套事实来源。

## 团队检查清单

- 先定义哪些规则必须版本化留在 repo，哪些只属于 VS Code Agents 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 把常用验证命令、任务模板和目录边界写回仓库文件，减少 editor 特有配置漂移。

## 下一步怎么读

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。
- [Cursor](/docs/tools/ide-first/cursor)：如果你想把 editor-first 体验做得更深、更产品化。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：这是 VS Code Agents 最自然的主线。
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：本地修复与后台补跑结合得比较顺。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
