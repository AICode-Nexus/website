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

## 步骤

示例任务：根据一个清晰 issue 修复后台接口边界问题，并生成 draft PR。

1. 检查 issue 的目标、范围和验收。
2. 让平台工具生成第一版改动。
3. 补全 PR 摘要、验证和风险说明。
4. 交给 reviewer 做第一轮判断。

## 验证

- PR 说明不是空的。
- 验证方式与 issue 验收一致。
- reviewer 不需要重新猜任务目标。

## 下一步

- 看 [Issue / Jira -> Draft PR Tooling](/docs/workflows/patterns/issue-to-draft-pr/tooling)。
- 看 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)。
- 如果平台流失去价值，切到 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

