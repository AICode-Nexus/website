---
title: 任务工作流目录
description: 按任务类型定义 bugfix、refactor、test、new feature、research、review/PR 的固定链路，减少每次从零设计流程。
slug: /workflows/workflow-catalog
sidebar_label: 任务工作流目录
tags: [ai-coding, workflow, delivery]
track: prompting-workflows
kind: guide
audience: advanced
stage: intermediate
featured: false
pillar: workflows
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# 任务工作流目录

## 结论先行

团队不需要为每个任务发明一条新流程。更有效的做法是先按任务类型建立固定工作流，再把 contract、验证命令和 review 清单绑定进去。

## 适用场景

- 需要把 AI 任务标准化
- 团队正在搭建统一的执行模板
- 希望把 review 成本前移到工作流设计

## 六类高频任务

| 任务 | 最小流程 | 关键风险 |
| --- | --- | --- |
| bugfix | 复现 -> 根因 -> 最小修复 -> 回归 | 顺手扩大范围 |
| refactor | 行为边界 -> 重构计划 -> 小步修改 -> 行为验证 | 行为变化未声明 |
| test | 测试计划 -> 用例实现 -> 执行结果 -> 覆盖缺口 | 用例脆弱或误报 |
| new feature | spec -> plan -> execute -> verify -> review | 提前实现、边界失控 |
| research | 问题定义 -> 信息收集 -> 结论 -> 建议 | 研究直接混入实现 |
| review / PR | diff 审阅 -> 证据检查 -> 风险声明 -> merge | 收口 owner 缺失 |

## 具体链路

### Bugfix

1. 明确复现条件
2. 只定位与 bug 直接相关的根因
3. 限定改动范围，做最小修复
4. 跑回归验证
5. 交付根因和验证证据

### Refactor

1. 写清行为不变项
2. 给出结构收益目标
3. 限制允许改动的目录与接口
4. 小步重构并持续验证
5. 说明结构收益与剩余风险

### Test

1. 先列主路径和边界条件
2. 生成测试计划而不是直接生成代码
3. 再写测试用例
4. 跑测试并说明覆盖缺口

### New Feature

1. 先写 spec
2. 再做实施计划
3. 任务拆分后进入执行
4. 执行结果必须对照验收标准验证
5. 通过 review 和 PR 收口

### Research

1. 限定研究问题
2. 只收集与问题相关的信息
3. 产出结论、备选方案和建议
4. 与实现任务分离，不直接写代码

### Review / PR

1. 先核对目标与 contract
2. 再核对验证证据
3. 识别越界和未声明风险
4. 最后决定是否合并或退回

## 统一 contract 字段

无论是哪类任务，建议都至少包含：

- 任务目标
- 范围边界
- 可编辑位置
- 验证命令
- 交付证据
- 超边界时的处理方式

## 推荐做法

1. 每类任务先跑 3 到 5 个真实案例，再固化模板
2. 模板先追求稳定，不追求一次覆盖所有边角情况
3. 失败案例优先回写到模板、门禁和 review 清单

## 风险与边界

- 不要把 research、planning 和 execution 混在同一次任务里
- 不要在缺失验证命令的前提下让 agent 自行判断完成标准
- 不要让 review 承担“补完需求说明”的职责

## 延伸阅读

- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [Bugfix / Refactor / Test 工作流](/docs/workflows/bugfix-refactor-test-workflows)
- [质量门禁与 Review](/docs/standards/review-quality-gates)
