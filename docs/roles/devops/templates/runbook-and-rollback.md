---
title: Runbook 与回滚模板
description: 用于生产或 staging 变更执行的步骤、检查点和回滚说明模板。
slug: /roles/devops/templates/runbook-and-rollback
sidebar_label: Runbook 与回滚模板
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

# Runbook 与回滚模板

```md
# {变更名称}

## 1. 执行前检查
- 当前版本 / 当前配置
- 环境健康状态
- 是否满足变更窗口

## 2. 执行步骤
1. 第一步
2. 第二步
3. 第三步

## 3. 每步检查点
- 指标
- 日志
- 控制台状态

## 4. 回滚条件
- 哪些现象触发回滚
- 允许等待多久

## 5. 回滚步骤
1. 回退配置 / 镜像 / 资源版本
2. 恢复流量或开关
3. 验证恢复完成

## 6. 事后记录
- 最终结果
- 是否触发告警
- 后续动作
```

## 使用提醒

- 回滚条件不能写成“出问题再看”，要有指标或现象。
- 执行步骤和检查点必须一一对应。
