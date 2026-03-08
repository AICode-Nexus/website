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
title: "Windsurf：规则、记忆与工具边界"
description: "Windsurf 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/ide-first/windsurf/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "windsurf"]
---

# Windsurf：规则、记忆与工具边界

一旦一个入口开始支持 rules、memory、background task 或 MCP，它就不再只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，会直接决定这个入口是否能长期留在标准栈里。

## 规则分层

- Windsurf 会发现 AGENTS.md，也有自己的 memories / rules 体系。
- 最好把 repo 级事实边界固定在公共文件里，再让产品内规则做入口补充。
- 如果同时使用多套规则来源，必须明确优先级和 owner。

## 状态与记忆边界

- Cascade memories 与 workspace 记忆是它的重要差异点。
- 这类记忆适合承接工作台连续性，但不应替代 repo 级契约。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | Windsurf 会发现 AGENTS.md，也有自己的 memories / rules 体系。 | 最好把 repo 级事实边界固定在公共文件里，再让产品内规则做入口补充。 |
| 状态与记忆 | Cascade memories 与 workspace 记忆是它的重要差异点。 | 这类记忆适合承接工作台连续性，但不应替代 repo 级契约。 |
| 执行边界 | 工作台、memories、rules、模型管理、AGENTS.md 发现。 | 偏向整合好的体验，而不是开放式壳层。 |
| 仓库合同 | 把 AGENTS.md 和 Windsurf 内部 rules 分层管理，减少产品切换成本。 | memory 应服务于任务连续性，不要承载唯一业务知识源。 |

## 仓库接入建议

- 把 AGENTS.md 和 Windsurf 内部 rules 分层管理，减少产品切换成本。
- memory 应服务于任务连续性，不要承载唯一业务知识源。
- 团队 rollout 时要明确谁负责维护 memories 与规则治理。

如果你已经在 repo 里有 AGENTS.md、目录边界、验证命令和 review checklist，那么 Windsurf 更应该做的是补足入口体验，而不是再造第二套事实来源。

## 团队检查清单

- 先定义哪些规则必须版本化留在 repo，哪些只属于 Windsurf 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 把 AGENTS.md 和 Windsurf 内部 rules 分层管理，减少产品切换成本。

## 下一步怎么读

- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你想在 Windsurf 之上加一层方法论与 lane discipline。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：Windsurf 负责日常 workspace，GitHub 负责最终 review 闭环。
- [OpenSpec](/docs/workflows/frameworks/openspec)：高频 brownfield 变化可用 OpenSpec 管理提案层。
- [Windsurf：集成、review 与治理](/docs/ecosystem/integrations/windsurf)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。
- [Cursor](/docs/tools/ide-first/cursor)：如果你更重视成熟 IDE-first 体验与 background agents。
- [Cline](/docs/tools/terminal-agents/cline)：如果你更想完全控制开放工具栈。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
