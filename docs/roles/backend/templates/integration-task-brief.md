---
title: 外部集成任务模板
description: 用统一模板写第三方 API、Webhook、队列和后台 job 的集成边界与止损动作。
slug: /roles/backend/templates/integration-task-brief
sidebar_label: 外部集成任务
tags: [ai-coding, backend, templates]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 外部集成任务模板

适用场景：第三方 API、Webhook、异步任务、队列消费或后台 job。

```text
任务：实现或调整一个外部服务集成
集成对象：
鉴权方式：
超时与重试策略：
幂等键或去重规则：
失败分类：
告警与观测要求：
允许修改的层：
- adapter / client
- queue consumer / job runner
- config / env manifest
- integration tests
禁止直接做的事：
- 在业务代码里散落 SDK 调用
- 省略 timeout / retry / dead-letter 规则
- 缺少 sandbox 或 fake 测试路径
```

## 最少补哪几类证据

- sandbox 或 fake 测试路径
- timeout / retry / dead-letter 说明
- 失败分类与告警条件
- 回滚或人工接管入口

## 配套页面

- [服务集成与异步任务](/docs/roles/backend/services-and-integrations)
- [失败模式与止损](/docs/roles/backend/failure-modes-and-recovery)
