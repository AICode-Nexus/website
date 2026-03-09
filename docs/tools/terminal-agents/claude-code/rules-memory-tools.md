---
audience: "mixed"
stage: "intermediate"
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
title: "Claude Code：规则、记忆与工具边界"
description: "Claude Code 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/claude-code/rules-memory-tools"
sidebar_label: "补充：规则与边界"
sidebar_position: 7
tags: ["ai-coding", "tool", "claude-code"]
---

# Claude Code：规则、记忆与工具边界

## 现在先做什么

- 第一次收紧终端边界：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 想把终端 pairing 用成长期系统：去 [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices)。
- 想先把 repo 合同写清：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 什么时候读这页

- 你准备长期保留 Claude Code，而不是只偶尔跑一次。
- 你要决定 CLAUDE.md、AGENTS.md 和团队公共规则谁优先。
- 你已经开始担心“终端里很顺，但一换人就断”。

## 应该写进 repo 的东西

- 目录边界、验证命令、审批要求和必须保留的交付证据。
- 哪些任务必须切 worktree，哪些目录改动要人工确认。
- review 时必须附上的命令结果、风险说明和回退方式。

## 只留在工具里的东西

- 单次排障时的临时提示语和短期会话上下文。
- 个人 shell 习惯、输出偏好和不值得版本化的微型规则。
- 会话内的临时计划，但不要把它们当成唯一知识源。

## 失控信号

- CLAUDE.md 里没有关键规则，只能靠口头补充。
- 执行证据回不到仓库，只剩工具里一句“完成了”。
- 同一个仓库换个人使用后，行为差异大到无法 review。

## 读完回哪里

- 想先把边界收紧：回 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 想看长期使用的固定写法：去 [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices)。
- 想先把 repo 规则整理清楚：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 来源

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
