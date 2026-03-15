---
title: 前端 AI 工作台：上下文与规则
description: 用 Context7、Plan First、MCP、CLAUDE.md、AGENTS.md 和 skills 把前端 AI 协作变成长期机制。
sidebar_label: 上下文与规则
tags: [ai-coding, frontend, context, rules]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
slug: /roles/frontend/context-and-rules
---

# 前端 AI 工作台：上下文与规则

前端团队要把 AI 用稳，最终拼的不是 prompt，而是上下文和规则系统。

## 学习目标

学完这一页后，你应该能：

- 区分 `Context7 / Plan First / MCP / rules files` 各自负责什么
- 给团队写出 `AGENTS.md`、`CLAUDE.md` 和工具内 rules 的职责边界
- 把常用 skills 映射到真实前端任务

## 建议先修

建议先看：

- [前端 AI 培训营：总览](/docs/roles/frontend)
- [仓库结构](/docs/roles/frontend/repo-architecture)

## 训练任务

至少完成 1 个最小练习：

1. 为当前项目写一份 `CLAUDE.md` 大纲
2. 为团队写一份 `AGENTS.md` 里的前端协作规则
3. 为一个真实任务整理“该调用哪些 skills / 工具 / 文档”的映射表

## 典型交付物

这一模块最典型的输出包括：

- `CLAUDE.md` 大纲或初稿
- `AGENTS.md` 前端协作规则
- 工具内 rules 说明
- skills 映射表

## Context7、Plan First、MCP

这三类能力适合这样分工：

- `Context7`：需要最新官方文档时再拉取事实
- `Plan First`：复杂页面、跨目录改动、组件重构先计划再执行
- `MCP`：当你需要浏览器、设计稿、文件系统等真实上下文时再接入

它们更适合这些任务：

- 大型页面从 Figma 到实现
- 设计系统调整
- monorepo 跨包改动
- 复杂 bug 的浏览器级排查

## `AGENTS.md` 和 `CLAUDE.md` 怎么分工

更稳的规则分层通常是：

- `AGENTS.md`：仓库级公共合同
- `CLAUDE.md`：工具如何读取前端项目上下文
- 工具内 rules：入口局部行为，不替代 repo 契约

`AGENTS.md` 更适合写：

- 哪些目录能改
- 哪些命令必须跑
- 哪些任务先出计划
- 提交和发布纪律

`CLAUDE.md` 更适合写：

- 技术栈
- 目录边界
- 默认验证命令
- 组件、hooks、stores、composables 的职责

进一步阅读：

- [Repo instruction files](/docs/repo-instruction-files)
- [Claude Code rules / memory / tools](/docs/tools/terminal-agents/claude-code/rules-memory-tools)

## 工具内 rules 应该放什么

像 Cursor、Windsurf 这类入口也有自己的规则层，但它们更适合承接：

- 模型选择
- 局部工作台行为
- IDE 级交互习惯

不适合承接：

- repo 长期真相
- 唯一业务知识源
- 跨工具都应成立的强约束

## 前端常用 Skills

| 场景 | 推荐 skill | 作用 |
| --- | --- | --- |
| 设计稿转实现 | `figma` | 读取设计节点、截图、变量和设计上下文 |
| React 页面与组件重构 | `react-best-practices` | 约束结构和组件边界 |
| TypeScript 组件模式 | `typescript-react-patterns` | 处理 props、事件、ref、泛型等问题 |
| 状态与数据层 | `state-management` | 管理 TanStack Query、Zustand 等状态模式 |
| 浏览器验证 | `playwright` | 跑真实页面流程、截图和断言 |
| 持续前端调试 | `playwright-interactive` | 做浏览器级迭代排障 |
| 系统排障 | `systematic-debugging` | 先定位问题，再修问题 |
| 完成前验证 | `verification-before-completion` | 防止“看起来好了”却没跑验证 |
| 复杂改动规划 | `writing-plans` | 把工作拆成可执行步骤 |
| 创意型改动 | `brainstorming` | 先澄清结构和范围，再实现 |

## 默认阅读顺序

- 先想清技术边界：看 [仓库结构](/docs/roles/frontend/repo-architecture)
- 再想清发布边界：看 [测试与交付](/docs/roles/frontend/testing-and-delivery)
- 最后把规则文件写回 repo，而不是只留在对话里

## 训练验收

完成这一页训练后，至少要拿出这些结果：

- 一份 `CLAUDE.md` 或 `AGENTS.md` 初稿
- 一份工具内 rules 说明
- 一份前端任务到 skills 的映射清单

## 常见误区

- 把 repo 长期规则只写在聊天记录里
- 用工具内 rules 代替仓库级契约
- 复杂任务不做计划，直接让 AI 改跨目录代码
- 明明需要最新文档，却只靠模型记忆回答
