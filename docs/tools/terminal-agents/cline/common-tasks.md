---
title: "Cline 常见任务"
description: "把 Cline 最自然的开放式 agent 任务固定成可复用 SOP。"
slug: "/tools/terminal-agents/cline/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
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
tutorial_series: ["tool-common-tasks", "cline"]
estimated_time: 30
prerequisites: ["已跑通 Cline 快速开始", "你能手动判断何时需要开放更多工具", "仓库有明确验证命令"]
deliverable: "三个适合 Cline 的开放式任务 SOP"
---

# Cline 常见任务

## 前置条件

- 已完成 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)。
- 你已经接受一个前提：开放能力越强，边界越要靠你自己写清。
- 当前任务不是“一把梭”，而是可以拆清阶段和权限的任务。

## 步骤

### 任务 1：Plan / Act 驱动的局部修复

适合先计划、再执行、再验证的维护任务。Plan 阶段要先指出影响面和回退点，再进入 Act。最常见的落点还是 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

### 任务 2：带 checkpoint 的多文件调整

适合会改多个文件、但又不想一次性放大风险的任务。每完成一段就打 checkpoint，必要时快速回退。

### 任务 3：需要 MCP 或外部工具补位的任务

适合纯仓库上下文不够时，再接浏览器、MCP 或其他外部工具。但如果任务已经天然是多 lane 并行，就直接用 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook) 定义 owner 与 lane。

## 验证

- 每个任务都说明了为什么要开这些工具权限。
- checkpoint 不是摆设，而是真的承担回退作用。
- 输出里保留了命令、diff 和剩余风险。

## 下一步

- 去 [Cline 排错](/docs/tools/terminal-agents/cline/troubleshooting)。
- 去 [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)。
- 如果你更想要产品化 IDE 工作台，可以对比 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks)。

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
