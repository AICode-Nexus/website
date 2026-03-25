---
title: 统一 Agent 平台 + 自研 Frontier：企业为什么最后都会走向双线建设
description: 用官方 agent 平台信号和企业交付逻辑，解释为什么“统一 Agent 平台”与“自研 Frontier 能力”不是二选一，而是企业 AI 系统进入核心业务后几乎必然出现的双线分工。
slug: /tools/insights/unified-agent-platform-frontier
sidebar_label: 平台 + Frontier
tags: [ai-coding, insight, agent-platform, frontier, enterprise]
track: cross-track
kind: insight
content_form: insight
domain: ecosystem
journey_stage: tech-selection
entry_role: domain
audience: mixed
stage: advanced
featured: false
reviewed_at: 2026-03-25
source_window_end: 2026-03-25
market_status: current
---

# 统一 Agent 平台 + 自研 Frontier：企业为什么最后都会走向双线建设

## TL;DR

企业做 AI，最开始往往只会盯着一个问题：模型够不够强。  
但一旦 AI 从“几个人试着用”进入“要进真实业务流程”，问题就会迅速分裂成两条线：

- 一条线是 `统一 Agent 平台`，解决的是怎么把模型、工具、权限、任务、审计和评估组织成一套可规模化的系统。
- 一条线是 `自研 Frontier 能力`，解决的是关键任务的上限、成本结构、领域优势和长期控制权。

只做平台，不做 Frontier，企业很容易变成“接了很多模型，但真正重要的质量和成本不受控”。  
只做 Frontier，不做平台，企业又很容易变成“模型很强，但始终进不了真实交付链”。

所以，这不是“平台派”和“模型派”的路线之争，而是企业 AI 进入深水区之后几乎一定会出现的分工结果。

## 为什么这条 issue 值得单独写

- 事实：GitHub issue [#5 `统一 Agent 平台 + 自研 Frontier 能力`](https://github.com/AICode-Nexus/website/issues/5) 由 `trsoliu` 于 `2026-03-25 03:23:58 UTC` 创建，正文是“讲一讲企业生产 统一 Agent 平台 + 自研 Frontier 能力的建设”。
- 事实：截至 `2026-03-25 14:20:42 +08:00` 的全量 issue 快照，这条 issue 当前状态为 Open，且仓库此前没有一篇明确对应这条主题的中文独立页面。
- 推断：这条 issue 关心的不是“再推荐几个模型或工具”，而是在追问企业级 AI 系统最关键的架构分工：平台层和能力层到底为什么要同时建设。

## 先看行业信号：主流产品正在把“平台层”做成显性能力

过去一年多，官方产品已经在不断释放同一类信号：agent 不再只是单轮对话能力，而是在变成一套平台化的执行系统。

- 事实：Anthropic 在 `2024-12-19` 的 [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents?via=aitoolhunt) 中，明确区分 `workflow` 与 `agent`，并强调生产环境应优先采用简单、可组合的模式，而不是一开始就做复杂框架。
- 事实：GitHub 当前的 [Copilot coding agent 文档](https://docs.github.com/en/copilot/concepts/agents/coding-agent) 写明，Copilot 可以在后台独立完成任务，并把 issue、编码、提交、PR、review 放进 GitHub 原生工作流里。
- 事实：VS Code 当前的 [Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview) 把 agent 分成 `local`、`background`、`cloud` 和 `third-party`，并强调 session 并行与 handoff。
- 事实：OpenAI 在 `2025-05-16` 的 [Introducing Codex](https://openai.com/index/introducing-codex/) 中，把 Codex 定义为可并行处理多项任务、每个任务运行在独立 sandbox 中的云端软件工程 agent。
- 事实：OpenAI 在 `2026-02-02` 的 [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/) 中，把 Codex app 直接描述为 `a command center for agents`，重点不再是“单个 agent 能做什么”，而是“人如何在规模上指挥、监督并协作多个 agent”。

推断：这组官方信号共同说明，平台层已经从“可选配套”变成了 agent 时代的主问题之一。

## 那为什么还要谈 Frontier

因为平台解决的是“把能力组织起来”，不是“能力本身的长期上限”。  
企业一旦真的把 AI 放进核心业务，迟早会撞到四个更硬的问题：

1. 最关键任务的质量上限是不是被外部模型绑定住了？
2. 调用量起来之后，成本曲线是不是还能接受？
3. 公司最有价值的领域知识，能不能沉淀成自己的竞争力？
4. 如果外部供应商策略变化，关键流程会不会一起被牵走？

这四个问题，单靠统一平台很难彻底解决。平台可以帮你切换、监控、评估、治理，但它不能替你创造长期差异化。  
`Frontier` 在企业语境里，真正重要的也不只是“从零训练一个超级模型”，而是企业是否对关键能力栈拥有足够深的控制权。

## “统一 Agent 平台”到底在解决什么

如果把企业 AI 系统拆开看，平台层解决的其实都是“组织问题”：

- 谁能访问哪些模型、工具和数据
- 哪些任务可以自动执行，哪些必须审批
- 任务怎样排队、并行、暂停、恢复和回滚
- 结果怎样被评估、审计和复盘
- 团队怎样共用模板、技能、规则和运行方式

这些问题和 [`Agent = Model + Harness`](/docs/tools/insights/agent-model-plus-harness) 里说的 `harness` 本质上是一类问题。  
也就是说，平台层不是“给模型外面套一层 UI”，而是在把模型变成企业可治理的系统能力。

## “自研 Frontier 能力”真正指的又是什么

这件事最容易被误解。很多团队一听到 `Frontier`，就立刻想到“是不是要自己训一个基础大模型”。  
但在大多数企业里，更现实的含义通常是三层递进：

### 第一层：关键任务要有自己的质量控制权

如果最重要的业务环节完全依赖外部模型，企业实际上很难拥有稳定的上限。

### 第二层：领域知识要能变成可复用能力

不是所有企业都要自己造模型，但真正重要的领域数据、评估标准、路由策略和能力优化，最终都要以某种方式沉淀成自己的系统资产。

### 第三层：成本、性能和供应链要有主动权

一旦 AI 进入核心业务，高频调用、专有场景和长期优化都会把企业推向“不能只当外部模型的被动消费者”。

换句话说，`Frontier` 在这里更像“关键能力的深度控制权”，而不只是一个研究标签。

## 为什么企业最后几乎一定会双线并行

### 因为平台负责规模化，Frontier 负责上限

平台让 AI 能接进真实系统，Frontier 让 AI 值得长期投入。  
这两个问题谁都绕不过去，只是出现的先后顺序不同。

### 因为平台会自然暴露能力短板

一旦平台开始跑真实任务，组织很快就会看到：

- 哪些任务最贵
- 哪些任务最不稳定
- 哪些任务最有差异化价值

这些信息反过来就会定义 Frontier 的优先级。

### 因为 Frontier 也需要平台来完成闭环

如果没有真实任务数据、统一评估、上线边界和治理能力，自研能力很容易只停留在离业务很远的优化游戏里。  
平台不是 Frontier 的替代品，反而是它进入业务闭环的前提。

## 更现实的建设顺序，不是同时重兵投入，而是分阶段耦合

### 第 1 阶段：先把平台层做出来

这时的目标不是“最强模型”，而是先回答：

- 任务入口有没有统一
- 工具和数据访问有没有边界
- 执行和验证有没有闭环
- 成本和日志能不能看到

如果这些都还没有，贸然投入 Frontier 往往收益有限。

### 第 2 阶段：用平台数据识别关键能力缺口

当平台开始稳定运行，企业会第一次真正知道：

- 哪些任务最值得深挖
- 哪些任务只是普通供应问题
- 哪些链路适合自研，哪些适合继续复用外部能力

这一步决定了 Frontier 的 ROI。

### 第 3 阶段：把 Frontier 建设接回平台

真正有效的方式不是“模型团队单独做强，再想办法交给业务”，而是：

- 平台提供真实任务与评估
- Frontier 反哺质量、成本和速度
- 平台再负责把改进后的能力稳定上线

这时双线才真正形成闭环。

## 组织上最常见的 4 个失败模式

### 1. 平台团队只做接入，不做治理

如果平台团队只负责把模型和工具串起来，而不定义任务合同、审批、验证和审计，它就只是一个技术适配层，不是真正的平台。

### 2. Frontier 团队脱离真实任务

如果自研能力没有回到真实任务、真实评估和真实上线边界，它很容易只优化局部指标。

### 3. 平台团队和模型团队没有共享指标

一边看上线率，一边看 benchmark，最后谁也解释不了业务为什么没提升。

### 4. 把所有地方都当成必须自研

真正成熟的企业不会把每条链路都当核心能力。  
更稳的做法是先明确：

- 哪些链路是战略核心
- 哪些链路是标准能力
- 哪些链路需要可替换性而不是深度自研

## 一个更清晰的判断框架

| 问题 | 更像平台问题 | 更像 Frontier 问题 |
| --- | --- | --- |
| 权限、审批、审计怎么做 | 是 | 否 |
| 多 agent 任务如何排队、并行、恢复 | 是 | 否 |
| 哪个模型更适合关键任务 | 部分相关 | 是 |
| 某类核心任务成本为什么降不下来 | 部分相关 | 是 |
| 领域知识怎样沉淀成长期优势 | 否 | 是 |
| 多团队如何共享模板、技能和规则 | 是 | 否 |

这张表的意义不是绝对切分，而是帮助企业少走弯路。很多争论其实不是路线之争，而是问题一开始就没分层。

## 推荐动作

如果你现在就在推动企业级 AI 建设，最值得先做的不是空谈“大模型战略”，而是按顺序回答下面三个问题：

1. 平台层是不是已经能把任务入口、工具接入、执行、验证和审计收成一条线？
2. 哪些任务已经足够关键，值得建立自有能力控制权？
3. 平台团队和能力团队有没有共享的业务指标，而不是各做各的路线图？

这三个问题答清楚之后，“统一 Agent 平台 + 自研 Frontier”就不再是一个抽象口号，而会变成一条非常具体的组织分工图。

## 相关阅读

- [Agent = Model + Harness](/docs/tools/insights/agent-model-plus-harness)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
- [多 Agent 协作](/docs/workflows/multi-agent-collaboration)
- [AI First 到 Harness Engineering](/docs/tools/insights/ai-first-to-harness-engineering-speech)

## Sources

- [GitHub Issue #5: `统一 Agent 平台 + 自研 Frontier 能力`](https://github.com/AICode-Nexus/website/issues/5)
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents?via=aitoolhunt)
- [GitHub Docs: Concepts for GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent)
- [VS Code Docs: Using agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- [OpenAI: Introducing Codex](https://openai.com/index/introducing-codex/)
- [OpenAI: Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)
