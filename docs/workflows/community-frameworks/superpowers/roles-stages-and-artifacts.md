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

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。

## 角色切面

- Owner / Operator：选择任务、决定范围并负责最后收口。
- Planner：把 brainstorming 结果整理成 plan 与 lane。
- Executor / Subagent：按 plan 在 worktree 或子任务里推进实现。
- Reviewer：核对测试、diff、review packet 和 branch 完成状态。

## 阶段总表

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

## 角色和产物为什么要一起看

如果角色只停留在名称层，而产物没有固定下来，最终执行时还是会回到“谁想起什么就补什么”的状态。把角色、阶段和产物绑在一起看，才有可能让不同人对同一个框架产生相同预期。

## 下一步怎么读

- [Agent Skills 与插件生态](/docs/ai-directory/agent-skills-and-plugins)：把 Superpowers 放到 skills、插件市场与方法包的公共目录里一起比较。
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)：Superpowers 很适合叠加在终端式 repo pairing 上。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：它把 worktree 和 subagent 使用方式标准化。
- [Spec-First](/docs/workflows/patterns/spec-first)：复杂任务可先 spec-first，再交给 Superpowers 组织日常执行。
- [BMAD](/docs/workflows/frameworks/bmad)：如果你需要团队角色和阶段制度，BMAD 更适合组织治理。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要想固定 spec -> plan -> tasks，Spec Kit 更直接。

## 来源

- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers Marketplace](https://github.com/obra/superpowers-marketplace)
