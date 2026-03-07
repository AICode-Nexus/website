---
title: 主流 AI Coding 工作流
description: 截至 2026-03-07，把官方产品文档和主流框架仓库里反复出现的 AI coding workflow 收成一张可选型地图。
slug: /workflows/mainstream-ai-coding-workflows
sidebar_label: 主流工作流
tags: [ai-coding, workflows, mainstream]
track: prompting-workflows
kind: guide
audience: mixed
stage: starter
featured: true
pillar: workflows
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# 主流 AI Coding 工作流

## 这篇里的“主流”是什么意思

这篇不是市场份额榜，也不是产品评测。

这里的“主流”，是我根据截至 2026 年 3 月 7 日官方文档和官方仓库里反复出现的协作形态归纳出来的主线 workflow，包括 GitHub Copilot coding agent、VS Code agents、OpenAI Codex、Claude Code、GitHub Spec Kit 和 BMAD。

换句话说，这一页回答的是：

- 现在大家实际在用的工作流长什么样
- 不同工作流适合什么任务
- 你应该先固定哪一条，而不是同时学一堆

## 一张表先看完

| 工作流 | 最适合的任务 | 默认入口 | 最小输入 | 必须人工接管的位置 |
| --- | --- | --- | --- | --- |
| `spec-first` | 新功能、跨模块改动、边界复杂任务 | Spec Kit、BMAD、任意 planning-first agent | 目标、非目标、验收、范围 | spec 定稿、plan 定稿、最终 review |
| `bugfix / refactor / test` 固定回路 | 高频日常任务 | IDE、终端 agent、本地 agent | 复现步骤或行为边界 | 根因确认、回归验证、是否扩边界 |
| `issue / Jira -> draft PR` | 已进入工作系统的清晰任务 | GitHub Copilot coding agent | issue、验收标准、仓库访问 | 任务指派前、PR review、merge |
| `local -> background -> cloud` handoff | 既要交互探索，又要后台推进和团队 review 的任务 | VS Code agents | 本地上下文、handoff 指令、验证命令 | 从本地切后台时、从后台切云端时 |
| `terminal-first repo pairing` | 需要强控制、强可见性的本地工程任务 | Claude Code、Codex CLI、Gemini CLI | 仓库规则、任务合同、命令回路 | 改前计划、命令结果、diff 审核 |
| `parallel worktrees / multi-agent` | 长任务、低耦合多模块并行 | Codex app、Claude Code、Git worktree | 任务拆分、目录边界、收口 owner | 任务拆分、合流前验证、最终整合 |

## 1. `spec-first`：先写清楚做什么，再让 agent 动手

这是现在最值得优先学会的一条工作流。

如果任务是“加功能”“跨多个目录”“很容易做着做着跑偏”，那就不要直接让 agent 写代码，而是先把下面 4 件事写成文档：

1. 目标和非目标
2. 验收标准
3. 改动范围
4. 验证方式

具体跑法通常是：

```text
spec
  -> plan
  -> tasks / contract
  -> implementation
  -> verify
  -> review
```

这条链在 GitHub Spec Kit 里已经被做成显式步骤：`/speckit.constitution -> /speckit.specify -> /speckit.plan -> /speckit.tasks -> /speckit.implement`。  
如果你要的是更重的多角色流程，BMAD 则把它扩成 analysis、planning、solutioning、implementation 四阶段。

适合：

- 新功能
- 平台能力建设
- 跨模块改动
- 需要多人或异步 handoff 的任务

不适合：

- 已经定位清楚的小 bug
- 一次性脚本
- 只有 1 到 2 个文件的机械替换

最低落地标准不是“文档很多”，而是 spec 和 plan 真的能阻止执行期跑偏。

## 2. `bugfix / refactor / test`：把最高频任务先固定住

这条 workflow 不是最酷，但通常最先产生真实收益。

核心不是让 agent 更自由，而是把三类任务彻底拆开：

- bugfix：先复现，再根因，再最小修复
- refactor：先声明行为不变，再小步重构
- test：先给测试计划，再写用例

最常见的错误，是把三类任务混成一句话：

```text
顺手修 bug、重构一下、再把测试补齐
```

这会直接让边界失控。

更稳的跑法是：

```text
bugfix
  -> 复现
  -> 根因
  -> 最小修复
  -> 回归验证

refactor
  -> 行为边界
  -> 重构计划
  -> 小步修改
  -> 行为验证

test
  -> 覆盖目标
  -> 测试计划
  -> 用例实现
  -> 执行结果
```

适合：

- 团队刚开始把 AI 引入真实开发
- 你还没有稳定的新功能流程
- 你想先降低返工率，而不是先追求“全自动”

如果你的团队现在还没有任何一条稳定 workflow，应该先固定这一条，而不是先上多 agent。

## 3. `issue / Jira -> draft PR`：把异步 agent 接进现有工作系统

这条 workflow 的价值不在“自动写代码”，而在“把 agent 纳入已经存在的 issue 和 PR 制度”。

截至 2026 年 3 月 7 日，GitHub 官方已经把 Copilot coding agent 明确放进：

- GitHub issue 指派
- agents panel
- GitHub CLI / IDE 延续
- Jira 指派到 draft PR

这条链最适合下面这类任务：

- issue 本身已经写得比较清楚
- 验收标准可以落成命令或 PR review
- 任务适合后台跑，不需要持续同步聊天

标准跑法：

```text
Issue / Jira
  -> acceptance criteria
  -> assign to agent
  -> draft PR
  -> human review
  -> iterate if needed
  -> merge
```

这里最关键的不是“assign”，而是 assign 之前你是否已经写清：

- 目标
- 不做什么
- 仓库或目录范围
- 验收命令
- 谁对 merge 负责

如果 issue 本身还是一句模糊需求，这条 workflow 会非常危险，因为 agent 只会更快地把模糊需求变成模糊 PR。

## 4. `local -> background -> cloud`：先本地探索，再后台推进，再云端收口

这是 VS Code agents 官方文档里非常明确的一条主线。

它适合那些一开始需要交互澄清，但中间又适合后台执行，最后还要进团队 review 的任务。

推荐顺序通常是：

```text
local agent / plan agent
  -> background agent
  -> cloud agent / PR
```

一条更具体的用法是：

1. 先用本地 agent 理解项目、读错误、做计划
2. 明确 handoff 指令和验证命令
3. 把任务切给 background agent 在本机 worktree 里跑
4. 需要正式团队 review 时，再切到 cloud agent 或 PR 流

适合：

- IDE 是你的默认主入口
- 团队想在一个控制面里管理不同 agent session
- 任务需要几次 handoff，但不想丢上下文

它的前提不是模型多强，而是 handoff 足够清楚。没有 handoff，这条 workflow 只会把混乱放大到三个执行环境里。

## 5. `terminal-first repo pairing`：把 agent 当成仓库里的搭档，不是网页聊天框

这一类 workflow 的重点是：

- 从仓库根目录启动
- 先读取 repo 规则
- 用命令而不是嘴上说“完成了”来判断结果
- 每一步都有可见的 diff 和命令输出

Claude Code 的官方 common workflows 已经把“理解代码库”“并行 worktree”“作为 unix 风格工具参与验证”写成标准用法。OpenAI Codex CLI 官方帮助文档也把本地运行、审批模式和 inline command review 当成默认体验。

这条 workflow 的最小闭环通常是：

```text
读规则文件
  -> 明确任务合同
  -> 先给计划
  -> 小步执行
  -> 跑命令验证
  -> 审核 diff
```

适合：

- 你经常处理真实工程仓库
- 你希望保留 shell、git、test 的强控制感
- 你不想把上下文全交给 IDE 或网页平台

不适合：

- 还没有基本命令回路的项目
- 完全不愿意看 diff 和验证结果的人

## 6. `parallel worktrees / multi-agent`：把长任务拆开，而不是把一个大 prompt 写得更长

这条 workflow 在 2025 年下半年到 2026 年初已经很明确地进入主流文档：

- OpenAI Codex 强调 parallel agents、isolated environments 和 built-in worktrees
- Claude Code 官方把 Git worktree 并行 session 写成 common workflow
- VS Code background agents 也明确说明它们用 Git worktrees 隔离后台任务

正确姿势不是“让 3 个 agent 同时改同一个目录”，而是：

```text
任务拆分
  -> 每个子任务独立 worktree
  -> 每个子任务独立验证
  -> owner 合流 review
```

适合：

- 长任务
- 多模块低耦合改动
- 同时存在实现、测试、文档或迁移子任务

不适合：

- 边界还没定的需求
- 高耦合同文件改动
- 没有统一 owner 的团队

这条 workflow 的门槛其实比 spec-first 更高，因为你必须先会拆任务，才能并行。

## 应该先固定哪一条

如果你现在还没有稳定方法，建议按下面顺序来：

1. 先固定 `bugfix / refactor / test`
2. 再建立 `spec-first`
3. 任务进入工单系统后，再上 `issue / Jira -> draft PR`
4. 需要统一控制面时，再用 `local -> background -> cloud`
5. 长任务真的多起来后，再上 `parallel worktrees / multi-agent`

对于个人工程师，`terminal-first repo pairing` 往往可以和第 1 条同时开始，因为它更像执行入口，不像组织级制度。

## Sources

- GitHub Spec Kit: [github/spec-kit](https://github.com/github/spec-kit)
- Spec Kit Docs: [Spec Kit Documentation](https://github.github.com/spec-kit/index.html)
- BMAD: [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)
- GitHub Docs: [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/about-assigning-tasks-to-copilot)
- GitHub Docs: [Managing coding agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents)
- GitHub Changelog, 2026-03-05: [GitHub Copilot coding agent for Jira is now in public preview](https://github.blog/changelog/2026-03-05-github-copilot-coding-agent-for-jira-is-now-in-public-preview)
- VS Code Docs: [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- VS Code Docs: [Background agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- OpenAI: [Introducing Codex](https://openai.com/index/introducing-codex/)
- OpenAI: [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
- OpenAI Help: [OpenAI Codex CLI - Getting Started](https://help.openai.com/en/articles/11096431-openai-codex-ci-getting-started)
- Anthropic Docs: [Common workflows](https://docs.anthropic.com/en/docs/claude-code/tutorials)
- Anthropic Docs: [Subagents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
