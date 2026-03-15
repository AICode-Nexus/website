---
title: 服务集成与异步任务
description: 用 AI 处理第三方服务、消息链路和后台任务时，先固定失败恢复与幂等策略。
slug: /roles/backend/services-and-integrations
sidebar_label: 服务集成与异步任务
tags: [ai-coding, backend, integrations]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 服务集成与异步任务

接第三方 API、支付网关、邮件服务、搜索服务或消息队列时，AI 可以显著减少样板代码，但前提是你先把“失败时怎么办”说清楚。对后端团队来说，真正危险的不是生成 client code，而是把重试、幂等、限流和补偿动作写得似是而非。

## 先划清集成边界

推荐把每个外部系统都包成独立 adapter 或 client module，而不是让业务代码到处直接调 SDK。这样做有两个好处：

- 让 AI 修改时只在边界层工作，避免把 credential、retry policy 和业务逻辑搅在一起。
- 让测试可以替换成 fake client、sandbox endpoint 或 contract fixture。

如果你还没有清晰的模块边界，先回到 [仓库结构与交付](/docs/roles/backend/architecture-and-delivery) 看目录和 package 设计，再决定让 AI 改哪一层。

## 第三方服务接入的默认清单

- 鉴权方式：API key、OAuth、service account 或 webhook signature。
- 限流与超时：客户端重试次数、退避策略、最大并发。
- 失败分类：可重试、需人工介入、需死信或补偿。
- 观测信号：调用耗时、错误率、429/5xx、provider-specific error code。

如果这些内容没写出来，agent 很容易默认成“无限重试 + 记录一条日志”，这在生产环境里通常是错误设计。

## Webhook、队列和后台任务的重点不是“能消费”

### Webhook

- 先验证签名和重放攻击窗口。
- 明确重复事件如何去重。
- 失败后是同步返回重试，还是入队延迟处理。

### 队列和后台任务

- 定义幂等键、任务状态和死信处理。
- 明确任务超时、取消、补偿和人工回收路径。
- 区分“至少一次”与“恰好一次”的真实业务要求。

这些规则最好和 [数据与存储](/docs/roles/backend/data-and-storage) 一起设计，因为 outbox、event table、job table 和缓存一致性经常是同一件事的不同切面。

## 内部服务之间如何保持改动可控

如果系统还处于 modular monolith 阶段，不要急着把每个边界都拆成新服务。AI 在清晰的模块边界内工作通常比在半拆不拆的微服务拓扑里更稳定。只有当部署节奏、权限边界或性能需求真的要求独立演进时，再考虑服务拆分。

对内部服务调用，优先保留：

- 统一的 client interface。
- 明确的超时、熔断和 fallback 行为。
- 稳定的 schema 或 typed contract。

## 跨团队 handoff 要提前准备

后端把集成做完，不代表交付结束。通常还需要给：

- [前端工程师](/docs/roles/frontend)：接口文档、错误结构、回调时序、限流约束。
- [测试工程师](/docs/roles/qa)：sandbox 凭证、关键场景、失败样本、幂等与补偿预期。
- [运维工程师](/docs/roles/devops)：环境变量、provider dashboard、告警指标、任务队列健康检查。

## 下一步

- 集成边界已经清楚，准备补 contract 和 error model：去 [API 与契约](/docs/roles/backend/api-and-contracts)。
- 集成路径已经实现，准备补测试与验收：去 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。
- 准备把日志、trace 和告警打通：去 [观测性与运维协作](/docs/roles/backend/observability-and-operations)。
