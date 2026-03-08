---
title: Agent 执行模式
description: 比较聊天式、编辑器内执行、后台 Agent 和异步委派四种主流 Agent 执行模式。
slug: /development-modes/agent-execution-modes
sidebar_label: Agent 执行模式
tags: [ai-coding, agent, execution]
track: cross-track
kind: guide
content_form: guide
domain: development-modes
journey_stage: raw-need
entry_role: domain
audience: individual
stage: intermediate
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# Agent 执行模式

## 背景

很多人觉得“Agent 不稳定”，其实经常是把不适合的任务交给了错误的执行模式。任务、上下文和监督方式不匹配，结果自然会差。

## 结论先行

可以先把常见执行模式分成四类：

1. 聊天式
2. 编辑器内本地 Agent
3. 后台本地 Agent
4. 云端 / 异步委派 Agent

它们并不是“越往后越高级”。正确顺序应该是：先按任务形态选执行模式，再选产品。

## 适用场景

- 给任务选执行方式
- 比较平台的 agent 能力
- 建立个人默认工作流
- 区分同步任务和异步任务

## 先用一张矩阵判断

| 任务状态 | 更适合的执行模式 | 原因 |
| --- | --- | --- |
| 需求还模糊 | 聊天式 | 先澄清目标和边界，避免过早执行 |
| 需要高频人工介入 | 编辑器内本地 Agent | 人类纠偏成本最低 |
| 任务明确且可验证 | 后台本地 Agent | 可以把修改与验证串起来 |
| 从 issue / Jira / PR 派发 | 云端 / 异步 Agent | 更接近真实工作系统 |

## 核心概念

### 1. 聊天式

适合：

- 讨论思路
- 解释错误信息
- 快速问答
- 写 contract 和规划

不适合：

- 需要实际跑命令验证的任务
- 多文件连续修改
- 长任务后台推进

### 2. 编辑器内本地 Agent

适合：

- 人类在环的跨文件修改
- bugfix、refactor、test 这类需要随时介入的任务
- 需要读当前编辑器上下文、选区、错误提示的任务

优点：

- 反馈快
- 便于中途纠偏
- 最适合从模糊到清晰的任务

### 3. 后台本地 Agent

适合：

- 有明确范围和验收条件的任务
- 可以在你继续做别的工作时独立推进的任务
- 需要隔离环境和 worktree 的任务

优点：

- 不阻塞当前主工作区
- 适合并行尝试多个小任务
- 更容易跑完整验证回路

### 4. 云端 / 异步委派 Agent

适合：

- 从 issue / Jira / PR 出发的任务
- 长任务、多步骤任务
- 需要 draft PR、异步协作和团队 handoff 的任务

优点：

- 更接近真实交付链路
- 天然适合 team collaboration
- 更容易做多任务并行

## 一张表看完

| 执行模式 | 最适合的任务 | 你的控制强度 | 典型风险 |
| --- | --- | --- | --- |
| 聊天式 | 解释、规划、问答 | 高 | 执行闭环弱 |
| 本地 Agent | bugfix、refactor、test | 高 | 容易被模糊任务拖长 |
| 后台 Agent | 明确范围的独立任务 | 中 | 如果上下文没给够，会偏航 |
| 云端 / 异步 Agent | issue / PR / Jira 驱动任务 | 中到低 | 边界不清时返工成本高 |

## 怎么选默认模式

### 选聊天式，如果你现在还在探索问题

例如：

- 先理解陌生模块
- 讨论方案
- 写第一版 prompt contract
- 做 review 前的问题梳理

### 选本地 Agent，如果你现在要在 IDE 里快速完成任务

例如：

- 修一个有明确复现步骤的 bug
- 做一个局部小型 refactor
- 给当前模块补测试

### 选后台 Agent，如果任务已经被定义清楚

例如：

- 按既定计划实现一组低风险修改
- 跑多版本 proof of concept
- 在隔离 worktree 中完成一轮验证

### 选云端 / 异步 Agent，如果任务天然属于 system of work

例如：

- 从 Jira 工作项生成 draft PR
- 从 GitHub issue 委派一个明确的改动任务
- 并行推进多个彼此独立的长任务

## 推荐的 handoff 顺序

更稳妥的链路通常不是直接把任务扔给最强 agent，而是：

1. 先用聊天式或 planning mode 写清 contract
2. 再用本地 Agent 完成模糊到清晰的部分
3. 当任务已经有边界和验收后，再转后台或云端
4. 最后回到人工 review 与 PR 收口

这条顺序的核心不是保守，而是避免把最昂贵的返工放在长任务末端。

## 实操建议

1. 先用聊天式写清楚任务边界
2. 再用本地 Agent 完成模糊到清晰的前半段
3. 只有当任务已经可验证时，再 handoff 给后台或云端 Agent
4. 长任务必须要有 worktree、规则文件和验证回路

## 常见错误

- 一上来就把模糊需求交给后台 Agent
- 没有定义验收标准，就直接异步委派
- 把云端 Agent 当作“更强聊天框”
- 用同一模式硬覆盖所有任务

## 延伸阅读

- [上下文、记忆与规则](/docs/standards/context-memory-and-rules)
- [终端 Agent 与 CLI](/docs/tools/terminal-agents-and-cli)
- [Bugfix / Refactor / Test 工作流](/docs/workflows/bugfix-refactor-test-workflows)
