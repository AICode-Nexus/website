---
title: "Parallel Worktrees / Multi-Agent 风险与切换条件"
description: "当并行 lane 开始制造冲突和协调噪音时，判断什么时候停下、缩回和换流程。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/pitfalls"
sidebar_label: "风险与切换"
sidebar_position: 4
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
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

# Parallel Worktrees / Multi-Agent 风险与切换条件

## 最容易出问题的地方

- 所谓 lane 其实共享同一批核心文件，最后冲突比收益还大。
- 没有 owner，大家都以为别人会负责最终集成。
- 每条 lane 都没保留独立验证证据，只在最后一次性跑总测试。

## 什么时候停下

- 拆分后仍然频繁互相等待和互相改同一块代码。
- owner 已经无法清楚说明合流顺序和责任边界。
- 任务本身缩小到单线程推进更快。

## 应该切到哪里

- 如果任务回到单点维护，切到 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果任务更像先探索再异步交接，切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 如果还没明确范围，先回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 继续阅读

- [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)
- [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)
- [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)
