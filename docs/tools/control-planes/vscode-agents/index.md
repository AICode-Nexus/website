---
title: "VS Code Agents"
description: "VS Code Agents 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/control-planes/vscode-agents"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "vscode-agents"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: true
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

import {LearningResources} from '@site/src/components/docs';

# VS Code Agents

VS Code Agents 更像统一控制面：把本地 agent、background agents、第三方 agent 和编辑器工具能力收进一个工作台。

## 60 秒结论

:::tip 先给判断
VS Code Agents 最稳的使用方式，不是把它当成“所有任务都交给一个入口”，而是先承认它的主控制面是：控制面，擅长在本地探索、后台执行和编辑器内审阅之间切换。
:::


如果你主要在同一个工作区里高频推进任务、频繁读 diff、并且愿意把 rules、review 证据和 handoff 节点写清，VS Code Agents 会非常顺手。反过来，如果你的工作系统、审批边界和最终交付主要不发生在这个入口里，那么它就更像补位层，而不是标准栈中心。

## 适合谁，也不适合谁

### 更适合

- 已经把 VS Code 作为主编辑器的团队。
- 希望把本地 agent、background agents 和浏览器工具放在同一控制面里的人。
- 需要 editor-first 体验，但又不想放弃后台执行和第三方 agent 的组织。

### 暂时不要先选

- 纯终端文化团队，不愿意依赖编辑器控制面。
- 想要 GitHub 平台即入口，而不是 editor 先行的组织。
- 只需轻量 CLI 助手，不需要本地/后台统一调度的场景。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 主控制面 | 控制面，擅长在本地探索、后台执行和编辑器内审阅之间切换。 | 先把 VS Code Agents 当成日常主入口，再用其他入口补平台或执行层。 |
| 任务形状 | 在本地读代码、起草方案，然后发给 background agent 继续执行。 | 先跑 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)。 |
| 团队约束 | 需要定义本地与后台 agent 的职责边界，以及何时必须升级到人工审批。 | 把规则与证据链先写回 repo，再扩大 VS Code Agents 使用面。 |
| 退出信号 | 团队无法统一在 VS Code 上协作。 | 一旦出现这些信号，就优先评估 [GitHub Copilot](/docs/tools/platforms/github-copilot)。 |

## 默认进入方式与补位组合

VS Code Agents 进入标准栈时，最重要的不是“功能有没有”，而是你打算让它承担哪一段主线。默认建议是先把高频日常任务放进 VS Code Agents，再用平台、框架或终端入口兜住验证与治理。

### 推荐组合

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。

### 典型任务

- 在本地读代码、起草方案，然后发给 background agent 继续执行。
- 结合终端、浏览器和编辑器 diff 做交互式修复。
- 用统一工作台接入第三方 agent 或 MCP 风格工具。

## 官方事实与工程判断

### 官方资料明确说明了什么

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)

### 这份手册据此做出的工程判断

- VS Code Agents 的真正优势，不是“它也能做很多事”，而是它把 控制面，擅长在本地探索、后台执行和编辑器内审阅之间切换。 这件事打磨得更顺。
- 如果团队没有把 repo 规则、验证命令和人工 review 固定下来，再好的入口体验也会被流程噪音抵消。
- 决定 VS Code Agents 能不能长期留在栈里的，不是单次演示效果，而是这些治理要求：需要定义本地与后台 agent 的职责边界，以及何时必须升级到人工审批。

## 下一步怎么读

- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：这是 VS Code Agents 最自然的主线。
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)：本地修复与后台补跑结合得比较顺。
- [Spec-First](/docs/workflows/patterns/spec-first)：适合先在本地规划，再把明确任务交给后台。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：GitHub 负责平台闭环，VS Code 负责本地控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：用 VS Code 作为可视化控制面，Codex 负责更深执行。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要把计划、worktree 和 review ritual 固化时可以叠加。

<LearningResources
  tool="VS Code Agents"
  description="如果你已经确认这类入口值得继续深入，下面这些课程和公开视频可以直接补齐操作层细节。"
/>
