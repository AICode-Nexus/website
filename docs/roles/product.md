---
title: 产品经理的 AI Coding 指南
description: AI 辅助需求分析、原型验证和交付跟踪的实用方法。
slug: /roles/product
sidebar_label: 产品经理
tags: [ai-coding, product, role-based]
track: cross-track
kind: guide
content_form: guide
audience: product-manager
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 产品经理的 AI Coding 指南

## 机制专题

这一页保留产品角色总览；如果你要把 `rules / skills / MCP / 工具选择` 拆开看，继续进入这些子页：

- [规则与规范文档](/docs/roles/product/rules-and-instruction-files)
- [Skills 与 MCP](/docs/roles/product/skills-and-mcp)
- [工具匹配与选型](/docs/roles/product/tool-fit-and-selection)
- [产品训练包模板](/docs/roles/product/templates)

想直接复制更稳的结构，再回头读原理：去 [产品训练包模板](/docs/roles/product/templates)。

## 典型 AI Coding 场景

### 1. 需求分析与 PRD 编写
- 从用户反馈生成需求清单
- 补充 PRD 的技术可行性分析
- 生成用户故事和验收标准
- 相关教程：[Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)

### 2. 原型验证与技术评估
- 快速生成原型代码验证可行性
- 评估技术方案的复杂度和风险
- 生成技术选型对比文档
- 相关工具：[工具选型地图](/docs/tools/map)

### 3. 竞品分析与功能对比
- 分析竞品功能实现方式
- 生成功能对比表
- 评估实现成本
- 相关教程：[工作流目录](/docs/workflows/workflow-catalog)

### 4. 需求拆分与任务分配
- 将 PRD 拆分为可开发的 Story
- 生成技术任务清单
- 评估开发工时
- 相关教程：[Issue to Draft PR](/docs/workflows/patterns/issue-to-draft-pr/runbook)

### 5. 交付跟踪与验收
- 生成验收测试用例
- 跟踪功能实现进度
- 编写发布说明
- 相关教程：[Spec-Driven AI Delivery](/docs/spec-driven-ai-delivery)

## 推荐工具与工作流

### 主入口选择
- IDE-first：[Cursor](/docs/tools/ide-first/cursor/quick-start) - 适合快速验证原型
- 终端入口：[Claude Code](/docs/tools/terminal-agents/claude-code/quick-start) - 适合技术调研
- 平台入口：[GitHub Copilot](/docs/tools/platforms/github-copilot/quick-start) - 适合代码审查

### 推荐工作流
1. [Spec-First](/docs/workflows/patterns/spec-first/runbook) - 需求驱动开发
2. [Issue to Draft PR](/docs/workflows/patterns/issue-to-draft-pr/runbook) - 需求到实现
3. [Workflow Playbook](/docs/workflows/playbooks/workflow-playbook) - 按任务找流程

## 默认训练包

| 当前阶段 | 建议先复制什么 | 目的 |
| --- | --- | --- |
| 需求刚启动 | [发现与调研 Brief 模板](/docs/roles/product/templates/discovery-brief) | 先把问题、假设和证据来源锁住 |
| 准备形成正式需求 | [PRD 大纲模板](/docs/roles/product/templates/prd-outline) | 先把范围、验收和依赖写清 |
| 方案或原型要验证 | [原型验证模板](/docs/roles/product/templates/prototype-validation) | 先把验证目标和成功判定写清 |
| 要跨团队推进或上线 | [Handoff 与验收模板](/docs/roles/product/templates/handoff-and-acceptance) | 先把交接链接、风险和验收整理好 |

想直接看一份填好的成品：去 [示例：会员推荐计划训练包](/docs/roles/product/templates/example-referral-launch-pack)。

## 可复用资产

### 规则文件模板
在项目根目录创建 `.cursorrules` 或 `AGENTS.md`：
```markdown
## Product Requirements Rules

- Always validate requirements against user stories
- Include acceptance criteria for every feature
- Document technical constraints and dependencies
- Link to related PRD sections in code comments
- Generate test cases from acceptance criteria
```

### Prompt 模板
**需求分析 Prompt**：
```
根据以下用户反馈生成需求清单：
[用户反馈内容]

要求：
- 提取核心需求和痛点
- 评估优先级（P0/P1/P2）
- 识别技术依赖和风险
- 生成用户故事格式
```

**技术可行性评估 Prompt**：
```
评估以下功能的技术可行性：
功能描述：[功能描述]
技术栈：[当前技术栈]

请提供：
- 实现方案建议
- 技术难点分析
- 预估工作量
- 潜在风险
```

### 验证脚本
```bash
# PRD 验证脚本
# 检查 PRD 是否包含必要章节
grep -q "## 背景" PRD.md && echo "✓ 背景" || echo "✗ 缺少背景"
grep -q "## 目标" PRD.md && echo "✓ 目标" || echo "✗ 缺少目标"
grep -q "## 用户故事" PRD.md && echo "✓ 用户故事" || echo "✗ 缺少用户故事"
grep -q "## 验收标准" PRD.md && echo "✓ 验收标准" || echo "✗ 缺少验收标准"
```

## 跨团队交付物

### 给设计师
- 功能需求文档（PRD）
- 用户故事和场景描述
- 交互流程说明
- 验收标准

### 给开发工程师
- 技术需求文档
- API 接口定义
- 数据模型设计
- 验收测试用例

### 给测试工程师
- 测试用例清单
- 验收标准
- 边界条件说明
- 回归测试范围

### 给运营团队
- 功能发布说明
- 用户使用指南
- FAQ 文档
- 数据埋点需求

## 下一步

- 先跑一条主线：[30 分钟上手](/docs/start/30-minute-quick-start)
- 选择主工具：[工具教程首页](/docs/tools)
- 固定工作流：[工作流教程首页](/docs/workflows)
- 看真实案例：[实战案例首页](/docs/case-studies)
