---
audience: "advanced"
stage: "advanced"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "implementation"
title: "Cline：规则、记忆与工具边界"
description: "Cline 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/cline/rules-memory-tools"
sidebar_label: "补充：规则与边界"
sidebar_position: 7
tags: ["ai-coding", "tool", "cline"]
---

# Cline：规则、记忆与工具边界

## 现在先做什么

- 第一次收紧权限和工具边界：去 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)。
- 想把开放能力用成长期系统：去 [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)。
- 想先把 repo 合同写清：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 什么时候读这页

- 你准备长期保留 Cline，而不是只偶尔试一次。
- 你要决定 repo 规则、工具权限和 provider 配置分别归谁管。
- 你已经开始担心“同一个仓库，不同人配置完全不同”。

## 应该写进 repo 的东西

- AGENTS.md、目录边界、验证命令和必须保留的交付证据。
- 哪些命令允许执行，哪些目录必须人工确认。
- MCP、provider 或高风险权限的 owner、审批和回退方式。

## 只留在工具里的东西

- 临时实验模型、个人 UI 习惯和短期会话状态。
- 单次排障时的局部提示语，不值得进入 repo 的临时约束。
- checkpoint 或临时执行上下文，但不要把它们当成唯一事实源。

## 失控信号

- repo 里找不到关键规则，只能去每个人自己的配置里猜。
- provider、MCP 或权限问题出了事，但没人能说清 owner。
- diff 和验证证据回不到仓库，只剩工具里一句“已经完成”。

## 读完回哪里

- 想先把基础边界收紧：回 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)。
- 想看长期使用的固定写法：去 [Cline 最佳实践](/docs/tools/terminal-agents/cline/best-practices)。
- 想横向看开放栈规则问题：去 [AI IDE Landscape](/docs/tools/ai-ide-landscape)。

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
