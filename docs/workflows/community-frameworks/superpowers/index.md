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
title: "Superpowers"
description: "Superpowers 的定位、适用团队和默认进入方式。"
slug: "/workflows/community-frameworks/superpowers"
sidebar_label: "概览"
tags: ["ai-coding", "workflow-framework", "superpowers"]
---

# Superpowers

Superpowers 更像面向 coding agents 的日常操作骨架。它不是单一模板，也不是厂商产品说明，而是一套把 brainstorming、worktree、plan、lane execution、TDD、review packet 和 finish branch 串成固定节奏的方法层。

## 这个框架解决什么

- 已经高频使用 Claude Code、Codex、Cursor、Cline 这类入口，但日常执行波动仍很大的人。
- 希望把 agent 的“先想什么、再拆什么、谁来收口”固定下来，而不是每轮重编 prompt 的团队。
- 愿意为 worktree、skills、lane owner 和 review evidence 付出维护成本，换取更稳执行的人。

## 典型任务画像

| 任务类型 | 为什么 Superpowers 合适 | 第一次不要这样用 |
| --- | --- | --- |
| 中等复杂度的仓库维护 | 可以把 brainstorming、plan、verify 变成固定手感。 | 不要第一次就开很多 lane。 |
| 多步 refactor 或治理型修复 | worktree 和 lane 能把执行拆开，但仍有 owner 收口。 | 不要跳过 review packet。 |
| 高频 agent 协作的个人或小团队 | 能减少“今天这样做、明天那样做”的波动。 | 不要把个人习惯直接当团队制度。 |
| 需要结合 spec 与执行纪律的复杂任务 | 可先接 [Spec-First](/docs/workflows/patterns/spec-first)，再用 Superpowers 管执行。 | 不要把它当 planning 框架本体。 |

## 默认进入方式

第一次最稳的进入方式，是在一个已有 repo 规则、验证命令和明确 owner 的仓库里，用 1 到 2 个真实任务试跑。先把它叠加在现有入口之上，而不是一开始就试图替代所有治理。

## 更适合谁

- 你已经知道问题不在“工具不会写”，而在“执行过程不稳定”。
- 你需要的是一套日常操作方式，而不是更重的组织治理制度。
- 你能接受把 worktree、review packet、finish note 当成正式工程资产。
- 你希望不同 agent 入口共享同一套执行习惯，而不是每个入口各有各的套路。

## 不要期待它解决什么

- 它不能替代 repo 规则、测试命令、PR 审批和 branch protection。
- 它不会自动把模糊需求变清楚，需求和验收仍要靠 owner 拍板。
- 它不是多角色治理框架；当你需要组织级 handoff 时，先看 [BMAD](/docs/workflows/frameworks/bmad)。
- 它不是轻量变更记录层；当你主要缺 proposal 和 archive 时，先看 [OpenSpec](/docs/workflows/frameworks/openspec)。

## 角色与阶段概览

| 阶段 | 目标 | 主要 owner | 主要产物 |
| --- | --- | --- | --- |
| Brainstorming | 先把问题、选项和边界讲清。 | Owner / Planner | brainstorm note |
| Writing Plans | 把任务转成可执行计划和停点。 | Planner | execution plan |
| Worktree / Lane Setup | 为长任务或并行任务准备隔离工作区。 | Owner / Lane Owner | worktree + lane brief |
| Lane Execution | 按计划推进实现、验证和汇总。 | Lane Owner / Subagent | diff + verify evidence |
| Review / Finish Branch | 汇总 review packet、收尾分支并准备 merge。 | Owner / Reviewer | review packet + finish note |

## 采用前检查

- 先确认仓库里已经有最小 repo contract，例如规则文件、验证命令和人工 merge 责任。
- 先确认 owner 能解释这次任务为什么适合 lane 和 worktree，而不是为了“更酷”。
- 先决定哪些输出必须回到 PR 或 issue，不要把证据留在聊天或终端里。
- 先挑中等复杂度任务试跑，不要用事故热修，也不要用最大 feature。

## 第一次试点至少要留下什么

- 一份 brainstorm note，说明问题定义、边界和主要方案取舍。
- 一份可执行 plan，说明阶段顺序、停点和验证方式。
- 一份 lane brief 或 worktree 说明，解释每条 lane 在做什么。
- 一份 review packet，汇总关键 diff、命令结果和剩余风险。
- 一份 finish note，说明这套方法哪些有用、哪些应该删。

## 下一步怎么读

- [Superpowers：边界与替代方案](/docs/workflows/community-frameworks/superpowers/fit-vs-alternatives)
- [Superpowers：接入手册](/docs/workflows/community-frameworks/superpowers/adoption-playbook)
- [Superpowers：角色、阶段与产物](/docs/workflows/community-frameworks/superpowers/roles-stages-and-artifacts)
- [Superpowers：误用与退出条件](/docs/workflows/community-frameworks/superpowers/risks-and-failure-modes)
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)

## 来源

- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers Marketplace](https://github.com/obra/superpowers-marketplace)
