---
title: "Issue / Jira -> Draft PR 示例"
description: "通过一个清晰任务示例，说明 issue 到 draft PR 的交接链如何落地。"
slug: "/workflows/patterns/issue-to-draft-pr/examples"
sidebar_label: "示例"
sidebar_position: 3
tags: ["ai-coding", "workflow", "issue-to-pr", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-examples", "issue-to-draft-pr"]
estimated_time: 20
prerequisites: ["已阅读 runbook", "issue 已写清楚", "平台 review 流已存在"]
deliverable: "一个可复盘的 issue 到 draft PR 样例"
---

# Issue / Jira -> Draft PR 示例

## 前置条件

- 已读过 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 当前任务已经可以直接编码，不需要再做探索性方案设计。

## 示例卡片

| 项目 | 本例内容 |
| --- | --- |
| 任务类型 | 根据一个清晰 issue 修复后台接口边界问题，并生成 draft PR。 |
| 上游输入 | issue 链接、范围、验收、禁区。 |
| 平台产出 | draft PR、验证摘要、风险说明。 |
| 人工动作 | reviewer 做第一轮判断，owner 决定是否继续。 |

## 步骤

1. 检查 issue 的目标、范围、验收和禁止修改区是否完整。
2. 让平台工具先复述任务，而不是直接开始提交改动。
3. 生成第一版改动和对应的验证记录。
4. 补全 PR 摘要、验证方式和风险说明。
5. 交给 reviewer 做第一轮判断，决定是继续回改还是回 issue 修需求。

## 这个示例里最重要的判断

- draft PR 只是交付起点，不是“已经完成”的证明。
- reviewer 不该重新猜任务目标，目标应该已经在 issue 和 PR 中写清。
- 如果执行中发现需求缺口，要回 issue，而不是在 PR 里继续口头补全。

## 验证

- PR 说明不是空的。
- 验证方式与 issue 验收一致。
- reviewer 不需要重新猜任务目标。
- 本轮没有顺手把范围扩大到无关任务。

## 如果这个示例开始失控

- 如果 issue 不够清楚，先回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果本地探索越来越重要，切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 如果平台流只剩形式挂靠，改读 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 下一步

- 看 [Issue / Jira -> Draft PR Tooling](/docs/workflows/patterns/issue-to-draft-pr/tooling)。
- 看 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)。
- 如果平台流失去价值，切到 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

