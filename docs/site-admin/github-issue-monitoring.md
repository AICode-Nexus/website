---
title: GitHub Issue 内容自动化
description: 站点维护文档：用 Codex automation 每天扫描仓库 issue 变化，并把高价值信号沉淀成 blog 与 docs。
slug: /site-admin/github-issue-monitoring
sidebar_label: GitHub Issue 自动化
tags: [site-admin, github, automation, issues]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: implementation
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-23
source_window_end: 2026-03-23
market_status: current
---

# GitHub Issue 内容自动化

## 目标

这条自动化的目标不是“每天把 issue 列表抄一遍”，而是每天检查仓库 issue 的真实变化，把其中值得复用的信号沉淀成两层内容：

- `blog` 里的当天更新，说明今天发生了什么、为什么值得看。
- `docs` 里的长期判断，说明这些变化应该怎样影响教程、工作流、规范或站点结构。

## 这条自动化负责什么

Codex automation 每天运行一次，固定做 5 件事：

1. 检查 `AICode-Nexus/website` 在过去 24 小时里新建、关闭、重开或被实质更新的 issue。
2. 先把事实输入写成 dated source snapshot，落在 `content-sources/issues/`。
3. 只有当 issue 变化足够“可沉淀”时，才更新当天 blog 和长期 docs。
4. 运行站点校验，至少确保 `npm run check:content` 和 `npm run build` 通过。
5. 如果生成了内容且校验通过，自动提交并 push 到当前分支。
6. 打开 inbox item，说明这次监控改了哪些文件，或为什么没有改动内容。

## 每日执行路径

### 1. 先拿事实，不先写判断

自动化应先收集 issue 的事实层：

- issue 编号、标题、状态、标签
- 创建 / 更新时间
- 关键 comment 或 description 改动
- 对应的 GitHub 链接

这些原始输入应先写入：

- `content-sources/issues/YYYY-MM-DD-repo-issue-monitor.json`

这样后续 blog 和 docs 的判断都有 dated trace，不会变成“只剩下 AI 写的结论”。

### 2. 只挑高信号 issue

值得转成内容的变化，至少要满足下面一条：

- 暴露了知识库缺口，例如某类工具、工作流或规范没有对应文档。
- 代表一个真实的维护决策，例如某个方向被确认、延后、关闭或重开。
- 反复出现，说明这不是一次性噪音，而是内容结构问题。
- 能直接转成“今天该怎么做”或“长期应该怎么改”的工程动作。

下面这些通常不值得直接写成内容：

- 纯标签调整，没有带来优先级或边界变化。
- 语义不变的小修辞、小补充。
- 没有可执行影响的闲聊型评论。
- 只和一次性实现细节有关、对读者没有复用价值的问题。

## 输出约定

### Blog 层

如果当天有足够强的 issue 信号，自动化应创建或更新一篇 dated blog：

- `blog/daily/YYYY-MM-DD-repo-issue-brief.md`

建议沿用现有 Daily Brief 的分析风格，但主题改成仓库 issue 变化。至少回答：

1. 今天哪些 issue 变化最值得看
2. 它们为什么会影响站点内容
3. 接下来应该补哪些 docs / workflow / comparison / case study

### Docs 层

长期 docs 的默认落点是：

- `docs/insights/repo-issue-signals.md`

这页不是日报镜像，而是“仓库问题流里哪些变化值得进入长期知识”的总汇页。自动化更新这页时，应优先改这几类信息：

- 哪类 issue 最近反复出现
- 它们暴露的是内容缺口、入口问题，还是维护流程问题
- 这些信号应该回流到哪个 docs 方向

如果某个 issue 明确指向现有文档缺失或过时，自动化可以再额外改 1 到 2 个直接受影响的 docs 页面，但不要顺手重写无关内容。

## 写作边界

- 写明绝对日期，不用“今天 / 昨天”这种相对时间偷懒。
- 每条判断都要能回到具体 issue 链接。
- 明确区分事实和推断，不要把推断写成既成事实。
- 不要为了“每天有产出”制造弱信号文章。
- 不要把 repo 内部维护噪音包装成行业趋势。

## 运行前提

- 工作目录固定为仓库根目录 `/Users/admin/work/website`
- GitHub 访问优先直接调用 `gh issue list` / `gh issue view` 取数，不要把 `gh auth status` 当成是否能采集 issue 的前置门槛
- 如果 `gh` 取数失败，再退回公开 issue 页面或 GitHub 搜索页；优先解析公开 issues 搜索页里的内嵌结构化 JSON，而不是靠脆弱的 DOM 文本抓取
- 自动化完成前必须跑内容校验和站点构建
- 只有在内容实际发生变更且校验通过时，才允许自动 `git add`、`git commit`、`git push`
- commit message 应明确这是 issue 监控驱动的内容更新，例如 `docs(auto): update repo issue content YYYY-MM-DD`
- 如果没有 material issue changes，可以不改 repo 文件，但仍应在 inbox item 里给出结论

## 稳定性约束

- `gh auth status` 只能作为诊断信息，不能作为“仓库没有 issue”或“本次采集失败”的直接结论。
- 只要 `gh issue list` 或 `gh issue view` 任一条路径还能返回数据，就应继续完成事实快照，不允许提前退出。
- 如果 GitHub 公共 API 因匿名限额失败，仍要继续尝试公开 issues HTML 页面，因为它通常仍可访问。
- 对外输出时要把“采集失败”和“没有 issue 变化”明确区分，避免把基础设施问题误写成内容判断。

## 推荐命令

- `npm run monitor:repo-issues -- --repo AICode-Nexus/website`

这条命令会优先尝试 `gh issue list`，失败后再回退到公开 issues HTML，并把结果写入 `content-sources/issues/YYYY-MM-DD-repo-issue-monitor.json`。

## 相关文档

- [每日更新工作流](/docs/site-admin/editorial-workflow)
- [AI 写作流程](/docs/site-admin/ai-writing-workflow)
- [仓库 Issue 信号追踪](/docs/tools/insights/repo-issue-signals)
