---
audience: "advanced"
stage: "advanced"
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
title: "Superpowers：角色、阶段与产物"
description: "Superpowers 的角色切面、阶段划分和核心产物。"
slug: "/workflows/community-frameworks/superpowers/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "superpowers"]
---

# Superpowers：角色、阶段与产物

Superpowers 的关键不是记住几个名词，而是让不同入口、不同 agent 和不同 owner 对同一条执行链产生一致预期。只要角色和产物脱钩，方法层就会立刻退化成“想到什么补什么”的临场 improvisation。

## 角色切面

| 角色切面 | 主要责任 | 至少要确认什么 |
| --- | --- | --- |
| Owner / Operator | 选择任务、决定边界、保留最后收口责任。 | 哪些能做，哪些不做，什么时候停。 |
| Planner | 把 brainstorming 结果转成 plan、阶段和 lane。 | 计划顺序、依赖和停点是否清楚。 |
| Lane Owner / Subagent | 在独立 worktree 或任务块里推进执行。 | 当前 lane 的输入输出和验证结果。 |
| Reviewer | 对照 review packet 判断是否能 merge 或继续。 | 证据是否足够，风险是否可接受。 |
| Rules / Skills Maintainer | 维护可复用规则、skills 和模板。 | 这些机制是否还贴合真实仓库。 |

## 阶段总表

| 阶段 | 目标 | 主要 owner | 退出证据 |
| --- | --- | --- | --- |
| Brainstorming | 先把问题、方案和边界说清。 | Owner / Planner | brainstorm note 可指导后续计划。 |
| Writing Plans | 固定步骤、停点、验证方式和 lane 分工。 | Planner | plan 可以直接作为执行入口。 |
| Worktree / Lane Setup | 为长任务或并行任务准备隔离工作区。 | Owner / Lane Owner | lane brief 和 worktree 结构明确。 |
| Lane Execution | 在各 lane 推进实现、验证并汇总结果。 | Lane Owner / Subagent | diff、命令结果和验证证据齐全。 |
| Review / Finish Branch | 汇总 review packet、收尾分支并决定合并。 | Reviewer / Owner | review packet 和 finish note 可支持 merge 决策。 |

## 核心产物

| 产物 | 最低应包含什么 | 谁来确认 |
| --- | --- | --- |
| brainstorm note | 问题定义、边界、方案选项、显式不做。 | Owner / Planner |
| execution plan | 阶段顺序、停点、验证方式、lane 策略。 | Planner / Owner |
| lane brief | 该 lane 的目标、目录边界、命令和交付。 | Lane Owner |
| review packet | 关键 diff、命令结果、验证、剩余风险。 | Reviewer |
| finish note | 合并结论、清理项、后续待办、删减建议。 | Owner |

## 交接规则

- brainstorming 没讲清边界，就不要进入多 lane 执行。
- lane brief 必须能映射到真实目录、真实命令和真实输出，不接受抽象口号。
- review packet 必须比“做完了”多出结构化证据，否则 reviewer 只能重新读全过程。
- finish branch 阶段要清理 worktree、更新总结，并决定哪些 ritual 保留，哪些删掉。

## 最小证据包

- 一份能支撑下游理解任务的 brainstorm note。
- 一份带停点和验证方式的 execution plan。
- 一组说明每条 lane 做了什么的 lane brief 或执行摘要。
- 一份给 reviewer 使用的证据包，而不是长聊天记录。
- 一份 finish note，说明这次方法链哪里有效、哪里偏重。

## 常见塌陷点

- 所有人都知道要开 lane，但没人定义 lane 之间的依赖和收口顺序。
- worktree 用得很多，但产物仍然没有回到 PR 和 review。
- skills 越积越多，却没有人维护哪些还有效。
- review packet 只有总结，没有命令和验证事实，最后 reviewer 还是重新读 diff。

## 下一步怎么读

- [Superpowers：接入手册](/docs/workflows/community-frameworks/superpowers/adoption-playbook)
- [Superpowers：误用与退出条件](/docs/workflows/community-frameworks/superpowers/risks-and-failure-modes)
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)
- [Spec-First](/docs/workflows/patterns/spec-first)

## 来源

- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers Marketplace](https://github.com/obra/superpowers-marketplace)
