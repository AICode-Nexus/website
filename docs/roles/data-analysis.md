---
title: 数据分析师的 AI Coding 指南
description: AI 辅助数据清洗、可视化和报表生成的实用方法。
slug: /roles/data-analysis
sidebar_label: 数据分析师
tags: [ai-coding, data-analysis, role-based]
track: cross-track
kind: guide
content_form: guide
audience: data-analyst
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-12
source_window_end: 2026-03-12
market_status: current
---

# 数据分析师的 AI Coding 指南

## 机制专题

如果你要把数据分析角色中的规则文件、能力编排和入口选择拆开看，继续进入这些子页：

- [规则与规范文档](/docs/roles/data-analysis/rules-and-instruction-files)
- [Skills 与 MCP](/docs/roles/data-analysis/skills-and-mcp)
- [工具匹配与选型](/docs/roles/data-analysis/tool-fit-and-selection)

## 典型 AI Coding 场景

### 1. 数据清洗与预处理
- 生成数据清洗脚本
- 处理缺失值和异常值
- 数据格式转换
- 相关工具：[Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)

### 2. SQL 查询优化
- 生成复杂 SQL 查询
- 优化查询性能
- 编写数据验证脚本
- 相关工具：[Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)

### 3. 数据可视化
- 生成图表代码（matplotlib/plotly）
- 创建交互式 dashboard
- 生成数据报告
- 相关教程：[Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)

### 4. 数据分析脚本
- 生成统计分析代码
- 编写数据探索脚本
- 自动化数据处理流程
- 相关案例：[Gemini CLI Terminal Audit to Draft PR](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)

### 5. 报表自动化
- 生成定期报表脚本
- 自动化数据导出
- 生成数据质量报告
- 相关教程：[工作流目录](/docs/workflows/workflow-catalog)

## 推荐工具与工作流

### 主入口选择
- 终端入口：[Claude Code](/docs/tools/terminal-agents/claude-code/quick-start) 或 [Gemini CLI](/docs/tools/terminal-agents/gemini-cli/quick-start)
- IDE-first：[Cursor](/docs/tools/ide-first/cursor/quick-start)

### 推荐工作流
1. [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) - 终端数据分析
2. [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) - 脚本优化
3. [Workflow Playbook](/docs/workflows/playbooks/workflow-playbook) - 按任务找流程

## 可复用资产

### 规则文件模板
```markdown
## Data Analysis Rules

- Document all data transformations
- Validate data quality before analysis
- Use version control for analysis scripts
- Write reproducible analysis code
- Document data sources and assumptions
- Include data quality checks in pipelines
```

### Prompt 模板
**数据清洗 Prompt**：
```
生成数据清洗脚本：
- 数据源：[CSV/JSON/数据库]
- 数据问题：[缺失值/重复值/异常值]
- 清洗规则：[处理策略]
- 输出格式：[目标格式]
- 验证规则：[数据质量检查]
```

**SQL 查询生成 Prompt**：
```
生成 SQL 查询：
- 数据表：[表名和字段]
- 查询需求：[业务需求描述]
- 聚合维度：[分组字段]
- 过滤条件：[WHERE 条件]
- 性能要求：[优化建议]
```

**数据可视化 Prompt**：
```
生成数据可视化代码：
- 图表类型：[折线图/柱状图/散点图]
- 数据源：[数据格式]
- X轴/Y轴：[字段定义]
- 样式要求：[颜色、标题、图例]
- 交互功能：[tooltip/zoom/filter]
```

### 验证脚本
```bash
# 数据分析验证脚本
python -m pytest tests/
python scripts/data_quality_check.py
python scripts/validate_output.py
```

## 跨团队交付物

### 给产品经理
- 数据分析报告
- 用户行为洞察
- 业务指标dashboard
- 数据驱动建议

### 给开发工程师
- 数据接口需求
- 数据埋点需求
- 数据格式规范
- 数据质量要求

### 给运营团队
- 运营数据报表
- 用户画像分析
- 转化漏斗分析
- A/B 测试结果

### 给管理层
- 业务指标报告
- 趋势分析
- 预测模型结果
- 决策支持数据

## 下一步

- 先跑一条主线：[30 分钟上手](/docs/start/30-minute-quick-start)
- 选择主工具：[工具教程首页](/docs/tools)
- 固定工作流：[工作流教程首页](/docs/workflows)
- 看真实案例：[实战案例首页](/docs/case-studies)
