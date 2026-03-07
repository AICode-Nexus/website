---
title: 终端 Agent 与 CLI
description: 理解终端里的 Agent 最适合哪些任务，以及它与 IDE 内 AI coding 的边界怎么划分。
slug: /tools/terminal-agents-and-cli
sidebar_label: 终端 Agent 与 CLI
tags: [ai-coding, cli, terminal]
track: cross-track
kind: guide
audience: individual
stage: intermediate
featured: false
pillar: tools
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# 终端 Agent 与 CLI

## 背景

很多工程任务天然发生在终端里，例如构建、测试、脚本执行、日志分析、仓库巡检和批量修改。把这些任务仍然塞在聊天窗口里，本身就会损失效率和可验证性。

## 结论先行

CLI Agent 最适合三类事情：

1. 命令驱动型任务
2. 可验证型任务
3. 批处理型任务

它不适合高度模糊的需求探索，也不适合在没有边界的情况下直接改高风险模块。

## 适用场景

- 跑测试和修复错误
- 做仓库检查
- 执行重构和批量修改
- 在隔离 worktree 里完成可验证任务

## 核心概念

### 1. 命令执行

终端 Agent 最大优势是能直接跑命令、读输出、继续迭代。

最典型的高价值场景：

- 运行 test
- 运行 lint / build
- 执行 codemod 或批量替换
- 检查 git 状态和差异

### 2. 环境边界

CLI Agent 真正的工程价值，很大程度来自边界控制。

你要关心：

- 它在哪个目录运行
- 是否有网络权限
- 是否需要审批才能执行某些命令
- 是否在隔离 worktree 中工作

### 3. 结果校验

CLI 天然适合把“修改”和“验证”连起来，而不是先改完再交给人类手动补救。

### 4. 手工接管点

CLI Agent 不应该从头管到尾。关键节点要明确由人接管：

- contract 是否合理
- diff 是否过大
- 验收标准是否满足
- 是否要提交 PR

## 当前官方事实

截至 2026 年 3 月 6 日，主流产品对 CLI / terminal 的定位已经比较清晰：

- GitHub Docs 说明 Copilot CLI 会依据目录信任状态启用不同的模式：trusted folder 可使用 agent mode，untrusted folder 则只允许 ask / edit mode。
- OpenAI 在 2026 年 2 月 28 日宣布 Codex CLI 的权限系统支持 `full auto`、`suggest` 和 `auto-edit`，并默认在 codex-1 模型上关闭网络访问。
- VS Code 官方文档说明 background agents 通过本地 CLI 在后台运行，并使用 git worktrees 隔离工作。
- Cline 官方文档说明其支持 terminal integration、Plan / Act 切换，以及按工具类别控制 auto-approve。

这些事实共同说明：CLI Agent 的核心不是“在终端聊天”，而是“在受控环境里完成可验证执行”。

## CLI 适合做什么

### 最适合

- 修一个已有失败测试的 bug
- 批量执行格式化、重命名、清理脚本
- 收集日志、构建错误、编译失败信息
- 在 worktree 里跑一轮独立实现和验证

### 谨慎使用

- 高风险架构调整
- 需要大量 UI / 交互理解的任务
- 边界不清的模糊需求
- 需要大段产品讨论和方案探索的场景

## CLI 与 IDE 的分工建议

| 场景 | 更适合的入口 |
| --- | --- |
| 理解需求、讨论方案 | 聊天 / IDE |
| 快速局部修改 | IDE |
| 跑命令、看输出、批处理 | CLI |
| 隔离环境长任务 | 后台 / worktree |
| 最终 diff 审阅和精修 | IDE / PR |

## 推荐做法

1. 用 CLI Agent 跑明确任务
2. 用 IDE 负责审阅和精修
3. 用 PR / review 负责最终合并前把关
4. 所有 CLI agent 都要先收紧权限，再逐步放开

## 一份最小 CLI 任务合同

```text
任务：修复 test/auth/login.spec.ts 当前失败用例
范围：仅允许修改 src/auth 和 tests/auth
执行：允许运行 npm test -- auth 和 npm run lint
不要做：不要修改依赖、不要改数据库 schema
验收：测试通过，lint 通过，说明根因和修复点
```

## 常见错误

- 用 CLI 做开放式需求讨论
- 权限放太大
- 只看执行成功，不看代码质量
- 没有记录 agent 跑过哪些命令
- 在主工作区直接试高风险自动化修改

## 延伸阅读

- [旧赛道中的 Review 与 PR 工具链](/docs/ides-tooling/review-and-pr-tooling)
- [Agent 执行模式](/docs/development-modes/agent-execution-modes)
- [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)

## 来源

- GitHub Docs: [Using GitHub Copilot in the command line](https://docs.github.com/en/copilot/how-tos/use-copilot-in-the-cli/use-github-copilot-in-the-command-line)
- OpenAI, 2026-02-28: [Codex upgrades](https://openai.com/index/codex-upgrades/)
- VS Code Docs: [Background agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- Cline Docs: [Plan & Act Mode](https://docs.cline.bot/core-workflows/plan-and-act)
