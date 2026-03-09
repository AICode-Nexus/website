---
title: AI 架构
description: 从目录边界、上下文切片、worktree、CI 和 MCP 拓扑来设计适合 agent 的工程架构。
slug: /architecture
sidebar_label: AI 架构
tags: [ai-coding, architecture, mcp]
track: cross-track
kind: hub
content_form: hub
audience: advanced
stage: intermediate
featured: true
domain: architecture
journey_stage: project-architecture
entry_role: domain
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 架构

## 现在先做什么

- 如果你还没稳定日常任务流，先去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果你先要跑通最短主线，回到 [30 分钟上手](/docs/start/30-minute-quick-start)。

## 这一类内容解决什么问题

- 如何让仓库结构更适合 agent 理解和修改
- 怎样设计上下文边界、worktree 和验证回路
- MCP server、工具、模型和权限应该如何拆层
- CI、review 和异步 agent 要怎样接回主干

## 先记住一条原则

AI 架构不是“把 AI 接进现有代码库”，而是让代码库、验证链路和工具拓扑本身更适合 agent 工作。

## 先做哪三件事

### 1. 画清目录边界

让 agent 能根据目录就判断职责边界，而不是每次都靠长 prompt 解释。

### 2. 设计隔离执行

明确 worktree、branch、sandbox、审批和网络边界，避免高风险任务直接污染主工作区。

### 3. 设计接回主干的路径

无论 agent 在 IDE、CLI 还是云端运行，最终都必须接回统一的验证、review 和 PR 流程。

## 核心入口

- [AI 原生工程架构](/docs/ai-native-engineering-architecture)
- [MCP 与工具拓扑](/docs/mcp-tool-topology)
- [终端 Agent 与 CLI](/docs/tools/terminal-agents-and-cli)
- [质量门禁与 Review](/docs/standards/review-quality-gates)

## 推荐做法

- 先画清目录边界，再扩展 agent 权限
- 先固定 worktree / branch / PR 收口策略，再谈多 agent 并行
- 先明确 MCP server 的职责和信任边界，再不断加工具

## 常见误区

- 还没定边界，就先上后台或云端 agent
- 让 MCP server 同时承担知识检索、执行代理和权限仲裁
- 把 CI 只当成构建系统，不把它视为 agent 验证回路的一部分

## 往下看什么

- 想先统一规则和审批：去 [AI 规范](/docs/standards)
- 想先把需求到 PR 的链路写清：去 [AI 工作流](/docs/workflows)
