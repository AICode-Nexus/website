---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Issue / Jira -> Draft PR：适用信号与边界"
description: "什么时候优先用 Issue / Jira -> Draft PR，什么时候不要用。"
slug: "/workflows/patterns/issue-to-draft-pr/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
---

# Issue / Jira -> Draft PR：适用信号与边界

这条主线适合“任务边界已经写进 issue，交付目标是尽快进入 PR review”的场景。它的前提不是工具够强，而是任务系统够清楚。issue 不清、验收不明时，平台流只会更快地产生无效 draft PR。

## 现在先做什么

- 想直接按平台主线执行：去 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想先看完整示例：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想先看真实 draft PR 交接：去 [GitHub Copilot Draft PR Handoff 案例](/docs/case-studies/github-copilot-draft-pr-handoff)。

## 快速判断表

| 判断点 | 适合上这条主线 | 更该切走的时候 |
| --- | --- | --- |
| 任务定义 | 目标、验收、禁区都能写进 issue。 | 仍需大量探索和实时澄清。 |
| 协作方式 | 团队以 PR review 为主要交付动作。 | 平台不是主要协作系统。 |
| 风险控制 | 有 reviewer、branch protection 和 merge gate。 | 高风险改动却没有最终收口 owner。 |
| 执行节奏 | 异步委派比同步结对更高效。 | 本地探索价值显著更高。 |

## 什么时候该上

- 任务目标、验收标准和允许修改的目录都能写进 issue。
- 团队已经有分支保护、PR 模板和 reviewer 机制。
- 负责人更关心交付节奏和可追踪，而不是全程同步盯执行。
- 任务来源在 Jira 或 GitHub，本来就要回到平台收口。

## 什么时候别上

- 问题仍需要大量探索、实时讨论或反复试错。
- 没有 issue hygiene，连验收标准都写不清。
- 高风险变更却无人负责最终收口和回归。
- 团队真正的主工作流发生在终端或 IDE，本平台只是代码托管。

## 常见切换条件

- 如果只是局部修复，回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果本地探索价值很高，再切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 如果先要把目标、非目标和验收条件写清，再切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果执行已经演变成长链路推进，补看 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 开始前自测

- reviewer 能不能只看 issue 就理解这轮做什么。
- 你能不能先写出不允许改什么，而不是只写想改什么。
- 这轮任务是不是天然以 PR 为交付物，而不是临时决定挂到 PR 上。
- 如果 agent 失败，团队能不能根据 issue 和 PR 模板迅速接手。

## 读完回哪里

- 想直接执行平台主线：回 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想看标准例子：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想看真实 draft PR 交接：去 [GitHub Copilot Draft PR Handoff 案例](/docs/case-studies/github-copilot-draft-pr-handoff)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
