# website

AICode-Nexus AI coding 门户站（Docusaurus + Docs + Blog + GitHub Pages）

## 本地开发

```bash
npm install
npm run start
```

默认本地地址：`http://localhost:3000/`

主要路由：

- `/`: 门户首页
- `/docs/`: 知识库入口
- `/blog/`: Daily Brief

## 新建知识条目

```bash
./scripts/new-note.sh ai-writing-best-practices
```

## 新建每日文章模板

```bash
./skills/ai-coding-daily-writer/new-daily-brief.sh claude-code-workflow-shift
```

## 发布到 GitHub Pages

1. push 到 `development`（当前默认分支）或 `main`
2. 在仓库 `Settings -> Pages` 选择 `GitHub Actions`
3. 查看 Actions 中 `Deploy Docusaurus to GitHub Pages` 工作流

## 目录说明

- `docs/`: 知识库与站点维护文档
- `blog/`: 每日观察与热点文章
- `src/pages/index.js`: 门户首页
- `docusaurus.config.js`: 站点配置
- `sidebars.js`: 文档侧边栏
- `skills/ai-coding-daily-writer`: 每日文章 skill
- `.github/workflows/deploy-pages.yml`: 自动发布
