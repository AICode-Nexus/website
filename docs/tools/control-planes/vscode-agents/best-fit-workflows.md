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
title: "VS Code Agents：最适合的工作流"
description: "VS Code Agents 最适合承接哪些工作流，以及不适合单独承接什么。"
slug: "/tools/control-planes/vscode-agents/best-fit-workflows"
sidebar_label: "补充：工作流适配"
sidebar_position: 6
tags: ["ai-coding", "tool", "vscode-agents"]
---

# VS Code Agents：最适合的工作流

## 现在先做什么

- 第一次跑通控制面闭环：去 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 想固定高频控制面 SOP：去 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks)。
- 想直接进入最自然的工作流：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 什么时候读这页

- 你已经知道 VS Code Agents 能做什么，现在只想判断它该接哪一段流程。
- 你要决定它是主控制面，还是只做局部补位入口。
- 你在分本地探索、后台执行和编辑器审阅的边界。

## 默认优先搭配

- [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)：这是它最自然的主线。
- [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)：适合本地修复后顺手补跑验证。
- [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)：适合先在本地规划，再交给后台推进。

## 不该拿它单独做什么

- 纯终端文化团队的唯一主入口。
- 以 GitHub 平台为绝对中心的唯一工作系统。
- 本来就很小、没有后台交接必要的单点任务。

## 读完回哪里

- 想直接开跑：回 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 想看真实 handoff：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)。
- 想继续补平台与执行栈分工：去 [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/tools/compare/github-copilot-vs-vscode-agent-vs-openai-codex)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
