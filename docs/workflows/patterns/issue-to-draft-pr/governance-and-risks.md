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
journey_stage: "implementation"
title: "Issue / Jira -> Draft PR：治理与风险"
description: "Issue / Jira -> Draft PR 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/issue-to-draft-pr/governance-and-risks"
sidebar_label: "补充：治理与风险"
sidebar_position: 8
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
---

# Issue / Jira -> Draft PR：治理与风险

## 现在先做什么

- 想先跑平台主线：去 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想知道什么时候该停：去 [Issue / Jira -> Draft PR 风险与切换条件](/docs/workflows/patterns/issue-to-draft-pr/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 权限与 owner

- issue 能否直接委派、哪些目录可改、谁负责最终 merge，先写清再执行。
- 平台工作系统不等于可以跳过 repo 合同和人工 review。
- 高风险变更必须明确 owner，不能假设 draft PR 自己会收尾。

## 验证与 review

- issue 必须写清验收标准，PR 必须附验证结果和风险说明。
- reviewer 要看 diff、检查项和 handoff 说明，而不是只看标题像不像完成。
- 如果中途转到本地或后台探索，要把新证据带回平台记录。

## 失败信号

- issue 越来越多，但真正能独立委派的任务越来越少。
- draft PR 很多，验证和风险说明却越来越空。
- 平台里看起来很忙，但没人能说清最终谁负责 merge 判断。

## 读完回哪里

- 想先按平台稳态流程执行：回 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想知道什么时候停下：去 [Issue / Jira -> Draft PR 风险与切换条件](/docs/workflows/patterns/issue-to-draft-pr/pitfalls)。
- 想补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
