---
title: Vibe Working：从 Vibe Coding 到团队级交付操作系统
description: 用官方 agent 工作流信号和仓库 issue 需求，解释为什么团队现在更需要可委派、可验证、可 handoff 的 Vibe Working，而不是只追求更快写代码。
slug: /workflows/vibe-working
sidebar_label: Vibe Working
tags: [ai-coding, workflows, vibe-working, delivery]
track: prompting-workflows
kind: guide
content_form: guide
domain: workflows
journey_stage: development-planning
entry_role: domain
audience: mixed
stage: intermediate
featured: false
reviewed_at: 2026-03-25
source_window_end: 2026-03-25
market_status: current
---

# Vibe Working：从 Vibe Coding 到团队级交付操作系统

## TL;DR

`Vibe coding` 解决的是“人和模型一起，能不能更快做出东西”；`vibe working` 解决的是“团队和 agent 一起，能不能更稳地把东西交出去”。

这不是一个更时髦的新口号，而是 2024 到 2026 年官方产品形态已经在推动的一次工作重心转移：Anthropic 在 `2024-12-19` 把 `workflow` 和 `agent` 明确区分开，强调生产环境先用简单、可组合的模式，再决定是否引入更高自治；GitHub 的 Copilot coding agent 文档强调它是在后台独立完成任务、走 PR 流；VS Code 的 agents 文档把 `local / background / cloud` 和 session handoff 直接做成第一层概念；OpenAI 在 `2026-02-02` 发布 Codex app 时，已经把重点写成“如何指挥、监督、协作多 agent”。

所以，真正需要补课的不是“再学一个 prompt 技巧”，而是把任务合同、执行边界、验证证据、handoff 和复盘资产固定下来。只有这样，AI coding 的即时快感才会变成团队可复用的工作方式。

## 为什么这页值得单独写

- 事实：GitHub issue [#4 `聊一聊vibe working`](https://github.com/AICode-Nexus/website/issues/4) 由 `trsoliu` 于 `2026-03-25 02:41:23 UTC` 创建，正文是“从 vibe coding 到聊一聊 vibe working”。
- 事实：截至 `2026-03-25 14:20:42 +08:00` 的全量 issue 快照，这条 issue 当前状态为 Open，且仓库此前没有明确对应该主题的中文工作流页。
- 推断：这条 issue 真正暴露的不是“再讲点 AI coding 概念”，而是读者已经感觉到只谈“怎么更快写代码”不够了，开始追问“团队怎么围绕 agent 建立稳定交付链”。

## 过去两年，官方产品到底变了什么

如果只看社交媒体讨论，`vibe coding` 很容易被理解成一种轻松甚至随性的写代码气氛。但从官方产品和文档看，主流工具正在把重点从“会不会写”推到“怎么组织工作”。

- 事实：Anthropic 在 `2024-12-19` 发布的 [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents?via=aitoolhunt) 中，明确把 `workflow` 定义为通过预设代码路径编排 LLM 和工具，把 `agent` 定义为由模型动态决定过程和工具使用方式，并建议先从最简单可行的方案开始。
- 事实：OpenAI 在 `2025-05-16` 发布 [Introducing Codex](https://openai.com/index/introducing-codex/) 时，把 Codex 定义为“可并行处理多项任务的云端软件工程 agent”，每个任务运行在独立的 cloud sandbox 中。
- 事实：GitHub 当前的 [Copilot coding agent 文档](https://docs.github.com/en/copilot/concepts/agents/coding-agent) 明确写到，Copilot 可以在后台独立完成任务，并把编码、提交、开 PR、描述 PR 这些动作放进同一条 GitHub 工作流里。
- 事实：VS Code 当前的 [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview) 文档，把 agent 直接分成 `local`、`background`、`cloud` 三种运行形态，并把 session 并行和 handoff 作为基础能力。
- 事实：OpenAI 在 `2026-02-02` 发布的 [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/) 中，把核心挑战描述成“人如何在规模上指挥、监督并与 agent 协作”，而不是“agent 能不能多写一点代码”。

推断：这些官方信号共同说明，行业已经从“AI 帮我写代码”转向“AI 进入团队交付系统”。这正是 `vibe working` 的现实背景。

## Vibe Coding 为什么不够用了

`Vibe coding` 在个人探索阶段很有效，因为它天然擅长三件事：

1. 把模糊想法快速变成可见结果。
2. 降低第一次动手的心理门槛。
3. 让个人工程师更容易进入高反馈节奏。

但团队一旦把这套节奏带进真实仓库，就会马上遇到另一组问题：

- 这个任务到底要交什么，谁说了算？
- agent 这次改动为什么算完成，有没有证据？
- 如果失败，谁接手，怎么恢复？
- 这次学到的做法，下次还能不能直接复用？

`Vibe coding` 不负责回答这些问题。它更像一种生产感觉；而 `vibe working` 必须把这种感觉变成一套可重复的操作系统。

## Vibe Working 真正多出来的，不是“更多 agent”，而是 5 层固定资产

### 1. 任务合同

在 `vibe working` 里，任务不能只写成一句“帮我做个页面”或“帮我补点测试”。它至少要写清：

- 本轮目标
- 非目标
- 验收方式
- 风险边界

如果这四件事不明确，所谓“多 agent 并行”只会把混乱放大。

### 2. 执行分流

不是所有任务都需要高自治。Anthropic 的文章之所以把 `workflow` 和 `agent` 分开，就是为了提醒团队：能用固定路径解决的问题，不要过早交给自由度更高的 agent。

更稳的顺序通常是：

- 范围清楚、边界固定：先走 workflow
- 需要动态拆解、跨文件、多步反馈：再上 agent
- 需要多人协作或长链路：再补后台执行和 handoff

### 3. 验证证据

团队最终信任的不是一句“应该好了”，而是一组最小证据包：

- 跑了哪些命令
- 哪些测试通过
- 哪些截图或录屏证明路径走通
- 还有哪些风险没覆盖

Anthropic 在 coding agents 的例子里特别强调，代码问题之所以适合 agent，一个关键原因就是输出可通过测试验证。这其实已经在告诉团队：没有验证，所谓 agent 产出就只是文本，不是交付。

### 4. Handoff 接口

GitHub 和 VS Code 现在都在把 issue、session、PR、review 做成一条线，本质上是在产品层补 `handoff`。  
对团队来说，这意味着每个阶段都要有明确出口：

- issue 交给谁
- session 怎么转给下一个 agent
- PR 由谁 review
- 阻塞时回到哪里

没有 handoff，`vibe working` 最终还是会退化回“谁在线谁接着做”。

### 5. 复盘资产

真正能让团队越做越稳的，不是某次对话很精彩，而是这些东西有没有被留下来：

- repo 规则文件
- 任务模板
- 验证模板
- runbook
- 案例页

如果经验只存在聊天记录里，第二次做同类任务时，大概率还是要从零开始。

## 一个足够现实的最小 Vibe Working 模型

对大多数团队来说，不需要一上来就建设复杂的 agent 平台。更现实的最小模型通常是这四步：

### 第一步：把任务写成可委派 brief

先把目标、非目标、验收、风险写清，再让 agent 进入执行。

### 第二步：按任务形状选执行模式

- 局部修复：走 [`Bugfix / Refactor / Test`](/docs/workflows/patterns/bugfix-refactor-test/runbook)
- 已有 issue 合同：走 [`Issue / Jira -> Draft PR`](/docs/workflows/patterns/issue-to-draft-pr/runbook)
- 长任务或并行 lane：走 [`多 Agent 协作`](/docs/workflows/multi-agent-collaboration)

### 第三步：用证据包收口

固定 `Verification / Artifacts / Risks` 三件套，减少 reviewer 追问。

### 第四步：把稳定做法回流到规则和模板

能反复发生的事情，就不要继续靠口头说明。

## 一个团队什么时候算真的进入了 Vibe Working

不是看团队用了多少 agent，而是看下面这些变化有没有发生：

| 信号 | 还停留在 Vibe Coding | 开始进入 Vibe Working |
| --- | --- | --- |
| 任务入口 | 临场说需求 | 有稳定 brief 或 issue 合同 |
| 产出判断 | “看起来差不多” | 有命令、测试、截图、风险说明 |
| 协作方式 | 谁空谁接 | 有固定 handoff 和 review 入口 |
| 经验沉淀 | 在聊天里 | 在规则、模板、runbook 里 |
| 扩展方式 | 多换工具 | 先补操作系统，再加能力 |

如果一个团队已经开始稳定回答右边这列的问题，它其实就已经在做 `vibe working` 了，只是可能还没给这件事取名字。

## 最容易把这件事做歪的 4 个误区

### 误区 1：把 Vibe Working 理解成“让 agent 干更多活”

真正的问题不是“干更多”，而是“干得有没有边界、证据和接力点”。

### 误区 2：把模板和文档当成速度敌人

差的模板当然会拖慢速度；但好的模板本质上是在减少重复解释。

### 误区 3：只升级工具，不升级协作接口

工具越来越强，不代表团队自然就会更稳。没有协作接口，强工具只会更快制造返工。

### 误区 4：把个人高效率误判成团队高效率

一个高手能在对话里压住复杂度，不代表整个团队都能复制这种做法。团队级系统必须依赖明确接口，而不是依赖某个人的手感。

## 推荐动作

如果你现在就想把 `vibe coding` 升级成更稳的团队工作方式，最值得先做的不是研究下一个模型，而是按顺序补这三件事：

1. 给所有 agent 任务固定一个最小 brief 模板。
2. 给所有交付固定一个最小证据包模板。
3. 给所有高频任务固定一个默认 runbook。

这三件事一旦稳定，团队就不再只是“偶尔用 AI 做得很快”，而是开始拥有自己的 `vibe working` 操作系统。

## 相关阅读

- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [提示词合同](/docs/workflows/prompt-contracts)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
- [多 Agent 协作](/docs/workflows/multi-agent-collaboration)

## Sources

- [GitHub Issue #4: `聊一聊vibe working`](https://github.com/AICode-Nexus/website/issues/4)
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents?via=aitoolhunt)
- [OpenAI: Introducing Codex](https://openai.com/index/introducing-codex/)
- [GitHub Docs: Concepts for GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent)
- [VS Code Docs: Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- [OpenAI: Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
