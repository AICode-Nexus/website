---
title: "Claude Code 常见任务"
description: "把 Claude Code 最常见的三类任务固定成可重复的终端内 SOP。"
slug: "/tools/terminal-agents/claude-code/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
tags: ["ai-coding", "tool", "claude-code", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-common-tasks", "claude-code"]
estimated_time: 25
prerequisites: ["已跑通 Claude Code 快速开始", "仓库内可执行命令", "知道允许修改的范围"]
deliverable: "三个可复用的 Claude Code 任务模板"
---

# Claude Code 常见任务

## 前置条件

- 先完成 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 任务边界和验证方式已经写清楚。
- 你接受 Claude Code 先读仓库、再给计划、再执行。

## 步骤

### 任务 1：仓库内 bugfix

适合可复现问题。默认流程：

1. 先要求复述症状和范围。
2. 再要求定位根因。
3. 最后要求最小修复和命令验证。

直接搭配 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。

### 任务 2：补测试

适合已有逻辑但覆盖不足的模块。默认要求：

- 先列出要覆盖的分支。
- 再写测试。
- 最后回报哪些边界仍未覆盖。

### 任务 3：小步重构

适合不改变行为的结构整理。默认要求：

- 先写“不改变行为”的约束。
- 再给出小步计划。
- 每一步都附验证结果。

## 验证

每个任务都至少留下这三样东西：

- 一段任务边界说明
- 一段命令验证结果
- 一段剩余风险说明

## 下一步

- 如果最常见的问题是越界改动，先去 [Claude Code 排错](/docs/tools/terminal-agents/claude-code/troubleshooting)。
- 如果你想让这套方式长期稳定，去 [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices)。
- 如果你要把终端主入口和任务流程绑定起来，去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)

