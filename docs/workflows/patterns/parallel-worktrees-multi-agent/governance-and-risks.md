---
title: "Parallel Worktrees / Multi-Agent：治理与风险"
description: "Parallel Worktrees / Multi-Agent 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/governance-and-risks"
sidebar_label: "治理与风险"
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
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

# Parallel Worktrees / Multi-Agent：治理与风险

Parallel Worktrees / Multi-Agent 一旦进入真实工程环境，问题从来不是“能不能生成代码”，而是权限、边界、验证和人工接管点是否足够清楚。治理写不清，执行越快越危险。

## 权限与边界

- 只能并行低耦合任务；高耦合热点应回到单线程 owner 驱动。
- 统一共享 spec 和规则文件，避免每条 lane 各自发明前提。
- 每条 lane 的权限、命令和环境要尽量隔离。

## 验证与 review

- 拆分标准要先由 owner 定，不应让多个 agent 各自理解任务边界。
- 每个 lane 要先完成自己的验证，再进入合流和集成测试。
- 最终回归必须回到统一 owner，而不是让各 lane 自己宣布完成。

## 失败模式

- 拆分不合理，最后在合流阶段把全部成本补回来。
- 多个 lane 改了同一份契约，冲突比串行更高。
- 没有 owner 统一 review，导致子任务各自都看似完成，但整体不可 merge。

## 缩减办法

- 先只并行两条 lane，而不是一次开五条。
- 把高耦合部分留给 owner 串行处理，外围任务再并行。
- 必要时先跑一个 dry-run 合流，检验拆分是否合理。
