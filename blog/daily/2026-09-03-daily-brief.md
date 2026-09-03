---
slug: daily-brief-2026-09-03
title: "AI Coding Daily Brief | 2026-09-03 | Copilot、模型与Agent的最新工程信号"
description: "2026-09-03 AI coding 日报：GitHub Changelog 的 Enterprise-managed settings support any default model；VS Code 的 Visual Studio Code 1.136；GitHub Changelog 的 Content exclusions generally available in Copilot app and CLI。"
tags: [ai-coding, daily-brief, copilot, workflow, vscode, agent]
draft: false
---

这篇 Daily Brief 覆盖 2026-09-01 到 2026-09-03 的官方观察窗口，只保留会改变工程实践的 AI coding 信号。

<!-- truncate -->

## TL;DR

- 2026-09-03，GitHub Changelog 发布《Enterprise-managed settings support any default model》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
- 2026-09-03，VS Code 发布《Visual Studio Code 1.136》，这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
- 2026-09-03，GitHub Changelog 发布《Content exclusions generally available in Copilot app and CLI》，这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
- 2026-09-01，GitHub Changelog 发布《Selected GitHub Copilot models deprecated》，这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
- 2026-09-01，GitHub Changelog 发布《Claude Fable 5.1 is generally available in GitHub Copilot》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
- 2026-09-01，GitHub Changelog 发布《Copilot model access update for GitHub Team plans》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。

## What changed today

### 1. 2026-09-03，GitHub Changelog：Enterprise-managed settings support any default model

- 事实：GitHub Changelog 在 2026-09-03 发布了这条更新。
- 官方摘要：You can now set your preferred GitHub Copilot model as the default for new conversations through enterprise-managed settings. This lets you choose the default model that best fits your workflows.… The post Enterprise-managed settings support any default model appeared first on The GitHub Blog . 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
### 2. 2026-09-03，VS Code：Visual Studio Code 1.136

- 事实：VS Code 在 2026-09-03 发布了这条更新。
- 官方摘要：Learn what is new in Visual Studio Code 1.136 
- 工程影响：这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
### 3. 2026-09-03，GitHub Changelog：Content exclusions generally available in Copilot app and CLI

- 事实：GitHub Changelog 在 2026-09-03 发布了这条更新。
- 官方摘要：The GitHub Copilot app and Copilot CLI now respect content exclusion policies configured by enterprise, organization, and repository administrators. Copilot won’t use excluded files as context, helping you protect sensitive… The post Content exclusions generally available in Copilot app and CLI appeared first on The GitHub Blog . 
- 工程影响：这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
### 4. 2026-09-01，GitHub Changelog：Selected GitHub Copilot models deprecated

- 事实：GitHub Changelog 在 2026-09-01 发布了这条更新。
- 官方摘要：As of today, September 1, 2026, we have deprecated the following models across most GitHub Copilot experiences (including Copilot Chat, inline edits, ask and agent modes, and code completions). Note… The post Selected GitHub Copilot models deprecated appeared first on The GitHub Blog . 
- 工程影响：这说明 Agent 能力继续从单轮对话转向可委派、可持续执行的工作流组件。
### 5. 2026-09-01，GitHub Changelog：Claude Fable 5.1 is generally available in GitHub Copilot

- 事实：GitHub Changelog 在 2026-09-01 发布了这条更新。
- 官方摘要：Claude Fable 5.1 from Anthropic is now available in GitHub Copilot. The latest model in Anthropic’s Mythos class, Claude Fable 5.1 is designed for long-horizon, autonomous coding and knowledge-work tasks.… The post Claude Fable 5.1 is generally available in GitHub Copilot appeared first on The GitHub Blog . 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
### 6. 2026-09-01，GitHub Changelog：Copilot model access update for GitHub Team plans

- 事实：GitHub Changelog 在 2026-09-01 发布了这条更新。
- 官方摘要：We have updated how model access is determined for Copilot users who hold seats in more than one organization. To keep billing and governance in sync, your model access is… The post Copilot model access update for GitHub Team plans appeared first on The GitHub Blog . 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。

## Why it matters

- 主流产品仍在持续抬高编码模型上限，模型切换已经直接影响日常交付质量。
- Agent 正在继续从聊天入口走向可持续执行、可连接流程系统的工程组件。
- 工具接入、hooks、browser、MCP 与工作流控制面正在变成 AI coding 落地的关键差异点。
- 对工程团队来说，更有价值的动作是把这些变化放进固定验证清单，而不是只看发布标题。

## What to test

1. 拿现有仓库里的重构、多文件修改或审查任务，与当前默认模型做并排测试，记录返工率与稳定性。
2. 把这条更新放进日常主工作台里试跑一次真实任务，而不是只看演示页面。
3. 挑一个边界清晰的任务，实际跑一次 Agent 执行链路，记录交接成本、失败模式和人工收口时间。

## Watchlist

- 更强编码模型进入主流入口后，速度、配额和稳定性是否足以支撑高频使用。
- Agent 新能力是否真的降低了 issue 到 PR 的人工交接成本，而不是把压力后移到 review。
- 如果接下来两三天同一主题持续重复出现，就值得回流到长期 docs，而不只停留在日报层。
- 自动化注意：本次有官方源抓取失败（Anthropic News: 404 Not Found），明天需要确认这些源是否恢复。

## Sources

- [GitHub Changelog, 2026-09-03: Enterprise-managed settings support any default model](https://github.blog/changelog/2026-09-02-enterprise-managed-settings-support-any-default-model)
- [VS Code, 2026-09-03: Visual Studio Code 1.136](https://code.visualstudio.com/updates/v1_136)
- [GitHub Changelog, 2026-09-03: Content exclusions generally available in Copilot app and CLI](https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli)
- [GitHub Changelog, 2026-09-01: Selected GitHub Copilot models deprecated](https://github.blog/changelog/2026-08-31-selected-github-copilot-models-deprecated)
- [GitHub Changelog, 2026-09-01: Claude Fable 5.1 is generally available in GitHub Copilot](https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot)
- [GitHub Changelog, 2026-09-01: Copilot model access update for GitHub Team plans](https://github.blog/changelog/2026-08-31-copilot-model-access-update-for-github-team-plans)

## Related docs

- [AI 工作流](/docs/workflows)
- [AI 规范](/docs/standards)

