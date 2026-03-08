---
title: 仓库规则文件体系
description: 梳理 AGENTS.md、CLAUDE.md、GEMINI.md 与工具 rules 的职责边界，避免多个规则源彼此冲突。
slug: /repo-instruction-files
sidebar_label: 仓库规则文件体系
tags: [ai-coding, rules, repo]
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

# 仓库规则文件体系

## 结论先行

规则文件越来越像 AI 开发里的 `README + CONTRIBUTING + policy` 混合层。问题不是“要不要写”，而是不同文件各自负责什么、冲突时谁优先。

## 适用场景

- 同一仓库需要支持多个 AI 工具
- 团队想统一仓库级原则、权限和验收方式
- 已经出现“同一条规则写在多个地方但互相冲突”的问题

## 规则优先级矩阵

| 层级 | 典型文件 | 负责什么 | 不该负责什么 |
| --- | --- | --- | --- |
| 仓库级公共规范 | `AGENTS.md` | 目录边界、必跑命令、权限、发布纪律 | 工具专属快捷键、个人偏好 |
| 工具级公共配置 | `CLAUDE.md`、`GEMINI.md`、Copilot instructions | 工具如何读取仓库规范、工具专属工作方式 | 覆盖仓库级原则 |
| 工具 rules 目录 | `.cursor/rules`、`.windsurf/rules`、`.continue/rules` | 入口专属行为、局部工作台规则 | 替代统一源头规范 |
| 任务级合同 | prompt contract、spec、plan | 单次任务输入输出与验收 | 长期仓库政策 |

## 推荐职责划分

### `AGENTS.md`

放跨工具、跨入口都成立的仓库级原则，例如：

- 目录边界
- 必跑命令
- 权限与审批规则
- 不允许的顺手优化
- 版本、发布与 changelog 要求

### `CLAUDE.md` / `GEMINI.md`

放该工具如何读取仓库规范、如何组织上下文、默认怎么与任务合同配合，但前提是不与 `AGENTS.md` 冲突。

### 工具 rules 目录

例如 `.cursor/rules`、`.windsurf/rules`、`.continue/rules`，适合放入口专用规则：

- UI / IDE 操作约定
- 特定模型或工具组合
- 局部工作台行为
- 只对该入口有效的自动化提示

### 任务级合同

例如 spec、plan、prompt contract，负责当前任务，不负责定义仓库长期政策。

## 冲突时怎么处理

一个稳妥的优先级通常是：

1. `AGENTS.md`
2. 仓库级通用 instructions
3. 工具专属文件与 rules
4. 临时 task contract

如果规则冲突，先回到仓库级源头修正，不要在每个工具文件里分别打补丁。

## 推荐做法

1. 把所有长期约束回收到 `AGENTS.md`
2. 让工具专属文件只补工具行为，不复制公共规范
3. 在规则文件里直接写验证命令与接管点
4. 每次复盘返工时，优先更新规则矩阵

## 常见错误

- 把同一条规则同时复制到 4 个文件里
- 工具专属文件覆盖仓库公共规范
- 没定义冲突时谁优先
- 规则文件存在，但没有和验证命令配套

## 风险与边界

- 规则文件数量增加，不等于治理质量提升
- 如果没有统一优先级，多个规则源只会增加歧义
- 仓库规范必须能被 review 和 CI 验证，而不是只靠记忆

## 延伸阅读

- [上下文、记忆与规则](/docs/standards/context-memory-and-rules)
- [Skills、Commands 与 Hooks](/docs/standards/skills-commands-hooks)
- [AI 开发规范](/docs/ai-development-standards)
