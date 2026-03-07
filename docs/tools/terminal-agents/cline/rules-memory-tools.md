---
title: "Cline：规则、记忆与工具边界"
description: "Cline 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/cline/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "cline"]
track: "cross-track"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Cline：规则、记忆与工具边界

一旦一个工具开始支持 rules、memory、background task 或 MCP，它就不只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，决定了这个入口能不能长期存在。

## rules 与上下文

- 开放性越强，越需要你自己定义 repo contract、权限边界和停止条件。
- 最好把关键规则收回仓库文件，避免全靠客户端配置。
- 对同一个团队，不宜让每个人都维护完全不同的规则集。

## 记忆与状态

- checkpoint、会话状态和工具配置是主要状态层。
- 更适合实验和高度可组合场景，不天然提供统一组织记忆层。

## tools / approvals / 执行边界

- Plan / Act、browser automation、MCP、checkpoint。
- 强项是开放组合，而不是默认流程治理。

## 仓库接入建议

- 先定义哪些任务允许用开放式工具，哪些必须走更稳的标准入口。
- 高风险改动建议强制 worktree 和 checkpoint，避免开放栈误伤主工作区。
- 把 provider 与工具权限管理当成正式治理问题，而不是个人偏好。
