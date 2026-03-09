---
title: "Claude Code 排错"
description: "当 Claude Code 在权限、边界、验证或上下文上出问题时，按固定顺序排查。"
slug: "/tools/terminal-agents/claude-code/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "claude-code", "troubleshooting"]
track: "cross-track"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Claude Code 排错

## 常见卡点

- 一上来就越界改动太多文件。
- 只给代码，不给命令验证结果。
- 仓库规则、目录边界或禁止修改区没有写清。
- 任务本身太大，却还想用一次对话硬推完。

## 诊断顺序

1. 先看边界有没有写清。
2. 再看验证命令能不能稳定执行。
3. 再看任务是不是已经超过 Claude Code 当前这一轮该处理的粒度。

大多数问题都不是工具坏了，而是任务合同太松。

## 回退策略

- 缩小改动范围，只保留一个模块。
- 改成先给计划、再给第一步执行。
- 把大任务切回 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 或 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 继续阅读

- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
- [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)
- [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices)

## 来源

- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)

