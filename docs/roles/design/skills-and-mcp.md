---
title: Skills 与 MCP
description: 设计师如何为设计稿落地、token 管理、原型验证和可访问性检查选择 skills 与 MCP。
slug: /roles/design/skills-and-mcp
sidebar_label: Skills 与 MCP
tags: [ai-coding, design, skills, mcp]
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

# Skills 与 MCP

设计任务的关键不是“会不会生成代码”，而是能不能先拿到真实设计上下文。

| 任务 | 优先能力 | 为什么 |
| --- | --- | --- |
| 设计稿到代码 | `figma`、浏览器上下文、前端最佳实践类 skill | 先拿节点、变量、截图和组件边界 |
| 设计系统治理 | `figma`、规则文档能力 | 先收 token、变体和命名 |
| 原型验证 | 浏览器 / 截图能力 | 需要真实交互证据 |
| 可访问性核对 | 浏览器、标准文档 | 需要对照真实页面和规范 |

## 设计任务常见误用

- 不先取 Figma 节点与变量，只给一张总图。
- 不给状态说明，直接要求生成组件。
- 原型验证不看真实页面交互，只看静态图。

## 默认能力组合

设计任务更稳的默认链路是：先拿 Figma 节点、变量和关键截图，再用组件或前端最佳实践能力收紧结构，最后用浏览器或截图能力对照真实页面。这样能把“设计想法”变成“可复核的实现输入”，而不是让模型自由发挥视觉猜测。

## 训练建议

带设计团队时，建议把每次作业都拆成三份资产：节点链接、状态说明、最终对照图。这样大家练的就不是“会不会让 AI 出图”，而是会不会把设计上下文表达完整。

## 默认能力组合对应的最小产物

| 任务 | 默认能力组合 | 最少要落的模板 |
| --- | --- | --- |
| 设计稿到代码 | `figma` + 前端最佳实践类能力 | [Figma Handoff 包模板](/docs/roles/design/templates/figma-handoff-pack) |
| 组件治理 | `figma` + 规则文档能力 | [组件状态合同模板](/docs/roles/design/templates/component-state-contract) |
| token / 规范沉淀 | `figma` + 文档能力 | [Token 与约束模板](/docs/roles/design/templates/tokens-and-constraints) |
| 原型或还原验证 | 浏览器 / 截图能力 | [原型验证与证据模板](/docs/roles/design/templates/prototype-proof-sheet) |

## 下一步

- 想把能力回写到规则：去 [规则与规范文档](/docs/roles/design/rules-and-instruction-files)。
- 想把能力再映射到工具入口：去 [工具匹配与选型](/docs/roles/design/tool-fit-and-selection)。
- 想直接复制模板：去 [设计训练包模板](/docs/roles/design/templates)。
