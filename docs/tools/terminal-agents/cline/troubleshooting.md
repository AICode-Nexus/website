---
title: "Cline 排错"
description: "当 Cline 的开放能力开始失控时，优先排查权限、checkpoint 和任务拆分，而不是继续加上下文。"
slug: "/tools/terminal-agents/cline/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "cline", "troubleshooting"]
track: "cross-track"
kind: "guide"
content_form: "guide"
audience: "advanced"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Cline 排错

## 常见卡点

- 一开始就把工具权限开太大，导致任务边界失控。
- 没有 checkpoint，结果改错后只能硬着头皮继续。
- 任务拆分不清，却把开放工具当成解决方案。

## 诊断顺序

1. 先看 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start) 里的权限和停止条件是否真的写清。
2. 再看 Plan 阶段有没有明确影响面和回退点。
3. 最后判断任务是不是其实该走 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 或 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。

## 回退策略

- 把权限收回到当前目录和当前任务必须的工具。
- 回到 Plan，只保留本轮最小目标。
- 对多文件任务强制加入 checkpoint，再继续执行。

## 继续阅读

- [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks)
- [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
