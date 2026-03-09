---
audience: "mixed"
stage: "advanced"
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
title: "OpenAI Codex：规则与边界"
description: "OpenAI Codex 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/execution-stacks/openai-codex/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "openai-codex"]
---

# OpenAI Codex：规则与边界

## 规则分层

- AGENTS.md 或等价 repo 指令文件应先把权限、目录边界和验证命令讲清。
- 执行栈越强，越需要明确哪些动作必须审批、哪些可以自动继续。
- 如果 planning 来自外部框架，必须让 Codex 的任务合同能直接引用这些产物。

## 状态与记忆边界

- 适合承接任务级上下文、执行摘要和阶段性状态。
- 长期团队规则仍应回到 repo 文件，而不是只留在任务运行上下文中。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | AGENTS.md 或等价 repo 指令文件应先把权限、目录边界和验证命令讲清。 | 执行栈越强，越需要明确哪些动作必须审批、哪些可以自动继续。 |
| 状态与记忆 | 适合承接任务级上下文、执行摘要和阶段性状态。 | 长期团队规则仍应回到 repo 文件，而不是只留在任务运行上下文中。 |
| 执行边界 | 本地 CLI、云端任务、并行 agent、worktree、审批模式。 | 可与 IDE 控制面、GitHub 平台和 MCP 拓扑组合。 |
| 仓库合同 | 先写好 repo 指令和审批策略，再放开长任务执行。 | 默认使用 worktree 或隔离环境承接并行 lane，避免污染主工作区。 |

## 写进 repo

- 先写好 repo 指令和审批策略，再放开长任务执行。
- 默认使用 worktree 或隔离环境承接并行 lane，避免污染主工作区。
- 每次任务都应留下命令证据、diff 摘要和未覆盖风险。

## 团队检查

- 先定义哪些规则必须版本化留在 repo，哪些只属于 OpenAI Codex 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 先写好 repo 指令和审批策略，再放开长任务执行。

## 下一步

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：Spec Kit 提供清晰 planning，Codex 负责执行和验证。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把 worktree、plan、subagent 和 TDD 串起来时尤其合拍。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 收口 PR 与 review，Codex 负责执行层。
- [OpenAI Codex：集成、review 与治理](/docs/ecosystem/integrations/openai-codex)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [OpenAI Codex Upgrades](https://openai.com/index/codex-upgrades/)
