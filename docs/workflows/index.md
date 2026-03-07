---
title: AI 工作流
description: 把 planning、contract、执行、验证、review 和 PR 收成可复制的团队级流程，而不是临场发挥。
slug: /workflows
sidebar_label: AI 工作流
tags: [ai-coding, workflows, delivery]
track: prompting-workflows
kind: hub
audience: mixed
stage: starter
featured: true
pillar: workflows
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 工作流

## 这一类内容解决什么问题

- 把需求到 PR 的每一步职责拆开
- 让同类任务复用同一套输入、输出和验收方式
- 减少“这次能成、下次跑偏”的波动
- 让 agent 输出更容易被 review 和合并

## 先看哪两篇

如果你觉得这一层内容过去太“框架化”，先不要从抽象概念开始读，先看这两篇：

- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)：先回答“现在主流 workflow 到底有哪些”
- [AI 工作流实操手册](/docs/playbooks/workflow-playbook)：再回答“具体怎么跑、输入怎么写、什么叫完成”

## 先记住一条原则

工作流不是 prompt 模板集合，而是交付链路设计。

你至少要把这 6 个节点写清楚：

1. 需求 / spec
2. 计划
3. 执行
4. 验证
5. review
6. PR / handoff

## 先定任务类型，再选工作流

不是所有任务都需要同样复杂的流程。更合理的顺序是：

| 任务类型 | 推荐工作流 |
| --- | --- |
| 我想先知道主流 workflow 有哪些 | [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows) |
| 小 bug、局部修复 | [Bugfix / Refactor / Test](/docs/workflows/bugfix-refactor-test-workflows) |
| 新功能、跨模块改动 | [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery) |
| 平台或团队规范建设 | [任务工作流目录](/docs/workflows/workflow-catalog) |
| 长任务异步委派 | [异步 Agent 交付链](/docs/workflows/async-agent-delivery) |
| 框架选型和制度引入 | [工作流框架总览](/docs/workflows/frameworks-overview) |

## 一条最小交付闭环

对团队来说，最小闭环至少应包含：

1. 需求被写成可执行输入
2. 计划和执行分离
3. 验证命令前置写明
4. review 只检查边界、证据和风险
5. PR 说明能直接复用 agent 输出

如果这 5 件事还没稳定，不要急着增加更多 agent 或更复杂的 orchestration。

## 当前最值得先固化的 4 条流程

### 1. 需求到实现

适合中大型功能，核心是先有 spec，再有 plan，再进入 execution。

### 2. Bugfix / Refactor / Test

适合高频日常任务，核心是按任务类型收紧边界和验收标准。

### 3. 异步 Agent 委派

适合 issue、Jira、draft PR 这类已经进入工作系统的任务。

### 4. Review / PR 收口

适合把 AI 产出接回主干，核心是证据字段、质量门禁和最终 owner。

## 核心入口

- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [AI 工作流实操手册](/docs/playbooks/workflow-playbook)
- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
- [工作流框架总览](/docs/workflows/frameworks-overview)
- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [Bugfix / Refactor / Test 工作流](/docs/workflows/bugfix-refactor-test-workflows)
- [多 Agent 协作](/docs/workflows/multi-agent-collaboration)
- [任务工作流目录](/docs/workflows/workflow-catalog)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
- [Playbooks](/docs/playbooks)

## 什么时候说明你的工作流还不成熟

- 计划、执行和 review 混在同一轮对话里
- 不同任务每次都从零解释边界
- agent 输出无法直接映射到验证命令
- PR 里的人工修补量长期高于 agent 产出量
- 一旦换工具，原来的流程就整体失效

## 推荐的团队推进顺序

1. 先定义任务类型和默认工作流
2. 再给每类工作流补合同模板
3. 然后把验证、review 和 PR 字段写成固定清单
4. 最后再考虑多 agent、后台 agent、异步委派和更高级的 orchestration

## 往下看什么

- 想先比较入口：去 [AI 编程工具](/docs/tools)
- 想把规则文件写清：去 [AI 规范](/docs/standards)
- 想从架构层减少上下文成本：去 [AI 架构](/docs/architecture)
