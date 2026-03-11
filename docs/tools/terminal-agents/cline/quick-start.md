---
title: "Cline 快速开始"
description: "用 Plan / Act、checkpoints 和最小工具边界，在 Cline 里跑通第一次开放式 agent 闭环。"
slug: "/tools/terminal-agents/cline/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "cline", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "advanced"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "cline"]
estimated_time: 25
prerequisites: ["Cline 已可使用", "你能控制模型与工具权限", "本地仓库至少有一个验证命令"]
deliverable: "一次带 Plan / Act、checkpoint 和验证结果的最小仓库任务闭环"
---

# Cline 快速开始

## 这页适合什么场景

- 你需要的是开放式 agent 壳层，而不是开箱即用的收口平台。
- 你愿意亲自控制工具权限、Plan / Act 和 checkpoint。
- 这次任务足够小，能让你观察开放能力有没有真正受控。

## 前置条件

- 你已经看过 [Cline 概览](/docs/tools/terminal-agents/cline)，知道它更适合开放式、高控制的高级用法。
- 这次任务最好是一个局部 bugfix 或小型重构，方便你观察 Plan / Act 和 checkpoint 是否稳定。
- 你愿意明确工具权限，而不是默认全放开。

## 20 到 25 分钟交付目标

第一次 quick start 只需要做到：

- 收紧工具权限，而不是追求什么都能做。
- 真正跑完一轮 Plan，再决定是否进入 Act。
- 在一个关键点留 checkpoint，验证开放壳层仍然可控。

## 推荐第一条任务

第一次建议选：

- 局部 bugfix
- 小型重构
- 需要你观察多个文件改动但仍有清晰边界的任务

第一次不要选：

- 权限和外部工具都不确定的大任务
- 没有验证命令的仓库
- 需要平台级交接和多人 review 才能收口的流程型任务

## 步骤

### 第 1 步：先把本次工具边界收紧

第一次不要追求“什么都能做”。先固定：

- 允许读取和改动哪些目录
- 哪些外部工具现在不开
- 默认验证命令是什么
- 什么情况下必须停下来交还人工

如果你还没把仓库边界写进文件，先看 [仓库规则文件体系](/docs/repo-instruction-files)。

第一次最好再明确一件事：哪些外部工具这轮完全不开。

### 第 2 步：先跑 Plan，再决定是否进入 Act

第一次不要让 Cline 直接执行。先要求它：

1. 解释任务和边界
2. 给出最小计划
3. 说明需要哪些工具
4. 只有在你确认后才进入 Act

第一次可以直接这样要求：

```text
先进入 Plan，不要直接执行。
请解释任务边界、需要的工具权限、停止条件和最小计划。
只有我确认后，你才进入 Act。
```

### 第 3 步：在第一轮关键点上打 checkpoint

如果任务会改多个文件，先做最小改动并留 checkpoint。这样一旦方向错了，你可以快速回退，而不是让错误继续扩散。任务类型可以直接参考 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

### 第 4 步：只在必要时叠加 MCP 或浏览器工具

开放能力是 Cline 的价值，但第一次闭环不要一上来全开。只有当纯仓库任务无法完成时，再补相关工具。若任务开始需要多 lane 推进，再转到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。

## 验收清单

- Plan 阶段真的先于执行，而不是形式化走过场。
- 你能解释为什么给了这些工具权限。
- 一旦改动不对，checkpoint 能让你快速回退。
- 你没有为了“更强”而把本不需要的工具都打开。

## 常见失误

- 第一次就把权限全放开，导致后面根本看不出哪里越界了。
- Plan 只是口头存在，实际上还是直接进 Act。
- 没有 checkpoint，出了问题只能靠人工找 diff。
- 明明只是普通仓库任务，却过早叠加浏览器、MCP 和多工具执行。

## 下一步

- 去 [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks) 固定高频 SOP。
- 如果权限、provider 或 checkpoint 经常出问题，去 [Cline 排错](/docs/tools/terminal-agents/cline/troubleshooting)。
- 如果你想把开放壳层用成长期系统，去 [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)。

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
