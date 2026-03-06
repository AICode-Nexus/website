---
title: 多 Agent 协作
description: 解释什么时候应该用多 Agent，什么时候不该用，以及串行 handoff 与并行拆分各自需要什么前提。
slug: /prompting-workflows/multi-agent-collaboration
sidebar_label: 多 Agent 协作
tags: [ai-coding, agent, workflow]
track: prompting-workflows
kind: guide
audience: advanced
stage: advanced
featured: false
pillar: workflows
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# 多 Agent 协作

## 先给结论

多 Agent 不是“更高级的聊天”，而是更严格的任务拆分和 handoff 设计。

## 什么时候值得上多 Agent

- 任务可以按目录、模块或阶段拆开
- 每个子任务都有独立验证标准
- 最后收口位置明确

## 什么时候不该上

- 边界还模糊
- 子任务强耦合
- 没有单一 owner 负责收口

## 两种常见模式

### 串行 handoff

适合：

- 先计划，后执行
- 先研究，后落地
- 先写测试计划，再写测试

### 并行拆分

适合：

- 多模块低耦合改动
- 明确的目录分工
- 长任务需要并行探索

## 最重要的不是数量，而是交接合同

每个 handoff 至少要写清：

- 目标
- 边界
- 输出
- 验证方式
- 收口负责人

## 延伸阅读

- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
- [AI 原生工程架构](/docs/ai-native-engineering-architecture)
