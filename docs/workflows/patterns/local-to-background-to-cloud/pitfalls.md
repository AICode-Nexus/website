---
title: "Local -> Background -> Cloud 风险与切换条件"
description: "当三层 handoff 开始制造噪音时，判断什么时候停下、缩回或改走别的流程。"
slug: "/workflows/patterns/local-to-background-to-cloud/pitfalls"
sidebar_label: "风险与切换"
sidebar_position: 4
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "advanced"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Local -> Background -> Cloud 风险与切换条件

## 最容易出问题的地方

- 本地 discovery 没有写成 brief，就急着交给后台。
- 后台任务太模糊，结果变成另一轮需求澄清。
- 平台阶段只有状态，没有 diff、日志和验证说明。

## 什么时候停下

- 本地阶段还没收敛边界，后台却已经开始执行。
- 后台结果回来后，reviewer 仍然看不懂做了什么。
- 任务其实足够小，用三层 handoff 只会放大成本。

## 应该切到哪里

- 如果任务很小，切到 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果任务需要更明确的目标和阶段规划，先回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果任务已经需要多个并行 lane，切到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。

## 继续阅读

- [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)
- [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)
- [Local -> Background -> Cloud Tooling](/docs/workflows/patterns/local-to-background-to-cloud/tooling)
