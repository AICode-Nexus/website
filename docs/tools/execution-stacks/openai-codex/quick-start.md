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

## 前置条件

- 你已经确定任务不是单点聊天问答，而是需要阶段推进的真实改动。
- 仓库里至少有一个稳定验证命令。
- 你已经看过 [OpenAI Codex 概览](/docs/tools/execution-stacks/openai-codex)，知道它更像执行栈。

## 步骤

### 第 1 步：先写阶段目标

第一次不要让 Codex 一次推进完整 feature。先把任务拆成：

- 这一轮只做什么
- 这一轮的验证方式
- 完成后交付什么证据

### 第 2 步：让 Codex 先给计划

要求它先给计划、再执行。最小要求：

1. 复述任务边界
2. 给出阶段计划
3. 只推进当前阶段
4. 回报命令结果

### 第 3 步：把验证和计划绑在一起

如果你现在做的是结构性改动，直接搭配 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。这样 Codex 的优势会落在“阶段推进”，而不是落在“一次做完全部改动”。

## 验证

第一次成功的标准：

- 计划、执行和验证结果是同一条链。
- 当前阶段的命令结果清楚可见。
- 你能决定下一阶段是否继续，而不是被大 diff 裹挟。

## 下一步

- 回到 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。
- 如果阶段推进经常失控，先去 [OpenAI Codex 排错](/docs/tools/execution-stacks/openai-codex/troubleshooting)。
- 如果你今天只做维护类小任务，切到 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。

## 来源

- [OpenAI Codex](https://openai.com/index/introducing-the-codex-app/)
- [OpenAI Codex Upgrades](https://openai.com/index/codex-upgrades/)

