---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "development-planning"
title: "OpenSpec：角色、阶段与产物"
description: "OpenSpec 的角色切面、阶段划分和核心产物。"
slug: "/workflows/frameworks/openspec/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "openspec"]
---

# OpenSpec：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。OpenSpec 的重点是保持轻，但轻不等于省掉交付边界。

## 角色切面

| 角色切面 | 主要责任 | 至少要确认什么 |
| --- | --- | --- |
| Requester | 提出变更需求和业务背景。 | 为什么现在要改。 |
| Proposer | 把需求转成 proposal 与 change set。 | 影响面、非目标和风险是否清楚。 |
| Implementer | 按 proposal 执行代码与验证。 | 实现是否仍在原边界内。 |
| Approver | 确认 proposal 是否值得进入实现与归档。 | 是否真的要做，是否可以 merge。 |

## 阶段总表

| 阶段 | 目标 | 主要 owner | 退出证据 |
| --- | --- | --- | --- |
| 提 proposal | 先说明为什么要改、改什么、不改什么。 | Requester / Proposer | proposal 被确认。 |
| 形成 change set | 把 proposal 转成具体改动包与依赖说明。 | Proposer | change set 能说明影响目录与验证。 |
| 执行与验证 | 在实现阶段对照 proposal 做最小变更。 | Implementer | 实际改动与 proposal 对齐。 |
| archive | 把结果、结论和后续处理归档，保留变更历史。 | Approver / Implementer | archive 可以被后续检索和引用。 |

## 核心产物

| 产物 | 最低应包含什么 | 谁来确认 |
| --- | --- | --- |
| proposal | 背景、目标、非目标、风险、是否值得做。 | Requester / Approver |
| change set | 影响模块、实施范围、验证方式、依赖。 | Proposer |
| implemented change | 实际变更、测试结果、偏差说明。 | Implementer / Reviewer |
| archive record | 结果、结论、后续事项、回退线索。 | Approver |

## 交接规则

- proposal 先确认，再执行 change，不要让实现反推需求。
- change set 必须明确哪些模块受影响，不能只写“按 proposal 实现”。
- archive 不是可选装饰，而是让后续团队知道这个改动为什么存在。
- 所有轻量流程最终仍要回到测试、review 和 branch policy。
- 如果执行中边界扩大到 feature 级别，应升级到 [Spec Kit](/docs/workflows/frameworks/spec-kit) 或 [BMAD](/docs/workflows/frameworks/bmad)。

## 最小证据包

- 一份可追溯到 issue 或需求源头的 proposal。
- 一份包含影响面和验证命令的 change set。
- 一份实现后的验证摘要。
- 一份便于检索的 archive 记录。

## 常见塌陷点

- proposal 写得很热闹，但没有任何非目标和回退线索。
- change set 过于抽象，执行时仍然要重新猜影响面。
- archive 只是复制 PR 描述，没有任何后续价值。
- 小修小补全都要求 proposal，最后没人愿意维护。

## 下一步怎么读

- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：OpenSpec 很适合承接高频维护型变化。
- [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)：proposal 通过后，可直接进入异步 PR 流程。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：当你需要更完整的 spec 与 plan 链时，Spec Kit 更合适。
- [BMAD](/docs/workflows/frameworks/bmad)：当任务跨角色跨阶段时，BMAD 更能承载治理。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你要的是 agent 每天如何执行，而不是 proposal 管理层时，Superpowers 更直接。

## 来源

- [OpenSpec](https://github.com/openspec-ai/openspec)
