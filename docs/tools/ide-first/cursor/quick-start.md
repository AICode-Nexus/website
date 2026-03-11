---
title: "Cursor 快速开始"
description: "用 Cursor 在 IDE 里完成第一次 AI coding 协作，固定规则、选择任务并验证结果。"
slug: "/tools/ide-first/cursor/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "cursor", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "individual"
stage: "starter"
featured: true
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "cursor"]
estimated_time: 20
prerequisites: ["已安装 Cursor", "有一个真实代码仓库", "仓库里至少有一个验证命令"]
deliverable: "一次在 IDE 内完成并验证的最小改动"
---

# Cursor 快速开始

## 这页适合什么场景

- 你准备把 IDE 当成主要工作台，而不是临时聊天窗口。
- 任务规模适合在编辑器里完成一轮阅读、改动和验证。
- 你要先验证规则、边界和 diff 质量，而不是追求一次性大改。

## 前置条件

- 你已经决定把 IDE 当成主入口。
- 代码仓库里至少有一个可以稳定执行的验证命令。
- 你已经看过 [Cursor 概览](/docs/tools/ide-first/cursor)，知道它更适合 IDE-first 协作。

## 20 分钟交付目标

第一次 quick start 只需要做到：

- 在工作区里把规则、禁止修改区和验证命令写清楚。
- 用一个最小任务跑通“计划 -> 改动 -> 验证”。
- 你能解释这次 diff 为什么还在 IDE-first 的舒适区内。

## 推荐第一条任务

优先从这些任务开始：

- 小范围 bugfix
- 一段组件或函数的小步重构
- 一组已有逻辑的测试补充

第一次不要用 Cursor 试这些任务：

- 需要大量跨系统协调的 feature
- 明显需要后台长任务执行的重构
- 还没有规则和验证命令的仓库

## 步骤

### 第 1 步：先补规则和边界

第一次进入仓库时，不要急着让 Cursor 大改代码。先把规则文件、禁止修改区和最小验证命令写清楚。

至少写清这四项：

```text
当前任务：
允许改动目录：
不要修改：
验证命令：
```

### 第 2 步：只选一个最小任务

优先从这些任务开始：

- 小范围 bugfix
- 一段组件或函数的小步重构
- 一组已有逻辑的测试补充

如果任务已经开始涉及阶段拆解、handoff 或多轮执行，就不要继续硬塞在 IDE 里，及时转到 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

### 第 3 步：让 Cursor 先计划、再改动、再验证

无论你用对话、编辑器内联改动还是多文件协作，第一次都要坚持这条顺序。需要任务模板时，直接配合 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

第一次可以直接用这个要求：

```text
请先复述任务边界和禁止修改区。
给出一个最小计划，只做第一轮最小改动。
改完后请明确告诉我改了哪些文件、为什么这样改，并提醒我执行哪个验证命令。
```

### 第 4 步：在 IDE 里看懂 diff，再决定要不要继续

第一次 quick start 的重点不是“Cursor 一次做完”，而是你能在编辑器里快速判断：

- diff 有没有越界
- 规则是否真的生效
- 是否值得继续下一轮

## 验收清单

第一次成功的标准：

- 规则真的生效了，改动没有越界。
- 你执行了验证命令。
- 最终结果不是“改了很多”，而是“完成了一次可解释的最小闭环”。
- 你能明确判断这次是否还适合继续留在 IDE 内推进。

## 常见失误

- 没先补规则，就直接让 Cursor 跨文件大改。
- 一上来就把大 feature 扔进 IDE，结果上下文和 diff 都开始漂移。
- 只看生成结果，不自己在编辑器里审一遍改动逻辑。
- 任务已经明显变成长链路执行，却还坚持留在单轮 IDE 协作里。

## 下一步

- 回到 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)。
- 如果上下文或规则经常跑偏，去 [Cursor 排错](/docs/tools/ide-first/cursor/troubleshooting)。
- 如果你想把 IDE 入口和工作流结合起来，去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 来源

- [Cursor Documentation](https://docs.cursor.com/)
