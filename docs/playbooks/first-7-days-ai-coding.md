---
title: 7 天上手路线
description: 面向个人工程师的 7 天 AI coding 路线：每天解决一个关键问题，快速跑通第一套可复用工作流。
slug: /playbooks/first-7-days-ai-coding
sidebar_label: 7 天上手路线
tags: [ai-coding, playbook, beginner]
track: cross-track
kind: playbook
audience: individual
stage: starter
featured: true
pillar: workflows
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# 7 天上手路线

## 目标

在 7 天内搭出一套能真正服务日常开发的 AI coding 工作流，并留下可复用的规则、记录和复盘材料。

## 输入条件

- 你已有一个日常使用的代码仓库
- 你愿意固定一个主平台试用 7 天
- 你可以接受记录失败和复盘
- 你会选取小而明确的真实任务，而不是一上来就做大型迁移

## 步骤

### Day 1：选主平台

目标：确定一个主平台和一个备用入口。

动作：

- 读 [工具选择地图](/docs/tool-selection)
- 读 [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex)
- 写下你的初始判断：为什么选它作为默认入口

当天产出：

- 1 个主平台
- 1 个备用入口
- 1 段不超过 150 字的选择理由

### Day 2：搭环境

目标：把规则和边界写清楚。

动作：

- 配置 repo rules 或等价规则文件
- 标出禁止修改目录
- 确认最小校验回路：lint、test、build 里至少有一个能稳定跑

当天产出：

- 规则文件草案
- 目录边界说明
- 最小验证命令列表

### Day 3：写第一版 contract

目标：把 prompt 从聊天变成任务合同。

动作：

- 读 [Prompt Contracts](/docs/workflows/prompt-contracts)
- 为一个 bugfix 写第一版 contract
- 明确输入、输出、边界和验收条件

当天产出：

- 1 份 bugfix contract

示例模板：

```text
任务：修复一个已知 bug
范围：仅限 src/auth 和 tests/auth
不要做：不要改动数据库 schema，不要顺手重构其他模块
输出：给出变更说明、关键 diff 点、验证结果
验收：lint 通过，相关测试通过，行为与 issue 描述一致
```

### Day 4：跑一次 bugfix workflow

目标：完成一次“定位 -> 最小修复 -> 验证”的完整闭环。

动作：

- 选择一个可复现的真实 bug
- 只让 agent 做一件事：先定位原因，再做最小修复
- 跑验证并记录返工点

当天产出：

- 1 个真实 bugfix 记录
- 1 份失败模式笔记

### Day 5：跑一次 refactor workflow

目标：在不改变行为的前提下做一次小型结构优化。

动作：

- 选择一个小模块做结构整理
- 明确“不改变行为”是第一约束
- 要求 agent 给出改动理由和风险点

当天产出：

- 1 次小型 refactor 记录
- 1 个“哪些改动不该交给 agent”的清单

### Day 6：跑一次 test workflow

目标：建立“先定义覆盖目标，再补测试”的手感。

动作：

- 选一个已有逻辑但覆盖不足的模块
- 明确要覆盖哪些分支和边界
- 让 agent 先提测试计划，再写测试

当天产出：

- 1 组新增测试
- 1 份覆盖目标说明

### Day 7：复盘并固定下一轮动作

目标：决定这套方法是否值得继续。

动作：

- 统计本周 3 个任务的完成时间
- 统计返工次数和 review 前人工修补量
- 写下“继续保留、需要调整、暂不再用”的三类结论

当天产出：

- 一页复盘
- 下一轮保留的主平台与 workflow 组合

## Prompt / Agent 合同

这一周统一遵守四条规则：

- 每天只练一类任务
- 明确输入、输出和验收条件
- 所有改动都要经过 lint、test 或等价验证
- 遇到越界修改时，先缩小范围，不要继续追加指令硬修

## 校验方式

至少记录这四个指标：

- 从开始到可提交状态的总时间
- 返工次数
- 最终人工修补量
- 需要重复解释上下文的次数

## 风险与失败模式

- 一开始就选太复杂任务
- 每天换平台，导致没有可比性
- 不写复盘记录，只凭印象判断
- 让 Agent 同时修 bug、重构和补测试

## 下一步

<RelatedReadings
  title="继续阅读与补充路径"
  description="这篇是入门执行路线。跑完 7 天之后，应该把个人栈、默认维护流和学习路径补成长期机制。"
  items={[
    {
      title: '个人工程师栈搭建',
      href: '/docs/playbooks/personal-engineer-stack-setup',
      description: '把 7 天内试出来的入口、规则和验证回路固定成可持续栈。',
    },
    {
      title: 'Bugfix / Refactor / Test',
      href: '/docs/workflows/patterns/bugfix-refactor-test',
      description: '把最高频的维护类任务固定成最小闭环，而不是每次重新设计流程。',
    },
    {
      title: '学习路径',
      href: '/docs/learning-paths',
      description: '按阶段继续扩展你的工具、工作流和规范阅读顺序。',
    },
    {
      title: 'AI 工作流实操手册',
      href: '/docs/playbooks/workflow-playbook',
      description: '把入门练习过渡到更稳定的日常 workflow 模板。',
    },
  ]}
/>
