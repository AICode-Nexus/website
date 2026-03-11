---
title: "Issue / Jira -> Draft PR Runbook"
description: "把清晰任务从 issue 或 Jira 收口成一条可 review 的 draft PR 交接线。"
slug: "/workflows/patterns/issue-to-draft-pr/runbook"
sidebar_label: "Runbook"
sidebar_position: 2
tags: ["ai-coding", "workflow", "issue-to-pr", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: true
domain: "workflows"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-runbook", "issue-to-draft-pr"]
estimated_time: 25
prerequisites: ["已有结构清晰的 issue 或 Jira 任务", "已有 PR 流", "任务范围与验收条件已明确"]
deliverable: "一个带验证说明和风险提示的 draft PR"
---

# Issue / Jira -> Draft PR Runbook

## 前置条件

- 任务已经写清楚，不再需要继续澄清需求。
- 团队默认在 GitHub 或等价平台里 review。
- 任务规模适合先交付 draft PR，而不是先写大规格文档。

## 执行表

| 阶段 | 要做什么 | 产出 |
| --- | --- | --- |
| 检查任务 | 确认范围、禁区、验收。 | 一条可委派 issue。 |
| 委派执行 | 让平台工具先复述任务，再给最小计划。 | 第一版实现和说明。 |
| 填写 PR | 写验证、风险和当前状态。 | draft PR。 |
| 人工判断 | reviewer 和 owner 做继续/回退判断。 | 下一轮动作决定。 |

## 步骤

1. 先检查 issue 或 Jira 是否包含范围、不要做什么和验收条件。
2. 再选择平台主入口，例如 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。
3. 让工具根据任务生成第一版计划和最小改动。
4. 在 draft PR 中附上验证方式、结果和已知风险。
5. reviewer 根据 PR 资产判断是继续回改、拆新 issue，还是直接收口。

## 默认停点

- issue 边界不清，先停，回需求层补任务。
- draft PR 里没有验证和风险说明，先停，补证据。
- 任务开始跨多个阶段或多个责任面，先停，回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 验证

- issue、代码改动和 draft PR 一一对应。
- PR 说明足够支持 reviewer 判断。
- 如果任务未完成，也能从 PR 里看出当前做到哪一步。

## 交付检查

- PR 是否完整复述了目标、范围和验收方式。
- reviewer 是否能只看 issue + PR 就做第一轮判断。
- 这轮是否仍保持最小范围，没有顺手做大。
- 如果今天暂停，下一位是否能接着看 PR 往下推。

## 下一步

- 看 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 看 [Issue / Jira -> Draft PR 风险与切换条件](/docs/workflows/patterns/issue-to-draft-pr/pitfalls)。
- 如果任务开始变成多阶段方案设计，切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)

