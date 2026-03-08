---
audience: "individual"
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
title: "Cursor：规则、记忆与工具边界"
description: "Cursor 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/ide-first/cursor/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "cursor"]
---

# Cursor：规则、记忆与工具边界

一旦一个入口开始支持 rules、memory、background task 或 MCP，它就不再只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，会直接决定这个入口是否能长期留在标准栈里。

## 规则分层

- `.cursor/rules` 适合放入口专用规则，但仓库级真实边界仍应有统一来源。
- 不要把所有团队制度都塞进 IDE 规则里，避免入口切换后失效。
- 最好定义哪些规则是个人偏好，哪些是团队必须遵守的 contract。

## 状态与记忆边界

- 规则、上下文和 background agent 状态是核心状态层。
- 更适合承载 IDE 使用习惯和当前任务上下文，不适合替代 repo 规则文件。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | `.cursor/rules` 适合放入口专用规则，但仓库级真实边界仍应有统一来源。 | 不要把所有团队制度都塞进 IDE 规则里，避免入口切换后失效。 |
| 状态与记忆 | 规则、上下文和 background agent 状态是核心状态层。 | 更适合承载 IDE 使用习惯和当前任务上下文，不适合替代 repo 规则文件。 |
| 执行边界 | IDE 编辑、rules、background agents。 | 适合高频主入口，而不是唯一平台或唯一执行栈。 |
| 仓库合同 | 把 repo contract 与 `.cursor/rules` 分层管理，避免同一规则写两遍且互相打架。 | background agent 的验收要回到 PR、测试和 repo 证据里。 |

## 仓库接入建议

- 把 repo contract 与 `.cursor/rules` 分层管理，避免同一规则写两遍且互相打架。
- background agent 的验收要回到 PR、测试和 repo 证据里。
- 如果团队多人共用 Cursor，最好定规则目录和命名约定。

如果你已经在 repo 里有 AGENTS.md、目录边界、验证命令和 review checklist，那么 Cursor 更应该做的是补足入口体验，而不是再造第二套事实来源。

## 团队检查清单

- 先定义哪些规则必须版本化留在 repo，哪些只属于 Cursor 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 把 repo contract 与 `.cursor/rules` 分层管理，避免同一规则写两遍且互相打架。

## 下一步怎么读

- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你想在 Cursor 之上再固定 daily workflow 和 review ritual。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责 PR / review，Cursor 负责日常编辑入口。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：Spec / plan 先固定，再回 IDE 做执行。
- [Cursor：集成、review 与治理](/docs/ecosystem/integrations/cursor)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：如果你想保留 VS Code 生态与控制面。
- [Windsurf](/docs/tools/ide-first/windsurf)：如果你更偏好更整合的 workspace 工作流。

## 来源

- [Cursor Background Agents](https://docs.cursor.com/en/background-agents)
- [Cursor Rules](https://docs.cursor.com/context/rules)
