---
title: "BMAD：适配边界与替代方案"
description: "BMAD 适合什么、不适合什么，以及与其他框架如何分工。"
slug: "/workflows/frameworks/bmad/fit-vs-alternatives"
sidebar_label: "边界与替代方案"
tags: ["ai-coding", "workflow-framework", "bmad"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# BMAD：适配边界与替代方案

真正的选型问题不是“谁更先进”，而是你当前的团队规模、任务复杂度和治理成熟度，更适合哪一种骨架。框架一旦选错，后续每次任务都会被额外流程拖累。

## 更适合什么

- 平台团队、多人协作团队和需要显式 handoff 的中大型任务。
- 希望把 PM、架构、开发、测试、复盘都纳入一条持续流程的组织。
- 愿意维护角色职责、阶段产物和流程纪律的团队。

## 与其他框架的边界

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要缺的是 spec -> plan -> tasks 的产物链，Spec Kit 更轻。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果你主要是 brownfield 的高频小改动，OpenSpec 更省维护成本。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你需要的是日常 agent 操作框架，而不是团队角色制度，Superpowers 更贴近日常执行。

## 比较矩阵

| 如果你当前更在意 | 更适合继续用它 | 更适合改看别的 |
| --- | --- | --- |
| 先把 planning 合同写稳 | 平台团队、多人协作团队和需要显式 handoff 的中大型任务。 | Spec Kit |
| 多角色或更重流程 | 希望把 PM、架构、开发、测试、复盘都纳入一条持续流程的组织。 | OpenSpec |
| 日常执行纪律 | 愿意维护角色职责、阶段产物和流程纪律的团队。 | Superpowers |

## 什么时候不要选它

- 纯个人、小 bug 或一天内即可完成的任务。
- 还没有基本验证门禁，却想直接上最重流程的团队。
- 没有人愿意维护角色定义和产物目录的仓库。

## 组合方式

- [Spec-First](/docs/workflows/patterns/spec-first)：大多数 BMAD 任务最终都应落回先定边界、再执行的主线。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：在故事清晰后再把低耦合子任务并行化。

## 下一步怎么读

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要缺的是 spec -> plan -> tasks 的产物链，Spec Kit 更轻。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果你主要是 brownfield 的高频小改动，OpenSpec 更省维护成本。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你需要的是日常 agent 操作框架，而不是团队角色制度，Superpowers 更贴近日常执行。
- [Spec-First](/docs/workflows/patterns/spec-first)：大多数 BMAD 任务最终都应落回先定边界、再执行的主线。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：在故事清晰后再把低耦合子任务并行化。

## 来源

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
