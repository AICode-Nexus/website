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
title: "Issue / Jira -> Draft PR：流程与产物"
description: "Issue / Jira -> Draft PR 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/issue-to-draft-pr/loop-and-artifacts"
sidebar_label: "补充：流程产物"
sidebar_position: 7
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
---

# Issue / Jira -> Draft PR：流程与产物

## 现在先做什么

- 想按平台主线执行：去 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想先看完整示例：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想先选默认工具组合：去 [Issue / Jira -> Draft PR Tooling](/docs/workflows/patterns/issue-to-draft-pr/tooling)。

## 最小产物清单

- 能独立交给 agent 的 issue brief、验收标准和目录边界。
- draft PR 中的 diff、验证结果、风险说明和待 review 项。
- 需要回到本地或补充说明时的下一步动作，不要只留模糊状态。

## 交接时必须看见什么

- issue 里要能看见任务目标、非目标和验收标准。
- draft PR 必须附上实际执行过的检查、失败/成功信号和 reviewer 提示。
- 如果中途转本地或后台探索，要明确写出 handoff 原因。

## 最容易断裂的地方

- issue 写得太空，agent 只是把噪音原样搬进 PR。
- PR 有 diff，但没有验证证据和风险说明。
- 大家以为平台会自动把尾收好，最后没人负责最终 merge 判断。

## 读完回哪里

- 想按主线执行：回 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想看标准例子：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想先选入口组合：去 [Issue / Jira -> Draft PR Tooling](/docs/workflows/patterns/issue-to-draft-pr/tooling)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
