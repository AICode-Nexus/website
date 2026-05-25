---
title: AI Resource Directory Rebuild Implementation Plan
description: 为全行业 AI 资源库重建记录可执行实施计划。
slug: /site-admin/superpowers/plans/ai-resource-directory-rebuild
tags: [site-admin, plan, superpowers, ai-directory]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: development-planning
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-05-25
source_window_end: 2026-05-25
market_status: current
unlisted: true
---

# AI Resource Directory Rebuild Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `AI 资源导航` into a broad, foreign-source-first, cross-industry AI resource directory with validated metadata, category pages, and 100-200 reviewed resources.

**Architecture:** Keep `src/data/aiDirectory.js` as the canonical static data source and expand `src/utils/aiDirectory.js` as the validation boundary. Category pages in `docs/ai-directory/` should remain lightweight MDX shells that render validated entries through shared components, while collection evidence lives under `content-sources/ai-directory/`.

**Tech Stack:** Docusaurus, MDX, React docs components, JavaScript data modules, repo content checks, static source manifests

---

## File Structure

- Modify: `src/utils/aiDirectory.js`
  - Responsibility: resource type labels, metadata enum validation, URL/date/id checks, sorting helpers.
- Modify: `src/data/aiDirectory.js`
  - Responsibility: top-level categories and canonical resource entries.
- Modify: `src/components/docs/AiDirectoryTable.js`
  - Responsibility: table rendering for resource type, links, audience, trust, language, and priority.
- Modify: `src/components/docs/AiDirectoryCategoryView.js`
  - Responsibility: category summary counts and featured/core metadata display.
- Modify: `docs/ai-directory/index.mdx`
  - Responsibility: overview copy, collection rules, category cards, and related readings.
- Create or replace: `docs/ai-directory/<category>.mdx`
  - Responsibility: one route per top-level category.
- Modify: `sidebars.js`
  - Responsibility: expose the new top-level directory routes.
- Create: `content-sources/ai-directory/2026-05-25-resource-candidates.md`
  - Responsibility: source collection evidence, category queue, rejected-source notes, and source-window boundary.
- Modify: `docs/overview/taxonomy.md`
  - Responsibility: clarify that `AI 资源导航` now supports cross-industry resources.
- Modify: `docs/overview/content-index.md`
  - Responsibility: route users to the rebuilt directory when they need official sites and resource collections.
- Modify: `CHANGELOG.md`
  - Responsibility: record the releasable milestone.

## Chunk 1: Schema And Rendering Foundation

### Task 1: Expand directory metadata validation

**Files:**
- Modify: `src/utils/aiDirectory.js`

- [ ] **Step 1: Add the new resource type labels**

Add these labels to `AI_DIRECTORY_RESOURCE_TYPE_LABELS` while keeping all existing labels:

```js
export const AI_DIRECTORY_RESOURCE_TYPE_LABELS = {
  'official-product': '官方产品',
  'official-platform': '官方平台',
  'official-docs': '官方文档',
  'official-course': '官方课程',
  'official-cookbook': '官方 Cookbook',
  'official-repo': '官方仓库',
  'research-lab': '研究机构',
  'open-source-project': '开源项目',
  'community-curation': '社区精选',
  'community-course': '社区课程',
  'community-repo': '社区仓库',
  'industry-resource': '行业资源',
  'tool-directory': '工具目录',
  'media-library': '媒体资料库',
};
```

- [ ] **Step 2: Add metadata label maps and enum lists**

Add constants near the resource type labels:

```js
export const AI_DIRECTORY_AUDIENCE_LABELS = {
  developer: '研发',
  product: '产品',
  design: '设计',
  operations: '运营',
  marketing: '市场',
  sales: '销售',
  data: '数据',
  productivity: '办公效率',
  management: '管理',
  industry: '行业专题',
  general: '通用',
};

export const AI_DIRECTORY_TRUST_LEVEL_LABELS = {
  official: '官方',
  institutional: '机构可信',
  'established-community': '成熟社区',
  'emerging-community': '观察社区',
  watch: '待观察',
};

export const AI_DIRECTORY_COLLECTION_PRIORITY_LABELS = {
  core: '核心',
  important: '重要',
  supplemental: '补充',
};

export const AI_DIRECTORY_MARKET_STATUS_LABELS = {
  current: '当前可用',
  watch: '观察中',
  legacy: '历史保留',
};
```

- [ ] **Step 3: Add optional enum validation helper**

Add this helper after `ensureEnumValue`:

```js
function ensureOptionalEnumValue(value, fieldName, allowedValues) {
  if (value === undefined) {
    return undefined;
  }

  return ensureEnumValue(value, fieldName, allowedValues);
}
```

- [ ] **Step 4: Validate new entry fields**

Inside the `entries` mapper, add validated fields:

```js
const audience = ensureOptionalEnumValue(
  entry.audience,
  `${fieldName}.audience`,
  Object.keys(AI_DIRECTORY_AUDIENCE_LABELS),
);
const language = ensureOptionalEnumValue(entry.language, `${fieldName}.language`, ['en', 'zh', 'multi']);
const region = ensureOptionalEnumValue(entry.region, `${fieldName}.region`, ['global', 'china', 'us', 'europe', 'other']);
const trustLevel = ensureOptionalEnumValue(
  entry.trustLevel,
  `${fieldName}.trustLevel`,
  Object.keys(AI_DIRECTORY_TRUST_LEVEL_LABELS),
);
const marketStatus = ensureOptionalEnumValue(
  entry.marketStatus,
  `${fieldName}.marketStatus`,
  Object.keys(AI_DIRECTORY_MARKET_STATUS_LABELS),
);
const collectionPriority = ensureOptionalEnumValue(
  entry.collectionPriority,
  `${fieldName}.collectionPriority`,
  Object.keys(AI_DIRECTORY_COLLECTION_PRIORITY_LABELS),
);
```

Return these fields with defaults that preserve old entries:

```js
audience: audience ?? 'developer',
language: language ?? 'en',
region: region ?? 'global',
trustLevel: trustLevel ?? 'official',
marketStatus: marketStatus ?? 'current',
collectionPriority: collectionPriority ?? 'important',
...(entry.updateTrigger === undefined
  ? {}
  : {updateTrigger: ensureString(entry.updateTrigger, `${fieldName}.updateTrigger`)}),
```

- [ ] **Step 5: Sort by featured, priority, then name**

In `getAiDirectoryEntriesByCategory`, replace the final sort callback with priority-aware sorting:

```js
const priorityRank = {
  core: 0,
  important: 1,
  supplemental: 2,
};

return frozenEntries
  .filter((entry) => entry.categoryId === categoryId)
  .sort((left, right) => {
    if (Boolean(left.featured) !== Boolean(right.featured)) {
      return left.featured ? -1 : 1;
    }

    const priorityDelta = priorityRank[left.collectionPriority] - priorityRank[right.collectionPriority];
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return left.name.localeCompare(right.name, 'en');
  });
```

- [ ] **Step 6: Run a build check**

Run: `npm run build`

Expected: PASS. If it fails with an enum error, fix the label map or entry metadata before continuing.

### Task 2: Render the new metadata without changing the table shape too much

**Files:**
- Modify: `src/components/docs/AiDirectoryTable.js`
- Modify: `src/components/docs/AiDirectoryCategoryView.js`

- [ ] **Step 1: Import new label maps**

Update the import in `AiDirectoryTable.js`:

```js
import {
  AI_DIRECTORY_AUDIENCE_LABELS,
  AI_DIRECTORY_COLLECTION_PRIORITY_LABELS,
  AI_DIRECTORY_RESOURCE_TYPE_LABELS,
  AI_DIRECTORY_TRUST_LEVEL_LABELS,
} from '@site/src/utils/aiDirectory';
```

- [ ] **Step 2: Add metadata chips in the resource cell**

Under the existing `entry.name`, render compact metadata:

```jsx
<div className={styles.tagGroup}>
  <span className={styles.meta}>
    {AI_DIRECTORY_AUDIENCE_LABELS[entry.audience] ?? entry.audience}
  </span>
  <span className={styles.meta}>
    {AI_DIRECTORY_TRUST_LEVEL_LABELS[entry.trustLevel] ?? entry.trustLevel}
  </span>
  <span className={styles.meta}>
    {AI_DIRECTORY_COLLECTION_PRIORITY_LABELS[entry.collectionPriority] ?? entry.collectionPriority}
  </span>
</div>
```

- [ ] **Step 3: Keep links de-duplicated**

Leave `getEntryLinks` as the single link builder. Do not add new URL fields in this pass.

- [ ] **Step 4: Show category counts by priority**

In `AiDirectoryCategoryView.js`, compute `coreCount`:

```js
const coreCount = entries.filter((entry) => entry.collectionPriority === 'core').length;
```

Append it to `resourceMeta` only when present:

```jsx
{coreCount > 0 ? ` · 核心 ${coreCount} 个` : ''}
```

- [ ] **Step 5: Run checks**

Run:

```bash
npm run check:content
npm run build
```

Expected: both PASS.

### Task 3: Commit schema and rendering foundation

**Files:**
- Modify: `src/utils/aiDirectory.js`
- Modify: `src/components/docs/AiDirectoryTable.js`
- Modify: `src/components/docs/AiDirectoryCategoryView.js`

- [ ] Commit only these files:

```bash
git add src/utils/aiDirectory.js src/components/docs/AiDirectoryTable.js src/components/docs/AiDirectoryCategoryView.js
git commit -m "feat(ai-directory): expand resource metadata"
```

## Chunk 2: Category Migration And Page Shells

### Task 4: Replace the category model with the cross-industry taxonomy

**Files:**
- Modify: `src/data/aiDirectory.js`

- [ ] **Step 1: Update the default collection dates**

Change:

```js
const reviewedAt = '2026-05-25';
const sourceWindowEnd = '2026-05-25';
```

- [ ] **Step 2: Replace the category list with the 10 approved categories**

Use these exact category ids and slugs:

```js
const categories = [
  {
    id: 'foundational-platforms',
    title: '基础与官方平台',
    description: '收模型厂商、云平台、官方 API 文档、官方 Cookbook 和模型能力入口。',
    slug: '/docs/ai-directory/foundational-platforms',
    sidebarLabel: '基础与官方平台',
  },
  {
    id: 'ai-coding',
    title: '研发与 AI Coding',
    description: '收 AI 编码工具、AI IDE、终端 agent、代码评审与软件工程资源。',
    slug: '/docs/ai-directory/ai-coding',
    sidebarLabel: '研发与 AI Coding',
  },
  {
    id: 'agent-app-development',
    title: 'Agent、MCP 与 LLM 应用开发',
    description: '收 agent SDK、MCP、RAG、workflow 编排、tool use 和 LLM 应用开发资源。',
    slug: '/docs/ai-directory/agent-app-development',
    sidebarLabel: 'Agent 与应用开发',
  },
  {
    id: 'product-design',
    title: '产品与设计',
    description: '收产品研究、原型、设计生成、用户研究、设计系统和产品反馈分析资源。',
    slug: '/docs/ai-directory/product-design',
    sidebarLabel: '产品与设计',
  },
  {
    id: 'operations-marketing',
    title: '运营与市场',
    description: '收内容运营、SEO、增长、广告、社媒、活动运营和趋势研究资源。',
    slug: '/docs/ai-directory/operations-marketing',
    sidebarLabel: '运营与市场',
  },
  {
    id: 'sales-business',
    title: '销售与商务',
    description: '收销售研究、CRM AI、会议准备、方案生成、客户跟进和商务开发资源。',
    slug: '/docs/ai-directory/sales-business',
    sidebarLabel: '销售与商务',
  },
  {
    id: 'data-analysis',
    title: '数据与分析',
    description: '收 AI 辅助数据分析、BI、Notebook、数据清洗、可视化和报告生成资源。',
    slug: '/docs/ai-directory/data-analysis',
    sidebarLabel: '数据与分析',
  },
  {
    id: 'productivity-office',
    title: '企业效率与办公',
    description: '收文档、表格、会议、知识库、搜索、自动化和内部协作类 AI 资源。',
    slug: '/docs/ai-directory/productivity-office',
    sidebarLabel: '企业效率与办公',
  },
  {
    id: 'industry-topics',
    title: '行业专题',
    description: '收教育、法律、金融、医疗、电商、媒体、制造、客服等行业 AI 资源。',
    slug: '/docs/ai-directory/industry-topics',
    sidebarLabel: '行业专题',
  },
  {
    id: 'chinese-community',
    title: '中文社区与导航',
    description: '收中文世界里持续维护、适合收藏和本地化学习的 AI 社区、导航站与精选仓库。',
    slug: '/docs/ai-directory/chinese-community',
    sidebarLabel: '中文社区与导航',
  },
];
```

Then pass `categories` into `defineAiDirectoryCatalog`.

- [ ] **Step 3: Remap existing entries**

Use this migration map:

```text
coding-agents -> ai-coding
agent-frameworks -> agent-app-development
evals-and-llmops -> agent-app-development, unless the entry is mainly analytics/evaluation infrastructure
learning-and-collections -> foundational-platforms for official courses/cookbooks, or ai-coding for code-specific learning resources
model-platforms -> foundational-platforms
mcp-and-protocols -> agent-app-development
chinese-community -> chinese-community
```

- [ ] **Step 4: Add new metadata to all existing entries**

For every existing entry, add:

```js
audience: 'developer',
language: 'en',
region: 'global',
trustLevel: 'official',
marketStatus: 'current',
collectionPriority: 'important',
updateTrigger: 'Major product, docs, repository, or positioning change.',
```

Adjust obvious exceptions:

- Chinese community entries: `language: 'zh'`, `region: 'china'`, `trustLevel: 'established-community'`
- Open-source community tools: `trustLevel: 'established-community'`
- Supplemental resources: `collectionPriority: 'supplemental'`

- [ ] **Step 5: Run build to catch category id mistakes**

Run: `npm run build`

Expected: FAIL if any entry still uses an undeclared category id. Fix all category id errors before continuing.

### Task 5: Create or update category MDX pages

**Files:**
- Modify: `docs/ai-directory/index.mdx`
- Create: `docs/ai-directory/foundational-platforms.mdx`
- Create: `docs/ai-directory/ai-coding.mdx`
- Create: `docs/ai-directory/agent-app-development.mdx`
- Create: `docs/ai-directory/product-design.mdx`
- Create: `docs/ai-directory/operations-marketing.mdx`
- Create: `docs/ai-directory/sales-business.mdx`
- Create: `docs/ai-directory/data-analysis.mdx`
- Create: `docs/ai-directory/productivity-office.mdx`
- Create: `docs/ai-directory/industry-topics.mdx`
- Modify: `docs/ai-directory/chinese-community.mdx`

- [ ] **Step 1: Update the directory index copy**

Change the first paragraph to say the directory is a cross-industry AI resource library, with foreign official and high-quality sites as the default collection baseline.

- [ ] **Step 2: Create category page template**

Use this page structure for each new category, replacing values:

```mdx
---
title: 基础与官方平台
description: 收模型厂商、云平台、官方 API 文档、官方 Cookbook 和模型能力入口。
slug: /ai-directory/foundational-platforms
displayed_sidebar: aiDirectorySidebar
sidebar_label: 基础与官方平台
tags: [ai, directory, resources]
track: cross-track
kind: guide
content_form: resource
audience: mixed
stage: starter
featured: false
domain: tools
journey_stage: tech-selection
entry_role: resource
reviewed_at: 2026-05-25
source_window_end: 2026-05-25
market_status: current
---

import {AiDirectoryCategoryView, RelatedReadings} from '@site/src/components/docs';

# 基础与官方平台

这一类资源解决的是“我要先看哪些官方入口和高可信 AI 平台资料”。第一期优先收国外官方站点、官方文档、官方课程、Cookbook 和可信开源入口。

## 这类资源怎么用

- 先从官方文档和 Cookbook 判断能力边界。
- 再看是否有可复用示例、SDK 或公开案例。
- 涉及价格、安全、合规、医疗、法律、金融等内容时，以官方页面和机构来源为准。

## 首批精选入口

<AiDirectoryCategoryView categoryId="foundational-platforms" />

## 继续阅读

<RelatedReadings
  title="继续阅读"
  description="资源目录解决入口收集，真正学习仍要回到教程、工作流和案例。"
  items={[
    {
      title: 'AI 资源导航首页',
      href: '/docs/ai-directory',
      description: '回到目录首页，切换到其他行业和岗位分类。',
    },
    {
      title: '工具教程',
      href: '/docs/tools',
      description: '把资源入口转成可执行的工具教程。',
    },
  ]}
/>
```

- [ ] **Step 3: Update the `categoryId` in every page**

Each page must call the matching category id:

```mdx
<AiDirectoryCategoryView categoryId="product-design" />
```

- [ ] **Step 4: Keep old pages only if redirects are needed**

If old category docs remain, either update their contents to the new taxonomy or remove them from the sidebar. Do not leave stale pages claiming the old 7-category model as current.

- [ ] **Step 5: Run IA and content checks**

Run:

```bash
npm run check:ia
npm run check:content
```

Expected: both PASS.

### Task 6: Update sidebar wiring

**Files:**
- Modify: `sidebars.js`

- [ ] **Step 1: Replace `aiDirectorySidebar` entries**

Use this order:

```js
aiDirectorySidebar: [
  'ai-directory/index',
  'ai-directory/foundational-platforms',
  'ai-directory/ai-coding',
  'ai-directory/agent-app-development',
  'ai-directory/product-design',
  'ai-directory/operations-marketing',
  'ai-directory/sales-business',
  'ai-directory/data-analysis',
  'ai-directory/productivity-office',
  'ai-directory/industry-topics',
  'ai-directory/chinese-community',
],
```

- [ ] **Step 2: Run build**

Run: `npm run build`

Expected: PASS with no broken sidebar doc ids.

### Task 7: Commit taxonomy migration

**Files:**
- Modify: `src/data/aiDirectory.js`
- Modify: `docs/ai-directory/index.mdx`
- Create/modify: `docs/ai-directory/*.mdx`
- Modify: `sidebars.js`

- [ ] Commit only the taxonomy and page-shell files:

```bash
git add src/data/aiDirectory.js docs/ai-directory sidebars.js
git commit -m "feat(ai-directory): add cross-industry taxonomy"
```

## Chunk 3: Foreign-First Resource Collection

### Task 8: Create the collection evidence manifest

**Files:**
- Create: `content-sources/ai-directory/2026-05-25-resource-candidates.md`

- [ ] **Step 1: Add manifest frontmatter**

```md
---
title: AI Resource Directory Candidate Sources
source_window_start: 2026-05-25
source_window_end: 2026-05-25
scope: foreign-first cross-industry AI resources
status: active-collection
---
```

- [ ] **Step 2: Add these sections**

```md
# AI Resource Directory Candidate Sources

## Collection Rules

## Category Targets

## Accepted Sources

## Deferred Sources

## Rejected Sources

## Verification Notes
```

- [ ] **Step 3: Record source evidence as resources are added**

Use this format:

```md
### OpenAI Platform

- Category: `foundational-platforms`
- Resource type: `official-platform`
- URLs checked:
  - https://platform.openai.com/docs
  - https://cookbook.openai.com/
- Reason: Official OpenAI developer platform and Cookbook.
- Date checked: 2026-05-25
- Decision: accepted
```

- [ ] **Step 4: Do not add unverified resources to `src/data/aiDirectory.js`**

Every accepted entry in data must have a matching note in this manifest.

### Task 9: Collect foundational and developer resources

**Files:**
- Modify: `src/data/aiDirectory.js`
- Modify: `content-sources/ai-directory/2026-05-25-resource-candidates.md`

- [ ] **Step 1: Verify official platform resources live**

Use browser or web search and prioritize primary sources. Candidate set:

```text
OpenAI Platform
OpenAI Cookbook
Anthropic Docs
Anthropic Cookbook
Google AI for Developers
Google Gemini API Docs
Microsoft Azure AI Foundry
AWS Bedrock
Meta AI / Llama official resources
Mistral AI Docs
Hugging Face Docs
Cohere Docs
Stability AI Docs
NVIDIA AI / NIM Docs
```

- [ ] **Step 2: Add 10-20 accepted entries to `foundational-platforms`**

Entry template:

```js
entry({
  id: 'openai-platform',
  categoryId: 'foundational-platforms',
  name: 'OpenAI Platform',
  resourceType: 'official-platform',
  officialUrl: 'https://platform.openai.com/docs',
  summary: 'OpenAI 的官方开发者平台与 API 文档入口。',
  bestFor: '需要构建多模态、agent、评估或 API 应用的团队。',
  whyListed: '官方一手入口，适合作为模型平台能力判断的基线。',
  tags: ['OpenAI', 'API', '官方文档'],
  audience: 'developer',
  language: 'en',
  region: 'global',
  trustLevel: 'official',
  marketStatus: 'current',
  collectionPriority: 'core',
  updateTrigger: 'Major API, model, SDK, pricing, or platform documentation change.',
  featured: true,
})
```

- [ ] **Step 3: Verify AI coding resources live**

Candidate set:

```text
GitHub Copilot
GitHub Copilot Docs
OpenAI Codex
Claude Code
Cursor
Windsurf
Gemini CLI
Cline
OpenHands
Aider
Sourcegraph Cody
Continue
Tabnine
JetBrains AI
```

- [ ] **Step 4: Add or update 10-20 entries in `ai-coding`**

Keep existing high-quality entries, but update metadata, dates, and category ids.

- [ ] **Step 5: Verify agent and application development resources live**

Candidate set:

```text
OpenAI Agents SDK
Anthropic tool use docs
LangGraph
LangChain
LlamaIndex
Microsoft AutoGen
CrewAI
PydanticAI
Mastra
Vercel AI SDK
Model Context Protocol
MCP TypeScript SDK
MCP Python SDK
Smithery
FastMCP
OpenAI Apps SDK
```

- [ ] **Step 6: Add or update 10-20 entries in `agent-app-development`**

Split entries by practical use: agent framework, MCP/protocol, app SDK, RAG/data framework, or evaluation infrastructure.

- [ ] **Step 7: Run build**

Run: `npm run build`

Expected: PASS.

### Task 10: Collect product, design, operations, marketing, and sales resources

**Files:**
- Modify: `src/data/aiDirectory.js`
- Modify: `content-sources/ai-directory/2026-05-25-resource-candidates.md`

- [ ] **Step 1: Verify product and design resources live**

Candidate set:

```text
Figma AI / Figma Docs
FigJam AI
Framer AI
Webflow AI
Relume
Uizard
Miro AI
Notion AI for product docs
Productboard AI
Dovetail AI
Maze AI
UserTesting AI
```

- [ ] **Step 2: Add 10-20 entries in `product-design`**

Only accept resources that clearly produce product research, prototype, design, design-system, or user-feedback artifacts.

- [ ] **Step 3: Verify operations and marketing resources live**

Candidate set:

```text
HubSpot AI
Semrush AI features
Ahrefs AI Content Helper or official AI resources
Jasper
Copy.ai
Canva AI / Magic Studio
Adobe Firefly
Buffer AI Assistant
Hootsuite AI
Sprout Social AI
Mailchimp AI
Klaviyo AI
```

- [ ] **Step 4: Add 10-20 entries in `operations-marketing`**

Avoid low-quality SEO pages. Prefer official product docs, official feature pages, and durable help centers.

- [ ] **Step 5: Verify sales and business resources live**

Candidate set:

```text
Salesforce Einstein / Agentforce
HubSpot Sales AI
Microsoft Copilot for Sales
Gong
Clari
Apollo AI
ZoomInfo Copilot
Clay
Lavender
Outreach AI
Salesloft AI
Fireflies.ai
```

- [ ] **Step 6: Add 10-20 entries in `sales-business`**

Only accept resources that connect to concrete sales artifacts: account research, CRM updates, call summaries, proposals, follow-up, or forecasting.

- [ ] **Step 7: Run checks**

Run:

```bash
npm run check:content
npm run build
```

Expected: both PASS.

### Task 11: Collect data, office, industry, and Chinese resources

**Files:**
- Modify: `src/data/aiDirectory.js`
- Modify: `content-sources/ai-directory/2026-05-25-resource-candidates.md`

- [ ] **Step 1: Verify data and analysis resources live**

Candidate set:

```text
Google Colab AI features
Kaggle Learn / AI resources
Databricks AI
Snowflake Cortex
Microsoft Power BI Copilot
Tableau AI
Hex
Deepnote AI
Observable
Mode AI
DataCamp AI courses
Hugging Face datasets/docs
```

- [ ] **Step 2: Add 10-20 entries in `data-analysis`**

Focus on reproducible analysis, BI, notebooks, data apps, and report artifacts.

- [ ] **Step 3: Verify productivity and office resources live**

Candidate set:

```text
Microsoft 365 Copilot
Google Workspace Gemini
Notion AI
Slack AI
Zoom AI Companion
Otter.ai
Grammarly
Zapier AI
Make AI
Atlassian Intelligence
Dropbox Dash
Box AI
```

- [ ] **Step 4: Add 10-20 entries in `productivity-office`**

Focus on documents, spreadsheets, meetings, knowledge base, automation, search, and collaboration.

- [ ] **Step 5: Verify industry resources live**

Candidate set:

```text
Khan Academy Khanmigo
Duolingo Max
Coursera AI resources
Harvey
Thomson Reuters CoCounsel
Lexis+ AI
Bloomberg AI resources
NVIDIA Healthcare AI resources
Google Cloud Healthcare AI resources
Shopify Magic
Intercom Fin
Zendesk AI
```

- [ ] **Step 6: Add 10-20 entries in `industry-topics`**

Healthcare, legal, and finance entries must avoid advice language. Use `industry-resource`, `trustLevel: 'institutional'` or `official`, and cautious summaries.

- [ ] **Step 7: Verify Chinese community resources live**

Candidate set:

```text
WaytoAGI
LangGPT
AI Short / ChatGPT Shortcut
OpenBMB
ModelScope
魔搭社区文档
机器之心
量子位
少数派 AI 专题
AI 研习社 or other maintained learning communities
```

- [ ] **Step 8: Add 10-20 entries in `chinese-community`**

Keep this category useful but bounded. Do not let Chinese navigation sites dominate the directory.

- [ ] **Step 9: Run build**

Run: `npm run build`

Expected: PASS.

### Task 12: Commit resource collection batch

**Files:**
- Modify: `src/data/aiDirectory.js`
- Modify: `content-sources/ai-directory/2026-05-25-resource-candidates.md`

- [ ] Commit the collected resources and evidence manifest:

```bash
git add src/data/aiDirectory.js content-sources/ai-directory/2026-05-25-resource-candidates.md
git commit -m "docs(ai-directory): collect cross-industry AI resources"
```

## Chunk 4: Navigation, Governance, And Release Checks

### Task 13: Update related navigation docs

**Files:**
- Modify: `docs/overview/taxonomy.md`
- Modify: `docs/overview/content-index.md`
- Modify: `docs/tools/resources/index.mdx`

- [ ] **Step 1: Update taxonomy resource-layer description**

Change the `AI 资源导航` line from AI-coding-only wording to cross-industry wording:

```md
- [`AI 资源导航`](/docs/ai-directory)：放国内外优秀 AI 官网、官方文档、开源仓库、课程、Cookbook、行业资源和角色工作资源这类目录型入口。
```

- [ ] **Step 2: Update content index copy**

Where it says the directory is for official docs and repo addresses, expand it to include cross-industry resource discovery.

- [ ] **Step 3: Update resources index related link**

Make `/docs/tools/resources/index.mdx` describe video resources as a separate media layer, not the same thing as the broad AI resource directory.

- [ ] **Step 4: Run content checks**

Run: `npm run check:content`

Expected: PASS.

### Task 14: Update release notes

**Files:**
- Modify: `CHANGELOG.md`

- [ ] Add one `Unreleased -> Added` bullet:

```md
- Rebuilt `AI 资源导航` into a cross-industry AI resource directory with a foreign-source-first collection strategy, expanded metadata, 10 top-level categories, and a dated source manifest for reviewed resources.
```

### Task 15: Full verification

**Files:**
- No file changes expected

- [ ] **Step 1: Run IA check**

Run: `npm run check:ia`

Expected: `IA audit passed.`

- [ ] **Step 2: Run content quality check**

Run: `npm run check:content`

Expected: `Content quality check passed.`

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: `[SUCCESS] Generated static files in "build".`

- [ ] **Step 4: Inspect important routes locally if a dev server is already running**

Routes to verify:

```text
/docs/ai-directory
/docs/ai-directory/foundational-platforms
/docs/ai-directory/ai-coding
/docs/ai-directory/agent-app-development
/docs/ai-directory/product-design
/docs/ai-directory/operations-marketing
/docs/ai-directory/sales-business
/docs/ai-directory/data-analysis
/docs/ai-directory/productivity-office
/docs/ai-directory/industry-topics
/docs/ai-directory/chinese-community
```

Expected: every route renders a table and no category throws `Unknown AI directory category`.

### Task 16: Final commit

**Files:**
- Modify: `docs/overview/taxonomy.md`
- Modify: `docs/overview/content-index.md`
- Modify: `docs/tools/resources/index.mdx`
- Modify: `CHANGELOG.md`

- [ ] Commit navigation and release notes:

```bash
git add docs/overview/taxonomy.md docs/overview/content-index.md docs/tools/resources/index.mdx CHANGELOG.md
git commit -m "docs(ai-directory): update resource navigation"
```

## Execution Notes

- Do not edit unrelated dirty files in the working tree.
- Do not treat candidate names as accepted resources until the official page, docs page, or repository has been checked during implementation.
- If a resource cannot be verified on 2026-05-25, put it in `Deferred Sources` instead of adding it to `src/data/aiDirectory.js`.
- If the first pass grows beyond 200 entries, stop at the highest-trust resources and put the rest in the manifest backlog.
- For medical, legal, and financial resources, write cautious summaries and do not imply professional advice.

