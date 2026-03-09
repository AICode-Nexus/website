---
title: "GitHub Copilot 常见任务"
description: "把 GitHub Copilot 在 issue、review 和 draft PR 场景里的高频任务固定成 SOP。"
slug: "/tools/platforms/github-copilot/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
tags: ["ai-coding", "tool", "github-copilot", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-common-tasks", "github-copilot"]
estimated_time: 25
prerequisites: ["已跑通 GitHub Copilot 快速开始", "仓库已有 issue 或 PR 模板", "团队主要在 GitHub 协作"]
deliverable: "三个平台内可复用的 GitHub Copilot 任务模板"
---

# GitHub Copilot 常见任务

## 前置条件

- 先完成 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。
- 任务已经能从 issue 描述直接看出范围。
- PR review 是主要交付方式。

## 步骤

### 任务 1：Issue -> Draft PR

适合最清晰、最可标准化的任务。默认模板就是：

- 按 issue 范围生成计划
- 先做最小改动
- 附验证摘要和风险

### 任务 2：根据 review comment 回改

适合已有 PR 的小步迭代。要求：

- 先总结评审意见
- 只改当前 comment 影响的范围
- 回报命令或行为验证

### 任务 3：把 Jira / issue 任务拉回 PR 流

适合平台型协作。前提是任务系统已经写清，不能把平台当成替代需求澄清的地方。

## 验证

每次任务完成后都检查：

- issue 和 PR 是否仍然一一对应
- PR 是否包含验证和风险说明
- 是否有人类 reviewer 能快速判断下一步

## 下一步

- 去 [GitHub Copilot 排错](/docs/tools/platforms/github-copilot/troubleshooting)。
- 去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 如果你需要仓库内更强控制，再去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)

