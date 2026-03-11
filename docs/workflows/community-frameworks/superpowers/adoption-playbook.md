---
audience: "advanced"
stage: "advanced"
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
title: "Superpowers：接入手册"
description: "把 Superpowers 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/community-frameworks/superpowers/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "superpowers"]
---

# Superpowers：接入手册

Superpowers 最容易失败的地方，不是文档写不出来，而是进了真实仓库以后和 repo 规则、测试节奏、PR 审批完全脱钩。接入时要做的不是“把方法写进 README”，而是把它嵌进现有交付链。

## 先在哪类仓库试跑

最适合先试跑的，是已经有固定验证命令、明确 owner 和真实维护需求的仓库。第一次不要拿事故热修，也不要拿全新平台重构，而要选一个中等复杂度、确实需要两到三段执行节奏的任务。

## 试点前准备

- 先明确主入口工具是什么，是 Claude Code、Codex、Cursor 还是其他入口。
- 先把 repo contract 钉住，例如规则文件、验证命令和禁止修改区。
- 先决定哪些证据必须回到 PR、issue 或文档，而不是只留在聊天里。
- 先设定 lane 的最小粒度，避免一开始就并行到 owner 无法理解。

## 三周接入顺序

| 周期 | 应该做什么 | 最低交付 |
| --- | --- | --- |
| 第 1 周 | 固定 brainstorming note、plan 模板和 review packet 结构。 | 一套最小模板。 |
| 第 2 周 | 用 1 到 2 个真实任务试跑 lane、worktree 和验证回流。 | lane brief + verify evidence。 |
| 第 3 周 | 复盘哪些 ritual 真有价值，删掉没人使用的步骤。 | finish note + keep/drop 清单。 |

## 与仓库规范的连接

- Superpowers 负责方法层，仓库规则负责权限、目录边界和验证门禁。
- 任何 lane 结果最终都要回到 git diff、命令结果和 PR 描述，而不是停在工具面板里。
- 如果你已经使用 [Spec-First](/docs/workflows/patterns/spec-first) 或 [Spec Kit](/docs/workflows/frameworks/spec-kit)，不要替换，只要让 Superpowers 从执行阶段开始接手。
- 如果团队大量依赖 worktree，分支命名、合并顺序和 lane owner 必须写成明文规则。

## 可以扩大范围的信号

- owner 能解释每条 lane 在做什么，而不是只知道“开了很多 agent”。
- review packet 真的帮助 reviewer 判断，而不是又多一份没人看的摘要。
- brainstorming 和 plan 能减少返工，而不是只是把思考前移成更长文档。
- 工具入口不同，但执行节奏开始出现一致性。

## 该先减法的信号

- 团队开始记住框架名，却说不清每个阶段交付什么。
- lane 越来越多，但没人能稳定收口。
- review 仍主要靠口头补充，而不是靠结构化证据判断。
- 模板和 skills 越来越多，真实任务采用率却在下降。

## 下一步怎么读

- [Superpowers：角色、阶段与产物](/docs/workflows/community-frameworks/superpowers/roles-stages-and-artifacts)
- [Superpowers：误用与退出条件](/docs/workflows/community-frameworks/superpowers/risks-and-failure-modes)
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)
- [Spec-First](/docs/workflows/patterns/spec-first)

## 来源

- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers Marketplace](https://github.com/obra/superpowers-marketplace)
