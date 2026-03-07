---
title: "Superpowers：角色、阶段与产物"
description: "Superpowers 的角色切面、阶段划分和核心产物。"
slug: "/workflows/community-frameworks/superpowers/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "superpowers"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Superpowers：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。

## 角色切面

- Owner / Operator：选择任务、决定范围并负责最后收口。
- Planner：把 brainstorming 结果整理成 plan 与 lane。
- Executor / Subagent：按 plan 在 worktree 或子任务里推进实现。
- Reviewer：核对测试、diff、review packet 和 branch 完成状态。

## 阶段

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| Brainstorming | 先把问题理解、方案选项和拆分方式讲清，不急着直接改代码。 | brainstorm note |
| Worktree / Branch Setup | 为长任务或并行 lane 准备独立工作区和命名约定。 | task worktrees |
| Writing Plans | 把方案固化为分步计划、执行清单和风险说明。 | plan |
| Subagent / Execution | 根据 plan 分配子任务，逐步执行并汇总结果。 | execution lanes |
| TDD / Review / Finish Branch | 用测试、review packet 和 branch 清理收尾，保证可 merge。 | review-ready branch |

## 核心产物

- brainstorm note、计划、worktree 结构和任务清单。
- 按 lane 组织的执行证据、测试结果和 review packet。
- 完成分支后的收尾说明与后续待办。

## 交接点

- 先 brainstorming 和 plan，再开多条 lane；不要直接让多个 agent 胡乱开工。
- 每个 lane 要把测试和 review 证据带回 owner，而不是只说“我做完了”。
- Finish branch 阶段要收掉临时工作区、整理总结并准备 merge。
