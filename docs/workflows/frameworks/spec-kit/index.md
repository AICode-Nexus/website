---
audience: "mixed"
stage: "intermediate"
featured: true
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "development-planning"
title: "Spec Kit"
description: "Spec Kit 的定位、适用团队和默认进入方式。"
slug: "/workflows/frameworks/spec-kit"
sidebar_label: "概览"
tags: ["ai-coding", "workflow-framework", "spec-kit"]
---

# Spec Kit

Spec Kit 更像规格与计划产物链：用 spec、plan、tasks 先把需求和实施拆开，再交给 agent 或工程师执行。

## 这个框架解决什么

- 新功能、跨模块变更和容易跑偏的复杂任务。
- 需要先对齐目标和验收，但不想引入完整多角色制度的团队。
- 希望把 planning 产物标准化，又保留现有 repo 治理方式的组织。

## 默认进入方式

先挑一个本来就需要设计与实现分开的新功能，验证 spec -> plan -> tasks 是否能减少返工。

## 更适合谁

- 需求经常在实现阶段漂移，导致 review 只剩“补需求”。
- 你需要的是清晰 spec 和 task 拆解，而不是更多角色。
- 团队已经有 repo 规则和 CI，只差一个 planning 主线。

## 角色与阶段概览

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 写 spec | 明确目标、非目标、范围、约束和验收标准。 | spec |
| 写 plan | 结合仓库现状确定实现方案、依赖和风险。 | plan |
| 拆 tasks | 把 plan 切成可执行、可验证的任务块。 | tasks |
| 执行与验证 | 按任务推进代码改动，并回到 spec 验收。 | verification summary |

## 采用前检查

- 先确认团队已经有 repo 规则、验证命令和明确 owner，否则只会把流程层再加一层壳。
- 先挑一个真实任务试跑，而不是先做大面积制度推广。
- spec 先过，再进入 plan；plan 先过，再进入 tasks。
- tasks 是执行入口，不应该重新定义需求。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：Spec Kit 最自然的落点就是 spec-first。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：plan 定稿后可把部分任务交给后台或云端执行。
- [BMAD](/docs/workflows/frameworks/bmad)：需要多角色和更完整治理时，BMAD 更合适。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果主要是 brownfield 高频小改动，OpenSpec 更轻。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你更缺日常 agent 操作框架而不是 spec 链，Superpowers 更贴近执行。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
