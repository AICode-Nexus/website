---
title: IDE 与工具链
description: 聚焦 AI IDE、CLI Agent、Review 工具和实际开发环境中的工具链组合方式。
slug: /ides-tooling
sidebar_label: IDE 与工具链
tags: [ai-coding, ide, tooling]
track: ides-tooling
kind: hub
audience: individual
stage: starter
featured: true
---

# IDE 与工具链

## 这一类内容解决什么问题

- 我应该把 AI coding 主入口放在 IDE、CLI 还是 GitHub 平台里
- 哪些工具适合日常编码，哪些适合异步任务
- Review、PR、代码搜索应该如何接入 AI
- 怎么搭出一套不会因为工具太多而失控的个人工程师栈

## 谁应该先读

- 已经开始用 AI IDE 的工程师
- 想把本地编码、CLI 和 PR review 串起来的人
- 想做工具链选型的人
- 想减少在多个工具之间重复解释上下文的人

## 先理解工具链的三层

### 第一层：交互层

你每天最常打开的入口是什么。

- IDE
- CLI
- GitHub / PR

### 第二层：执行层

真正改代码和跑任务的是谁。

- 本地 agent
- 后台 agent
- 云端 agent

### 第三层：治理层

改完之后怎么验证和合并。

- lint / test / build
- review
- PR / issue / Jira

## 子主题地图

### AI IDE 全景

看 GitHub Copilot、VS Code Agent、Cursor、Windsurf 等产品各自定位。

先读：

- [AI IDE 全景](/docs/ides-tooling/ai-ide-landscape)

### 终端 Agent 与 CLI

看终端环境里什么任务最适合 Agent，什么任务仍应由人主导。

先读：

- [终端 Agent 与 CLI](/docs/ides-tooling/terminal-agents-and-cli)

### Review 与 PR 工具链

看代码审查、Issue、PR、CI 和 AI 之间的连接方式。

先读：

- [Review 与 PR 工具链](/docs/ides-tooling/review-and-pr-tooling)

## 推荐阅读顺序

1. 先读 [AI IDE 全景](/docs/ides-tooling/ai-ide-landscape)，确认你的主入口类型
2. 再读 [终端 Agent 与 CLI](/docs/ides-tooling/terminal-agents-and-cli)，理解哪些任务适合交给后台或批处理
3. 最后读 [Review 与 PR 工具链](/docs/ides-tooling/review-and-pr-tooling)，把产出接回交付链路

## 一套最小可用工具链应该长什么样

- 一个主入口：IDE 或 GitHub
- 一个备用入口：CLI 或异步 agent
- 一组 rules：限制可改范围和执行权限
- 一条验证回路：lint、test、build
- 一条 review 回路：PR、comment、人工确认

## 常见错误

- 把所有入口都接起来，但没有默认入口
- 用 IDE 做所有任务，包括更适合后台跑的长任务
- 不把 AI 接进 review，导致“能改不能交付”
- 只看编辑体验，不看总切换成本

## 精选文档入口

- [工具选择地图](/docs/tool-selection)
- [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex)
- [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)
