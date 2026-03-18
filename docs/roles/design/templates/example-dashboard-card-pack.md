---
title: 示例：订阅看板卡片训练包
description: 一份已填写的设计训练包示例，演示 handoff、组件状态合同、token 约束和原型验证如何组合。
slug: /roles/design/templates/example-dashboard-card-pack
sidebar_label: 示例：订阅看板卡片
tags: [ai-coding, design, templates, examples]
track: cross-track
kind: guide
content_form: guide
audience: designer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 示例：订阅看板卡片训练包

这个示例把 [Figma Handoff 包模板](/docs/roles/design/templates/figma-handoff-pack)、[组件状态合同模板](/docs/roles/design/templates/component-state-contract)、[Token 与约束模板](/docs/roles/design/templates/tokens-and-constraints) 和 [原型验证与证据模板](/docs/roles/design/templates/prototype-proof-sheet) 串成一条设计到交付链。

## 场景

- 目标：为 B2B 订阅后台新增“本月用量 / 续费提醒”组合卡片。
- 交付对象：前端、设计系统 owner、QA。

## 1. Figma Handoff 摘要

```md
## 设计入口
- file: figma.com/design/.../BillingDashboard
- page: Usage Summary
- owner: growth-design

## 必看节点
- 默认态 node 120:88
- 超额提醒态 node 120:104
- 空状态 node 120:122
```

## 2. 组件状态合同摘要

```md
## 状态与变体
- 默认态：展示本月用量和剩余额度
- warning 态：用量超过 80%
- overdue 态：支付失败，顶部加警示条
- size：desktop / compact

## 交互规则
- 卡片 CTA 跳到账单页
- warning / overdue 态保留 tooltip 说明
- 键盘 focus 必须能看到边框
```

## 3. Token 与约束摘要

```md
## Token 范围
- color.surface.notice
- color.text.danger
- spacing.card.padding.l

## 约束
- 只允许使用现有账单模块 token
- 1440 以下断点禁止双列排版
- overdue 态必须满足 4.5:1 对比度
```

## 4. 原型验证摘要

```md
## 验证路径
- 正常查看本月用量
- 超额后 tooltip 是否可理解
- 键盘 tab 到 CTA 和 tooltip 的顺序

## 观察结果
- 空状态文案过长，在 1280 宽度下折成 3 行
- overdue 警示条和顶部导航颜色冲突，需要提高明度差
```

## 配套 workflow 与案例

- 先用 [工具专题](/docs/roles/design/tools) 选 `Figma` 或 `Framer` 的主入口。
- 真实联调前，配合 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) 看 handoff 如何切成 discovery 与 execution 两段。
- 组件收口时，可参考 [Windsurf 维护到 PR 案例](/docs/case-studies/windsurf-maintenance-to-pr)。
