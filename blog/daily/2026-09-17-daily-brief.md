---
slug: daily-brief-2026-09-17
title: "AI Coding Daily Brief | 2026-09-17 | 模型、Copilot与工作流的最新工程信号"
description: "2026-09-17 AI coding 日报：VS Code 的 Visual Studio Code 1.138；GitHub Changelog 的 Copilot budget increase requests are generally available；OpenAI News 的 Our framework for reporting model misalignment。"
tags: [ai-coding, daily-brief, vscode, copilot, security, workflow]
draft: false
---

这篇 Daily Brief 覆盖 2026-09-15 到 2026-09-17 的官方观察窗口，只保留会改变工程实践的 AI coding 信号。

<!-- truncate -->

## TL;DR

- 2026-09-17，VS Code 发布《Visual Studio Code 1.138》，这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
- 2026-09-17，GitHub Changelog 发布《Copilot budget increase requests are generally available》，这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
- 2026-09-17，OpenAI News 发布《Our framework for reporting model misalignment》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
- 2026-09-15，GitHub Changelog 发布《Configure cost and quality in Copilot auto model selection》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
- 2026-09-16，VS Code 发布《Building the new GitHub Copilot Inline Suggestions Model: Part One》，这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
- 2026-09-16，GitHub Changelog 发布《Code scanning AI Scan no longer requires CodeQL default setup》，这类更新值得放进安全验证清单，重点看误报率、补丁质量和是否能进入现有评审流程。

## What changed today

### 1. 2026-09-17，VS Code：Visual Studio Code 1.138

- 事实：VS Code 在 2026-09-17 发布了这条更新。
- 官方摘要：Learn what is new in Visual Studio Code 1.138 
- 工程影响：这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
### 2. 2026-09-17，GitHub Changelog：Copilot budget increase requests are generally available

- 事实：GitHub Changelog 在 2026-09-17 发布了这条更新。
- 官方摘要：Previously, when a member used all the Copilot AI credits available to them, they were blocked from Copilot features that consume credits. This release adds a flow for them to… The post Copilot budget increase requests are generally available appeared first on The GitHub Blog . 
- 工程影响：这类入口层变化值得用真实仓库任务验证，而不是只看发布标题。
### 3. 2026-09-17，OpenAI News：Our framework for reporting model misalignment

- 事实：OpenAI News 在 2026-09-17 发布了这条更新。
- 官方摘要：OpenAI shares a framework for tracking, investigating, and disclosing model misalignment, alongside six reports of unexpected or concerning model behavior. 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
### 4. 2026-09-15，GitHub Changelog：Configure cost and quality in Copilot auto model selection

- 事实：GitHub Changelog 在 2026-09-15 发布了这条更新。
- 官方摘要：GitHub Copilot auto model selection now offers three tiers: efficiency, balance, and intelligence. Choose the tier that reflects how you want auto to weigh cost, quality, and response time for… The post Configure cost and quality in Copilot auto model selection appeared first on The GitHub Blog . 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
### 5. 2026-09-16，VS Code：Building the new GitHub Copilot Inline Suggestions Model: Part One

- 事实：VS Code 在 2026-09-16 发布了这条更新。
- 官方摘要：Explore how GitHub Copilot unified completion, next edit, and long-distance suggestions into one model for a faster, more cohesive coding experience. 
- 工程影响：这会直接影响默认编码模型上限，值得拿现有高价值任务做并排测试。
### 6. 2026-09-16，GitHub Changelog：Code scanning AI Scan no longer requires CodeQL default setup

- 事实：GitHub Changelog 在 2026-09-16 发布了这条更新。
- 官方摘要：You can now use AI Scan for pull requests to find security vulnerabilities, even when CodeQL default setup isn’t enabled on a repository. Previously, AI Scan for pull requests only… The post Code scanning AI Scan no longer requires CodeQL default setup appeared first on The GitHub Blog . 
- 工程影响：这类更新值得放进安全验证清单，重点看误报率、补丁质量和是否能进入现有评审流程。

## Why it matters

- 主流产品仍在持续抬高编码模型上限，模型切换已经直接影响日常交付质量。
- 工具接入、hooks、browser、MCP 与工作流控制面正在变成 AI coding 落地的关键差异点。
- 对工程团队来说，更有价值的动作是把这些变化放进固定验证清单，而不是只看发布标题。

## What to test

1. 把这条更新放进日常主工作台里试跑一次真实任务，而不是只看演示页面。
2. 拿现有仓库里的重构、多文件修改或审查任务，与当前默认模型做并排测试，记录返工率与稳定性。
3. 用一组已知漏洞或安全回归样本验证这类安全 Agent 的误报率、补丁质量和 review 成本。

## Watchlist

- 更强编码模型进入主流入口后，速度、配额和稳定性是否足以支撑高频使用。
- AI 安全修复能力是否能在真实项目里保持低误报和高可验证性。
- 如果接下来两三天同一主题持续重复出现，就值得回流到长期 docs，而不只停留在日报层。
- 自动化注意：本次有官方源抓取失败（Anthropic News: 404 Not Found），明天需要确认这些源是否恢复。

## Sources

- [VS Code, 2026-09-17: Visual Studio Code 1.138](https://code.visualstudio.com/updates/v1_138)
- [GitHub Changelog, 2026-09-17: Copilot budget increase requests are generally available](https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available)
- [OpenAI News, 2026-09-17: Our framework for reporting model misalignment](https://openai.com/index/model-misalignment-reporting-framework)
- [GitHub Changelog, 2026-09-15: Configure cost and quality in Copilot auto model selection](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection)
- [VS Code, 2026-09-16: Building the new GitHub Copilot Inline Suggestions Model: Part One](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one)
- [GitHub Changelog, 2026-09-16: Code scanning AI Scan no longer requires CodeQL default setup](https://github.blog/changelog/2026-09-16-code-scanning-ai-scan-no-longer-requires-codeql-default-setup)

## Related docs

- [AI 工作流](/docs/workflows)
- [AI 规范](/docs/standards)

