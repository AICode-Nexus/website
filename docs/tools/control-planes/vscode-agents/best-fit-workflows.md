---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "tech-selection"
title: "VS Code Agents：工作流适配"
description: "VS Code Agents 适合接哪类工作流，以及不适合接什么。"
slug: "/tools/control-planes/vscode-agents/best-fit-workflows"
sidebar_label: "工作流适配"
tags: ["ai-coding", "tool", "vscode-agents"]
---

# VS Code Agents：工作流适配

## 适合接什么

- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：这是 VS Code Agents 最自然的主线。
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：本地修复与后台补跑结合得比较顺。
- [Spec-First](/docs/workflows/patterns/spec-first)：适合先在本地规划，再把明确任务交给后台。

## 场景判断

| 场景 | 为什么适合 | 搭配入口 |
| --- | --- | --- |
| Local -> Background -> Cloud | 这是 VS Code Agents 最自然的主线。 | GitHub Copilot |
| Bugfix / Refactor / Test | 本地修复与后台补跑结合得比较顺。 | OpenAI Codex |
| Spec-First | 适合先在本地规划，再把明确任务交给后台。 | Superpowers |

## 常见任务

- 在本地读代码、起草方案，然后发给 background agent 继续执行。
- 结合终端、浏览器和编辑器 diff 做交互式修复。
- 用统一工作台接入第三方 agent 或 MCP 风格工具。

## 不适合接什么

- 纯终端文化团队，不愿意依赖编辑器控制面。
- 想要 GitHub 平台即入口，而不是 editor 先行的组织。
- 只需轻量 CLI 助手，不需要本地/后台统一调度的场景。

## 默认搭配

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。

## 下一步

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。
- [VS Code Agents：集成、review 与治理](/docs/ecosystem/integrations/vscode-agents)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
