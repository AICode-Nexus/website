---
audience: "advanced"
stage: "advanced"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "development-planning"
title: "BMAD：角色、阶段与产物"
description: "BMAD 的角色切面、阶段划分和核心产物。"
slug: "/workflows/frameworks/bmad/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "bmad"]
---

# BMAD：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。BMAD 这页最重要的不是记住名词，而是知道每个阶段交给下游之前必须交付什么。

## 角色切面

| 角色切面 | 主要责任 | 至少要拍板什么 |
| --- | --- | --- |
| Sponsor / Owner | 定义业务目标、边界和优先级。 | 目标是否值得做，哪些不做。 |
| Analyst / PM | 把抽象需求拆成问题、范围和故事。 | 故事拆分是否可交付。 |
| Architect | 说明实现边界、关键方案和风险。 | 哪些约束必须遵守。 |
| Implementation Agent / Engineer | 按任务包执行并回传证据。 | 当前交付是否满足方案和验证要求。 |
| QA / Reviewer | 对照需求和验证证据做质量把关。 | 是否可 merge，是否需要回退或补证据。 |

## 阶段总表

| 阶段 | 目标 | 主要 owner | 退出证据 |
| --- | --- | --- | --- |
| 发现与目标对齐 | 让业务目标、问题定义和范围边界稳定下来。 | Sponsor / Owner | brief 被 owner 确认。 |
| 需求与故事拆解 | 把抽象需求转成可交付故事和任务。 | Analyst / PM | stories 能对应真实交付单元。 |
| 架构与实施准备 | 明确技术方案、约束、依赖和验证计划。 | Architect | 方案 note 能回答“怎么做、为什么这样做、怎么验收”。 |
| 执行与验证 | 按故事推进实现，并同步测试与 review。 | Engineer / QA | 代码、测试和 review evidence 对齐。 |
| 复盘与沉淀 | 把失败模式、经验和流程调整写回体系。 | Owner / Reviewer | 复盘能指导下一次减法或扩展。 |

## 核心产物

| 产物 | 最低应包含什么 | 谁来确认 |
| --- | --- | --- |
| brief | 目标、范围、非目标、owner、成功标准。 | Sponsor / Owner |
| stories / PRD | 用户故事、边界、依赖、验收口径。 | Analyst / PM |
| architecture / plan | 实施思路、仓库影响面、风险、验证命令。 | Architect |
| implementation evidence | diff、测试结果、review 结论、待补项。 | Engineer / QA |
| retro / checklist update | 失败模式、流程删改、下轮试点建议。 | Owner / Reviewer |

## 交接规则

- 上一阶段没有明确 owner、范围和验收，就不要把任务往下游推。
- 角色可以由同一人兼任，但交接证据不能省，否则只是在脑子里切换帽子。
- stories 必须能落到仓库里真实的目录、模块或交付边界，不能只停留在概念层。
- architecture note 必须写明验证命令和风险，不然执行阶段只会继续猜。
- QA / review 阶段要对照前面产物做闭环，而不是只看代码风格。

## 最小证据包

- 一份能追溯到 owner 决策的目标说明。
- 一份可对应 issue、story 或任务板的拆分结果。
- 一份包含依赖、风险和验证命令的方案说明。
- 一份执行证据摘要，说明做了什么、怎么测、还有什么没做。
- 一份复盘，说明这套框架下次该保留什么、删除什么。

## 常见塌陷点

- 角色名很多，但所有决定都在聊天里临时做掉。
- stories 看起来完整，却没有映射到真实仓库边界。
- 方案 note 只写“建议这样做”，不写验证和退出条件。
- QA 只在最后看 PR，前面的 handoff 证据全部缺失。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：大多数 BMAD 任务最终都应落回先定边界、再执行的主线。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：在故事清晰后再把低耦合子任务并行化。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要缺的是 spec -> plan -> tasks 的产物链，Spec Kit 更轻。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果你主要是 brownfield 的高频小改动，OpenSpec 更省维护成本。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你需要的是日常 agent 操作框架，而不是团队角色制度，Superpowers 更贴近日常执行。

## 来源

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
