---
title: 提示词与工作流
description: 把 prompt、rules、task framing 和 bugfix/refactor/test 流程做成可复用的个人工作流资产。
slug: /prompting-workflows
sidebar_label: 提示词与工作流
tags: [ai-coding, workflow, prompting]
track: prompting-workflows
kind: hub
audience: individual
stage: starter
featured: true
---

# 提示词与工作流

## 这一类内容解决什么问题

- 怎么让 AI 输出更接近可合并代码
- 不同任务类型应该怎么写 prompt contract
- 多轮协作和多 Agent 应该怎样拆分
- 为什么同一个模型，在不同 workflow 下结果差这么多

## 谁应该先读

- 输出经常空泛、跑偏或越界的工程师
- 想把 AI coding 变成标准操作而不是临场发挥的人
- 想快速建立 bugfix、refactor、test 流程的人
- 已经有工具，但还没有“可复制动作”的读者

## 先掌握三件事

### 先把任务写成 contract

不要只写目标，也要写：

- 输入范围
- 输出形式
- 禁止触碰区域
- 验收标准

先读：

- [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)

### 再把任务分成三类 workflow

第一阶段最值得练的只有三类：

- bugfix
- refactor
- test

先读：

- [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows)

### 最后再引入多 Agent

多 Agent 不是“更高级的聊天”，而是更严格的任务拆解和交接。

先读：

- [多 Agent 协作](/docs/prompting-workflows/multi-agent-collaboration)

## 推荐阅读顺序

1. 先读 [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)，把提示词从聊天变成任务合同
2. 再读 [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows)，建立三条最高价值流程
3. 最后读 [多 Agent 协作](/docs/prompting-workflows/multi-agent-collaboration)，判断什么时候真的需要并行或交接

## 什么时候说明你的 workflow 还不成熟

- 每次都要重新解释 repo 结构
- 经常出现越界修改
- 同一类任务每次 prompt 都完全重写
- 结果看起来“会写代码”，但难以 merge

## 精选文档入口

- [7 天上手路线](/docs/playbooks/first-7-days-ai-coding)
- [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)
- [上下文、记忆与规则](/docs/models-agents/context-memory-and-rules)
