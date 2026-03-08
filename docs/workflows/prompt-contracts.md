---
title: Prompt Contracts
description: 用输入、输出、边界、验证和证据字段把 prompt 从聊天提问升级成可复制的团队任务合同。
slug: /workflows/prompt-contracts
sidebar_label: Prompt Contracts
tags: [ai-coding, prompting, workflow]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: normalized-requirement
entry_role: domain
audience: mixed
stage: intermediate
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# Prompt Contracts

## 先给结论

Prompt contract 的作用不是把提示词写得更长，而是把任务边界写得更清楚。它最少要回答 5 个问题：

1. 输入是什么
2. 输出是什么
3. 能改哪里
4. 怎么验证
5. 要交什么证据

## 适用场景

- 把同类任务做成可复用模板
- 在不同工具之间共享同一套任务描述
- 把执行、验证和 review 接起来
- 降低“这次改成了，下次又跑偏”的波动

## 一份最小模板

```text
任务：
范围：
相关文件：
不要做：
输出要求：
验证方式：
交付证据：
遇到不确定时：先停下来问
```

## 合同字段应该怎么写

### 输入

说明需求来源、相关文件、上下文材料和前置条件。

### 输出

说明希望交付什么，例如：

- 代码修改
- 测试用例
- 根因说明
- PR 描述草稿

### 边界

说明允许改动和禁止改动的目录、命令、依赖、架构层。

### 验证

说明要跑哪些命令，什么结果算通过。

### 证据

说明最终必须给出哪些结果，例如测试输出、截图、diff 说明或风险声明。

## 为什么团队要用 contract

- 同类任务可以复用
- 不同工具能共享同一套输入输出
- review 更容易判断是否越界
- 失败模式可以回流进模板，而不是只靠个人经验

## 3 类最值得先固化的 contract

### Bugfix

- 先定位根因
- 只做最小修复
- 给出复现和验证结果

### Refactor

- 先定义行为边界
- 写清允许改动的结构层
- 给出行为不变的验证证据

### Test

- 先定义覆盖目标
- 先给测试计划再落用例
- 区分主路径和边界条件

## 推荐做法

1. 每类高频任务至少维护一份可复制模板
2. 合同里必须写可验证命令，而不是只写“请自测”
3. 合同要明确接管点，遇到超边界情况必须停下来
4. 复盘失败案例时，优先回写合同模板而不是只做口头经验分享

## 常见错误

- 只写目标，不写边界
- 让 agent 自己决定完成标准
- 一次合同里同时塞多个主目标
- 没有证据字段，导致 PR 里还要重新解释
- 任务已经变了，合同却还是旧版本

## 一份更适合团队使用的模板

```text
任务目标：
背景与上下文：
允许修改：
禁止修改：
验证命令：
交付物：
风险提示：
超边界时如何处理：
```

## 延伸阅读

- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
- [Bugfix / Refactor / Test 工作流](/docs/workflows/bugfix-refactor-test-workflows)
- [AI 开发规范](/docs/ai-development-standards)
