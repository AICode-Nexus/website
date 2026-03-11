---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "implementation"
title: "VS Code Agents：规则与边界"
description: "VS Code Agents 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/control-planes/vscode-agents/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "vscode-agents"]
---

# VS Code Agents：规则与边界

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

## 写进 repo

- 把常用验证命令、任务模板和目录边界写回仓库文件，减少 editor 特有配置漂移。
- 背景任务必须有 owner 和 handoff 规则，不能把编辑器当异步黑盒。
- 视觉验证、浏览器操作和终端验证最好有固定时机，不要混成一锅。

## 团队检查

- 先定义哪些规则必须版本化留在 repo，哪些只属于 VS Code Agents 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 把常用验证命令、任务模板和目录边界写回仓库文件，减少 editor 特有配置漂移。

## 下一步

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。
- [VS Code Agents：集成、review 与治理](/docs/ecosystem/integrations/vscode-agents)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
