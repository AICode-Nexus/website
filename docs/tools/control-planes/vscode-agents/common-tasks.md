---
title: "VS Code Agents 常见任务"
description: "把 VS Code Agents 最自然的控制面任务固定成可复用 SOP。"
slug: "/tools/control-planes/vscode-agents/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
tags: ["ai-coding", "tool", "vscode-agents", "tutorial"]
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
tutorial_series: ["tool-common-tasks", "vscode-agents"]
estimated_time: 30
prerequisites: ["已跑通 VS Code Agents 快速开始", "知道哪些任务适合本地探索后再交接", "仓库有验证命令"]
deliverable: "三个适合 VS Code Agents 的控制面 SOP"
---

# VS Code Agents 常见任务

## 前置条件

- 先完成 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 你已经接受一件事：它最有价值的部分是控制和切换，不是单点全包。
- 当前任务最好能拆成本地探索与后台执行两个阶段。

## 步骤

### 任务 1：本地探索后转后台执行

适合需要先读代码、看依赖、写 brief 的任务。先在本地代理里收敛边界，再把执行部分交给 background agent。标准搭配是 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

### 任务 2：编辑器内 diff 审阅与局部修补

适合后台结果已经出来，但仍需要人工在编辑器里理解改动并做小步修补。这里不要再让 agent 无限扩展范围，优先切成 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 那样的小闭环。

### 任务 3：长任务的阶段性 handoff

适合 spec 已经定稿、但实现还需要多个阶段推进的任务。VS Code Agents 可以承担阶段切换和上下文交接，执行栈则交给 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) 这类更擅长长任务的入口。

## 验证

每次任务都检查：

- 本地探索是否真的产出可交接 brief
- background agent 是否只做了授权阶段
- 最终审阅是否回到了人手里，而不是只看一句“完成了”

## 下一步

- 去 [VS Code Agents 排错](/docs/tools/control-planes/vscode-agents/troubleshooting)。
- 去 [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)。
- 如果你主要想在 IDE 内稳定做小步任务，也可以对比 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
