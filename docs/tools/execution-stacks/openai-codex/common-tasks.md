---
title: "OpenAI Codex 常见任务"
description: "把 OpenAI Codex 最常见的长任务和阶段推进场景固定成可复用 SOP。"
slug: "/tools/execution-stacks/openai-codex/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
tags: ["ai-coding", "tool", "openai-codex", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-common-tasks", "openai-codex"]
estimated_time: 30
prerequisites: ["已跑通 OpenAI Codex 快速开始", "能够拆阶段", "能给出每阶段验证方式"]
deliverable: "三个适合 OpenAI Codex 的阶段推进模板"
---

# OpenAI Codex 常见任务

## 这页适合处理什么任务

- 任务天然需要多阶段推进，而不是一轮对话结束。
- 你关心的是计划、执行、验证、handoff 能不能连成链。
- 你愿意为每个阶段定义输入、输出和停点。

## 前置条件

- 先完成 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。
- 你准备的任务可以被拆成阶段，而不是一个巨型模糊目标。
- 每个阶段都有明确验证方式。

## 使用前先固定三件事

- 每一阶段都要写清“只做什么”和“明确不做什么”。
- 每一阶段都要有真实验证命令或验证行为。
- 阶段结束后必须有继续/停止的显式判断，不允许默认自动继续。

## 步骤

### 任务 1：跨模块重构

适合需要多个阶段推进的改动，例如接口整理、目录迁移、核心流程抽离。默认要求：

- 先写当前阶段边界
- 只推进这一阶段
- 阶段结束就跑验证

开始前至少准备：

- 当前阶段目标
- 受影响模块范围
- 本阶段完成后必须看到的证据

默认模板：

```text
当前阶段目标：
本阶段只改：
本阶段不改：
验证命令：
交付证据：
```

成功信号：

- 当前阶段完成后，你能明确决定要不要进入下一阶段
- 执行记录和验证结果能支撑 review
- 没有把整个重构揉成一轮超大 diff

切换条件：

- 如果任务还没拆成阶段，先回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)
- 如果阶段已经小到只是维护任务，就改用 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)

### 任务 2：本地探索后继续长任务

适合先在本地确认方向，再把后续执行推进下去。关键是把探索结论写回计划，而不是只靠口头记忆。

开始前先准备：

- 本地探索结论
- 已排除的方案
- 这一轮真正要执行的阶段

默认要求：

```text
请把本地探索结论写回当前阶段计划。
只推进这一轮已确认的执行部分。
结束后回报命令结果、未完成项和下一阶段建议。
```

成功信号：

- 探索结论没有在 handoff 里丢失
- Codex 承接的是执行，不是重新发明任务边界
- 下一阶段建议和当前证据一致

切换条件：

- 如果本地探索还不稳定，别急着交执行栈
- 如果任务需要频繁编辑器内人工审阅，可配合 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks)

### 任务 3：多轮 review 证据整理

适合需要保留阶段性验证和 review 证据的任务。搭配 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples) 更稳。

开始前先明确：

- reviewer 需要看哪些阶段证据
- 哪些日志或命令输出必须保留
- 最终交付摘要怎么写

默认要求：

```text
请把每一阶段的目标、执行结果、验证结果和未完成项整理成 reviewer 能直接读的摘要。
不要只给工具日志，也不要只给最终 diff。
```

成功信号：

- reviewer 不需要自己从长日志里捞结论
- 证据足够解释为什么可以继续或暂停
- 多轮 review 仍然能看清任务演进

切换条件：

- 如果最终主要在平台层收口，就接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)
- 如果其实没有多轮证据要求，就不要过度包装

## 验收清单

每次任务都检查：

- 当前阶段目标是否完成
- 验证命令是否真实执行
- 下一阶段是否仍然有清晰边界
- 你能说清为什么这次需要执行栈而不是更轻量入口

## 常见误用

- 把“长任务”理解成“一次性大任务”，不做阶段切分
- 每阶段都没有明确验证，只靠主观判断继续
- 本地探索和执行 handoff 只存在聊天里，没有写回计划
- 明明只是普通维护任务，却强行用执行栈制造复杂度

## 下一步

- 去 [OpenAI Codex 排错](/docs/tools/execution-stacks/openai-codex/troubleshooting)。
- 去 [Spec-First Tooling](/docs/workflows/patterns/spec-first/tooling)。
- 如果你想把任务再缩小，切到 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 来源

- [OpenAI Codex](https://openai.com/index/introducing-the-codex-app/)
