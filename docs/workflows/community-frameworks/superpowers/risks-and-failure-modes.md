---
title: "Superpowers：误用与退出条件"
description: "Superpowers 的常见误用、维护成本和退出信号。"
slug: "/workflows/community-frameworks/superpowers/risks-and-failure-modes"
sidebar_label: "误用与退出条件"
tags: ["ai-coding", "workflow-framework", "superpowers"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Superpowers：误用与退出条件

框架最大的风险，不是它本身太差，而是团队把它用成“看起来很完整”的仪式，却没有把真实交付、验证和 review 绑进去。能不能及时退出错误用法，比一开始会不会写模板更重要。

## 常见误用

- 装了框架却没有 repo 规则、测试门禁和 owner，最后只剩复杂 ritual。
- 过度并行 subagent，导致 owner 无法解释每条 lane 在做什么。
- 跳过 TDD 和 review，只保留“skills 很多”的表面热闹。

## 维护成本

- 技能、模板和工作约定需要持续同步到团队真实做法。
- 需要有人负责 worktree、plan 和 review packet 的最小标准。
- 如果工具入口切换，Superpowers 的接入方式也要调整。

## 退出条件

- 团队已经完全绕开它，回到各自 improvisation。
- 大家能说出技能名，但说不出每个阶段产出什么。
- 框架维护成本高于它带来的返工下降和节奏稳定收益。

## 来源

- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers Marketplace](https://github.com/obra/superpowers-marketplace)
