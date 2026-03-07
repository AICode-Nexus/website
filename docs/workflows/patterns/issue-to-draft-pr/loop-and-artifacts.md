---
title: "Issue / Jira -> Draft PR：流程与产物"
description: "Issue / Jira -> Draft PR 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/issue-to-draft-pr/loop-and-artifacts"
sidebar_label: "流程与产物"
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
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

# Issue / Jira -> Draft PR：流程与产物

Issue / Jira -> Draft PR 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

- issue / Jira 链接、验收标准和禁止修改范围。
- 分支命名、PR 模板、CI 检查和 reviewer 规则。
- 平台权限、仓库访问和必要的环境变量声明。

## 输出

- 可追踪的分支、draft PR 与执行摘要。
- 与 issue 关联的验证结果和剩余风险说明。
- review 后的 merge、split 或 re-open 决策。

## 标准步骤

1. **把 issue 写到足够可委派**：补充背景、范围、验收、禁止事项和验证命令，让任务具备异步交付条件。
   产物：ready issue
2. **发给 agent 起分支**：由平台或控制面生成分支、读取上下文、执行任务并准备 draft PR。
   产物：working branch
3. **以 draft PR 回流**：把 diff、运行结果、剩余风险和任务摘要放回 PR，而不是只给一段聊天记录。
   产物：draft PR
4. **人工 review 与 merge**：由 owner 或 reviewer 最终判断是否合并、拆分或退回。
   产物：merged or returned PR

## 验收证据

- PR 描述里应能直接看到 issue、范围和验收映射。
- 验证结果要落回 PR，而不是只存在 agent 运行面板里。
- review comment 需要能回指具体风险和未完成项。
