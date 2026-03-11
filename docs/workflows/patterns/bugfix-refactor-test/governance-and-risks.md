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

这条主线最怕的不是修不好，而是“问题没讲清、范围没控住、验证没跟上”。一旦 owner、验证和 review 边界不清，原本该是最稳的维护流会迅速滑成“越修越大、越修越不敢 merge”。

## 现在先做什么

- 想先跑稳态主线：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想知道什么时候该停：去 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 治理检查表

| 治理面 | 最低要求 | 失控时会发生什么 |
| --- | --- | --- |
| owner | 谁定范围、谁批准扩大修改、谁负责 merge。 | diff 里长出第二个任务。 |
| 验证 | 有稳定命令、断言或人工回归步骤。 | 只能靠主观感觉判断“差不多好了”。 |
| review | reviewer 看根因、边界和回归证据。 | 只看表面 diff，漏掉真正风险。 |
| 交付 | 必须附带验证结果和未覆盖风险。 | 修复看起来完成，问题却很快复发。 |

## 权限与 owner

- 任何扩大范围的动作都要先声明，不能在 diff 里偷偷长出第二个任务。
- 修 bug、补测试和小重构应尽量绑定固定命令和清晰 owner。
- 如果修复涉及敏感目录、数据变更或公共接口，默认增加人工确认点。
- review 重点是根因、边界和回归，而不是“改得多不多”。

## 验证与 review

- 根因没说清之前，不进入大改动。
- 重构必须写出行为边界，否则 review 无从判断是否越界。
- 最终交付要附回归结果和覆盖缺口，而不是只贴 diff。
- 当测试本身需要调整时，也要解释“为什么要改测试”而不是只改到通过。

## 最常见失控模式

- 只修症状不修根因，问题很快复发。
- 局部修复顺手扩成大重构，最后没人敢 merge。
- 测试写得脆弱，未来误报和维护成本越来越高。
- 口头说“这轮不改 X”，结果 diff 里还是动了 X。

## 什么时候先停下来

- 已经需要补充 spec 才能继续判断边界。
- 修改开始跨越多个模块或多个 reviewer 责任面。
- 验证命令不稳定，无法支撑本轮结论。
- 这轮 bugfix 实际暴露的是更大的设计问题。

## 读完回哪里

- 想先按稳态流程执行：回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想知道什么时候停下或切流程：去 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
