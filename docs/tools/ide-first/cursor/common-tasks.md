---
title: "Cursor 常见任务"
description: "把 Cursor 在 IDE 内最常见的三类任务固定成可复用模板。"
slug: "/tools/ide-first/cursor/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
tags: ["ai-coding", "tool", "cursor", "tutorial"]
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
tutorial_series: ["tool-common-tasks", "cursor"]
estimated_time: 25
prerequisites: ["已跑通 Cursor 快速开始", "规则文件已存在", "知道验证命令和禁止修改区"]
deliverable: "三个适合 Cursor 的 IDE 内任务模板"
---

# Cursor 常见任务

## 前置条件

- 先完成 [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)。
- IDE 内的规则和边界已经固定。
- 当前任务不需要大规模跨阶段推进。

## 步骤

### 任务 1：局部组件或函数改造

适合在上下文比较明确的文件里做小步优化。重点不是改得多，而是随时可验证。

### 任务 2：补全或改写一段已有实现

适合已有骨架、缺细节的场景。要求 Cursor 先说明改动意图，再动代码。

### 任务 3：补测试和修小 bug

适合已有行为边界的任务。可以直接搭配 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。

## 验证

- 每次任务都要留下改动理由。
- 每次任务都要跑至少一个验证命令。
- 如果规则没跟上，就先停下来补规则，而不是继续叠指令。

## 下一步

- 去 [Cursor 排错](/docs/tools/ide-first/cursor/troubleshooting)。
- 去 [Cursor 最佳实践](/docs/tools/ide-first/cursor/best-practices)。
- 如果你要转到平台交付，去 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。

## 来源

- [Cursor Documentation](https://docs.cursor.com/)

