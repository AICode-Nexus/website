---
title: AI 开发方式总览
description: 用 6 种主流 AI 开发方式来判断默认入口、人机分工和适合的任务边界，而不是只比较产品名。
slug: /development-modes-landscape
sidebar_label: 开发方式总览
tags: [ai-coding, development-modes, strategy]
track: cross-track
kind: guide
audience: mixed
stage: intermediate
featured: false
pillar: development-modes
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# AI 开发方式总览

## 先给结论

截至 2026 年 3 月 6 日，主流 AI 开发已经不适合再用“编辑器里有个聊天框”来概括。更实用的判断方式是先区分 6 种开发方式：

1. `IDE-first`
2. `terminal-first`
3. `GitHub-first`
4. `async-agent-first`
5. `spec-first`
6. `human-in-the-loop`

## 6 种方式怎么理解

### `IDE-first`

默认入口在 IDE，强调连续编辑体验、内联上下文和可视化调度。

更适合：

- 前端和应用层高频迭代
- 需要频繁切回人工的小步修改
- 想在一个界面里调度本地与后台 agent

### `terminal-first`

默认入口在终端，强调仓库级控制、命令验证和显式规则文件。

更适合：

- 后端、基础设施、CLI、monorepo
- 需要精确控制目录、命令和权限
- 希望把规则文件版本化到仓库

### `GitHub-first`

默认入口在 issue、PR、review、Jira 这类正式工作系统。

更适合：

- 已有成熟 GitHub 工作流的团队
- 需要把 agent 直接接入 review 与 PR
- 关注协作链路而不只关注编辑体验

### `async-agent-first`

默认入口是后台 agent、cloud agent 或并行 worktree。

更适合：

- 长任务
- 多实现方向并行验证
- 可以清晰拆分子任务和验收条件的工作

### `spec-first`

先写 spec、边界和验收，再让 agent 执行。

更适合：

- 跨模块或多角色协作任务
- 容易范围蔓延的需求
- 希望把计划与执行显式分开的团队

### `human-in-the-loop`

任何入口都可以，但高风险节点必须由人类确认。

更适合：

- auth、payment、infra、migration
- 需要审批、回滚和审计的任务
- 不允许 agent 自主扩边界的场景

## 一个实用判断表

| 你的主约束 | 默认优先方式 |
| --- | --- |
| 高频交互、小步验证 | `IDE-first` |
| 仓库级控制、命令验证 | `terminal-first` |
| issue / PR / review 驱动 | `GitHub-first` |
| 长任务、并行、后台推进 | `async-agent-first` |
| 需求复杂、先计划后执行 | `spec-first` |
| 高风险目录必须人工把关 | `human-in-the-loop` |

## 当前官方信号

- GitHub 在 2026 年 3 月 5 日继续强化 `issue -> agent -> PR` 路线，并把 Copilot coding agent for Jira 推到 public preview。
- VS Code 官方 agents 文档把 agent 明确分为 local、background、cloud 和 third-party，说明“统一调度”已经是主问题。
- OpenAI 在 Codex app 官方介绍中持续强调 parallel agents、worktrees 和 background execution。
- Anthropic Claude Code 文档把 `terminal`、`CLAUDE.md` 和记忆机制放在核心工作方式里。
- Gemini CLI 官方仓库把 `terminal` 入口、`GEMINI.md` 和本地/CI 使用方式写成一等能力。

这些信号共同说明：开发方式已经比单一模型名更稳定。

## 来源

- GitHub Changelog, 2026-03-05: [GitHub Copilot coding agent for Jira is now in public preview](https://github.blog/changelog/2026-03-05-github-copilot-coding-agent-for-jira-is-now-in-public-preview/)
- VS Code Docs: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- OpenAI: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- Anthropic Docs: [Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- Google GitHub: [gemini-cli](https://github.com/google-gemini/gemini-cli)
