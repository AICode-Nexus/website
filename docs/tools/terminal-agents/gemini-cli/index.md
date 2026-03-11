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
title: "Gemini CLI"
description: "Gemini CLI 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/terminal-agents/gemini-cli"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "gemini-cli"]
---

import {LearningResources} from '@site/src/components/docs';

# Gemini CLI

Gemini CLI 的合理定位不是“再来一个终端助手”，而是轻量 terminal-first 入口，重点在 context files、命令执行和与 GitHub 流的兼容性。

## 现在先做什么

- 第一次进仓库：去 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 想固定终端高频 SOP：去 [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks)。
- 想直接进入默认主线：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 60 秒定位

它适合那些已经有 GitHub review 流、但还想补一个终端入口的团队。你把 context files、验证命令和规则留在 repo，Gemini CLI 负责本地读代码、跑命令、巡检仓库，再把结果顺手带回 PR 系统。

它不适合承担平台、控制面和执行栈的全部角色。真正需要 worktree 并行、复杂后台编排或深度云端执行时，更合理的是把它放回轻量终端补位层。

## 默认进入顺序

1. 先用 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start) 跑通最小命令和 context file 闭环。
2. 再用 [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks) 固定终端巡检、修复和 GitHub handoff。
3. 然后进入 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 或 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
4. 长期使用前再补 [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices) 和 [Gemini CLI 排错](/docs/tools/terminal-agents/gemini-cli/troubleshooting)。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 主控制面 | 你需要轻量终端入口，而不是整套平台或 IDE 工作台。 | 先把 Gemini CLI 当本地终端入口，再把 PR 收口交给 GitHub。 |
| 任务形状 | 终端里的 bugfix、重构、脚本运行和 repo 巡检。 | 先跑 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)。 |
| 团队约束 | 团队愿意把 context files 和验证命令版本化到 repo。 | 先理顺规则文件 owner，再扩大 CLI 使用面。 |
| 退出信号 | CLI 只被用来聊天，不再真正跑命令和回传证据。 | 一旦出现这些信号，就优先评估 [Claude Code](/docs/tools/terminal-agents/claude-code) 或 [GitHub Copilot](/docs/tools/platforms/github-copilot)。 |

## 谁最适合用

- 想保留 shell 主线，但不想一开始就上很重执行栈的人。
- 已有 GitHub review 流，只差一个轻量本地终端入口的团队。
- 愿意维护最小 context files 和验证脚本的团队。
- 中小任务占大多数、需要稳定终端补位的人。

## 不要期待它做什么

- 不要期待它替代正式平台、控制面和执行栈的全部职责。
- 不要期待 context files 膨胀后还保持稳定。
- 不要期待复杂并行 lane 和重后台编排仍由轻量 CLI 承担。

## 团队采用前检查

- GEMINI.md 或等价 context file 是否保持克制且有人维护。
- 命令、脚本和 PR 证据是否已能回到 repo。
- 团队是否真的需要轻量终端层，而不是更重的终端或 IDE 主线。
- 当复杂任务升级时，是否知道切去 [Claude Code](/docs/tools/terminal-agents/claude-code) 或 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)。

## 默认人工接管点

- context files 一旦版本化，就要有明确 owner，避免多人按各自风格膨胀。
- 真正的交付证据必须回到 diff、测试和 PR，而不是只停留在终端输出里。
- 当任务升级成长链路并行执行时，应及时切到更重入口，而不是继续用轻量 CLI 硬撑。

## 官方依据

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)

## 下一步怎么读

- 想直接上手：去 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 想按默认主线跑任务：去 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)。
- 想看真实终端到 draft PR 交付：去 [Gemini CLI Terminal Audit to Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。
- 想看它和平台入口怎么分工：去 [GitHub Copilot](/docs/tools/platforms/github-copilot)。

<LearningResources
  tool="Gemini CLI"
  description="如果你已经确认这类入口值得继续深入，下面这些课程和公开视频可以直接补齐操作层细节。"
/>
