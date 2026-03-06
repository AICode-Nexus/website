---
title: 质量门禁与 Review
description: 让 AI 产出进入可控交付流程的关键，是把 review、验证和路径级规则设计成统一门禁，而不是只依赖人工兜底。
slug: /team-delivery/quality-gates-and-review
sidebar_label: 质量门禁与 Review
tags: [ai-coding, quality, review]
track: team-delivery
kind: guide
audience: advanced
stage: intermediate
featured: false
pillar: standards
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# 质量门禁与 Review

## 先给结论

高质量门禁的目标不是拖慢速度，而是把低价值的人肉修补前移成更自动、更清楚的拦截。

## 最小门禁栈

- lint
- test
- build / type check
- 高风险目录审批
- PR 证据字段

## Review 应该重点看什么

- 是否越界
- 是否满足 spec / contract
- 是否给出验证证据
- 是否引入未声明风险

## 为什么这在 AI 开发里更重要

AI 会放大两件事：

- 交付速度
- 错误扩散速度

所以越不能把 review 只理解成“看一下代码风格”。

## 当前信号

GitHub 官方文档已经把 repository instructions、coding agent、code review 和 branch protections 放在同一条工作系统里。说明 review 和门禁正在从“补充环节”变成正式能力。

## 来源

- GitHub Docs: [Repository custom instructions for Copilot](https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)
- GitHub Docs: [Configuring automatic code review by Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-code-review-by-copilot)
- GitHub Docs: [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
