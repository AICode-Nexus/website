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
domain: "tools"
journey_stage: "implementation"
title: "GitHub Copilot：规则与边界"
description: "GitHub Copilot 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/platforms/github-copilot/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "github-copilot"]
---

# GitHub Copilot：规则与边界

## 规则分层

- 优先把 issue 模板、PR 模板、branch policy 和 repo 指令当成平台规则源头。
- 平台层的自定义说明应该服务于 repo 规则，而不是覆盖 repo 合同。
- 当组织开始用 memory 或 coding agent 指令时，仍需明确谁能修改这些默认规则。

## 状态与记忆边界

- 平台更适合保存工作系统上下文，例如 issue、PR、review、Jira 状态。
- 个体偏好可以交给平台记忆，但仓库级规则仍应版本化在 repo 内。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | 优先把 issue 模板、PR 模板、branch policy 和 repo 指令当成平台规则源头。 | 平台层的自定义说明应该服务于 repo 规则，而不是覆盖 repo 合同。 |
| 状态与记忆 | 平台更适合保存工作系统上下文，例如 issue、PR、review、Jira 状态。 | 个体偏好可以交给平台记忆，但仓库级规则仍应版本化在 repo 内。 |
| 执行边界 | 强项在 GitHub issue、PR、review、branch 与外部工单系统集成。 | 不应该把它当成 shell-first 的主入口，而应把本地执行交给更合适的工具。 |
| 仓库合同 | 先把 issue 模板、PR checklist 和 branch protection 写清，再扩大 coding agent 使用范围。 | 在 repo 里固定好验证命令和 reviewer 规则，平台只负责承接这些制度。 |

## 写进 repo

- 先把 issue 模板、PR checklist 和 branch protection 写清，再扩大 coding agent 使用范围。
- 在 repo 里固定好验证命令和 reviewer 规则，平台只负责承接这些制度。
- 如果平台 agent 产物无法回流到 PR 描述或检查结果，就不要扩大使用。

## 团队检查

- 先定义哪些规则必须版本化留在 repo，哪些只属于 GitHub Copilot 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 先把 issue 模板、PR checklist 和 branch protection 写清，再扩大 coding agent 使用范围。

## 下一步

- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：本地控制面与 GitHub 平台形成前后端分工。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：长任务可在执行栈里推进，最后回到 GitHub 收口。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：适合把 spec 或 task 摘要附着在 issue / PR 流里。
- [GitHub Copilot：集成、review 与治理](/docs/ecosystem/integrations/github-copilot)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
