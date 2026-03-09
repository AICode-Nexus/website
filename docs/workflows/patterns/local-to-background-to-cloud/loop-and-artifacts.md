---
audience: "advanced"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Local -> Background -> Cloud：流程与产物"
description: "Local -> Background -> Cloud 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/local-to-background-to-cloud/loop-and-artifacts"
sidebar_label: "补充：流程产物"
sidebar_position: 7
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
---

# Local -> Background -> Cloud：流程与产物

## 现在先做什么

- 想先跑标准 handoff：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想先看完整示例：去 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 想先选默认工具组合：去 [Local -> Background -> Cloud Tooling](/docs/workflows/patterns/local-to-background-to-cloud/tooling)。

## 最小产物清单

- 本地 discovery brief、目录边界、风险假设和验证命令。
- 后台执行说明、允许范围、预期输出和 owner。
- 平台收口时要看的 diff、日志、PR 检查项和最终判断。

## 交接时必须看见什么

- 本地阶段能说明为什么这件事适合交后台，而不是继续本地做。
- 后台阶段必须留下日志、diff 和验证结果，不能只留一句“完成”。
- 平台阶段要把本地与后台证据合成一页可 review 摘要。

## 最容易断裂的地方

- 本地探索没有产出结构化 brief，后台只是在放大噪音。
- 后台任务做完了，但没人负责最终收尾和合并判断。
- 本地、后台、云端三份上下文各写一份，最后互相对不上。

## 读完回哪里

- 想按主线执行：回 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想看标准 handoff 样例：去 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 想先定入口组合：去 [Local -> Background -> Cloud Tooling](/docs/workflows/patterns/local-to-background-to-cloud/tooling)。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
