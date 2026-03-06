---
title: AI Coding 知识体系总表
description: 用 5 大知识支柱、内容形态和时效治理来组织 AI coding 知识，而不是按单一产品名堆目录。
slug: /taxonomy
sidebar_label: Taxonomy
tags: [ai-coding, taxonomy, knowledge-base]
track: cross-track
kind: guide
audience: mixed
stage: starter
featured: true
pillar: standards
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# AI Coding 知识体系总表

## 为什么要重构

上一阶段的站点骨架是：

- 模型与 Agent
- IDE 与工具链
- 提示词与工作流
- 团队与交付

这套结构完成了第一轮门户搭建，但已经不够承载 2026 年更主流的主题变化。当前主流内容不再只是“模型 + IDE”，而是已经明显扩展到：

- 终端 agent
- 仓库规则文件
- GitHub / Jira / PR 工作系统
- MCP 与工具拓扑
- 团队级规范与评估

## 新骨架：5 大知识支柱

### 1. AI 开发方式

解决默认入口、人机分工、控制边界和协作模式。

### 2. AI 工作流

解决 spec、planning、execution、verification、review、PR 这条交付链。

### 3. AI 编程工具

解决平台、终端 agent、AI IDE、开放式入口和观察名单。

### 4. AI 规范

解决规则文件、权限、验证、评估、review 与时效治理。

### 5. AI 架构

解决目录边界、上下文切片、worktree、CI 和 MCP 拓扑。

## 第二维：内容形态

一级结构是支柱，第二维仍然保留内容形态：

- `hub`
- `guide`
- `comparison`
- `playbook`
- `insight`

这意味着：

- `comparisons / playbooks / insights` 继续保留
- 但它们不再承担一级导航骨架
- 同一篇对比文或 playbook 仍需归入某个支柱

## 第三维：时效治理

从二阶段开始，所有知识文档统一增加：

- `pillar`
- `reviewed_at`
- `source_window_end`
- `market_status`

### `market_status` 语义

- `current`: 当前主线知识
- `watch`: 仍需高频观察
- `legacy`: 旧赛道或旧透镜，只保留兼容入口

## 旧赛道如何处理

旧的 4 条赛道不会删除：

- 继续保留原链接
- 继续保留原文资产
- 但退到“旧赛道 / 专题透镜”层

这让站点可以同时做到：

- 新结构清楚
- 旧内容不丢
- SEO 和历史链接不断

## 推荐阅读顺序

1. [开始这里](/docs/)
2. [AI 开发方式](/docs/development-modes)
3. [AI 工作流](/docs/workflows)
4. [AI 编程工具](/docs/tools)
5. [AI 规范](/docs/standards)
6. [AI 架构](/docs/architecture)
