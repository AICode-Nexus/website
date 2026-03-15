---
title: 数据与存储
description: 用 AI 处理 schema、迁移、查询和缓存时，先固定演进与回滚边界。
slug: /roles/backend/data-and-storage
sidebar_label: 数据与存储
tags: [ai-coding, backend, database]
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

# 数据与存储

后端团队最容易把 AI 用歪的地方，就是让它直接“生成 migration”却没有先说清线上数据的演进约束。schema 变更不是写出一段 SQL 就结束，它还包含兼容期、回填、索引、锁风险、缓存一致性和回滚策略。

## schema 变更前必须先回答的问题

- 这次是新增、替换还是删除字段。
- 线上旧数据如何兼容，新代码和旧代码是否会并存一段时间。
- 需要一次性回填还是后台分批回填。
- 是否涉及大表、长事务、锁等待或索引重建。

如果这些问题还没有答案，不要直接让 AI 写 migration；先把变更说明写成 checklist，再进入 [Spec-First](/docs/workflows/patterns/spec-first/runbook) 或团队自己的 schema review 流程。

## 迁移脚本应该和什么一起出现

一次可 review 的数据变更至少应包含：

- up/down migration 或等价的前进/回退说明。
- 数据回填脚本、执行窗口和重试策略。
- 索引说明、预估影响和观测指标。
- 对应用层的读取/写入切换说明。

AI 可以帮你把这些制品快速搭出来，但最终 merge 的单位最好是“schema + code path + verification”，而不是孤立的一段 SQL。

## ORM、query builder 和显式 SQL 的取舍

### ORM 适合常规 CRUD，但不要把查询成本藏起来

Prisma、SQLAlchemy 这类工具能让 agent 快速补齐 model 和简单查询，但复杂聚合、分页或热点路径最好仍然显式评审 SQL 形状和索引策略。

### query builder 比较适合高频迭代

Drizzle、Knex 或等价层通常能在“保留 SQL 可见性”和“降低样板代码”之间取得平衡，对 AI 来说也更容易保持修改范围可控。

### 热点路径要保留人工判断

一旦变更触及慢查询、锁争用、批量回填或多表 join，应该先用 explain plan、样本数据和基线指标定义目标，再让 AI 协助补查询和测试。

## 缓存、队列和异步存储不是“顺手补一下”

缓存、Redis、消息队列、Outbox 或事件表都属于数据边界的一部分。让 AI 修改这类链路时，必须同时说明：

- key 命名与 TTL。
- 幂等键和去重策略。
- 失败重试与死信处理。
- 顺序性和最终一致性要求。

这些内容和 [服务集成与异步任务](/docs/roles/backend/services-and-integrations) 密切相关；不要把数据层和消息层当成两件互不相干的事。

## merge 前检查清单

- migration 是否支持灰度期里的双版本应用。
- 查询是否补了索引、limit、分页或扫描范围约束。
- 回填脚本是否可重入、可恢复、可监控。
- 是否给 [观测性与运维协作](/docs/roles/backend/observability-and-operations) 留下了足够的指标和告警信号。

## 下一步

- schema 变更要穿过消息链路或第三方服务：去 [服务集成与异步任务](/docs/roles/backend/services-and-integrations)。
- schema 变更已经完成，准备做回归：去 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。
- 想把 migration、seed、contract 和 SDK 的目录边界固定下来：去 [仓库结构与交付](/docs/roles/backend/architecture-and-delivery)。
