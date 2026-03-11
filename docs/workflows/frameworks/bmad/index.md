---
audience: "advanced"
stage: "advanced"
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
title: "BMAD"
description: "BMAD 的定位、适用团队和默认进入方式。"
slug: "/workflows/frameworks/bmad"
sidebar_label: "概览"
tags: ["ai-coding", "workflow-framework", "bmad"]
---

# BMAD

BMAD 更像团队级交付骨架：它不是单一模板，而是一套把目标澄清、需求拆解、架构判断、执行验证、复盘沉淀串起来的协作框架。它的价值不在于“多几个角色名”，而在于让跨阶段 handoff 有固定落点。

## 这个框架解决什么

- 平台团队、多人协作团队和需要显式 handoff 的中大型任务。
- 希望把 PM、架构、开发、测试、复盘都纳入一条持续流程的组织。
- 愿意维护角色职责、阶段产物和流程纪律的团队。

## 典型任务画像

| 任务类型 | 为什么 BMAD 合适 | 第一次不要怎么做 |
| --- | --- | --- |
| 跨两个以上职能面的功能交付 | 需求、架构、开发、QA 都需要明确交接。 | 不要直接从“写代码”开始。 |
| 中大型平台改造 | 需要阶段化控制范围、依赖和风险。 | 不要在没有故事拆分时一次性铺开。 |
| 需要留存治理证据的长期项目 | 每个阶段都能留下可 review 的产物。 | 不要只保留聊天记录。 |
| 多人并行的复杂任务 | 能先固定边界，再安排并行执行。 | 不要把并行当成第一步。 |

## 默认进入方式

先在一个中等复杂度、至少跨两个阶段的任务里试跑，而不是拿最小 bug 或最大平台重构做第一次试点。最好的首个试点，是那种本来就会经历需求澄清、方案判断和实现验证三段以上 handoff 的真实任务。

## 更适合谁

- 单个任务经常跨多个阶段，且需要不同角色或职责面参与。
- 团队想把 AI 产物升级为制度化交付，而不是只靠个人 prompt 技巧。
- 你需要的不是更短 prompt，而是更稳的交接与治理。
- 已经有 issue、PR、CI 和 owner 体系，只缺一条更稳定的 delivery spine。

## 不要期待它解决什么

- 它不能替代 repo 规则、测试命令和 branch protection。
- 它不会自动把模糊需求变成正确架构，owner 仍要承担关键决策。
- 它不适合一天内就能完成的小改动，也不适合纯个人 improvisation。

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
- 如果当前团队连最基本的“谁拍板、谁验收、谁 merge”都说不清，先补治理底座，再谈 BMAD。

## 第一次试点至少要留下什么

- 一页能说明目标、范围、非目标和 owner 的任务说明。
- 一组可以映射到真实 issue 或 story 的拆分结果。
- 一份能说明约束、依赖、验证命令和风险的方案 note。
- 一份执行证据汇总，至少包括测试、review 和未完成项。
- 一份复盘，说明哪些阶段有价值，哪些 ritual 可以删。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：大多数 BMAD 任务最终都应落回先定边界、再执行的主线。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：在故事清晰后再把低耦合子任务并行化。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要缺的是 spec -> plan -> tasks 的产物链，Spec Kit 更轻。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果你主要是 brownfield 的高频小改动，OpenSpec 更省维护成本。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你需要的是日常 agent 操作框架，而不是团队角色制度，Superpowers 更贴近日常执行。

## 来源

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
