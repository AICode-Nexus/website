---
title: 发布到 GitHub Pages
description: 站点维护文档：说明 AICode-Nexus 如何通过 GitHub Actions 构建并发布到 GitHub Pages。
slug: /site-admin/publish-github
sidebar_label: 发布到 GitHub Pages
tags: [site-admin, deploy]
track: cross-track
kind: guide
audience: advanced
stage: intermediate
featured: false
---

# 发布到 GitHub Pages

## 目标

把文档、博客和首页改动通过 GitHub Actions 构建并部署到 GitHub Pages，同时把内容质量检查放在发布前面。

## 一次性配置

1. 配置仓库与 Pages
2. 选择 GitHub Actions 作为发布方式
3. 确认默认分支和 Pages 设置

## 标准发布流程

1. 提交内容或代码改动
2. 先通过 `Content Quality` 工作流
3. 再通过站点 build
4. 合并到 `main` 或 `development`
5. 由 `Deploy Docusaurus to GitHub Pages` 自动部署

## 发布前检查

- `npm run check:content`
- `npm run test:teaching-videos`
- `npm run build`

如果 Daily / Weekly 仍然是草稿，确认它们保留 `draft: true`，不要误当作已发布内容。

## 风险与边界

- 不要跳过内容质量检查直接发布
- 不要把草稿文章当成正式文章合并
- 不要只看构建通过，而忽略内部链接和文档结构质量

## 相关文档

- [网站实施计划](/docs/site-admin/site-roadmap)
- [README](/)
- [每日更新工作流](/docs/site-admin/editorial-workflow)
