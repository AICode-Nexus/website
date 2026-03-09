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
title: "Terminal-First Repo Pairing：流程与产物"
description: "Terminal-First Repo Pairing 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/terminal-first-repo-pairing/loop-and-artifacts"
sidebar_label: "补充：流程产物"
sidebar_position: 7
tags: ["ai-coding", "workflow", "terminal-first-repo-pairing"]
---

# Terminal-First Repo Pairing：流程与产物

## 现在先做什么

- 想按终端主线执行：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想先看完整示例：去 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想先选默认工具组合：去 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)。

## 最小产物清单

- 任务边界、允许修改的目录和实际执行的命令。
- 关键 diff、验证结果和剩余风险摘要。
- 需要 handoff 时的下一步动作，而不是一句笼统的“完成了”。

## 交接时必须看见什么

- 命令输出、测试结果和失败/成功信号对照。
- 如果切了 worktree 或 branch，要说明切分原因和收口方式。
- 终端里做过的判断要能回到 repo、PR 或 review 证据里。

## 最容易断裂的地方

- 命令执行很多，但没有留下结构化结果和风险说明。
- shell 很顺手，于是顺手扩大了本次任务边界。
- 终端里已经解决，但证据没有回收到仓库工作系统。

## 读完回哪里

- 想按主线执行：回 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想看标准例子：去 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 想先选入口组合：去 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
