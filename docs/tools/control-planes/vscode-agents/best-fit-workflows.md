---
title: "VS Code Agents：最适合的工作流"
description: "VS Code Agents 最适合承接哪些工作流，以及不适合单独承接什么。"
slug: "/tools/control-planes/vscode-agents/best-fit-workflows"
sidebar_label: "最适合的工作流"
tags: ["ai-coding", "tool", "vscode-agents"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# VS Code Agents：最适合的工作流

工具选型的关键，不是“它能不能做很多事”，而是它最适合承接哪一段 workflow。如果主入口和默认工作流对不上，再强的模型和 UI 也会变成频繁切换上下文的负担。

## 最适合承接的工作流

- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：这是 VS Code Agents 最自然的主线。
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：本地修复与后台补跑结合得比较顺。
- [Spec-First](/docs/workflows/patterns/spec-first)：适合先在本地规划，再把明确任务交给后台。

## 最好不要单独承接的工作

- 纯终端文化团队，不愿意依赖编辑器控制面。
- 想要 GitHub 平台即入口，而不是 editor 先行的组织。
- 只需轻量 CLI 助手，不需要本地/后台统一调度的场景。

## 推荐组合

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。

## 典型任务

- 在本地读代码、起草方案，然后发给 background agent 继续执行。
- 结合终端、浏览器和编辑器 diff 做交互式修复。
- 用统一工作台接入第三方 agent 或 MCP 风格工具。
