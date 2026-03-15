---
title: Skills 与 MCP
description: 按后端任务形状选择 skills、Context7、浏览器与其他 MCP 上下文能力，避免只有工具名没有能力编排。
slug: /roles/backend/skills-and-mcp
sidebar_label: Skills 与 MCP
tags: [ai-coding, backend, skills, mcp]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
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

后端任务的上下文往往比前端更分散：有 contract、schema、migration、队列、日志、告警、环境变量、第三方服务。只靠一个长 prompt 很难把这些信息稳稳装进去，所以更需要按任务形状编排 skills 和 MCP。

## 先区分 skill 与 MCP

| 类型 | 更适合提供什么 | 后端例子 |
| --- | --- | --- |
| Skill | 工作方法与边界 | 计划先行、系统化调试、验证闭环、代码评审 |
| MCP | 真实外部上下文 | 官方文档、浏览器控制台、服务面板、截图、资源文件 |

## 后端高频任务到 skill 的映射

| 任务 | 优先 skill | 为什么 |
| --- | --- | --- |
| bug 修复 | `systematic-debugging` | 先证明问题和根因 |
| 跨服务改动 | `writing-plans`、`executing-plans` | 先拆服务边界和验证顺序 |
| 发布前收口 | `verification-before-completion` | 先把命令和证据补齐 |
| 代码审查与合并前检查 | `requesting-code-review`、`code-review` | 先把高风险点卡住 |

## 后端最常用的 MCP 能力

| MCP / 能力 | 什么时候有价值 | 后端典型场景 |
| --- | --- | --- |
| Context7 | 需要最新官方文档时 | 查框架、SDK、数据库或平台新接口 |
| 浏览器 / 控制台类能力 | 需要真实管理后台、日志面板、Swagger 页面时 | 验证 webhook 控制台、队列 dashboard、监控面板 |
| 文件与资源读取 | 需要读取 schema、seed、env 模板、contract 文件时 | 对照 migration、契约与配置 |

## 最常见的失败信号

1. 查新接口不看官方文档，直接按旧记忆生成实现。
2. 线上问题不看真实日志或 dashboard，只凭代码猜。
3. 跨服务改动不先拆计划，就直接改多个目录。
4. 发布前没有把命令、指标和 smoke path 收口成证据。

## 下一步

- 想把这些能力回写到长期规则：去 [规则与规范文档](/docs/roles/backend/rules-and-instruction-files)。
- 想判断入口工具：去 [工具匹配与选型](/docs/roles/backend/tool-fit-and-selection)。
- 想回到后端机制总览：去 [上下文与规则](/docs/roles/backend/context-and-rules)。
