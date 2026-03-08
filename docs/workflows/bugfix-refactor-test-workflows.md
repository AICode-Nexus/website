---
title: Bugfix / Refactor / Test 工作流
description: 用三类任务合同来组织团队级 AI 工作流，避免在同一轮里混合诊断、重构、测试和交付。
slug: /workflows/bugfix-refactor-test-workflows
sidebar_label: Bugfix / Refactor / Test
tags: [ai-coding, workflow, testing]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: testing-validation
entry_role: domain
audience: mixed
stage: starter
featured: true
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
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

## 适用场景

- 日常高频任务标准化
- 团队想先建立最小 AI 工作流闭环
- 需要给不同工具复用同一套任务合同

## Bugfix

### 推荐合同

```text
目标：修复已确认 bug
范围：仅修改相关模块和测试
先做：复现 -> 根因 -> 最小修复
验证：复现关闭 + 回归通过
证据：根因、改动点、验证结果
```

### 推荐顺序

1. 收集复现条件
2. 定位根因
3. 做最小修复
4. 跑验证
5. 报告证据

## Refactor

### 推荐合同

```text
目标：改善结构，但行为不变
范围：限定目录和接口边界
先做：行为边界确认 -> 小步重构
验证：现有测试、关键路径验证
证据：收益说明、风险声明
```

### 推荐顺序

1. 先确认行为边界
2. 明确允许修改范围
3. 小步重构
4. 运行行为验证
5. 说明结构收益

## Test

### 推荐合同

```text
目标：补齐风险覆盖
范围：明确模块、测试层级和不覆盖项
先做：测试计划 -> 用例实现 -> 运行结果
验证：目标用例通过
证据：覆盖范围、未覆盖风险
```

### 推荐顺序

1. 列出主路径和边界条件
2. 让 agent 先给测试计划
3. 再生成用例
4. 跑测试并报告缺口

## 三类任务的分工边界

| 任务 | 最容易失控的点 | 最好的防护方式 |
| --- | --- | --- |
| bugfix | 顺手扩大范围 | 先写最小修复边界 |
| refactor | 行为悄悄改变 | 强制说明不变项与验证命令 |
| test | 为了通过而写脆弱用例 | 先给计划，再写实现 |

## 不要混做

以下组合最容易失控：

- “顺手把重构一起做了”
- “顺便把测试全补了”
- “先改一版看看，再想验收”

## 推荐做法

1. 先按任务类型选模板，不要让 agent 自己猜
2. 所有任务都要求输出验证证据
3. 混合任务拆成多个合同，再由人类收口
4. 复盘返工时，先回写模板与门禁

## 延伸阅读

- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
