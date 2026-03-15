---
title: 上下文与规则
description: 给 AI 足够的后端上下文与规则，才能把接口、数据和运维边界改对。
slug: /roles/backend/context-and-rules
sidebar_label: 上下文与规则
tags: [ai-coding, backend, rules]
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

# 上下文与规则

后端团队给 AI 的最大帮助，不是“写一个更长的 prompt”，而是把 repo contract、运行命令、架构边界和风险点做成稳定上下文。只要上下文包不稳定，AI 每次都会重新猜 controller 该不该改、migration 该不该写、测试要不要补。

## 专题拆分阅读

这一页现在作为“后端机制总览”保留；更细的内容已经拆到几个专门子页：

| 方向 | 对应子页 |
| --- | --- |
| 规则与规范文档 | [规则与规范文档](/docs/roles/backend/rules-and-instruction-files) |
| Skills 与 MCP | [Skills 与 MCP](/docs/roles/backend/skills-and-mcp) |
| 工具匹配与选型 | [工具匹配与选型](/docs/roles/backend/tool-fit-and-selection) |

如果你现在要治理仓库规则，优先看“规则与规范文档”；如果你正在组织真实任务输入，继续看 “Skills 与 MCP” 和 “工具匹配与选型” 会更直接。

## 让 agent 进入任务前先拿到什么

一个够用的后端任务上下文包通常包括：

- 相关模块或服务边界说明。
- 启动、测试、lint、migration、smoke 命令。
- 请求/响应样例、错误码表、鉴权和幂等规则。
- 关键环境变量、依赖服务和 fixture 数据位置。

这类信息最好写进仓库级说明文件，而不是散落在聊天记录里。可以从 [仓库 instruction files 规范](/docs/repo-instruction-files) 和 [Prompt Contracts](/docs/workflows/prompt-contracts) 两篇开始整理。

## repo contract 和工具局部规则怎么分工

### repo contract 负责稳定事实

适合写在 `AGENTS.md`、`CLAUDE.md` 或团队统一文档里的内容包括：

- 目录边界和禁止跨层改动的规则。
- migration、contract、测试和发布的最低门禁。
- review 必须附带的证据。

### 工具局部规则负责入口习惯

Cursor、Cline、Claude Code 等工具的 rules 更适合承接：

- 交互方式。
- 输出格式。
- 默认命令偏好。

不要把“仓库真实约束”只写在某个工具的本地 rules 里，否则其他 agent 根本看不到。

## 后端任务最适合什么样的 prompt 包

相比“帮我生成一个接口”，更有效的写法通常是：

1. 变更目标：新增字段、修改鉴权、接入 provider、补队列消费。
2. 受影响边界：controller、contract、migration、job、dashboard。
3. 必过验证：lint、type-check、integration test、smoke、build。
4. 不可破坏项：旧客户端兼容、幂等语义、PII 脱敏、超时预算。

当这些约束清楚后，再结合 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 或 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) 执行，通常会比自由对话稳定得多。

## 适合后端团队复用的知识入口

- [AI 开发规范](/docs/ai-development-standards)：统一代码、验证和协作底线。
- [Review 质量门禁](/docs/standards/review-quality-gates)：定义 reviewer 该卡什么问题。
- [Skills / Commands / Hooks](/docs/standards/skills-commands-hooks)：整理工具化与命令自动化思路。
- [AI Native Engineering Architecture](/docs/ai-native-engineering-architecture)：把 agent、context、tooling 放到更大的工程架构里看。

## 下一步

- 准备开始一项新接口或跨边界改动：回到 [后端 AI 工作台](/docs/roles/backend) 选路径。
- 想先固定接口输入输出和兼容策略：去 [API 与契约](/docs/roles/backend/api-and-contracts)。
- 想先固定测试和发布证据：去 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。
- 想按机制专题继续下钻：去 [规则与规范文档](/docs/roles/backend/rules-and-instruction-files)、[Skills 与 MCP](/docs/roles/backend/skills-and-mcp)、[工具匹配与选型](/docs/roles/backend/tool-fit-and-selection)。
