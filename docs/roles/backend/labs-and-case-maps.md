---
title: 演练与案例地图
description: 把后端训练阶段映射到真实演练题、推荐工作流、案例入口和验收产物，方便按场景开练。
slug: /roles/backend/labs-and-case-maps
sidebar_label: 演练与案例地图
tags: [ai-coding, backend, labs]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 演练与案例地图

训练路线告诉你先练什么，模板页告诉你怎么写输入，但真正让团队形成肌肉记忆的，还是一组可以反复执行的演练题。这页把后端培训拆成 4 类典型演练，每类都给出任务形状、推荐工作流、交付产物和适合对照的现有案例。

## 怎么使用这页

- 培训负责人可以按这里的顺序安排 workshop、pairing 或 code review 演练。
- 个人学习时，不要一次做完全部演练，先挑与你当前工作最接近的一题。
- 每次演练都必须保留产物，不接受“只讲思路不落地”。

## 演练一：接口契约收敛

### 任务形状

你需要为一个已有接口补齐 contract，或者为一个新接口定义请求/响应、错误码和鉴权边界，但真实实现还没有完全展开。

### 推荐工作流

- [Spec-First](/docs/workflows/patterns/spec-first/runbook)
- [API 与契约](/docs/roles/backend/api-and-contracts)
- [Prompt Contracts](/docs/workflows/prompt-contracts)

### 交付产物

- OpenAPI 或等价 schema。
- 成功与失败样例 payload。
- 鉴权、兼容性和调用方约束说明。

### 验收标准

- 前端或测试在不问作者的情况下，也能理解接口行为和错误结构。
- reviewer 讨论的是 contract 设计，而不是“这段 controller 大概是什么意思”。

### 适合对照的案例

- [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification)
- [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff)

## 演练二：schema 与异步边界

### 任务形状

你需要做一次 schema 变更、数据回填、缓存策略调整，或者接入一个带幂等与重试要求的外部服务。

### 推荐工作流

- [Spec-First](/docs/workflows/patterns/spec-first/runbook)
- [数据与存储](/docs/roles/backend/data-and-storage)
- [服务集成与异步任务](/docs/roles/backend/services-and-integrations)

### 交付产物

- migration 与回滚说明。
- backfill 或补偿计划。
- adapter 边界、重试与死信策略。
- 风险说明和上线关注点。

### 验收标准

- 作者能在 merge 前说明回滚方式，而不是上线后再想。
- 缓存、队列、Webhook 和 provider 失败路径不再被当作“后面再补”。

### 适合对照的案例

- [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)
- [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)

## 演练三：最小修复与验证证据

### 任务形状

你已经有一个明确 bug 或局部重构目标，需要在尽量小的改动范围内修复问题，并把验证证据带回评审。

### 推荐工作流

- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)
- [质量门禁与测试](/docs/roles/backend/quality-and-testing)

### 交付产物

- 最小 patch。
- lint、type-check、unit/integration 或 smoke 结果。
- 剩余风险与未覆盖说明。

### 验收标准

- 改动范围没有顺手膨胀。
- reviewer 能直接看到“怎么复现、怎么验证、现在还剩什么风险”。

### 适合对照的案例

- [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop)
- [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)

## 演练四：发布与跨团队 handoff

### 任务形状

你需要把一个已经实现的后端改动，真正交到联调、发布和运行阶段，包括日志、trace、告警、回滚和协作说明。

### 推荐工作流

- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook)
- [观测性与运维协作](/docs/roles/backend/observability-and-operations)
- [交付检查表](/docs/roles/backend/delivery-checklists)

### 交付产物

- 发布检查单。
- request ID / trace / metrics 方案。
- 给前端、测试、运维的 handoff 说明。
- 灰度与回滚条件。

### 验收标准

- 出问题时，团队知道先看哪条告警和先回滚哪层制品。
- 联调和发布说明不再依赖口头传达。

### 适合对照的案例

- [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)
- [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification)

## 推荐带练顺序

| 周次 | 优先演练 | 主要目标 | 最低交付物 |
| --- | --- | --- | --- |
| 第 1 周 | 接口契约收敛 | 学会把接口边界写清 | contract + payload 示例 |
| 第 2 周 | schema 与异步边界 | 学会提前说明数据与失败恢复 | migration/backfill/adapter 方案 |
| 第 3 周 | 最小修复与验证证据 | 学会小步改动与证据回传 | patch + 验证结果 |
| 第 4 周 | 发布与跨团队 handoff | 学会把改动交到生产与协作链路 | 发布说明 + handoff 包 |

## 带练时重点盯什么

- 输入是否足够清晰，还是作者在让 AI 猜需求。
- 改动是否越界，是否开始顺手做无关重构。
- 验证证据是否和改动风险真正对应。
- handoff 是否写成了别人可直接消费的文档，而不是作者自己的备注。

## 下一步

- 想回到阶段化训练：去 [培训路线](/docs/roles/backend/training-roadmap)。
- 想把演练结果收口成统一验收：去 [交付检查表](/docs/roles/backend/delivery-checklists)。
- 想直接复制输入和 PR 模板：去 [模板与交付资产](/docs/roles/backend/templates-and-handoffs)。
- 想给每次演练打分和做复盘：去 [能力评估矩阵](/docs/roles/backend/assessment-rubric)。
- 想先确认每类演练该配什么工具入口：去 [工具匹配与选型](/docs/roles/backend/tool-fit-and-selection)。
