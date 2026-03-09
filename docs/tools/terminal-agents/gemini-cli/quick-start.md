---
title: "Gemini CLI 快速开始"
description: "用 Gemini CLI 在一个真实仓库里完成第一次 context file 驱动的终端闭环。"
slug: "/tools/terminal-agents/gemini-cli/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "gemini-cli", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "gemini-cli"]
estimated_time: 20
prerequisites: ["Gemini CLI 已可使用", "本地仓库有至少一个验证命令", "你愿意把最小规则写入 context file"]
deliverable: "一次依赖 context file、命令执行和验证结果的最小仓库改动"
---

# Gemini CLI 快速开始

## 前置条件

- 你已经看过 [Gemini CLI 概览](/docs/tools/terminal-agents/gemini-cli)，知道它更适合轻量 terminal-first 入口。
- 当前仓库至少有一个稳定验证命令。
- 这次任务最好是 bugfix、补测试或脚本调整，而不是长链路 feature。

## 步骤

### 第 1 步：先写最小 context file

第一次不要写大而全的规则，只保留：

- 哪些目录允许改
- 哪些目录不要碰
- 默认验证命令是什么
- 输出里必须回报什么证据

如果仓库里已经有统一规则，也可以先参考 [仓库规则文件体系](/docs/repo-instruction-files)。

### 第 2 步：只交一个小任务

优先选这些任务：

- 修一个已知 bug
- 补一条缺失测试
- 跑脚本并解释结果

如果你今天主要就是终端内维护任务，直接搭配 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

### 第 3 步：强制它回报真实命令结果

第一次成功的关键不是“它会聊很多”，而是：

1. 真正读了仓库
2. 真正执行了命令
3. 真正回报了结果

### 第 4 步：把交付收成简短说明

至少留下三样东西：

- 改了什么
- 跑了什么命令
- 还剩什么风险

如果后续要进入 PR 流，再接 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。

## 验证

- context file 真的被用来约束范围，而不是摆设。
- 命令结果是真实执行结果，不是口头复述。
- 最终说明足够让下一位读者知道做了什么和没做什么。

## 下一步

- 去 [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks) 固定高频 SOP。
- 如果 CLI 经常只剩聊天，不再回传证据，去 [Gemini CLI 排错](/docs/tools/terminal-agents/gemini-cli/troubleshooting)。
- 如果你想把它变成长期稳定入口，去 [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices)。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
