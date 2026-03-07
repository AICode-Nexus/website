---
title: "Issue / Jira -> Draft PR"
description: "Issue / Jira -> Draft PR 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/issue-to-draft-pr"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
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

# Issue / Jira -> Draft PR

把已经进入 GitHub 或 Jira 的清晰任务交给 agent 异步推进，最后以 draft PR 形式回到人工 review。

## 什么时候优先用它

- issue、Jira ticket 或 PR checklist 已经足够清晰的任务。
- 团队默认在 GitHub / Jira / review 流里协作，而不是口头同步。
- 可以接受异步交付，重视工作系统里的可追溯性。

## 什么时候先别用它

- 需要大量探索、实时讨论或反复试错的模糊问题。
- 没有 issue hygiene，连验收标准都写不清的团队。
- 高风险变更但无人负责最终收口的场景。

## 最小闭环

1. **把 issue 写到足够可委派**：补充背景、范围、验收、禁止事项和验证命令，让任务具备异步交付条件。
   产物：ready issue
2. **发给 agent 起分支**：由平台或控制面生成分支、读取上下文、执行任务并准备 draft PR。
   产物：working branch
3. **以 draft PR 回流**：把 diff、运行结果、剩余风险和任务摘要放回 PR，而不是只给一段聊天记录。
   产物：draft PR
4. **人工 review 与 merge**：由 owner 或 reviewer 最终判断是否合并、拆分或退回。
   产物：merged or returned PR

## 阶段与产物总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 把 issue 写到足够可委派 | 补充背景、范围、验收、禁止事项和验证命令，让任务具备异步交付条件。 | ready issue |
| 发给 agent 起分支 | 由平台或控制面生成分支、读取上下文、执行任务并准备 draft PR。 | working branch |
| 以 draft PR 回流 | 把 diff、运行结果、剩余风险和任务摘要放回 PR，而不是只给一段聊天记录。 | draft PR |
| 人工 review 与 merge | 由 owner 或 reviewer 最终判断是否合并、拆分或退回。 | merged or returned PR |

## 输入、输出与验收

### 输入

- issue / Jira 链接、验收标准和禁止修改范围。
- 分支命名、PR 模板、CI 检查和 reviewer 规则。
- 平台权限、仓库访问和必要的环境变量声明。

### 输出

- 可追踪的分支、draft PR 与执行摘要。
- 与 issue 关联的验证结果和剩余风险说明。
- review 后的 merge、split 或 re-open 决策。

### 验收证据

- PR 描述里应能直接看到 issue、范围和验收映射。
- 验证结果要落回 PR，而不是只存在 agent 运行面板里。
- review comment 需要能回指具体风险和未完成项。

## 默认人工接管点

- 任务没到“可委派”状态之前，不应该直接丢给后台 agent。
- draft PR 是 review 起点，不是终点，必须保留人工把关。
- 如果 PR 暴露出需求缺失，要回到 issue 层修，而不是让 reviewer 补需求。

## 推荐入口与下一步

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：最适合把 issue、PR 和 review 串成平台闭环。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合从本地探索转到后台分支执行。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合异步长任务和多分支执行。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
