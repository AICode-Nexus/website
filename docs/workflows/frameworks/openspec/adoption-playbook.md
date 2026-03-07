---
title: "OpenSpec：接入手册"
description: "把 OpenSpec 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/frameworks/openspec/adoption-playbook"
sidebar_label: "接入手册"
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

# OpenSpec：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。接入手册的重点，就是降低“文档很好看、但真实任务没人照着走”的风险。

## 先在哪类仓库试跑

从高频的现有项目迭代开始，先验证 OpenSpec 是否比完整 spec 链更贴近真实成本。

## 接入步骤

- 为 repo 选一处统一 proposal / archive 目录，避免散落在 issue、PR 和聊天记录里。
- 让 proposal 模板只保留最关键字段，不要一上来复刻完整 PRD。
- 用 bugfix / refactor / test 模板承接执行阶段，保持轻重分层。
- 定期清理 archive，确保历史记录是可检索资产而不是噪音。

## 试跑矩阵

| 阶段 | 应该做什么 | 完成标准 |
| --- | --- | --- |
| 试跑前 | 从高频的现有项目迭代开始，先验证 OpenSpec 是否比完整 spec 链更贴近真实成本。 | 能明确一类真实任务和一位 owner。 |
| 试跑中 | 为 repo 选一处统一 proposal / archive 目录，避免散落在 issue、PR 和聊天记录里。 | 真实任务能按框架阶段推进。 |
| 试跑后 | 定期清理 archive，确保历史记录是可检索资产而不是噪音。 | 能判断返工量、review 成本和维护成本是否下降。 |

## 与仓库规范的连接

- OpenSpec 负责说明为什么改和如何归档，repo 规则负责说明怎么验证和谁能 merge。
- proposal ID 可以直接映射到 issue、PR 或 release note。
- 如果需求升级成更复杂 feature，应及时切换到 Spec Kit 或 BMAD，而不是硬撑。

## 试跑周期与收口

- 最少跑 2 到 4 个真实任务，再判断是否值得扩大。
- 每轮试跑都要记录返工量、review 修补量和文档维护成本。
- 如果试跑阶段就明显没人遵守，应该先减重，而不是继续加流程。

## 下一步怎么读

- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：OpenSpec 很适合承接高频维护型变化。
- [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)：proposal 通过后，可直接进入异步 PR 流程。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：当你需要更完整的 spec 与 plan 链时，Spec Kit 更合适。
- [BMAD](/docs/workflows/frameworks/bmad)：当任务跨角色跨阶段时，BMAD 更能承载治理。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你要的是 agent 每天如何执行，而不是 proposal 管理层时，Superpowers 更直接。

## 来源

- [OpenSpec](https://github.com/openspec-ai/openspec)
