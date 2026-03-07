---
title: "BMAD"
description: "BMAD 的定位、适用团队和默认进入方式。"
slug: "/workflows/frameworks/bmad"
sidebar_label: "概览"
tags: ["ai-coding", "workflow-framework", "bmad"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: true
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# BMAD

BMAD 更像团队级交付骨架：用多角色、多阶段和明确 handoff 组织完整的软件交付，而不是只给一个 spec 模板。

## 这个框架解决什么

- 平台团队、多人协作团队和需要显式 handoff 的中大型任务。
- 希望把 PM、架构、开发、测试、复盘都纳入一条持续流程的组织。
- 愿意维护角色职责、阶段产物和流程纪律的团队。

## 默认进入方式

先在一个中等复杂度、至少跨两个阶段的任务里试跑，而不是拿最小 bug 或最大平台重构做第一次试点。

## 更适合谁

- 单个任务经常跨多个阶段，且需要不同角色或职责面参与。
- 团队想把 AI 产物升级为制度化交付，而不是只靠个人 prompt 技巧。
- 你需要的不是更短 prompt，而是更稳的交接与治理。

## 角色与阶段概览

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 发现与目标对齐 | 先让业务目标、问题定义和范围边界稳定下来。 | brief 或目标说明 |
| 需求与故事拆解 | 把抽象需求转成可交付的故事、任务或 sprint 输入。 | PRD / stories |
| 架构与实施准备 | 明确技术方案、约束、依赖和验证计划。 | architecture / plan |
| 执行与验证 | 按故事或任务推进实现，并同步测试与 review。 | implementation evidence |
| 复盘与沉淀 | 把失败模式、经验和流程调整写回体系。 | retro / checklist update |

## 采用前检查

- 先确认团队已经有 repo 规则、验证命令和明确 owner，否则只会把流程层再加一层壳。
- 先挑一个真实任务试跑，而不是先做大面积制度推广。
- 从需求到架构，再到执行和 QA，都强调显式交接而不是口头理解。
- 每个阶段结束时都应产生可 review 的文档或检查单。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：大多数 BMAD 任务最终都应落回先定边界、再执行的主线。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：在故事清晰后再把低耦合子任务并行化。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要缺的是 spec -> plan -> tasks 的产物链，Spec Kit 更轻。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果你主要是 brownfield 的高频小改动，OpenSpec 更省维护成本。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你需要的是日常 agent 操作框架，而不是团队角色制度，Superpowers 更贴近日常执行。

## 来源

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
