---
title: "Windsurf 常见任务"
description: "把 Windsurf 最自然的一体化 IDE 任务固定成可复用 SOP。"
slug: "/tools/ide-first/windsurf/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
tags: ["ai-coding", "tool", "windsurf", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "individual"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-common-tasks", "windsurf"]
estimated_time: 25
prerequisites: ["已跑通 Windsurf 快速开始", "规则边界已写清", "当前任务以 IDE 内维护为主"]
deliverable: "三个适合 Windsurf 的 IDE 工作流 SOP"
---

# Windsurf 常见任务

## 这页适合处理什么任务

- 任务适合在一体化 IDE 工作台里连续推进。
- rules 和记忆能减少重复说明，但不会取代仓库合同。
- 你想固定的是工作台节奏，而不是开放式工具控制。

## 前置条件

- 已完成 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)。
- 你已经接受一件事：Windsurf 的优势是把 rules、记忆和 IDE 连成一体，而不是替代仓库合同。
- 当前任务最好发生在同一个工作区里连续推进。

## 使用前先固定三件事

- 这轮哪些规则留在 workspace，哪些必须写回 repo，要先分清。
- 记忆只保留长期稳定知识，不保留一次性任务细节。
- 每轮改动后都要用仓库验证命令而不是只看工作台摘要。

## 步骤

### 任务 1：高频维护型 bugfix

适合在 IDE 内读代码、做小步改动、立刻回看 diff 的任务。最自然的搭配仍然是 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

开始前先准备：

- 当前任务规则
- 禁止修改区
- 验收命令

默认要求：

```text
请先根据当前规则复述任务范围和不要修改的地方。
只做这轮最小 bugfix。
改完后说明 rules 和记忆分别帮到了什么，并提醒我执行验证命令。
```

成功信号：

- 规则减少了重复解释
- diff 仍然集中在当前维护任务
- 结果能回到仓库语境里解释

切换条件：

- 如果规则开始不够用，就先补 repo 规则，不要靠 memory 硬扛
- 如果任务已脱离维护节奏，转 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)

### 任务 2：基于规则的连续式实现

适合多轮修改发生在同一仓库、同一工作区，并且规则能减少重复说明的任务。

开始前先准备：

- 当前要复用的规则
- 本轮要延续的上下文
- 哪些决定必须写回仓库文件

默认要求：

```text
请基于当前规则继续推进这轮实现。
先说明哪些信息来自规则，哪些来自当前任务上下文。
不要把新的临时决定默默写进长期记忆。
```

成功信号：

- 多轮实现仍能解释清楚依据
- 规则和记忆分工清楚
- 不会把一次性决定偷偷沉淀成长期知识

切换条件：

- 如果实现开始需要阶段拆分和更长执行链路，转到 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)

### 任务 3：从本地连续推进到更长任务

适合先在 IDE 内保持连续上下文，再把后续执行或平台收口接到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

开始前先准备：

- 当前工作台内已经确认的结论
- 哪些内容要带进下一入口
- 哪些记忆不该跟着走

默认要求：

```text
请先整理这轮在 IDE 内已经确认的事实、规则和未解决问题。
只输出下一入口真正需要的 handoff，不要把所有工作台上下文都打包带走。
```

成功信号：

- handoff 清楚而克制
- 你能说明为什么下一步要离开一体化工作台
- 没把 product memory 当成跨工具唯一事实来源

切换条件：

- 如果最终只是在 IDE 内完成小任务，就不要人为制造 handoff
- 如果最终收口主要发生在平台，接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)

## 验收清单

- 规则确实帮你减少重复输入，而不是把仓库事实藏进产品里。
- 记忆只保留稳定知识，没有把一次性任务说明长期固化。
- 一旦任务离开 IDE 主场，你会主动切换到更合适的入口。
- 你能明确说明哪些知识该留在工作台，哪些必须写回 repo。

## 常见误用

- 用 memory 代替仓库规则文件
- 多轮实现中的临时结论没有写回 repo，却被默默长期保留
- 只看工作台摘要，不回到仓库执行验证
- 本来应该切换入口的任务，硬留在一体化 IDE 里拖长

## 下一步

- 去 [Windsurf 排错](/docs/tools/ide-first/windsurf/troubleshooting)。
- 去 [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)。
- 如果你更想比较开放壳层路线，可以对比 [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks)。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
