---
title: 前端工程师的 AI Coding 指南
description: AI 辅助组件开发、样式调试和性能优化的实用方法。
slug: /roles/frontend
sidebar_label: 前端工程师
tags: [ai-coding, frontend, role-based]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-12
source_window_end: 2026-03-12
market_status: current
---

# 前端工程师的 AI Coding 指南

## 典型 AI Coding 场景

### 1. 组件开发与重构
- 从设计稿生成 React/Vue 组件骨架
- 重构现有组件，提取可复用逻辑
- 补充 TypeScript 类型定义
- 相关教程：[Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)

### 2. 样式调试与响应式适配
- 快速调试 CSS 布局问题
- 生成响应式断点代码
- 适配暗色模式
- 相关工具：[Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)

### 3. 性能优化
- 识别渲染性能瓶颈
- 生成 memo/useMemo 优化代码
- 优化 bundle size
- 相关案例：[Windsurf 维护到 PR 案例](/docs/case-studies/windsurf-maintenance-to-pr)

### 4. 测试用例生成
- 为组件生成单元测试
- 生成 E2E 测试脚本
- 补充边界用例
- 相关教程：[Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)

### 5. 可访问性验证
- 补充 ARIA 属性
- 键盘导航支持
- 屏幕阅读器适配
- 相关标准：[AI 开发规范](/docs/ai-development-standards)

## 推荐工具与工作流

### 主入口选择
- IDE-first：[Cursor](/docs/tools/ide-first/cursor/quick-start) 或 [Windsurf](/docs/tools/ide-first/windsurf/quick-start)
- 终端入口：[Claude Code](/docs/tools/terminal-agents/claude-code/quick-start)
- 平台入口：[GitHub Copilot](/docs/tools/platforms/github-copilot/quick-start)

### 推荐工作流
1. [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) - 日常维护
2. [Spec-First](/docs/workflows/patterns/spec-first/runbook) - 新功能开发
3. [Issue to Draft PR](/docs/workflows/patterns/issue-to-draft-pr/runbook) - 任务交接

## 可复用资产

### 规则文件模板
```markdown
## Frontend Engineering Rules

- Use TypeScript for all new components
- Follow Airbnb React style guide
- Ensure all interactive elements are keyboard accessible
- Run `npm run lint` and `npm run test` before commit
- Use CSS modules or styled-components, avoid inline styles
```

### Prompt 模板
**组件生成 Prompt**：
```
根据以下设计要求生成 React 组件：
- 组件名：[ComponentName]
- Props：[列出 props 和类型]
- 样式要求：[描述样式]
- 可访问性：确保键盘导航和 ARIA 支持
- 测试：生成基础单元测试
```

**样式调试 Prompt**：
```
当前 CSS 布局问题：[描述问题]
期望效果：[描述期望]
约束条件：[浏览器兼容性、响应式要求等]
请提供修复方案并解释原因。
```

### 验证脚本
```bash
# 前端验证脚本
npm run lint
npm run type-check
npm run test -- --coverage
npm run build
```

## 跨团队交付物

### 给设计师
- 组件实现与设计稿的差异说明
- 技术限制与替代方案建议
- 可复用组件库文档

### 给后端工程师
- API 接口需求文档
- 数据格式约定
- 错误处理规范

### 给测试工程师
- 组件测试用例清单
- E2E 测试场景描述
- 已知边界条件

### 给产品经理
- 功能实现进度
- 技术债务清单
- 性能优化建议

## 下一步

- 先跑一条主线：[30 分钟上手](/docs/start/30-minute-quick-start)
- 选择主工具：[工具教程首页](/docs/tools)
- 固定工作流：[工作流教程首页](/docs/workflows)
- 看真实案例：[实战案例首页](/docs/case-studies)
