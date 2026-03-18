---
title: PRD 大纲模板
description: 给产品经理的最小可用 PRD 结构，包含范围、验收、依赖与发布要求。
slug: /roles/product/templates/prd-outline
sidebar_label: PRD 大纲模板
tags: [ai-coding, product, templates]
track: cross-track
kind: template
content_form: template
audience: product-manager
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# PRD 大纲模板

```md
# {项目 / 功能名}

## 1. 背景
- 触发这次需求的业务背景
- 当前痛点和已有替代方案
- 为什么现在做

## 2. 目标
- 业务目标
- 用户目标
- 成功指标

## 3. 范围内
- 本次一定要交付的功能
- 关键路径和优先级

## 4. 范围外
- 这次明确不做什么
- 为什么不做

## 5. 目标用户与场景
- 主要用户
- 关键场景
- 触发条件

## 6. 用户故事
- 作为 {谁}，我想要 {什么}，从而 {为什么}
- 至少列出主路径和失败路径

## 7. 依赖与约束
- 设计依赖
- 技术依赖
- 法务 / 合规 / 数据限制

## 8. 验收标准
- 主路径通过条件
- 边界情况
- 不通过条件

## 9. 风险与待确认问题
- 仍未锁定的业务问题
- 需要技术验证的部分
- 需要额外数据支撑的判断

## 10. 发布与观测
- 上线节奏
- 上线后关注指标
- 回滚或止损条件
```

## 使用提醒

- `范围外` 不能省，否则需求会在实现阶段继续膨胀。
- `验收标准` 要能直接被测试和 reviewer 使用，而不是只写“体验更好”。
- `发布与观测` 不要等到上线当天才补。
