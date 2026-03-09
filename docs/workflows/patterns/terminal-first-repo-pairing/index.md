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
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Terminal-First Repo Pairing"
description: "Terminal-First Repo Pairing 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/terminal-first-repo-pairing"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "terminal-first-repo-pairing"]
---

# Terminal-First Repo Pairing

这条主线的核心不是“在终端里也能跑 agent”，而是把规则文件、命令执行、diff 审阅和验证闭环放回仓库内部。

## 现在先做什么

- 直接开始执行：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想先看仓库内示例：去 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想先定终端主入口：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。

## 60 秒定位

这条工作流适合真实工程仓库、monorepo、脚本化任务和需要高控制边界的团队。你要相信的是命令输出、验证结果和 diff，而不是某个界面里的一句“完成了”。

如果任务高度视觉化、离不开浏览器人工操作，或者仓库根本没有脚本和验证回路，就不该硬上终端主线。那类问题更适合走 IDE 工作台或平台型入口。

## 默认进入顺序

1. 先用 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 跑通最小闭环。
2. 再看 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples) 对照真实命令和证据链。
3. 然后按入口选择 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)、[OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) 或 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
4. 最后再补 [Terminal-First Repo Pairing 风险与切换条件](/docs/workflows/patterns/terminal-first-repo-pairing/pitfalls) 和补充页。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 任务边界 | 仓库已有构建、测试、脚本或 codemod 回路。 | 直接进入 [Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。 |
| 协作方式 | 团队不想把全部上下文和执行都锁在 IDE 或网页产品里。 | 把规则文件和命令验证先写回 repo。 |
| 验收要求 | 你更信命令输出和 diff，而不是一句“已经完成”。 | 用终端主线承接 repo pairing 和验证闭环。 |
| 切换信号 | 任务高度视觉化，或根本没有验证回路。 | 转去 IDE/平台入口，别在终端里硬撑。 |

## 默认人工接管点

- 高风险命令、依赖变更和权限放大前必须显式审批。
- 任何大改动都要在 diff 可读的前提下推进，不宜一次性倾倒大 patch。
- 最终仍由人决定验证是否充分、是否值得 merge。

## 下一步怎么读

- 想直接开跑：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想看标准例子：去 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想看真实终端到 PR 交付：去 [Gemini CLI Terminal Audit to Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。
- 想看它和平台主线怎么分工：去 [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
