---
title: "Terminal-First Repo Pairing：流程与产物"
description: "Terminal-First Repo Pairing 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/terminal-first-repo-pairing/loop-and-artifacts"
sidebar_label: "流程与产物"
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

# Terminal-First Repo Pairing：流程与产物

Terminal-First Repo Pairing 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

- 任务目标、目录范围、允许执行的命令。
- 规则文件、审批策略、环境约束。
- 需要保留的手工检查点，例如 UI 或数据正确性。

## 输出

- 带命令证据的 patch。
- 清晰的 diff、验证结果和剩余风险。
- 必要时的 worktree、branch 或回滚建议。

## 标准步骤

1. **读规则文件**：先读取 AGENTS.md、CLAUDE.md、GEMINI.md 或其他 repo 规则，明确边界。
   产物：task contract
2. **说明计划与权限**：先说准备怎么做、要跑哪些命令、哪里需要审批。
   产物：execution plan
3. **小步执行**：边执行边看输出，必要时中断和缩小范围。
   产物：incremental diff
4. **跑命令验证并审 diff**：完成标准来自命令结果、diff 质量和人工审阅，而不是模型自评。
   产物：verified patch

## 验收证据

- 命令执行记录和关键输出摘要。
- 与规则文件一致的边界说明。
- 最终 diff review 结论和未覆盖风险。
