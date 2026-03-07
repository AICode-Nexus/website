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

草稿会写入 [`drafts/notes/`](./drafts/notes/)；临时笔记不再直接进入已发布的 `docs/`。

## 新建每日文章模板

```bash
npm run generate:daily-brief -- --date=2026-03-07 --slug=claude-code-workflow-shift --title="Claude Code 工作流变化"
```

如果只想生成周报草稿：

```bash
npm run generate:weekly-roundup -- --week-ending=2026-03-07
```

草稿 manifest 会写入 [`content-sources/`](./content-sources/)，博客草稿会写入 `blog/daily/` 或 `blog/weekly/`，默认带 `draft: true`。

## 内容质量检查

```bash
npm run check:content
```

## 同步教学视频数据

```bash
npm run sync:teaching-videos
```

这个命令会读取 [`src/data/teachingVideos.seed.json`](./src/data/teachingVideos.seed.json) 中的种子项，抓取 B 站公开视频详情页元数据，并生成 [`src/data/teachingVideos.generated.json`](./src/data/teachingVideos.generated.json) 供首页和文档页使用。

## 发布到 GitHub Pages

1. push 到 `development`（当前默认分支）或 `main`
2. 在仓库 `Settings -> Pages` 选择 `GitHub Actions`
3. 查看 Actions 中 `Deploy Docusaurus to GitHub Pages` 工作流

## 版本记录

- 版本与发布记录维护在 [CHANGELOG.md](./CHANGELOG.md)
- 发版本前先更新 `Unreleased`，再切出对应版本小节
- 发布前至少执行一次 `npm run build`

## 目录说明

- `docs/development-modes/`、`docs/workflows/`、`docs/tools/`、`docs/standards/`、`docs/architecture/`: 五大长期知识支柱
- `docs/archive/tracks/`: 旧赛道 / 专题透镜
- `docs/`: 知识库与站点维护文档
- `blog/daily/`、`blog/weekly/`、`blog/monthly/`: 时效内容分层
- `content-sources/`: Daily / Weekly 草稿的 source manifest
- `drafts/notes/`: 非发布笔记草稿
- `scripts/sync-teaching-videos.mjs`: 教学视频元数据同步脚本
- `scripts/content/`: 内容校验、Daily 草稿和 Weekly 草稿脚本
- `src/pages/index.js`: 门户首页
- `docusaurus.config.js`: 站点配置
- `sidebars.js`: 文档侧边栏
- `skills/ai-coding-daily-writer`: 每日文章 skill
- `.github/workflows/deploy-pages.yml`: 自动发布
