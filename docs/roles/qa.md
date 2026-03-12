---
title: 测试工程师的 AI Coding 指南
description: AI 辅助测试用例生成、自动化脚本和缺陷分析的实用方法。
slug: /roles/qa
sidebar_label: 测试工程师
tags: [ai-coding, qa, testing, role-based]
track: cross-track
kind: role-guide
content_form: guide
audience: qa-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-12
source_window_end: 2026-03-12
market_status: current
---

# 测试工程师的 AI Coding 指南

## 典型 AI Coding 场景

### 1. 测试用例生成
- 从需求文档生成测试用例
- 补充边界条件测试
- 生成测试数据
- 相关教程：[Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)

### 2. 自动化测试脚本
- 生成单元测试代码
- 编写 E2E 测试脚本
- 生成 API 测试用例
- 相关工具：[Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)

### 3. 缺陷分析与复现
- 分析 bug 报告
- 生成缺陷复现步骤
- 编写回归测试
- 相关案例：[Claude Code Bugfix Loop](/docs/case-studies/claude-code-bugfix-loop)

### 4. 测试覆盖率分析
- 识别未覆盖代码路径
- 补充缺失测试用例
- 生成覆盖率报告
- 相关教程：[工作流目录](/docs/workflows/workflow-catalog)

### 5. 性能与压力测试
- 生成性能测试脚本
- 分析性能瓶颈
- 编写压力测试场景
- 相关案例：[Codex Refactor with Verification](/docs/case-studies/codex-refactor-with-verification)

## 推荐工具与工作流

### 主入口选择
- 终端入口：[Claude Code](/docs/tools/terminal-agents/claude-code/quick-start)
- 执行栈：[OpenAI Codex](/docs/tools/execution-stacks/openai-codex/quick-start) - 适合长链验证
- IDE-first：[Cursor](/docs/tools/ide-first/cursor/quick-start)

### 推荐工作流
1. [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) - 测试驱动
2. [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) - 终端测试
3. [Workflow Playbook](/docs/workflows/playbooks/workflow-playbook) - 测试任务手册

## 可复用资产

### 规则文件模板
```markdown
## QA Engineering Rules

- Write tests before fixing bugs (TDD)
- Ensure all tests are deterministic and repeatable
- Use meaningful test names that describe the scenario
- Mock external dependencies in unit tests
- Run full test suite before creating PR
- Document test data requirements
```

### Prompt 模板
**测试用例生成 Prompt**：
```
根据以下需求生成测试用例：
需求描述：[功能描述]
验收标准：[验收标准]

请生成：
- 正常流程测试用例
- 边界条件测试用例
- 异常场景测试用例
- 性能测试用例
- 测试数据准备脚本
```

**自动化测试脚本 Prompt**：
```
生成自动化测试脚本：
- 测试框架：[Jest/Pytest/Selenium]
- 测试类型：[单元测试/集成测试/E2E测试]
- 测试场景：[场景描述]
- 断言条件：[预期结果]
- Mock 数据：[需要 mock 的依赖]
```

### 验证脚本
```bash
# 测试验证脚本
npm run test:unit -- --coverage
npm run test:integration
npm run test:e2e
npm run test:performance
```

## 跨团队交付物

### 给开发工程师
- 缺陷报告
- 测试用例清单
- 回归测试范围
- 测试环境配置

### 给产品经理
- 测试报告
- 质量评估
- 风险清单
- 发布建议

### 给运维工程师
- 性能测试报告
- 压力测试结果
- 监控指标建议
- 环境配置要求

### 给设计师
- 可访问性测试报告
- 多端适配测试结果
- 用户体验问题反馈

## 下一步

- 先跑一条主线：[30 分钟上手](/docs/start/30-minute-quick-start)
- 选择主工具：[工具教程首页](/docs/tools)
- 固定工作流：[工作流教程首页](/docs/workflows)
- 看真实案例：[实战案例首页](/docs/case-studies)
