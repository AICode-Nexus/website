---
title: "Claude Code：规则、记忆与工具边界"
description: "Claude Code 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/claude-code/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "claude-code"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Claude Code：规则、记忆与工具边界

一旦一个入口开始支持 rules、memory、background task 或 MCP，它就不再只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，会直接决定这个入口是否能长期留在标准栈里。

## 规则分层

- CLAUDE.md 是长期资产，适合写 repo 结构、命令、边界和审批要求。
- 如果团队还有 AGENTS.md / GEMINI.md 等文件，需要明确职责而不是互相覆盖。
- 规则文件越清楚，Claude Code 的稳定性越高。

## 状态与记忆边界

- CLAUDE.md 与会话上下文一起组成主要记忆层。
- 团队共识应尽量回到版本化文件，而不是只留在个人 session 里。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | CLAUDE.md 是长期资产，适合写 repo 结构、命令、边界和审批要求。 | 如果团队还有 AGENTS.md / GEMINI.md 等文件，需要明确职责而不是互相覆盖。 |
| 状态与记忆 | CLAUDE.md 与会话上下文一起组成主要记忆层。 | 团队共识应尽量回到版本化文件，而不是只留在个人 session 里。 |
| 执行边界 | shell、git、worktree、MCP 和命令执行。 | 适合作为 repo 内的高控制主入口。 |
| 仓库合同 | 先写最小 CLAUDE.md，再决定是否扩展更多流程。 | 高风险任务先切 worktree，再放开更多权限。 |

## 仓库接入建议

- 先写最小 CLAUDE.md，再决定是否扩展更多流程。
- 高风险任务先切 worktree，再放开更多权限。
- 所有最终交付都要附带命令证据和 diff 摘要。

如果你已经在 repo 里有 AGENTS.md、目录边界、验证命令和 review checklist，那么 Claude Code 更应该做的是补足入口体验，而不是再造第二套事实来源。

## 团队检查清单

- 先定义哪些规则必须版本化留在 repo，哪些只属于 Claude Code 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 先写最小 CLAUDE.md，再决定是否扩展更多流程。

## 下一步怎么读

- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你想把 brainstorming、plan、worktree、TDD 和 review ritual 固定下来。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：复杂 feature 先用 spec 固定边界，再回到 Claude Code 执行。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：本地终端执行与 GitHub PR 收口形成分工。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：如果你更需要更强执行栈和云端任务。
- [Gemini CLI](/docs/tools/terminal-agents/gemini-cli)：如果你更倾向轻量终端入口和 GitHub 结合。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：如果你更依赖 editor 控制面与 background agents。

## 来源

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
