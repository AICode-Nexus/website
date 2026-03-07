---
title: 质量门禁与 Review
description: 让 AI 产出进入可控交付流程的关键，是把 review、验证和路径级规则设计成统一门禁，而不是只依赖人工兜底。
slug: /standards/review-quality-gates
sidebar_label: 质量门禁与 Review
tags: [ai-coding, quality, review]
track: cross-track
kind: guide
audience: advanced
stage: intermediate
featured: false
pillar: standards
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# 质量门禁与 Review

## 先给结论

高质量门禁的目标不是拖慢速度，而是把低价值的人肉修补前移成更自动、更清楚的拦截。

## 适用场景

- 团队正在让 AI 输出进入主干流程
- review 成本正在上升，但返工仍然很多
- 需要把“可合并”定义成明确标准

## 最小门禁栈

- lint
- test
- build / type check
- 高风险目录审批
- PR 证据字段

## Review 应该重点看什么

- 是否越界
- 是否满足 spec / contract
- 是否给出验证证据
- 是否引入未声明风险

## 为什么这在 AI 开发里更重要

AI 会放大两件事：

- 交付速度
- 错误扩散速度

所以越不能把 review 只理解成“看一下代码风格”。

## 一套推荐流程

### 1. 任务开始前定义门禁

写清需要跑的命令、禁止越界的目录和人工接管点。

### 2. 执行阶段输出证据

不要只说“已完成”，而要给出：

- 运行了哪些命令
- 哪些结果通过
- 哪些风险仍然存在

### 3. Review 只看高价值问题

把 review 时间集中在：

- 边界
- 风险
- 验证充分性
- PR 说明质量

## 推荐做法

1. 先建立最小门禁栈，再逐步增加专项检查
2. 让 PR 模板要求 summary、evidence、risk 三类字段
3. 高风险目录只允许人工最终批准
4. 把 review 发现回流到 contract、rules 和 CI

## 常见错误

- 把所有质量问题都留给 review
- 没有证据字段，只能靠 reviewer 重新跑一遍
- agent 可以越界改动，但 review 阶段才发现
- 只加更多检查，不明确 owner 和放行标准

## 延伸阅读

- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [指标与风险](/docs/standards/evaluation-risk-metrics)
- [AI 开发规范](/docs/ai-development-standards)
