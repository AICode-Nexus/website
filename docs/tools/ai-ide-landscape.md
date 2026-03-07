---
title: AI IDE 全景
description: 从平台、控制台和执行栈三个角度理解 Copilot、Codex、Cursor、Windsurf 和开放式 Agent 入口。
slug: /tools/ai-ide-landscape
sidebar_label: AI IDE 全景
tags: [ai-coding, ide, comparison]
track: cross-track
kind: guide
audience: individual
stage: intermediate
featured: false
pillar: tools
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# AI IDE 全景

## 背景

AI IDE 市场很热，但不同产品解决的问题层次并不一样。如果不先分层，就很容易拿“编辑体验”去比较“交付系统”，最后得到错误结论。

## 结论先行

可以先把今天主流 AI coding 入口粗分成五类：

1. 平台型
2. 控制台型
3. 执行栈型
4. IDE-first 产品
5. 开放式 Agent 入口

这里的分层是工程判断，不是厂商官方命名。但它比“谁最好用”更接近真实选型逻辑。

## 适用场景

- 选主 IDE / 主入口
- 做工具调研
- 向团队解释不同产品定位
- 设计自己的主平台和备用入口组合

## 五类入口怎么理解

### 1. 平台型

代表：GitHub Copilot

特征：

- 价值不只在编辑器里
- 能连接 issue、PR、code review、Jira、CLI
- 强项是 system of work 集成

更适合：

- GitHub-first 的个人工程师
- 想把 AI 直接接进 PR / review 流程的人

### 2. 控制台型

代表：VS Code Agent

特征：

- 强项是统一调度不同 agent
- 同一个工作台里管理 local、background、cloud、third-party agents
- 更像一个“总控台”而不是单一 agent

更适合：

- 需要在本地、后台和云端之间切换的人
- 想把多个 provider 放进同一个编辑器体验的人

### 3. 执行栈型

代表：OpenAI Codex

特征：

- 强项是多 agent、并行任务、worktree、长任务
- 更适合 delegation than chat
- 更强调 isolated execution 和 background work

更适合：

- 经常要把任务挂后台的人
- 想并行跑多个实现方向的人

### 4. IDE-first 产品

代表：Cursor、Windsurf

特征：

- 以编辑器体验为主入口
- 同时开始强化 rules、memory、background agents
- 更强调“在 IDE 里完成大部分工作”

更适合：

- 把编辑器当主战场的人
- 重视交互顺滑、上下文连续性的人

### 5. 开放式 Agent 入口

代表：Continue、Cline

特征：

- 更强调开放集成、规则系统、MCP、模式切换和自主控制
- 更适合深度定制，而不是默认一体化体验

更适合：

- 想自己控制 provider、rules、工具接入的人
- 对工作流可塑性要求很高的人

## 当前官方事实

截至 2026 年 3 月 6 日，这些产品在官方资料里呈现出下面的能力边界：

- VS Code 官方 agents 文档把 agent 明确分成 local、background、cloud 和 third-party 四类，并提供统一的 session 管理。
- VS Code 的 third-party agents 文档已明确支持 Anthropic 和 OpenAI 等外部 provider；其中 OpenAI Codex 既可本地运行，也可作为 cloud session 在 VS Code 中使用。
- OpenAI 在 2026 年 2 月 2 日发布 Codex app，把它定位成管理多个 agents 的 command center，并强调 parallel work、worktrees 和 automations；2026 年 3 月 4 日更新为 Windows 可用。
- Cursor 官方文档说明 background agents 在隔离的 Ubuntu 远程机器中运行，具备 internet access，并可 clone GitHub repo 到独立分支完成 handoff。
- Windsurf 官方文档说明 Cascade 支持 workspace 级 memories 与 rules，并可在 `.windsurf/rules` 中定义规则。
- Continue 官方文档说明 `.continue/rules` 可以把项目规则版本化并与 Hub rules 组合使用。
- Cline 官方文档说明它采用 Plan / Act 双模式，并支持 browser automation、terminal integration 和按类别控制 auto-approve。

## 一个实用的选择框架

| 你最在意什么 | 更适合先看哪类 |
| --- | --- |
| issue / PR / review / Jira 闭环 | 平台型 |
| 在一个编辑器里统一调度多类 agent | 控制台型 |
| 多任务并行、长任务后台推进 | 执行栈型 |
| IDE 内高频交互和连续编辑体验 | IDE-first |
| 自定义 provider、rules、MCP 和自动化 | 开放式入口 |

## 推荐做法

1. 先判断自己的默认工作入口
2. 再判断是否需要独立的后台 / 云端执行能力
3. 最后决定是否需要开放式扩展和自定义

更具体地说：

- 如果你主要在 GitHub 工作，先看 [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex)
- 如果你主要在 IDE 里推进任务，再结合 Cursor、Windsurf、Cline / Continue 的规则与执行方式做补充
- 第一阶段永远先选一个主入口，不要长期并用三个主平台

## 常见错误

- 只看营销视频和首屏体验
- 同时长期主用多个平台
- 没有明确主工作流和备用工作流
- 把“集成能力”误当成“模型能力”

## 延伸阅读

<RelatedReadings
  title="继续阅读与落地路径"
  description="全景文负责先把入口分层。接下来应该进入具体工具簇或更聚焦的对比文，而不是停留在大图层。"
  items={[
    {
      title: 'GitHub Copilot',
      href: '/docs/tools/platforms/github-copilot',
      description: '继续看平台型入口如何接 issue、PR、review 与工作系统。',
    },
    {
      title: 'VS Code Agents',
      href: '/docs/tools/control-planes/vscode-agents',
      description: '继续看控制面如何承接 local / background / cloud 的协同。',
    },
    {
      title: 'OpenAI Codex',
      href: '/docs/tools/execution-stacks/openai-codex',
      description: '继续看执行栈如何处理审批、worktree、并行 lane 与长任务。',
    },
    {
      title: '终端 Agent 与 CLI',
      href: '/docs/tools/terminal-agents-and-cli',
      description: '如果你在考虑 terminal-first 路线，这篇会把 CLI 任务合同和验证边界写清。',
    },
    {
      title: 'GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选',
      href: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
      description: '如果你已经缩小到平台、控制面和执行栈三者之间，直接进入更具体的对比文。',
    },
  ]}
/>

## 来源

- VS Code Docs: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- VS Code Docs: [Third-party agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
- OpenAI, 2026-02-02, updated 2026-03-04: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- Cursor Docs: [Background Agents](https://docs.cursor.com/en/background-agents)
- Windsurf Docs: [Cascade Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- Continue Docs: [Rules](https://docs.continue.dev/customize/rules)
- Cline Docs: [Plan & Act Mode](https://docs.cline.bot/core-workflows/plan-and-act)
