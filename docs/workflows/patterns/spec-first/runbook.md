---
title: "Spec-First Runbook"
description: "在开始大一点的实现前，先用 spec 收口范围、阶段和验收，再进入执行。"
slug: "/workflows/patterns/spec-first/runbook"
sidebar_label: "Runbook"
sidebar_position: 2
tags: ["ai-coding", "workflow", "spec-first", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: true
domain: "workflows"
journey_stage: "solution-design"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-runbook", "spec-first"]
estimated_time: 30
prerequisites: ["任务已经超出小步维护范围", "可以写清输入输出和验收", "每阶段都有验证方式"]
deliverable: "一份能驱动执行和 review 的最小 spec"
---

# Spec-First Runbook

## 前置条件

- 任务已经不是简单 bugfix，而是需要明确方案和阶段。
- 你能写清输入、输出、边界和验收。
- 团队接受先写 spec 再执行。

## 步骤

1. 先写最小 spec：目标、范围、不要做什么、验收。
2. 再拆阶段，每阶段只定义一个清晰产物。
3. 选择执行入口，例如 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) 或 [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)。
4. 每推进一阶段就跑一次验证，并决定是否继续。

## 验证

- spec 是否足够驱动下一步执行。
- 每阶段是否有清晰产物和验证方式。
- review 人是否能直接看懂为什么这样拆。

## 下一步

- 看 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 看 [Spec-First 风险与切换条件](/docs/workflows/patterns/spec-first/pitfalls)。
- 如果任务其实只需维护小闭环，切回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 来源

- [OpenAI Codex](https://openai.com/index/introducing-the-codex-app/)
- [OpenSpec](https://github.com/OpenSpecHQ/openspec)

