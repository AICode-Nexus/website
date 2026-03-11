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

## 示例卡片

| 项目 | 本例内容 |
| --- | --- |
| 任务类型 | 为现有服务增加新的输入校验链和错误返回约定。 |
| spec 产物 | 目标、非目标、输入输出、验收。 |
| 阶段拆分 | 接口层 / 校验层 / 测试层。 |
| 最终交付 | 每阶段产物、验证结果、阶段间 handoff。 |

## 步骤

1. 先写最小 spec，明确输入输出、边界和非目标。
2. 拆成“接口层 / 校验层 / 测试层”三个阶段。
3. 每阶段只交付一个清晰产物，不混成一个大 patch。
4. 每阶段完成后记录验证结果和未决问题。
5. 下一阶段开始前，先确认前一阶段产物已经足以支撑继续推进。

## 这个示例里最重要的判断

- spec 不是摘要，而是约束执行的合同。
- 阶段不是为了形式化，而是为了让 review 和 handoff 变简单。
- 如果某阶段发现边界变化，先回 spec，不要偷偷在执行里改合同。

## 验证

- spec 能驱动执行，而不是停留在抽象描述。
- 每阶段产物和验收都清楚。
- review 人可以按阶段判断风险。
- 中途暂停时，下一位接手的人也知道做到哪一步。

## 下一步

- 看 [Spec-First Tooling](/docs/workflows/patterns/spec-first/tooling)。
- 看 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。
- 看 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)。
