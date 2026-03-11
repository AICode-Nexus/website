---
audience: "advanced"
stage: "advanced"
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
title: "Cline：规则与边界"
description: "Cline 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/terminal-agents/cline/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "cline"]
---

# Cline：规则与边界

Cline 的问题从来不是能力不够，而是开放能力太容易超过团队治理能力。越开放的壳层，越不能把规则只放在客户端配置里。真正关键的合同、权限、停止条件和回退策略，必须回到 repo 或团队正式文档里。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | 权限边界、验证脚本、高风险操作。 | 私有客户端特有配置。 |
| 壳层配置 | provider、MCP、工具开关。 | 团队唯一规则源。 |
| 单次任务 | 当前工具组合、checkpoint 目的。 | 长期固定的治理规则。 |

## 先分清三层

### 仓库合同

- 目录边界、验证命令、高风险操作、必须留痕的交付内容。
- 这些规则必须版本化，不能只存在某个人的客户端里。

### 壳层配置

- provider 选择、工具开关、MCP 接入、Plan / Act 的使用习惯。
- 这些属于 Cline 的入口差异，但不该升级为唯一规则源。

### 单次任务上下文

- 当前用哪些工具、为什么此时开 browser automation、当前 checkpoint 的目的是什么。
- 这类信息应随着任务结束而退出。

## 必须写进 repo 的内容

- 允许和禁止的命令边界。
- 什么任务必须开 worktree 或 checkpoint。
- 默认验证脚本和最小交付证据。
- 哪些外部工具属于受控能力，不能随意新增。

## 适合放在壳层配置里的内容

- 默认 provider 和模型组合。
- 常用 MCP 连接方式和浏览器自动化习惯。
- Plan / Act 切换时的提示结构。
- 开放栈用户自己的效率配置。

## 只保留在单次任务里的内容

- 这一轮为什么启用了某个 MCP 或浏览器动作。
- 当前 checkpoint 的范围。
- 当次实验性尝试的假设和回退点。

## 治理动作

- 先定义什么任务允许开放工具栈，什么任务必须走稳态入口。
- 高风险改动默认强制 worktree 和 checkpoint。
- provider、工具权限和外部接入要有 owner，不是个人随意决定。
- 任何正式交付都必须回到 diff、命令和验证证据。

## 常见反模式

- 团队每个人一套不同配置，却想共享同一套结果。
- 开启了大量工具和权限，但没人知道哪些是必须的。
- 把实验性流程直接当正式生产路径。
- checkpoint 只当撤销按钮，不当治理边界。

## 团队上线前检查

- repo contract 是否已经独立存在。
- provider、MCP 和权限配置是否有 owner。
- 是否定义了哪些任务能走开放栈，哪些不能。
- 人工接手时是否还能理解当前工具组合和风险边界。

## 下一步

- 去 [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks) 固定开放壳层下的任务模板。
- 去 [Cline：优点与替代](/docs/tools/terminal-agents/cline/tradeoffs-and-boundaries) 判断开放能力值不值得继续付出治理成本。
- 如果你想看更稳的执行入口，继续看 [OpenAI Codex：规则与边界](/docs/tools/execution-stacks/openai-codex/rules-memory-tools)。

## 来源

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)
