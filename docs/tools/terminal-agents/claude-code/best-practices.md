---
title: "Claude Code 最佳实践"
description: "把 Claude Code 用成长期主入口时，优先固化边界、验证和小步交付，而不是追求一次性自动化。"
slug: "/tools/terminal-agents/claude-code/best-practices"
sidebar_label: "最佳实践"
sidebar_position: 5
tags: ["ai-coding", "tool", "claude-code", "best-practices"]
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

# Claude Code 最佳实践

## 优先固化什么

- 固化仓库规则，而不是固化一长串 prompt。
- 固化验证命令，而不是事后人工补判断。
- 固化小步交付和 review 节奏，而不是追求一次做完。

## 什么时候最值

- 任务发生在终端和仓库内。
- 需要频繁读 diff、跑命令、保留证据。
- 团队愿意把规则文件和边界写回 repo。

## 什么时候该换打法

- 如果主要价值在平台任务系统和 draft PR，切到 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。
- 如果主要价值在长链路阶段推进，切到 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 下一步

- 回到 [Claude Code 概览](/docs/tools/terminal-agents/claude-code) 看适用边界。
- 回到 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling) 看推荐组合。

