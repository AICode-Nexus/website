---
slug: daily-brief-2026-03-28
title: "AI Coding Daily Brief | 2026-03-28 | Agent、工作流与Copilot的最新工程信号"
description: "2026-03-28 AI coding 日报：GitHub Changelog 的 Gemini 3 Pro deprecated；GitHub Changelog 的 Agent activity in GitHub Issues and Projects；GitHub Changelog 的 GitHub Copilot for Jira — Public preview enhancements。"
tags: [ai-coding, daily-brief, agent, copilot, workflow]
draft: false
---

这篇 Daily Brief 覆盖 2026-03-26 到 2026-03-28 的官方观察窗口，只保留会改变工程实践的 AI coding 信号。

<!-- truncate -->

## TL;DR

- 2026-03-27，GitHub Changelog 发布《Gemini 3 Pro deprecated》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
- 2026-03-27，GitHub Changelog 发布《Agent activity in GitHub Issues and Projects》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
- 2026-03-26，GitHub Changelog 发布《GitHub Copilot for Jira — Public preview enhancements》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
- 2026-03-27，GitHub Changelog 发布《Ask @copilot to resolve merge conflicts on pull requests》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
- 2026-03-26，Google AI Blog 发布《Build with Lyria 3, our newest music generation model》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
- 2026-03-27，GitHub Changelog 发布《View Agentic Workflow configs in the Actions run summary》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。

## What changed today

### 1. 2026-03-27，GitHub Changelog：Gemini 3 Pro deprecated

- 事实：GitHub Changelog 在 2026-03-27 发布了这条更新。
- 官方摘要：We have deprecated Gemini 3 Pro across all GitHub Copilot experiences (including Copilot Chat, inline edits, ask and agent modes, and code completions) today, March 26, 2026. Model Deprecation date… The post Gemini 3 Pro deprecated appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
### 2. 2026-03-27，GitHub Changelog：Agent activity in GitHub Issues and Projects

- 事实：GitHub Changelog 在 2026-03-27 发布了这条更新。
- 官方摘要：Today, we’re shipping two new features that bring agent activity directly into your planning workflows. Agent sessions under assignees in GitHub Issues When a coding agent (e.g., Copilot, Claude, or… The post Agent activity in GitHub Issues and Projects appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
### 3. 2026-03-26，GitHub Changelog：GitHub Copilot for Jira — Public preview enhancements

- 事实：GitHub Changelog 在 2026-03-26 发布了这条更新。
- 官方摘要：Since launching the public preview of GitHub Copilot coding agent for Jira, we’ve been listening closely to customer feedback. Thank you to everyone who has taken the time to try… The post GitHub Copilot for Jira — Public preview enhancements appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
### 4. 2026-03-27，GitHub Changelog：Ask @copilot to resolve merge conflicts on pull requests

- 事实：GitHub Changelog 在 2026-03-27 发布了这条更新。
- 官方摘要：Copilot coding agent can now resolve merge conflicts on pull requests. To ask Copilot to resolve merge conflicts, mention @copilot in a comment and tell it what to do: @copilot… The post Ask @copilot to resolve merge conflicts on pull requests appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
### 5. 2026-03-26，Google AI Blog：Build with Lyria 3, our newest music generation model

- 事实：Google AI Blog 在 2026-03-26 发布了这条更新。
- 官方摘要：Lyria 3 is now available in paid preview through the Gemini API and for testing in Google AI Studio. 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
### 6. 2026-03-27，GitHub Changelog：View Agentic Workflow configs in the Actions run summary

- 事实：GitHub Changelog 在 2026-03-27 发布了这条更新。
- 官方摘要：You can now view your Agentic Workflow markdown configs directly in the GitHub Actions run summary for any agentic workflow. This update makes it easier to review runs by: Reducing… The post View Agentic Workflow configs in the Actions run summary appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。

## Why it matters

- 主流产品仍在持续抬高编码模型上限，模型切换已经直接影响日常交付质量。
- Agent 正在继续从聊天入口走向可持续执行、可连接流程系统的工程组件。
- 工具接入、hooks、browser、MCP 与工作流控制面正在变成 AI coding 落地的关键差异点。
- 对工程团队来说，更有价值的动作是把这些变化放进固定验证清单，而不是只看发布标题。

## What to test

1. 挑一个边界清晰的任务，实际跑一次 Agent 执行链路，记录交接成本、失败模式和人工收口时间。
2. 拿现有仓库里的重构、多文件修改或审查任务，与当前默认模型做并排测试，记录返工率与稳定性。

## Watchlist

- 更强编码模型进入主流入口后，速度、配额和稳定性是否足以支撑高频使用。
- Agent 新能力是否真的降低了 issue 到 PR 的人工交接成本，而不是把压力后移到 review。
- 如果接下来两三天同一主题持续重复出现，就值得回流到长期 docs，而不只停留在日报层。
- 自动化注意：本次有官方源抓取失败（Anthropic News: 404 Not Found），明天需要确认这些源是否恢复。

## Sources

- [GitHub Changelog, 2026-03-27: Gemini 3 Pro deprecated](https://github.blog/changelog/2026-03-26-gemini-3-pro-deprecated)
- [GitHub Changelog, 2026-03-27: Agent activity in GitHub Issues and Projects](https://github.blog/changelog/2026-03-26-agent-activity-in-github-issues-and-projects)
- [GitHub Changelog, 2026-03-26: GitHub Copilot for Jira — Public preview enhancements](https://github.blog/changelog/2026-03-25-github-copilot-for-jira-public-preview-enhancements)
- [GitHub Changelog, 2026-03-27: Ask @copilot to resolve merge conflicts on pull requests](https://github.blog/changelog/2026-03-26-ask-copilot-to-resolve-merge-conflicts-on-pull-requests)
- [Google AI Blog, 2026-03-26: Build with Lyria 3, our newest music generation model](https://blog.google/innovation-and-ai/technology/developers-tools/lyria-3-developers/)
- [GitHub Changelog, 2026-03-27: View Agentic Workflow configs in the Actions run summary](https://github.blog/changelog/2026-03-26-view-agentic-workflow-configs-in-the-actions-run-summary)

## Related docs

- [AI 工作流](/docs/workflows)
- [AI 规范](/docs/standards)

