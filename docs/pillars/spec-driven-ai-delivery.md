---
title: Spec-driven AI Delivery
description: 用需求、计划、执行、验证、review 和 PR 的显式 handoff，把 AI 开发从聊天式协作升级为标准交付流程。
slug: /spec-driven-ai-delivery
sidebar_label: Spec-driven Delivery
tags: [ai-coding, workflow, delivery]
track: prompting-workflows
kind: guide
audience: advanced
stage: intermediate
featured: false
pillar: workflows
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# Spec-driven AI Delivery

## 先给结论

如果需求跨模块、涉及多个角色或存在明显边界风险，最稳的做法不是“直接让 agent 开始改”，而是先把交付链路拆成：

1. `Spec`
2. `Plan`
3. `Execute`
4. `Verify`
5. `Review`
6. `PR / Handoff`

## 为什么这条链路重要

AI 最容易失控的地方不在代码生成本身，而在：

- 范围蔓延
- 假设不透明
- 验收标准缺失
- review 只剩下收拾卫生

Spec-driven 的作用就是把这些问题前移。

## 一条最小交付链

### 1. Spec

明确：

- 目标
- 范围
- 禁止触碰区域
- 验收条件

### 2. Plan

要求 agent 先给出：

- 会改哪些文件
- 不会改哪些文件
- 需要哪些验证命令
- 哪些风险需要人工确认

### 3. Execute

执行阶段只做已经批准的计划，不额外扩边界。

### 4. Verify

必须跑约定命令，并报告失败信息，而不是只说“已完成”。

### 5. Review

Review 重点看：

- 是否越界
- 是否满足 spec
- 是否留下未声明风险

### 6. PR / Handoff

最后收口到：

- 变更摘要
- 验证结果
- 未解决问题
- 下一步建议

## 什么时候必须用 spec-first

- 涉及 auth、payment、infra、migration
- 涉及多目录或多服务协作
- 需要后台 agent 或并行 worktree
- 团队想让多个工具共享同一套验收标准

## 与 Prompt Contract 的关系

- `Prompt Contract` 解决单个任务输入输出
- `Spec-driven Delivery` 解决整条交付链如何拆阶段

两者不是替代关系，而是上下游关系。

## 推荐搭配

- 计划阶段：要求先输出 plan，不直接修改
- 执行阶段：只允许在已批准范围内改动
- 验证阶段：固定 lint / test / build / review checklist
- PR 阶段：要求附带 summary、risk、evidence

## 延伸阅读

- [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)
- [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows)
- [AI 开发规范](/docs/ai-development-standards)
