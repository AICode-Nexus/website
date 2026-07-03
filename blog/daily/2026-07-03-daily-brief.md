---
slug: daily-brief-2026-07-03
title: "AI Coding Daily Brief | 2026-07-03 | Copilot、Agent与模型的最新工程信号"
description: "2026-07-03 AI coding 日报：GitHub Changelog 的 Copilot agent session streaming is now in public preview；GitHub Changelog 的 Upcoming deprecation of Gemini 2.5 Pro and Gemini 3 Flash；GitHub Changelog 的 Improved accuracy and coverage in Copilot usage metrics reports。"
tags: [ai-coding, daily-brief, agent, copilot, workflow]
draft: false
---

这篇 Daily Brief 覆盖 2026-07-01 到 2026-07-03 的官方观察窗口，只保留会改变工程实践的 AI coding 信号。

<!-- truncate -->

## TL;DR

- 2026-07-03，GitHub Changelog 发布《Copilot agent session streaming is now in public preview》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
- 2026-07-03，GitHub Changelog 发布《Upcoming deprecation of Gemini 2.5 Pro and Gemini 3 Flash》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
- 2026-07-03，GitHub Changelog 发布《Improved accuracy and coverage in Copilot usage metrics reports》，这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
- 2026-07-03，GitHub Changelog 发布《Copilot CLI no longer needs a personal access token in GitHub Actions》，这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
- 2026-07-03，GitHub Changelog 发布《Cost centers now support AI credit pools》，这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
- 2026-07-02，GitHub Changelog 发布《Enterprises can default to auto model selection》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。

## What changed today

### 1. 2026-07-03，GitHub Changelog：Copilot agent session streaming is now in public preview

- 事实：GitHub Changelog 在 2026-07-03 发布了这条更新。
- 官方摘要：GitHub Enterprise Cloud customers with enterprise managed users can now access GitHub Copilot agent session data across all Copilot clients, including: Cloud agents operating on github.com and data resident deployments… The post Copilot agent session streaming is now in public preview appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
### 2. 2026-07-03，GitHub Changelog：Upcoming deprecation of Gemini 2.5 Pro and Gemini 3 Flash

- 事实：GitHub Changelog 在 2026-07-03 发布了这条更新。
- 官方摘要：We will deprecate Gemini 2.5 Pro and Gemini 3 Flash across all GitHub Copilot experiences (including Copilot Chat, inline edits, ask and agent modes, and code completions) on July 31st,… The post Upcoming deprecation of Gemini 2.5 Pro and Gemini 3 Flash appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
### 3. 2026-07-03，GitHub Changelog：Improved accuracy and coverage in Copilot usage metrics reports

- 事实：GitHub Changelog 在 2026-07-03 发布了这条更新。
- 官方摘要：We’ve made three improvements to the Copilot usage metrics API that make its reports more complete and accurate: GitHub Copilot CLI now reports suggested lines of code, users seen only… The post Improved accuracy and coverage in Copilot usage metrics reports appeared first on The GitHub Blog . 
- 工程影响：这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
### 4. 2026-07-03，GitHub Changelog：Copilot CLI no longer needs a personal access token in GitHub Actions

- 事实：GitHub Changelog 在 2026-07-03 发布了这条更新。
- 官方摘要：You can now run GitHub Copilot CLI in GitHub Actions using the built-in GITHUB_TOKEN. This means that you no longer need to create and store a personal access token (PAT),… The post Copilot CLI no longer needs a personal access token in GitHub Actions appeared first on The GitHub Blog . 
- 工程影响：这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
### 5. 2026-07-03，GitHub Changelog：Cost centers now support AI credit pools

- 事实：GitHub Changelog 在 2026-07-03 发布了这条更新。
- 官方摘要：You can now cap how much of your enterprise’s monthly included AI credits a cost center can use. This is available through the REST API today. Management in the cost… The post Cost centers now support AI credit pools appeared first on The GitHub Blog . 
- 工程影响：这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
### 6. 2026-07-02，GitHub Changelog：Enterprises can default to auto model selection

- 事实：GitHub Changelog 在 2026-07-02 发布了这条更新。
- 官方摘要：Enterprise administrators can now set model to auto in the enterprise managed-settings.json to make Copilot auto model selection the default for new conversations. Add auto to .github-private/.github/copilot/managed-settings.json in your source… The post Enterprises can default to auto model selection appeared first on The GitHub Blog . 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。

## Why it matters

- 主流产品仍在持续抬高编码模型上限，模型切换已经直接影响日常交付质量。
- Agent 正在继续从聊天入口走向可持续执行、可连接流程系统的工程组件。
- 工具接入、hooks、browser、MCP 与工作流控制面正在变成 AI coding 落地的关键差异点。
- 对工程团队来说，更有价值的动作是把这些变化放进固定验证清单，而不是只看发布标题。

## What to test

1. 挑一个边界清晰的任务，实际跑一次 Agent 执行链路，记录交接成本、失败模式和人工收口时间。
2. 把这条更新放进日常主工作台里试跑一次真实任务，而不是只看演示页面。
3. 拿现有仓库里的重构、多文件修改或审查任务，与当前默认模型做并排测试，记录返工率与稳定性。

## Watchlist

- 更强编码模型进入主流入口后，速度、配额和稳定性是否足以支撑高频使用。
- Agent 新能力是否真的降低了 issue 到 PR 的人工交接成本，而不是把压力后移到 review。
- 如果接下来两三天同一主题持续重复出现，就值得回流到长期 docs，而不只停留在日报层。
- 自动化注意：本次有官方源抓取失败（Anthropic News: 404 Not Found），明天需要确认这些源是否恢复。

## Sources

- [GitHub Changelog, 2026-07-03: Copilot agent session streaming is now in public preview](https://github.blog/changelog/2026-07-02-copilot-agent-session-streaming-is-now-in-public-preview)
- [GitHub Changelog, 2026-07-03: Upcoming deprecation of Gemini 2.5 Pro and Gemini 3 Flash](https://github.blog/changelog/2026-07-02-upcoming-deprecation-of-gemini-2-5-pro-and-gemini-3-flash)
- [GitHub Changelog, 2026-07-03: Improved accuracy and coverage in Copilot usage metrics reports](https://github.blog/changelog/2026-07-02-improved-accuracy-and-coverage-in-copilot-usage-metrics-reports)
- [GitHub Changelog, 2026-07-03: Copilot CLI no longer needs a personal access token in GitHub Actions](https://github.blog/changelog/2026-07-02-copilot-cli-no-longer-needs-a-personal-access-token-in-github-actions)
- [GitHub Changelog, 2026-07-03: Cost centers now support AI credit pools](https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps)
- [GitHub Changelog, 2026-07-02: Enterprises can default to auto model selection](https://github.blog/changelog/2026-07-01-enterprises-can-default-to-auto-model-selection)

## Related docs

- [AI 工作流](/docs/workflows)
- [AI 规范](/docs/standards)

