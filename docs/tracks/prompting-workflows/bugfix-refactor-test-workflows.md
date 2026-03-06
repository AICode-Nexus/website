---
title: Bugfix / Refactor / Test 工作流
description: 用三类任务合同来组织团队级 AI 工作流，避免在同一轮里混合诊断、重构、测试和交付。
slug: /prompting-workflows/bugfix-refactor-test-workflows
sidebar_label: Bugfix / Refactor / Test
tags: [ai-coding, workflow, testing]
track: prompting-workflows
kind: guide
audience: mixed
stage: starter
featured: true
pillar: workflows
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# Bugfix / Refactor / Test 工作流

## 先给结论

AI 开发里最值得优先标准化的三类任务仍然是：

- bugfix
- refactor
- test

因为这三类任务覆盖了大部分日常开发，但它们的目标、边界和验收方式完全不同。

## 一张表看完

| 任务 | 第一目标 | 典型验证 |
| --- | --- | --- |
| bugfix | 修正确认的错误 | 复现关闭、回归通过 |
| refactor | 保行为不变 | 行为验证、结构收益说明 |
| test | 增加风险覆盖 | 用例通过、边界清楚 |

## Bugfix

推荐顺序：

1. 收集复现条件
2. 定位根因
3. 做最小修复
4. 跑验证
5. 报告证据

## Refactor

推荐顺序：

1. 先确认行为边界
2. 明确允许修改范围
3. 小步重构
4. 运行行为验证
5. 说明结构收益

## Test

推荐顺序：

1. 列出主路径和边界条件
2. 让 agent 先给测试计划
3. 再生成用例
4. 跑测试并报告缺口

## 不要混做

以下组合最容易失控：

- “顺手把重构一起做了”
- “顺便把测试全补了”
- “先改一版看看，再想验收”

## 延伸阅读

- [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)
- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
