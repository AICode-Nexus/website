# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for site releases.

## [Unreleased]

### Changed

- Reworked the new issue-driven pages `Vibe Working` and `统一 Agent 平台 + 自研 Frontier` into stronger long-form articles grounded in official Anthropic, OpenAI, GitHub, and VS Code sources, replacing the earlier outline-heavy drafts with clearer narrative structure and dated evidence.

### Fixed

- Fixed a mobile search race where opening the search overlay and then typing immediately could cancel the in-flight search-index load, leaving the UI stuck on `正在加载搜索索引...` and returning no results.
- Fixed the navbar search loader getting stuck on `正在加载搜索索引...` by keeping the async index load tied to open/query state instead of cancelling it during the intermediate `loading` render.
- Fixed Mermaid diagram pages rendering raw ` ```mermaid ` source blocks by enabling Docusaurus Mermaid markdown support and registering the Mermaid theme package for docs/blog content.
- Fixed Mermaid node, edge, and cluster labels getting clipped on docs pages by resetting paragraph line-height inside the Docusaurus Mermaid container instead of inheriting the global docs paragraph rhythm.
- Fixed repo issue monitoring in local automation runs so the monitor now strips broken loopback proxy variables before retrying `gh issue list`, and still writes a diagnostic `capture-failed` snapshot when both the GitHub CLI and public HTML fallback fail.

### Added

- Added a standalone workflow guide, `Vibe Working：从 Vibe Coding 到可交付团队工作流`, plus new repo-issue signal tracking for issue #4 so the site now has a direct Chinese page for turning fast AI coding into team-grade delivery, verification, and handoff.
- Added a standalone insight page, `统一 Agent 平台 + 自研 Frontier：企业级 AI 交付为什么要双线建设`, plus new repo-issue signal tracking for issue #5 so enterprise readers now have a direct Chinese entry for the platform-vs-frontier split instead of only scattered mentions inside longer talks.
- Added a direct outbound-link layer to `前端 / Skills 与 MCP`, including an official-entry quick-reference table for Figma MCP, Context7, Playwright, and the MCP protocol, plus new long-term issue-signal tracking for repo issue #3 so readers no longer need to search for core external docs by hand after landing on the capability page.
- A Codex-driven GitHub issue monitoring content path, including a new site-admin guide for the issue-to-content automation flow, a long-lived insights page for repo issue signals, and a documented `content-sources/issues/` snapshot contract for dated source traces.
- A repo-issue reply helper script, `npm run reply:repo-issue`, that posts a deduplicated Chinese follow-up comment back to the originating GitHub issue with the generated article or docs URL after content has been handled.
- A stable repo-issue monitor script at `scripts/content/monitor-repo-issues.mjs`, plus parser tests and an `npm run monitor:repo-issues` entry, so issue monitoring now probes `gh issue list` directly and falls back to public GitHub issues HTML instead of blocking on `gh auth status`.
- A standalone frontend guide, `Playwright 自动化测试方案`, that turns the new repo issue signal into a concrete reader-facing rollout plan covering when to use Playwright, how to choose the first smoke path, recommended project layout, and delivery evidence.
- A standalone `OpenRouter 接入与路由方案` guide under `docs/tools/`, triggered by repo issue #2, plus related updates to the model-platform entry page and long-term issue signal tracking so OpenRouter now has a direct Chinese task-oriented landing page instead of only a directory mention.
- A new long-form insight article, `Agent = Model + Harness：AI 智能体时代的软件工程重心转移`, under `docs/insights/`, with three local SVG diagrams covering the overall architecture, harness capability stack, and plan-act-verify-correct delivery loop.
- Local `technical-docs-editor` skill under `skills/`, with a hybrid review-and-expand workflow for role pages, tool guides, workflow docs, playbooks, and standards pages, plus a reusable playbook for audit layers, output templates, and repo-specific documentation heuristics.
- A role-based entry system at `/docs/roles/` with 7 role-specific guides (产品、设计、前端、后端、测试、运维、数据分析), providing targeted AI coding scenarios, tool recommendations, reusable assets, and cross-team deliverables for each role.
- Homepage role-based entry section using LinkTile components, placed between starter tracks and featured tool tutorials for natural navigation flow.
- Role content validation in `src/data/rolesContent.js` with fail-fast checks for required fields and unique IDs.
- New `rolesSidebar` navigation and navbar entry "按岗位进入" for role-based content discovery.
- 前端岗位入口升级为目录化的“前端 AI 工作台”，新增 7 个主题子页，并为每页补齐专业说明、代码案例、本地 SVG 图表、图片入口和视频学习入口。
- 继续补强前端机制专题，收紧“上下文与规则”总览页边界，并显著扩写 `规则与规范文档`、`Skills 与 MCP`、`工具匹配与选型` 三页的决策表、模板资产、能力编排、证据要求、案例入口和本地 SVG 图表。
- 继续补强前端角色专题的案例层，为总览页新增“模块到案例地图”和“按产物反查”，并为 `设计到代码`、`仓库结构` 两页补上更贴近真实交接链的案例入口，方便从概念页直接跳到 workflow 与实战案例。
- 继续补齐前端工程页的案例层，为 `框架与组件生态`、`质量门禁`、`测试与交付` 三页新增案例地图与交付观察点，让框架决策、验证门禁和 PR 收口都能直接映射到现有 case studies 与 workflow runbooks。
- 继续补齐前端剩余机制页的案例层，为 `样式与设计系统`、`规则与规范文档`、`Skills 与 MCP`、`工具匹配与选型` 四页新增“任务形状 -> 案例 -> 观察点”地图，并把前端专题相关页的 `reviewed_at` 更新到 `2026-03-18`。
- 继续把前端专题的媒体入口从“关键词搜索”改成可执行联动，为总览页和 `样式与设计系统`、`规则与规范文档`、`Skills 与 MCP`、`工具匹配与选型` 补齐“视频 + 案例 + workflow + 交付物”组合表，并新增 4 张本地 SVG 媒体资产板，方便直接拿去带练或自学。
- 继续补前端专题的输入包与证据包模板，为 `设计到代码` 和 `测试与交付` 新增 2 张本地 SVG 图板，并把截图模板、状态清单、命令记录、录屏与风险说明收成可复用的最小文件组合。
- 继续收口前端总览与机制总览，为 `前端 AI 工作台` 和 `上下文与规则` 新增“默认训练包”视角，把页面输入包、能力与入口决策包、交付证据包和规则模板包明确回链到对应模块。
- 为前端角色新增 `训练包模板` 子目录和 5 份可直接复制的模板页，覆盖页面输入包、任务 brief、命令与证据、PR handoff、Risks / Next，并把这些模板接回前端总览、机制总览、设计到代码、测试与交付和规则模板页。
- 为后端角色新增 6 份可直接复制的模板页，覆盖仓库合同、接口改动 brief、migration 变更、外部集成任务、命令与验证、PR / handoff / rollback，并把它们接入 `模板与交付资产`、后端机制页与侧边栏导航。
- 为测试工程师角色新增 `QA 训练包模板` 子目录和 4 份模板页，覆盖测试计划 brief、缺陷复现与回归、命令与证据、QA handoff，并把它们接回 QA 总览、规则页与侧边栏导航。
- 为产品经理角色新增 `产品训练包模板` 子目录和 4 份模板页，覆盖 PRD 大纲、发现与调研 brief、原型验证、handoff 与验收，并把它们接回产品总览、机制页与侧边栏导航。
- 为运维工程师角色新增 `DevOps 训练包模板` 子目录和 4 份模板页，覆盖基础设施变更 brief、runbook 与回滚、命令与证据、incident handoff，并把它们接回运维总览、机制页与侧边栏导航。
- 为数据分析师角色新增 `数据分析训练包模板` 子目录和 4 份模板页，覆盖分析 brief、数据质量检查、命令与复现、报告 handoff，并把它们接回数据分析总览、机制页与侧边栏导航。
- 为设计师角色新增 `设计训练包模板` 子目录和 4 份模板页，覆盖 Figma handoff、组件状态合同、token 约束、原型验证，并把它们接回设计总览、机制页与侧边栏导航。
- 继续补强 QA 与设计机制页正文，把 `skills` 和 `tool-fit` 页面补成“能力 / 入口 -> 模板产物”映射，并把相关页的 `reviewed_at` 更新到 `2026-03-18`。
- 为 `产品 / 设计 / 前端 / 后端 / QA / DevOps / 数据分析` 七个角色模板区新增已填写示例包页，把空模板进一步补成“真实任务链成品”示例，并把这些示例接回模板首页、角色总览与侧边栏导航。
- 为 `产品 / 设计 / QA / DevOps / 数据分析 / 后端` 六个非前端角色新增本地 SVG 训练包图板，把模板顺序、证据层和案例入口补成更可展示的媒体资产。
- `AI 资源导航` 的学习资料目录新增 `Code Inspector` 条目，并补了一篇独立资料页，说明它是什么、怎么试，以及它在前端调试工作流里的位置。
- 重写 `/docs/roles/frontend`，将其从泛化岗位说明升级为“前端 AI 工作台”，补充设计到代码、React / Vue 生态、Tailwind 与主题系统、ESLint / Oxlint、pnpm / monorepo / Turborepo、Playwright、`CLAUDE.md` / `AGENTS.md` 以及前端常用 skills 的分类说明。
- 将 `/docs/roles/frontend` 进一步拆分为总览页加 7 个工程主题子页，并把 `rolesSidebar` 中的前端入口改成带子页的分类导航，方便按工作流或按工程主题阅读。
- 继续补强前端工作台中的“框架与组件生态”和“仓库结构”两页，加入 `Next.js / Nuxt / Vite / TanStack Query / Zustand / Pinia / Headless UI / pnpm workspace / Turborepo / Nx` 等更细的 AI 选型与边界说明。
- 将前端总览页继续升级为“AI 前端培训首页”，补充训练目标、分阶段学习路径、模块训练地图、项目化训练入口、训练节奏与毕业标准，为后续 Ralph Loop 式培训化迭代打基础。
- 为前端子页统一补上培训模块骨架，新增学习目标、建议先修、训练任务与训练验收，让 `design-to-code`、`frameworks-and-components`、`styling-and-design-systems`、`quality-gates`、`repo-architecture`、`testing-and-delivery`、`context-and-rules` 从知识页升级为课程模块。
- 为前端培训总览页补上“阶段 0：工具与环境准备”和 `Capstone` 毕业实战路径，让整套内容形成从起步到交付的闭环训练路线。
- 继续补强前端培训模块，统一新增“典型交付物”和“常见误区”，让每个主题页同时具备训练输出物和反模式提示，不再只是做法说明。
- 为前端培训总览页新增 `Capstone` 评分 Rubric 和复盘问题，补齐自学验收、团队带训与导师评审所需的评估层。
- 继续大幅扩写 `/docs/roles/frontend` 全套模块页，为 8 个前端子页统一补齐更长篇的训练节奏、交付物、评审问题、媒体采集清单、视频学习路径，并新增 6 张本地 SVG 图表以提高图片/图表/视频型内容占比。
- 将前端与后端角色区中的机制类内容进一步拆成独立子页：前端新增 `规则与规范文档`、`Skills 与 MCP`、`工具匹配与选型`，后端新增 `规则与规范文档`、`Skills 与 MCP`，并同步更新索引页、机制总览页与 `rolesSidebar` 导航，使 `rules / skills / MCP / 规范文档 / tools` 不再混写在单一页面里。
- 继续把同一套机制专题方案扩展到 `产品经理 / 设计师 / 测试工程师 / 运维工程师 / 数据分析师` 五个角色页，为每个角色补齐 `规则与规范文档`、`Skills 与 MCP`、`工具匹配与选型` 三个子页，并将 `rolesSidebar` 升级为统一的“总览 + 机制专题”分类结构。
- 后端岗位入口升级为目录化的“后端 AI 工作台”，新增 API 与契约、数据与存储、服务集成与异步任务、质量门禁与测试、观测性与运维协作、仓库结构与交付、上下文与规则七个训练子页，并同步更新角色入口文案与侧边栏导航。
- 后端培训区继续补齐可执行训练资产，新增“培训路线”和“交付检查表”两页，并把学习路径与 README 目录说明接到新的后端子目录结构上。
- 后端培训区补回并扩展可复用模板资产，新增“模板与交付资产”页，集中沉淀规则模板、接口与 migration prompt、验证命令、PR 说明模板和跨团队 handoff 清单。
- 后端培训区新增“演练与案例地图”，把四类典型后端演练题映射到推荐工作流、最低交付物和现有案例入口，方便按场景带练或自学。
- 后端培训区新增“能力评估矩阵”，把契约表达、数据与集成边界、验证证据、运行协作和风险控制整理成可观察的训练等级与达标标准。
- 后端培训区新增“失败模式与止损”，总结接口契约失真、migration 无上线策略、集成失败恢复缺失、验证证据断裂和生产不可观察等常见失控场景及其止损动作。
- 后端培训区新增“工具匹配与选型”，按任务形状说明何时优先用终端入口、执行栈、控制面或平台型入口，并将工具选择与工作流选择绑定起来。
- 为设计师角色新增 `工具专题` 分组和 7 篇独立工具页，分别覆盖 `Figma / MasterGo / Framer / Relume / Uizard / Visily / Webflow AI`，补齐工具定位、适配任务、实战案例、协作 handoff 和官方入口，并同步更新设计师总览页与侧边栏导航。

### Fixed

- Moved the navbar search index out of the main bundle into a generated async JSON chunk, and switched homepage latest updates to published-only plugin data so draft blog metadata no longer leaks through `require.context` imports.
- Hid teaching-video course links and the course-directory switch whenever the current 90-day catalog does not contain any real multi-episode series, preventing the UI from presenting one-video-per-course data as a stable aggregation.
- Added a mobile navbar search entry that opens a full-screen search layer backed by the same async site index, so mobile users can search docs, updates, and video resources without falling back to the menu tree.
- Stabilized `npm run check:browser` by updating stale IA assertions and moving mobile search validation onto a dedicated mobile viewport flow with real screenshot artifacts, so browser acceptance now verifies the new mobile search entry end to end.
- Filled in short role-mechanism guides for 产品、设计、测试、运维、数据分析 so their `skills-and-mcp` and `tool-fit-and-selection` pages now satisfy the content-quality minimums required by CI, unblocking both `Content Quality` and GitHub Pages deploy workflows.
- Restored teaching-video sync stability by keeping all enabled discovery sources active while still prioritizing Bilibili, allowing the catalog refresh job to combine Bilibili and YouTube results instead of dropping overseas sources and falling below the 200-video contract.

## [1.1.0] - 2026-03-11

### Fixed

- Scoped Google Analytics `gtag` to production builds only so local Docusaurus navigation no longer crashes with `window.gtag is not a function` during development.
- Aligned blog list page backgrounds with the docs surface so the global body gradient no longer bleeds through article spacing while scrolling.
- Teaching video resource pages now compute sync health at runtime, showing explicit `同步延迟` / `数据陈旧` states when the 6-hour auto-refresh window is missed instead of only echoing the build-time timestamp.

### Added

- A data-driven `AI 资源导航` docs section under `/docs/ai-directory`, with seven curated directories spanning AI coding products, execution agents, agent frameworks, eval/LLMOps tools, model platforms, MCP ecosystem resources, Chinese community navigators, and official learning resources such as Microsoft `ai-agents-for-beginners`.
- An automated Daily Brief pipeline that reads official GitHub / VS Code / OpenAI feeds, generates a dated source manifest, publishes the daily blog post directly, and emits a no-signal brief when there is no material AI coding update.
- Homepage latest updates now derive from published blog metadata at build time so the portal refreshes automatically as soon as a Daily Brief is published.
- A tutorial-first public IA with new `开始上手 / 工具教程 / 工作流教程 / 实战案例 / 进阶专题 / 动态` entry points, a rebuilt homepage, and a new homepage data contract centered on starter tracks, featured tutorials, case studies, and updates.
- Explicit `tutorial` and `case-study` content forms in `src/data/knowledgeModel.js`, plus build-time validation for tutorial metadata (`tutorial_series`, `estimated_time`, `prerequisites`, `deliverable`) and case-study metadata (`case_type`, `scenario`, `tool_stack`, `verification`).
- A new `30 分钟上手` starter tutorial, four first-wave tool tutorial tracks (Claude Code, OpenAI Codex, Cursor, GitHub Copilot), four first-wave workflow tutorial tracks (Bugfix / Refactor / Test, Terminal-First Repo Pairing, Issue / Jira -> Draft PR, Spec-First), and three cross-tool case-study docs under `/docs/case-studies`.
- A second tutorial wave for `VS Code Agents`, `Gemini CLI`, `Cline`, and `Windsurf`, plus new runbook/example/pitfall/tooling tracks for `Parallel Worktrees / Multi-Agent` and `Local -> Background -> Cloud`.
- Three additional cross-tool case studies covering `VS Code Agents -> OpenAI Codex -> GitHub review`, `Cline + parallel worktrees`, and `Windsurf -> draft PR` handoff patterns, plus expanded case-study navigation and homepage case-study surfacing.
- A `Gemini CLI -> terminal audit -> draft PR` case study, and explicit `现在应该读什么` jump sections on downgraded archive lenses so legacy map/index/archive pages now route readers back into current tutorial paths.
- Comparison and insight hubs now act as tutorial-return pages, and key comparison/insight articles are required to link back into executable tutorials or case studies.

- A shared `domain / journey_stage / entry_role / content_form` knowledge model in `src/data/knowledgeModel.js`, plus a new `/docs/start/journey-map` flow overview and `/docs/ecosystem` hub for the `生态与集成` direction.
- Dedicated hub pages for `开始`、`内容索引`、`资源中心` and `旧赛道归档`, plus split tool-resource docs for `/docs/tools/resources/videos` and `/docs/tools/resources/courses`.
- A legacy teaching-video redirect shim that forwards `/docs/ai-code-teaching-videos` deep links to the new video or course resource routes without breaking shared URLs.
- Shared docs presentation primitives in `src/components/docs/` for decision matrices, scenario cards, checklists, related-reading blocks, and tool-linked teaching resources so handbook and longform pages can reuse a single docs UI layer.
- Build-time handbook catalog validation in `src/utils/handbookCatalog.mjs`, forcing tool and workflow source records to provide stable ids, required page sections, internal links, and source metadata before docs generation runs.
- A scheduled `Teaching Videos Sync` GitHub Actions workflow that refreshes the teaching-video catalog every 6 hours, validates the contract, and auto-commits a new generated catalog when the sync succeeds.
- Structured workflow and tool handbooks generated from `src/data/workflowCatalog.mjs` and `src/data/toolCatalog.mjs`, adding pattern/framework/community workflow directories and role-based tool directories under `docs/workflows/` and `docs/tools/`.
- A practical workflow layer for the knowledge base with a new mainstream workflow guide and a step-by-step workflow playbook, covering spec-first, bugfix, async issue-to-PR, terminal-first, and parallel worktree usage.
- Repository-level frontend and release guardrails in `AGENTS.md` for performance, low coupling, reusable components, fail-fast config validation, and release discipline.
- A validated homepage content model in `src/data/portalContent.js` and `src/utils/portalContent.js` to centralize portal copy, links, and section metadata.
- Shared portal primitives for section wrappers and reusable cards in `src/components/portal/SectionBlock.js`, `src/components/portal/ContentCard.js`, and `src/components/portal/LinkTile.js`.
- Phase D content upgrades across taxonomy, playbooks, comparisons, and monthly insights, including a deeper `Cursor vs Windsurf vs Cline` comparison and a March 2026 monthly brief.
- A new AICode-Nexus logo system in `static/img/` with navbar and favicon integration.
- Google Analytics 4 site tracking via Docusaurus `gtag` with measurement ID `G-7XSE8G61G2`.
- A navbar-level global search input that indexes docs and Daily Brief metadata without adding an external search dependency.
- A build-time portal data plugin that auto-aggregates homepage featured docs from docs frontmatter instead of requiring hand-maintained homepage doc entries.
- A new `AI Code 教学视频` homepage section and `/docs/ai-code-teaching-videos` catalog page backed by validated local video metadata, prioritizing Bilibili public videos.
- A build-time `sync:teaching-videos` workflow that scrapes public Bilibili video metadata from a curated seed list and writes committed generated catalog data for the portal and docs pages.
- An earlier direction-based knowledge architecture spanning `AI 开发方式`、`AI 工作流`、`AI 编程工具`、`AI 规范`、`AI 架构`, which now serves as the foundation for the expanded journey-plus-direction model.
- New direction hub docs and new topic docs covering Claude Code, Gemini CLI, terminal agent landscape, repo instruction files, freshness governance, AI-native engineering architecture, and MCP topology.
- A docs-page freshness banner and build-time validation for knowledge-doc freshness metadata, while retaining `pillar` compatibility for older frontmatter.
- A maintained mainstream tool watchlist to keep GitHub Copilot, VS Code Agents, OpenAI Codex, Claude Code, Gemini CLI, Cursor, and Windsurf under explicit review cadence.
- New first-class docs directories for `development-modes`, `workflows`, `tools`, `standards`, and `architecture`, plus `docs/archive/tracks` for legacy lenses.
- New workflow docs covering framework selection, task workflow catalog, async agent delivery, expanded prompt contracts, and deeper spec-driven delivery guidance.
- New standards docs covering skills/commands/hooks, review quality gates, evaluation metrics, and richer repository rule ownership guidance.
- New content automation under `scripts/content/` for content quality checks and draft generation of daily briefs and weekly roundups from repository manifests.
- New content source manifests in `content-sources/` and tracked draft-only folders for `blog/weekly`, `blog/monthly`, and `drafts/notes`.

### Changed

- Reclassified role template leaf docs under a dedicated `template` content form with lighter content-quality thresholds, so reusable fill-in assets no longer have to masquerade as full-length guides just to pass CI.
- Split teaching-video catalog validation into strict freshness checks and relaxed structural checks, so ordinary docs/content workflows no longer fail deployments just because the scheduled video sync has gone stale.

- Finished the remaining thin framework and discovery hubs by expanding the `Superpowers` community-framework set, deepening the workflow-framework overview, and rewriting the `实战案例 / 对比与选型 / 趋势观察` index pages into decision-first hubs that route readers back into executable tutorials instead of acting as shallow link lists.
- Reworked the `先跑 Quick Start` tools sidebar so single-tool families now link straight to named tool entries instead of nesting repetitive one-item `快速开始` groups, expanded the eight tool quick-start docs into fuller first-run guides with task-fit advice, copyable templates, acceptance checklists, and common failure modes, and upgraded all eight tool `常见任务 / 排错 / 最佳实践` pages into denser operational docs with reusable task templates, explicit diagnosis paths, switch criteria, and long-term usage rules.
- Expanded the eight tool `工作流适配 / 规则与边界 / 优点与替代` pages from thin decision-aid stubs into fuller selection and governance guides with task-fit signals, rule-placement guidance, anti-patterns, migration order, and explicit switch/exit criteria.
- Expanded the eight `生态 / 集成与治理` tool pages from lightweight governance notes into fuller rollout guides with integration topologies, minimum review evidence sets, owner models, approval boundaries, pilot sequences, and stop-expansion signals.
- Expanded the six workflow-pattern `适用信号 / 治理与风险 / 工具组合` page sets from brief supplement stubs into fuller decision and rollout guides, and deepened the eight tool overview pages with clearer fit profiles, anti-fit guidance, and team adoption checks.
- Expanded the six workflow-pattern `概览 / 示例 / Runbook` page sets from lightweight route maps into fuller executable workflow guides with clearer role fit, handoff assets, stop points, validation criteria, and example-based decision framing.
- Switched the local Docusaurus dev server to polling mode so generated blog/content files reliably trigger rebuilds and browser refreshes during editing.
- Tightened tool-handbook auxiliary pages so `工作流适配 / 规则与边界 / 优点与替代` now use shorter navigation labels and denser decision-oriented content instead of verbose “补充” framing.
- Promoted `视频资源` into an independent top-level docs route, changed the tab to land directly on `/docs/resources/videos`, simplified the resource sidebar to `全部视频 / 按类型进入 / 课程目录`, and kept the older `/docs/resources` plus `/docs/tools/resources*` links redirecting into the video list.
- Rebuilt the `工具教程` sidebar into explicit tool directories so quick starts are grouped by tool family and each handbook now expands under its own tool label instead of flattening into repeated generic page names.
- Added a docs right rail for tool pages that surfaces tool-filtered teaching videos beside the article and TOC, making resource discovery available without leaving the current tutorial.
- Repositioned concept landing pages so they now point readers to concrete tutorial or case-study next steps instead of stopping at maps, indexes, or tool-role summaries.
- Reworked the homepage plugin and content-quality checks to prioritize tutorial and case-study collections instead of comparison/playbook/insight homepage groupings.
- Slimmed the second-wave supplementary tool and workflow docs into shorter decision-aid pages, and taught `check:content` to validate `补充：...` docs as lightweight decision aids instead of forcing them to mimic full handbook pages, so `quick-start`, `common-tasks`, `runbook`, and case-study content remain the primary learning path.
- Slimmed the first-wave Claude Code, OpenAI Codex, Cursor, GitHub Copilot, Bugfix / Refactor / Test, Terminal-First Repo Pairing, Issue / Jira -> Draft PR, and Spec-First supplementary docs into the same lightweight decision-aid format, and demoted their sidebar labels/positions behind the runnable tutorial and runbook pages.
- Rewrote the first-wave tool and workflow overview pages into tutorial-first landing pages with clearer "start here" CTAs, direct reading order, and less repeated conceptual prose, so the overview layer now routes readers into runnable docs instead of competing with them.
- Rewrote the second-wave VS Code Agents, Gemini CLI, Cline, Windsurf, Parallel Worktrees / Multi-Agent, and Local -> Background -> Cloud overview pages into the same tutorial-first landing pattern, reducing repeated concept prose while keeping the overview layer as an entry point into quick starts, runbooks, and cases.
- Reworked the `AI 编程工具`, `AI 工作流`, `开始这里`, `学习路径`, `工具选择地图`, `流程地图`, and `内容索引` hub pages into shorter routing pages that now prioritize direct quick-start, runbook, case-study, and comparison entry points over repeated high-level explanation.
- Tightened homepage entry validation so primary homepage CTAs must point to actionable routes, homepage gateway pages must expose enough tutorial/playbook/case-study links, and the portal cannot quietly drift back toward abstract landing pages.
- Tightened navbar and sidebar IA guards so the six primary top-level entries stay fixed, each primary sidebar opens on the expected tutorial-first landing doc, and the tool/workflow rails must keep explicit `先跑 Quick Start` and `先跑 Runbook` sections ahead of slower conceptual reading.
- Added click-budget acceptance to `check:ia` and `check:content`, so homepage hero/starter entries must remain one click from executable docs, homepage gateway CTAs must remain within two clicks of tutorials or case studies, and the case-study hub now carries the same direct-return requirements as the tool and workflow hubs.
- Added a repeatable browser acceptance script (`npm run check:browser`) that serves the production build under `/website`, drives a real browser through `playwright-cli`, verifies desktop/mobile primary navigation and tutorial entry rails, and writes screenshots plus a JSON report under `output/playwright/browser-acceptance/`.
- Added an optional release smoke path with `npm run verify:release:smoke` and a manual GitHub Actions workflow (`.github/workflows/browser-smoke.yml`) so browser acceptance can be run on demand and its screenshots/report uploaded as artifacts without turning the default CI lane into a slow hard gate.

- Split the docs navigation into per-tab sidebars so the left rail now follows the active top-level section, and promoted the teaching-video/resource area into a dedicated `视频资源` navbar tab instead of repeating every first-level docs section in the sidebar.
- Reframed the homepage around `Quick Start -> Journey Map -> Direction Map -> Learning Path -> Resource Center -> Content Index -> Daily Brief`, replacing the old portal narrative with a process-first AI Code map.
- Updated sidebar, navbar, overview docs, search metadata, featured-doc aggregation, and doc freshness badges to prefer `domain` with `pillar` fallback, and to surface `journey_stage` where available.
- Backfilled `domain / journey_stage / entry_role / content_form` across the remaining handbook, archive, comparison, playbook, insight, and site-admin docs, and normalized legacy `pillar` values where those pages were reclassified.
- Aligned the handbook generator, content-quality checks, and portal-data validation with the new metadata contract so generated docs now emit `domain / journey_stage / entry_role / content_form` by default and build-time checks enforce those fields.
- Codified the allowed `tools/* -> ecosystem` integration-governance exceptions in the shared knowledge model, documented that policy on the ecosystem hub, and added a dedicated IA audit script so future path/domain drift fails explicitly.
- Consolidated the public integration-governance URLs under `/docs/ecosystem/integrations/*`, moved those generated docs into the ecosystem sidebar cluster, and kept the old tool-scoped governance URLs alive through redirects.
- Added a generated-handbook sync check and wired `check:handbooks -> check:ia -> check:content` into CI and release documentation so stale generated docs or IA drift fail before deployment.
- Added `npm run verify:release` so release validation can be run as one deterministic local gate instead of manually remembering each pre-publish check.
- Removed `pillar` from the active docs metadata contract, handbook generator output, and search keywords so the repo now writes `domain` only while runtime compatibility remains in place for historical content.
- Rebuilt the site IA around `开始 / AI Code 地图 / 资源中心 / 内容索引 / 旧赛道归档 / Daily Brief / 站点维护`, updating navbar, sidebar, footer entry points, homepage ordering, and core overview links to match the new journey-plus-direction model.
- Aligned the footer `AI Code 地图` entry with the navbar so both now land on the process-first journey map instead of splitting between journey and taxonomy routes.
- Moved start, tool-map, comparison, playbook, and insight docs onto the newer docs routes with redirect coverage for the previous slugs, while keeping comparison/playbook/insight index hubs as discovery layers instead of primary leaf paths.
- Split the teaching-video experience into separate video and course directories so filters now drive only the active result entity, course aggregation is computed from the filtered video set, and video cards link down into the dedicated course view instead of rendering a course block mid-page.
- Upgraded the navbar search index with stable `entityType / domain / journeyStage / contentForm / resourceType` metadata and grouped result rendering for knowledge docs, videos, and courses.
- Added an explicit keyword search button to the teaching-video catalog filters so query edits now apply on button click or Enter instead of re-filtering on every keystroke.
- Updated teaching-video quick filters and tool-scoped learning-resource CTAs so they now deep-link straight to the catalog `视频明细` section instead of stopping at the top of the page after applying a filter.
- Reworked the teaching-video catalog navigation so desktop now uses a stateful pagination panel with range feedback and page numbers, while mobile switches to shareable incremental "load more" browsing driven by URL state instead of local-only previous/next buttons.
- Normalized CTA alignment inside teaching-video cards and shared homepage content cards so card buttons now anchor to a consistent bottom edge even when summaries and tag rows have different heights.
- Rewrote the generated handbook output under `docs/tools/` and `docs/workflows/` so tool, workflow, and framework clusters now render decision-oriented sections, tables, next-step links, and tool learning resources instead of thin bullet-only pages.
- Reworked the `AI 编程工具` and `AI 工作流` hub docs into decision-first landing pages that route readers by problem shape, family, and reading order instead of stacked title-summary lists.
- Added reusable related-reading rails to longform comparisons, playbooks, and insights so deep reads now connect back to the relevant handbook clusters and follow-on actions.
- Tightened `check:content` with family-specific depth rules for generated handbook pages and hub/overview pages, including stronger floors for H2 structure, tables, internal links, and source coverage.
- Tightened handbook and content validation again so source links are deduplicated, only real docs/blog routes count toward internal-link floors, archive/site-admin docs receive explicit lightweight checks, and handbook catalogs now enforce the minimum array shapes the generator actually reads.
- Clarified the teaching-video auto-sync cadence across the homepage card, catalog hero, and overview doc so the UI now explicitly states the 6-hour refresh cycle instead of a vague “自动同步” badge.
- Moved the docs-page freshness/status banner to the bottom of each document article so governance metadata remains available without displacing the main content above the fold.
- Fixed the teaching-video course CTA deep-link behavior so `查看课程代表视频` now lands on and highlights the corresponding video card, and aligned course-card CTAs to a consistent bottom edge.
- Removed the decorative underline from the navbar `教学视频` link and disabled the mobile navbar blur on narrow screens so the Docusaurus slide-out menu can render correctly in iOS and WeChat browsers.
- Elevated the `AI Code 教学视频库` discovery path with a dedicated right-side navbar `教学视频` entry and a lighter desktop highlight so the video hub is reachable above the fold without disrupting the main knowledge navigation.
- Reworked the `AI 工作流` and `AI 编程工具` hubs, sidebar, homepage links, and learning paths around handbook-style subdirectories while preserving legacy routes such as `/docs/workflows/mainstream-ai-coding-workflows`, `/docs/claude-code-workstyle`, and `/docs/gemini-cli-github-workflow`.
- Expanded the workflow framework layer to include `Superpowers` alongside `BMAD`, `Spec Kit`, and `OpenSpec`, and added detailed handbook pages for GitHub Copilot, VS Code Agents, OpenAI Codex, Claude Code, Gemini CLI, Cline, Cursor, and Windsurf.
- Rebuilt the `AI Code 教学视频` module around a 90-day multi-source catalog with generated metrics, facets, course aggregation, featured ranking, search deep-links, and a filterable docs directory instead of a hand-laid flat list.
- Promoted the homepage teaching-video section into a primary portal block with freshness status, 7/30/90-day counters, 8 featured videos, and tool quick filters sourced from generated catalog metadata.
- Tightened CI so website builds now validate teaching-video freshness and catalog contract before deployment.
- Tightened homepage CTA layout and mobile navbar behavior so section actions keep a compact size and the main navigation remains reachable on narrow screens.
- Reworked workflow discovery across the workflow hub, playbooks hub, start-here guide, learning paths, sidebar, and homepage quick actions so readers reach concrete workflow docs before abstract framework pages.
- Refactored the portal homepage to consume centralized content config instead of spreading section text and routes across individual components.
- Unified homepage card rendering around shared presentation components to improve style consistency, component boundaries, and future extensibility.
- Narrowed handbook generation and sync checks back to the roots that are still truly autogenerated (`ecosystem/integrations`, workflow frameworks, and community frameworks) so CI no longer tries to overwrite the manually maintained tutorial-first tool and workflow tracks.
- Constrained the navbar search results panel to the viewport and enabled touch-friendly vertical scrolling so long result lists remain usable on narrow or short screens.
- Switched docs tables to horizontal scrolling on small screens so comparison and workflow tables are no longer clipped on mobile.
- Restored dark-mode styling across the navbar, docs surface, and portal homepage cards so the theme switch updates the full site instead of leaving light-only hardcoded colors behind.
- Stabilized docs-page backgrounds so long-form knowledge pages no longer reveal the global homepage gradient while scrolling.
- Shifted homepage featured content to deterministic build-time grouping by docs `featured` and `kind` metadata, and documented that contract in the taxonomy doc.
- Extended the shared portal card component to support richer metadata and tags so video entries can reuse the existing card pattern instead of introducing a separate homepage card system.
- Replaced the hand-maintained teaching video catalog module with a seed-plus-generated data pipeline, keeping runtime rendering deterministic while moving metadata capture into an explicit sync step.
- Expanded the global footer with direct contact details, collaboration topics, and a usable repository fallback so the bottom section carries real personal entry points instead of empty space.
- Reframed the homepage, navbar, sidebar, and overview docs around team/platform-owner needs instead of only individual-engineer onboarding.
- Demoted the old `models-agents / ides-tooling / prompting-workflows / team-delivery` structure into legacy lenses while preserving their existing routes.
- Added domain-compatible freshness metadata to public knowledge docs and surfaced that metadata in homepage featured cards and search indexing, with `pillar` fallback for older pages.
- Reorganized the sidebar so main navigation now points to long-term knowledge-direction directories while old track hubs live under the archive lens section.
- Split the blog into `daily`, `weekly`, and `monthly` layers, and rewrote Daily Brief standards and site-admin workflows around draft-first publishing.
- Moved scratch note creation from `docs/notes` to `drafts/notes` so unpublished material no longer mixes with public docs.

### Fixed

- Reworked the scheduled Daily Brief and Weekly Roundup draft workflows to validate a build and commit generated draft files directly to the default branch, avoiding repeated failures when `GITHUB_TOKEN` is not allowed to create pull requests.
- Taught the GitHub Pages deploy workflow to rerun after successful content-generating bot workflows (`Teaching Videos Sync`, `Daily Brief Draft`, `Weekly Roundup Draft`) so site updates publish even when the underlying commit was pushed by `GITHUB_TOKEN`.

### Removed

- Removed the old split portal content sources `src/utils/docsCatalog.js` and `src/data/featuredBriefs.js` in favor of a single validated portal content source.
- Removed unused legacy homepage section components that no longer participate in the tutorial-first portal flow.

## [1.0.0] - 2026-03-06

### Added

- Independent portal homepage at `/` with tool navigation, track map, learning path, featured docs, and Daily Brief sections.
- Knowledge base moved under `/docs` with 30 public docs across overview, tracks, comparisons, playbooks, and insights.
- Daily Brief blog stream under `/blog` and initial AI coding trend articles.
- Local `ai-coding-daily-writer` skill and related drafting workflow files.

### Changed

- Reorganized Docusaurus navigation, sidebar structure, and route layout for portal-first information architecture.
- Added redirects for legacy root-level docs paths to preserve older links.
- Moved internal editorial and site-maintenance docs under `docs/site-admin`.
