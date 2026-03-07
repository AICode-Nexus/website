---
title: "BMAD：误用与退出条件"
description: "BMAD 的常见误用、维护成本和退出信号。"
slug: "/workflows/frameworks/bmad/risks-and-failure-modes"
sidebar_label: "误用与退出条件"
tags: ["ai-coding", "workflow-framework", "bmad"]
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

# BMAD：误用与退出条件

框架最大的风险，不是它本身太差，而是团队把它用成“看起来很完整”的仪式，却没有把真实交付、验证和 review 绑进去。能不能及时退出错误用法，比一开始会不会写模板更重要。

## 常见误用

- 把每个角色都做成独立官僚流程，导致执行速度被自己压垮。
- 只有文档 handoff，没有把验证命令和 review 证据接进流程。
- 明明是小改动，却强行走完整多阶段流程。

## 维护成本

- 角色说明、模板和故事拆解规则需要持续维护。
- 需要有人负责流程纪律和产物目录整洁度。
- 如果团队规模变化，角色数量与阶段深度也要及时收缩。

## 退出条件

- 产物越来越多，但没有人按这些产物决策。
- 故事拆解和真实代码执行长期脱节。
- 团队为了绕开流程，不断在仓库外另起聊天或手工补活。

## 来源

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
