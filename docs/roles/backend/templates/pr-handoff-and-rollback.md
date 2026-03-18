---
title: PR / Handoff / Rollback 模板
description: 用统一结构写后端 PR、handoff 和 rollback 说明，让 reviewer 与接手人快速恢复上下文。
slug: /roles/backend/templates/pr-handoff-and-rollback
sidebar_label: PR / Handoff / Rollback
tags: [ai-coding, backend, templates]
track: cross-track
kind: template
content_form: template
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# PR / Handoff / Rollback 模板

适用场景：PR 描述、跨团队 handoff、发布前收口和回滚说明。

```markdown
## What changed
- 改动的接口 / schema / 任务链路

## Why
- 业务背景与触发原因

## Risk boundary
- 不会改什么
- 哪些客户端 / 数据路径会受影响

## Validation
- lint / type-check / tests / smoke

## Rollback
- 回滚代码、migration、配置或消费链路的方法
```

## 再补两栏会更稳

| 补什么 | 为什么 |
| --- | --- |
| Observability | reviewer 需要知道上线后先盯哪些指标和日志 |
| Next owner | 多人交接时，必须写清下一步谁接手 |

## 配套页面

- [模板与交付资产](/docs/roles/backend/templates-and-handoffs)
- [交付检查表](/docs/roles/backend/delivery-checklists)
