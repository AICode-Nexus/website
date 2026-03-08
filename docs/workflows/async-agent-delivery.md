---
title: 异步 Agent 交付链
description: 覆盖 issue 或 Jira 到 spec、plan、agent、verify、review、PR 的异步交付链，帮助团队安全接入后台或云端 Agent。
slug: /workflows/async-agent-delivery
sidebar_label: 异步 Agent 交付链
tags: [ai-coding, agent, async]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: implementation
entry_role: domain
audience: advanced
stage: advanced
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# 异步 Agent 交付链

## 结论先行

异步 agent 最适合已经进入工作系统、边界清楚、可通过验证命令判断完成与否的任务。它不适合承担模糊需求澄清，也不适合跳过人工收口。

## 适用场景

- 从 issue、Jira 或 ticket 直接派发任务
- 长任务、后台任务、并行 worktree 任务
- 希望把 agent 纳入真实团队交付链路

## 一条推荐链路

```text
Issue / Jira
  -> Spec / Acceptance
  -> Plan / Contract
  -> Agent execution
  -> Verification
  -> Human review
  -> Draft PR
  -> Merge
```

## 每个节点要交什么

### 1. Issue / Jira

至少包含：

- 业务目标
- 验收标准
- 风险级别
- 相关目录或服务

### 2. Spec / Acceptance

把工作项从“有人能懂”升级成“agent 也能执行”：

- 做什么
- 不做什么
- 何时算完成
- 哪些环节必须人工确认

### 3. Plan / Contract

把大目标下沉为可执行合同：

- 改动范围
- 验证命令
- 权限边界
- 交付证据

### 4. Agent execution

只适合做已经明确、可验证的任务，不负责重新解释需求。

### 5. Verification

必须明确：

- 哪些命令必须通过
- 哪些结果需要截图或日志
- 哪些失败需要退回人工

### 6. Human review

异步 agent 的关键价值不是替代 review，而是让 review 聚焦在：

- 是否越界
- 是否满足验收
- 是否存在剩余风险

### 7. Draft PR

PR 描述应直接复用 agent 证据，包括：

- 做了什么
- 验证怎么跑的
- 已知风险是什么

## 推荐做法

1. 先从低风险、结构清楚的任务开始异步委派
2. 先把 contract 和验证命令写清，再放开后台执行
3. 保留最终人工 owner，对 PR 和 merge 负责

## 不要做

- 不要把模糊需求直接扔给异步 agent
- 不要没有验证命令就让 agent 自报完成
- 不要把 draft PR 当作无需 review 的完成态
- 不要在主工作区直接让长任务无边界运行

## 风险与边界

异步 agent 最大的风险不是“写不出代码”，而是：

- 写得很快，但目标不对
- 验证不完整，问题延迟到 merge 后暴露
- 没有单一 owner 收口，最后责任不清

## 延伸阅读

- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
- [任务工作流目录](/docs/workflows/workflow-catalog)
- [质量门禁与 Review](/docs/standards/review-quality-gates)
