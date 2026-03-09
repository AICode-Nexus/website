---
audience: "advanced"
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
title: "Local -> Background -> Cloud：适用信号与边界"
description: "什么时候优先用 Local -> Background -> Cloud，什么时候不要用。"
slug: "/workflows/patterns/local-to-background-to-cloud/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
---

# Local -> Background -> Cloud：适用信号与边界

## 现在先做什么

- 想直接按三层 handoff 执行：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想先看完整 handoff 示例：去 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 想先看本地到后台如何在真实案例里收口：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)。

## 什么时候该上

- 本地探索和后台执行都各有价值，单一入口会很笨重。
- 任务能先被收敛成结构化 brief，再交给后台或云端继续跑。
- 团队接受“本地 owner + 后台执行 + 平台 review”的分工。

## 什么时候别上

- 任务很小，本地一条线就能做完。
- 根本没有后台 agent、云端任务面板或平台 review 入口。
- 探索和实现高度纠缠，切不出稳定 handoff。

## 切回更轻或更重

- 如果只剩局部修复，回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果需要更多审批链、更多角色和更长文档产物，切到框架层。
- 如果 brief 还不稳定，先回到 local-first，把边界写清再交后台。

## 读完回哪里

- 想直接走主线：回 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想看完整 handoff：去 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 想看真实交接：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
