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
title: "Gemini CLI：最适合的工作流"
description: "Gemini CLI 最适合承接哪些工作流，以及不适合单独承接什么。"
slug: "/tools/terminal-agents/gemini-cli/best-fit-workflows"
sidebar_label: "补充：工作流适配"
sidebar_position: 6
tags: ["ai-coding", "tool", "gemini-cli"]
---

# Gemini CLI：最适合的工作流

## 现在先做什么

- 第一次跑通终端闭环：去 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 想固定高频终端 SOP：去 [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks)。
- 想直接进入最自然的工作流：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 什么时候读这页

- 你已经知道 Gemini CLI 能进终端，但还没判断它该接哪一段流程。
- 你想把终端执行和 PR 收口串起来。
- 你在判断它是否该做主入口，还是只做补位入口。

## 默认优先搭配

- [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)：这是它最自然的主线。
- [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)：适合终端内小步维护。
- [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)：适合把命令证据带进平台交付。

## 不该拿它单独做什么

- 长阶段并行执行栈。
- 完全不愿维护 context file 和脚本验证的团队。
- 想让一个入口同时承担平台、控制面和执行栈全部角色的场景。

## 读完回哪里

- 想直接开跑：回 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 想看真实终端到 PR 交接：去 [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。
- 想继续比较终端入口与执行栈：去 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
