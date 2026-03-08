---
title: AI 原生工程架构
description: 从目录边界、上下文切片、worktree、验证链路和 CI 设计，构建更适合 agent 的工程架构。
slug: /ai-native-engineering-architecture
sidebar_label: AI 原生工程架构
tags: [ai-coding, architecture, worktree]
track: cross-track
kind: guide
content_form: guide
domain: architecture
journey_stage: project-architecture
entry_role: domain
audience: advanced
stage: advanced
featured: false
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# AI 原生工程架构

## 先给结论

AI 原生工程架构的目标不是“让 agent 有更多权限”，而是让仓库、上下文和验证链路天然更适合 agent 工作。

## 设计重点

### 1. 目录边界清楚

让 agent 能快速判断：

- 哪些目录是高风险
- 哪些目录可以局部自治
- 哪些文件必须人工确认

### 2. 上下文切片稳定

不要让 agent 每次都重新推断系统边界。把核心边界显式写进规则文件和文档。

### 3. worktree / branch 策略明确

长任务、后台 agent 和并行执行必须有隔离策略，否则很容易互相覆盖。

### 4. 验证链路可复用

让 lint、test、build、type check 能被不同入口复用，而不是只绑定某个 IDE。

### 5. CI 是最后收口层

AI 产出必须回到统一 CI，而不是在本地“看起来差不多就算了”。

## 当前官方信号

- OpenAI Codex 官方介绍持续强调 parallel agents 和 worktrees。
- VS Code agents 文档明确把 background agents 与 git worktrees 绑定。
- GitHub Copilot coding agent 继续把 issue / review / PR 接回正式工作系统。

这意味着仓库结构和交付链路已经成为产品竞争点的一部分。

## 来源

- OpenAI: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- VS Code Docs: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- GitHub Docs: [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
