---
title: Migration 变更模板
description: 用统一模板写 schema、索引、回填和回滚策略，避免后端数据变更只剩一段 SQL。
slug: /roles/backend/templates/migration-change-brief
sidebar_label: Migration 变更
tags: [ai-coding, backend, templates]
track: cross-track
kind: template
content_form: template
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

# Migration 变更模板

适用场景：schema、索引、回填、缓存一致性或持久化模型变化。

```text
任务：设计并实现一次数据结构变更
当前 schema / 表：
变更目标：
兼容期策略：
是否需要 backfill：
索引与性能风险：
回滚策略：
允许修改的文件：
- migration
- model / repository
- integration tests
- release notes
必须给出的证据：
- migration 说明
- backfill 计划
- explain / 性能判断
- dry run 或测试结果
```

## reviewer 先看什么

- 回滚是不是可执行，而不是一句“必要时回滚”
- 是否说明了兼容期和 backfill 节奏
- 性能和索引风险有没有被提前写出来

## 配套页面

- [数据与存储](/docs/roles/backend/data-and-storage)
- [交付检查表](/docs/roles/backend/delivery-checklists)
