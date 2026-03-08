---
title: 上下文、记忆与规则
description: 解释为什么规则文件、上下文切片、记忆机制和权限边界要分层设计，而不是把一切都交给 memory。
slug: /standards/context-memory-and-rules
sidebar_label: 上下文、记忆与规则
tags: [ai-coding, context, memory, rules]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: testing-validation
entry_role: domain
audience: mixed
stage: intermediate
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# 上下文、记忆与规则

## 结论先行

更稳定的优先顺序通常是：

1. 先写显式规则文件
2. 再设计任务上下文切片
3. 最后再引入记忆机制

Memory 可以提升效率，但不能替代仓库规则、任务合同和验证门禁。

## 适用场景

- 团队正在搭建多工具共存的仓库规范
- 已经发现记忆、rules、prompt 和 context 文件混在一起
- 希望降低上下文漂移和旧记忆污染

## 为什么要分层

### 规则

规则负责硬约束，例如：

- 哪些目录不能动
- 哪些命令必须跑
- 哪些操作必须审批

### 上下文

上下文负责当前任务的最小相关信息，而不是把整个仓库一次性塞给 agent。

### 记忆

记忆适合长期偏好和仓库习惯，但不适合作为唯一真相来源。

## 一条更稳的分工原则

| 层级 | 更适合存什么 |
| --- | --- |
| 规则文件 | 长期硬约束 |
| spec / contract | 当前任务边界 |
| 工作记忆 | 当前会话中的中间状态 |
| 长期记忆 | 习惯、偏好、稳定上下文 |

## 推荐做法

- 规则文件存长期约束
- contract / spec 存当前任务边界
- memory 只存长期偏好
- 高风险约束必须可见、可审阅、可版本化

## 常见错误

- 把禁止事项只存到 memory，不写到规则文件
- 把整个仓库路径树都塞进上下文
- 任务已经变更，但记忆仍在复用旧假设
- 没有验证命令，却希望依靠记忆自动保持质量

## 风险与边界

- 记忆越方便，越要警惕“旧信息被当成当前事实”
- 上下文越长，不代表命中率越高
- 高风险仓库不应把审批规则交给隐式记忆

## 延伸阅读

- [仓库规则文件体系](/docs/repo-instruction-files)
- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [质量门禁与 Review](/docs/standards/review-quality-gates)
