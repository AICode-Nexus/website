---
audience: "mixed"
stage: "starter"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "testing-validation"
title: "Bugfix / Refactor / Test：治理与风险"
description: "Bugfix / Refactor / Test 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/bugfix-refactor-test/governance-and-risks"
sidebar_label: "补充：治理与风险"
sidebar_position: 8
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
---

# Bugfix / Refactor / Test：治理与风险

## 现在先做什么

- 想先跑稳态主线：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想知道什么时候该停：去 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 权限与 owner

- 任何扩大范围的动作都要先声明，不能在 diff 里偷偷长出第二个任务。
- 修 bug、补测试和小重构应尽量绑定固定命令和清晰 owner。
- review 重点是根因、边界和回归，而不是“改得多不多”。

## 验证与 review

- 根因没说清之前，不进入大改动。
- 重构必须写出行为边界，否则 review 无从判断是否越界。
- 最终交付要附回归结果和覆盖缺口，而不是只贴 diff。

## 失败信号

- 只修症状不修根因，问题很快复发。
- 局部修复顺手扩成大重构，最后没人敢 merge。
- 测试写得脆弱，未来误报和维护成本越来越高。

## 读完回哪里

- 想先按稳态流程执行：回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想知道什么时候停下或切流程：去 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
