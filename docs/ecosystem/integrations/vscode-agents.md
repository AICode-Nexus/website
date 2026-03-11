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

VS Code Agents 的治理重点不是“编辑器里能不能跑起来”，而是“本地控制面、background agent 和最终平台收口是不是同一条责任链”。编辑器入口最大的问题，往往不是能力不够，而是证据和 owner 留在界面里，没有回到 repo。

## 默认集成拓扑

| 集成面 | 默认接法 | 治理重点 |
| --- | --- | --- |
| 本地工作台 | 代码阅读、终端、diff、浏览器工具。 | 编辑器只是控制面，不是唯一事实源。 |
| 后台执行 | background agents、第三方 agents。 | 必须有 handoff 和 owner。 |
| 证据回流 | diff、命令输出、任务摘要、PR 描述。 | 不允许只凭编辑器面板状态收口。 |
| 最终收口 | GitHub review、测试、CI、merge gate。 | 平台和 repo 证据仍是最终标准。 |

## 什么时候适合把它接进正式工作系统

- 团队大部分时间都在 VS Code 内工作。
- 本地探索和后台执行之间确实存在明确 handoff。
- 你需要的是控制面，而不是把编辑器当成全能执行栈。
- 团队愿意把 repo 合同独立出来，不把所有制度塞进工作区配置。

## review 证据最低集

至少保留四类证据：

- 任务在本地如何被理解和拆解。
- background agent 接手后做了什么。
- 最终有哪些 diff、测试和验证结果。
- 哪些结果已经回写到 PR、issue 或仓库文档。

如果 background agent 只回一句“完成”，说明这套控制面还没有被纳入治理。

## 上线前先定的四个 owner

- `编辑器入口 owner`：定义 custom agents、reusable prompts 和团队默认面板习惯。
- `后台执行 owner`：负责 background task 的边界、升级条件和失败回退。
- `仓库合同 owner`：维护验证命令、目录边界和 PR 证据结构。
- `平台收口 owner`：保证最终 review 仍落在 PR、CI 和 merge rule 上。

## 默认审批边界

- background agent 不得自行扩大需求范围。
- 高风险任务必须把关键决策回到人工审阅。
- 任何后台执行都必须能追溯到真实命令、真实 diff 和真实测试。
- 如果任务已经从控制面滑向正式执行栈，要及时切换，不要继续堆在编辑器里。

## 最小 rollout 路径

1. 先从 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud) 这种天然匹配的工作流试点。
2. 固定本地探索摘要和后台 handoff 模板。
3. 再把 bugfix、测试补齐和局部 refactor 接入同一控制面。
4. 只有在证据能稳定回流到 PR 和 CI 后，再扩大到更长任务。

## 什么时候不要继续扩大

- 团队无法统一在 VS Code 上协作。
- background agent 的产物长期没人收口。
- 编辑器里看起来很顺，但 PR 里没有足够证据。
- 真正复杂的任务仍要大量切去终端或平台，控制面没有形成实质价值闭环。

## 配套组合

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：平台收口最自然。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：复杂执行主线交给执行栈。
- [VS Code Agents：规则与边界](/docs/tools/control-planes/vscode-agents/rules-memory-tools)：先处理编辑器规则和 repo 合同的分层。

## 下一步怎么读

- 去 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks) 固定本地探索和后台 handoff 模板。
- 去 [VS Code Agents：优点与替代](/docs/tools/control-planes/vscode-agents/tradeoffs-and-boundaries) 判断控制面值不值得继续占主位。
- 如果后台执行已经成为主线，改读 [OpenAI Codex：集成、review 与治理](/docs/ecosystem/integrations/openai-codex)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
