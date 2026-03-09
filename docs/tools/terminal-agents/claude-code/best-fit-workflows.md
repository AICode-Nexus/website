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
journey_stage: "tech-selection"
title: "Claude Code：最适合的工作流"
description: "Claude Code 最适合承接哪些工作流，以及不适合单独承接什么。"
slug: "/tools/terminal-agents/claude-code/best-fit-workflows"
sidebar_label: "补充：工作流适配"
sidebar_position: 6
tags: ["ai-coding", "tool", "claude-code"]
---

# Claude Code：最适合的工作流

## 现在先做什么

- 第一次跑通终端 pairing：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 想固定高频终端 SOP：去 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)。
- 想直接进入默认主线：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 什么时候读这页

- 你已经知道 Claude Code 能跑起来，现在只想判断它该接哪一段流程。
- 你在决定它是默认主入口，还是只负责长任务和高控制场景。
- 你在比较终端 pairing、平台收口和云端执行栈的分工。

## 默认优先搭配

- [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)：这是它最自然的主线。
- [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)：适合 owner 驱动的 worktree 并行。
- [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)：适合复现、修复、验证一条线完成。

## 不该拿它单独做什么

- 完全不想看 shell、diff 和命令输出的团队主入口。
- 高度依赖浏览器人工操作或重视觉检查的唯一工作流。
- 已经把 GitHub 平台当成唯一系统、不想再维护终端规则文件的组织。

## 读完回哪里

- 想直接开跑：回 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 想固定终端高频动作：去 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)。
- 想看真实 repo pairing 收口：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。
- 想比较终端执行栈怎么分工：去 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)。

## 来源

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
