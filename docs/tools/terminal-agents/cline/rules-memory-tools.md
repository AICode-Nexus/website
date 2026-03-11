---
audience: "advanced"
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
title: "Cline：规则与边界"
description: "Cline 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/terminal-agents/cline/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "cline"]
---

# Cline：规则与边界

## 规则分层

- 开放性越强，越需要你自己定义 repo contract、权限边界和停止条件。
- 最好把关键规则收回仓库文件，避免全靠客户端配置。
- 对同一个团队，不宜让每个人都维护完全不同的规则集。

## 状态与记忆边界

- checkpoint、会话状态和工具配置是主要状态层。
- 更适合实验和高度可组合场景，不天然提供统一组织记忆层。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | 开放性越强，越需要你自己定义 repo contract、权限边界和停止条件。 | 最好把关键规则收回仓库文件，避免全靠客户端配置。 |
| 状态与记忆 | checkpoint、会话状态和工具配置是主要状态层。 | 更适合实验和高度可组合场景，不天然提供统一组织记忆层。 |
| 执行边界 | Plan / Act、browser automation、MCP、checkpoint。 | 强项是开放组合，而不是默认流程治理。 |
| 仓库合同 | 先定义哪些任务允许用开放式工具，哪些必须走更稳的标准入口。 | 高风险改动建议强制 worktree 和 checkpoint，避免开放栈误伤主工作区。 |

## 写进 repo

- 先定义哪些任务允许用开放式工具，哪些必须走更稳的标准入口。
- 高风险改动建议强制 worktree 和 checkpoint，避免开放栈误伤主工作区。
- 把 provider 与工具权限管理当成正式治理问题，而不是个人偏好。

## 团队检查

- 先定义哪些规则必须版本化留在 repo，哪些只属于 Cline 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 先定义哪些任务允许用开放式工具，哪些必须走更稳的标准入口。

## 下一步

- [Continue Rules](/docs/tools/ai-ide-landscape)：开放栈通常不只看 Cline，还要看 rules 与模型配置生态。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你想在开放壳层上再叠加一套日常操作方法时很有帮助。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：部分团队会把 Cline 留作开放实验入口，把 Codex 留作正式执行栈。
- [Cline：集成、review 与治理](/docs/ecosystem/integrations/cline)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
