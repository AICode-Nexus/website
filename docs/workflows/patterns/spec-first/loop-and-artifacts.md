---
title: "Spec-First：流程与产物"
description: "Spec-First 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/spec-first/loop-and-artifacts"
sidebar_label: "流程与产物"
tags: ["ai-coding", "workflow", "spec-first"]
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

# Spec-First：流程与产物

Spec-First 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

- 目标、非目标、业务背景和影响范围。
- 允许修改的目录、禁止触碰的区域和依赖约束。
- 验收标准、验证命令、人工检查点。

## 输出

- 规格说明、计划、任务拆解。
- 对照 spec 的代码改动与验证证据。
- 范围变化记录和未完成项说明。

## 标准步骤

1. **写目标与边界**：先把目标、非目标、影响面、约束和验收条件写成可 review 的 spec。
   产物：spec 草稿
2. **补实现计划**：在读完仓库上下文后，把任务拆成可验证的阶段和工作包。
   产物：plan 与 task list
3. **小步执行并对照 spec**：每次修改都回到 spec 和验收标准，避免实现漂移。
   产物：按阶段完成的 diff
4. **按验收标准验证**：把测试、构建、人工检查和风险说明映射回验收项。
   产物：verification packet

## 验收证据

- 每个验收点都要能映射到命令输出、截图或人工检查结果。
- 最终说明要指出哪些需求明确完成，哪些被延后或切分。
- 如果实现偏离 spec，必须记录原因和补充批准点。
