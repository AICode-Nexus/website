---
title: "Gemini CLI 最佳实践"
description: "让 Gemini CLI 长期稳定工作的关键，是把 context file、脚本验证和 PR 说明写成固定习惯。"
slug: "/tools/terminal-agents/gemini-cli/best-practices"
sidebar_label: "最佳实践"
sidebar_position: 5
tags: ["ai-coding", "tool", "gemini-cli", "best-practices"]
track: "cross-track"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Gemini CLI 最佳实践

## 优先固化什么

- 固化最小 context file，而不是把一次性任务说明都堆进去。
- 固化脚本化验证，让 CLI 输出能直接附着在真实命令上。
- 固化一份简短交付模板，方便进入 PR 或 review 流。

## 什么时候最值

- 你已经习惯 terminal-first 开发。
- 多数任务集中在 bugfix、重构、脚本检查和仓库巡检。
- 团队愿意把规则文件版本化到仓库里。

## 什么时候该换打法

- 如果任务开始需要更深执行栈和并行能力，切到 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。
- 如果团队更看重 repo pairing 和 worktree，切到 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 如果最终交付主要发生在平台里，就把 Gemini CLI 降为本地补位入口。

## 下一步

- 回到 [Gemini CLI 概览](/docs/tools/terminal-agents/gemini-cli)。
- 回到 [Issue / Jira -> Draft PR Tooling](/docs/workflows/patterns/issue-to-draft-pr/tooling)。
- 如果你还没写清规则边界，回到 [仓库规则文件体系](/docs/repo-instruction-files)。
