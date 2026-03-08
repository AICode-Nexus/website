---
title: AI 开发规范
description: 为 AI 开发建立统一的计划、权限、验证、评估和 review 规范，让不同工具和 agent 共享同一套交付标准。
slug: /ai-development-standards
sidebar_label: AI 开发规范
tags: [ai-coding, standards, governance]
track: team-delivery
kind: guide
content_form: guide
domain: standards
journey_stage: testing-validation
entry_role: domain
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# AI 开发规范

## 最小规范应覆盖什么

1. 计划要求
2. 权限边界
3. 验证要求
4. review 要求
5. 评估口径

## 推荐规范骨架

### 计划

- 大于单文件改动时，先给计划再执行
- 计划必须写明会改哪些文件和不会改哪些文件

### 权限

- 显式声明禁止目录
- 高风险命令必须审批
- 后台 agent 必须使用独立 worktree 或等价隔离

### 验证

- 不得假设 lint、test、build 已通过
- 必须以命令结果报告成功或失败

### Review

- review 先看越界和验收，不先看代码风格
- PR 必须附带变更摘要、风险点和验证结果

### 评估

- 不只看首次输出速度
- 至少记录返工次数、review 修补量、最终可提交时间

## 谁维护这份规范

- 仓库 owner 负责源头规则
- 技术负责人负责门禁与审批边界
- 使用者负责把失败模式回流进规则与 workflow

## 延伸阅读

- [质量门禁与 Review](/docs/standards/review-quality-gates)
- [指标与风险](/docs/standards/evaluation-risk-metrics)
- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
