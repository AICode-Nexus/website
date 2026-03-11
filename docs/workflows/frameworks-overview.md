---
title: AI 工作流框架总览
description: 用复杂度、适用场景和产出物来比较 BMAD、Spec Kit、OpenSpec 与 Superpowers，避免把不同层的问题混成一类。
slug: /workflows/frameworks-overview
sidebar_label: 工作流框架总览
tags: [ai-coding, workflow, framework]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: tech-selection
entry_role: domain
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 工作流框架总览

这些框架解决的不是同一个问题。真正该比较的，不是“谁更先进”，而是你今天最缺哪一层合同:

- [BMAD](/docs/workflows/frameworks/bmad)：跨角色、多阶段、带显式 handoff 的团队交付骨架。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：把 `spec -> plan -> tasks` 固定成 planning 主线。
- [OpenSpec](/docs/workflows/frameworks/openspec)：为 brownfield 高频小改动保留 proposal、change 和 archive。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：为高频 agent 用户固定 brainstorming、worktree、lane、review 的日常执行方法。

## 先按什么判断

先看这四个问题，而不是先看框架名：

- 你缺的是多角色治理，还是缺 planning 产物链。
- 你面对的是新功能和跨模块任务，还是高频小改动。
- 你需要的是“为什么做”的决策记录，还是“每天怎么做”的执行纪律。
- 团队现在能维护多重 ritual，还是只扛得住一条轻量主线。

## 四类框架的默认分工

| 框架 | 核心合同 | 最适合的任务形状 | 第一次不要这样用 |
| --- | --- | --- | --- |
| [BMAD](/docs/workflows/frameworks/bmad) | 角色、阶段、handoff 与治理停点。 | 跨需求、架构、执行、验证三个以上阶段的任务。 | 不要用它承接一天内能收口的小活。 |
| [Spec Kit](/docs/workflows/frameworks/spec-kit) | `spec -> plan -> tasks` 三级产物链。 | 新功能、跨模块改动、需求容易漂移的实现。 | 不要在没读仓库前把三份文档一次写完。 |
| [OpenSpec](/docs/workflows/frameworks/openspec) | proposal、change、archive 的轻量变更记录。 | brownfield、小功能、兼容调整、维护性重构。 | 不要把每个 typo 都拉成完整 proposal。 |
| [Superpowers](/docs/workflows/community-frameworks/superpowers) | brainstorming、worktree、lane、review packet 的执行纪律。 | 已经高频用 coding agents，想稳定日常方法的人。 | 不要把它当成替代 repo 规则的万能增强包。 |

## 如果你今天只想做一个决定

按这条顺序判断通常最稳：

1. 如果你的核心痛点是多角色 handoff，经常在阶段交接时失真，先看 [BMAD](/docs/workflows/frameworks/bmad)。
2. 如果你的核心痛点是需求和实现之间总断层，先看 [Spec Kit](/docs/workflows/frameworks/spec-kit)。
3. 如果你的核心痛点是现有项目里的高频小变更没有留下决策痕迹，先看 [OpenSpec](/docs/workflows/frameworks/openspec)。
4. 如果你的核心痛点不是 planning，而是 agent 日常执行波动很大，先看 [Superpowers](/docs/workflows/community-frameworks/superpowers)。

## 推荐阅读顺序

同一套框架下，最省时间的读法是：

1. 先读对应框架的 `概览`，确认它到底解决哪类问题。
2. 再读 `边界与替代方案`，确认是不是该选它，而不是硬上。
3. 然后读 `接入手册`，决定第一次试点怎么跑。
4. 最后看 `角色阶段与产物` 和 `误用与退出条件`，判断如何落地和何时减法。

## 常见组合方式

- `Spec Kit + Superpowers`：前者固定 planning 合同，后者固定执行纪律。
- `OpenSpec + Bugfix / Refactor / Test`：前者记录为什么改，后者固定怎么修和怎么验。
- `BMAD + Parallel Worktrees / Multi-Agent`：前者管组织 handoff，后者管低耦合 lane 的执行。
- `Spec Kit + Local -> Background -> Cloud`：适合先定 plan，再把执行交给后台或云端。

## 不要混着上的方式

- 不要同时要求团队把四套框架都学会，再去做第一次试点。
- 不要把重框架当成“专业感”来源，而不是看它是否减少返工。
- 不要让社区方法层替代 repo 规则、CI、PR 审批和 owner 责任。
- 不要因为工具入口很强，就误以为框架问题已经自动解决。

## 暂时放在观察名单里的候选

- `Hyperpowers`：更像衍生方法，还没形成与 Superpowers 同级的稳定骨架。
- `Claude Flow`：更偏 orchestration runtime，优先放进多 agent 或异步协作专题，而不是和 planning 框架并列。

## 下一步怎么读

- [BMAD](/docs/workflows/frameworks/bmad)
- [Spec Kit](/docs/workflows/frameworks/spec-kit)
- [OpenSpec](/docs/workflows/frameworks/openspec)
- [Superpowers](/docs/workflows/community-frameworks/superpowers)
- [AI 工作流总览](/docs/workflows)
