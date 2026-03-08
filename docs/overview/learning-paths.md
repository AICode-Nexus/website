---
title: AI Coding 学习路径
description: 用一条默认学习路径把流程地图、知识方向和覆盖层串起来，避免在产品名之间反复横跳。
slug: /start/learning-paths
sidebar_label: 学习路径
tags: [ai-coding, learning-path, workflow]
track: cross-track
kind: guide
content_form: guide
audience: mixed
stage: starter
featured: true
domain: workflows
journey_stage: development-planning
entry_role: start
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# AI Coding 学习路径

这条路径不试图覆盖所有分支，它只提供一条默认顺序：

先按流程推进，再按知识方向补齐。

## Step 1：先定开发范式与协作方式

目标：先明确默认入口、人机分工和协作边界。

建议顺序：

1. [开发范式与协作方式](/docs/development-modes)
2. [AI 开发方式总览](/docs/development-modes-landscape)
3. [Agent 执行模式](/docs/development-modes/agent-execution-modes)

## Step 2：再做工具与技术选型

目标：明确平台、终端 agent、AI IDE、执行栈和资源入口怎么分工。

1. [工具与技术选型](/docs/tools)
2. [工具选择地图](/docs/tools/map)
3. [资源中心](/docs/tools/resources)
4. [内容索引](/docs/content-index)

## Step 3：固定工作流与交付

目标：把开发规划、方案设计、实施、测试验证和缺陷优化串成团队默认交付链。

1. [工作流与交付](/docs/workflows)
2. [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
3. [AI 工作流实操手册](/docs/workflows/playbooks/workflow-playbook)
4. [多 Agent 协作](/docs/workflows/multi-agent-collaboration)

## Step 4：收口架构与上下文系统

目标：把目录边界、上下文切片、worktree、MCP 和系统接缝固定下来。

1. [架构与上下文系统](/docs/architecture)
2. [AI 原生工程架构](/docs/ai-native-engineering-architecture)
3. [MCP 与工具拓扑](/docs/mcp-tool-topology)

## Step 5：补规范评估与治理

目标：把规则文件、权限、验证、评估、review 和风险门禁统一成仓库级治理能力。

1. [规范评估与治理](/docs/standards)
2. [仓库规则文件体系](/docs/repo-instruction-files)
3. [AI 开发规范](/docs/ai-development-standards)
4. [质量门禁与 Review](/docs/standards/review-quality-gates)

## Step 6：最后进入生态与集成

目标：把 GitHub、Jira、CI、PR 和组织接入拉回真实工作系统。

1. [生态与集成](/docs/ecosystem)
2. [Review 与 PR 工具链](/docs/ides-tooling/review-and-pr-tooling)
3. [Daily Brief](/blog)

## 什么时候回资源中心或内容索引

- 需要快速补材料：回 [资源中心](/docs/tools/resources)
- 需要选择阅读形态：回 [内容索引](/docs/content-index)
- 需要跟踪短期变化：回 [Daily Brief](/blog)

## 继续阅读与下一步

<RelatedReadings
  title="继续阅读与下一步"
  description="如果你已经知道自己当前处在哪一环，下面这些入口会比继续横向刷产品介绍更有效。"
  items={[
    {
      title: '流程地图',
      href: '/docs/start/journey-map',
      description: '如果你还不确定自己当前卡在哪一环，先回流程地图。',
    },
    {
      title: '知识方向总表',
      href: '/docs/start/taxonomy',
      description: '如果你知道阶段但不知道该进哪个方向，先回方向总表。',
    },
    {
      title: '工作流与交付',
      href: '/docs/workflows',
      description: '如果你的问题已经从“选入口”转向“如何稳定交付”，下一步进工作流层。',
    },
    {
      title: '生态与集成',
      href: '/docs/ecosystem',
      description: '如果你已经在真实组织里落地 AI Code，就进入生态与集成层。',
    },
  ]}
/>
