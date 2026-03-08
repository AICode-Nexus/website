---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Issue / Jira -> Draft PR：流程与产物"
description: "Issue / Jira -> Draft PR 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/issue-to-draft-pr/loop-and-artifacts"
sidebar_label: "流程与产物"
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
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

## 阶段与产物总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 把 issue 写到足够可委派 | 补充背景、范围、验收、禁止事项和验证命令，让任务具备异步交付条件。 | ready issue |
| 发给 agent 起分支 | 由平台或控制面生成分支、读取上下文、执行任务并准备 draft PR。 | working branch |
| 以 draft PR 回流 | 把 diff、运行结果、剩余风险和任务摘要放回 PR，而不是只给一段聊天记录。 | draft PR |
| 人工 review 与 merge | 由 owner 或 reviewer 最终判断是否合并、拆分或退回。 | merged or returned PR |

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

## 最容易断裂的地方

- 任务没到“可委派”状态之前，不应该直接丢给后台 agent。
- draft PR 是 review 起点，不是终点，必须保留人工把关。
- issue 太空，导致 agent 只能胡猜并把噪音带进 PR。

## 下一步怎么读

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：最适合把 issue、PR 和 review 串成平台闭环。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合从本地探索转到后台分支执行。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合异步长任务和多分支执行。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
