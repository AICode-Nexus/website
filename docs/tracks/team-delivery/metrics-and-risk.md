---
title: 指标与风险
description: 用总完成时间、返工、review 修补量和风险边界来衡量 AI 开发，不再只看首次输出速度。
slug: /team-delivery/metrics-and-risk
sidebar_label: 指标与风险
tags: [ai-coding, metrics, risk]
track: team-delivery
kind: guide
audience: advanced
stage: advanced
featured: false
pillar: standards
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# 指标与风险

## 先给结论

AI 开发最容易误判的指标是“首次输出速度”。更应该看：

- 总完成时间
- 返工次数
- review 修补量
- 缺陷回流
- 风险边界是否被突破

## 一套最小指标集

| 维度 | 建议先看什么 |
| --- | --- |
| 效率 | 总完成时间、PR 周期 |
| 质量 | 缺陷回流、测试遗漏 |
| 成本 | review 修补量、人工补丁量 |
| 风险 | 越界次数、权限违规、回滚次数 |

## 第一阶段不要做什么

- 不要先上十几项指标
- 不要只看 demo 速度
- 不要把模型分数当成交付分数

## 推荐做法

- 用同一任务集比较前后变化
- 每周回顾一次失败模式
- 指标结果必须回流到规范和 workflow

## 延伸阅读

- [AI 开发规范](/docs/ai-development-standards)
- [质量门禁与 Review](/docs/team-delivery/quality-gates-and-review)
