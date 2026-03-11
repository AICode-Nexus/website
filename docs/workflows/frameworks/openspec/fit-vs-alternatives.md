---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "comparison"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "tech-selection"
title: "OpenSpec：适配边界与替代方案"
description: "OpenSpec 适合什么、不适合什么，以及与其他框架如何分工。"
slug: "/workflows/frameworks/openspec/fit-vs-alternatives"
sidebar_label: "边界与替代方案"
tags: ["ai-coding", "workflow-framework", "openspec"]
---

# OpenSpec：适配边界与替代方案

真正的选型问题不是“谁更先进”，而是你当前的任务形态和治理成本，更适合哪一种骨架。OpenSpec 的优势是轻量追溯，不是全面治理。

## 什么时候优先选 OpenSpec

- 任务大多发生在现有项目里，且改动规模中小。
- 你需要留下决策痕迹，但不值得为此起完整 spec 链。
- 团队经常要回答“为什么这里这样改过”，却又不想翻聊天记录。
- 你想把 proposal 与实现、归档连起来，而不是把知识散落在 issue 和 PR 评论区。

## 什么时候应该选别的

- 这是一个全新的 feature，需要先把目标、非目标和验收写稳。
- 任务跨多个角色和阶段，需要明确停点与更完整治理。
- 团队真正缺的是 agent 执行纪律，而不是 change proposal 记录。
- 改动极小到 typo 级别，proposal 成本已经高于价值。

## 与其他框架的决策矩阵

| 当前主要问题 | 更适合 OpenSpec | 更适合改看别的 |
| --- | --- | --- |
| brownfield 高频小变更 | proposal + archive 足以承载。 | [Spec Kit](/docs/workflows/frameworks/spec-kit) 对这类任务偏重。 |
| 新功能边界不稳 | OpenSpec 通常不够。 | [Spec Kit](/docs/workflows/frameworks/spec-kit) 更合适。 |
| 多角色 handoff 复杂 | OpenSpec 只解决一部分。 | [BMAD](/docs/workflows/frameworks/bmad) 更适合。 |
| agent 执行过程混乱 | OpenSpec 不直接管执行方法。 | [Superpowers](/docs/workflows/community-frameworks/superpowers) 更适合。 |

## 常见切换路径

- 从没有框架直接进入 OpenSpec，适合治理成本敏感的 brownfield 团队。
- 如果 proposal 越写越大，已经接近 feature 规格，应升级到 [Spec Kit](/docs/workflows/frameworks/spec-kit)。
- 如果 proposal 后面还要跨多个角色持续推进，说明需要 [BMAD](/docs/workflows/frameworks/bmad)。
- 如果 proposal 很稳，但实现阶段 agent 经常跑偏，可在执行层叠加 [Superpowers](/docs/workflows/community-frameworks/superpowers)。

## 组合方式

- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：OpenSpec 很适合承接高频维护型变化。
- [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)：proposal 通过后，可直接进入异步 PR 流程。
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)：对小改动可以维持轻量 proposal，再用终端式执行收口。

## 不要这样选

- 把所有改动都要求写 proposal，最后连小修都没人愿意走流程。
- 用 OpenSpec 包装大型项目，结果既没有完整治理，也失去轻量优势。
- 把 archive 当成可有可无的补充，最后什么都追不回来。

## 下一步怎么读

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：当你需要更完整的 spec 与 plan 链时，Spec Kit 更合适。
- [BMAD](/docs/workflows/frameworks/bmad)：当任务跨角色跨阶段时，BMAD 更能承载治理。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你要的是 agent 每天如何执行，而不是 proposal 管理层时，Superpowers 更直接。
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：OpenSpec 很适合承接高频维护型变化。
- [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)：proposal 通过后，可直接进入异步 PR 流程。

## 来源

- [OpenSpec](https://github.com/openspec-ai/openspec)
