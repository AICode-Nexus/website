---
title: Gemini CLI 终端巡检到 Draft PR 案例
description: 用 Gemini CLI 在终端里完成仓库巡检与最小修复，再把验证与风险说明带进 draft PR。
slug: /case-studies/gemini-cli-terminal-audit-to-draft-pr
sidebar_label: Gemini CLI 巡检到 PR
tags: [ai-coding, case-study, gemini-cli, terminal-first, draft-pr]
track: cross-track
kind: case-study
content_form: case-study
audience: mixed
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: resource
reviewed_at: 2026-03-08
source_window_end: 2026-03-08
market_status: current
case_type: "terminal-audit-to-pr"
scenario: "先在终端里完成仓库巡检、最小修复和验证，再把结果整理成 draft PR 可 review 说明。"
tool_stack: [Gemini CLI, Terminal-First Repo Pairing, GitHub Copilot, draft PR]
verification: "巡检命令、最小改动、验证结果和 PR 风险说明能够一一对应。"
---

# Gemini CLI 终端巡检到 Draft PR 案例

## 背景

这类任务常见于仓库维护阶段：你先想在终端里快速巡检配置、脚本和关键命令，再顺手做一次最小修复，但最终交付仍然要进入 PR 流并支持 review。之前最大的断点是，终端里的发现很多，真正进到 PR 的只有少量代码 diff，评审人看不到为什么改、怎么验、还剩什么风险。

## 输入约束

- 终端主入口固定为 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 仓库内执行流程固定为 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 最终平台收口固定为 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 本次任务只允许做巡检结论直接支持的最小修复，不接受顺手扩范围。
- 必须回传真实命令结果，而不是只写自然语言总结。

## 执行过程

1. 先用 Gemini CLI 跑仓库巡检，读取脚本、配置和检查命令，输出一份简短风险摘要。
2. 从风险摘要里只挑一个最小、可验证的问题进入修复，而不是把巡检发现全部打包处理。
3. 在终端里完成最小改动并立即跑验证命令，保留原始结果。
4. 把“巡检发现 -> 最小修复 -> 验证结果 -> 剩余风险”整理成一段可直接进入 draft PR 的说明。
5. 最后进入平台补全 PR 描述，让 reviewer 不需要重新回放终端过程也能判断质量。

这个案例里，Gemini CLI 的角色非常明确：它负责终端内巡检和最小执行闭环；平台负责交付说明和 review；真正串起两者的是命令证据，而不是工具名。

## 结果

- 巡检结论不再停留在终端会话里，而是能进入 PR 交付链。
- 评审人不仅看到了 diff，还能看到这次改动为什么值得做、怎么验证、剩余风险是什么。
- 团队更容易把 Gemini CLI 用成可靠终端入口，而不是只在本地做聊天式探索。

## 复盘

- Gemini CLI 很适合仓库巡检、脚本验证和最小维护闭环，但前提是命令结果必须真实回传。
- 一旦巡检发现开始变成多阶段结构性任务，就不该继续硬塞进轻量终端流程，应切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 或 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。
- 如果最终 PR 里看不到验证和风险说明，就说明终端入口和平台入口之间仍然没有真正打通。

## 下一步

- 回到 [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks)。
- 回到 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 如果你想比较终端入口与平台入口的分工，再看 [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff)。
