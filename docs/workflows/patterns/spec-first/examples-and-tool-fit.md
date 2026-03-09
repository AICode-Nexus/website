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
title: "Spec-First：案例与工具组合"
description: "Spec-First 的代表案例，以及最适合搭配的工具或框架。"
slug: "/workflows/patterns/spec-first/examples-and-tool-fit"
sidebar_label: "补充：案例与工具"
sidebar_position: 9
tags: ["ai-coding", "workflow", "spec-first"]
---

# Spec-First：案例与工具组合

## 现在先做什么

- 想先看标准示例：去 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想先选默认工具组合：去 [Spec-First Tooling](/docs/workflows/patterns/spec-first/tooling)。
- 想先看 spec 定稿后如何进入执行：去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 代表案例

- 新功能跨多个模块，需要先对齐目标、非目标和验收标准。
- 涉及 schema、API、权限或迁移的任务，不能直接跳进实现。
- 多角色都会 review 同一个改动，先把需求和计划拆开审。

## 默认工具组合

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：适合把 spec、plan 和 task 链条固定下来。
- [BMAD](/docs/workflows/frameworks/bmad)：适合多角色 handoff 和更重的过程治理。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合 spec 定稿后进入正式执行栈。

## 常见误配

- 把 spec 当成长摘要，而不是执行前的边界合同。
- 还没定目标就急着拆任务，最后计划和执行同时返工。
- 写了 spec 却没有清晰 handoff，执行阶段又重新发明规则。

## 读完回哪里

- 想按标准例子开工：回 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想先选入口组合：去 [Spec-First Tooling](/docs/workflows/patterns/spec-first/tooling)。
- 想看 spec 定稿后如何进入执行栈：去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
