---
title: 主流 AI Coding 工作流
description: 截至 2026-03-07，把当前主线 workflow 先收成一张地图，再决定你的默认交付链和要不要引入框架。
slug: /workflows/mainstream-ai-coding-workflows
sidebar_label: 主流工作流
tags: [ai-coding, workflows, mainstream]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: development-planning
entry_role: domain
audience: mixed
stage: starter
featured: true
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# 主流 AI Coding 工作流

## 这篇里的“主流”是什么意思

这里的“主流”不是市场份额榜，而是截至 2026 年 3 月 7 日，官方文档和高频仓库信号里反复出现的交付主线。

它分成两层：

- 工作流模式：回答任务怎么从问题走到 PR。
- 工作流框架：回答团队要不要用一套明确方法论把这条链路固定下来。

## 一张表先看完

| 层级 | 名称 | 更适合什么 |
| --- | --- | --- |
| 模式 | [Spec-First](/docs/workflows/patterns/spec-first) | 新功能、跨模块、需要清晰验收 |
| 模式 | [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test) | 高频维护任务 |
| 模式 | [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr) | GitHub / Jira 工作系统中的清晰任务 |
| 模式 | [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud) | 先本地探索再异步推进的复杂任务 |
| 模式 | [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing) | 仓库内强控制协作 |
| 模式 | [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent) | 多 lane 长任务 |
| 官方框架 | [BMAD](/docs/workflows/frameworks/bmad) | 多角色、多阶段、完整治理 |
| 官方框架 | [Spec Kit](/docs/workflows/frameworks/spec-kit) | spec、plan、tasks 产物链 |
| 官方框架 | [OpenSpec](/docs/workflows/frameworks/openspec) | brownfield 与轻量 proposal 管理 |
| 社区框架 | [Superpowers](/docs/workflows/community-frameworks/superpowers) | 面向 coding agents 的日常方法链 |

## 先固定哪一条

如果你当前最痛的是需求跑偏，先固定 [Spec-First](/docs/workflows/patterns/spec-first)。

如果你最痛的是高频维护任务波动大，先固定 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)。

如果你的团队默认在 GitHub / Jira 里协作，先固定 [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)。

如果你已经高频使用 coding agents，但日常节奏仍然很散，再看 [Superpowers](/docs/workflows/community-frameworks/superpowers) 这类社区框架。

## 不要同时做错的三件事

- 不要一边没有默认 workflow，一边同时试三个主入口工具。
- 不要把框架当成规则文件和质量门禁的替代品。
- 不要一上来选最重方案，再指望团队自然适应。

## 应该先固定哪一条

真正更稳的顺序通常是：

1. 先选默认任务链。
2. 再选主入口工具。
3. 最后判断是否要引入框架层。

如果只给一个建议：

- 个人工程师先固定 `bugfix / refactor / test` 或 `terminal-first`
- 小团队先固定 `spec-first`
- GitHub-first 团队优先试 `issue -> draft PR`
- 长任务团队再升级到 `parallel worktrees / multi-agent`

## Sources

- GitHub Docs: [GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- GitHub Docs: [Integrating Copilot coding agent with Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- VS Code Docs: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- VS Code Docs: [Background agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- OpenAI: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- Anthropic Docs: [Claude Code common workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- GitHub: [Spec Kit](https://github.com/github/spec-kit)
- GitHub: [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- GitHub: [OpenSpec](https://github.com/openspec-ai/openspec)
- GitHub: [Superpowers](https://github.com/obra/superpowers)
