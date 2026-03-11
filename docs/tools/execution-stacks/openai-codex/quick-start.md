---
title: "OpenAI Codex 快速开始"
description: "用 OpenAI Codex 跑通第一次长任务式 AI coding 协作，并留下计划、执行和验证证据。"
slug: "/tools/execution-stacks/openai-codex/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "openai-codex", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: true
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "openai-codex"]
estimated_time: 25
prerequisites: ["一个需要阶段推进的真实任务", "可执行的 build 或 test 命令", "已可使用 OpenAI Codex"]
deliverable: "一份带计划、执行和验证记录的最小任务结果"
---

# OpenAI Codex 快速开始

## 这页适合什么场景

- 任务不是一次问答能结束，而是需要按阶段推进。
- 你希望每一轮都保留计划、执行和验证证据。
- 你要验证的是“执行栈是否稳”，而不是“模型能不能写一段代码”。

## 前置条件

- 你已经确定任务不是单点聊天问答，而是需要阶段推进的真实改动。
- 仓库里至少有一个稳定验证命令。
- 你已经看过 [OpenAI Codex 概览](/docs/tools/execution-stacks/openai-codex)，知道它更像执行栈。

## 20 到 25 分钟交付目标

第一次 quick start 只需要做到：

- 定义一轮清晰阶段，而不是一次性做完整 feature。
- 让 Codex 先给阶段计划，再执行。
- 留下一份能够决定“下一阶段要不要继续”的证据链。

## 推荐第一条任务

第一次建议优先挑这些任务：

- 已经知道改动方向的中小型重构
- 一段需要跨多个文件但边界明确的修复
- 已经有 spec 或拆解结果的阶段性实现

第一次不要用这些任务试 Codex：

- 需求和实现都还没收口的 feature
- 根本没有验证命令的仓库
- 必须频繁人工交互才能继续的 UI 调整

## 步骤

### 第 1 步：先写阶段目标

第一次不要让 Codex 一次推进完整 feature。先把任务拆成：

- 这一轮只做什么
- 这一轮的验证方式
- 完成后交付什么证据

可以直接写成这个模板：

```text
阶段目标：
本轮范围：
明确不做：
验证命令：
交付证据：
下一阶段触发条件：
```

### 第 2 步：让 Codex 先给计划

要求它先给计划、再执行。最小要求：

1. 复述任务边界
2. 给出阶段计划
3. 只推进当前阶段
4. 回报命令结果

第一次可以直接这样发：

```text
请先复述当前阶段的目标、范围和禁止修改区。
然后给出一个 3 到 5 步的阶段计划。
只有在计划确认后再执行当前阶段。
执行结束后，必须回报实际命令结果、未完成项和下一阶段建议。
```

### 第 3 步：把验证和计划绑在一起

如果你现在做的是结构性改动，直接搭配 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。这样 Codex 的优势会落在“阶段推进”，而不是落在“一次做完全部改动”。

### 第 4 步：只在阶段完成后做下一轮决策

第一次 quick start 的收尾不是“看起来差不多就继续”，而是根据证据判断：

- 当前阶段是否真的完成
- 命令结果是否支持继续下一阶段
- 是否需要把下一轮交回 owner 或换工具补位

如果你发现当前任务其实只是小步维护，直接收缩到 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start) 或 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 会更顺。

## 验收清单

第一次成功至少满足这四条：

- 计划、执行和验证结果是同一条链。
- 当前阶段的命令结果清楚可见。
- 你能决定下一阶段是否继续，而不是被大 diff 裹挟。
- 你能指出这次为什么适合执行栈，而不是平台或轻量终端工具。

## 常见失误

- 没有阶段边界，第一次就要求 Codex 一口气做完整需求。
- 计划和执行脱节，只留下大段 diff，没留下阶段判断。
- 命令结果只是口头复述，没有真实输出或失败信号。
- 本来是 spec-first 问题，却没有任何阶段说明就直接开跑。

## 下一步

- 回到 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。
- 如果阶段推进经常失控，先去 [OpenAI Codex 排错](/docs/tools/execution-stacks/openai-codex/troubleshooting)。
- 如果你今天只做维护类小任务，切到 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。

## 来源

- [OpenAI Codex](https://openai.com/index/introducing-the-codex-app/)
- [OpenAI Codex Upgrades](https://openai.com/index/codex-upgrades/)
