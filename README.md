# website

AICode-Nexus 知识网站（Docusaurus + Markdown + GitHub Pages）

## 本地开发

```bash
npm install
npm run start
```

默认本地地址：`http://localhost:3000/`

## 新建知识条目

```bash
./scripts/new-note.sh ai-writing-best-practices
```

## 发布到 GitHub Pages

1. push 到 `development`（当前默认分支）或 `main`
2. 在仓库 `Settings -> Pages` 选择 `GitHub Actions`
3. 查看 Actions 中 `Deploy Docusaurus to GitHub Pages` 工作流

## 目录说明

- `docs/`: 知识内容（Markdown）
- `docusaurus.config.js`: 站点配置
- `sidebars.js`: 文档侧边栏
- `.github/workflows/deploy-pages.yml`: 自动发布
