---
title: 数据质量检查模板
description: 用于记录空值、重复、异常、时间窗口和口径一致性的质量检查模板。
slug: /roles/data-analysis/templates/data-quality-checklist
sidebar_label: 数据质量检查模板
tags: [ai-coding, data-analysis, templates]
track: cross-track
kind: guide
content_form: guide
audience: data-analyst
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 数据质量检查模板

```md
# {数据集 / 查询名}

## 1. 基础检查
- 行数
- 主键 / 唯一键
- 时间范围

## 2. 空值与缺失
- 哪些字段允许为空
- 哪些字段异常为空
- 缺失处理策略

## 3. 重复与异常
- 重复记录
- 异常值
- 异常是否保留

## 4. 口径一致性
- 维度定义是否一致
- 是否和历史报表对齐
- 是否和埋点 / 业务规则一致

## 5. 最终结论
- 可以进入分析
- 需要先修复
- 需要注明限制条件
```

## 使用提醒

- 检查结果不要只写“通过”，要写异常是否被接受。
- 如果历史口径不一致，必须在最终报告里回写限制条件。
