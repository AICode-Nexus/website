---
title: 多 Agent 协作
description: 解释什么时候需要多个 Agent 协作，以及串行、并行和人工监督各自最适合的任务形态。
slug: /prompting-workflows/multi-agent-collaboration
sidebar_label: 多 Agent 协作
tags: [ai-coding, agent, workflow]
track: prompting-workflows
kind: guide
audience: advanced
stage: advanced
featured: false
---

# 多 Agent 协作

## 背景

随着平台开始支持后台 agent、cloud agents 和并行执行，越来越多任务不再需要单个 Agent 从头跑到尾。但“多 Agent”不是能力炫技，它本质上是更严格的任务拆解和 handoff 设计。

## 结论先行

多 Agent 不等于更复杂就更好。只有在任务可拆分、结果可验证、责任边界明确时，多 Agent 才真正提高效率。

对于大多数个人工程师，推荐顺序是：

1. 先掌握单 Agent workflow
2. 再做串行协作
3. 最后才做并行协作

## 适用场景

- 大仓库巡检
- 长任务拆分
- 并行探索多个实现方向
- 把规划、执行、验证分给不同 agent

## 三种常见协作模式

### 1. 串行协作

一个 Agent 规划，一个 Agent 执行，必要时再由第三个 Agent 做验证。

适合：

- 结构清晰但步骤较多的任务
- 你想保留强控制权的长任务

优点：

- 最容易追责
- 最容易定位哪一环出了问题

### 2. 并行协作

多个 Agent 同时处理不同子任务，最后再合流。

适合：

- 不同目录的独立改动
- 多版本方案探索
- 大量巡检和批量处理

优点：

- 节省等待时间
- 能同时探索多个方向

风险：

- 子任务互相覆盖
- 合流成本高
- 最终 review 更复杂

### 3. 人类监督式协作

人类负责拆任务、验收和合流；Agent 负责局部执行。

这是最推荐的默认模式。

## 当前官方事实

截至 2026 年 3 月 6 日，多 Agent 已经不是抽象概念，而是多个产品的官方能力方向：

- OpenAI 在 2026 年 2 月 2 日发布 Codex app，把它定位成多 agent 的 command center，支持 parallel work、worktrees 和 agent handoff。
- VS Code 官方 agents 文档把 local、background、cloud 和 third-party agents 放进一个统一系统里，意味着同一工作台下的多 agent 协作已经成为官方设计目标。
- Cursor 官方文档说明 background agents 在隔离远程环境中运行，并能为任务创建独立分支，这使并行 handoff 更自然。
- Cline 的 Plan / Act 双模式虽然不是“多 Agent”官方命名，但它本质上也在把规划和执行拆成不同职责阶段。

## 什么时候值得上多 Agent

### 值得

- 任务可以按目录、模块或阶段清晰拆开
- 每个子任务都有可独立验证的结果
- 你能定义合流规则和最终负责人

### 不值得

- 任务边界还很模糊
- 子任务之间高度耦合
- 你还没有稳定的单 Agent 工作流
- 最终还是需要你自己把所有 diff 重新看一遍

## 一个推荐的协作模板

### 模式 A：规划 -> 执行 -> 验证

- Agent A：把任务拆成步骤和边界
- Agent B：完成代码改动
- Agent C：运行验证、总结风险
- Human：最终审阅和合并

### 模式 B：并行探索 -> 人类挑选 -> 单线收口

- Agent A：方案 1
- Agent B：方案 2
- Human：选择方向
- Agent C：把选中方案整理成最终提交

这个模式比“所有 agent 一起往前冲”更稳。

## 合流时必须明确的三件事

1. 谁负责最后的代码质量
2. 哪个 worktree / branch 是最终收口位置
3. 哪一套验收标准决定是否结束

## 常见错误

- 没有统一验收标准
- 子任务边界重叠
- 并行之后没有明确合流人
- 还没建立单 Agent 习惯，就直接上多 Agent

## 延伸阅读

- [Agent 执行模式](/docs/models-agents/agent-execution-modes)
- [指标与风险](/docs/team-delivery/metrics-and-risk)
- [终端 Agent 与 CLI](/docs/ides-tooling/terminal-agents-and-cli)

## 来源

- OpenAI, 2026-02-02, updated 2026-03-04: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- VS Code Docs: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- Cursor Docs: [Background Agents](https://docs.cursor.com/en/background-agents)
- Cline Docs: [Plan & Act Mode](https://docs.cline.bot/core-workflows/plan-and-act)
