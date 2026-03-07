---
title: "Spec Kit：接入手册"
description: "把 Spec Kit 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/frameworks/spec-kit/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "spec-kit"]
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

# Spec Kit：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。接入手册的重点，就是降低“文档很好看、但真实任务没人照着走”的风险。

## 先在哪类仓库试跑

先挑一个本来就需要设计与实现分开的新功能，验证 spec -> plan -> tasks 是否能减少返工。

## 接入步骤

- 把你仓库现有的目录边界、验证命令和可编辑范围嵌进 spec / plan 模板。
- 不要让 tasks 脱离 repo 实际上下文，应在读完代码后再拆。
- 要求最终交付对照 spec 做验收映射，避免 planning 文档与实现脱节。
- 试跑 2 到 3 次后，再决定是否扩展到更多任务类型。

## 试跑矩阵

| 阶段 | 应该做什么 | 完成标准 |
| --- | --- | --- |
| 试跑前 | 先挑一个本来就需要设计与实现分开的新功能，验证 spec -> plan -> tasks 是否能减少返工。 | 能明确一类真实任务和一位 owner。 |
| 试跑中 | 把你仓库现有的目录边界、验证命令和可编辑范围嵌进 spec / plan 模板。 | 真实任务能按框架阶段推进。 |
| 试跑后 | 试跑 2 到 3 次后，再决定是否扩展到更多任务类型。 | 能判断返工量、review 成本和维护成本是否下降。 |

## 与仓库规范的连接

- Spec Kit 可以与现有 contract、branch policy、review checklist 直接拼接。
- 如果团队已经使用 issue / PR 工作系统，可把 spec 链接或摘要放回 ticket。
- 长任务可在 tasks 阶段再接 worktree 或后台 agent。

## 试跑周期与收口

- 最少跑 2 到 4 个真实任务，再判断是否值得扩大。
- 每轮试跑都要记录返工量、review 修补量和文档维护成本。
- 如果试跑阶段就明显没人遵守，应该先减重，而不是继续加流程。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：Spec Kit 最自然的落点就是 spec-first。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：plan 定稿后可把部分任务交给后台或云端执行。
- [BMAD](/docs/workflows/frameworks/bmad)：需要多角色和更完整治理时，BMAD 更合适。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果主要是 brownfield 高频小改动，OpenSpec 更轻。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你更缺日常 agent 操作框架而不是 spec 链，Superpowers 更贴近执行。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
