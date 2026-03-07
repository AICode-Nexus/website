---
title: "Windsurf：规则、记忆与工具边界"
description: "Windsurf 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/ide-first/windsurf/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "windsurf"]
track: "cross-track"
kind: "guide"
audience: "individual"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Windsurf：规则、记忆与工具边界

一旦一个工具开始支持 rules、memory、background task 或 MCP，它就不只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，决定了这个入口能不能长期存在。

## rules 与上下文

- Windsurf 会发现 AGENTS.md，也有自己的 memories / rules 体系。
- 最好把 repo 级事实边界固定在公共文件里，再让产品内规则做入口补充。
- 如果同时使用多套规则来源，必须明确优先级和 owner。

## 记忆与状态

- Cascade memories 与 workspace 记忆是它的重要差异点。
- 这类记忆适合承接工作台连续性，但不应替代 repo 级契约。

## tools / approvals / 执行边界

- 工作台、memories、rules、模型管理、AGENTS.md 发现。
- 偏向整合好的体验，而不是开放式壳层。

## 仓库接入建议

- 把 AGENTS.md 和 Windsurf 内部 rules 分层管理，减少产品切换成本。
- memory 应服务于任务连续性，不要承载唯一业务知识源。
- 团队 rollout 时要明确谁负责维护 memories 与规则治理。
