---
title: AI Coding 学习路径
description: 面向个人工程师的 7 天、30 天和进阶路线图，帮助你从试用工具走到稳定工作流。
slug: /learning-paths
sidebar_label: 学习路径
tags: [ai-coding, learning-path, workflow]
track: cross-track
kind: guide
audience: individual
stage: starter
featured: true
---

# AI Coding 学习路径

## 背景

多数工程师不是不会用 AI，而是没有形成分阶段升级路线，所以会一直停留在“偶尔问一下”的状态。平台试了很多，真正能复用的动作却很少。

## 结论先行

第一阶段不要追求“最强 Agent”，而要先完成三件事：

1. 选一个主平台
2. 建一套最小可复用 workflow
3. 跑一轮带记录的真实任务

只有做到这三点，你后面学 memory、多 Agent、review 治理才有意义。

## 适用场景

- 第一次系统学习 AI coding
- 想知道先学什么最值
- 想把碎片化使用变成习惯化流程
- 想判断自己该进入哪个赛道继续学习

## 核心概念

### 7 天路线：先建立最小闭环

目标不是成为高手，而是跑通第一条完整闭环：选平台、设规则、做任务、跑验证、做复盘。

| 时间 | 焦点 | 当天产出 | 对应文档 |
| --- | --- | --- | --- |
| Day 1 | 选主平台 | 主平台和备用入口各 1 个 | [工具选择地图](/docs/tool-selection) |
| Day 2 | 搭环境 | rules、目录边界、最小校验回路 | [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup) |
| Day 3 | 写 contract | 1 份 bugfix contract | [Prompt Contracts](/docs/prompting-workflows/prompt-contracts) |
| Day 4 | 练 bugfix | 1 次最小修复实践 | [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows) |
| Day 5 | 练 refactor | 1 次行为不变重构 | [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows) |
| Day 6 | 练 test | 1 次补测试实践 | [Bugfix / Refactor / Test 工作流](/docs/prompting-workflows/bugfix-refactor-test-workflows) |
| Day 7 | 做复盘 | 失败清单、返工点、下一轮调整 | [7 天上手路线](/docs/playbooks/first-7-days-ai-coding) |

### 30 天路线：把偶发动作变成稳定栈

30 天不是继续刷产品，而是把你已经验证过的方法固定下来。

| 周次 | 焦点 | 关键问题 | 产出 |
| --- | --- | --- | --- |
| Week 1 | 固定入口 | 什么是主平台，什么只是备用工具 | 主平台决策说明 |
| Week 2 | 固定 workflow | 哪三类任务最适合先标准化 | bugfix/refactor/test 三套最小流程 |
| Week 3 | 固定评估 | 什么指标说明 AI 真有帮助 | 返工率、review 修补量、合并时间记录 |
| Week 4 | 固定栈 | 你的 IDE、CLI、rules、review 回路是什么 | 个人工程师栈说明 |

### 进阶路线：从个人效率走向交付能力

当你已经稳定跑过两到三周，再进入这些主题：

- [多 Agent 协作](/docs/prompting-workflows/multi-agent-collaboration)
- [质量门禁与 Review](/docs/team-delivery/quality-gates-and-review)
- [指标与风险](/docs/team-delivery/metrics-and-risk)
- [2026 年 3 月 AI Coding 的四个主线变化](/docs/insights/agentic-coding-patterns)

## 推荐做法

### 第一步：只选一个主平台

把 [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex) 读完后，先做一个 7 天试用承诺。不要每天换平台。

### 第二步：只练三类任务

第一阶段不要上来就让 Agent 负责大型迁移。先练：

- bugfix
- refactor
- test

### 第三步：所有动作都留痕

至少记录这三项：

- 完成时间
- 返工次数
- 最终 merge 前的人类修补量

## 常见错误

- 同时试 5 个工具，最后没有主工作流
- 只看 Daily Brief，不做任务级练习
- 把多 Agent 当成高级感，而不是任务分解方法
- 跳过规则与校验，直接让 Agent 改核心逻辑

## 延伸阅读

- [工具选择地图](/docs/tool-selection)
- [7 天上手路线](/docs/playbooks/first-7-days-ai-coding)
- [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)
- [提示词与工作流](/docs/prompting-workflows)
