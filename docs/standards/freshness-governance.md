---
title: 知识新鲜度治理
description: 用复核日期、事实截止、市场状态和观察名单来治理 AI 编程知识库的时效性。
slug: /freshness-governance
sidebar_label: 知识新鲜度治理
tags: [ai-coding, freshness, governance]
track: team-delivery
kind: guide
audience: advanced
stage: intermediate
featured: false
pillar: standards
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# 知识新鲜度治理

## 规则

- `tools / comparisons / insights` 按月复核
- `standards / architecture` 按季度复核
- 所有“当前 / 主流 / 推荐”判断必须写绝对日期
- 没有 `reviewed_at`、`source_window_end`、`market_status` 的知识文档不允许构建通过

## 三个核心字段

| 字段 | 作用 |
| --- | --- |
| `reviewed_at` | 最近一次人工复核日期 |
| `source_window_end` | 事实截止日期 |
| `market_status` | `current / watch / legacy` |

## `market_status` 语义

- `current`: 仍然适合作为当前主线知识
- `watch`: 仍值得关注，但需要更频繁复核
- `legacy`: 旧结构、旧透镜或旧基线，只保留兼容入口

## Daily Brief 与长期知识的关系

- Daily Brief 负责发现变化
- 月度复盘负责判断哪些变化值得沉淀
- 长期知识文档只吸收已经过二次判断的变化

## 延伸阅读

- [主流工具观察名单](/docs/mainstream-tool-watchlist)
- [趋势观察](/docs/insights)
