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
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Terminal-First Repo Pairing：案例与工具组合"
description: "Terminal-First Repo Pairing 的代表案例，以及最适合搭配的工具或框架。"
slug: "/workflows/patterns/terminal-first-repo-pairing/examples-and-tool-fit"
sidebar_label: "补充：案例与工具"
sidebar_position: 9
tags: ["ai-coding", "workflow", "terminal-first-repo-pairing"]
---

# Terminal-First Repo Pairing：案例与工具组合

## 现在先做什么

- 想先看标准终端示例：去 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想先选默认工具组合：去 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)。
- 想先看真实终端交付：去 [Gemini CLI Terminal Audit to Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。

## 代表案例

- 在终端里审仓、定位风险，再把最小修复带回 PR。
- 在 monorepo 里跑脚本、修构建、补测试，边做边保留命令证据。
- 先在 shell 内收敛任务边界，再决定是否切 worktree 或转平台收口。

## 默认工具组合

- [Claude Code](/docs/tools/terminal-agents/claude-code)：适合高控制 repo pairing 和 worktree 收口。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合更长执行链和并行 terminal 任务。
- [Gemini CLI](/docs/tools/terminal-agents/gemini-cli)：适合轻量终端入口加 GitHub 交付。

## 常见误配

- 把终端能力当成 workflow 本身，而不是 repo pairing 的承载入口。
- 没有验证回路就硬上终端主线，最后只能盲改。
- 只看命令跑通，不看证据是否真正回到 repo 和 review。

## 读完回哪里

- 想按标准例子开工：回 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想先选入口组合：去 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)。
- 想看真实终端到 PR 交付：去 [Gemini CLI Terminal Audit to Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
