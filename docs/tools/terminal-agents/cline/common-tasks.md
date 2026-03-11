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

## 这页适合处理什么任务

- 你需要开放式 agent 壳层，但又想把风险压在可控范围里。
- 任务要么需要 Plan / Act，要么需要 checkpoint，要么需要按需开工具。
- 你愿意亲自判断权限和停止条件。

## 前置条件

- 已完成 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)。
- 你已经接受一个前提：开放能力越强，边界越要靠你自己写清。
- 当前任务不是“一把梭”，而是可以拆清阶段和权限的任务。

## 使用前先固定三件事

- 先定义默认关闭哪些工具，而不是先想能开什么。
- Plan 必须先于 Act，不允许直接跳执行。
- checkpoint 要服务于回退，不是装饰。

## 步骤

### 任务 1：Plan / Act 驱动的局部修复

适合先计划、再执行、再验证的维护任务。Plan 阶段要先指出影响面和回退点，再进入 Act。最常见的落点还是 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

开始前先准备：

- 当前任务范围
- 可用工具权限
- 失败后的回退点

默认要求：

```text
先进入 Plan，解释任务边界、影响面、回退点和需要的工具权限。
只有在计划确认后才进入 Act。
执行结束后回报真实命令结果和剩余风险。
```

成功信号：

- 计划不是形式化存在，而是真的限制了执行
- 你能解释为什么这次开了这些权限
- Act 结束后有明确命令和结果

切换条件：

- 如果任务仍然边界不清，先停在 Plan，不要硬执行
- 如果并不需要开放能力，改用更轻的 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)

### 任务 2：带 checkpoint 的多文件调整

适合会改多个文件、但又不想一次性放大风险的任务。每完成一段就打 checkpoint，必要时快速回退。

开始前先准备：

- 本轮最多改几处
- checkpoint 触发点
- 回退后如何继续

默认要求：

```text
请按小步推进，每完成一个关键点就留 checkpoint。
一旦验证失败或方向不对，停在当前 checkpoint，不继续扩散改动。
```

成功信号：

- 你能在中途安全停下
- 多文件改动仍然可解释
- checkpoint 真正承担了止损作用

切换条件：

- 如果任务已经天然是多 lane 并行，改用 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)
- 如果只是一处局部改动，不必为了“高级”而强上 checkpoint

### 任务 3：需要 MCP 或外部工具补位的任务

适合纯仓库上下文不够时，再接浏览器、MCP 或其他外部工具。但如果任务已经天然是多 lane 并行，就直接用 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook) 定义 owner 与 lane。

开始前先准备：

- 为什么纯仓库任务不够
- 必须开启哪类额外工具
- 哪些工具这轮仍保持关闭

默认要求：

```text
只有当纯仓库能力不足时，才逐项开启外部工具。
请先解释开启理由、使用边界和停止条件。
没有这些说明，不进入外部工具执行。
```

成功信号：

- 新开工具是为了解决明确缺口，不是为了“更强”
- 使用后能解释它解决了什么
- 额外工具没有顺势扩大任务边界

切换条件：

- 如果最终主要价值在长期稳定执行，而不是开放壳层，可转 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)

## 验收清单

- 每个任务都说明了为什么要开这些工具权限。
- checkpoint 不是摆设，而是真的承担回退作用。
- 输出里保留了命令、diff 和剩余风险。
- 没有把开放能力误用成任务拆分不清的借口。

## 常见误用

- 一开始就全开权限，后面根本看不出哪里越界
- Plan 还没清楚就急着进 Act
- 用 checkpoint 掩盖任务本身拆分不清
- 只因为 Cline 能接外部工具，就把不需要的工具也打开

## 下一步

- 去 [Cline 排错](/docs/tools/terminal-agents/cline/troubleshooting)。
- 去 [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)。
- 如果你更想要产品化 IDE 工作台，可以对比 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks)。

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
