---
title: Gemini CLI 入门与 GitHub 工作流
description: 从官方仓库与官方文档信号理解 Gemini CLI 的终端定位、GEMINI.md 语义，以及它与 GitHub 工作流的结合方式。
slug: /gemini-cli-github-workflow
sidebar_label: Gemini CLI 工作流
tags: [ai-coding, gemini-cli, terminal-agent]
track: cross-track
kind: guide
audience: mixed
stage: intermediate
featured: false
pillar: tools
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# Gemini CLI 入门与 GitHub 工作流

## 先给结论

Gemini CLI 的价值不只在“Google 出了一个 CLI”，而在于它把以下三件事放到了同一层：

- 终端入口
- 仓库上下文文件
- 本地与 CI / automation 的接入可能性

## 更适合谁

- 已有 GitHub 工作流，但希望增加 terminal-first 入口的团队
- 希望把规则和上下文文件直接版本化到仓库的人
- 想把本地和自动化脚本放在同一条链路里的人

## 核心判断

### 1. `GEMINI.md` 代表规则文件正在标准化

Gemini CLI 官方文档把 `GEMINI.md` 放进 context files 机制，说明“仓库里放一份工具可读规则文件”已经不是边缘做法，而是主流入口的共同方向。

### 2. 更适合和 GitHub 流程并用

Gemini CLI 可以承担：

- 本地规划
- 小步执行
- 命令验证

而 GitHub 继续承担：

- issue
- review
- PR
- branch protections

这是一种很稳的“终端 + GitHub”双入口组合。

### 3. 不要把它当成孤立工具

真正要比较的不是“Gemini CLI 强不强”，而是：

- 它能否承担你的默认终端入口
- `GEMINI.md` 能否与其他规则文件共存
- 它和 GitHub review / PR 的切换成本是否可接受

## 推荐接入方式

1. 先为一个低风险仓库写最小 `GEMINI.md`
2. 用同一组 bugfix / refactor / test 任务跑 1 周
3. 记录验证命令、返工量和 PR 修补量

## 来源

- Google GitHub: [gemini-cli](https://github.com/google-gemini/gemini-cli)
- Gemini CLI Docs: [Context files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)

## 延伸阅读

- [Gemini CLI Handbook](/docs/tools/terminal-agents/gemini-cli)
- [终端 Agent 全景](/docs/terminal-agent-landscape)
- [仓库规则文件体系](/docs/repo-instruction-files)
- [工具选择地图](/docs/tool-selection)
