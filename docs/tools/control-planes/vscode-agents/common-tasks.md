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

## 这页适合处理什么任务

- 任务需要在本地探索、后台执行和编辑器审阅之间切换。
- 你想固定的是 handoff 节奏，而不是某个单工具的补全方式。
- 你愿意区分控制面和执行层，不把编辑器当成唯一执行栈。

## 前置条件

- 先完成 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 你已经接受一件事：它最有价值的部分是控制和切换，不是单点全包。
- 当前任务最好能拆成本地探索与后台执行两个阶段。

## 使用前先固定三件事

- 本地阶段必须产出结构化 brief，而不是一段散乱聊天记录。
- background agent 的允许改动目录和停止条件要写死。
- 回到编辑器后必须有人审 diff、查日志、做最终判断。

## 步骤

### 任务 1：本地探索后转后台执行

适合需要先读代码、看依赖、写 brief 的任务。先在本地代理里收敛边界，再把执行部分交给 background agent。标准搭配是 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

开始前先准备：

- 当前问题面和初步判断
- 允许改动目录
- 必须回传的命令和证据

默认 brief 模板：

```text
目标：
已确认事实：
允许改动：
不要改：
验证命令：
什么时候必须停下交还人工：
```

成功信号：

- 本地阶段真的减少了后台试错
- background agent 只执行被授权的部分
- 回来后 diff 和日志都能对上最初 brief

切换条件：

- 如果本地阶段已经能直接做完，就别强行转后台
- 如果后台执行明显需要长阶段推进，补 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)

### 任务 2：编辑器内 diff 审阅与局部修补

适合后台结果已经出来，但仍需要人工在编辑器里理解改动并做小步修补。这里不要再让 agent 无限扩展范围，优先切成 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 那样的小闭环。

开始前先整理：

- 这轮只接受哪些文件和改动
- 哪些内容需要人工重写或删掉
- 这轮修补后跑什么验证

默认要求：

```text
先根据已有 diff 解释改动意图和风险。
只修补本轮明确列出的文件或问题，不要扩大范围。
修补后提醒我重新执行哪条验证命令，并说明本轮仍未解决的点。
```

成功信号：

- 你在编辑器里能快速读懂为什么这样改
- 修补后没有把后台结果重新扩散成更大任务
- 最终审阅仍掌握在人手里

切换条件：

- 如果这轮已经变成完整新任务，就回到本地探索重新写 brief
- 如果只是局部小修，也可以直接收缩到 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)

### 任务 3：长任务的阶段性 handoff

适合 spec 已经定稿、但实现还需要多个阶段推进的任务。VS Code Agents 可以承担阶段切换和上下文交接，执行栈则交给 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) 这类更擅长长任务的入口。

开始前先写清：

- 当前是第几阶段
- 这一阶段只交付什么
- 本阶段结束后由谁判断是否继续

默认要求：

```text
把当前阶段当成独立 handoff。
只推进这一阶段，结束后必须回传计划完成度、验证结果和下一阶段建议。
没有这些证据，不进入下一轮。
```

成功信号：

- 阶段之间交接清楚，不靠聊天记忆硬接
- 编辑器真正承担了控制面角色
- 你可以随时停在某一阶段，而不是被连续执行裹挟

切换条件：

- 如果 spec 仍然不稳定，先回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)
- 如果任务其实已经完全平台化，改走 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)

## 验收清单

每次任务都检查：

- 本地探索是否真的产出可交接 brief
- background agent 是否只做了授权阶段
- 最终审阅是否回到了人手里，而不是只看一句“完成了”
- 任务切换是否真的减少了噪音，而不是为了分层而分层

## 常见误用

- 把 VS Code Agents 当成万能入口，本地不探索就直接派后台
- brief 只写目标，不写目录范围、验证命令和停止条件
- 回到编辑器后不看日志、不看 diff，只看一句摘要
- 本来只需本地小修，却强行拆成本地、后台、平台三段

## 下一步

- 去 [VS Code Agents 排错](/docs/tools/control-planes/vscode-agents/troubleshooting)。
- 去 [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)。
- 如果你主要想在 IDE 内稳定做小步任务，也可以对比 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
