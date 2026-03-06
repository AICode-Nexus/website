---
title: Prompt Contracts
description: 用输入、输出、边界、验证和证据字段把 prompt 从聊天提问升级成可复制的团队任务合同。
slug: /prompting-workflows/prompt-contracts
sidebar_label: Prompt Contracts
tags: [ai-coding, prompting, workflow]
track: prompting-workflows
kind: guide
audience: mixed
stage: intermediate
featured: false
pillar: workflows
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
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

## 常见错误

- 只写目标，不写边界
- 让 agent 自己决定完成标准
- 一次合同里同时塞多个主目标
- 没有证据字段，导致 PR 里还要重新解释

## 延伸阅读

- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
- [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows)
- [AI 开发规范](/docs/ai-development-standards)
