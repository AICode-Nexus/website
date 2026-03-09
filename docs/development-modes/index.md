---
title: AI 开发方式
description: 用开发方式而不是单一工具名来组织 AI 协作，先决定默认入口、控制边界和人机分工。
slug: /development-modes
sidebar_label: AI 开发方式
tags: [ai-coding, development-modes, workflow]
track: cross-track
kind: hub
content_form: hub
audience: mixed
stage: starter
featured: true
domain: development-modes
journey_stage: raw-need
entry_role: domain
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 开发方式

## 现在先做什么

- 如果你还没跑过任何主线，先去 [30 分钟上手](/docs/start/30-minute-quick-start)。
- 如果你已经要开始真实任务，先去 [工作流教程首页](/docs/workflows)。

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

## 怎么为团队选默认方式

不要直接从产品功能表开始，而要先回答下面 4 个问题：

1. 你们最常见的任务是高频局部修改，还是长任务异步交付。
2. 你们希望 AI 主要在 IDE、终端还是 GitHub 工作系统里接任务。
3. 哪些目录或命令必须保留人工审批。
4. 最终由谁负责收口 diff、验证结果和 PR 说明。

如果答案还不清楚，最稳妥的默认组合通常是：

- 日常开发用 `IDE-first` 或 `terminal-first`
- 明确范围的长任务再交给 `async-agent-first`
- 高风险改动统一保留 `human-in-the-loop`

## 推荐的落地顺序

### 第一步：先给任务分型

把任务先拆成 4 类：

- 讨论 / 研究
- 小范围修改
- 可验证长任务
- 异步委派任务

### 第二步：给每类任务配默认入口

例如：

- 讨论 / 研究 -> 聊天式或 planning mode
- 小范围修改 -> IDE agent 或 terminal agent
- 可验证长任务 -> background agent 或 worktree
- 异步委派任务 -> GitHub / Jira / cloud agent

### 第三步：补规则与门禁

开发方式一旦选定，下一步不是继续换工具，而是给它补齐：

- 规则文件
- 权限边界
- 验证命令
- review 收口方式

## 推荐阅读顺序

1. [AI 开发方式总览](/docs/development-modes-landscape)
2. [开始这里](/docs/start/start-here)
3. [学习路径](/docs/start/learning-paths)
4. [Agent 执行模式](/docs/development-modes/agent-execution-modes)
5. [终端 Agent 全景](/docs/terminal-agent-landscape)

## 常见误区

- 把“买了哪个工具”当成“已经有开发方式”
- 同一团队同时推 4 套默认入口，结果没人知道什么场景该用什么
- 还没定义人类接管点，就急着上异步 agent
- 只讨论模型强弱，不讨论任务类型、验证方式和工作系统

## 往下看什么

- 想先判断默认入口：去 [AI 编程工具](/docs/tools)
- 想先把交付链路定下来：去 [AI 工作流](/docs/workflows)
- 想先统一边界和约束：去 [AI 规范](/docs/standards)
- 想从仓库结构和 MCP 拓扑下手：去 [AI 架构](/docs/architecture)
