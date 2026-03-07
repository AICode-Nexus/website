---
title: AI Coding 学习路径
description: 从个人试用升级到团队与平台治理的 3 段路线图，帮助你按阶段建立 AI 开发方式、流程、规范和架构。
slug: /learning-paths
sidebar_label: 学习路径
tags: [ai-coding, learning-path, workflow]
track: cross-track
kind: guide
audience: mixed
stage: starter
featured: true
pillar: development-modes
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# AI Coding 学习路径

这条学习路径不试图把所有内容压成一张“万能路线图”。它的目标是把个人试用、团队工作流和规范/架构收口拆成三个阶段，让你知道自己当前该补的是入口、交付链，还是治理基础设施。

## 第一段：个人入口期

目标：不要一开始就比较所有产品，而是先固定默认开发方式和默认入口。

这一段真正要解决的不是“装哪个工具”，而是先让你形成一个稳定的默认主入口和一个明确的备用入口。没有这个基础，后面所有关于 workflow、规范和架构的阅读都会变成漂浮在空中的建议。

建议顺序：

1. [AI 开发方式总览](/docs/development-modes-landscape)
2. [工具选择地图](/docs/tool-selection)
3. [Claude Code Handbook](/docs/tools/terminal-agents/claude-code)
4. [Gemini CLI Handbook](/docs/tools/terminal-agents/gemini-cli)
5. [OpenAI Codex Handbook](/docs/tools/execution-stacks/openai-codex)

## 第二段：团队工作流期

目标：把 prompt、计划、验证和 review 变成团队可复用模板。

如果第一段解决的是“我自己今天怎么做”，第二段解决的就是“团队下周怎么不再重复解释同一件事”。这时重点应该从产品名转到任务合同、handoff、产物和验收证据。

建议顺序：

1. [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
2. [Spec-First](/docs/workflows/patterns/spec-first)
3. [Spec Kit](/docs/workflows/frameworks/spec-kit)
4. [Superpowers](/docs/workflows/community-frameworks/superpowers)
5. [AI 工作流实操手册](/docs/playbooks/workflow-playbook)
6. [多 Agent 协作](/docs/workflows/multi-agent-collaboration)

## 第三段：规范与架构期

目标：把规则文件、权限、门禁、评估和拓扑一起收口。

只有在前两段已经基本稳定之后，规范与架构层才会真正发挥作用。否则你只是在给一套还没跑顺的协作方式再加更多术语和制度壳。

建议顺序：

1. [仓库规则文件体系](/docs/repo-instruction-files)
2. [AI 开发规范](/docs/ai-development-standards)
3. [AI 原生工程架构](/docs/ai-native-engineering-architecture)
4. [MCP 与工具拓扑](/docs/mcp-tool-topology)

## 一条简单原则

如果你还没固定默认开发方式，就不要急着升级规范。

如果你还没固定规范和门禁，就不要急着扩展架构和 MCP。

## 每一段结束后的完成信号

- 个人入口期完成：你能稳定说出主入口、备用入口，以及各自负责哪类任务。
- 团队工作流期完成：同一类任务已经不再每次从零设计 prompt、plan 和验收。
- 规范与架构期完成：规则文件、验证门禁和工具拓扑已经能跨入口复用，而不是绑死在单一产品里。

## 继续阅读与下一步

<RelatedReadings
  title="继续阅读与下一步"
  description="如果你已经知道自己处在哪个阶段，下面这些页面会比继续横向刷更多产品介绍更有价值。"
  items={[
    {
      title: 'AI 开发方式',
      href: '/docs/development-modes',
      description: '如果你还没固定默认入口与人机分工，先回到开发方式层。',
    },
    {
      title: 'AI 工作流',
      href: '/docs/workflows',
      description: '如果你的问题已经从“选入口”转向“如何稳定交付”，下一步进工作流层。',
    },
    {
      title: 'AI 规范',
      href: '/docs/standards',
      description: '如果团队已经高频用 agent，但门禁和验证还没统一，就先补规范层。',
    },
    {
      title: 'AI 架构',
      href: '/docs/architecture',
      description: '当规则、权限、worktree 和 MCP 拓扑开始成为瓶颈时，再进入架构层。',
    },
  ]}
/>
