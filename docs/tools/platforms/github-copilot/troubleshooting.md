---
title: "GitHub Copilot 排错"
description: "当 GitHub Copilot 生成的任务流和 PR 流不稳定时，优先排查任务清晰度、PR 说明和平台分工。"
slug: "/tools/platforms/github-copilot/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "github-copilot", "troubleshooting"]
track: "cross-track"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# GitHub Copilot 排错

## 常见卡点

- issue 过于模糊，导致 Copilot 输出无法 review。
- draft PR 没有验证说明，平台流只剩代码 diff。
- 团队实际上不在 GitHub 里完成交付，却还强行用平台流。

## 诊断顺序

1. 先看 issue 是否写清楚。
2. 再看 PR 模板是否要求验证和风险说明。
3. 最后看平台是不是当前团队真正的主工作系统。

## 回退策略

- 先回到更小的 issue，只交付一个明确结果。
- 给 PR 补完整说明后再进入 review。
- 如果主要工作发生在本地仓库，切到 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start) 或 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 继续阅读

- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
- [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)
- [GitHub Copilot 最佳实践](/docs/tools/platforms/github-copilot/best-practices)

## 来源

- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)

