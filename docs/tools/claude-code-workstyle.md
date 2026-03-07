---
title: Claude Code 入门与工作方式
description: 用官方文档信号理解 Claude Code 为什么更适合 terminal-first 协作，以及 CLAUDE.md 应该在组织里扮演什么角色。
slug: /claude-code-workstyle
sidebar_label: Claude Code 工作方式
tags: [ai-coding, claude-code, terminal-agent]
track: cross-track
kind: guide
audience: mixed
stage: intermediate
featured: false
pillar: tools
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# Claude Code 入门与工作方式

## 先给结论

Claude Code 不应被理解成“另一个终端聊天工具”，而更像一套 `terminal-first` 的开发方式：

- 默认在仓库上下文里工作
- 强调显式规则文件
- 适合先计划、再执行、再验证的控制链路

## 更适合谁

- 后端、基础设施、CLI、monorepo 团队
- 想把规则文件和团队约束版本化到仓库的人
- 不希望 IDE 成为唯一 AI 入口的人

## 关键能力要点

### 1. 终端是默认入口

Claude Code 的核心体验不是 IDE 内联补全，而是围绕仓库、命令和验证回路展开。

### 2. `CLAUDE.md` 是长期资产

官方文档已经把 `CLAUDE.md` 明确纳入 Claude Code 的记忆/指令体系。这意味着团队可以把：

- 仓库结构
- 目录边界
- 必跑命令
- 审批条件

直接版本化进仓库。

### 3. 更适合强约束流程

如果组织要求：

- 改前先给计划
- 改后必须报告验证结果
- 高风险改动不能顺手扩边界

Claude Code 这类 terminal-first 入口通常比纯 IDE-first 更稳。

## 推荐接入方式

1. 先写一版最小 `CLAUDE.md`
2. 再接固定验证命令
3. 再决定是否把它作为默认入口或备用入口

## 常见错误

- 把 Claude Code 当成“更强的聊天框”
- 没有 `CLAUDE.md` 就开始要求稳定产出
- 计划、执行、验证仍然混在同一轮里

## 来源

- Anthropic Docs: [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- Anthropic Docs: [CLAUDE.md memory file](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)

## 延伸阅读

- [Claude Code Handbook](/docs/tools/terminal-agents/claude-code)
- [终端 Agent 全景](/docs/terminal-agent-landscape)
- [仓库规则文件体系](/docs/repo-instruction-files)
- [AI 开发方式总览](/docs/development-modes-landscape)
