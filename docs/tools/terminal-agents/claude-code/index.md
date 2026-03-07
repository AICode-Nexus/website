---
title: "Claude Code"
description: "Claude Code 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/terminal-agents/claude-code"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "claude-code"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: true
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Claude Code

Claude Code 是典型的 terminal-first repo pairing 入口：强调 CLAUDE.md、common workflows、命令验证和 worktree 协作。

## 角色定位

终端主入口，适合把仓库规则、计划、执行和命令验证放在一条清晰回路里。

## 最适合谁

- 后端、基础设施、monorepo 和脚本化仓库。
- 愿意把规则文件、目录边界和验证命令版本化到仓库的人。
- 想让 agent 真正成为 repo 内的搭档，而不是 IDE 辅助气泡的团队。

## 默认工作方式

- 这个入口真正高价值的地方是：终端主入口，适合把仓库规则、计划、执行和命令验证放在一条清晰回路里。
- 如果它不能回流到 repo 证据、验证命令和人工 review，它就只是在制造另一层会话噪音。
- 最稳的使用方式通常不是“让它承担全部职责”，而是和平台、框架或终端验证形成分层。

## 来源

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
