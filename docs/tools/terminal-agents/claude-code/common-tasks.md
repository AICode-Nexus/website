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

## 这页适合处理什么任务

- 任务主要发生在终端和仓库里，而不是平台或 IDE 工作台。
- 你想固定的是 repo pairing 动作，不是平台流。
- 每次任务都能跑命令验证，并保留真实结果。

## 前置条件

- 先完成 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 任务边界和验证方式已经写清楚。
- 你接受 Claude Code 先读仓库、再给计划、再执行。

## 使用前先固定三件事

- 当前任务的目录边界必须写清。
- 默认验证命令必须能稳定执行。
- 每一轮都只交付最小可解释结果，不追求一次做完。

## 步骤

### 任务 1：仓库内 bugfix

适合可复现问题。默认流程：

1. 先要求复述症状和范围。
2. 再要求定位根因。
3. 最后要求最小修复和命令验证。

直接搭配 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。

开始前先准备：

- 复现方式
- 允许改动目录
- 验收命令

默认要求：

```text
请先复述症状、范围和禁止修改区。
定位根因后，只做最小修复。
结束后回报真实命令结果、改动摘要和剩余风险。
```

成功信号：

- 根因和修复能被同一段说明解释清楚
- 你拿到的不是泛化建议，而是仓库内具体改动
- 修复后命令结果可以直接复验

切换条件：

- 如果根因还需要长阶段探索，转到 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)
- 如果最终必须走平台收口，再接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)

### 任务 2：补测试

适合已有逻辑但覆盖不足的模块。默认要求：

- 先列出要覆盖的分支。
- 再写测试。
- 最后回报哪些边界仍未覆盖。

开始前先准备：

- 目标函数或模块
- 现有行为边界
- 可用测试命令

默认要求：

```text
请先列出这轮要覆盖的行为分支和明确不覆盖的部分。
只补当前模块最需要的测试。
最后回报测试命令结果，以及仍未覆盖的风险点。
```

成功信号：

- 测试覆盖目标明确，而不是“顺便多补一些”
- 新增测试和现有行为语义一致
- 你能看出哪些分支仍留给下一轮

切换条件：

- 如果补测试前还要先大改实现，先拆成独立任务
- 如果测试需要 UI 或跨系统环境，终端单入口可能不是最佳选择

### 任务 3：小步重构

适合不改变行为的结构整理。默认要求：

- 先写“不改变行为”的约束。
- 再给出小步计划。
- 每一步都附验证结果。

开始前先准备：

- “不改变行为”的定义
- 回退点
- 每一步之后的验证方式

默认要求：

```text
请先明确这轮重构不改变哪些行为。
给出 2 到 4 步的小步计划，每一步后都要验证。
如果某一步失败，停在当前步并回报，而不是继续扩散修改。
```

成功信号：

- 重构后的代码更清楚，但行为边界没变
- 每一步都留了验证证据
- 你能在中途停下，而不是被大 diff 裹挟

切换条件：

- 如果重构开始波及多个模块和多轮 handoff，改走 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)

## 验收清单

每个任务都至少留下这三样东西：

- 一段任务边界说明
- 一段命令验证结果
- 一段剩余风险说明

还要确认：

- 这轮范围是否仍然足够小
- 结果说明是否能让下一个人直接接手

## 常见误用

- 没写复现和验收，就让 Claude Code 直接开始修
- 补测试时顺手大改实现，最后边界失控
- 把小步重构做成整片改写，没有保留回退点
- 明明更适合平台或执行栈，却还坚持单轮终端推进

## 下一步

- 如果最常见的问题是越界改动，先去 [Claude Code 排错](/docs/tools/terminal-agents/claude-code/troubleshooting)。
- 如果你想让这套方式长期稳定，去 [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices)。
- 如果你要把终端主入口和任务流程绑定起来，去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
