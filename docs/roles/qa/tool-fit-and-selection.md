---
title: 工具匹配与选型
description: 测试工程师按任务形状选择终端、浏览器、执行栈和平台型入口，不把所有测试任务都压到一个工具上。
slug: /roles/qa/tool-fit-and-selection
sidebar_label: 工具匹配与选型
tags: [ai-coding, qa, tools]
track: cross-track
kind: guide
content_form: guide
audience: qa-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: tech-selection
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 工具匹配与选型

| 任务形状 | 更适合的入口 |
| --- | --- |
| 小步缺陷复现与最小修复验证 | 终端入口 |
| 页面交互和 E2E 验证 | 浏览器 / Playwright |
| 长链路回归或多阶段测试 | 执行栈 |
| 平台内质量跟踪与 review | 平台型入口 |

## 一个判断原则

如果任务核心是“看真实页面”，先去浏览器；如果核心是“跑命令和查日志”，先去终端；如果核心是“保留阶段执行链”，再选执行栈。

## 典型入口组合

缺陷定位常常需要“浏览器复现 + 终端日志 + 最小自动化回归”三件事连起来；如果是长链路回归或跨阶段验证，再补执行栈。把这几个入口串起来，比单独依赖某一个工具稳得多。

## 常见误选

- 本来是页面交互问题，却只在终端里补测试。
- 本来只是最小复现，却过度引入复杂流程。
- 本来要做交付跟踪，却没有切到平台入口沉淀结论。

## 下一步

- 想补规则文件：去 [规则与规范文档](/docs/roles/qa/rules-and-instruction-files)。
- 想补能力编排：去 [Skills 与 MCP](/docs/roles/qa/skills-and-mcp)。
