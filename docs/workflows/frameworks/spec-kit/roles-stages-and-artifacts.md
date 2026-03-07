---
title: "Spec Kit：角色、阶段与产物"
description: "Spec Kit 的角色切面、阶段划分和核心产物。"
slug: "/workflows/frameworks/spec-kit/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "spec-kit"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Spec Kit：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。

## 角色切面

- Request Owner：定义目标、非目标和验收条件。
- Planner：把 spec 补成可执行计划与任务拆解。
- Implementer：按照任务包推进实现和验证。
- Reviewer：对照 spec 与 evidence 判断是否通过。

## 阶段总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 写 spec | 明确目标、非目标、范围、约束和验收标准。 | spec |
| 写 plan | 结合仓库现状确定实现方案、依赖和风险。 | plan |
| 拆 tasks | 把 plan 切成可执行、可验证的任务块。 | tasks |
| 执行与验证 | 按任务推进代码改动，并回到 spec 验收。 | verification summary |

## 核心产物

- spec、plan、tasks 三级产物。
- 与任务对应的命令、验证结果和范围变更说明。
- 必要时的后续拆分或 deferred items。

## 交接点

- spec 先过，再进入 plan；plan 先过，再进入 tasks。
- tasks 是执行入口，不应该重新定义需求。
- review 最终回到 spec 与验收标准，而不是只谈代码风格。

## 角色和产物为什么要一起看

如果角色只停留在名称层，而产物没有固定下来，最终执行时还是会回到“谁想起什么就补什么”的状态。把角色、阶段和产物绑在一起看，才有可能让不同人对同一个框架产生相同预期。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：Spec Kit 最自然的落点就是 spec-first。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：plan 定稿后可把部分任务交给后台或云端执行。
- [BMAD](/docs/workflows/frameworks/bmad)：需要多角色和更完整治理时，BMAD 更合适。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果主要是 brownfield 高频小改动，OpenSpec 更轻。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你更缺日常 agent 操作框架而不是 spec 链，Superpowers 更贴近执行。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
