---
title: 基础设施变更 Brief 模板
description: 用于 IaC、环境配置、监控和发布窗口变更的 DevOps 任务 brief 模板。
slug: /roles/devops/templates/infra-change-brief
sidebar_label: 基础设施变更 Brief 模板
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

# 基础设施变更 Brief 模板

```md
# {变更名称}

## 1. 变更目标
- 要解决什么问题
- 为什么现在做

## 2. 影响范围
- 环境
- 服务 / 集群 / 资源
- 相关 owner

## 3. 变更内容
- IaC / 配置 / 密钥 / 监控项
- 预期行为变化

## 4. 风险边界
- 最容易出问题的点
- 不会改什么
- 是否影响生产流量

## 5. 依赖
- 上游 / 下游系统
- 发布窗口
- 审批或权限要求

## 6. 验证要求
- 执行前检查
- 执行后检查
- 告警与 dashboard
```

## 使用提醒

- 影响范围必须写环境和 owner，不能只写资源名。
- 变更内容和风险边界要分开写，避免 runbook 阶段才发现认知不一致。
