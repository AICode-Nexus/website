---
title: "Cursor：规则、记忆与工具边界"
description: "Cursor 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/ide-first/cursor/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "cursor"]
track: "cross-track"
kind: "guide"
audience: "individual"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Cursor：规则、记忆与工具边界

一旦一个工具开始支持 rules、memory、background task 或 MCP，它就不只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，决定了这个入口能不能长期存在。

## rules 与上下文

- `.cursor/rules` 适合放入口专用规则，但仓库级真实边界仍应有统一来源。
- 不要把所有团队制度都塞进 IDE 规则里，避免入口切换后失效。
- 最好定义哪些规则是个人偏好，哪些是团队必须遵守的 contract。

## 记忆与状态

- 规则、上下文和 background agent 状态是核心状态层。
- 更适合承载 IDE 使用习惯和当前任务上下文，不适合替代 repo 规则文件。

## tools / approvals / 执行边界

- IDE 编辑、rules、background agents。
- 适合高频主入口，而不是唯一平台或唯一执行栈。

## 仓库接入建议

- 把 repo contract 与 `.cursor/rules` 分层管理，避免同一规则写两遍且互相打架。
- background agent 的验收要回到 PR、测试和 repo 证据里。
- 如果团队多人共用 Cursor，最好定规则目录和命名约定。
