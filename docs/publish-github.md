---
sidebar_position: 3
---

# 发布到 GitHub

## 一次性配置

1. 在 GitHub 创建仓库（例如 `website`）
2. 把本地项目推到默认分支（当前为 `development`，也支持 `main`）
3. 仓库设置中打开 `Settings -> Pages`
4. `Build and deployment` 选择 `GitHub Actions`

## 自动发布

仓库内工作流文件：`.github/workflows/deploy-pages.yml`

触发条件：
- push 到 `development` 或 `main`
- 手动触发（workflow_dispatch）

发布地址：
- 项目站点：`https://<你的用户名>.github.io/<仓库名>/`
- 用户站点（仓库名等于 `<用户名>.github.io`）：`https://<你的用户名>.github.io/`
