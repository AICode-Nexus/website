---
title: Vibe Working：从 Vibe Coding 到可交付团队工作流
description: 把灵感驱动的 AI coding 升级成可交付、可验证、可协作的团队工作流，避免“能写出来”却交付不稳。
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

# Vibe Working：从 Vibe Coding 到可交付团队工作流

## 背景

- 事实：GitHub issue [#4 `聊一聊vibe working`](https://github.com/AICode-Nexus/website/issues/4) 由 `trsoliu` 于 `2026-03-25 02:41:23 UTC` 创建，正文是“从 vibe coding 到聊一聊 vibe working”。
- 事实：截至 `2026-03-25 14:26:00 +08:00` 的 issue 快照，这条 issue 当前状态为 Open，且仓库内还没有明确对应的中文方案页。
- 推断：读者要的已经不是“AI 帮你写点代码”的轻量体验，而是想知道团队怎么把这种生成式节奏收成稳定交付链。

## 结论先行

如果 `vibe coding` 回答的是“我能不能更快做出东西”，那 `vibe working` 回答的就是“团队能不能更稳地把东西交出去”。

真正的差别不在模型更强，而在工作流有没有补齐下面这 5 层：

1. 目标合同：这次任务到底要交什么，不交什么。
2. 执行边界：哪些能让 agent 自主做，哪些必须有人审批。
3. 验证证据：命令、截图、日志、测试和风险说明是不是成套交付。
4. 协作接口：需求、设计、开发、评审、上线怎么 handoff。
5. 复盘机制：哪些做法要固化进模板、runbook 和规则文件。

没有这 5 层，`vibe coding` 很容易停留在“今天很快”；有了这 5 层，才开始接近“长期可复制的 vibe working”。

## 什么情况下该从 Vibe Coding 升级到 Vibe Working

下面这些信号一旦反复出现，就说明你不能只靠个人手感了：

- 同一个任务每次都要重新解释范围和验收。
- agent 能很快改出结果，但 reviewer 很难判断有没有真的收口。
- 团队越来越依赖截图式演示，却缺少命令、测试和回滚说明。
- 一旦任务跨越设计、代码、文档、发布，就没人说得清下一棒该交给谁。
- 经验只留在聊天记录里，没有回流到 [`提示词合同`](/docs/workflows/prompt-contracts)、[`异步 Agent 交付链`](/docs/workflows/async-agent-delivery) 或团队规则文件。

## Vibe Coding 和 Vibe Working 到底差在哪

| 维度 | Vibe Coding | Vibe Working |
| --- | --- | --- |
| 核心目标 | 快速做出可见结果 | 稳定交付可验证结果 |
| 默认单位 | 单人会话 | 团队任务链 |
| 成功标准 | “看起来能跑” | “有证据证明可交付” |
| 常见输入 | 模糊想法、即时 prompt | 明确 brief、边界、验收、风险 |
| 常见输出 | demo、片段、草稿 | PR、文档、截图、测试、handoff |
| 风险来源 | 想法飘、返工多 | 治理不足会让速度反噬稳定性 |

一句话说，`vibe coding` 更像灵感驱动的原型生产，`vibe working` 更像把灵感纳入工程操作系统。

## 一条最小可执行的 Vibe Working 交付链

### 1. 先把任务写成可委派合同

进入实现前，先回答 4 个问题：

- 这次要交付什么页面、接口、文档或验证结果。
- 哪些内容明确不做，避免范围膨胀。
- 成功要靠哪些命令、截图、测试或审阅结论来证明。
- 哪些地方一旦动错，必须有人审批。

如果这 4 个问题写不清，先不要追求“让 agent 自主完成”。

### 2. 再决定执行模式

不是所有任务都该一上来走多 agent。更稳的分流通常是：

- 单文件或局部修复：先走 [`Bugfix / Refactor / Test`](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 有明确 issue / Jira 合同：优先走 [`Issue / Jira -> Draft PR`](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 长任务或多 lane：再升级到 [`多 Agent 协作`](/docs/workflows/multi-agent-collaboration)。

### 3. 用证据包收口，而不是用一句“应该好了”

最小证据包通常至少要有：

- 运行命令与结果
- 关键截图或录屏
- 风险与未覆盖项
- 对应文档或规则更新

如果团队只保留最后一句结论，下一次几乎一定会重做。

## 团队里最值得先固定的 4 个资产

### 1. 任务 brief 模板

让所有人都按同一张表写目标、非目标、风险和验收，不再靠口头补充。

### 2. 验证模板

把 `Verification / Artifacts / Risks` 固定成 PR 或 handoff 的默认结构，减少 reviewer 猜测。

### 3. 规则文件

把 repo 的稳定约束放进 `AGENTS.md`、`CLAUDE.md` 或 team guide，而不是散落在聊天历史里。

### 4. 复盘入口

每次出现“这次明明做成了，下次还是重复踩坑”，就把经验写回 docs、workflow 或模板页。

## 一个可直接落地的团队节奏

| 阶段 | 团队动作 | 产物 |
| --- | --- | --- |
| 任务进入 | 写 brief、非目标和验收 | issue、spec、task contract |
| 执行中 | 选默认 workflow，必要时拆 lane | 实现记录、命令日志、阶段结论 |
| 收口前 | 跑验证、补截图、列风险 | Verification、Artifacts、Risks |
| 交接时 | 明确下一棒和阻塞项 | PR 描述、handoff、review comment |
| 复盘后 | 把经验回流到模板与规则 | docs、runbook、rules |

这张表的意义不是增加流程，而是减少隐性成本。真正拖慢团队的通常不是“多写一个模板”，而是每次都从零解释一次。

## 常见误区

### 误区 1：把 Vibe Working 理解成“让 agent 做更多”

真正的问题不是做更多，而是有没有把范围、边界和验证收紧。

### 误区 2：把文档当额外负担

如果文档只在任务结束后补一份总结，当然会觉得重。更稳的做法是让 brief、验证和 handoff 直接服务当前任务。

### 误区 3：只学工具，不固化团队接口

工具会换，但任务合同、验证证据和 handoff 结构会长期复用。

## 推荐动作

- 如果你现在还停留在“谁 prompt 写得好谁就跑得快”，先补任务合同和验证模板。
- 如果你已经开始多 agent 或异步执行，优先固定 [`异步 Agent 交付链`](/docs/workflows/async-agent-delivery) 里的 handoff 节点。
- 如果你在 GitHub issue / PR 协作，优先把任务入口收成 [`Issue / Jira -> Draft PR`](/docs/workflows/patterns/issue-to-draft-pr/runbook) 这类明确主线。

## 相关阅读

- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [提示词合同](/docs/workflows/prompt-contracts)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
- [多 Agent 协作](/docs/workflows/multi-agent-collaboration)

## Sources

- [GitHub Issue #4: `聊一聊vibe working`](https://github.com/AICode-Nexus/website/issues/4)
- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [提示词合同](/docs/workflows/prompt-contracts)
- [异步 Agent 交付链](/docs/workflows/async-agent-delivery)
