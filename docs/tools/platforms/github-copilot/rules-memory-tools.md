---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "implementation"
title: "GitHub Copilot：规则、记忆与工具边界"
description: "GitHub Copilot 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/platforms/github-copilot/rules-memory-tools"
sidebar_label: "补充：规则与边界"
sidebar_position: 7
tags: ["ai-coding", "tool", "github-copilot"]
---

# GitHub Copilot：规则、记忆与工具边界

## 现在先做什么

- 第一次厘清平台边界：去 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。
- 想把平台习惯稳定下来：去 [GitHub Copilot 最佳实践](/docs/tools/platforms/github-copilot/best-practices)。
- 想先把 repo 规则与 review 合同理清：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 什么时候读这页

- 你准备长期把 GitHub 当 AI 交付工作系统，而不是只偶尔让 agent 提交 PR。
- 你要决定 issue 模板、PR 模板、CODEOWNERS 和平台设置分别放在哪。
- 你已经开始担心“平台里很顺，但仓库事实和 review 边界没有同步”。

## 应该写进 repo 的东西

- issue 模板、PR 模板、目录边界、验证命令和 reviewer 责任。
- 允许 agent 改哪些目录、哪些检查必须通过、何时必须人工接管。
- 必须跟 PR 一起存在的验收标准、风险说明和交付证据。

## 只留在工具里的东西

- 平台层的个人通知习惯、短期队列整理和一次性任务偏好。
- 不值得版本化的临时提示语和单次交互上下文。
- 用来追踪执行状态的临时平台视图，但不能代替 repo 合同。

## 失控信号

- 平台里能看到任务状态，但仓库里找不到对应规则和验收依据。
- issue 和 PR 越来越多，真正可复用的模板和目录边界却越来越少。
- 一离开 GitHub UI，团队就说不清任务到底该怎么完成和怎么验收。

## 读完回哪里

- 想先把平台边界定住：回 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。
- 想看长期使用的稳定写法：去 [GitHub Copilot 最佳实践](/docs/tools/platforms/github-copilot/best-practices)。
- 想先把 repo 规则和 review 文件梳理清楚：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
