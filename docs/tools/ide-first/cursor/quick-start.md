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

## 前置条件

- 你已经决定把 IDE 当成主入口。
- 代码仓库里至少有一个可以稳定执行的验证命令。
- 你已经看过 [Cursor 概览](/docs/tools/ide-first/cursor)，知道它更适合 IDE-first 协作。

## 步骤

### 第 1 步：先补规则和边界

第一次进入仓库时，不要急着让 Cursor 大改代码。先把规则文件、禁止修改区和最小验证命令写清楚。

### 第 2 步：只选一个最小任务

优先从这些任务开始：

- 小范围 bugfix
- 一段组件或函数的小步重构
- 一组已有逻辑的测试补充

### 第 3 步：让 Cursor 先计划、再改动、再验证

无论你用对话、编辑器内联改动还是多文件协作，第一次都要坚持这条顺序。需要任务模板时，直接配合 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 验证

第一次成功的标准：

- 规则真的生效了，改动没有越界。
- 你执行了验证命令。
- 最终结果不是“改了很多”，而是“完成了一次可解释的最小闭环”。

## 下一步

- 回到 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)。
- 如果上下文或规则经常跑偏，去 [Cursor 排错](/docs/tools/ide-first/cursor/troubleshooting)。
- 如果你想把 IDE 入口和工作流结合起来，去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 来源

- [Cursor Documentation](https://docs.cursor.com/)

