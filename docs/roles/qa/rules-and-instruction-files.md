---
title: 规则与规范文档
description: 测试工程师如何把测试策略、缺陷复现、验收模板和交付证据写进 instruction files 与规范文档。
slug: /roles/qa/rules-and-instruction-files
sidebar_label: 规则与规范文档
tags: [ai-coding, qa, rules]
track: cross-track
kind: guide
content_form: guide
audience: qa-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 规则与规范文档

测试类 AI 协作真正需要的不是“再多生成一些 case”，而是把缺陷复现、用例结构、环境要求和交付证据写成稳定规则。

## QA 文档分层

| 载体 | 应该承载什么 |
| --- | --- |
| `AGENTS.md` | 测试门禁、环境要求、证据包、回归纪律 |
| 工具说明 | 默认测试框架、输出格式、日志习惯 |
| 测试计划 / case 文档 | 场景、边界、数据、优先级 |
| bug / handoff 模板 | 复现步骤、预期/实际、环境、日志和截图 |

## 最值得固化的 QA 规则

- 缺陷修复必须补最小复现和回归路径。
- 测试证据必须包含命令、截图或录屏、环境信息。
- 不稳定测试必须标记 flake 原因和处理计划。
- 自动化脚本必须说明数据依赖和 mock 策略。

## 可直接复制的 QA 模板

- [测试计划 Brief 模板](/docs/roles/qa/templates/test-plan-brief)
- [缺陷复现与回归模板](/docs/roles/qa/templates/bug-repro-and-regression)
- [命令与证据模板](/docs/roles/qa/templates/commands-and-evidence)
- [QA Handoff 模板](/docs/roles/qa/templates/handoff-template)

## 下一步

- 想继续看 QA 任务该配什么能力：去 [Skills 与 MCP](/docs/roles/qa/skills-and-mcp)。
- 想判断测试任务该用哪个入口：去 [工具匹配与选型](/docs/roles/qa/tool-fit-and-selection)。
- 想直接复制模板：去 [QA 训练包模板](/docs/roles/qa/templates)。
