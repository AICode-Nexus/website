---
title: "Spec-First：治理与风险"
description: "Spec-First 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/spec-first/governance-and-risks"
sidebar_label: "治理与风险"
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

# Spec-First：治理与风险

Spec-First 一旦进入真实工程环境，问题从来不是“能不能生成代码”，而是权限、边界、验证和人工接管点是否足够清楚。治理写不清，执行越快越危险。

## 权限与边界

- spec 是边界合同，不是灵感板；大改动要回流到 spec。
- 权限默认收紧，只给完成当前阶段所需的最小命令集。
- review 时优先核对目标、范围和验收，而不是直接讨论写法细节。

## 验证与 review

- spec 定稿前必须明确谁能改目标、谁只能补实现细节。
- plan 定稿后再进入执行，避免边执行边发明范围。
- 最终 merge 仍要由 owner 按 spec 与 diff 做人工 review。

## 失败模式

- 计划写得很长，但没有被实际执行或验证，最后只剩文档负担。
- spec 太泛，导致实现阶段仍要临场发明边界。
- 团队把 spec-first 误用到所有小改动，流程成本失控。

## 缩减办法

- 先只交付核心 happy path，把迁移、回收和边缘优化延后。
- 把复杂 UI、数据层和运维改动拆成独立任务或独立 worktree。
- 先收紧到一个 repo、一个模块或一类角色的试点任务。
