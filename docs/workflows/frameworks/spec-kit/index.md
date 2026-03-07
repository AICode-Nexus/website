---
title: "Spec Kit"
description: "Spec Kit 的定位、适用团队和默认进入方式。"
slug: "/workflows/frameworks/spec-kit"
sidebar_label: "概览"
tags: ["ai-coding", "workflow-framework", "spec-kit"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: true
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Spec Kit

Spec Kit 更像规格与计划产物链：用 spec、plan、tasks 先把需求和实施拆开，再交给 agent 或工程师执行。

## 这个框架解决什么

- 新功能、跨模块变更和容易跑偏的复杂任务。
- 需要先对齐目标和验收，但不想引入完整多角色制度的团队。
- 希望把 planning 产物标准化，又保留现有 repo 治理方式的组织。

## 默认进入方式

先挑一个本来就需要设计与实现分开的新功能，验证 spec -> plan -> tasks 是否能减少返工。

## 更适合谁

- 需求经常在实现阶段漂移，导致 review 只剩“补需求”。
- 你需要的是清晰 spec 和 task 拆解，而不是更多角色。
- 团队已经有 repo 规则和 CI，只差一个 planning 主线。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
