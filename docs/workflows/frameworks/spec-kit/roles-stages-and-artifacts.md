---
audience: "mixed"
stage: "intermediate"
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
title: "Spec Kit：角色、阶段与产物"
description: "Spec Kit 的角色切面、阶段划分和核心产物。"
slug: "/workflows/frameworks/spec-kit/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "spec-kit"]
---

# Spec Kit：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。Spec Kit 的关键是三级产物链各司其职，不能互相替代。

## 角色切面

| 角色切面 | 主要责任 | 至少要确认什么 |
| --- | --- | --- |
| Request Owner | 定义目标、非目标和验收条件。 | 这件事为什么做，做到哪里算完成。 |
| Planner | 把 spec 转成可执行 plan 与任务拆解。 | 实施路径、风险和依赖是否说清。 |
| Implementer | 按任务包推进实现和验证。 | 当前任务是否按 plan 落地。 |
| Reviewer | 对照 spec 与 evidence 判断是否通过。 | 交付是否满足原始验收标准。 |

## 阶段总表

| 阶段 | 目标 | 主要 owner | 退出证据 |
| --- | --- | --- | --- |
| 写 spec | 明确目标、非目标、范围、约束和验收标准。 | Request Owner | spec 已被确认，不再靠口头补需求。 |
| 写 plan | 结合仓库现状确定实现方案、依赖和风险。 | Planner | plan 能回答“怎么做、改哪里、怎么验”。 |
| 拆 tasks | 把 plan 切成可执行、可验证的任务块。 | Planner / Implementer | tasks 能直接作为执行入口。 |
| 执行与验证 | 按任务推进代码改动，并回到 spec 验收。 | Implementer / Reviewer | verification summary 能映射回 spec。 |

## 核心产物

| 产物 | 最低应包含什么 | 谁来确认 |
| --- | --- | --- |
| spec | 目标、非目标、边界、约束、验收标准。 | Request Owner |
| plan | 仓库影响面、依赖、方案取舍、验证命令。 | Planner / Owner |
| tasks | 可执行步骤、输入输出、依赖顺序。 | Planner / Implementer |
| verification summary | 完成项、验证结果、偏差、deferred items。 | Reviewer |

## 交接规则

- spec 先过，再进入 plan；plan 先过，再进入 tasks。
- plan 必须建立在读过代码和仓库结构之后，不能空想。
- tasks 是执行入口，不应该重新定义需求。
- review 最终回到 spec 与验收标准，而不是只谈代码风格。
- 如果执行中发现边界变化，应回写 spec 或 plan，而不是偷偷在 tasks 里改需求。

## 最小证据包

- 一份可以让陌生 reviewer 看懂目标和边界的 spec。
- 一份能说明影响目录、关键依赖和验证方式的 plan。
- 一组带顺序和依赖关系的 tasks。
- 一份明确说明“哪些对照 spec 完成了，哪些没有”的总结。

## 常见塌陷点

- spec 写成抽象愿景，plan 只能继续猜。
- plan 没读仓库，tasks 一落地就重写。
- tasks 变成“想到什么做什么”的流水账。
- review 不回看 spec，最后 planning 产物全部失效。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：Spec Kit 最自然的落点就是 spec-first。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：plan 定稿后可把部分任务交给后台或云端执行。
- [BMAD](/docs/workflows/frameworks/bmad)：需要多角色和更完整治理时，BMAD 更合适。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果主要是 brownfield 高频小改动，OpenSpec 更轻。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你更缺日常 agent 操作框架而不是 spec 链，Superpowers 更贴近执行。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
