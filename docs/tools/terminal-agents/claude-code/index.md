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
track: "cross-track"
domain: "tools"
journey_stage: "tech-selection"
title: "Claude Code"
description: "Claude Code 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/terminal-agents/claude-code"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "claude-code"]
---

import {LearningResources} from '@site/src/components/docs';

# Claude Code

Claude Code 的价值不在“它也能写代码”，而在它把终端主入口、仓库规则、命令验证和 worktree 协作收成了一条高控制回路。

## 现在先做什么

- 第一次进入仓库：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 想固定高频终端 SOP：去 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)。
- 想直接进入默认主线：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 60 秒定位

Claude Code 适合把 agent 当成 repo 内的搭档，而不是 IDE 里的补全气泡。它最自然的任务不是泛泛聊天，而是读代码、跑命令、看 diff、解释边界，然后把验证证据回收到仓库或 PR。

如果团队愿意维护 `CLAUDE.md`、目录边界和命令验证，它可以成为稳定主入口。反过来，如果团队不愿意看 shell、diff 和 review 证据，它更适合当补位工具，而不是中心入口。

## 默认进入顺序

1. 先用 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start) 跑通最小命令闭环。
2. 再用 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks) 固定 bugfix、重构和 worktree 操作。
3. 然后进入 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 或 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
4. 长期使用前再补 [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices) 和 [Claude Code 排错](/docs/tools/terminal-agents/claude-code/troubleshooting)。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 主控制面 | 你希望把终端、规则文件、命令验证和 repo pairing 放在一条线里。 | 先把 Claude Code 当主入口，再用平台层补 review。 |
| 任务形状 | 主要是读代码、跑脚本、修构建、补测试和 worktree 长任务。 | 先跑 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)。 |
| 团队约束 | 团队愿意把规则和证据链写回 repo，而不是留在个人会话里。 | 把 `CLAUDE.md` 和验证命令先固定下来，再扩大使用面。 |
| 退出信号 | 团队不愿看 shell、diff 和命令输出。 | 一旦出现这些信号，就优先评估 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) 或 [GitHub Copilot](/docs/tools/platforms/github-copilot)。 |

## 默认补位组合

- [Superpowers](/docs/workflows/community-frameworks/superpowers)：适合把 brainstorming、plan、worktree、TDD 和 review ritual 固化下来。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：复杂 feature 先写 spec，再回到 Claude Code 执行。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：终端执行留在本地，PR 和 review 在平台收口。

## 官方依据

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)

## 下一步怎么读

- 想直接上手：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 想按默认主线跑任务：去 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)。
- 想看真实 bugfix 收口：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。
- 想看它和执行栈怎么分工：去 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)。

<LearningResources
  tool="Claude Code"
  description="如果你已经确认这类入口值得继续深入，下面这些课程和公开视频可以直接补齐操作层细节。"
/>
