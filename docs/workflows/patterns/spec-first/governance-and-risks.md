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

Spec-First 的失败方式通常不是“文档写少了”，而是“文档很多，边界还是不清”。如果 owner、批准权和执行接入口没讲清，spec 很容易从治理工具退化成另一种形式的讨论记录。

## 现在先做什么

- 想先跑 spec 主线：去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想知道什么时候该停：去 [Spec-First 风险与切换条件](/docs/workflows/patterns/spec-first/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 治理检查表

| 治理面 | 最低要求 | 失控时会发生什么 |
| --- | --- | --- |
| owner | 谁定目标、谁定非目标、谁批准执行清楚。 | 大家都看过 spec，却没人拍板。 |
| 验收 | 验收标准和边界可以被 review。 | 执行层被迫替需求层做决定。 |
| 执行连接 | spec 能自然接到任务拆分和执行入口。 | 定稿后又另起一套话术和计划。 |
| 文档纪律 | 文档服务决策，不服务堆字数。 | 文档越长，核心边界越模糊。 |

## 权限与 owner

- 谁能定目标、谁能定非目标、谁负责最终批准执行，先写清再动手。
- spec 不是为了替代 owner，而是为了让 owner 决策有据可依。
- 高风险范围、敏感目录和依赖变更必须有人明确签字或确认。
- 定稿前允许讨论，定稿后就要把“谁能继续改边界”限制住。

## 验证与 review

- review 重点是目标、边界、验收标准和未决问题是否清楚。
- spec 定稿前，不要让执行层代替需求层做决定。
- 定稿后要能把计划、任务拆分和执行入口连起来，而不是另起一套话术。
- 任何“先做了再说”的例外都要有 owner 明确认可。

## 最常见失控模式

- 文档越来越长，但核心边界反而越来越模糊。
- 定稿后执行仍大量返工，说明 spec 没有真正约束范围。
- 大家都看过 spec，却没人能说清最终谁负责拍板。
- spec 写完就丢，执行和 review 完全不再引用。

## 什么时候先停下来

- 你已经写了很多字，但仍说不清非目标是什么。
- 执行入口还没定，spec 只能停留在愿景层。
- 需要多轮 stakeholder 重新确认，说明还没到执行时机。
- 需求其实已经收敛，只差进入实现和验证。

## 读完回哪里

- 想先按 spec 稳态流程执行：回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想知道什么时候该停下：去 [Spec-First 风险与切换条件](/docs/workflows/patterns/spec-first/pitfalls)。
- 想补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
