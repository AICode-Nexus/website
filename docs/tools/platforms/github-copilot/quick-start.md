---
title: "GitHub Copilot 快速开始"
description: "用 GitHub Copilot 从一个清晰 issue 起步，完成第一次 issue 到 draft PR 的平台内闭环。"
slug: "/tools/platforms/github-copilot/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "github-copilot", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: true
domain: "tools"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "github-copilot"]
estimated_time: 20
prerequisites: ["已有 GitHub 仓库和 issue", "已有基础 PR 流", "知道本次任务的范围和验收"]
deliverable: "一个可 review 的最小 draft PR"
---

# GitHub Copilot 快速开始

## 前置条件

- 你已经有一个结构清晰的 issue，而不是一句模糊想法。
- 团队默认在 GitHub 上 review 和交付。
- 你已经看过 [GitHub Copilot 概览](/docs/tools/platforms/github-copilot)，知道它更像平台入口。

## 步骤

### 第 1 步：先把 issue 写清楚

至少写清这四项：

- 目标是什么
- 范围到哪里为止
- 不能动什么
- 用什么验收

### 第 2 步：让 GitHub Copilot 按 issue 推进

第一次不要追求大任务。优先让它：

1. 复述 issue 和边界。
2. 给出计划。
3. 完成最小改动。
4. 生成带验证说明的 draft PR。

### 第 3 步：只保留可 review 的结果

Draft PR 至少要有：

- 改动摘要
- 验证方式
- 已知风险

如果你想把这一套固定成团队交接线，直接搭配 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。

## 验证

第一次上手的成功信号：

- issue、代码改动和 draft PR 对得上。
- PR 不是只有 diff，没有说明。
- 评审人能直接判断该不该继续。

## 下一步

- 回到 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)。
- 如果平台流里经常卡住，去 [GitHub Copilot 排错](/docs/tools/platforms/github-copilot/troubleshooting)。
- 如果你要推进更长链路执行，再看 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)

