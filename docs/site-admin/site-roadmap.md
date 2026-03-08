---
title: 网站实施计划
description: 站点维护文档：记录 AICode-Nexus 的阶段目标、内容建设优先级和门户化演进路线。
slug: /site-admin/site-roadmap
sidebar_label: 网站实施计划
tags: [site-admin, roadmap]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: development-planning
audience: advanced
stage: intermediate
featured: false
entry_role: admin
---

# 网站实施计划

## Phase 1 已完成

- 门户首页已上线
- 公共知识文档已超过 30 篇
- `docs / comparisons / playbooks / blog` 已打通
- 构建期精选聚合、搜索和 Daily Brief 机制已建立

## 当前阶段：Phase 2

### 目标

- 把站点一级骨架升级为“流程地图 + 知识方向 + 覆盖层”
- 把旧的 4 条赛道继续保留为归档透镜
- 为知识文档建立 `domain + journey_stage + entry_role + content_form + reviewed_at + source_window_end + market_status` 契约
- 增加 `生态与集成` 方向，并把 `pillar` 降为仅运行时兼容的历史字段

### 当前优先级

1. 流程地图、知识方向总表与学习路径
2. 首页、搜索、freshness banner 和 sidebar 的共享 registry
3. `生态与集成` hub 与关键集成文档归类

## 当前阶段：Phase 3

### 目标

- 补齐主方向文档的 `domain / journey_stage` 字段
- 把 `docs/tracks/*` 迁入 `docs/archive/tracks/*`
- 引入 `blog/daily / weekly / monthly` 分层
- 增加内容质量校验和 Daily / Weekly 草稿生成脚本

### 当前优先级

1. 内容清扫与旧术语去除
2. 内容校验、草稿脚本与 GitHub Actions
3. 周报 / 月报与长期专题的回流机制

## 当前阶段：Phase 4

### 目标

- 把 handbook 生成产物一致性、IA 审计和内容质量校验统一接入 CI
- 将 `ecosystem` 的治理页 URL 从工具路径收口到生态方向路径，并保留旧链接重定向
- 让 sidebar、redirects、生成器和构建校验使用同一份 IA 规则

### 当前优先级

1. `check:handbooks / check:ia / check:content` 串进 GitHub Actions 与发布流程
2. `ecosystem/integrations/*` 路由与旧 URL 兼容
3. 减少需要人工记忆的 IA 例外，把例外显式制度化

## 后续方向

- Newsletter
- 搜索结果的更细粒度筛选
- 更多团队案例、架构案例与治理模板
- 第二阶段再评估是否做 slug 收口和目录迁移

## 相关文档

- [流程地图](/docs/start/journey-map)
- [知识方向总表](/docs/start/taxonomy)
- [知识新鲜度治理](/docs/freshness-governance)
- [每日更新工作流](/docs/site-admin/editorial-workflow)
