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
track: "prompting-workflows"
domain: "workflows"
journey_stage: "solution-design"
title: "Spec-First：治理与风险"
description: "Spec-First 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/spec-first/governance-and-risks"
sidebar_label: "补充：治理与风险"
sidebar_position: 8
tags: ["ai-coding", "workflow", "spec-first"]
---

# Spec-First：治理与风险

## 现在先做什么

- 想先跑 spec 主线：去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想知道什么时候该停：去 [Spec-First 风险与切换条件](/docs/workflows/patterns/spec-first/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 权限与 owner

- 谁能定目标、谁能定非目标、谁负责最终批准执行，先写清再动手。
- spec 不是为了替代 owner，而是为了让 owner 决策有据可依。
- 高风险范围、敏感目录和依赖变更必须有人明确签字或确认。

## 验证与 review

- review 重点是目标、边界、验收标准和未决问题是否清楚。
- spec 定稿前，不要让执行层代替需求层做决定。
- 定稿后要能把计划、任务拆分和执行入口连起来，而不是另起一套话术。

## 失败信号

- 文档越来越长，但核心边界反而越来越模糊。
- 定稿后执行仍大量返工，说明 spec 没有真正约束范围。
- 大家都看过 spec，却没人能说清最终谁负责拍板。

## 读完回哪里

- 想先按 spec 稳态流程执行：回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想知道什么时候该停下：去 [Spec-First 风险与切换条件](/docs/workflows/patterns/spec-first/pitfalls)。
- 想补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
