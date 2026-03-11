---
audience: "mixed"
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
title: "Terminal-First Repo Pairing：适用信号与边界"
description: "什么时候优先用 Terminal-First Repo Pairing，什么时候不要用。"
slug: "/workflows/patterns/terminal-first-repo-pairing/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "terminal-first-repo-pairing"]
---

# Terminal-First Repo Pairing：适用信号与边界

这条主线适合“真实工作发生在仓库、终端和命令回路里”的团队。它的核心不是用终端显得更硬核，而是让规则文件、命令输出、diff 和验证证据都保持可见。

## 现在先做什么

- 想直接按终端主线执行：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想先看完整示例：去 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想先看真实终端交付：去 [Gemini CLI Terminal Audit to Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。

## 快速判断表

| 判断点 | 适合上这条主线 | 更该切走的时候 |
| --- | --- | --- |
| 工作发生地 | 主要在 repo、shell、git 和脚本里。 | 任务高度视觉化或平台化。 |
| 验证方式 | 团队信命令输出和 diff。 | 团队不愿看命令或 review diff。 |
| 规则来源 | repo 里已有脚本、验证和规则文件。 | 仓库没有任何验证回路。 |
| 协作节奏 | 适合 repo pairing 和小步执行。 | 需要更重并行编排或多角色流程。 |

## 什么时候该上

- 仓库已有构建、测试、脚本或 codemod 回路。
- 团队更信命令输出和 diff，而不是某个 UI 里的“已完成”。
- 你需要 agent 直接和 repo 规则、worktree、构建命令交互。
- 问题主要通过读代码、跑命令、追日志来定位。

## 什么时候别上

- 任务高度视觉化，离不开浏览器交互和人工拖拽。
- 团队不愿意看命令输出，也不愿意 review diff。
- 仓库没有任何脚本和验证回路，终端只能盲改。
- 真正的工作主线其实是 issue 平台或 IDE 工作台。

## 常见切换条件

- 如果只剩单点修复，回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果要并行拆 lane，切到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 如果先要把目标和非目标写清，切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果平台 review 和任务系统开始成为主成本，补看 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。

## 开始前自测

- 仓库里是否真的有脚本、测试或构建回路可以依赖。
- 你能不能把关键动作映射到命令输出和 diff。
- 团队是否接受终端输出也是正式证据的一部分。
- 如果今天换一个入口，repo 合同还能不能继续成立。

## 读完回哪里

- 想直接执行终端主线：回 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想看标准终端例子：去 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想看真实终端到 draft PR 交付：去 [Gemini CLI Terminal Audit to Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
