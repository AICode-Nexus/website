---
title: "Local -> Background -> Cloud 示例"
description: "通过一个从本地定位问题到后台执行再到 PR 收口的例子，说明三层 handoff 如何连成一线。"
slug: "/workflows/patterns/local-to-background-to-cloud/examples"
sidebar_label: "示例"
sidebar_position: 3
tags: ["ai-coding", "workflow", "local-to-background-to-cloud", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "advanced"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-examples", "local-to-background-to-cloud"]
estimated_time: 30
prerequisites: ["已阅读 runbook", "本地探索与后台执行可分开", "最终收口在平台里完成"]
deliverable: "一个从本地 brief 到后台结果再到平台审阅的完整示例"
---

# Local -> Background -> Cloud 示例

## 前置条件

- 已阅读 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 任务可以分成 discovery 与 execution 两段。
- reviewer 能在平台里完成最终判断。

## 示例卡片

| 项目 | 本例内容 |
| --- | --- |
| 任务类型 | 修复一个生产环境偶发失败的导出接口，并补回归测试。 |
| 本地产出 | discovery brief、根因、允许修改范围。 |
| 后台产出 | 日志、diff、测试结果。 |
| 平台产出 | PR 说明、review 结论、最终合并判断。 |

## 步骤

1. 本地阶段先复现问题、读日志、收敛根因，并写 discovery brief。
2. 把“允许改哪些目录、需要补哪些测试、必须回传哪些命令结果”交给后台执行。
3. 在平台里查看后台分支、测试日志和 diff。
4. owner 合并 discovery brief 与后台结果，准备 PR 说明并给 reviewer 判断。

这个例子里：

- 本地探索适合 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)
- 后台执行适合 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- 最终 PR 收口适合 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)

## 这个示例里最重要的判断

- 本地阶段不是做实现，而是做 discovery 和定界。
- 后台阶段不是重新理解需求，而是接着推进已收敛部分。
- 平台阶段不是只看状态，而是承担正式 review 和人工判断。

## 验证

- discovery brief 足够清楚，后台不需要重新理解任务。
- 后台结果包含真实日志、diff 和命令输出。
- 平台阶段不是纯展示，而是能真正支持 review 与判断。
- 三层之间的 handoff 没有丢失关键上下文。

## 结果

- 本地阶段承担理解问题和缩边界的工作。
- 后台阶段承担长时间执行和持续推进。
- 平台阶段承担审阅、交接和最终合并。

## 下一步

- 去看 [Local -> Background -> Cloud Tooling](/docs/workflows/patterns/local-to-background-to-cloud/tooling)。
- 去看 [Local -> Background -> Cloud 风险与切换条件](/docs/workflows/patterns/local-to-background-to-cloud/pitfalls)。
- 如果任务已经需要多条并行 lane，再切到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
