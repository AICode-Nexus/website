---
title: 规则与规范文档
description: 数据分析师如何把数据源说明、质量检查、可复现分析和报表交付要求写进 instruction files。
slug: /roles/data-analysis/rules-and-instruction-files
sidebar_label: 规则与规范文档
tags: [ai-coding, data-analysis, rules]
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

# 规则与规范文档

数据分析类任务最容易翻车的点，是脚本能跑但结论不可复现。规则文档最重要的职责，是把数据源、转换规则、质量检查和输出格式固定下来。

## 数据分析文档分层

| 载体 | 应该承载什么 |
| --- | --- |
| `AGENTS.md` | 数据源边界、质量检查、脚本规范、输出要求 |
| 工具说明 | 默认 notebook / 脚本习惯、命名和目录规则 |
| 分析 brief | 问题、口径、数据源、指标、输出物 |
| 报告模板 | 图表、结论、限制条件、复现步骤 |

## 最值得固化的规则

- 所有分析必须说明数据源和时间窗口。
- 所有转换步骤必须可追踪、可复现。
- 所有结论必须附带限制条件和质量检查结果。
- 交付物必须包含脚本、输出和说明，而不只是截图。

## 可直接复制的数据分析模板

| 模板 | 什么时候先用 |
| --- | --- |
| [分析 Brief 模板](/docs/roles/data-analysis/templates/analysis-brief) | 刚开始定义问题、指标和数据源时 |
| [数据质量检查模板](/docs/roles/data-analysis/templates/data-quality-checklist) | 需要先检查空值、异常、口径一致性时 |
| [命令与复现模板](/docs/roles/data-analysis/templates/commands-and-repro) | 需要记录 SQL、脚本、notebook 和导出步骤时 |
| [报告 Handoff 模板](/docs/roles/data-analysis/templates/report-handoff) | 要把图表、结论和限制条件交给业务方时 |

这几份模板的入口在 [数据分析训练包模板](/docs/roles/data-analysis/templates)。

## 下一步

- 想继续看数据分析任务该配什么能力：去 [Skills 与 MCP](/docs/roles/data-analysis/skills-and-mcp)。
- 想判断任务该用哪个入口：去 [工具匹配与选型](/docs/roles/data-analysis/tool-fit-and-selection)。
- 想直接复制模板资产：去 [数据分析训练包模板](/docs/roles/data-analysis/templates)。
