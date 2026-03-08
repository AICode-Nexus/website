---
title: 生态与集成
description: 把 GitHub、Jira、CI、PR、工作系统接入和组织落地从工具细节里单独提出来，作为 AI Code 的长期方向。
slug: /ecosystem
sidebar_label: 生态与集成
tags: [ai-coding, ecosystem, integration]
track: cross-track
kind: hub
content_form: hub
audience: advanced
stage: intermediate
featured: false
domain: ecosystem
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-08
source_window_end: 2026-03-08
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# 生态与集成

这个方向解决的不是“哪个工具更强”，而是：

当 AI Code 真正进入 GitHub、Jira、CI、PR、审批流和组织协作之后，系统怎么接，证据怎么回流，责任怎么收口。

## 这一层回答什么问题

- GitHub、Jira、CI、PR 和 review 怎么接回主工作系统
- 不同入口的 review 证据怎么保留
- 组织试点怎么扩成长期运行体系
- 缺陷、评估和运维经验怎么回流到流程与治理

## 为什么单独成方向

如果把这些内容全塞进工具页或架构页，最后会把三个问题混在一起：

- 工具体验
- 系统接入
- 组织运行

`生态与集成` 的职责就是把后两者单独抽出来。

## 当前最值得先看的入口

- [GitHub Copilot：集成、review 与治理](/docs/ecosystem/integrations/github-copilot)
- [OpenAI Codex：集成、review 与治理](/docs/ecosystem/integrations/openai-codex)
- [Claude Code：集成、review 与治理](/docs/ecosystem/integrations/claude-code)
- [Review 与 PR 工具链](/docs/ides-tooling/review-and-pr-tooling)

## 这些治理页现在怎么收口

这批页面现在已经统一成 `ecosystem` 语义和 `ecosystem` 公共 URL：

- [GitHub Copilot：集成、review 与治理](/docs/ecosystem/integrations/github-copilot)
- [VS Code Agents：集成、review 与治理](/docs/ecosystem/integrations/vscode-agents)
- [OpenAI Codex：集成、review 与治理](/docs/ecosystem/integrations/openai-codex)
- [Claude Code：集成、review 与治理](/docs/ecosystem/integrations/claude-code)
- [Gemini CLI：集成、review 与治理](/docs/ecosystem/integrations/gemini-cli)
- [Cline：集成、review 与治理](/docs/ecosystem/integrations/cline)
- [Cursor：集成、review 与治理](/docs/ecosystem/integrations/cursor)
- [Windsurf：集成、review 与治理](/docs/ecosystem/integrations/windsurf)

旧的 `tools/*/integration-review-governance` 链接继续保留 redirect，所以外部分享和历史链接不会失效。

## 什么时候先来这里

- 你已经不再纠结“用哪个工具”，而是在解决“怎么接入工作系统”
- 团队已经在试点，但 review、PR、CI 和审批流还没接顺
- 你需要把 AI Code 从个人习惯升级成组织级运行方式

## 继续阅读

<RelatedReadings
  title="继续阅读"
  description="先从接入工作系统和 review 证据回流开始，再把组织级运行问题收口。"
  items={[
    {
      title: 'GitHub Copilot：集成、review 与治理',
      href: '/docs/ecosystem/integrations/github-copilot',
      description: '如果你的主工作系统在 GitHub，先看平台型入口怎么接回 issue、PR 和 review。',
    },
    {
      title: 'OpenAI Codex：集成、review 与治理',
      href: '/docs/ecosystem/integrations/openai-codex',
      description: '如果你已经进入长任务、后台执行和并行 worktree，就先看执行栈如何接回工作系统。',
    },
    {
      title: 'Review 与 PR 工具链',
      href: '/docs/ides-tooling/review-and-pr-tooling',
      description: '如果你要补的是 review、PR、CI 和验收证据，先从这页回看工作系统闭环。',
    },
    {
      title: '规范评估与治理',
      href: '/docs/standards',
      description: '如果你还没统一规则、验证和评估，这一层要和生态与集成一起收口。',
    },
  ]}
/>
