---
title: "BMAD：角色、阶段与产物"
description: "BMAD 的角色切面、阶段划分和核心产物。"
slug: "/workflows/frameworks/bmad/roles-stages-and-artifacts"
sidebar_label: "角色阶段与产物"
tags: ["ai-coding", "workflow-framework", "bmad"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# BMAD：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。

## 角色切面

- Sponsor / Owner：定义业务目标和决策边界。
- Analyst / PM：把需求拆成明确问题、范围和故事。
- Architect：给出实现边界、关键技术判断和风险。
- Implementation Agent / Engineer：执行任务并回传证据。
- QA / Reviewer：做验证、风险检查和最终质量把关。

## 阶段

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 发现与目标对齐 | 先让业务目标、问题定义和范围边界稳定下来。 | brief 或目标说明 |
| 需求与故事拆解 | 把抽象需求转成可交付的故事、任务或 sprint 输入。 | PRD / stories |
| 架构与实施准备 | 明确技术方案、约束、依赖和验证计划。 | architecture / plan |
| 执行与验证 | 按故事或任务推进实现，并同步测试与 review。 | implementation evidence |
| 复盘与沉淀 | 把失败模式、经验和流程调整写回体系。 | retro / checklist update |

## 核心产物

- brief、PRD、architecture note、stories、task board。
- 验证清单、review 结论和复盘记录。
- 与仓库规则文件配套的审批、验证和风险说明。

## 交接点

- 从需求到架构，再到执行和 QA，都强调显式交接而不是口头理解。
- 每个阶段结束时都应产生可 review 的文档或检查单。
- 角色可以由同一人兼任，但交付边界仍应保留。
