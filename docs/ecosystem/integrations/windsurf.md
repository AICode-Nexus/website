---
audience: "individual"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "ecosystem"
journey_stage: "implementation"
title: "Windsurf：集成、review 与治理"
description: "Windsurf 如何接工作系统、保留 review 证据并纳入治理。"
slug: "/ecosystem/integrations/windsurf"
sidebar_label: "集成与治理"
tags: ["ai-coding", "tool", "windsurf"]
---

# Windsurf：集成、review 与治理

Windsurf 的治理重点，不是“工作台够不够顺”，而是“AGENTS.md、rules 和记忆层会不会把流程藏进产品内部”。一体化体验确实能减少切换，但如果规则、记忆和 repo 合同没有分层，团队一旦换入口就会丢失关键工作流。

## 默认集成拓扑

| 集成面 | 默认接法 | 治理重点 |
| --- | --- | --- |
| 工作台主线 | workspace、rules、memories、模型切换。 | 一体化不等于可以替代 repo 合同。 |
| 仓库接入 | AGENTS.md discovery、测试命令、目录边界。 | 规则优先级必须说清。 |
| 证据回流 | session summary、diff、命令结果、PR 描述。 | 工作台顺滑体验不能替代 review 资产。 |
| 最终收口 | GitHub review、CI、人工 merge。 | memory 不能替代人工最终判断。 |

## 什么时候适合把它接进正式工作系统

- 个人或小团队希望把日常 AI coding 收在同一工作台里。
- AGENTS.md、rules 和记忆层能被清楚分工，而不是互相覆盖。
- 你更看重连续工作流和产品化体验，而不是开放壳层自由度。
- 团队能接受 Windsurf 是工作台入口，不是全部工程基础设施。

## review 证据最低集

至少保留四类证据：

- 当前任务从哪来，范围是什么。
- 工作台内的关键 session summary 和任务接续信息。
- 最终 diff、测试和命令结果。
- 哪些知识已回写到 repo，哪些只是短期记忆。

如果关键结论只存在 memory 中，而没有进入 repo 或 PR，这套工作台就不可治理。

## 上线前先定的四个 owner

- `工作台 owner`：定义 Windsurf 负责哪类连续式 IDE 任务。
- `规则 owner`：负责 AGENTS.md 与产品内 rules 的优先级。
- `memory owner`：负责记忆层的卫生、刷新时机和失效条件。
- `平台收口 owner`：保证最终仍由 PR、CI 和 merge gate 收口。

## 默认审批边界

- 记忆层只承载短中期上下文，不承载唯一业务规则。
- AGENTS.md 里的正式合同优先于产品内便捷规则。
- 复杂长任务或开放工具编排需求，应切去执行栈或开放壳层。
- 入口一换就会断的流程，说明还不适合团队级 rollout。

## 最小 rollout 路径

1. 先从高频 IDE 维护任务试点，而不是一开始就覆盖整个团队流程。
2. 固定 session summary、PR 证据和 memory hygiene 的最小模板。
3. 再把需要连续上下文的长一些任务接进来。
4. 只有当规则优先级和记忆清理都稳定后，才讨论更大范围 rollout。

## 什么时候不要继续扩大

- 团队无法解释 memories、rules 与 repo contract 的边界。
- 入口一换，关键工作流就断。
- 真正复杂任务仍主要依赖外部平台或执行栈。
- 记忆层积累太多，已经开始隐藏真实流程和判断依据。

## 配套组合

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：工作台做日常入口，GitHub 做最终 review。
- [OpenSpec](/docs/workflows/frameworks/openspec)：高频 brownfield 变化先在提案层收敛。
- [Windsurf：规则与边界](/docs/tools/ide-first/windsurf/rules-memory-tools)：先把 AGENTS.md、rules 和记忆层分层。

## 下一步怎么读

- 去 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks) 固定一体化工作台里的高频任务模板。
- 去 [Windsurf：优点与替代](/docs/tools/ide-first/windsurf/tradeoffs-and-boundaries) 判断它是否还值得继续做主工作台。
- 如果你要更成熟的 IDE-first 对照路线，改读 [Cursor：集成、review 与治理](/docs/ecosystem/integrations/cursor)。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
