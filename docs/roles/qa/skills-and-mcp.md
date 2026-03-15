---
title: Skills 与 MCP
description: 测试工程师如何为用例生成、缺陷复现、浏览器验证和质量收口选择 skills 与 MCP。
slug: /roles/qa/skills-and-mcp
sidebar_label: Skills 与 MCP
tags: [ai-coding, qa, skills, mcp]
track: cross-track
kind: guide
content_form: guide
audience: qa-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# Skills 与 MCP

| 任务 | 优先能力 | 为什么 |
| --- | --- | --- |
| 缺陷定位 | `systematic-debugging` | 先证明问题与路径 |
| 测试设计 | `testing-best-practices`、TDD 类能力 | 先收场景和边界 |
| 浏览器验证 | `playwright`、浏览器上下文 | 需要真实页面复现 |
| 交付前收口 | `verification-before-completion` | 需要命令与证据闭环 |

## QA 最常见的误用

- 不先复现 bug，就直接补测试。
- 不用真实浏览器上下文，只在代码层猜页面行为。
- 只给测试代码，不给环境与证据说明。

## 默认能力组合

QA 任务更稳的顺序通常是：先用 `systematic-debugging` 把问题复现和根因缩小，再用浏览器或 Playwright 能力拿到真实页面证据，最后再回到测试设计和交付收口。这样生成的测试不只是“存在”，而是直接对应真实缺陷。

## 训练建议

带测试同学练 AI 协作时，建议每次都要求提交复现步骤、证据截图或录屏、以及最终自动化用例。只交最后一份测试代码，很难判断团队是否真的理解了问题。

## 下一步

- 想补长期规则：去 [规则与规范文档](/docs/roles/qa/rules-and-instruction-files)。
- 想继续判断入口：去 [工具匹配与选型](/docs/roles/qa/tool-fit-and-selection)。
