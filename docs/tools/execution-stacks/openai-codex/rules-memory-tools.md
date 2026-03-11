---
audience: "mixed"
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
title: "OpenAI Codex：规则与边界"
description: "OpenAI Codex 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/execution-stacks/openai-codex/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "openai-codex"]
---

# OpenAI Codex：规则与边界

执行栈一旦变强，规则就必须更硬。OpenAI Codex 这类工具不是只会“给建议”，而是真的会读仓库、跑命令、推进任务，所以权限、审批、目录边界和验证脚本必须先定，不然执行能力越强，失控也越快。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | AGENTS.md、审批要求、验证脚本。 | 只在单次任务成立的临时判断。 |
| 执行栈规则 | 自动继续阈值、lane 和 worktree 约定。 | 取代 repo 合同的长期事实。 |
| 单次任务 | 当前计划、阶段状态、回退点。 | 长期保留的一次性线索。 |

## 先分清三层

### 仓库合同

- AGENTS.md、目录边界、验证命令、审批要求、禁止事项。
- 这些内容必须版本化，因为它们决定任何执行栈都该怎么行动。

### 执行栈规则

- 什么时候允许自动继续、什么时候必须停下来等审批节奏。
- worktree、隔离环境、lane 管理的默认做法。

### 单次任务上下文

- 本轮计划、当前状态、未完成风险、这次只处理什么。
- 这些信息要随着任务结束而归档，不要升格成长期规则。

## 必须写进 repo 的内容

- 默认测试和构建命令。
- 哪些目录可以动，哪些必须先征得批准。
- 什么情况下必须开 worktree 或隔离环境。
- 交付时必须包含哪些证据，例如命令结果、diff 摘要、未覆盖风险。

## 适合放在执行栈层的内容

- 计划如何拆分成多阶段或多 lane。
- 审批模式的默认阈值。
- 本地与云端任务之间的 handoff 约定。
- 长任务中间状态的摘要格式。

## 只保留在单次任务里的内容

- 当前阶段的假设和待确认点。
- 这轮命令为什么要这样排顺序。
- 具体到这一次的风险评估和回退方案。

## 治理动作

- 先写好 repo 指令和验证脚本，再开放更强执行能力。
- 长任务默认使用 worktree 或隔离环境，别直接污染主工作区。
- 每次交付都要求命令证据，不接受只有自然语言总结。
- 多 lane 协同时，必须明确 owner、合并顺序和冲突处理。

## 常见反模式

- AGENTS.md 只写愿景，不写可执行边界。
- 审批要求模糊，导致工具和人都不知道什么时候该停。
- 有并行 lane，却没有统一收口方式。
- 任务结束后没有留下可追溯证据，只剩一句“已完成”。

## 团队上线前检查

- 默认验证命令是否已经脚本化。
- worktree 和隔离环境是否有明确使用条件。
- 人工接手时能否只看证据就知道下一步。
- 执行栈规则和 repo contract 是否已经分层。

## 下一步

- 去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks) 固定长任务和并行 lane 模板。
- 去 [OpenAI Codex：优点与替代](/docs/tools/execution-stacks/openai-codex/tradeoffs-and-boundaries) 判断它该不该继续做主执行栈。
- 如果你想看更轻的终端规则体系，继续看 [Claude Code：规则与边界](/docs/tools/terminal-agents/claude-code/rules-memory-tools)。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [OpenAI Codex Upgrades](https://openai.com/index/codex-upgrades/)
