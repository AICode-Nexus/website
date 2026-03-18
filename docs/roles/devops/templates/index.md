---
title: DevOps 训练包模板
description: 汇总运维工程师最常复用的变更 brief、runbook、验证证据和 incident handoff 模板。
slug: /roles/devops/templates
sidebar_label: 模板首页
tags: [ai-coding, devops, templates]
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

# DevOps 训练包模板

运维专题最怕只讲原则，不给执行包。把变更 brief、runbook、验证命令和 incident handoff 收成固定模板后，团队才更容易做到“可验证、可回滚、可交接”。

![DevOps 训练包图板](/img/roles/devops/devops-training-pack-board.svg)

## 先复制哪份

| 场景 | 先复制什么 |
| --- | --- |
| 还在定义基础设施或配置改动边界 | [基础设施变更 Brief 模板](/docs/roles/devops/templates/infra-change-brief) |
| 准备执行生产或 staging 变更 | [Runbook 与回滚模板](/docs/roles/devops/templates/runbook-and-rollback) |
| 需要固定验证证据和命令顺序 | [命令与证据模板](/docs/roles/devops/templates/commands-and-evidence) |
| 需要交给值班、平台 owner 或发布负责人 | [Incident / Handoff 模板](/docs/roles/devops/templates/incident-handoff) |

## 配套页面

| 模板组 | 配套页面 |
| --- | --- |
| 变更 brief 与 runbook | [运维工程师](/docs/roles/devops)、[规则与规范文档](/docs/roles/devops/rules-and-instruction-files) |
| 能力与证据 | [Skills 与 MCP](/docs/roles/devops/skills-and-mcp) |
| 入口和执行节奏 | [工具匹配与选型](/docs/roles/devops/tool-fit-and-selection) |

## 默认复制顺序

1. 先用 [基础设施变更 Brief 模板](/docs/roles/devops/templates/infra-change-brief) 锁定边界。
2. 执行前补 [Runbook 与回滚模板](/docs/roles/devops/templates/runbook-and-rollback) 和 [命令与证据模板](/docs/roles/devops/templates/commands-and-evidence)。
3. 需要交接或值班切换时，再用 [Incident / Handoff 模板](/docs/roles/devops/templates/incident-handoff) 收口。

## 已填写示例

- 想直接看一份发布窗口和回滚成品：去 [示例：Kubernetes 发布窗口训练包](/docs/roles/devops/templates/example-k8s-rollout-pack)。

## 下一步

- 想回运维总览看这些模板所在位置：去 [运维工程师的 AI Coding 指南](/docs/roles/devops)。
- 想先看长期规则与回滚纪律：去 [规则与规范文档](/docs/roles/devops/rules-and-instruction-files)。
