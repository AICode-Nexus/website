---
title: AI 开发方式
description: 用开发方式而不是单一工具名来组织 AI 协作，先决定默认入口、控制边界和人机分工。
slug: /development-modes
sidebar_label: AI 开发方式
tags: [ai-coding, development-modes, workflow]
track: cross-track
kind: hub
audience: mixed
stage: starter
featured: true
pillar: development-modes
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# AI 开发方式

## 这一类内容解决什么问题

- 先确定组织默认通过什么入口和 AI 协作
- 判断哪些任务适合 IDE、终端、GitHub 或后台 agent
- 避免把工具选型误当成工作方式设计
- 给团队建立统一的人机协作边界

## 先记住一条原则

先定开发方式，再选工具。

同样是用 GitHub Copilot、Claude Code、Gemini CLI 或 Codex，不同团队仍然可能走出完全不同的交付方式。真正决定效果的不是产品名，而是：

- 默认入口是什么
- 任务如何 handoff
- 人类在哪些节点接管
- 规则、验证和 review 放在哪一层

## 当前最常见的 6 种方式

| 开发方式 | 默认入口 | 更适合的任务 |
| --- | --- | --- |
| `IDE-first` | Cursor、Windsurf、VS Code Agent | 高频交互、连续编辑、前端与应用层开发 |
| `terminal-first` | Claude Code、Gemini CLI、Cline | 仓库级控制、命令行验证、强约束改动 |
| `GitHub-first` | GitHub Copilot | issue、PR、review、Jira 协作链路 |
| `async-agent-first` | Codex、cloud/background agents | 长任务、并行 worktree、异步委派 |
| `spec-first` | 规范文档 + planning agent | 需求复杂、需要先计划后执行的任务 |
| `human-in-the-loop` | 任意入口 + 强审阅 | 高风险目录、权限敏感、架构级改动 |

## 推荐阅读顺序

1. [AI 开发方式总览](/docs/development-modes-landscape)
2. [开始这里](/docs/)
3. [学习路径](/docs/learning-paths)
4. [Agent 执行模式](/docs/models-agents/agent-execution-modes)
5. [终端 Agent 全景](/docs/terminal-agent-landscape)

## 往下看什么

- 想先判断默认入口：去 [AI 编程工具](/docs/tools)
- 想先把交付链路定下来：去 [AI 工作流](/docs/workflows)
- 想先统一边界和约束：去 [AI 规范](/docs/standards)
- 想从仓库结构和 MCP 拓扑下手：去 [AI 架构](/docs/architecture)
