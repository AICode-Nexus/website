---
title: Agent = Model + Harness：AI 智能体时代的软件工程重心转移
description: 解释为什么真正决定 Agent 是否可交付的，往往不是模型参数本身，而是工具、记忆、状态、运行时与恢复机制共同构成的 harness。
slug: /tools/insights/agent-model-plus-harness
sidebar_label: Agent = Model + Harness
tags: [ai-coding, insight, agent, harness, architecture]
track: cross-track
kind: insight
content_form: insight
domain: ecosystem
journey_stage: defect-optimization
entry_role: index
audience: mixed
stage: intermediate
featured: true
reviewed_at: 2026-03-23
source_window_end: 2026-03-23
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# Agent = Model + Harness：AI 智能体时代的软件工程重心转移

## 结论先行

如果你只记一句话，请记这一句：

**Agent 不是“更强一点的模型”，而是“模型能力 x 工程系统”。**

Model 决定它能不能理解、规划和生成；Harness 决定它能不能调用工具、维持状态、在出错后恢复，并把任务真正交付出去。进入真实软件工程后，短板往往不在模型首答质量，而在 harness 是否足够稳。

## 适用场景

- 你在给工程师、架构师或产品团队讲解什么是 Agent
- 你已经发现“模型很强，但系统总是不稳”
- 你想把 prompt、tools、memory、runtime、guardrails 放进同一张工程图里
- 你在评估 AI coding、异步 agent 或多 agent 系统时，希望先抓住真正的设计重心

## 教学目标

学完这篇后，学员至少应该能做到 4 件事：

- 说清 `Model` 和 `Harness` 在 Agent 里的职责分工
- 解释为什么真实系统的失稳点常常出现在 harness，而不是首答模型
- 区分 `workflow` 和 `agent` 的适用边界，不盲目追求高自治
- 用一张最小清单评估某个 Agent 系统是否具备工程落地条件

## 课堂导入

可以先用一个 2 分钟问题把学员拉进场景：

> 为什么很多团队会出现这样的现象：模型演示时看起来很强，但一进入真实仓库、真实权限和真实交付链，系统就开始变得不稳定？

让学员先自由回答，通常会出现三类直觉：

- 模型还不够强
- prompt 写得不够好
- 数据和上下文不够多

然后再引出这篇的核心判断：这些都可能有影响，但在真实工程里，**更常见的短板是 harness 没有设计完整。**

## 看完先做什么

- 如果你要继续看 `rules / memory / context` 如何分层，去 [上下文、记忆与规则](/docs/standards/context-memory-and-rules)。
- 如果你想把这里的判断放进真实交付链，去 [异步 Agent 交付链](/docs/workflows/async-agent-delivery)。
- 如果你要继续看多 agent 如何拆分角色与并行执行，去 [多 Agent 协作](/docs/workflows/multi-agent-collaboration)。

## 先看整体图

![Agent = Model + Harness 总体结构图](/img/insights/agent-model-harness-overview.svg)

*图 1：Agent 不是单点模型，而是“认知层 + 工程层”的组合系统。*

从软件工程视角看，Model 更像“思考中枢”，Harness 更像“执行系统 + 运行环境”。前者解决“怎么想”，后者解决“怎么做、怎么稳、怎么恢复”。

## 为什么这句话重要

如果只看 Demo，大家很容易把 Agent 理解成“会规划、会调用工具的大模型”。但真实系统一旦进入文件读写、数据库访问、浏览器控制、权限审批、长任务恢复和人工接管，问题就会迅速转向这些工程主题：

- 工具调用参数是否稳定
- 状态是否能跨步骤延续
- 失败后是重试、回滚还是交给人工
- 长流程是否可观测、可验证、可审计

这也是为什么很多团队的真实痛点不是“模型不够聪明”，而是“系统没有把模型组织成一个可靠的执行回路”。

> 更准确地说，`Agent effectiveness ~= Model quality x Harness quality`。
> 模型再强，如果工具层、状态层或恢复层接近 0，系统整体效果仍然接近 0。

## 讲解顺序建议

如果这篇要用于课堂或内部培训，建议按这个顺序讲：

1. 先讲图 1，让学员建立 `Model + Harness` 的整体框架
2. 再讲 `Model` 和 `Harness` 的职责边界，防止概念混淆
3. 然后讲 `workflow vs agent`，避免把所有问题都做成高自治系统
4. 再用自动化研报助手案例，把抽象概念落回真实任务链
5. 最后用“落地清单 + 常见误区 + 讨论题”收口

这样更符合工程培训的认知节奏：先搭框架，再分层，再看边界，最后落案例和动作。

## 概念拆解

### 1. Model：负责理解、推理、生成

Model 是 Agent 的智能层，典型职责包括：

- 语义理解：理解用户的真实目标，而不只是表面字词
- 规划推理：把复杂目标拆成步骤，决定下一步应该做什么
- 结构化生成：产出文本、代码、SQL、API 参数、工具调用意图
- 归纳抽象：从零散信息里提炼主题、模式和风险

它最擅长的是“想”。但它天然不保证自己真的完成了外部动作。例如：

- 它可以说“我已经检查过日志”，但如果没有工具执行链，这只是文本表述
- 它可以给出“建议修改某个文件”的答案，但不等于文件已经被正确改动
- 它可以生成一个 JSON 参数，但不等于参数一定符合工具 schema 或权限边界

这就是 Model 的典型边界：**它能提出动作，但不能天然证明动作已经可靠发生。**

### 2. Harness：负责工具、记忆、状态、执行与恢复

Harness 不是“模型外面的一层壳”，而是让模型能稳定工作的整套工程机制。可以把它理解为 Agent 的操作系统，至少应覆盖下列能力：

| 子系统 | 它解决什么问题 | 典型实现 |
| --- | --- | --- |
| Prompt orchestration | 模型当前该按什么角色、目标和约束工作 | system prompt、task contract、instruction files |
| Tool router | 模型怎样接入外部能力 | function calling、MCP、API gateway |
| Memory | 哪些上下文要保留，哪些要淘汰 | 会话上下文、长期记忆、压缩摘要 |
| State machine | 当前任务进行到哪里，下一步该走哪条边 | task state、event log、workflow engine |
| Runtime / sandbox | 代码、浏览器、文件系统在哪执行 | sandbox、container、browser runtime |
| Guardrails / recovery | 出错、越界、注入或结果异常时怎么办 | schema validation、approvals、retry、rollback |

![Harness 内部能力分层图](/img/insights/harness-capability-stack.svg)

*图 2：Harness 的关键不是“多加几个工具”，而是把工具、记忆、状态和恢复连成一套闭环。*

## 一个更精确的分层：不是所有系统都该直接叫 Agent

这篇话题还有一个经常被忽略的细节：**并不是所有带模型和工具的系统都应该一上来做成高自治 Agent。**

Anthropic 在 2024 年 12 月 19 日发布的《Building effective agents》中，把系统大致分成两类：

- `Workflow`：由预定义代码路径编排，步骤和分支更可预测
- `Agent`：由模型动态决定下一步动作和工具使用方式，自主性更高

这一区分非常重要，因为很多团队的问题其实不是“没有 Agent”，而是“把本该做成 workflow 的事情，过早做成了高自由度 agent”。

更稳的判断顺序通常是：

1. 先问这个任务能不能用固定 workflow 解决
2. 只有当任务分支多、信息不完整、需要动态计划时，再引入更高自治的 agent
3. 即使引入 agent，也要保留 harness 对执行边界和恢复路径的控制

换句话说，**harness 的第一职责不是“放大自由度”，而是“在必要自由度之外收紧不确定性”。**

## 为什么说“如果你不是模型，你就是 Harness”

这句话真正要表达的，不是否定模型，而是强调 AI 产品竞争的关键正在迁移。

### 1. 工程价值正在从“写功能”转向“组织模型工作”

传统软件更强调把业务逻辑手写出来；Agent 系统则更强调：

- 任务怎么拆
- 上下文怎么给
- 工具怎么接
- 状态怎么存
- 错误怎么纠
- 风险怎么控

这不是“软件工程不重要了”，恰恰相反，是软件工程从功能编码进一步上移到了**执行回路设计**。

### 2. 模型经常可替换，Harness 更容易沉淀为资产

同一条任务链往往可以接不同模型，但以下资产通常更能复用：

- 任务合同
- 工具协议
- 状态机
- 验证命令
- 审批和回滚机制
- 观测与评估链路

这意味着企业和团队真正能持续积累的，不只是“选中了哪个模型”，而是“沉淀出了一套怎样的 harness”。

### 3. 真正拉开体验差距的，是闭环能力而不是首答能力

用户感知到的“这个 Agent 靠不靠谱”，通常来自这些问题：

- 失败时会不会卡死
- 改错了能不能发现
- 中断后能不能继续
- 工具是否越权
- 输出能不能被验证

这些都更接近 harness 问题，而不是单纯的模型参数问题。

## 工程重心到底转移到了哪里

下面这张表更适合放进教材或培训课件中直接讲：

| 时代 | 主要关注点 | 交付难点 | 工程重心 |
| --- | --- | --- | --- |
| 传统应用开发 | 业务逻辑、接口、页面、数据库 | 功能是否实现 | 模块设计、接口契约、测试 |
| Copilot 辅助开发 | 生成速度、提示词、局部补全 | 结果是否可用 | prompt、上下文、人工 review |
| Agent 系统开发 | 计划、工具、状态、执行、恢复 | 系统是否能稳定完成任务 | harness、workflow、guardrails、evals |

对架构师和技术负责人来说，这个变化尤其关键。因为 Agent 时代的核心问题不再只是“功能做出来没有”，而是：

- 在不确定输出前提下，系统还能否整体可控
- 在长链任务里，状态和责任能否清晰
- 在模型偶尔犯错时，系统能否自动止损

## 一个成熟 Agent 的任务闭环

![Agent 任务闭环图](/img/insights/agent-delivery-loop.svg)

*图 3：成熟 Agent 更像“计划 -> 执行 -> 验证 -> 修正”的循环系统，而不是单轮问答。*

这张图说明，真正的 Agent 更接近“自治工作流”而不是“升级版聊天机器人”。

如果没有验证与修正，系统就只能输出“像是完成了”的文本；只有形成闭环，系统才有机会输出“被证明完成了”的结果。

## 教学案例：自动化研报助手

假设需求是：

> 分析最近三个月某行业的技术趋势，并输出 5 页摘要。

如果只看 Model，它可以：

- 理解行业、时间范围和输出格式
- 给出一个像样的分析提纲
- 产出一篇读起来很顺的总结

但如果要把它做成真正可交付的 Agent，Harness 至少还要承担这些职责：

1. 把用户输入标准化为明确任务参数
2. 调用搜索、知识库和文档读取工具
3. 对抓回来的材料做去重、切片、排序和时间过滤
4. 为长任务保存中间结果，避免上下文丢失
5. 检查输出是否覆盖“趋势、原因、案例、风险、结论”
6. 缺项时触发补检索、重写或人工接管
7. 工具失败时切换备用路径或执行重试

这个案例的关键不是“模型会不会写摘要”，而是“系统能不能把摘要生产过程做成可重复、可校验、可回放的流水线”。

## 常见误区

### 误区 1：把 Agent 理解成“会调用工具的聊天框”

工具接入只是第一步。没有状态管理、验证和恢复，工具越多，失败面反而越大。

### 误区 2：把 Memory 当作唯一真相源

长期记忆适合存偏好和稳定习惯，不适合替代显式规则文件、任务合同和验证命令。旧记忆比没有记忆更危险。

### 误区 3：以为模型升级等于系统升级

模型升级会改善理解和生成，但不会自动补齐权限、重试、回滚、评估和审计能力。系统短板仍然会暴露在 harness 层。

### 误区 4：把高风险任务直接交给高自治 Agent

OpenAI 在 agent safety 文档里明确强调 tool approvals、输入 guardrails 和 trace grading / evals 的重要性。对高风险动作来说，正确做法不是盲目放权，而是把审批、验证和观测前置进 harness。

## 一套更实用的落地清单

如果你要把“Agent = Model + Harness”真的落到项目里，最值得先设计的不是 prompt 花样，而是下面 6 件事：

1. `Task contract`：输入、目标、边界、完成条件是否明确
2. `Tool schema`：工具描述、参数约束、权限范围是否清晰
3. `State model`：阶段、重试、等待、人工接管等状态是否显式
4. `Verification`：有哪些命令、断言、截图、日志可以证明任务完成
5. `Recovery path`：失败后是重试、降级、回滚还是人工接管
6. `Observability`：能否追踪提示词、工具调用、中间结果和最终证据

如果这 6 件事没有设计清楚，系统大概率还停留在“有一点 agent 味道的 demo”，而不是可进入真实流程的工程系统。

## 课堂提炼

### 先记住一句话

**模型决定上限，Harness 决定下限。**

模型决定它最理想情况下能有多聪明；Harness 决定它在真实环境下最低还能不能稳。

### 再记住一个判断

未来 AI 工程的核心竞争力，不只是“会不会用模型”，而是“能不能把模型组织成一个可靠系统”。

### 最后记住一条行动建议

与其只卷提示词技巧，不如把时间投入到这些能力上：

- workflow 编排
- 工具协议设计
- 记忆与规则分层
- sandbox 与权限边界
- 验证、恢复与评估
- 多 agent 的角色划分与交接

## 课堂讨论题

如果你要带一场 30 到 60 分钟的小组讨论，下面这 5 个问题最容易把“概念理解”推进到“工程判断”：

1. 你所在团队目前遇到的 Agent 问题，更像是模型问题，还是 harness 问题？
2. 哪些任务其实更适合固定 workflow，而不是高自治 agent？
3. 你们现在是否已经有显式的状态机、验证命令和失败恢复路径？
4. 如果明天要把一个异步 agent 接进真实研发流程，最先该补哪 3 个基础设施？
5. 在你们的业务场景里，什么样的任务必须保留人工审批或人工接管？

## 练习题

### 练习 1：职责拆分

请把下面这些能力分别归到 `Model` 或 `Harness`：

- 理解用户真实意图
- 调用数据库查询接口
- 跟踪任务是否进入“等待外部输入”
- 检查输出 JSON 是否符合 schema
- 在工具失败后决定是否重试

参考答案方向：

- 更偏 `Model`：意图理解、步骤规划、内容生成
- 更偏 `Harness`：工具执行、状态跟踪、schema 校验、重试与回滚

### 练习 2：系统诊断

请选一个你熟悉的 AI coding 产品或内部 Agent，尝试用下面 6 个维度给它做一次快速诊断：

| 维度 | 你要检查什么 |
| --- | --- |
| Task contract | 目标和边界是否明确 |
| Tool schema | 工具参数和权限是否清楚 |
| State model | 是否知道当前处于哪个阶段 |
| Verification | 是否有证据证明完成 |
| Recovery path | 失败后是否知道怎么退 |
| Observability | 是否能看到中间过程 |

如果某两项明显偏弱，那么大概率就是这个系统当前最值得补的 harness 短板。

## 课后作业

为了让这篇不只停留在概念层，课后可以布置一个很实用的小作业：

> 选择你们团队正在使用的一个 Agent 或 AI coding 工具，写一页评估卡，标题就叫“它的 harness 够不够强？”

至少写清这 5 项：

- 它接了哪些工具
- 它如何保存上下文和状态
- 它如何验证结果
- 它失败后如何恢复
- 哪些步骤仍然必须人工兜底

只要学员能把这张卡写出来，通常就说明他已经从“会用工具”进入“会判断系统”的阶段。

## 讲师提示

- 如果学员主要来自产品或管理侧，重点讲“为什么工程重心迁移”和“为什么 harness 才是组织资产”。
- 如果学员主要来自工程侧，重点讲“状态、验证、恢复、审批”这 4 个词。
- 如果课堂时间有限，可以压缩 `Model` 章节，把更多时间留给案例、误区和练习题。
- 如果你希望做成 1 页课件摘要，可以直接保留图 1、图 3、工程重心对比表和 6 条落地清单。

## 来源

以下资料共同支持本文对 `workflow / agent / harness / guardrails` 的工程归纳。本文中的结构图和表述是基于这些公开资料做的中文归纳，不是官方原文逐字翻译。

- LangChain Blog，2026-03-10：[The Anatomy of an Agent Harness](https://blog.langchain.com/the-anatomy-of-an-agent-harness/)
- Anthropic，2024-12-19：[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- Anthropic Docs：[Tool use with Claude](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)
- OpenAI API Docs：[Safety in building agents](https://platform.openai.com/docs/guides/agent-builder-safety)

## 延伸阅读

<RelatedReadings
  title="继续阅读与落地路径"
  description="这篇负责建立结构认知。下一步应该把结构认知落到规则、工作流和真实交付链。"
  items={[
    {
      title: '上下文、记忆与规则',
      href: '/docs/standards/context-memory-and-rules',
      description: '继续把 harness 里的 rules、context 和 memory 分层讲清楚。',
    },
    {
      title: '异步 Agent 交付链',
      href: '/docs/workflows/async-agent-delivery',
      description: '看 Agent 如何进入 issue、verify、review 和 PR 的正式交付链。',
    },
    {
      title: '多 Agent 协作',
      href: '/docs/workflows/multi-agent-collaboration',
      description: '把单 agent 进一步扩展成角色分工、并行执行和收口机制。',
    },
    {
      title: '质量门禁与 Review',
      href: '/docs/standards/review-quality-gates',
      description: '理解为什么 Agent 越能执行，人工 review 和验证证据越重要。',
    },
  ]}
/>
