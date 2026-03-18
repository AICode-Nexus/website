---
title: 规则与规范文档
description: 运维工程师如何把 IaC、CI/CD、告警、回滚和密钥纪律写进 instruction files 与运行文档。
slug: /roles/devops/rules-and-instruction-files
sidebar_label: 规则与规范文档
tags: [ai-coding, devops, rules]
track: cross-track
kind: guide
content_form: guide
audience: devops-engineer
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

运维类任务的风险远高于“生成脚本”。真正该先写清的是变更权限、环境差异、回滚、密钥和告警责任。

## DevOps 文档分层

| 载体 | 应该承载什么 |
| --- | --- |
| `AGENTS.md` | 环境边界、IaC 纪律、secret 规则、回滚要求 |
| 工具说明 | 默认命令、输出格式、平台入口习惯 |
| runbook / 变更说明 | 执行步骤、检查点、失败回退 |
| handoff 模板 | 风险、监控指标、发布窗口、责任人 |

## 最值得固化的长期规则

- 所有基础设施变更必须可回滚。
- 所有环境变量和 secret 必须通过正式 secret 管理。
- 生产变更必须说明验证点、告警和回退条件。
- IaC 与实际运行状态差异必须可追踪。

## 可直接复制的 DevOps 模板

| 模板 | 什么时候先用 |
| --- | --- |
| [基础设施变更 Brief 模板](/docs/roles/devops/templates/infra-change-brief) | 还在界定变更边界、环境和 owner 时 |
| [Runbook 与回滚模板](/docs/roles/devops/templates/runbook-and-rollback) | 需要执行 staging / production 变更时 |
| [命令与证据模板](/docs/roles/devops/templates/commands-and-evidence) | 需要固定验证顺序、日志和截图证据时 |
| [Incident / Handoff 模板](/docs/roles/devops/templates/incident-handoff) | 需要交班、值班或跨团队 handoff 时 |

这几份模板的汇总入口在 [DevOps 训练包模板](/docs/roles/devops/templates)。

## 下一步

- 想继续看 DevOps 任务该配什么能力：去 [Skills 与 MCP](/docs/roles/devops/skills-and-mcp)。
- 想判断任务该走哪个入口：去 [工具匹配与选型](/docs/roles/devops/tool-fit-and-selection)。
- 想直接复制模板资产：去 [DevOps 训练包模板](/docs/roles/devops/templates)。
