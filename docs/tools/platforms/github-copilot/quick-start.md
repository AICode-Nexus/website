---
title: "GitHub Copilot 快速开始"
description: "用 GitHub Copilot 从一个清晰 issue 起步，完成第一次 issue 到 draft PR 的平台内闭环。"
slug: "/tools/platforms/github-copilot/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "github-copilot", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: true
domain: "tools"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "github-copilot"]
estimated_time: 20
prerequisites: ["已有 GitHub 仓库和 issue", "已有基础 PR 流", "知道本次任务的范围和验收"]
deliverable: "一个可 review 的最小 draft PR"
---

# GitHub Copilot 快速开始

## 这页适合什么场景

- 团队默认在 GitHub 或 Jira 里收任务、做 review、看 PR。
- 这次任务已经足够清晰，适合先交付一个最小 draft PR。
- 你要验证的是平台内协作闭环，而不是 IDE 里的补全体验。

## 前置条件

- 你已经有一个结构清晰的 issue，而不是一句模糊想法。
- 团队默认在 GitHub 上 review 和交付。
- 你已经看过 [GitHub Copilot 概览](/docs/tools/platforms/github-copilot)，知道它更像平台入口。

## 20 分钟交付目标

第一次不要追求完整 feature。目标只到这里为止：

- issue 已被补成可执行说明，而不是模糊意图。
- Copilot 先复述边界，再推进最小改动。
- 你手里有一个带验证说明和剩余风险的 draft PR。

## 推荐第一条 issue

第一次建议选这种任务：

- 已知 bug 的最小修复
- 一条缺失测试
- 一个不会牵动架构的小型文档或脚本修正

不要用第一次 quick start 试这些任务：

- 需求边界仍在变化的 feature
- 需要跨多个系统协调的改动
- 没有明确验收标准的“顺手优化一下”

## 步骤

### 第 1 步：先把 issue 写清楚

至少写清这五项：

- 目标是什么
- 范围到哪里为止
- 不能动什么
- 用什么验收
- 交付后谁来 review

第一次可以直接用这个最小模板：

```text
目标：
范围：
不要改：
验收：
交付物：
```

### 第 2 步：让 GitHub Copilot 按 issue 推进

第一次不要追求大任务，也不要只说“帮我做完”。优先让它按这个顺序推进：

1. 复述 issue 和边界。
2. 给出计划。
3. 完成最小改动。
4. 生成带验证说明的 draft PR。

可以直接要求它输出成这种结构：

```text
先复述 issue 的目标、范围、禁止修改区和验收方式。
然后给出最小执行计划，只推进第一轮最小改动。
最后生成 draft PR 说明，必须包含改动摘要、验证方式、已知风险和下一步建议。
```

### 第 3 步：只保留可 review 的结果

Draft PR 至少要有：

- 改动摘要
- 验证方式
- 已知风险

如果你想把这一套固定成团队交接线，直接搭配 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。

### 第 4 步：把“继续推进”也写成显式决定

第一次 quick start 的收尾不是立刻 merge，而是做一个明确判断：

- 这轮结果是否已经可 review
- 还缺什么验证
- 下一轮继续交给平台，还是切回本地仓库工具

如果你发现 PR 说明已经够清楚，但代码探索明显需要更深仓库上下文，就不要继续硬塞在平台里，及时切到 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start) 或 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 验收清单

第一次上手至少要满足这四条：

- issue、代码改动和 draft PR 对得上。
- PR 不是只有 diff，没有说明。
- 评审人能直接判断该不该继续。
- 你能明确说出下一轮是继续平台推进，还是切换入口。

## 常见失误

- issue 只有一句话，结果 Copilot 只能自己猜边界。
- 第一次就让它做整块 feature，最后得到一个很大但很难 review 的 PR。
- draft PR 里只有“已完成”，没有命令、截图、日志或剩余风险。
- 明明已经需要本地深潜，却还坚持让平台层承担全部探索。

## 下一步

- 回到 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)。
- 如果平台流里经常卡住，去 [GitHub Copilot 排错](/docs/tools/platforms/github-copilot/troubleshooting)。
- 如果你要推进更长链路执行，再看 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
