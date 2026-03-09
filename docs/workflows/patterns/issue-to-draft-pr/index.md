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
journey_stage: "implementation"
title: "Issue / Jira -> Draft PR"
description: "Issue / Jira -> Draft PR 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/issue-to-draft-pr"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
---

# Issue / Jira -> Draft PR

这条主线的合理性不在“平台里也能让 agent 干活”，而在它把清晰任务、异步交付、draft PR 和人工 review 连成了一套工作系统。

## 现在先做什么

- 直接按步骤执行：去 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想先看平台交接示例：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想先选平台主入口：去 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。

## 60 秒定位

如果 issue、Jira ticket 或 PR checklist 已经足够清晰，这条工作流非常高效。你把目标、验收和禁止事项写实，agent 负责交付草稿，owner 负责最终审阅和合并。

如果问题仍需要大量探索、实时讨论或反复试错，就不该先上这条主线。那类任务更适合先回到本地控制面或 spec 主线，把边界写清再异步委派。

## 默认进入顺序

1. 先用 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook) 跑通最小平台闭环。
2. 再看 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples) 对照真实 issue、draft PR 和 review 证据。
3. 然后按入口选择 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start) 或 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
4. 最后再补 [Issue / Jira -> Draft PR 风险与切换条件](/docs/workflows/patterns/issue-to-draft-pr/pitfalls) 和补充页。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 任务边界 | issue、Jira ticket 或 PR checklist 已经足够清晰。 | 直接进入 [Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。 |
| 协作方式 | 团队默认在 GitHub / Jira / review 流里协作。 | 用 draft PR 承接异步交付和人工收口。 |
| 验收要求 | 重视工作系统里的可追溯性，而不是实时同步盯执行。 | 把验收标准和风险说明写回 issue 与 PR。 |
| 切换信号 | 需求仍模糊，或高风险变更却无人负责最终收口。 | 先回到 [Spec-First](/docs/workflows/patterns/spec-first) 或本地探索。 |

## 默认人工接管点

- 任务没到“可委派”状态之前，不应该直接丢给后台 agent。
- draft PR 是 review 起点，不是终点，必须保留人工把关。
- 如果 PR 暴露出需求缺失，要回到 issue 层修，而不是让 reviewer 补需求。

## 下一步怎么读

- 想直接开跑：去 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想看标准例子：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想看真实 draft PR 交接：去 [GitHub Copilot Draft PR Handoff 案例](/docs/case-studies/github-copilot-draft-pr-handoff)。
- 想看它和本地到后台主线怎么分工：去 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
