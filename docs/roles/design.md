---
title: 设计师的 AI Coding 指南
description: AI 辅助设计系统、组件生成和可访问性验证的实用方法。
slug: /roles/design
sidebar_label: 设计师
tags: [ai-coding, design, role-based]
track: cross-track
kind: guide
content_form: guide
audience: designer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-12
source_window_end: 2026-03-12
market_status: current
---

# 设计师的 AI Coding 指南

## 典型 AI Coding 场景

### 1. 设计稿到代码转换
- 从 Figma/Sketch 设计稿生成组件代码
- 生成响应式布局代码
- 转换设计 token 为 CSS 变量
- 相关工具：[Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)

### 2. 设计系统维护
- 生成组件库文档
- 维护设计 token 一致性
- 生成组件使用示例
- 相关工具：[Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)

### 3. 原型验证
- 快速生成交互原型
- 验证动画效果
- 测试用户流程
- 相关教程：[Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)

### 4. 可访问性验证
- 检查颜色对比度
- 生成 ARIA 标签
- 验证键盘导航
- 相关标准：[AI 开发规范](/docs/ai-development-standards)

### 5. 设计文档生成
- 生成组件使用指南
- 编写设计决策文档
- 创建设计规范
- 相关教程：[工作流目录](/docs/workflows/workflow-catalog)

## 推荐工具与工作流

### 主入口选择
- IDE-first：[Cursor](/docs/tools/ide-first/cursor/quick-start) 或 [Windsurf](/docs/tools/ide-first/windsurf/quick-start)
- 平台入口：[GitHub Copilot](/docs/tools/platforms/github-copilot/quick-start)

### 推荐工作流
1. [Spec-First](/docs/workflows/patterns/spec-first/runbook) - 设计规范驱动
2. [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) - 组件优化
3. [Windsurf 维护到 PR 案例](/docs/case-studies/windsurf-maintenance-to-pr) - 实战参考

## 可复用资产

### 规则文件模板
```markdown
## Design System Rules

- Follow design token naming conventions
- Ensure all components meet WCAG 2.1 AA standards
- Use semantic HTML elements
- Maintain consistent spacing scale (4px base)
- Document component variants and states
```

### Prompt 模板
**设计稿转代码 Prompt**：
```
根据以下设计要求生成组件代码：
- 组件名：[ComponentName]
- 设计稿：[Figma链接或描述]
- 样式要求：[颜色、间距、字体等]
- 响应式断点：[mobile/tablet/desktop]
- 可访问性：确保 WCAG 2.1 AA 合规
```

**设计 Token 生成 Prompt**：
```
从以下设计规范生成 CSS 变量：
- 颜色系统：[主色、辅助色、中性色]
- 间距系统：[4px 基准]
- 字体系统：[字体族、字号、行高]
- 圆角系统：[圆角值]

输出格式：CSS 自定义属性
```

## 跨团队交付物

### 给前端工程师
- 设计稿标注
- 组件规范文档
- 设计 token 定义
- 交互动画说明

### 给产品经理
- 设计方案说明
- 用户体验优化建议
- 技术实现限制说明
- 设计迭代记录

### 给测试工程师
- 视觉还原验收标准
- 交互测试用例
- 可访问性测试清单
- 多端适配要求

## 下一步

- 先跑一条主线：[30 分钟上手](/docs/start/30-minute-quick-start)
- 选择主工具：[工具教程首页](/docs/tools)
- 固定工作流：[工作流教程首页](/docs/workflows)
- 看真实案例：[实战案例首页](/docs/case-studies)
