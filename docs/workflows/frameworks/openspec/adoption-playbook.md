---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "playbook"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "development-planning"
title: "OpenSpec：接入手册"
description: "把 OpenSpec 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/frameworks/openspec/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "openspec"]
---

# OpenSpec：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。OpenSpec 的接入重点，是让 proposal 和 archive 成为真实资产，而不是新增噪音目录。

## 先在哪类仓库试跑

从高频的现有项目迭代开始，先验证 OpenSpec 是否比完整 spec 链更贴近真实成本。最好的首个试点，是那种行为有变化、值得留下说明、但又不需要完整 feature planning 的改动。

## 试点前准备

- 为 repo 选一处统一 proposal / archive 目录，避免散落在 issue、PR 和聊天记录里。
- 让 proposal 模板只保留最关键字段，不要一上来复刻完整 PRD。
- 明确什么复杂度以下不需要 proposal，避免流程泛滥。
- 约定 archive 至少保留哪些字段，确保后续能检索。

## 三步接入顺序

| 阶段 | 应该做什么 | 最低交付 |
| --- | --- | --- |
| 第 1 步 | 选一个中小变更，写 proposal。 | proposal |
| 第 2 步 | 把 proposal 细化成 change set，并接回验证命令。 | change set |
| 第 3 步 | 实现后写 archive，保留结果和后续事项。 | archive record |

## 与仓库规范的连接

- OpenSpec 负责说明为什么改和如何归档，repo 规则负责说明怎么验证和谁能 merge。
- proposal ID 可以直接映射到 issue、PR 或 release note。
- 如果需求升级成更复杂 feature，应及时切换到 [Spec Kit](/docs/workflows/frameworks/spec-kit) 或 [BMAD](/docs/workflows/frameworks/bmad)，而不是硬撑。
- 执行阶段可以直接借用 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test) 这类轻量 runbook。

## 可以扩大范围的信号

- proposal 真能帮助 reviewer 快速理解“为什么改”。
- archive 在后续追查问题时被真实引用，而不是无人打开。
- 变更成本明显低于完整 spec 链，但仍保留了足够决策痕迹。
- 团队能说清哪些改动值得进入 OpenSpec，哪些不值得。

## 该先减法的信号

- proposal 数量暴涨，但没人再看 archive。
- 成员开始抱怨“连很小的修改都要写太多”。
- proposal 里几乎没有非目标、风险和回退线索。
- 变更一复杂就把 OpenSpec 用成了半套 Spec Kit，却没有对应治理。

## 下一步怎么读

- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：OpenSpec 很适合承接高频维护型变化。
- [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)：proposal 通过后，可直接进入异步 PR 流程。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：当你需要更完整的 spec 与 plan 链时，Spec Kit 更合适。
- [BMAD](/docs/workflows/frameworks/bmad)：当任务跨角色跨阶段时，BMAD 更能承载治理。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你要的是 agent 每天如何执行，而不是 proposal 管理层时，Superpowers 更直接。

## 来源

- [OpenSpec](https://github.com/openspec-ai/openspec)
