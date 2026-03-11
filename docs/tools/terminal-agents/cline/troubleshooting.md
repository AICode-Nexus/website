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

## 先判断是不是权限和任务拆分一起失控了

这页主要处理三类故障：

- 权限开太大
- checkpoint 没起作用
- 任务拆分不清，却误以为开放能力能补回来

如果你的问题只是普通仓库小修，不要先开开放壳层，先回 [Claude Code 排错](/docs/tools/terminal-agents/claude-code/troubleshooting)。

## 常见卡点

- 一开始就把工具权限开太大，导致任务边界失控。
- 没有 checkpoint，结果改错后只能硬着头皮继续。
- 任务拆分不清，却把开放工具当成解决方案。

## 症状到原因的快速对应

- 症状：改动很快扩散到无关目录。
  原因：权限从一开始就给太宽。
- 症状：出了问题只能人工慢慢捞 diff。
  原因：没有在关键点上打 checkpoint。
- 症状：工具越来越多，但任务仍然越来越乱。
  原因：任务边界和 owner 判断没有先做好。

## 诊断顺序

1. 先看 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start) 里的权限和停止条件是否真的写清。
2. 再看 Plan 阶段有没有明确影响面和回退点。
3. 最后判断任务是不是其实该走 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 或 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。

## 修复动作

### 场景 1：权限太宽

把权限收回到当前目录、当前任务真正必需的工具。先关掉“不确定会不会用到”的那些能力。

### 场景 2：checkpoint 缺失

对多文件任务，先停下补 checkpoint，再继续。不然一旦方向错了，你没有可靠止损点。

### 场景 3：任务本身没拆清

如果你说不清：

- 当前 owner 是谁
- 这轮只做什么
- 哪些工具为什么要开

那就不要继续执行，先回 Plan 或直接换工作流。

## 回退策略

- 把权限收回到当前目录和当前任务必须的工具。
- 回到 Plan，只保留本轮最小目标。
- 对多文件任务强制加入 checkpoint，再继续执行。

## 下次避免再犯

- 默认关闭外部工具，需要时再一项项打开
- Plan 阶段必须写出影响面和回退点
- checkpoint 预先设计，不临时补救

## 什么时候直接换工具

- 长期稳定执行优先：换 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)
- 一体化 IDE 工作台优先：换 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks)
- 只是终端小步任务：换 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)

## 继续阅读

- [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks)
- [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
