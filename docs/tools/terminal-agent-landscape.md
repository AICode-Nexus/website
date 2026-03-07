---
title: 终端 Agent 全景
description: 横向比较 Claude Code、Gemini CLI、OpenAI Codex 与 Cline，决定 terminal-first 栈该如何搭配。
slug: /terminal-agent-landscape
sidebar_label: 终端 Agent 全景
tags: [ai-coding, terminal-agent, comparison]
track: cross-track
kind: comparison
audience: mixed
stage: intermediate
featured: false
pillar: tools
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# 终端 Agent 全景

## 先给结论

截至 2026 年 3 月 6 日，终端 agent 不再只是开放式爱好者路线，而是已经分化成 4 种明显角色：

- `Claude Code`: 终端协作与规则文件
- `Gemini CLI`: 终端入口与 GitHub / automation 结合
- `OpenAI Codex`: 后台执行、多 worktree 与并行 agent
- `Cline`: 开放式控制、MCP 和 Plan / Act

## 一张表看完

| 工具 | 更像什么 | 更适合谁 |
| --- | --- | --- |
| Claude Code | 终端协作入口 | 想把规则文件和仓库控制写清的团队 |
| Gemini CLI | 终端 + GitHub 补位入口 | 希望把本地 CLI 与 GitHub 流程衔接的人 |
| OpenAI Codex | 执行栈 / 后台 agent | 长任务、并行 worktree、异步委派 |
| Cline | 开放式 agent 壳层 | 想控制 MCP、Plan / Act、browser automation 的高级用户 |

## 选型建议

### 默认终端入口

优先比较 `Claude Code` 和 `Gemini CLI`。

### 长任务与并行执行

优先比较 `OpenAI Codex`。

### 高控制、开放式扩展

优先比较 `Cline`。

## 什么时候不该只用终端 agent

- 前端大量可视化交互
- 需要频繁人工拖拽或浏览器检查
- 组织默认在 GitHub review 里协作，而不是本地终端

## 来源

- Anthropic Docs: [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- Google GitHub: [gemini-cli](https://github.com/google-gemini/gemini-cli)
- OpenAI: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- Cline Docs: [Plan and Act](https://docs.cline.bot/features/plan-and-act)

## 延伸阅读

- [Claude Code Handbook](/docs/tools/terminal-agents/claude-code)
- [Gemini CLI Handbook](/docs/tools/terminal-agents/gemini-cli)
- [Cline Handbook](/docs/tools/terminal-agents/cline)
- [AI 开发方式总览](/docs/development-modes-landscape)
