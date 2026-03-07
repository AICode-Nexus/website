---
title: AI 工作流实操手册
description: 把 4 条最常用的 AI coding workflow 写成可直接照着执行的 SOP、输入模板和验收清单。
slug: /playbooks/workflow-playbook
sidebar_label: 工作流实操手册
tags: [ai-coding, playbook, workflow]
track: prompting-workflows
kind: playbook
audience: mixed
stage: starter
featured: true
pillar: workflows
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 工作流实操手册

## 这篇怎么用

如果你现在缺的不是“理念”，而是“今天要怎么跑”，就直接用这篇。

推荐用法只有三步：

1. 先选一个最接近当前任务的 workflow
2. 复制对应输入模板，填上你的项目信息
3. 严格按步骤执行，不要中途把两条 workflow 混在一起

这篇默认你已经有最小验证命令，例如：

```bash
npm run lint
npm test
npm run build
```

如果你的项目连最小验证命令都没有，先不要谈“自动化工作流”，先把验证回路补上。

## Workflow 1：新功能用 `spec-first`

### 什么时候用

- 需求会跨多个文件或模块
- 很容易边做边扩范围
- 需要交给别人 review 或异步接力

### 输入模板

```text
任务类型：new feature
目标：
非目标：
用户或使用者：
范围：
相关目录：
验收标准：
验证命令：
交付物：
超边界时：先停下来，不继续扩做
```

### 标准步骤

1. 先写 spec，只回答“做什么”和“不做什么”。
2. 再写 plan，明确改动目录、实现顺序、验证命令和人工 gate。
3. 把 plan 缩成 agent contract，只保留目标、范围、验证、证据。
4. 让 agent 执行实现，不允许在执行期重新定义需求。
5. 跑验证命令，记录通过和失败结果。
6. 按 spec 和 plan 做 review，检查是否越界。

### 交付物

- 1 份 spec
- 1 份 plan
- 1 次实现结果
- 1 份验证证据
- 1 份 review 结论

### 完成判定

下面 5 条同时成立才算完成：

- spec 已锁定
- plan 已锁定
- 实现没有越界
- 验证命令结果清楚
- PR 或 handoff 说明可直接复用

## Workflow 2：已知 bug 用 `bugfix`

### 什么时候用

- 已经能复现
- 目标是关闭缺陷，不是顺手重构
- 改动范围应该尽量小

### 输入模板

```text
任务类型：bugfix
问题描述：
复现步骤：
期望行为：
实际行为：
允许修改范围：
不要做：
验证命令：
交付证据：
```

### 标准步骤

1. 先让 agent 复述复现条件，确认问题一致。
2. 只做根因定位，不急着直接改代码。
3. 明确最小修复范围，必要时把禁止改动目录写出来。
4. 完成修复后，先跑最小复现，再跑相关回归。
5. 输出根因、改动点、风险和验证结果。

### 交付物

- 根因说明
- 最小修复 diff
- 回归结果
- 剩余风险

### 失败信号

出现下面任意一条，就说明 workflow 已经偏了：

- 还没说明根因就开始大改
- 修 bug 时顺手做结构重写
- 没有复现关闭证据
- 验证只写“应该没问题”

## Workflow 3：工单任务用 `issue / Jira -> draft PR`

### 什么时候用

- 任务已经在 GitHub issue 或 Jira 里
- 需求相对清晰
- 可以接受后台异步推进

### 输入模板

```text
任务类型：async agent delivery
工单链接：
目标：
不做什么：
相关仓库 / 目录：
验收标准：
必须人工确认的点：
PR 需要包含的说明：
```

### 标准步骤

1. 先检查 issue 或 Jira 是否真的写清楚了目标和验收。
2. 没写清就先补 acceptance criteria，不要直接指派 agent。
3. 指派给 coding agent，或者从 agents panel / Jira 面板启动。
4. 让 agent 生成 draft PR，不直接合并。
5. 人类 review 时只看三件事：是否越界、是否满足验收、是否有未声明风险。
6. 需要返工时，在同一条 session 或 PR 里追加 steering，而不是重新开一个模糊任务。

### 交付物

- draft PR
- session log 或 agent 证据
- review 结论

### 完成判定

- PR 能直接映射到工单目标
- 验收标准有明确证据
- merge owner 明确

## Workflow 4：长任务用 `parallel worktrees`

### 什么时候用

- 任务可以拆成低耦合子项
- 多个 agent 同时推进真的能节省时间
- 你有明确的 owner 负责最后合流

### 输入模板

```text
任务类型：parallel delivery
总目标：
子任务拆分：
- 子任务 A：
- 子任务 B：
- 子任务 C：
每个子任务允许修改的目录：
每个子任务验证命令：
最终收口负责人：
合流前必须完成的检查：
```

### 标准步骤

1. 先做拆分，不拆分就不要并行。
2. 每个子任务单独 worktree 或单独 agent session。
3. 每个 worktree 只负责自己的目录和验收命令。
4. 每个子任务各自提交验证结果，不能只交代码。
5. 最后由 owner 在主线统一 review、跑整体验证、决定合并顺序。

### 交付物

- 子任务清单
- 每个子任务的验证证据
- 合流说明
- 最终整体验证结果

### 失败信号

- 多个 agent 同改同一文件
- 没有统一 owner
- 子任务之间互相依赖但仍然强行并行
- 各子任务只交 diff，不交验证

## 通用验收清单

无论用哪条 workflow，最后都至少检查下面 7 项：

1. 任务目标是否还和最初一致
2. 是否改到了范围外的目录或接口
3. 验证命令是否真实执行过
4. 是否保留了失败信息，而不是只给成功结论
5. 是否明确声明了剩余风险
6. 是否有人对最终 merge 或 handoff 负责
7. 是否把失败模式回写到模板或规则，而不是只记在脑子里

## 一周落地顺序

如果你想把这 4 条 workflow 真正落到团队里，建议这样排：

1. 第 1 周只跑 `bugfix`
2. 第 2 周补 `spec-first`
3. 第 3 周再试 `issue / Jira -> draft PR`
4. 只有长任务确实多起来后，再上 `parallel worktrees`

先让最基础的两条 workflow 稳住，再扩到异步和多 agent，成本最低。

## 下一步

- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [Prompt Contracts](/docs/workflows/prompt-contracts)
- [Bugfix / Refactor / Test 工作流](/docs/workflows/bugfix-refactor-test-workflows)
- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
