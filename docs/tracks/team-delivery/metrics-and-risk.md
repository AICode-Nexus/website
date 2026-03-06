---
title: 指标与风险
description: 从效率、返工、缺陷和边界控制四个方向评估 AI coding，避免只用主观感受判断效果。
slug: /team-delivery/metrics-and-risk
sidebar_label: 指标与风险
tags: [ai-coding, metrics, risk]
track: team-delivery
kind: guide
audience: advanced
stage: advanced
featured: false
---

# 指标与风险

## 背景

如果没有指标，团队很容易在“感觉更快”和“真的更稳”之间混淆。AI coding 最容易制造一种错觉：第一次输出变快了，就以为整体交付也变快了。

## 结论先行

AI coding 的核心指标不是生成速度，而是总交付成本、返工量、缺陷率和风险可控性。

推荐把指标分成四组：

1. 效率指标
2. 质量指标
3. 风险指标
4. 治理指标

## 适用场景

- 评估工具是否值得继续用
- 做小团队复盘
- 为团队级采用做准备
- 判断多 Agent、memory、cloud execution 是否真的值得引入

## 核心概念

### 1. 效率指标

看的是总任务周期，而不是首次输出速度。

建议看：

- 从开始到可提交状态的总时间
- review 周期
- 上下文切换次数
- 同类任务完成时间中位数

### 2. 质量指标

建议看：

- 返工次数
- 人工修补量
- 缺陷率
- 回归问题数量

### 3. 风险指标

建议看：

- 越界修改次数
- 规则违背次数
- 高风险命令执行次数
- 未经验证进入 PR 的改动比例

### 4. 治理指标

建议看：

- instructions 是否被版本化
- 哪些 agent 拥有网络权限
- 哪些目录有 path-specific 审核要求
- 哪些任务可异步委派，哪些不行

## 一张最小指标表

| 指标组 | 推荐核心指标 | 为什么重要 |
| --- | --- | --- |
| 效率 | 总完成时间、review 周期 | 防止只看首次输出 |
| 质量 | 返工次数、人工修补量 | 更接近真实交付成本 |
| 风险 | 越界修改、规则违背 | 衡量系统是否可控 |
| 治理 | 权限、指令、审批覆盖率 | 衡量能否规模化推广 |

## 当前值得关注的风险事实

截至 2026 年 3 月 6 日，官方资料已经明确提醒出一些风险边界：

- Cursor background agents 在隔离远程环境中运行，并具备 internet access，这意味着并行和自动化能力增强的同时，网络和执行边界也更值得显式治理。
- OpenAI 在 2026 年 2 月 28 日的 Codex upgrades 说明 codex-1 默认关闭网络访问，这说明“默认不开网络”本身已被视为一种风险控制策略。
- GitHub Copilot Memory 默认开启且会跨表面共享，这提升了便利性，但也意味着错误记忆和过期记忆需要被识别和纠正。

这些都说明：能力越强，治理就越不能靠口头约定。

## 推荐做法

### 第一步：先拿到基线

在不用 AI 或低强度使用 AI 的情况下，先记录一组基线数据。

### 第二步：只选 3 到 5 个核心指标

指标太多，团队很快就不会看。第一阶段推荐：

- 总完成时间
- 返工次数
- 人工修补量
- 越界修改次数
- review 周期

### 第三步：用相同任务集比较前后变化

否则你得到的不是结论，而只是印象。

### 第四步：把风险回流到规则和权限

如果某个风险重复出现，不要只在复盘会上提一句，要改：

- rules
- contract
- approval policy
- path-specific review

## 常见错误

- 只统计第一次输出速度
- 不记录 review 成本
- 用感觉替代对比数据
- 指标很多，但没有一项真正影响决策
- 发现风险后不改制度，只提醒“下次注意”

## 延伸阅读

- [从个人工作流到团队协作](/docs/team-delivery/solo-to-team-transition)
- [质量门禁与 Review](/docs/team-delivery/quality-gates-and-review)
- [2026 年 3 月月度简报](/docs/insights/monthly-brief-2026-03)

## 来源

- Cursor Docs: [Background Agents](https://docs.cursor.com/en/background-agents)
- OpenAI, 2026-02-28: [Codex upgrades](https://openai.com/index/codex-upgrades/)
- GitHub Changelog, 2026-03-04: [Copilot Memory now on by default for Pro and Pro+ users in public preview](https://github.blog/changelog/2026-03-04-copilot-memory-now-on-by-default-for-pro-and-pro-users-in-public-preview/)
