---
title: Bugfix / Refactor / Test 工作流
description: 用任务分型的方法，把常见开发活动拆成三条最值得先掌握的 AI coding 工作流。
slug: /prompting-workflows/bugfix-refactor-test-workflows
sidebar_label: Bugfix / Refactor / Test 工作流
tags: [ai-coding, bugfix, refactor, testing]
track: prompting-workflows
kind: guide
audience: individual
stage: starter
featured: true
---

# Bugfix / Refactor / Test 工作流

## 背景

如果不按任务类型拆分，AI coding 很容易在一个大指令里同时做诊断、改动和校验，结果往往不稳。真正高价值的起点，不是让 Agent 包办一切，而是把高频任务收成三条稳定流程。

## 结论先行

先把工作流拆成 bugfix、refactor 和 test 三类，是个人工程师最值得优先掌握的做法。因为这三类任务覆盖了大部分真实日常开发，而且每一类的目标、边界和验收方式都不同。

## 适用场景

- 修 bug
- 做小型重构
- 给已有代码补测试
- 想把模糊的 AI 使用习惯收成固定动作

## 三条工作流分别解决什么问题

### Bugfix：先定位，再最小修复

标准顺序：

1. 收集报错和复现条件
2. 定位根因
3. 只做最小修复
4. 跑验证
5. 记录失败模式

Bugfix 最怕的是：还没确认根因，就顺手改一堆结构。

### Refactor：先保行为不变，再清理结构

标准顺序：

1. 先确认行为边界
2. 明确哪些地方允许改
3. 小步重构
4. 运行行为验证
5. 再看是否值得继续深入

Refactor 最怕的是：把结构清理和功能修改混在一起。

### Test：先定义覆盖目标，再写测试

标准顺序：

1. 明确要覆盖什么行为
2. 列出主路径和边界条件
3. 让 agent 先给测试计划
4. 再写测试
5. 检查是否覆盖真正风险点

Test 最怕的是：只为了覆盖率写无效测试。

## 推荐做法

### 每类任务只让 Agent 处理一个主目标

- bugfix：不要顺手 refactor
- refactor：不要顺手补功能
- test：不要顺手改实现

### 给三类任务分别写 contract

同一个 prompt 不要硬套所有任务。

### 把结果接进验证和 review 回路

最小闭环至少包含：

- lint 或 test
- 变更说明
- 人工复查高风险点

## 一份任务分型表

| 任务 | 第一目标 | 典型验证 |
| --- | --- | --- |
| Bugfix | 修正确行为 | 重现用例消失、相关测试通过 |
| Refactor | 保行为不变、改善结构 | 原测试通过、关键行为不变 |
| Test | 补覆盖和边界 | 新增测试能真正抓住风险 |

## 什么时候该用哪种执行模式

- Bugfix：优先本地 Agent 或 IDE 人类在环
- Refactor：优先本地 Agent，小步验证
- Test：本地 Agent 或 CLI 都适合，因为验证链路清晰
- 当任务已经边界清楚时，再考虑后台 Agent

## 常见错误

- 一次让 AI 同时修 bug、重构和补测试
- 不区分最小修复和结构改进
- 只看代码 diff，不跑验证
- 为了显得高级，过早上多 Agent

## 延伸阅读

- [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)
- [7 天上手路线](/docs/playbooks/first-7-days-ai-coding)
- [Agent 执行模式](/docs/models-agents/agent-execution-modes)
