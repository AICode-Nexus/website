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
title: "Claude Code：规则与边界"
description: "Claude Code 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/terminal-agents/claude-code/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "claude-code"]
---

# Claude Code：规则与边界

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

## 写进 repo

- 先写最小 CLAUDE.md，再决定是否扩展更多流程。
- 高风险任务先切 worktree，再放开更多权限。
- 所有最终交付都要附带命令证据和 diff 摘要。

## 团队检查

- 先定义哪些规则必须版本化留在 repo，哪些只属于 Claude Code 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 先写最小 CLAUDE.md，再决定是否扩展更多流程。

## 下一步

- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你想把 brainstorming、plan、worktree、TDD 和 review ritual 固定下来。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：复杂 feature 先用 spec 固定边界，再回到 Claude Code 执行。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：本地终端执行与 GitHub PR 收口形成分工。
- [Claude Code：集成、review 与治理](/docs/ecosystem/integrations/claude-code)：如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。

## 来源

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
