---
title: 运维工程师的 AI Coding 指南
description: AI 辅助配置管理、监控告警和故障排查的实用方法。
slug: /roles/devops
sidebar_label: 运维工程师
tags: [ai-coding, devops, role-based]
track: cross-track
kind: guide
content_form: guide
audience: devops-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 运维工程师的 AI Coding 指南

## 机制专题

如果你要把运维角色中的运行规则、MCP 与入口工具拆开看，继续进入这些子页：

- [规则与规范文档](/docs/roles/devops/rules-and-instruction-files)
- [Skills 与 MCP](/docs/roles/devops/skills-and-mcp)
- [工具匹配与选型](/docs/roles/devops/tool-fit-and-selection)
- [DevOps 训练包模板](/docs/roles/devops/templates)

想直接复制可执行资产，再回头读原则：去 [DevOps 训练包模板](/docs/roles/devops/templates)。

## 典型 AI Coding 场景

### 1. 基础设施即代码（IaC）
- 生成 Terraform/CloudFormation 配置
- 编写 Ansible playbook
- 生成 Kubernetes manifests
- 相关工具：[Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)

### 2. CI/CD 流水线配置
- 生成 GitHub Actions workflow
- 编写 GitLab CI 配置
- 优化构建流程
- 相关教程：[Local to Background to Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook)

### 3. 监控与告警配置
- 生成 Prometheus 规则
- 编写 Grafana dashboard
- 配置告警规则
- 相关工具：[VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)

### 4. 故障排查与日志分析
- 分析日志文件
- 生成故障排查脚本
- 编写运维文档
- 相关案例：[VS Code Agents Local to Background Handoff](/docs/case-studies/vscode-agents-local-to-background-handoff)

### 5. 自动化运维脚本
- 生成部署脚本
- 编写备份恢复脚本
- 自动化巡检脚本
- 相关教程：[Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)

## 推荐工具与工作流

### 主入口选择
- 终端入口：[Claude Code](/docs/tools/terminal-agents/claude-code/quick-start)
- 控制平面：[VS Code Agents](/docs/tools/control-planes/vscode-agents/quick-start)
- 执行栈：[OpenAI Codex](/docs/tools/execution-stacks/openai-codex/quick-start)

### 推荐工作流
1. [Local to Background to Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook) - 云端执行
2. [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook) - 并行部署
3. [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) - 终端优先

## 默认训练包

| 当前阶段 | 建议先复制什么 | 目的 |
| --- | --- | --- |
| 变更刚启动 | [基础设施变更 Brief 模板](/docs/roles/devops/templates/infra-change-brief) | 先把环境、影响范围和风险边界锁住 |
| 准备执行变更 | [Runbook 与回滚模板](/docs/roles/devops/templates/runbook-and-rollback) | 先把步骤、检查点和回滚条件写清 |
| 收集验证证据 | [命令与证据模板](/docs/roles/devops/templates/commands-and-evidence) | 让命令、日志和监控证据成组出现 |
| 值班或跨团队交接 | [Incident / Handoff 模板](/docs/roles/devops/templates/incident-handoff) | 让接手人拿到状态、链接和升级条件 |

想直接看一份填好的成品：去 [示例：Kubernetes 发布窗口训练包](/docs/roles/devops/templates/example-k8s-rollout-pack)。

## 可复用资产

### 规则文件模板
```markdown
## DevOps Engineering Rules

- All infrastructure changes must be version controlled
- Use declarative configuration (IaC) over imperative scripts
- Implement proper secret management (never commit secrets)
- Add health checks and readiness probes
- Document rollback procedures
- Test changes in staging before production
```

### Prompt 模板
**IaC 配置生成 Prompt**：
```
生成基础设施配置：
- 云平台：[AWS/GCP/Azure]
- 资源类型：[EC2/RDS/S3/VPC]
- 配置要求：[规格、网络、安全组]
- IaC 工具：[Terraform/CloudFormation]
- 环境：[dev/staging/prod]
```

**CI/CD 流水线 Prompt**：
```
生成 CI/CD 配置：
- 平台：[GitHub Actions/GitLab CI/Jenkins]
- 构建步骤：[lint/test/build/deploy]
- 部署目标：[Kubernetes/ECS/VM]
- 环境变量：[列出需要的环境变量]
- 通知方式：[Slack/Email]
```

### 验证脚本
```bash
# 运维验证脚本
terraform validate
terraform plan
kubectl apply --dry-run=client -f manifests/
ansible-playbook --check playbook.yml
```

## 跨团队交付物

### 给开发工程师
- 部署文档
- 环境配置说明
- 日志查询指南
- 故障排查手册

### 给测试工程师
- 测试环境配置
- 性能测试环境
- 数据库备份恢复流程
- 环境重置脚本

### 给产品经理
- 系统可用性报告
- 性能指标报告
- 成本优化建议
- 容量规划

### 给安全团队
- 安全配置清单
- 漏洞扫描报告
- 访问控制策略
- 审计日志

## 下一步

- 先跑一条主线：[30 分钟上手](/docs/start/30-minute-quick-start)
- 选择主工具：[工具教程首页](/docs/tools)
- 固定工作流：[工作流教程首页](/docs/workflows)
- 看真实案例：[实战案例首页](/docs/case-studies)
