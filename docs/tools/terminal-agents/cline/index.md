---
title: "Cline"
description: "Cline 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/terminal-agents/cline"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "cline"]
track: "cross-track"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

import {LearningResources} from '@site/src/components/docs';

# Cline

Cline 是开放式 agent 壳层：围绕 Plan / Act、MCP、browser automation 和 checkpoints 提供高度可组合的执行能力。

## 60 秒结论

:::tip 先给判断
Cline 最稳的使用方式，不是把它当成“所有任务都交给一个入口”，而是先承认它的主控制面是：开放式终端/agent 外壳，适合要自己拼工作流、模型和工具权限的高级用户。
:::


如果你主要在同一个工作区里高频推进任务、频繁读 diff、并且愿意把 rules、review 证据和 handoff 节点写清，Cline 会非常顺手。反过来，如果你的工作系统、审批边界和最终交付主要不发生在这个入口里，那么它就更像补位层，而不是标准栈中心。

## 适合谁，也不适合谁

### 更适合

- 重视开放性、MCP、浏览器自动化和 provider 可替换性的用户。
- 想自己控制 Plan / Act、checkpoint、工具权限和外部模型的人。
- 愿意承担更高配置成本，换取更大组合空间的团队。

### 暂时不要先选

- 只想要产品化完整体验，不想自己拼装模型、rules 和工具的人。
- 团队更重视统一治理而不是开放扩展的组织。
- 没有人能维护 provider、MCP 与权限配置的仓库。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 主控制面 | 开放式终端/agent 外壳，适合要自己拼工作流、模型和工具权限的高级用户。 | 先把 Cline 当成日常主入口，再用其他入口补平台或执行层。 |
| 任务形状 | Plan / Act 交替的长任务推进。 | 先跑 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)。 |
| 团队约束 | Cline 的风险不在能力不够，而在开放能力很容易超过团队治理能力。 | 把规则与证据链先写回 repo，再扩大 Cline 使用面。 |
| 退出信号 | 团队无法统一 tool permission 与 provider 配置。 | 一旦出现这些信号，就优先评估 [Windsurf](/docs/tools/ide-first/windsurf)。 |

## 默认进入方式与补位组合

Cline 进入标准栈时，最重要的不是“功能有没有”，而是你打算让它承担哪一段主线。默认建议是先把高频日常任务放进 Cline，再用平台、框架或终端入口兜住验证与治理。

### 推荐组合

- [Continue Rules](/docs/tools/ai-ide-landscape)：开放栈通常不只看 Cline，还要看 rules 与模型配置生态。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你想在开放壳层上再叠加一套日常操作方法时很有帮助。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：部分团队会把 Cline 留作开放实验入口，把 Codex 留作正式执行栈。

### 典型任务

- Plan / Act 交替的长任务推进。
- MCP 重度场景、浏览器自动化或外部 provider 实验。
- 需要 checkpoints 与回滚意识的开放式 agent 工作流。

## 官方事实与工程判断

### 官方资料明确说明了什么

- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [Cline Checkpoints](https://docs.cline.bot/core-workflows/checkpoints)
- [Cline MCP Overview](https://docs.cline.bot/mcp/mcp-overview)

### 这份手册据此做出的工程判断

- Cline 的真正优势，不是“它也能做很多事”，而是它把 开放式终端/agent 外壳，适合要自己拼工作流、模型和工具权限的高级用户。 这件事打磨得更顺。
- 如果团队没有把 repo 规则、验证命令和人工 review 固定下来，再好的入口体验也会被流程噪音抵消。
- 决定 Cline 能不能长期留在栈里的，不是单次演示效果，而是这些治理要求：Cline 的风险不在能力不够，而在开放能力很容易超过团队治理能力。

## 下一步怎么读

- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)：在高控制 shell 环境里很自然。
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：配合 Plan / Act 和 checkpoints 适合迭代修复。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：若团队已有外部 orchestration，可作为开放式执行壳。
- [Continue Rules](/docs/tools/ai-ide-landscape)：开放栈通常不只看 Cline，还要看 rules 与模型配置生态。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：当你想在开放壳层上再叠加一套日常操作方法时很有帮助。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：部分团队会把 Cline 留作开放实验入口，把 Codex 留作正式执行栈。

<LearningResources
  tool="Cline"
  description="如果你已经确认这类入口值得继续深入，下面这些课程和公开视频可以直接补齐操作层细节。"
/>
