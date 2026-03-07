---
title: "Issue / Jira -> Draft PR：治理与风险"
description: "Issue / Jira -> Draft PR 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/issue-to-draft-pr/governance-and-risks"
sidebar_label: "治理与风险"
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Issue / Jira -> Draft PR：治理与风险

Issue / Jira -> Draft PR 一旦进入真实工程环境，问题从来不是“能不能生成代码”，而是权限、边界、验证和人工接管点是否足够清楚。治理写不清，执行越快越危险。

## 权限与边界

- 先治理 issue 模板，再扩大 agent 使用范围。
- 异步 agent 只承接清晰任务，模糊任务仍由本地流程先收敛。
- 所有 merge 仍遵守原有 branch protection 和 reviewer 规则。

## 验证与 review

- 任务没到“可委派”状态之前，不应该直接丢给后台 agent。
- draft PR 是 review 起点，不是终点，必须保留人工把关。
- 如果 PR 暴露出需求缺失，要回到 issue 层修，而不是让 reviewer 补需求。

## 失败模式

- issue 太空，导致 agent 只能胡猜并把噪音带进 PR。
- 团队把 draft PR 当自动合并候选，跳过真正 review。
- 平台日志与 repo 证据分离，后续审计困难。

## 缩减办法

- 先从 docs、配置和隔离模块的小任务开始委派。
- 把大 ticket 拆成多个可独立 merge 的 issue。
- 需要先本地探索的任务，先走 local-first 再转后台。
