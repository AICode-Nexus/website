---
title: 模型与 Agent
description: 追踪 coding model、memory、rules、Agent 执行模式和真实工程中的模型边界。
slug: /models-agents
sidebar_label: 模型与 Agent
tags: [ai-coding, model, agent]
track: models-agents
kind: hub
audience: individual
stage: starter
featured: true
---

# 模型与 Agent

## 这一类内容解决什么问题

- 什么时候该关心模型本身，什么时候该关心 Agent 执行方式
- memory、rules、context 到底影响什么
- 为什么同一个模型接进不同平台，体验会差很多
- 为什么 benchmark 看起来更强，不一定等于你仓库里的交付更稳

## 谁应该先读

- 正在选主平台的个人工程师
- 想理解“模型强”和“工作流强”差别的人
- 想减少上下文重复输入的人
- 已经在用 agent，但不清楚它到底受什么约束的人

## 先回答三个问题

### 问题 1：你现在真正卡在哪里

- 如果你卡在回答质量：先看模型评分卡
- 如果你卡在执行稳定性：先看 Agent 执行模式
- 如果你卡在上下文不断重讲：先看 memory、rules 和 context

### 问题 2：你的任务是同步还是异步

同步任务更依赖交互质量和局部控制。

异步任务更依赖 worktree、sandbox、hooks 和长期上下文保持。

### 问题 3：问题到底属于模型，还是属于平台

很多问题其实不是“模型不行”，而是：

- rules 没写清楚
- context 装载不稳定
- 验收标准不清楚
- Agent 执行范围过大

## 子主题地图

### 模型评分卡

看质量、速度、稳定性、长任务表现和规则遵守度。

先读：

- [Coding Models 评分卡](/docs/models-agents/coding-models-scorecard)

### Agent 执行模式

看聊天式、本地 agent、后台 agent、云端 agent、异步委派之间的差异。

先读：

- [Agent 执行模式](/docs/models-agents/agent-execution-modes)

### 上下文、记忆与规则

看 memory、repo rules、instructions、hook 对真实质量的影响。

先读：

- [上下文、记忆与规则](/docs/models-agents/context-memory-and-rules)

## 推荐阅读顺序

1. 先用 [Coding Models 评分卡](/docs/models-agents/coding-models-scorecard) 建立评估维度
2. 再用 [Agent 执行模式](/docs/models-agents/agent-execution-modes) 理解不同入口的边界
3. 最后读 [上下文、记忆与规则](/docs/models-agents/context-memory-and-rules)，把质量问题带回可操作层

## 初学者容易犯的错

- 把模型版本升级当成唯一进步来源
- 只看一次 demo，不看长任务后半程漂移
- 把 memory 当成魔法，而不是受规则约束的长期上下文机制
- 让 Agent 在没有边界的情况下直接改核心模块

## 精选文档入口

- [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex)
- [AI Coding 平台比较框架](/docs/comparisons/ai-coding-platform-comparison-framework)
- [2026 年 3 月 AI Coding 的四个主线变化](/docs/insights/agentic-coding-patterns)
