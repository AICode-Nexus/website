---
title: Skills、Commands 与 Hooks
description: 把 rules、skills、commands 和 hooks 放到各自该在的位置，避免把所有自动化都堆进一个规则文件。
slug: /standards/skills-commands-hooks
sidebar_label: Skills、Commands 与 Hooks
tags: [ai-coding, skills, commands, hooks]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: testing-validation
entry_role: domain
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# Skills、Commands 与 Hooks

## 结论先行

这三类机制都在“约束 AI 行为”，但它们解决的问题不同：

- `Skills`: 封装可复用的专门知识和流程
- `Commands`: 快速触发特定任务入口
- `Hooks`: 在特定时机自动执行检查或副作用动作

最常见的问题不是缺少它们，而是把所有自动化都塞进 rules 文件，导致难维护、难复用、难审计。

## 适用场景

- 团队想把高频任务做成统一入口
- 已经有 rules，但还是需要更强的任务复用
- 希望把验证和提醒放到自动触发节点

## 各自该负责什么

### Skills

适合封装：

- 某个领域知识
- 多步骤任务流程
- 带模板、脚本或参考材料的复合任务

### Commands

适合封装：

- 审查、测试、重构、生成草稿等高频动作
- 快速调起固定工作流
- 为不同角色提供统一入口

### Hooks

适合封装：

- 执行前检查
- 执行后验证
- 高风险操作提醒
- 自动补充上下文或证据

## 推荐的组织方式

| 机制 | 更适合放在哪里 |
| --- | --- |
| Skills | 仓库技能目录或共享知识目录 |
| Commands | 工具命令目录、slash commands、任务入口 |
| Hooks | 工具配置、CI、命令包装层 |

## 推荐做法

1. 先把高频、低歧义任务做成 commands
2. 再把需要模板和知识沉淀的任务做成 skills
3. 最后把验证、提醒和拦截做成 hooks

## 常见错误

- 用 hooks 承担复杂业务逻辑
- 把技能知识直接复制进多个 rules 文件
- commands 没有接入验证和证据输出
- 所有自动化都只在本地有效，CI 无法复现

## 风险与边界

- hooks 越自动，越要注意误触发和副作用
- commands 越多，越需要统一命名和文档
- skills 如果不版本化，很快会变成过期模板仓库

如果你要找公开标准、厂商文档或可安装插件目录，先去 [Agent Skills 与插件生态](/docs/ai-directory/agent-skills-and-plugins)；这页只解释机制分工，不维护公开资源清单。

## 延伸阅读

- [Agent Skills 与插件生态](/docs/ai-directory/agent-skills-and-plugins)
- [仓库规则文件体系](/docs/repo-instruction-files)
- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [质量门禁与 Review](/docs/standards/review-quality-gates)
