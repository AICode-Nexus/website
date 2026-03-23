---
title: 从 AI First 到 Harness 工程 - 完整演讲稿
description: 50分钟技术分享的完整演讲稿，探讨从"AI优先"到"Harness工程"的演进
date: 2026-03-23
tags: [AI First, Harness Engineering, Agent, Speech]
duration: 50 分钟
---

# 从 AI First 到 Harness 工程

## 开场（5 分钟）

大家好。今天我想和大家聊一个可能很多团队都遇到过的问题。

**请举手示意一下：你们团队已经在用 AI 编码工具了吗？Copilot、Cursor、Claude Code？**

好，看起来大部分团队都已经 AI First 了。那我再问一个问题：

**AI coding 让你们更轻松了，还是更累了？**

我看到不少苦笑。这其实是一个非常真实的矛盾——AI coding 让代码生成速度大幅提高了，但产品的交付时间并没有缩短。为什么？因为**人在代码 review 和测试环节成了瓶颈**。AI 写得越快，堆到你面前等着 review 的 PR 就越多，你反而更累了。

```mermaid
graph LR
    A["AI 代码生成<br/>⚡ 速度大幅提升"] --> B["代码 Review<br/>🧑 人工瓶颈"]
    B --> C["测试验证<br/>🧑 人工瓶颈"]
    C --> D["产品交付<br/>⏱️ 时间未缩短"]

    style A fill:#10b981,color:#fff
    style B fill:#ef4444,color:#fff
    style C fill:#ef4444,color:#fff
    style D fill:#f59e0b,color:#fff
```

这张图就是现状——AI 加速了左边，但右边的人工环节成了新的瓶颈。整条链路的交付速度，取决于最慢的那个环节。

那怎么办？

今天我想告诉大家的核心判断是：

> **我们要从"写代码的人"变成"给 AI 提供好的工具、好的反馈的人"。**

换句话说，从使用模型，转变为**驾驭模型**。这就是从 AI First 到 Harness 工程的转变。

我会用一个公式来贯穿整场分享：

**Agent 效能 = 模型质量 × Harness 质量**

注意这里是乘法，不是加法。如果 Harness 接近 0，无论模型多强，系统整体效果仍然接近 0。

```mermaid
quadrantChart
    title Agent 效能象限
    x-axis "Harness 质量低" --> "Harness 质量高"
    y-axis "模型质量低" --> "模型质量高"
    quadrant-1 "目标：可靠的 Agent 系统"
    quadrant-2 "当前多数团队：强模型 + 弱 Harness"
    quadrant-3 "起步阶段"
    quadrant-4 "工程扎实但模型受限"
```

接下来的 45 分钟，我会从三个部分展开：
1. 为什么 AI First 不够
2. 什么是 Harness 工程
3. 如何落地

---

## 第一部分：AI First 为什么不够（10 分钟）

### 1. 模型有物理上限

首先我想说一句可能缓解大家焦虑的话：

> **大家其实不必过于焦虑，模型是有物理上限的。**

大模型基于 Transformer 架构，本质上是在预测下一个 TOKEN。这个架构决定了几个物理规律：

- **上下文窗口有限且昂贵**——每多一个 token，推理成本都在增加
- **KV cache 是核心优化点**——尽量不破坏前缀，复用缓存可降低成本、提升推理速度。比如 Claude Code 命中 prompt cache 时，成本直降 90%
- **注意力机制有上限**——模型在超长上下文中的"注意力"会衰减

理解了这些物理规律，你就明白为什么不能把所有东西都塞进 prompt，为什么上下文管理不是"越多越好"，而是需要**治理**。

```mermaid
graph TB
    subgraph "Transformer 的物理规律"
        A["上下文窗口有限"] --> D["不能无限塞信息"]
        B["KV Cache 复用"] --> E["前缀稳定 = 成本降 90%"]
        C["注意力机制衰减"] --> F["长上下文 ≠ 好效果"]
    end

    D --> G["需要上下文治理<br/>而不是上下文堆砌"]
    E --> G
    F --> G

    style G fill:#2563eb,color:#fff
```

### 2. 三个常见失败模式

理解了物理规律之后，让我具体说说三种典型的失败模式。

**失败模式一：只换模型不换流程**

很多团队的做法是：升级到最新模型，但工作方式完全没变。还是把所有期望塞进一条 prompt，还是让 AI 直接输出代码然后人工 review，还是没有验证链、没有恢复路径。

这就像你给一辆老爷车换了一个 F1 引擎，但刹车系统、悬挂系统、轮胎都没升级。跑得更快，但也更容易失控。

**失败模式二：Prompt 即全部**

第二种失败模式是把所有工程问题都试图用 Prompt 解决。"你要遵守这些规则"、"你要调用这些工具"、"你要记住这些上下文"、"你出错了要这样恢复"——全部写进 Prompt。

结果呢？Prompt 越来越长，KV cache 越来越难命中，成本越来越高，模型越来越困惑。

这就是违背了 Transformer 的物理规律——**Prompt 不是工程系统**。工具调用、状态管理、错误恢复、权限控制，这些应该是工程基础设施，不应该依赖模型的"记忆力"。

**失败模式三：无验证就交付**

AI 写完代码，看起来没问题，直接合并。没有 lint、没有测试、没有类型检查。

这里我引用周晓在 Harness 分享里的一句话：

> **AI 写完代码之后，它没有帮你把剩下的工作搞定——这不就是大家的机会吗？**

对，验证、测试、review、交付——这些"剩下的工作"，恰恰就是 Harness 工程要解决的问题，也是工程师在 AI 时代最大的价值所在。

```mermaid
graph LR
    subgraph "三个失败模式"
        direction TB
        F1["❌ 只换模型不换流程<br/>F1引擎 + 老爷车底盘"]
        F2["❌ Prompt 即全部<br/>违背 Transformer 物理规律"]
        F3["❌ 无验证就交付<br/>AI 说完成 ≠ 真的完成"]
    end

    F1 --> R["根因：缺少 Harness"]
    F2 --> R
    F3 --> R
    R --> S["解法：构建工程系统"]

    style R fill:#ef4444,color:#fff
    style S fill:#10b981,color:#fff
```

### 3. 竞争焦点已经转移

最后一个宏观判断：**AI 产品的竞争焦点，正在从"模型能不能写"转向"谁来编排和调度"。**

模型经常是可替换的。同一条任务链，今天接 GPT-4，明天可以换 Claude，后天换 Gemini。但任务契约、工具协议、状态机、验证命令、恢复机制、评估链路——这些才是可持续积累的工程资产。

**如果你不是模型，你就是 Harness。**

---

## 第二部分：什么是 Harness 工程（15 分钟）

### 核心定义

**Harness = 模型之外、让 Agent 可靠工作的一切工程机制。**

它不是"模型外面的一层壳"，而是 Agent 的操作系统。Model 是大脑，负责思考；Harness 就是身体、工具、环境和规则，负责执行、记忆、恢复和控制。

```mermaid
block-beta
    columns 3

    block:agent:3
        columns 3
        A["🧠 Model<br/>理解 · 推理 · 生成"]:3
        space:3
        B1["Prompt 编排"] B2["工具路由"] B3["记忆管理"]
        B4["状态机"] B5["运行时/沙箱"] B6["护栏与恢复"]
    end

    style A fill:#8b5cf6,color:#fff
    style B1 fill:#2563eb,color:#fff
    style B2 fill:#2563eb,color:#fff
    style B3 fill:#2563eb,color:#fff
    style B4 fill:#2563eb,color:#fff
    style B5 fill:#2563eb,color:#fff
    style B6 fill:#2563eb,color:#fff
```

### 1. Harness 能力栈：六层架构

```mermaid
graph TB
    subgraph Harness["Harness 能力栈"]
        direction TB
        L1["🎯 Prompt 编排<br/>system prompt · task contract · instruction files"]
        L2["🔌 工具路由<br/>function calling · MCP · API gateway"]
        L3["🧠 记忆管理<br/>会话上下文 · 长期记忆 · 压缩摘要"]
        L4["⚙️ 状态机<br/>task state · event log · workflow engine"]
        L5["📦 运行时/沙箱<br/>sandbox · container · browser · worktree"]
        L6["🛡️ 护栏与恢复<br/>schema validation · approvals · retry · rollback"]

        L1 --> L2 --> L3 --> L4 --> L5 --> L6
    end

    style L1 fill:#7c3aed,color:#fff
    style L2 fill:#6d28d9,color:#fff
    style L3 fill:#5b21b6,color:#fff
    style L4 fill:#4c1d95,color:#fff
    style L5 fill:#3b0764,color:#fff
    style L6 fill:#1e1b4b,color:#fff
```

让我逐层展开。

**第一层：Prompt 编排** — 模型当前该按什么角色、目标和约束工作？不是把所有东西塞进一条 prompt，而是分层管理：rules file（长期硬约束）、task contract（当前任务边界）、working memory（会话状态）。

**第二层：工具路由** — 这里有一个重要标准：好的工具应该**对 AI 友好**。周晓在分享中提到了三个标准：
1. **贴近物理现实** — 比如 LSP（Language Server Protocol）能让模型感知人看到的代码问题并动态修改
2. **更结构化的输出** — 在上下文窗口有限时，通过更少的、更结构化的信息给模型
3. **重视错误反馈** — 好的错误信息是模型自我修正的关键输入

**第三层：记忆管理** — 上下文管理的关键不是"越多越好"。有些产品（如 Manus）在探索将上下文压缩到文件来解决问题。核心思路是：减少重复计算、治理上下文，而不是堆砌上下文。

**第四层：状态机** — 当前任务在哪一步？下一步走哪条边？是继续执行、等待输入，还是人工接管？

**第五层：运行时/沙箱** — 代码在哪执行？权限边界在哪？

**第六层：护栏与恢复** — 出错、越界、注入或结果异常时怎么办？

**关键不是"多加几个工具"，而是把六层连成一套可靠的执行回路。**

### 2. 好工具的标准：MCP、Skill、Sub Agent

工具路由这一层值得深入展开。AI 时代的"好工具"和传统工具不一样。

```mermaid
mindmap
  root((好工具的标准))
    对 AI 友好
      结构化输入/输出
      清晰的错误信息
      贴近物理现实
    典型形态
      MCP Server
        标准化工具协议
        跨工具共享上下文
      Skill
        封装可复用知识
        包含流程和规则
      Sub Agent
        突破单 agent 注意力上限
        角色分工 并行执行
      LSP
        让模型感知代码问题
        动态修改反馈
```

这里有一个重要的洞察：当模型上下文窗口有限且昂贵时，**多智能体（Multi Agent）可以突破单 agent 注意力机制的上限**。每个 sub agent 有自己的上下文窗口，专注于自己的任务，最后收口汇总——这比把所有东西塞进一个超长上下文要更高效、更可靠。

### 3. Workflow vs Agent

**并不是所有系统都应该做成高自治 Agent。**

```mermaid
graph TD
    Q{"这个任务的<br/>分支和不确定性高吗？"}
    Q -->|"低：步骤固定、路径清晰"| W["✅ 用 Workflow<br/>预定义编排，更可预测"]
    Q -->|"高：信息不完整、需动态规划"| A["✅ 用 Agent<br/>模型动态决策，自主性更高"]
    A --> H["⚠️ 但仍需 Harness<br/>控制执行边界和恢复路径"]

    style W fill:#10b981,color:#fff
    style A fill:#3b82f6,color:#fff
    style H fill:#f59e0b,color:#000
```

判断顺序：
1. 先问能不能用固定 workflow 解决
2. 只有当任务分支多、信息不完整时，再引入 agent
3. 即使引入 agent，也要保留 harness 的控制

> **Harness 的第一职责不是"放大自由度"，而是"在必要自由度之外收紧不确定性"。**

### 4. 工程重心转移

```mermaid
timeline
    title 软件工程重心演变

    section 传统应用开发
        写业务逻辑 : 设计接口
        : 优化性能
        : 写测试

    section Copilot 辅助开发
        写 Prompt : 管理上下文
        : 人工 Review AI 输出

    section Agent 系统开发
        定义任务边界 : 设计工具协议
        : 管理上下文分层
        : 设计验证链和恢复路径
        : 设计可观测性
```

这不是说"软件工程不重要了"。恰恰相反，软件工程从功能编码进一步上移到了**执行回路设计**。

研发工程师的角色定义正在转变：

> **从写代码的人，变成给 agent 设计环境、反馈的人。**
> **从使用模型，变为驾驭模型。**
> **关键不再是你能写什么代码，而是你能给 agent 提供什么。**

---

## 第三部分：如何落地（15 分钟）

### AI Dev Loop：让 AI 端到端工作

在讲具体清单之前，先看一张更大的图。我们要构建的不是"AI 辅助"，而是一个完整的 **AI Dev Loop**——让 AI 完成代码编写、验收及交付，人类仅需 review 交付产物和稳定性。

```mermaid
graph LR
    subgraph "AI Dev Loop"
        I["📋 Issue/Spec"] --> P["📝 Plan"]
        P --> C["💻 Agent 编码"]
        C --> V["✅ 自动验证<br/>lint · test · build"]
        V -->|"通过"| R["👁️ 人工 Review<br/>仅 Review 交付产物"]
        V -->|"失败"| C
        R -->|"通过"| M["🚀 Merge/Deploy"]
        R -->|"需修改"| C
    end

    style I fill:#6366f1,color:#fff
    style P fill:#8b5cf6,color:#fff
    style C fill:#3b82f6,color:#fff
    style V fill:#10b981,color:#fff
    style R fill:#f59e0b,color:#000
    style M fill:#10b981,color:#fff
```

注意这里的关键设计：**人只出现在 Review 环节**，而不是每一步都需要人介入。AI 负责编码和自动验证的闭环，人负责最终交付质量的把关。

要让这个循环转起来，你需要以下六步。

### 六步实施清单

```mermaid
graph TB
    subgraph "六步落地清单"
        direction LR
        T1["1️⃣ Task Contract<br/>输入 · 输出 · 边界 · 完成条件"]
        T2["2️⃣ Tool Schema<br/>描述 · 参数 · 权限 · 格式"]
        T3["3️⃣ State Model<br/>阶段 · 重试 · 等待 · 接管"]
        T4["4️⃣ Verification<br/>lint · test · build · 审批"]
        T5["5️⃣ Recovery Path<br/>重试 · 降级 · 回滚 · 人工"]
        T6["6️⃣ Observability<br/>提示词 · 调用 · 中间结果 · 证据"]

        T1 --> T2 --> T3 --> T4 --> T5 --> T6
    end

    style T1 fill:#7c3aed,color:#fff
    style T2 fill:#6d28d9,color:#fff
    style T3 fill:#5b21b6,color:#fff
    style T4 fill:#4c1d95,color:#fff
    style T5 fill:#3b0764,color:#fff
    style T6 fill:#1e1b4b,color:#fff
```

**第一步：Task Contract（任务契约）**

每个任务必须有明确的输入、输出、可编辑范围、完成条件和交付证据。

举个 Bugfix 任务的契约：
- 输入：Issue 链接 + 复现步骤
- 输出：修复后的代码 + 测试通过证明
- 可编辑范围：只能改相关模块，不能动其他文件
- 完成条件：复现步骤不再触发错误 + 回归测试通过
- 证据：测试输出截图 + git diff

**第二步：Tool Schema（工具协议）**

工具不是"随便调"的，要对 AI 友好：
- 清晰的工具描述和参数约束
- 明确的权限范围
- 结构化的返回格式
- **好的错误信息**——这点很多人忽略，但对模型自我修正至关重要

**第三步：State Model（状态机）**

```mermaid
stateDiagram-v2
    [*] --> pending: 任务创建
    pending --> in_progress: Agent 开始执行
    in_progress --> waiting_input: 需要额外信息
    in_progress --> waiting_approval: 高风险操作
    in_progress --> failed: 执行失败
    in_progress --> verifying: 执行完成
    waiting_input --> in_progress: 收到输入
    waiting_approval --> in_progress: 审批通过
    waiting_approval --> failed: 审批拒绝
    failed --> in_progress: 重试 (≤3次)
    failed --> human_takeover: 超过重试上限
    verifying --> completed: 验证通过
    verifying --> in_progress: 验证失败，修复
    completed --> [*]
    human_takeover --> [*]
```

这张状态机图是 Harness 工程的核心。每个 agent 任务都应该有显式的状态转换，而不是一个黑箱。

**第四步：Verification（验证链）**

最小验证栈：lint → test → build/type check → 高风险目录审批 → PR 证据字段

构建 AI Native 的验证链时要注意：减少上下文消耗，提供好的错误反馈。比如 lint 报错时，不要给模型整个 lint 输出，而是只给相关的错误行和修复建议。

**第五步：Recovery Path（恢复路径）**

- 工具调用失败 → 重试一次，仍失败 → 切换备用工具或人工接管
- 测试失败 → 分析失败原因 → 修复 → 重新测试，超过 3 次 → 人工接管
- 越权操作 → 立即阻止 → 记录日志 → 通知人工

**第六步：Observability（可观测性）**

能否追踪提示词、工具调用、中间结果和最终证据？如果不能，你的 agent 就是一个黑箱。

### 上下文分层策略

上下文管理的原则是**治理而非堆砌**。利用 KV cache 的物理规律——保持前缀稳定、复用缓存。

```mermaid
graph TB
    subgraph "上下文分层（从稳定到易变）"
        R["📜 Rules File<br/>CLAUDE.md / AGENTS.md<br/>长期硬约束 · 很少变动<br/>✅ KV Cache 友好"]
        S["📋 Spec / Contract<br/>当前任务边界<br/>每个任务不同"]
        W["💭 Working Memory<br/>当前会话状态<br/>随时变动"]
        L["🧠 Long-term Memory<br/>习惯和偏好<br/>缓慢积累"]
    end

    R --> S --> W
    L -.->|"按需注入"| W

    style R fill:#1e3a5f,color:#fff
    style S fill:#2563eb,color:#fff
    style W fill:#60a5fa,color:#fff
    style L fill:#93c5fd,color:#000
```

### 教学案例：从"辅助编码"到"AI Dev Loop"

让我用一个真实场景把这些概念串起来。

假设你的团队要修复一个线上 bug：用户在结账页面点击支付后，偶尔出现白屏。

**传统 AI 辅助方式**（AI First）：
1. 你把 bug 描述丢给 AI
2. AI 给你一段修复代码
3. 你手动 review、手动测试、手动提 PR
4. 人依然是每一步的瓶颈

**Harness 工程方式**（AI Dev Loop）：

```mermaid
sequenceDiagram
    participant H as 人
    participant A as Agent
    participant T as 工具链
    participant V as 验证链

    H->>A: Issue + 复现步骤（Task Contract）
    A->>T: 读取相关代码（Tool Router）
    A->>T: 执行复现脚本
    T-->>A: 错误堆栈 + 状态信息
    A->>A: 定位根因（Model 推理）
    A->>T: 编写修复代码
    A->>V: 运行 lint + test + build
    V-->>A: ❌ 2 个测试失败
    A->>A: 分析失败原因（Recovery）
    A->>T: 修改代码
    A->>V: 再次运行验证
    V-->>A: ✅ 全部通过
    A->>H: 提交 Draft PR + 证据
    H->>H: Review 交付产物（仅此一步）
```

在这个流程中，人只出现在最后的 Review 环节。Agent 自己完成了编码、验证、失败恢复的完整闭环。这就是 Harness 工程的价值——**释放人类的注意力，让人只做最高价值的判断。**

---

## 第四部分：常见误区与团队采纳（5 分钟）

### 四个误区

**误区一：把 Agent 理解成"会调用工具的聊天框"**

工具接入只是第一步。没有状态管理、验证和恢复，工具越多，失败面反而越大。

**误区二：把 Memory 当作唯一真相源**

长期记忆适合存偏好和稳定习惯，不适合替代显式规则文件、任务合同和验证命令。**旧记忆比没有记忆更危险。**

**误区三：以为模型升级等于系统升级**

模型升级会改善理解和生成，但不会自动补齐权限、重试、回滚、评估和审计能力。系统短板仍然暴露在 harness 层。

**误区四：上下文越多越好**

这违背了 Transformer 的物理规律。上下文管理要**治理**——该压缩的压缩，该丢弃的丢弃，该分层的分层。

```mermaid
graph TB
    subgraph "误区 → 正解"
        M1["❌ Agent = 聊天框 + 工具"] --> C1["✅ Agent = 模型 × 完整 Harness"]
        M2["❌ Memory 替代一切"] --> C2["✅ Rules + Contract + Memory 分层"]
        M3["❌ 模型升级 = 系统升级"] --> C3["✅ Harness 补齐才是系统升级"]
        M4["❌ 上下文越多越好"] --> C4["✅ 上下文要治理，不要堆砌"]
    end

    style M1 fill:#ef4444,color:#fff
    style M2 fill:#ef4444,color:#fff
    style M3 fill:#ef4444,color:#fff
    style M4 fill:#ef4444,color:#fff
    style C1 fill:#10b981,color:#fff
    style C2 fill:#10b981,color:#fff
    style C3 fill:#10b981,color:#fff
    style C4 fill:#10b981,color:#fff
```

### 团队采纳路径

```mermaid
graph LR
    subgraph "渐进式引入"
        P1["第一阶段<br/>📋 契约化"] --> P2["第二阶段<br/>🔧 自动化"] --> P3["第三阶段<br/>🤖 多 Agent"]
    end

    P1 --- D1["给每个任务写<br/>Task Contract"]
    P2 --- D2["接入工具链<br/>验证链 · 恢复路径"]
    P3 --- D3["角色分工<br/>并行执行 · 收口汇总"]

    style P1 fill:#6366f1,color:#fff
    style P2 fill:#8b5cf6,color:#fff
    style P3 fill:#a78bfa,color:#fff
```

不同角色的切入点：
- **产品**：从 Spec-First 工作流开始
- **前端/后端**：从 Bugfix 工作流开始
- **QA**：从 Test 工作流开始
- **DevOps**：从 CI/CD 集成开始

---

## 收尾（5 分钟）

### 三句话总结

```mermaid
graph TB
    S1["💡 Agent = 模型能力 × 工程系统<br/>不是更强的模型，而是模型 + Harness"] --> S2
    S2["🎯 核心竞争力 = 把模型组织成可靠系统<br/>不是会不会用模型，而是能不能驾驭模型"] --> S3
    S3["🔧 投入方向 = Harness 工程<br/>workflow 编排 · 工具协议 · 验证恢复 · 评估链路"]

    style S1 fill:#7c3aed,color:#fff
    style S2 fill:#6d28d9,color:#fff
    style S3 fill:#5b21b6,color:#fff
```

### 行动号召

最后给大家一个具体的行动建议：

**回去给你的下一个任务写一份 Task Contract。**

就五个问题：
1. 输入是什么？
2. 输出是什么？
3. 可编辑范围是什么？
4. 怎么验证完成？
5. 要交付什么证据？

这就是 Harness 工程的第一步。

记住：

> **我们要从写代码的人变成给 AI 提供好的工具、好的反馈的人。模型有物理上限，了解了边界之后不必过于焦虑——你的机会恰恰在 AI 没有搞定的那部分。**

### Q&A

好，我的分享到这里。接下来是 Q&A 时间，欢迎大家提问。

谢谢大家。
