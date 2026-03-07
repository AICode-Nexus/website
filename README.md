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

## 生成工作流 / 工具手册目录

```bash
npm run generate:handbooks
```

这个生成器会根据 [`src/data/workflowCatalog.mjs`](./src/data/workflowCatalog.mjs) 和 [`src/data/toolCatalog.mjs`](./src/data/toolCatalog.mjs) 批量生成 `docs/workflows/` 与 `docs/tools/` 下的结构化 handbook 子目录，保持工作流模式、框架和工具目录的模板一致。

## 同步教学视频数据

```bash
npm run sync:teaching-videos
npm run check:teaching-videos
```

这个流程会读取 [`src/data/teachingVideoSources.json`](./src/data/teachingVideoSources.json) 与 [`src/data/teachingVideoTaxonomy.json`](./src/data/teachingVideoTaxonomy.json)，通过 `yt-dlp` 发现近 90 天的公开视频候选、抓取详情、执行规则分类与质量过滤，并生成 [`src/data/teachingVideos.generated.json`](./src/data/teachingVideos.generated.json) 供首页、文档页和全站搜索使用。

GitHub Actions 中还包含一个每 6 小时运行一次的 `Teaching Videos Sync` 工作流，用来自动刷新 catalog 并在通过校验后直接提交生成文件。

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
- `docs/workflows/patterns/`、`docs/workflows/frameworks/`、`docs/workflows/community-frameworks/`: 工作流模式、主线框架与社区框架手册
- `docs/tools/platforms/`、`docs/tools/control-planes/`、`docs/tools/execution-stacks/`、`docs/tools/terminal-agents/`、`docs/tools/ide-first/`: 按角色分层的工具手册
- `docs/archive/tracks/`: 旧赛道 / 专题透镜
- `docs/`: 知识库与站点维护文档
- `blog/daily/`、`blog/weekly/`、`blog/monthly/`: 时效内容分层
- `content-sources/`: Daily / Weekly 草稿的 source manifest
- `drafts/notes/`: 非发布笔记草稿
- `scripts/sync-teaching-videos.mjs`: 教学视频目录同步脚本
- `scripts/content/generate-handbooks.mjs`: 结构化工作流 / 工具目录生成器
- `scripts/lib/teaching-video-pipeline.mjs`: 视频发现、归一化、聚合与 contract 校验
- `scripts/content/`: 内容校验、Daily 草稿和 Weekly 草稿脚本
- `src/pages/index.js`: 门户首页
- `docusaurus.config.js`: 站点配置
- `sidebars.js`: 文档侧边栏
- `skills/ai-coding-daily-writer`: 每日文章 skill
- `.github/workflows/deploy-pages.yml`: 自动发布
