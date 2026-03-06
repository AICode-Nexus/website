---
title: AI 架构
description: 从目录边界、上下文切片、worktree、CI 和 MCP 拓扑来设计适合 agent 的工程架构。
slug: /architecture
sidebar_label: AI 架构
tags: [ai-coding, architecture, mcp]
track: cross-track
kind: hub
audience: advanced
stage: intermediate
featured: true
pillar: architecture
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# AI 架构

## 这一类内容解决什么问题

- 如何让仓库结构更适合 agent 理解和修改
- 怎样设计上下文边界、worktree 和验证回路
- MCP server、工具、模型和权限应该如何拆层
- CI、review 和异步 agent 要怎样接回主干

## 先记住一条原则

AI 架构不是“把 AI 接进现有代码库”，而是让代码库、验证链路和工具拓扑本身更适合 agent 工作。

## 核心入口

- [AI 原生工程架构](/docs/ai-native-engineering-architecture)
- [MCP 与工具拓扑](/docs/mcp-tool-topology)
- [终端 Agent 与 CLI](/docs/ides-tooling/terminal-agents-and-cli)
- [Review 与 PR 工具链](/docs/ides-tooling/review-and-pr-tooling)

## 推荐做法

- 先画清目录边界，再扩展 agent 权限
- 先固定 worktree / branch / PR 收口策略，再谈多 agent 并行
- 先明确 MCP server 的职责和信任边界，再不断加工具

## 往下看什么

- 想先统一规则和审批：去 [AI 规范](/docs/standards)
- 想先把需求到 PR 的链路写清：去 [AI 工作流](/docs/workflows)
