---
title: Prompt Contracts
description: 用输入、输出、边界和验收条件定义 prompt contract，让 AI coding 从聊天变成可重复流程。
slug: /prompting-workflows/prompt-contracts
sidebar_label: Prompt Contracts
tags: [ai-coding, prompting, workflow]
track: prompting-workflows
kind: guide
audience: individual
stage: intermediate
featured: false
---

# Prompt Contracts

## 背景

AI coding 最大的问题不是不会生成，而是输出不稳定、边界不清晰。很多失败并不是模型不够强，而是你给了一个“目标”，却没有给一份“合同”。

## 结论先行

Prompt contract 的目标不是让提示词更长，而是把这四件事说清楚：

1. 输入是什么
2. 输出是什么
3. 边界在哪里
4. 怎么算完成

只要这四件事不清楚，Agent 就会在你没说出来的地方自己补完假设。

## 适用场景

- 经常出现空泛回答
- 输出越界修改
- 希望多个任务复用同一套 prompt 结构
- 想降低同类任务的波动

## 核心概念

### 1. 输入

输入要包含：

- 任务目标
- 文件范围
- 当前错误或背景
- 约束条件

### 2. 输出

输出要约定：

- 需要给代码还是只给计划
- 是否要附带 diff 理由
- 是否要跑 test / lint
- 是否要列出风险点

### 3. 边界

边界要明确：

- 不能改哪些目录
- 不能做哪些顺手优化
- 遇到什么情况必须停下提问

### 4. 验收条件

没有验收条件，Agent 就会用自己的主观判断替你定义“完成”。

## 一份最小 contract 模板

```text
任务：
范围：
相关文件：
不要做：
输出要求：
验证方式：
遇到不确定时：先停下来提问
```

## 三类最常用 contract

### Bugfix Contract

重点是：

- 先定位根因
- 做最小修复
- 给出验证结果

### Refactor Contract

重点是：

- 保行为不变
- 明确哪些地方允许重构
- 说明结构收益和风险点

### Test Contract

重点是：

- 先定义覆盖目标
- 再写测试
- 区分主路径和边界条件

## 推荐做法

### 把 repo rules 接进 contract

Contract 不应该脱离仓库规则独立存在。最好直接指明：

- 要遵守哪些 instructions
- 哪些目录不能动
- 哪些命令必须跑

### 为高频任务建立固定版本

第一阶段只需要先做三份：

- bugfix
- refactor
- test

### 用失败复盘更新 contract

每次失败都问这三个问题：

- 是输入不清楚，还是边界没写？
- 是输出没定义，还是验收没定义？
- 下一次该新增哪一条约束？

## 一个坏 contract 长什么样

```text
帮我优化一下这个模块，顺便把测试也补了，尽量改好一点。
```

问题在于：

- 没范围
- 没边界
- 没验收条件
- 同时混了多个目标

## 一个更好的 contract 长什么样

```text
任务：修复 auth/login.ts 在 token 过期时返回 500 的问题
范围：仅允许修改 src/auth 和 tests/auth
不要做：不要重构 auth service，不要修改数据库层
输出：给出根因、最小修复、验证结果
验收：相关测试通过，新增 1 个 token 过期场景用例
```

## 常见错误

- 只写任务，不写边界
- 要求太泛
- 同时塞进多个主目标
- 没有定义完成标准
- 让 agent 自己猜哪些目录可以动

## 延伸阅读

- [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows)
- [上下文、记忆与规则](/docs/models-agents/context-memory-and-rules)
- [7 天上手路线](/docs/playbooks/first-7-days-ai-coding)
