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

## 前置条件

- 你已经看过 [Cline 概览](/docs/tools/terminal-agents/cline)，知道它更适合开放式、高控制的高级用法。
- 这次任务最好是一个局部 bugfix 或小型重构，方便你观察 Plan / Act 和 checkpoint 是否稳定。
- 你愿意明确工具权限，而不是默认全放开。

## 步骤

### 第 1 步：先把本次工具边界收紧

第一次不要追求“什么都能做”。先固定：

- 允许读取和改动哪些目录
- 哪些外部工具现在不开
- 默认验证命令是什么
- 什么情况下必须停下来交还人工

如果你还没把仓库边界写进文件，先看 [仓库规则文件体系](/docs/repo-instruction-files)。

### 第 2 步：先跑 Plan，再决定是否进入 Act

第一次不要让 Cline 直接执行。先要求它：

1. 解释任务和边界
2. 给出最小计划
3. 说明需要哪些工具
4. 只有在你确认后才进入 Act

### 第 3 步：在第一轮关键点上打 checkpoint

如果任务会改多个文件，先做最小改动并留 checkpoint。这样一旦方向错了，你可以快速回退，而不是让错误继续扩散。任务类型可以直接参考 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

### 第 4 步：只在必要时叠加 MCP 或浏览器工具

开放能力是 Cline 的价值，但第一次闭环不要一上来全开。只有当纯仓库任务无法完成时，再补相关工具。若任务开始需要多 lane 推进，再转到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。

## 验证

- Plan 阶段真的先于执行，而不是形式化走过场。
- 你能解释为什么给了这些工具权限。
- 一旦改动不对，checkpoint 能让你快速回退。

## 下一步

- 去 [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks) 固定高频 SOP。
- 如果权限、provider 或 checkpoint 经常出问题，去 [Cline 排错](/docs/tools/terminal-agents/cline/troubleshooting)。
- 如果你想把开放壳层用成长期系统，去 [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)。

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
