---
title: "Local -> Background -> Cloud Runbook"
description: "先在本地收敛问题和边界，再把可执行部分交给后台，最后在平台或 PR 系统中收口结果。"
slug: "/workflows/patterns/local-to-background-to-cloud/runbook"
sidebar_label: "Runbook"
sidebar_position: 2
tags: ["ai-coding", "workflow", "local-to-background-to-cloud", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "advanced"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-runbook", "local-to-background-to-cloud"]
estimated_time: 35
prerequisites: ["本地仓库可运行验证命令", "至少有一个 background agent 或 cloud task 入口", "最终收口发生在 PR 或任务系统里"]
deliverable: "一份串起本地发现、后台执行和平台收口的完整交付记录"
---

# Local -> Background -> Cloud Runbook

## 前置条件

- 当前任务需要先在本地读代码、跑命令和缩小边界。
- 后台阶段有明确执行入口，而不是只是一句“稍后再做”。
- 最终平台收口能承载 diff、日志和 reviewer 判断。

## 步骤

1. 先在本地做 discovery，写清目标、范围、风险和验证方式。
2. 再把已经收敛的任务说明交给 background agent 或 cloud task。
3. 回到平台或 PR 系统查看日志、diff 和状态，而不是只看一句完成提示。
4. 最终由 owner 合并本地发现与后台结果，完成最终判断。

最自然的入口组合通常是：

- 本地控制面用 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)
- 长阶段执行用 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- 平台收口用 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)

## 验证

- 本地阶段真的产出结构化 brief。
- 后台阶段保留了可追踪日志和验证结果。
- 平台收口阶段能清楚映射“本地发现 -> 后台执行 -> 最终 review”。

## 下一步

- 去看 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 去看 [Local -> Background -> Cloud 风险与切换条件](/docs/workflows/patterns/local-to-background-to-cloud/pitfalls)。
- 去看 [Local -> Background -> Cloud Tooling](/docs/workflows/patterns/local-to-background-to-cloud/tooling)。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
