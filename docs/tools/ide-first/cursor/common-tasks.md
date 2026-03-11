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

## 这页适合处理什么任务

- 任务主要在 IDE 内完成，重点是读代码、改代码、立刻验证。
- 你想固定的是小步工作台节奏，而不是平台交接流。
- 当前任务不需要长阶段推进或后台执行。

## 前置条件

- 先完成 [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)。
- IDE 内的规则和边界已经固定。
- 当前任务不需要大规模跨阶段推进。

## 使用前先固定三件事

- 当前任务的允许改动目录必须写清。
- 每轮都只允许一个最小目标。
- 修改完成后必须回到 IDE 里自己审 diff 和跑验证。

## 步骤

### 任务 1：局部组件或函数改造

适合在上下文比较明确的文件里做小步优化。重点不是改得多，而是随时可验证。

开始前先准备：

- 当前文件或模块
- 这轮不改变的行为
- 验收命令

默认要求：

```text
请先解释当前实现问题和这轮只改什么。
给出最小计划，只改当前组件或函数附近的内容。
改完后说明为什么这样改，并提醒我执行哪个验证命令。
```

成功信号：

- diff 仍然集中在当前局部
- 行为边界没有被顺手扩大
- 你能快速在 IDE 里看懂改动意图

切换条件：

- 如果开始涉及多个阶段或多个系统，改去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)

### 任务 2：补全或改写一段已有实现

适合已有骨架、缺细节的场景。要求 Cursor 先说明改动意图，再动代码。

开始前先准备：

- 当前骨架或接口
- 缺失细节是什么
- 哪些现有行为不能变

默认要求：

```text
请先说明你准备补全或改写哪一段，以及为什么这样做。
只改当前实现缺口，不扩大到周边重构。
改完后指出受影响文件和验证方式。
```

成功信号：

- 补全内容和现有骨架一致
- 没有借机把周边实现重写
- 受影响范围可控

切换条件：

- 如果发现骨架本身需要重做，先把任务拆开，不要继续在一轮内硬顶

### 任务 3：补测试和修小 bug

适合已有行为边界的任务。可以直接搭配 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。

开始前先准备：

- 复现方式或待覆盖行为
- 当前模块规则
- 测试或检查命令

默认要求：

```text
请先复述这轮 bug 或测试目标，只做当前模块内最小修改。
完成后给出改动理由、验证结果和仍未覆盖的风险点。
```

成功信号：

- bugfix 或测试改动都能在 IDE 内快速验证
- 没有从小任务膨胀成结构性改造
- 规则文件真的约束了输出

切换条件：

- 如果 bugfix 已经需要跨模块排查，改去 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks) 或 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks)

## 验收清单

- 每次任务都要留下改动理由。
- 每次任务都要跑至少一个验证命令。
- 如果规则没跟上，就先停下来补规则，而不是继续叠指令。
- 每轮任务都仍然保持在 IDE-first 的小步舒适区。

## 常见误用

- 在没有清楚规则的情况下直接多文件大改
- 补全一段实现时顺手重写周边逻辑
- 只看回答，不回到 IDE 里自己审 diff
- 任务已经明显超出 IDE 小步范围，却还不切换入口

## 下一步

- 去 [Cursor 排错](/docs/tools/ide-first/cursor/troubleshooting)。
- 去 [Cursor 最佳实践](/docs/tools/ide-first/cursor/best-practices)。
- 如果你要转到平台交付，去 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。

## 来源

- [Cursor Documentation](https://docs.cursor.com/)
