---
title: "VS Code Agents：规则、记忆与工具边界"
description: "VS Code Agents 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/control-planes/vscode-agents/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "vscode-agents"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# VS Code Agents：规则、记忆与工具边界

一旦一个工具开始支持 rules、memory、background task 或 MCP，它就不只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，决定了这个入口能不能长期存在。

## rules 与上下文

- 编辑器级工作区配置应与 repo 规则相互对照，而不是成为第二套事实来源。
- 当团队启用 custom agents 或 reusable prompts 时，仍要明确职责归属。
- 本地与后台 agent 共享的任务合同最好回写到仓库或工单，而不是只留在会话里。

## 记忆与状态

- 编辑器会保留会话上下文和 background task 状态，但 repo 级长期规则仍应版本化。
- 适合承载“当前任务”与“当前工作区”的短中期状态。

## tools / approvals / 执行边界

- 编辑器内代码理解、diff、终端和 background agents 是主要优势。
- 第三方 agents 与扩展机制让它更像控制面，而不是单一 vendor agent。

## 仓库接入建议

- 把常用验证命令、任务模板和目录边界写回仓库文件，减少 editor 特有配置漂移。
- 背景任务必须有 owner 和 handoff 规则，不能把编辑器当异步黑盒。
- 视觉验证、浏览器操作和终端验证最好有固定时机，不要混成一锅。
