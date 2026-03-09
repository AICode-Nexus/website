---
audience: "mixed"
stage: "intermediate"
featured: true
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "tech-selection"
title: "VS Code Agents"
description: "VS Code Agents 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/control-planes/vscode-agents"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "vscode-agents"]
---

import {LearningResources} from '@site/src/components/docs';

# VS Code Agents

VS Code Agents 更合理的定位不是“所有能力都塞进编辑器”，而是把本地探索、background agents、浏览器工具和编辑器内审阅放进同一个控制面。

## 现在先做什么

- 第一次跑通控制面闭环：去 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 想固定高频控制面 SOP：去 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks)。
- 想直接进入默认主线：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 60 秒定位

如果团队已经把 VS Code 当默认编辑器，这个入口很自然。它适合先在本地读代码、跑命令、缩小问题面，再把明确任务交给后台 agent，最后回到编辑器或 PR 系统做审阅。

它不该被当成“只要在编辑器里就能解决一切”的入口。真正决定它是否合理的，是本地与后台的职责边界、何时必须人工接管，以及证据是否能回到 repo 或 PR，而不是只留在编辑器面板里。

## 默认进入顺序

1. 先用 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start) 跑通本地和后台最小闭环。
2. 再用 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks) 固定控制面里的高频 handoff。
3. 然后进入 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 或 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
4. 长期使用前再补 [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices) 和 [VS Code Agents 排错](/docs/tools/control-planes/vscode-agents/troubleshooting)。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 主控制面 | 你希望把本地探索、后台执行和编辑器审阅放在一条线上。 | 先把 VS Code Agents 当控制面，再用平台层收口 review。 |
| 任务形状 | 先本地读代码和收敛边界，再交后台 agent 继续执行。 | 先跑 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)。 |
| 团队约束 | 团队能统一在 VS Code 上协作，并愿意写清 handoff 边界。 | 先固定 repo 规则和人工接管点，再扩大控制面覆盖面。 |
| 退出信号 | 团队无法统一编辑器栈，或真正主系统其实在 GitHub 平台。 | 一旦出现这些信号，就优先评估 [GitHub Copilot](/docs/tools/platforms/github-copilot)。 |

## 默认人工接管点

- 本地探索必须输出结构化 brief，不能把模糊问题直接推给后台。
- 后台 agent 改动要回到 diff、日志和验证结果，不能只停留在任务面板。
- 高风险目录和高权限动作必须明确 owner，不要把“控制面统一”误解为“自动托底”。

## 官方依据

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)

## 下一步怎么读

- 想直接上手：去 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 想按默认主线跑任务：去 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)。
- 想看真实本地到后台交接：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)。
- 想看平台与执行栈怎么分工：去 [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/tools/compare/github-copilot-vs-vscode-agent-vs-openai-codex)。

<LearningResources
  tool="VS Code Agents"
  description="如果你已经确认这类入口值得继续深入，下面这些课程和公开视频可以直接补齐操作层细节。"
/>
