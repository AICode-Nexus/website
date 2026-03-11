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

Spec Kit 更像规格与计划产物链：它先把需求、实现和执行拆开，再让 agent 或工程师沿着固定合同推进。它最有价值的地方，不是生成三份文档，而是让 spec、plan、tasks 各自承担不同职责，不再在实现阶段一边写代码一边补需求。

## 这个框架解决什么

- 新功能、跨模块变更和容易跑偏的复杂任务。
- 需要先对齐目标和验收，但不想引入完整多角色制度的团队。
- 希望把 planning 产物标准化，又保留现有 repo 治理方式的组织。

## 典型任务画像

| 任务类型 | 为什么 Spec Kit 合适 | 第一次不要怎么做 |
| --- | --- | --- |
| 新功能开发 | 先把目标、范围和验收口径固定下来。 | 不要直接让 agent 从 issue 生代码。 |
| 跨模块改动 | plan 能提前暴露依赖和影响面。 | 不要只写模糊 task list。 |
| 容易反复改需求的任务 | spec 能把非目标和边界写死。 | 不要把 spec 写成愿景口号。 |
| 需要异步协作的实现 | tasks 能把执行入口拆清楚。 | 不要在没看仓库前就先拆 tasks。 |

## 默认进入方式

先挑一个本来就需要设计与实现分开的新功能，验证 spec -> plan -> tasks 是否能减少返工。第一次试点最好选“讨论已经够多，但执行时还是容易跑偏”的任务，而不是太小或太急的活。

## 更适合谁

- 需求经常在实现阶段漂移，导致 review 只剩“补需求”。
- 你需要的是清晰 spec 和 task 拆解，而不是更多角色。
- 团队已经有 repo 规则和 CI，只差一个 planning 主线。
- 希望把 AI 生成的内容变成可 review 的产物，而不是一次性聊天输出。

## 不要期待它解决什么

- 它不能替代 owner 对目标和非目标的判断。
- 它不会自动保证 plan 正确，plan 仍然必须建立在读过仓库之后。
- 它不适合紧急事故、很小的修补或纯探索任务。

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
- 如果团队没有 review spec / plan 的意愿，只想跳过 planning 直接写代码，Spec Kit 很快会空心化。

## 第一次试点至少要留下什么

- 一份写清目标、非目标、边界和验收的 spec。
- 一份基于真实仓库现状写出的 plan。
- 一份可以直接作为执行入口的 tasks 列表。
- 一份执行后的 verification summary，说明哪些已完成、哪些延后。
- 一份复盘，判断 spec 和 plan 是否真的减少返工。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：Spec Kit 最自然的落点就是 spec-first。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：plan 定稿后可把部分任务交给后台或云端执行。
- [BMAD](/docs/workflows/frameworks/bmad)：需要多角色和更完整治理时，BMAD 更合适。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果主要是 brownfield 高频小改动，OpenSpec 更轻。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你更缺日常 agent 操作框架而不是 spec 链，Superpowers 更贴近执行。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
