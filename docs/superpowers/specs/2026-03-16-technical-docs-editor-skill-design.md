---
title: Technical Docs Editor Skill Design
description: 为仓库新增一个本地 technical-docs-editor skill，用于审查、补强和结构化扩写技术文档，优先服务角色页等专题内容。
slug: /site-admin/superpowers/specs/technical-docs-editor-skill-design
tags: [site-admin, design, superpowers, skills]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: development-design
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-16
source_window_end: 2026-03-16
market_status: current
unlisted: true
---

# Technical Docs Editor Skill Design

## Goal

为仓库新增一个本地 skill，暂定名为 `technical-docs-editor`，用于两类高频任务：

1. 审查现有技术文档哪里单薄、失衡或与专题结构脱节。
2. 在保留既有信息架构的前提下，补强角色页、工具页、workflow 页和 standards 页的结构、证据位与正文深度。

这个 skill 的目标不是“把字写多”，而是把技术文档补成可长期运营的专题资产。

## Why This Skill

当前仓库已经形成角色页、工具页、workflow 页、standards 页等多条知识线，但文档补强仍然存在几个重复问题：

- 有些页面能讲概念，但缺少决策表、训练任务、交付物和下一步阅读路径。
- 有些页面局部内容已变厚，但和入口页、相邻子页的边界没有对齐。
- 有些页面只增加正文长度，没有同步补图表位、案例位、视频位和验证位。
- 当前本地 skill 只有 `ai-coding-daily-writer`，缺少一个面向长期知识页的“审查 + 扩写”型 skill。

因此需要一个专门面向技术内容运营的本地 skill，而不是继续靠临时提示词处理文档补强。

## Scope

这次设计只覆盖本地 skill 的定义与支撑文档，不直接定义新的角色页内容任务。

纳入范围：

- skill 的命名、触发条件和默认模式
- skill 的执行流程与分流逻辑
- 仓库内的文件布局
- 配套 playbook 的结构
- 审查与扩写时的默认输出格式
- 面向本仓库文档体系的 repo-specific 偏置

## Non-Goals

这次不做这些事：

- 不直接补写 frontend 角色页正文
- 不新增图表、SVG 或视频资源
- 不重构现有文档路由、侧边栏或目录结构
- 不把这个 skill 扩成完整的编辑部工作流或发布系统
- 不要求为所有内容类型都定制独立脚本

## Skill Positioning

推荐名称：`technical-docs-editor`

不使用 `frontend-doc-writer` 或类似命名，原因如下：

- 该 skill 未来可用于 `frontend`、`backend`、`design`、`workflow`、`tools` 等多个专题。
- 名称中使用 `editor`，强调它既负责审查，也负责扩写，不只是代写。
- 名称中保留 `technical-docs`，提升搜索命中率，方便未来被“技术文档、审查、扩写、补强、guide、playbook、standards”一类任务触发。

## Default Outcome

这个 skill 的默认目标不是增加篇幅，而是把目标文档补成以下四层：

1. `结构层`
   页面是否具备总览、分节、阅读路径、边界和相邻页关系。
2. `决策层`
   页面是否具备适用场景、对比表、推荐默认组合、非目标、反模式和失败信号。
3. `证据层`
   页面是否具备图表位、截图位、视频位、案例位、交付物位和验证位。
4. `运营层`
   页面是否具备 frontmatter 时效字段、回流关系、相关页跳转和下一步补强方向。

## File Layout

建议先采用最小可维护结构：

```text
skills/
  technical-docs-editor/
    SKILL.md
    content-playbook.md
```

设计理由：

- `SKILL.md` 保持短，负责触发条件、默认流程、边界和 repo 偏置。
- `content-playbook.md` 放长内容，负责体检框架、不同文档类型的补法、输出模板和仓库专属启发式。
- 当前仓库本地 skill 数量很少，先保持最小目录，避免过早拆出脚本或过多引用文件。

## Skill Description Strategy

`SKILL.md` 的 `description` 只描述“什么时候使用”，不摘要 workflow，以避免调用方只读取描述而跳过 skill 正文。

描述应覆盖这些触发信号：

- 技术文档审查
- 技术文档扩写或补强
- 角色文档、工具文档、workflow 文档、standards 文档
- 页面单薄、结构化不足、缺表格、缺案例、缺交付物、缺图表
- 专题页之间需要边界对齐和结构治理

## Default Mode

默认模式为 `hybrid`，不是纯 review，也不是纯 direct-write。

含义：

- 先做最小体检，判断当前问题是结构失衡，还是局部内容单薄。
- 若问题主要在结构层或决策层，先输出扩写计划，不直接大改页面。
- 若结构已成立，只是正文、证据位和案例不足，则直接补文档并附审查结论。

该模式兼顾两类需求：

- “先体检再扩写”
- “明显缺口可以直接补，不必多一轮往返”

## Workflow

### 1. Determine Task Mode

skill 被调用后，先判断任务落入以下三类之一：

- `review`
  只做文档体检、问题定位和扩写建议，不直接改稿。
- `expand`
  用户明确要补厚某页或某组页，且结构基本成立。
- `hybrid`
  默认模式。先体检，再决定走计划分支还是直接改稿分支。

### 2. Gather Minimal Context

无论哪种模式，都先读取三类上下文：

1. 目标文档本身
2. 相邻文档与入口页
3. 最近的设计、计划或编辑工作流文档

在本仓库中，典型上下文包括：

- `docs/roles/<topic>/index.md` 或同级入口页
- 同专题子页
- `docs/superpowers/specs/*`
- `docs/site-admin/*`
- 现有本地 `skills/*`

这样做是为了避免：

- 单页内容变厚，但与专题结构脱节
- 把已在相邻文档中出现的内容重复写一遍
- 在没有边界判断的情况下新增大量段落

### 3. Audit In Four Layers

体检必须按四层框架执行：

- `结构层`
  总览、模块划分、阅读顺序、章节职责、相邻页关系是否清楚
- `决策层`
  是否有场景判断、默认方案、对比表、非目标、反模式、失败信号
- `证据层`
  是否有图表位、截图位、视频位、案例位、交付物位、验证位
- `运营层`
  是否有时效字段、回流关系、站内跳转、下一步补强建议

### 4. Choose One Of Two Actions

体检后只允许两种主要结果：

#### A. Output Expansion Plan First

当满足以下任一条件时，先出计划，不直接大改：

- 页面结构本身不稳
- 页面与入口页或相邻子页边界冲突
- 需要新增多个大段落或重排章节
- 任务已经从“补厚页面”变成“重构信息架构”

此时应输出：

- 文档体检结论
- 薄弱点清单
- 建议新增或重写的章节
- 媒体与证据位补强清单
- 推荐改写顺序

#### B. Edit Directly And Attach Review Summary

当结构已基本成立，但存在以下问题时，直接改稿：

- 正文解释不够
- 缺对比表或默认组合
- 缺图表位、视频位、案例位、交付物位
- 相邻章节之间过渡不足

直接改稿时必须遵守固定顺序：

1. 先补章节骨架
2. 再补表格、图表位、视频位、案例位、交付物位
3. 最后补正文解释与过渡段

改后需输出：

- 本次补强了什么
- 为什么这些部分优先
- 还有哪些点未补

## Playbook Structure

`content-playbook.md` 建议包含以下五部分：

### 1. Audit Framework

展开四层体检框架，并给出每层常见缺口、判断问题和典型补法。

### 2. Content Shapes

按文档形态给出默认补法：

- 角色页
- 工具页
- workflow 页
- standards / site-admin 页

### 3. Expansion Order

明确扩写的固定顺序：

1. 先骨架
2. 再表格、图表位、案例位、交付物位
3. 最后正文与过渡段

### 4. Output Templates

放四种标准输出模板：

- `文档体检`
- `扩写计划`
- `直接改稿`
- `专题补强地图`

### 5. Repo-Specific Heuristics

写本仓库的专属判断规则，例如：

- 角色页不能只有概念说明，至少要有训练任务或交付物清单。
- 前端主题页优先补图表、案例、视频入口和阅读路径。
- 相邻子页应避免内容打架或重复展开同一主题。
- 需要大改结构时，应先出计划，而不是直接堆正文。

## Repo Bias

这个 skill 必须显式偏向本仓库已有内容形状，而不是泛化成普通写作建议。

对于角色页、工具页、workflow 页，默认优先补这些内容：

- 决策表
- 训练任务
- 交付物清单
- 图表、截图、视频入口
- 相关页跳转关系
- 下一步阅读路径

这条偏置是为了确保 skill 真正服务当前站点的知识型信息架构，而不是退化成“补几段说明文字”。

## Authoring Style

这个 skill 的行为风格应当更接近“技术内容编辑”，而不是“文学写手”：

- 优先指出缺口和结构问题
- 优先补能训练团队的内容
- 避免空泛形容词和无证据扩写
- 默认保留并复用现有信息架构
- 只有在结构明显失衡时，才建议重排章节

## Success Criteria

当 skill 落地后，应满足这些标准：

- 能被“技术文档审查 / 扩写 / 补强”类请求稳定触发
- 能在不重写整站结构的前提下，对角色页等主题页给出稳定分流
- 审查输出不再停留在“内容太薄”，而能定位到四层框架中的具体缺口
- 扩写动作优先补结构骨架和证据位，而不是先拉长正文
- 对 frontend 角色文档这类页面，能自然优先补图表、任务、交付物和阅读路径

## Implementation Notes

下一阶段实现时，应优先完成以下内容：

1. 新建 `skills/technical-docs-editor/SKILL.md`
2. 新建 `skills/technical-docs-editor/content-playbook.md`
3. 在 `SKILL.md` 中保持高可发现性和低冗余
4. 在 `content-playbook.md` 中补齐体检框架、输出模板和 repo-specific 规则

实现阶段不要求新增脚本，除非后续出现重复的文档脚手架需求。
