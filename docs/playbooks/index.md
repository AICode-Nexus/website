---
title: Playbooks
description: 把 AI coding 变成可执行流程：这里收录个人工程师最值得先掌握的上手路线和操作手册。
slug: /playbooks
sidebar_label: Playbooks 总览
tags: [ai-coding, playbook, workflow]
track: cross-track
kind: hub
audience: individual
stage: starter
featured: true
---

# Playbooks

## 这一类内容解决什么问题

Playbooks 不是概念解释，而是把你每天会遇到的 AI coding 任务拆成固定动作。

它主要解决 4 个问题：

- 我今天该先打开哪个入口，而不是在多个工具里来回试
- 我怎样把 bugfix、refactor、test 这些高频任务做成稳定流程
- 我怎样把 rules、prompt contract、终端校验和 review 串成一套个人工作栈
- 我怎样判断一套 AI coding 流程到底是在提效，还是只是让返工更快发生

## 谁应该先读

- 已经开始用 AI coding，但流程还比较随机的个人工程师
- 不想先读大量方法论，想先把动作固定下来的人
- 正准备给自己的 repo 补规则、补校验、补复盘机制的人

## 子主题地图

### 7 天上手路线

这是默认入口。目标不是在 7 天里把所有工具摸完，而是让你在 7 天内跑通一套最小可用工作流：

- 选主平台和备用入口
- 建立 rules 与 repo 边界
- 把 bugfix / refactor / test 练成标准动作
- 做一次完整实战并记录返工成本

入口文档：

- [7 天上手路线](/docs/playbooks/first-7-days-ai-coding)
- [学习路径](/docs/learning-paths)

### 个人工程师栈搭建

这部分负责把“会用工具”变成“有一套长期可维护的工作栈”。重点不是装多少插件，而是建立 5 个稳定层：

- 主平台
- 备用入口
- 规则系统
- 终端校验回路
- 周度复盘机制

入口文档：

- [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)
- [工具选择地图](/docs/tool-selection)

### 任务级 Workflow

Playbook 最终要落到任务级动作。你可以把下面这些文档看成 Playbooks 的上游知识：

- [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)
- [Bugfix / Refactor / Test Workflows](/docs/prompting-workflows/bugfix-refactor-test-workflows)
- [质量门禁与 Review](/docs/team-delivery/quality-gates-and-review)

## 推荐阅读顺序

### 路线 A：第一次系统搭建 AI coding 流程

1. [7 天上手路线](/docs/playbooks/first-7-days-ai-coding)
2. [工具选择地图](/docs/tool-selection)
3. [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)
4. [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)
5. [Bugfix / Refactor / Test Workflows](/docs/prompting-workflows/bugfix-refactor-test-workflows)

### 路线 B：已经在用工具，但质量波动较大

1. [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)
2. [质量门禁与 Review](/docs/team-delivery/quality-gates-and-review)
3. [指标与风险](/docs/team-delivery/metrics-and-risk)

## 精选文档入口

- [7 天上手路线](/docs/playbooks/first-7-days-ai-coding)：默认起点，优先级最高
- [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)：把工具、rules 和校验串起来
- [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)：让你的常见任务有稳定输入格式
- [工具对比总览](/docs/comparisons)：回到选型层面修正错误入口

## 使用原则

- Playbook 先求稳定，再求复杂
- 每增加一层自动化，都要补一层回退和验证
- 没有 review、test、build 的 AI coding 流程，不算完成

## 延伸阅读

- [趋势观察](/docs/insights)
- [团队与交付](/docs/team-delivery)
