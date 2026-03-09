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

## 前置条件

- 已完成 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)。
- 你已经接受一件事：Windsurf 的优势是把 rules、记忆和 IDE 连成一体，而不是替代仓库合同。
- 当前任务最好发生在同一个工作区里连续推进。

## 步骤

### 任务 1：高频维护型 bugfix

适合在 IDE 内读代码、做小步改动、立刻回看 diff 的任务。最自然的搭配仍然是 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

### 任务 2：基于规则的连续式实现

适合多轮修改发生在同一仓库、同一工作区，并且规则能减少重复说明的任务。

### 任务 3：从本地连续推进到更长任务

适合先在 IDE 内保持连续上下文，再把后续执行或平台收口接到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 验证

- 规则确实帮你减少重复输入，而不是把仓库事实藏进产品里。
- 记忆只保留稳定知识，没有把一次性任务说明长期固化。
- 一旦任务离开 IDE 主场，你会主动切换到更合适的入口。

## 下一步

- 去 [Windsurf 排错](/docs/tools/ide-first/windsurf/troubleshooting)。
- 去 [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)。
- 如果你更想比较开放壳层路线，可以对比 [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks)。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
