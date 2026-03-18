---
title: Skills 与 MCP
description: 运维工程师如何为 IaC、CI/CD、监控、日志和故障排查选择 skills 与 MCP。
slug: /roles/devops/skills-and-mcp
sidebar_label: Skills 与 MCP
tags: [ai-coding, devops, skills, mcp]
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

# Skills 与 MCP

| 任务 | 优先能力 | 为什么 |
| --- | --- | --- |
| CI/CD 设计与优化 | `cicd-expert` | 先收安全与流水线边界 |
| 故障排查 | `systematic-debugging`、浏览器 / 控制台上下文 | 先看真实面板、日志与现象 |
| 运行文档维护 | 文档类能力、规则文档能力 | 先保证变更和回滚可追踪 |
| 发布前收口 | `verification-before-completion` | 需要验证结果和证据闭环 |

## 最常见误用

- 不看真实仪表盘和日志，就直接改 IaC。
- 只生成功能脚本，不补回滚和监控。
- 只在工具本地写规则，不进 repo 文档。

## 默认能力组合

DevOps 任务更适合先用调试类能力确认现象和边界，再结合控制台、日志或仪表盘上下文拿真实证据，最后再进入 IaC、脚本和交付说明。少了中间这一步，运维任务很容易演变成“看起来像修复，实际上只是改了配置”。

## 训练建议

如果你在带运维同学练 AI 协作，最值得要求的是每次任务都交三件事：现象证据、改动方案、回滚与监控说明。这样才能把技能使用真正接回生产协作，而不是停留在脚本生成层。

## 默认能力组合对应的最小产物

| 任务 | 默认能力组合 | 最少要落的模板 |
| --- | --- | --- |
| IaC / 配置改动 | `cicd-expert` 或终端调试能力 | [基础设施变更 Brief 模板](/docs/roles/devops/templates/infra-change-brief) |
| 生产变更执行 | 调试能力 + 控制面上下文 | [Runbook 与回滚模板](/docs/roles/devops/templates/runbook-and-rollback) |
| 证据收口 | `verification-before-completion` | [命令与证据模板](/docs/roles/devops/templates/commands-and-evidence) |
| 值班或事故交接 | 文档能力 + 平台协作入口 | [Incident / Handoff 模板](/docs/roles/devops/templates/incident-handoff) |

## 下一步

- 想补长期规则：去 [规则与规范文档](/docs/roles/devops/rules-and-instruction-files)。
- 想继续判断入口：去 [工具匹配与选型](/docs/roles/devops/tool-fit-and-selection)。
- 想直接复制模板：去 [DevOps 训练包模板](/docs/roles/devops/templates)。
