---
title: 示例：次周留存分析训练包
description: 一份已填写的数据分析训练包示例，演示分析 brief、质量检查、复现和报告交付如何组合。
slug: /roles/data-analysis/templates/example-retention-report-pack
sidebar_label: 示例：次周留存分析
tags: [ai-coding, data-analysis, templates, examples]
track: cross-track
kind: guide
content_form: guide
audience: data-analyst
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 示例：次周留存分析训练包

这个示例把 [分析 Brief 模板](/docs/roles/data-analysis/templates/analysis-brief)、[数据质量检查模板](/docs/roles/data-analysis/templates/data-quality-checklist)、[命令与复现模板](/docs/roles/data-analysis/templates/commands-and-repro) 和 [报告 Handoff 模板](/docs/roles/data-analysis/templates/report-handoff) 串成一个完整分析交付包。

## 场景

- 目标：比较新版 onboarding 上线前后，新用户 `D7 retention` 的变化。
- 受众：产品、增长、管理层。

## 1. 分析 Brief 摘要

```md
## 要回答的问题
- 新版 onboarding 是否提高了次周留存？
- 提升主要来自哪个渠道或设备类型？

## 指标与口径
- D7 retention = 注册后第 7 天仍有活跃行为的用户占比
- 时间窗口：上线前 14 天 vs 上线后 14 天
```

## 2. 数据质量检查摘要

```md
## 基础检查
- 注册事件表与活跃事件表时间窗口一致
- user_id 覆盖率 99.2%

## 口径一致性
- Android 渠道字段在历史报表中使用 `channel_group`
- 本次统一映射到 `acquisition_channel`
```

## 3. 命令与复现摘要

```md
## 关键命令
- python scripts/extract_retention_cohorts.py
- python scripts/check_retention_quality.py

## 关键 SQL
- retention_cohorts.sql
- active_users_d7.sql
```

## 4. 报告 Handoff 摘要

```md
## 一句话结论
- 新版 onboarding 让整体 D7 retention 提升 2.3pt，提升主要来自 Web 新用户。

## 限制条件
- iOS 渠道样本量较小
- Android 某广告渠道上周有归因延迟
```

## 配套 workflow 与案例

- 先用 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 做 SQL 与脚本验证。
- 再回 [Workflow Playbook](/docs/workflows/playbooks/workflow-playbook) 选适合的交付方式。
- 如果要把审计、脚本和 draft 结果连起来，可参考 [Gemini CLI Terminal Audit to Draft PR](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr) 的证据组织方式。
