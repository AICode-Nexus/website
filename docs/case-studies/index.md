---
title: 实战案例
description: 用完整案例把工具教程、工作流和验证方式串起来，而不是只看抽象判断。
slug: /case-studies
sidebar_label: 实战案例
tags: [ai-coding, case-study]
track: cross-track
kind: hub
content_form: hub
audience: mixed
stage: starter
featured: false
domain: workflows
journey_stage: implementation
entry_role: index
reviewed_at: 2026-03-08
source_window_end: 2026-03-08
market_status: current
---

# 实战案例

案例页不替代教程页。它们的作用，是把“任务从哪里来、为什么这样选入口、最后靠什么验证”放回同一条可复盘链路。你应该用它们判断一条做法能不能复制，而不是只刷成功故事。

## 先按任务形状进入

- 如果你当前要修一个真实 bug，先看 [Claude Code Bugfix 闭环](/docs/case-studies/claude-code-bugfix-loop)。
- 如果你想先在终端里做巡检和最小修复，再进入 PR 流，先看 [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。
- 如果你要先在本地收敛边界，再交给后台推进，先看 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)。
- 如果你要并行拆 lane 并最终由 owner 收口，先看 [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)。
- 如果你主要在 IDE 工作台里连续维护，再进入 PR 流，先看 [Windsurf 维护到 PR 交接案例](/docs/case-studies/windsurf-maintenance-to-pr)。
- 如果你要把 issue 推成 draft PR，先看 [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff)。
- 如果你要推进长链路改动并保留验证证据，先看 [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification)。

## 再按主入口补看

| 你主要用什么入口 | 先看哪篇案例 | 读完后该回哪里 |
| --- | --- | --- |
| 平台型入口 | [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff) | [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start) |
| 控制面 | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start) |
| 执行栈 | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) |
| 终端入口 | [Claude Code Bugfix 闭环](/docs/case-studies/claude-code-bugfix-loop) 或 [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr) | [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) |
| IDE 工作台 | [Windsurf 维护到 PR 交接案例](/docs/case-studies/windsurf-maintenance-to-pr) | [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start) 或 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start) |

## 读案例时只看这四件事

1. 输入约束是什么，任务到底从哪里来。
2. 为什么是这个入口或这个工作流，不是别的。
3. 哪些证据让 reviewer 能判断“这次可以继续”。
4. 哪些边界说明了这条路不该继续扩大。

## 推荐阅读顺序

先看背景和输入约束，确认它是不是你的任务类型。再看执行过程，判断步骤是否可复制。最后看结果与复盘，判断这个方案的边界，不要只复制“成功动作”而忽略它为什么成功。

## 什么时候别再继续看案例

- 你已经找到了和自己任务足够接近的案例，就应该回对应教程或 runbook 动手。
- 如果你连续看了两篇，仍然说不清自己要哪条主线，说明问题在选型，不在案例数量，回 [对比与选型](/docs/comparisons)。
- 如果你已经知道入口，但不知道怎么把任务收口到验证和 merge，回 [AI 工作流教程](/docs/workflows)。

## 推荐搭配的教程

- [工具教程首页](/docs/tools)
- [工作流教程首页](/docs/workflows)
- [AI 工作流实操手册](/docs/workflows/playbooks/workflow-playbook)
- [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)
- [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)

## 下一步

- 如果你已经知道自己缺的是哪条流程，回到 [工作流教程首页](/docs/workflows)。
- 如果你还在比较主入口，回到 [工具教程首页](/docs/tools)。
- 如果你需要先跑最短主线，回到 [30 分钟上手](/docs/start/30-minute-quick-start)。
