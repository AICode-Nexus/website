---
audience: "advanced"
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
title: "Local -> Background -> Cloud"
description: "Local -> Background -> Cloud 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/local-to-background-to-cloud"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
---

# Local -> Background -> Cloud

这条主线的重点不是把任务拆成三段，而是先在本地摸清问题和边界，再把可执行部分交给后台或云端，最后在平台里收口 review。

## 现在先做什么

- 直接按三层 handoff 执行：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想先看本地到后台的完整例子：去 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 想先看默认工具组合：去 [Local -> Background -> Cloud Tooling](/docs/workflows/patterns/local-to-background-to-cloud/tooling)。

## 60 秒定位

它适合那些一开始需要本地读代码、跑命令、缩小问题面，但实现阶段又足够长，值得交给后台 agent 或云端环境继续推进的任务。最后再回到 PR、任务面板或 cloud task 系统里做状态管理和人工审阅。

如果任务本来就很小，或者团队既没有后台 agent 也没有云端任务面板，这条主线就过重。真正合理的前提，是本地 brief 能清楚到足以 handoff，而不是把模糊问题直接丢给后台。

## 默认进入顺序

1. 先用 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 跑通本地 brief、后台执行和平台收口的最小闭环。
2. 再看 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples) 对照真实 handoff。
3. 然后按入口选择 [VS Code Agents](/docs/tools/control-planes/vscode-agents)、[OpenAI Codex](/docs/tools/execution-stacks/openai-codex) 或 [GitHub Copilot](/docs/tools/platforms/github-copilot)。
4. 最后再补 [Local -> Background -> Cloud 风险与切换条件](/docs/workflows/patterns/local-to-background-to-cloud/pitfalls) 和补充页。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 任务边界 | 本地探索和后台执行都各有价值，单一入口会很笨重。 | 直接进入 [Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。 |
| 协作方式 | 任务能先收敛成结构化 brief，再交后台或云端继续跑。 | 先把 brief 写实，再 handoff。 |
| 验收要求 | 最终仍要回到 PR、任务面板或 cloud task 系统做审阅。 | 用平台层承接 review，不要停在后台状态里。 |
| 切换信号 | 任务很小、无法切出稳定 handoff，或团队没有后台入口。 | 回到本地主线，不要为了三层结构而三层结构。 |

## 默认人工接管点

- 本地探索必须输出结构化 brief，否则后台只是在放大噪音。
- 后台执行要有清晰 owner，避免“没人知道谁该收尾”。
- 云端面板只负责状态和审阅，不替代最终人工判断。

## 下一步怎么读

- 想直接开跑：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想看标准例子：去 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 想看真实本地到后台交接：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)。
- 想看控制面、执行栈和平台怎么分工：去 [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/tools/compare/github-copilot-vs-vscode-agent-vs-openai-codex)。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
