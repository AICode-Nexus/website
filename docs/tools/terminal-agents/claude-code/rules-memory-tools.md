---
title: "Claude Code：规则、记忆与工具边界"
description: "Claude Code 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/claude-code/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "claude-code"]
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

# Claude Code：规则、记忆与工具边界

一旦一个工具开始支持 rules、memory、background task 或 MCP，它就不只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，决定了这个入口能不能长期存在。

## rules 与上下文

- CLAUDE.md 是长期资产，适合写 repo 结构、命令、边界和审批要求。
- 如果团队还有 AGENTS.md / GEMINI.md 等文件，需要明确职责而不是互相覆盖。
- 规则文件越清楚，Claude Code 的稳定性越高。

## 记忆与状态

- CLAUDE.md 与会话上下文一起组成主要记忆层。
- 团队共识应尽量回到版本化文件，而不是只留在个人 session 里。

## tools / approvals / 执行边界

- shell、git、worktree、MCP 和命令执行。
- 适合作为 repo 内的高控制主入口。

## 仓库接入建议

- 先写最小 CLAUDE.md，再决定是否扩展更多流程。
- 高风险任务先切 worktree，再放开更多权限。
- 所有最终交付都要附带命令证据和 diff 摘要。
