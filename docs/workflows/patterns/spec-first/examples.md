---
title: "Spec-First 示例"
description: "通过一个结构性任务示例，说明 spec 如何承接范围、阶段和验证。"
slug: "/workflows/patterns/spec-first/examples"
sidebar_label: "示例"
sidebar_position: 3
tags: ["ai-coding", "workflow", "spec-first", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "solution-design"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-examples", "spec-first"]
estimated_time: 25
prerequisites: ["已阅读 runbook", "任务需要多个阶段", "验收要求明确"]
deliverable: "一个最小 spec 到阶段执行的完整示例"
---

# Spec-First 示例

## 前置条件

- 已读过 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 当前任务已经需要方案边界，而不是只需修一个点。

## 步骤

示例任务：为一个现有服务增加新的输入校验链和错误返回约定。

1. 先写最小 spec，明确输入输出和边界。
2. 拆成“接口层 / 校验层 / 测试层”三个阶段。
3. 每阶段只交付一个清晰产物。
4. 每阶段完成后记录验证结果。

## 验证

- spec 能驱动执行，而不是停留在抽象描述。
- 每阶段产物和验收都清楚。
- review 人可以按阶段判断风险。

## 结果

- 任务从一开始就有清晰阶段，不会在执行中不断返工。
- 每阶段都能独立 review，不需要等全部完成才判断风险。
- 如果中途暂停，下一位接手的人也知道做到哪一步。

## 下一步

- 看 [Spec-First Tooling](/docs/workflows/patterns/spec-first/tooling)。
- 看 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。
- 看 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)。
