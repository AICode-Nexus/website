---
audience: "mixed"
stage: "intermediate"
featured: true
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "solution-design"
title: "Spec-First"
description: "Spec-First 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/spec-first"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "spec-first"]
---

# Spec-First

这条主线存在的意义，不是让文档变多，而是先把目标、非目标、验收和任务拆解写清，再让 agent 执行，避免实现阶段不断扩边界。

## 现在先做什么

- 直接按步骤执行：去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想先看结构性任务样例：去 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想先选执行入口：去 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 60 秒定位

Spec-First 最适合新功能、跨模块改动、需要多角色 review 的任务。它先把“做什么”和“怎么做”拆开，让需求、计划和执行分别在合适的节点被审阅。

如果只是生产事故热修、单点配置修正或一次性探索，这条主线就过重。那类问题应该回到 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test) 或更轻量的本地处理。

## 默认进入顺序

1. 先用 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 跑通目标、非目标和验收条件的最小闭环。
2. 再看 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples) 对照真实 spec、plan 和 verification。
3. 然后按执行入口选择 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) 或 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
4. 最后再补 [Spec-First 风险与切换条件](/docs/workflows/patterns/spec-first/pitfalls) 和补充页。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 任务边界 | 需求边界模糊，稍不注意就会在实现阶段扩边界。 | 直接进入 [Runbook](/docs/workflows/patterns/spec-first/runbook)。 |
| 协作方式 | 多个角色都会 review 同一个改动。 | 先把目标、非目标和验收条件写清，再拆任务。 |
| 验收要求 | 如果不先列验收标准，后续很难判断 agent 是否真的完成。 | 把 spec 当合同，而不是长摘要。 |
| 切换信号 | 生产事故热修、单点配置修正或一次性探索。 | 回到 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test) 或更轻流程。 |

## 默认人工接管点

- spec 定稿前必须明确谁能改目标、谁只能补实现细节。
- plan 定稿后再进入执行，避免边执行边发明范围。
- 最终 merge 仍要由 owner 按 spec 与 diff 做人工 review。

## 下一步怎么读

- 想直接开跑：去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想看标准例子：去 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想看 spec 定稿后如何进入执行栈：去 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)。
- 想看它和轻量维护流怎么分工：去 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
