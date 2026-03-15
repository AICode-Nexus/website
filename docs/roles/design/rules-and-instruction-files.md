---
title: 规则与规范文档
description: 设计师如何把设计系统规则、标注合同、token 规范和 AI 协作方式写进 instruction files。
slug: /roles/design/rules-and-instruction-files
sidebar_label: 规则与规范文档
tags: [ai-coding, design, rules]
track: cross-track
kind: guide
content_form: guide
audience: designer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 规则与规范文档

设计类 AI 协作最怕“只有画面，没有规则”。如果组件状态、token 命名、交互动线和可访问性标准没有写进稳定文档，模型每次都会重新猜视觉和行为。

## 设计侧文档分层

| 载体 | 应该承载什么 |
| --- | --- |
| `AGENTS.md` | 设计系统合同、token 命名、组件状态与验收要求 |
| 工具说明 / `CLAUDE.md` | 设计协作习惯、输出格式、命名偏好 |
| 标注文档 / Figma 注释 | 节点层级、状态、断点和交互说明 |
| handoff 模板 | 给前端和测试的资产清单、风险和限制 |

## 最有价值的设计长期规则

- 所有组件必须列出状态和变体。
- 颜色、间距、字号必须有 token 命名规则。
- 可访问性要求必须显式写在组件或页面规范里。
- handoff 不能只给截图，必须给节点、标注和限制说明。

## 下一步

- 想继续看设计任务该配什么能力：去 [Skills 与 MCP](/docs/roles/design/skills-and-mcp)。
- 想判断设计任务用什么入口最稳：去 [工具匹配与选型](/docs/roles/design/tool-fit-and-selection)。
