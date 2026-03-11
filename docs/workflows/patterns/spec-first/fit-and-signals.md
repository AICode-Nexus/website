---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "solution-design"
title: "Spec-First：适用信号与边界"
description: "什么时候优先用 Spec-First，什么时候不要用。"
slug: "/workflows/patterns/spec-first/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "spec-first"]
---

# Spec-First：适用信号与边界

Spec-First 不是“任何任务都先写文档”，而是“需求边界如果不先定，后面执行和 review 就会反复返工”。它最值钱的场景，是目标、非目标和验收标准需要在编码前被明确谈清。

## 现在先做什么

- 想直接按 spec 主线执行：去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想先看完整示例：去 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想先看 spec 定稿后怎么进入执行：去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 快速判断表

| 判断点 | 适合上这条主线 | 更该切走的时候 |
| --- | --- | --- |
| 需求状态 | 边界模糊，稍不注意就会扩范围。 | 只是热修、文案或单点配置修正。 |
| 参与角色 | 多个角色都要 review 同一个改动。 | 只有一个 owner，且边界已经清楚。 |
| 验收方式 | 不先写验收就无法判断是否完成。 | 任务已经有现成稳定回归命令。 |
| 目标 | 想先对齐目标、非目标和阶段产物。 | 只是一次性试探，不准备沉淀。 |

## 什么时候该上

- 需求边界模糊，稍不注意就会在实现阶段扩边界。
- 多个角色会 review 同一个改动，需要先对齐目标和非目标。
- 如果不先列验收标准，后续很难判断 agent 是否真的完成。
- 这轮工作的主要风险来自“理解偏差”，不是“执行速度不够”。

## 什么时候别上

- 生产事故热修、单点配置修正或纯文案修订。
- 团队没有基本验证命令，也没有人维护文档产物。
- 只打算做一次性探索，不准备沉淀长期流程。
- 需求已经收敛，只差进入执行和验证。

## 常见切换条件

- 如果任务降级成局部修复，回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果任务要跨更多角色和更重审批链，可切到 [BMAD](/docs/workflows/frameworks/bmad)。
- 如果 spec 已定稿，直接回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 进入执行。
- 如果定稿后执行很长，补看 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 开始前自测

- 你能不能分别写出目标、非目标和验收。
- 你能不能指出这轮最可能引起歧义的两三个点。
- 如果今天不写 spec，后面最可能返工在哪一段。
- 定稿后有没有明确执行入口，而不是写完又重开一套话术。

## 读完回哪里

- 想直接按 spec 主线执行：回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想看标准例子：去 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想看 spec 定稿后如何进入执行栈：去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
