---
title: "Terminal-First Repo Pairing：治理与风险"
description: "Terminal-First Repo Pairing 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/terminal-first-repo-pairing/governance-and-risks"
sidebar_label: "治理与风险"
tags: ["ai-coding", "workflow", "terminal-first-repo-pairing"]
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

# Terminal-First Repo Pairing：治理与风险

Terminal-First Repo Pairing 一旦进入真实工程环境，问题从来不是“能不能生成代码”，而是权限、边界、验证和人工接管点是否足够清楚。治理写不清，执行越快越危险。

## 权限与边界

- 先收紧权限，再逐步放开，而不是默认全放开。
- 危险动作要显式声明，不能在执行过程中偷偷发生。
- 工作区脏状态、已有变更和用户手改内容必须被尊重。

## 验证与 review

- 高风险命令、依赖变更和权限放大前必须显式审批。
- 任何大改动都要在 diff 可读的前提下推进，不宜一次性倾倒大 patch。
- 最终仍由人决定验证是否充分、是否值得 merge。

## 失败模式

- 把 terminal-first 当成“自动化万能入口”，忽略视觉和业务验证。
- 权限放太大，导致 agent 顺手改出主线之外的问题。
- 过度依赖命令成功，忽略了代码可维护性和评审质量。

## 缩减办法

- 优先从只读探索、单模块修复和脚本化任务起步。
- 高风险任务先切 worktree，再逐步放开更多命令。
- 视觉回归和产品决策始终保留人工检查。
