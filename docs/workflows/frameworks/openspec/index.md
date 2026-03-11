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
title: "OpenSpec"
description: "OpenSpec 的定位、适用团队和默认进入方式。"
slug: "/workflows/frameworks/openspec"
sidebar_label: "概览"
tags: ["ai-coding", "workflow-framework", "openspec"]
---

# OpenSpec

OpenSpec 更像轻量变更管理层：它不是要把每个改动都做成完整项目，而是用 proposal、change 和 archive 保留 brownfield 迭代里的决策痕迹。它的价值在于成本可控地回答三个问题: 为什么改、到底改了什么、以后怎么查回来。

## 这个框架解决什么

- 现有项目、brownfield 场景和高频小改动。
- 需要显式记录变更原因，但又不想引入太多角色和阶段的团队。
- 想把 proposal 与最终实现、归档记录连接起来的组织。

## 典型任务画像

| 任务类型 | 为什么 OpenSpec 合适 | 第一次不要怎么做 |
| --- | --- | --- |
| 行为修正类 bugfix | 能快速记录变更原因、影响面和回退方式。 | 不要写成完整 PRD。 |
| 兼容性或配置调整 | proposal 足以说明改动理由和风险。 | 不要把所有小改动都拉成大项目。 |
| 增量型小功能 | 可留下“为什么现在要加”的决策痕迹。 | 不要省掉 archive。 |
| 维护性重构 | change set 能把影响模块写清楚。 | 不要只靠 commit message 追溯。 |

## 默认进入方式

从高频的现有项目迭代开始，先验证 OpenSpec 是否比完整 spec 链更贴近真实成本。第一次试点最好选一个有明确行为变化、但不值得启动完整 feature 规划的小到中型改动。

## 更适合谁

- 团队高频处理小功能、增量优化、兼容调整和迭代型改动。
- 需要追踪“为什么改”，但 spec-first 的完整产物链过重。
- 现有 repo 治理还算稳定，只缺一层轻量 proposal 记录。
- 希望新成员能快速从 archive 理解历史决策，而不是翻聊天记录。

## 不要期待它解决什么

- 它不能替代测试、review 和 PR 审批。
- 它不是大范围 feature planning 的替代品。
- 它不会自动帮你决定哪些变更值得做，owner 仍要判断优先级。

## 角色与阶段概览

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 提 proposal | 先说明为什么要改、改什么、不改什么。 | proposal |
| 形成 change set | 把 proposal 转成具体改动包与依赖说明。 | change set |
| 执行与验证 | 在实现阶段对照 proposal 做最小变更。 | implemented change |
| archive | 把结果、结论和后续处理归档，保留变更历史。 | archive record |

## 采用前检查

- 先确认团队已经有 repo 规则、验证命令和明确 owner，否则只会把流程层再加一层壳。
- 先挑一个真实任务试跑，而不是先做大面积制度推广。
- proposal 先确认，再执行 change，不要让实现反推需求。
- archive 不是可选装饰，而是让后续团队知道这个改动为什么存在。
- 先设定什么复杂度以上才值得写 proposal，避免把流程套到每个 typo 上。

## 第一次试点至少要留下什么

- 一份说明“为什么改、改什么、不改什么”的 proposal。
- 一份说明影响目录、依赖和验证方式的 change set。
- 一份执行后的结果摘要，至少包含测试或验证证据。
- 一份 archive 记录，说明是否需要继续跟进或回退。

## 下一步怎么读

- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：OpenSpec 很适合承接高频维护型变化。
- [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)：proposal 通过后，可直接进入异步 PR 流程。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：当你需要更完整的 spec 与 plan 链时，Spec Kit 更合适。
- [BMAD](/docs/workflows/frameworks/bmad)：当任务跨角色跨阶段时，BMAD 更能承载治理。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你要的是 agent 每天如何执行，而不是 proposal 管理层时，Superpowers 更直接。

## 来源

- [OpenSpec](https://github.com/openspec-ai/openspec)
