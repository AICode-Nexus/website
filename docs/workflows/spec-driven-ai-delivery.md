---
title: Spec-driven AI Delivery
description: 用需求、计划、执行、验证、review 和 PR 的显式 handoff，把 AI 开发从聊天式协作升级为标准交付流程。
slug: /spec-driven-ai-delivery
sidebar_label: Spec-driven Delivery
tags: [ai-coding, workflow, delivery]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: solution-design
entry_role: domain
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# Spec-driven AI Delivery

## 结论先行

Spec-driven 的价值不在于多写几份 Markdown，而在于先把意图、边界、验收和风险固定下来，再让 agent 进入执行。

对团队最重要的收益有三点：

- 减少“方向错了但改得很快”的返工
- 让 plan、execution、review 之间可以交接
- 让不同工具共享同一套需求输入

## 适用场景

- 新功能或跨模块改动
- 需要多人协作或异步 handoff 的任务
- 风险较高、必须先定边界的任务
- 需要把需求长期沉淀进知识库的项目

不太适合：

- 已经定位清楚的小 bug
- 一次性脚本或极短生命周期的修改
- 没有业务不确定性的纯机械替换

## 最小产物清单

真正可执行的 spec-driven 链路，不一定要很重，但最好至少有这 4 个产物：

| 产物 | 解决的问题 |
| --- | --- |
| `spec` | 到底要做什么，什么不做 |
| `plan` | 先后顺序、改动范围、验证方式 |
| `contract` | 单个 agent 任务的输入输出与边界 |
| `review evidence` | 如何证明结果符合预期 |

## 推荐链路

### 1. 写 spec

spec 要先回答：

- 目标用户或使用者是谁
- 这次要改变什么行为
- 明确不做什么
- 哪些风险需要单独处理

### 2. 写 plan

plan 不需要把代码细节写满，但要至少写清：

- 改哪些目录或模块
- 先做什么再做什么
- 哪些验证必须在合并前通过
- 哪些地方需要人工审阅

### 3. 下发 task contract

当任务进入具体 agent 时，就不要再把整份 spec 原样复制过去，而应收敛成更短的合同：

- 任务目标
- 范围边界
- 可编辑文件
- 禁止事项
- 验证命令
- 交付证据

### 4. review 与 PR 收口

review 的重点不是重复读需求，而是检查：

- 是否越界
- 是否满足 contract
- 是否给出验证证据
- 是否有未声明风险

## 三种常见失败模式

### Spec 太像愿景，不像交付输入

只有方向、没有范围和验收，结果执行阶段仍然靠猜。

### Plan 直接变成写代码

还没把顺序和边界讲清，就进入实现，review 时才发现方向偏了。

### Contract 没有证据字段

最后 PR 说明、验证结果和人类 review 又要重做一次。

## 推荐做法

1. 小团队先把 spec 和 plan 合并成一份也可以，但必须保留边界和验收段落
2. 高风险功能一定把 contract 和 review evidence 单独写清
3. 先把 spec-driven 用在新功能和跨模块改动，不要一开始覆盖所有任务

## 不要做

- 不要把 spec 写成产品宣传稿
- 不要用同一份长文档直接喂给所有 agent
- 不要在 plan 阶段顺手开始实现
- 不要等 PR 阶段才补验收标准

## 延伸阅读

- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [任务工作流目录](/docs/workflows/workflow-catalog)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
