---
title: Agent 执行模式
description: 比较聊天式、编辑器内执行、后台 Agent 和异步委派四种主流 Agent 执行模式。
slug: /models-agents/agent-execution-modes
sidebar_label: Agent 执行模式
tags: [ai-coding, agent, execution]
track: models-agents
kind: guide
audience: individual
stage: intermediate
featured: false
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

## 当前官方事实

截至 2026 年 3 月 6 日，几家主要产品已经把这些执行模式明确区分出来：

- VS Code agents 官方文档把 agent 分为 `local`、`background`、`cloud` 和 `third-party` 四类。
- VS Code 说明 background agents 在本地后台通过 CLI 运行，并使用 Git worktrees 隔离工作。
- GitHub Docs 说明 Copilot coding agent 可以“在后台独立工作”，并直接进入 GitHub 的 PR 工作流。
- OpenAI 在 2026 年 2 月 2 日发布 Codex app，把它定位为管理多个 agent 的 command center，用于 parallel agents 和 long-running tasks。
- Cursor 官方文档说明 background agents 在隔离的 Ubuntu 远程环境中运行，具备 internet access，并能编辑和执行代码。

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

- [上下文、记忆与规则](/docs/models-agents/context-memory-and-rules)
- [终端 Agent 与 CLI](/docs/ides-tooling/terminal-agents-and-cli)
- [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows)

## 来源

- VS Code Docs: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- VS Code Docs: [Background agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- VS Code Docs: [Cloud agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/cloud-agents)
- GitHub Docs: [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
- OpenAI, 2026-02-02, updated 2026-03-04: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- Cursor Docs: [Background Agents](https://docs.cursor.com/en/background-agents)
