---
audience: "individual"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "implementation"
title: "Windsurf：规则与边界"
description: "Windsurf 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/ide-first/windsurf/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "windsurf"]
---

# Windsurf：规则与边界

Windsurf 的难点，是 AGENTS.md、产品内 rules 和记忆层同时存在。它们一起用时体验很好，但如果不分工，就很容易变成三套互相覆盖的规则系统。真正该长期保存的合同，还是要回到 repo。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | AGENTS.md、验证命令、正式边界。 | 只在工作台有效的习惯。 |
| 工作台规则 | IDE 习惯、补充性 rules。 | 替代 repo contract。 |
| 记忆层 | 短中期任务上下文和接续信息。 | 唯一业务知识源。 |

## 先分清三层

### 仓库合同

- AGENTS.md、目录边界、验证命令、禁止事项和交付要求。
- 这些属于任何入口都要遵守的正式规则。

### 工作台规则

- Windsurf 内的 rules、workspace 习惯、工作台默认操作方式。
- 这些适合优化产品内体验，不适合代替 repo contract。

### 记忆层

- memories 和连续任务状态。
- 这些适合承接短中期上下文，但不该成为唯一知识源。

## 必须写进 repo 的内容

- 默认测试和构建命令。
- 跨项目都要遵守的目录边界和禁区。
- 最终交付必须包含的验证和风险说明。
- reviewer 和 owner 需要的一致证据结构。

## 适合放在工作台规则里的内容

- IDE 内最常见的任务习惯。
- AGENTS.md 已经存在时，Windsurf 规则如何补充而不重复。
- 常用记忆回顾和任务接续方式。
- 个人或团队在工作台里的高频效率动作。

## 适合放在记忆层里的内容

- 当前项目的最近任务上下文。
- 这轮工作为什么暂停、下一步是什么。
- 某些短中期偏好和连续任务线索。

## 不该放进记忆层的内容

- 唯一的业务知识源。
- 任何必须长期生效的仓库规则。
- 人工无法审阅、无法版本化的重要交付要求。

## 治理动作

- 先把 AGENTS.md 写成正式合同，再让 Windsurf 规则做体验补充。
- 定期清理 memories，避免把过期上下文留成“隐性规则”。
- 团队 rollout 时明确谁能改 repo 合同，谁能改工作台规则。
- 任何重要记忆都要能回写到 issue、PR 或仓库文档。

## 常见反模式

- AGENTS.md、Windsurf rules 和记忆层同时写同一件事。
- 重要业务知识只存在 memory 里，没有版本记录。
- 入口一换，团队就找不到规则和上下文。
- 工作台记忆长期堆积，谁也不敢删。

## 团队上线前检查

- 仓库合同是否已经独立清楚。
- 工作台规则是否只承担体验增强角色。
- memories 是否有 owner、刷新时机和失效条件。
- 人工离开 Windsurf 后，是否仍能靠 repo 文档继续推进。

## 下一步

- 去 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks) 固定一体化工作台里的高频任务模板。
- 去 [Windsurf：优点与替代](/docs/tools/ide-first/windsurf/tradeoffs-and-boundaries) 判断它值不值得继续做主工作台。
- 如果你想看更简洁的 IDE 规则层，继续看 [Cursor：规则与边界](/docs/tools/ide-first/cursor/rules-memory-tools)。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
