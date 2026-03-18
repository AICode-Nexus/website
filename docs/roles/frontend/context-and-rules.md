---
title: 上下文与规则
description: 用 AGENTS.md、CLAUDE.md、工具 rules、Context7、MCP 和技能映射，把前端 AI 协作沉淀成长期机制。
sidebar_label: 上下文与规则
tags: [ai-coding, frontend, context, rules]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
slug: /roles/frontend/context-and-rules
---

# 上下文与规则

前端团队把 AI 用稳，最终比拼的不是 prompt 词藻，而是机制分层是否清楚。这个专题现在只负责一件事：告诉你前端 AI 协作里的长期真相、任务上下文、能力编排和工具入口应该分别写在哪里，而不是继续把所有细节塞回一张总览页。

## 专题拆分阅读

这一页保留为“机制总览页”，更细的内容分别下沉到三个子页：

| 方向 | 你现在最想解决什么 | 这一页应该给你什么 | 对应子页 |
| --- | --- | --- |
| 规则与规范文档 | 规则文件、brief、PR 模板到底谁负责什么 | 拿到规则所有权、模板资产和证据合同 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |
| Skills 与 MCP | 前端任务该先启用什么能力组合 | 拿到 skill、MCP、任务包的默认编排方式 | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) |
| 工具匹配与选型 | 该走终端、执行栈、浏览器还是平台入口 | 拿到按任务形状选入口的具体决策表 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) |

如果你要做团队治理，先去“规则与规范文档”；如果你要开真实前端任务，通常先读 “Skills 与 MCP” 和 “工具匹配与选型”。

## 规则分层图

![前端上下文分层图](/img/roles/frontend/context-rules-stack.svg)

## 前端机制不是一个文件，而是四层合同

| 层 | 要解决什么问题 | 常见载体 | 最常见的失控点 |
| --- | --- | --- |
| repo 合同 | 共享层边界、目录合同、长期验证纪律写在哪里 | `AGENTS.md`、项目规范、长期规则文件 | 所有边界都留在聊天里，换人就丢 |
| 工具行为 | 某个入口默认怎么工作 | `CLAUDE.md`、IDE rules、工具本地 instructions | 把工具习惯误写成团队唯一真相 |
| 任务包 | 本次页面、组件或重构任务需要什么上下文 | task brief、Figma 节点、截图、token、验收项 | 只写“帮我改这个页面”，没有输入和验收 |
| 交付证据 | 怎么证明这次改动真的可交付 | PR 模板、handoff 文档、截图、录屏、命令结果 | 只有 diff，没有证据包，review 和接手人都要靠猜 |

这四层写清以后，agent 才不会把“长期规则”“本次任务”“入口习惯”“交付证明”混成一坨。

## 遇到什么问题，先去哪个子页

| 你卡住的问题 | 先看哪里 | 为什么 |
| --- | --- | --- |
| `AGENTS.md`、`CLAUDE.md`、brief、PR 模板怎么拆 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) | 这是规则所有权和模板资产问题 |
| 设计稿任务该先拿什么上下文 | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) | 这是能力编排问题，不是入口偏好问题 |
| 这个任务到底该走终端、浏览器还是平台入口 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) | 这是工具入口决策，不是规则问题 |
| 共享组件改造为什么总返工 | 先看 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)，再看 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) | 先判断入口，再补目录合同和验证要求 |
| 页面任务证据老是补不齐 | 先看 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)，再看 [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) | 先把证据写进合同，再决定能力组合 |

## 三个机制子页各自要交什么

| 子页 | 你读完至少应该拿走什么 | 不应该在这里展开什么 |
| --- | --- | --- |
| 规则与规范文档 | `AGENTS.md` 片段、brief 模板、PR / handoff 模板、证据合同 | 不负责替你决定入口工具 |
| Skills 与 MCP | 能力组合矩阵、默认编排顺序、失败信号与修正动作 | 不负责替你决定哪款产品最顺手 |
| 工具匹配与选型 | 任务形状到工具入口的决策表、证据要求、配套 workflow | 不负责长期规则所有权 |

## 前端上下文包

![前端上下文包](/img/roles/frontend/frontend-context-packet.svg)

这张图的核心不是“材料越多越好”，而是把长期真相、本次任务和最终证据分开。很多前端团队之所以觉得 AI 协作忽好忽坏，本质上不是模型水平波动，而是三类信息在不同任务里不断串位。

## 默认阅读顺序

| 任务类型 | 推荐阅读顺序 | 你最后应该拿到什么 |
| --- | --- | --- |
| 设计稿转页面 | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) -> [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) -> [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) | 能力组合、入口选择、brief 与证据合同 |
| 浏览器 bug 修复 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) -> [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) -> [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) | 复现入口、能力编排、交付证据 |
| 共享层或设计系统治理 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) -> [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) -> [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) | 计划型入口、目录合同、默认能力链 |
| 团队规则建设 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) -> [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) -> [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) | 模板资产、能力地图、入口决策表 |

## 团队治理节奏

前端机制专题真正有价值，不在于把术语讲得多，而在于能把返工点稳定回写为仓库资产。建议至少固定下面这条治理节奏：

1. 每周回收一次高频返工点，把它们转成规则文件或任务模板。
2. 每次出现典型页面任务，都补一次截图、录屏或对照图，不让媒体证据只留在 IM 或口头 review 里。
3. 每月整理一次“哪些验证在重复跑”，把它们上升为脚本、模板或 CI 门禁。
4. 每个新成员入组时，先学“如何读规则、如何选能力、如何选入口、如何交证据”，而不是先学 prompt 花样。

## 机制专题的默认交付物

| 你正在收口什么 | 最少应交什么 | 主要归属页面 |
| --- | --- | --- |
| 仓库长期真相 | `AGENTS.md` 片段、目录合同、验证纪律 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |
| 本次任务上下文 | brief、设计输入、截图清单、验收项 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |
| 能力编排 | skill + MCP 组合表、失败信号、默认顺序 | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) |
| 工具入口选择 | 任务形状到入口工具矩阵、最小证据包 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) |
| 最终交付证明 | 命令结果、截图、录屏、风险说明 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |

## 机制专题的默认训练包

如果你要把这组机制页真正用起来，最稳的方式不是逐页背概念，而是直接复用下面这几套训练包：

| 训练包 | 主要解决什么 | 应该落到哪一层合同 | 先读哪里 |
| --- | --- | --- | --- |
| 页面输入包 | 让设计输入不再只剩整屏截图 | `任务包` | [页面输入包模板](/docs/roles/frontend/templates/page-input-pack)、[设计到代码](/docs/roles/frontend/design-to-code) |
| 能力编排包 | 决定先启用什么 skill / MCP / 入口 | `工具行为` + `任务包` | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)、[工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) |
| 规则模板包 | 决定长期规则、brief 和 PR 模板各写在哪 | `repo 合同` + `工具行为` + `任务包` | [训练包模板](/docs/roles/frontend/templates)、[规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |
| 交付证据包 | 让 reviewer 能快速确认这次改动是否可推进 | `交付证据` | [命令与证据模板](/docs/roles/frontend/templates/commands-and-evidence)、[测试与交付](/docs/roles/frontend/testing-and-delivery) |

这张表的重点是：同样叫“前端任务”，真正需要的资产并不一样。页面首版最怕输入失真，交付收口最怕证据缺位，而机制专题的价值，就是帮你把这几套资产放回正确层级。

## 新人 onboarding 顺序

1. 先看本页，理解四层合同和三个专题页怎么分工。
2. 再看 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)，理解长期规则和任务模板怎么写。
3. 然后看 [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) 与 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)，理解能力链和入口决策。
4. 最后回到 [设计到代码](/docs/roles/frontend/design-to-code)、[质量门禁](/docs/roles/frontend/quality-gates) 和 [测试与交付](/docs/roles/frontend/testing-and-delivery)，把机制接回真实交付。

## 配套图片与视频

- 本页保留两张总览图：规则分层图和前端上下文包，适合用来讲清“信息该写在哪一层”。
- 想直接开始组装训练包：回到 [设计到代码](/docs/roles/frontend/design-to-code) 的输入资产板和 [测试与交付](/docs/roles/frontend/testing-and-delivery) 的交付证据包板。
- 想直接复制模板文件：去 [训练包模板](/docs/roles/frontend/templates)。
- 想看 rules、workflow、agent 类视频入口：去 [全部视频](/docs/resources/videos) 搜 `rules`、`workflow`、`agent`。
- 想把机制接回真实页面任务：回到 [设计到代码](/docs/roles/frontend/design-to-code)、[质量门禁](/docs/roles/frontend/quality-gates)、[测试与交付](/docs/roles/frontend/testing-and-delivery)。
- 想继续下钻机制专题：去 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)、[Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)、[工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
