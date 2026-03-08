---
title: AI 规范
description: 统一规则文件、权限、验证、评估、review 和时效治理，把 AI 开发从个人习惯升级为团队规范。
slug: /standards
sidebar_label: AI 规范
tags: [ai-coding, standards, governance]
track: cross-track
kind: hub
content_form: hub
audience: advanced
stage: intermediate
featured: true
domain: standards
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 规范

## 这一类内容解决什么问题

- 明确规则文件各自负责什么
- 统一权限、验证、review 和评估口径
- 让不同工具共享同一套仓库约束
- 建立时效治理，持续淘汰过时结论

## 规范的 5 个层次

1. 指令文件：`AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、工具 rules
2. 权限边界：目录、命令、网络、审批
3. 验证门禁：lint、test、build、security
4. 评估体系：返工、缺陷、review 修补量、总周期
5. 内容治理：复核日期、事实截止、市场状态

## 推荐的治理顺序

### 先统一源头规则

让所有入口共享同一套仓库级原则，而不是每个工具都有一份互相冲突的规则。

### 再统一验证门禁

确保 agent 修改能直接映射到可执行验证，而不是最后靠人类补救。

### 再统一 review 和评估

review 要检查边界、证据和风险，评估则负责把失败模式回流到规范。

## 核心入口

- [仓库规则文件体系](/docs/repo-instruction-files)
- [Skills、Commands 与 Hooks](/docs/standards/skills-commands-hooks)
- [上下文、记忆与规则](/docs/standards/context-memory-and-rules)
- [质量门禁与 Review](/docs/standards/review-quality-gates)
- [指标与风险](/docs/standards/evaluation-risk-metrics)
- [AI 开发规范](/docs/ai-development-standards)
- [知识新鲜度治理](/docs/freshness-governance)

## 推荐做法

- 先从规则文件和验证门禁开始，不要先推统一采购
- 同一仓库内让不同工具共享一套源头规范
- 对“当前主流”类文档按月复核，对规范和架构类文档按季度复核

## 常见误区

- 规则文件越多越好
- review 只检查代码风格
- 指标只看首次输出速度
- 文档一旦发布就不再复核

## 往下看什么

- 想把执行链路规范化：去 [AI 工作流](/docs/workflows)
- 想把目录边界和工具拓扑固定下来：去 [AI 架构](/docs/architecture)
