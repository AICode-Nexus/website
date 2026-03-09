---
title: "Gemini CLI 排错"
description: "当 Gemini CLI 开始只剩聊天或 context file 失控时，优先排查规则粒度、命令证据和任务规模。"
slug: "/tools/terminal-agents/gemini-cli/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "gemini-cli", "troubleshooting"]
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

# Gemini CLI 排错

## 常见卡点

- context file 写得太大，CLI 每轮都在重复解释规则。
- 输出只剩自然语言总结，没有真实命令和结果。
- 复杂任务硬塞进轻量 CLI，最后又要换别的入口收尾。

## 诊断顺序

1. 先回看 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start) 的最小规则是否仍然清晰。
2. 再看任务是不是其实更适合 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 或 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
3. 最后看团队是否真的愿意维护 context file。

## 回退策略

- 把 context file 缩回目录边界、验证命令和禁止事项三类信息。
- 要求每轮输出都带真实命令结果。
- 如果任务已经明显需要并行或长阶段推进，就切到 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 继续阅读

- [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks)
- [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices)
- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
