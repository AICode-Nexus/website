---
title: AI 工作流框架总览
description: 用复杂度、适用场景和产出物来比较 BMAD、Spec Kit、OpenSpec 与 Superpowers，避免把不同层的问题混成一类。
slug: /workflows/frameworks-overview
sidebar_label: 工作流框架总览
tags: [ai-coding, workflow, framework]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: tech-selection
entry_role: domain
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 工作流框架总览

## 结论先行

这些框架解决的不是同一个问题：

- [BMAD](/docs/workflows/frameworks/bmad)：多角色、多阶段、完整协作流程
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：spec、plan、tasks 的产物链
- [OpenSpec](/docs/workflows/frameworks/openspec)：轻量 proposal / change / archive
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：面向 coding agents 的日常方法链

选型关键不是谁更“先进”，而是谁更接近你当前的团队规模、任务复杂度和治理成熟度。

## 官方/主线框架

| 框架 | 核心关注点 | 更适合 | 进入门槛 |
| --- | --- | --- | --- |
| BMAD | 多角色 handoff 与完整交付 | 中大型任务、多人协作 | 高 |
| Spec Kit | 规格与计划产物链 | 新功能、跨模块改动 | 中 |
| OpenSpec | 轻量变更与归档 | brownfield、小步迭代 | 低 |

## 社区工作流框架

目前最值得单列的是 [Superpowers](/docs/workflows/community-frameworks/superpowers)。

它不是单页 prompt 集，而是一套完整的 agentic workflow：brainstorming、worktree、plan、subagent、TDD、review、finish branch 都有明确位置。因此它更像“日常执行方法层”，而不是官方 spec 框架的直接替代品。

## 暂时只进 watchlist 的候选

- `Hyperpowers`：更像衍生或变体，先观察是否形成独立稳定方法链。
- `Claude Flow`：更偏 orchestration platform / swarm runtime，优先挂在多 agent 或异步协作专题，而不是和 BMAD、Spec Kit 并列。

## 怎么选

如果你需要组织级 handoff 与角色治理，先看 [BMAD](/docs/workflows/frameworks/bmad)。

如果你最缺的是“先说明做什么，再说明怎么做”，先看 [Spec Kit](/docs/workflows/frameworks/spec-kit)。

如果你主要在现有项目里做高频增量改动，先看 [OpenSpec](/docs/workflows/frameworks/openspec)。

如果你已经高频使用 coding agents，想把 daily workflow 固化下来，再看 [Superpowers](/docs/workflows/community-frameworks/superpowers)。

## 推荐的组合方式

- `Spec Kit + 仓库级 contract`：适合多数中小团队。
- `OpenSpec + Bugfix / Refactor / Test`：适合 brownfield 高频迭代。
- `BMAD + 仓库级规范`：适合平台团队与多角色组织。
- `Superpowers + Claude Code / Codex / Cursor`：适合已形成 agent 日常操作习惯的高级用户或小团队。

## 风险与边界

- 框架不能替代 repo 规则、验证门禁和 reviewer 责任。
- 同一个团队同时上多套重流程，通常会先死在维护成本上。
- 不要把社区框架当“万能增强包”；没有 repo contract 和测试纪律时，它只会放大混乱。

## 延伸阅读

- [AI 工作流总览](/docs/workflows)
- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [任务工作流目录](/docs/workflows/workflow-catalog)
