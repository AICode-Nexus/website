---
title: 统一 Agent 平台 + 自研 Frontier：企业级 AI 交付为什么要双线建设
description: 解释企业为什么不能只做模型或只做平台，以及统一 Agent 平台和自研 Frontier 能力各自解决什么问题、该按什么顺序建设。
slug: /tools/insights/unified-agent-platform-frontier
sidebar_label: 平台 + Frontier
tags: [ai-coding, insight, agent-platform, frontier, enterprise]
track: cross-track
kind: insight
content_form: insight
domain: ecosystem
journey_stage: tech-selection
entry_role: domain
audience: mixed
stage: advanced
featured: false
reviewed_at: 2026-03-25
source_window_end: 2026-03-25
market_status: current
---

# 统一 Agent 平台 + 自研 Frontier：企业级 AI 交付为什么要双线建设

## 背景

- 事实：GitHub issue [#5 `统一 Agent 平台 + 自研 Frontier 能力`](https://github.com/AICode-Nexus/website/issues/5) 由 `trsoliu` 于 `2026-03-25 03:23:58 UTC` 创建，正文是“讲一讲企业生产 统一 Agent 平台 + 自研 Frontier 能力的建设”。
- 事实：截至 `2026-03-25 14:26:00 +08:00` 的 issue 快照，这条 issue 当前状态为 Open，仓库里还没有一篇明确对应该主题的中文独立页面。
- 推断：这条 issue 关心的不是某个单点模型怎么选，而是企业为什么会同时建设“统一 Agent 平台”和“自研 Frontier 能力”两条线，以及这两条线怎样分工。

## 结论先行

企业级 AI 交付里，`统一 Agent 平台` 和 `自研 Frontier 能力` 不是互相替代，而是分别解决两个不同层面的问题：

- `统一 Agent 平台` 解决的是规模化交付问题：入口统一、权限治理、工具接入、任务编排、审计与评估。
- `自研 Frontier 能力` 解决的是核心差异化问题：模型质量、领域适配、成本结构、数据闭环与长期壁垒。

只做平台、不做 Frontier，容易变成“接了很多模型，但关键体验和成本不受控”。  
只做 Frontier、不做平台，容易变成“模型很强，但进不了真实业务流程”。

## 先把两个概念分开

### 什么是统一 Agent 平台

这里说的平台，不是一个聊天窗口，而是企业内部把 agent 变成基础设施的那层系统。它通常至少包括：

- 身份、权限和审批
- 工具接入与资源访问
- Prompt / policy / guardrails 管理
- 任务编排、队列与异步执行
- 观测、评估、审计与成本追踪
- 团队共用的模板、runbook 和治理规则

如果没有这层，agent 只能停留在零散试验。

### 什么是自研 Frontier 能力

这里的 Frontier 也不一定只指“从零训练一个基础模型”。更实际的企业语境通常包括三层：

1. 对最关键任务拥有足够强的模型能力控制权。
2. 能针对自家数据、场景和约束做深度适配。
3. 在长期成本、性能和供应链上形成自己的决定权。

对有些公司来说，这会落到真正的模型研发；对另一些公司来说，更像是“模型能力栈的自研控制面”，包括路由、蒸馏、评测和领域优化。

## 为什么企业最后会走到双线建设

### 1. 平台决定能不能规模化上线

只要 AI 从个人工具进入多人协作、跨系统调用和正式交付，平台问题就会马上出现：

- 谁能调哪些工具
- 哪些任务能自动执行
- 出错后谁审批、谁回滚
- 成本、日志和数据流向怎么看

这些都更接近 [`Agent = Model + Harness`](/docs/tools/insights/agent-model-plus-harness) 里的 harness 问题，而不是单纯换更强模型能解决的事。

### 2. Frontier 决定长期上限和差异化

当企业已经验证 AI 会进入主业务链，问题会自然转向：

- 关键任务的质量上限是不是受制于外部模型
- 成本是不是会随着调用量失控
- 某些领域知识能不能真正沉淀成自家优势
- 一旦供应商策略变化，业务会不会被动

这时候，只有平台而没有自己的能力栈，会很难建立长期壁垒。

### 3. 双线结合才能形成闭环

平台给 Frontier 提供真实任务数据、评估链路和落地场景；Frontier 再反过来提高平台里关键 agent 的质量、速度和成本效率。两者不是并列部门 KPI，而是一条反馈回路。

## 应该先做哪条线

| 企业状态 | 更该先补什么 | 为什么 |
| --- | --- | --- |
| 还停留在零散试点 | 先补统一 Agent 平台 | 先把入口、权限、任务编排和验证收住 |
| 已有多个稳定场景上线 | 平台继续演进，同时开始补 Frontier 能力 | 这时数据与成本已经足够支撑更深能力建设 |
| 已经把 AI 放进核心业务链 | 两条线都要，但要明确接口 | 平台保障规模化，Frontier 保障上限与壁垒 |

最常见的顺序是：先平台化，再差异化；但一旦进入核心流程，二者必须一起设计接口。

## 一个更稳的建设分层

### 第 1 层：统一入口层

- 统一身份、权限和审批
- 统一任务合同、输入包和验证要求
- 统一模型接入与工具网关

### 第 2 层：平台执行层

- Agent runtime、队列、重试、观测
- 评估、质量门禁、人工接管
- 成本与使用分析

### 第 3 层：能力优化层

- 任务级模型路由
- 领域知识增强
- 蒸馏、微调、策略优化
- 关键链路上的自研能力

如果直接跳到第 3 层，前两层没补齐，团队很容易在“模型越来越多，真实交付越来越乱”里失控。

## 组织上最容易出错的 4 个地方

### 1. 把平台团队做成“接 SDK 的中间层”

如果平台团队只负责接接口，而不定义任务合同、验证和治理，它就很难形成真正的平台能力。

### 2. 把 Frontier 团队做成“脱离业务的研究组”

如果自研能力不直接连接真实任务、评估和业务链，它就很容易只剩论文式指标。

### 3. 平台和模型团队没有共享评估口径

平台关注上线率，模型团队关注 benchmark，最后谁也解释不了真实业务为什么没提升。

### 4. 没有明确“哪些能力必须自研”

不是所有地方都要自研。更稳的做法是先明确：

- 哪些任务是差异化核心
- 哪些任务只需要稳定供应
- 哪些链路必须保有替代路径

## 一个现实可执行的推进顺序

### 第 1 阶段：把 agent 先变成平台能力

- 统一模型与工具入口
- 固定任务合同、验证和审计
- 收集真实使用数据和失败模式

### 第 2 阶段：识别必须自研的关键链路

- 质量最关键的任务
- 调用成本最高的任务
- 合规或数据边界最敏感的任务

### 第 3 阶段：把 Frontier 建设接回平台

- 用平台观测数据反推能力优化优先级
- 用统一评估链路验证模型改动是否真的提升交付
- 用平台治理能力控制自研能力的上线边界

## 推荐动作

- 如果你是平台负责人，先回答“平台是不是已经能把 agent 的输入、执行、验证和审计收成一条线”。
- 如果你是模型或算法负责人，先回答“哪些任务值得自研，为什么不是直接继续复用外部模型”。
- 如果你是技术负责人，先把双线建设拆成共享指标：质量、交付效率、成本和可控性，而不是各自堆功能。

## 相关阅读

- [Agent = Model + Harness](/docs/tools/insights/agent-model-plus-harness)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
- [多 Agent 协作](/docs/workflows/multi-agent-collaboration)
- [AI First 到 Harness Engineering](/docs/tools/insights/ai-first-to-harness-engineering-speech)

## Sources

- [GitHub Issue #5: `统一 Agent 平台 + 自研 Frontier 能力`](https://github.com/AICode-Nexus/website/issues/5)
- [Agent = Model + Harness](/docs/tools/insights/agent-model-plus-harness)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
- [AI First 到 Harness Engineering](/docs/tools/insights/ai-first-to-harness-engineering-speech)
