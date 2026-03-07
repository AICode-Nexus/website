---
title: "OpenSpec：角色、阶段与产物"
description: "OpenSpec 的角色切面、阶段划分和核心产物。"
slug: "/workflows/frameworks/openspec/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "openspec"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# OpenSpec：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。

## 角色切面

- Requester：提出变更需求和业务背景。
- Proposer：把需求转成 proposal 与 change set。
- Implementer：按 proposal 执行代码与验证。
- Approver：确认 proposal 是否值得进入实现与归档。

## 阶段总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 提 proposal | 先说明为什么要改、改什么、不改什么。 | proposal |
| 形成 change set | 把 proposal 转成具体改动包与依赖说明。 | change set |
| 执行与验证 | 在实现阶段对照 proposal 做最小变更。 | implemented change |
| archive | 把结果、结论和后续处理归档，保留变更历史。 | archive record |

## 核心产物

- proposal、change、archive 三段式记录。
- 与 PR 或任务系统可关联的轻量变化说明。
- 适合 brownfield 语境的最小验证与决策证据。

## 交接点

- proposal 先确认，再执行 change，不要让实现反推需求。
- archive 不是可选装饰，而是让后续团队知道这个改动为什么存在。
- 所有轻量流程最终仍要回到测试、review 和 branch policy。

## 角色和产物为什么要一起看

如果角色只停留在名称层，而产物没有固定下来，最终执行时还是会回到“谁想起什么就补什么”的状态。把角色、阶段和产物绑在一起看，才有可能让不同人对同一个框架产生相同预期。

## 下一步怎么读

- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：OpenSpec 很适合承接高频维护型变化。
- [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)：proposal 通过后，可直接进入异步 PR 流程。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：当你需要更完整的 spec 与 plan 链时，Spec Kit 更合适。
- [BMAD](/docs/workflows/frameworks/bmad)：当任务跨角色跨阶段时，BMAD 更能承载治理。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你要的是 agent 每天如何执行，而不是 proposal 管理层时，Superpowers 更直接。

## 来源

- [OpenSpec](https://github.com/openspec-ai/openspec)
