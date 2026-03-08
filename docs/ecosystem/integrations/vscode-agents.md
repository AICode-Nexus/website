---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "ecosystem"
journey_stage: "implementation"
title: "VS Code Agents：集成、review 与治理"
description: "VS Code Agents 如何接工作系统、保留 review 证据并纳入治理。"
slug: "/ecosystem/integrations/vscode-agents"
sidebar_label: "集成与治理"
tags: ["ai-coding", "tool", "vscode-agents"]
---

# VS Code Agents：集成、review 与治理

一个工具一旦被组织当成主入口，就必须回答三个问题：它怎么接入工作系统、证据回流到哪里、出了问题由谁负责。只有把这三件事说清，工具选型才算进入工程层。

## 工作系统接入

- 本地 agent、background agents 和第三方 agents。
- 编辑器内终端、浏览器工具和 diff 评审。
- 可与 GitHub 平台或终端执行栈组合。

## 证据链

- 背景任务摘要、编辑器内 diff、命令结果和最终 PR 说明应形成一套完整证据。
- 不要只因为 editor 里看起来顺，就跳过平台 review。

## 治理矩阵

| 治理面 | 最低要求 | 不满足时的风险 |
| --- | --- | --- |
| 工作系统接入 | 本地 agent、background agents 和第三方 agents。 | 入口成功提示会替代真正的任务状态。 |
| 证据链 | 背景任务摘要、编辑器内 diff、命令结果和最终 PR 说明应形成一套完整证据。 | 团队无法解释“这次到底跑了什么、改了什么”。 |
| Owner 与规则 | 需要定义本地与后台 agent 的职责边界，以及何时必须升级到人工审批。 | 团队无法统一在 VS Code 上协作。 |
| 扩张节奏 | 先从低风险、高频任务试点，再扩大到复杂任务。 | 真正的复杂任务仍然需要大量切换到终端或平台，控制面没有形成价值闭环。 |

## Owner、审批与 rollout 清单

- 先定义谁拥有入口规则、谁拥有 repo 合同、谁拥有最终 merge 责任。
- 把“哪些任务能直接放行、哪些任务必须人工接管”写成可复用清单。
- 默认先从低风险、高频任务试点，再扩大到长任务或跨模块任务。
- 需要定义本地与后台 agent 的职责边界，以及何时必须升级到人工审批。
- 统一控制面会提升效率，也会把不清晰的任务定义放大得更快。

## 团队落地顺序

1. 先确认 VS Code Agents 在系统里负责哪一段，而不是一开始就给它全部权限。
2. 再把 review 证据固定成 diff、命令结果、说明和 handoff 记录。
3. 最后才扩大适用范围，否则你只是在放大现有治理缺口。

## 下一步怎么读

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。
- [Cursor](/docs/tools/ide-first/cursor)：如果你想把 editor-first 体验做得更深、更产品化。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：这是 VS Code Agents 最自然的主线。
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：本地修复与后台补跑结合得比较顺。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
