---
title: MCP 与工具拓扑
description: 用模型、工具、MCP server、规则文件和权限边界来理解 AI 编程系统的真实拓扑，而不是把一切都混成“智能助手”。
slug: /mcp-tool-topology
sidebar_label: MCP 与工具拓扑
tags: [ai-coding, mcp, architecture]
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

# MCP 与工具拓扑

## 先给结论

如果组织开始同时使用多个 agent、多个工具入口和多个外部系统，就必须从“对话框思维”升级为“拓扑思维”。

最小拓扑通常至少包括：

- 模型
- agent / client
- 本地工具
- MCP server
- 规则文件
- 权限与审批边界

## 为什么 MCP 重要

MCP 不是某个单独工具的新插件，而是在把“模型如何安全、可审查地连接工具”抽象成标准层。

这会直接影响：

- 工具如何被发现
- 哪些 server 可以被信任
- 哪些能力只能本地暴露，哪些可以远端暴露

## 一个实用分层

### 第 1 层：模型

决定推理、编码和工具调用能力。

### 第 2 层：agent / client

决定入口体验，例如 IDE、终端、后台 agent、GitHub 平台。

### 第 3 层：MCP server

决定工具能力如何暴露给 agent。

### 第 4 层：规则与权限

决定 agent 能不能调用、调用到什么程度、什么时候必须停下。

## 常见错误

- 把 MCP 只理解成“装更多插件”
- 没有 server 信任边界就开放高权限工具
- 工具拓扑越来越复杂，但没有对应的文档和审批层

## 来源

- Model Context Protocol: [Introduction](https://modelcontextprotocol.io/introduction)
- Model Context Protocol: [Architecture overview](https://modelcontextprotocol.io/docs/architecture)
- OpenAI: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)

## 延伸阅读

- [AI 原生工程架构](/docs/ai-native-engineering-architecture)
- [仓库规则文件体系](/docs/repo-instruction-files)
