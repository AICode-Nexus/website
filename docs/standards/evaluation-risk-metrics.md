---
title: 指标与风险
description: 用总完成时间、返工、review 修补量和风险边界来衡量 AI 开发，不再只看首次输出速度。
slug: /standards/evaluation-risk-metrics
sidebar_label: 指标与风险
tags: [ai-coding, metrics, risk]
track: cross-track
kind: guide
audience: advanced
stage: advanced
featured: false
pillar: standards
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
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

## 适用场景

- 团队正在评估 AI 工具与流程是否真的有效
- 已经有“感觉更快”，但没有共识化指标
- 需要把失败模式回流到规范和工作流

## 一套最小指标集

| 维度 | 建议先看什么 |
| --- | --- |
| 效率 | 总完成时间、PR 周期 |
| 质量 | 缺陷回流、测试遗漏 |
| 成本 | review 修补量、人工补丁量 |
| 风险 | 越界次数、权限违规、回滚次数 |

## 推荐的观察方式

### 1. 先看任务闭环，不只看首轮回答

真正有意义的是从需求到合并的总时间，而不是 agent 第一次输出用了几秒。

### 2. 先看返工和 review 修补量

如果初稿很快，但 reviewer 需要大量返修，整体效率并没有提升。

### 3. 把风险单独建模

高风险任务不能只看速度和通过率，还要看：

- 是否越界
- 是否触发审批
- 是否带来回滚或事故

## 第一阶段不要做什么

- 不要先上十几项指标
- 不要只看 demo 速度
- 不要把模型分数当成交付分数

## 推荐做法

1. 用同一任务集比较前后变化
2. 每周回顾一次失败模式
3. 指标结果必须回流到规范和 workflow
4. 高风险任务单独看，不和低风险任务混在一起平均

## 常见错误

- 把速度提升当作唯一价值
- 没有任务分型，导致指标不可比
- 只按工具比，不按流程和任务类型比
- 发现问题后不回写到 rules、templates 和 review 清单

## 延伸阅读

- [质量门禁与 Review](/docs/standards/review-quality-gates)
- [AI 工作流](/docs/workflows)
- [AI 开发规范](/docs/ai-development-standards)
