# Technical Docs Editor Playbook

## Audit Framework

Use this four-layer audit before expanding a page.

| Layer | Core question | Thin-page signals | Reinforcement moves |
| --- | --- | --- | --- |
| `结构层` | Does the page have a clear job inside the topic? | No overview, weak section boundaries, no reading path, unclear relationship to sibling docs | Add overview, section map, reading sequence, and sibling-page handoff |
| `决策层` | Can the reader make choices from this page? | Missing fit guidance, no defaults, no anti-patterns, no failure signals | Add decision tables, recommended defaults, non-goals, and common failure modes |
| `证据层` | Does the page point to concrete artifacts? | No diagrams, screenshots, videos, examples, deliverables, or validation cues | Add media entry points, case slots, artifact lists, and verification expectations |
| `运营层` | Can this page live inside the site's content system? | Missing freshness metadata, weak related-doc links, no next step, no scope note | Preserve or add frontmatter hygiene, related-doc paths, and follow-up directions |

When reviewing, identify which layer is weakest first. Do not say only "the page is thin." Name the missing layer and the missing artifact.

## Content Shapes

### Role Docs

Role pages should teach someone how to work, not just define the role. Prefer:

- a short overview of what the role is trying to control
- module or topic map
- decision tables for tools, inputs, or workflows
- training tasks
- deliverables and review evidence
- related reading paths

For frontend role docs in this repo, bias toward diagrams, screenshots, video entry points, training tasks, artifact checklists, and sibling-page navigation before adding long prose.

### Tool Docs

Tool pages should answer:

- what the tool is good for
- when it fits and when it does not
- what workflows it supports
- what the default setup or first test looks like
- where to continue reading

If a tool page only describes features, add fit guidance, tradeoffs, workflow slots, and examples.

### Workflow Docs

Workflow pages should show motion and handoff, not static definitions. Prefer:

- phases or stages
- inputs and outputs
- artifacts and checkpoints
- failure modes
- tool-fit notes
- links to examples or related docs

If a workflow page becomes too abstract, add concrete artifacts, evidence, and failure signals.

### Standards And Site-Admin Docs

Standards pages should make operating rules explicit. Prefer:

- scope and non-goals
- default rules
- failure conditions
- update cadence or review cues
- related implementation docs

If a standards page only contains narrative explanation, add explicit rules, checklists, and maintenance cues.

## Expansion Order

Expand in this order unless the user explicitly asks otherwise:

1. Fix the skeleton.
   Add or tighten the overview, section boundaries, topic map, and reading path.
2. Add evidence slots.
   Add tables, diagrams, screenshots, videos, examples, deliverables, validation cues, and case-study references.
3. Fill the prose.
   Write the explanation, transitions, and nuance only after the structure and artifact slots are in place.

This prevents pages from growing longer while staying structurally weak.

## Output Templates

### 文档体检

```md
## 文档体检

**目标页面:** `<path>`
**模式:** `review` | `hybrid`
**结论:** 一句话判断当前页最主要的问题

### 四层判断

- `结构层`: ...
- `决策层`: ...
- `证据层`: ...
- `运营层`: ...

### 最薄弱的三个点

1. ...
2. ...
3. ...

### 建议动作

- 先出扩写计划 / 可以直接补稿
```

### 扩写计划

```md
## 扩写计划

**目标页面:** `<path>`
**为什么先计划:** ...

### 建议新增或重写的章节

1. ...
2. ...
3. ...

### 证据位补强

- 图表位: ...
- 案例位: ...
- 视频位: ...
- 交付物位: ...

### 改写顺序

1. ...
2. ...
3. ...
```

### 直接改稿

```md
## 直接改稿

**目标页面:** `<path>`

### 本次补强了什么

- ...
- ...

### 为什么先补这些

- ...

### 暂未覆盖

- ...
```

### 专题补强地图

```md
## 专题补强地图

**主题入口:** `<path>`

| 页面 | 当前问题 | 建议动作 | 优先级 |
| --- | --- | --- | --- |
| `...` | ... | ... | High |
| `...` | ... | ... | Medium |
```

Use `专题补强地图` when the user is shaping a multi-page role, tool, or workflow topic instead of one isolated page.

## Repo-Specific Heuristics

- Public docs in this repo usually carry freshness metadata such as `reviewed_at`, `source_window_end`, and `market_status`. Preserve them when editing public pages.
- Role docs should not stop at concept explanation. They should usually include training tasks, deliverables, validation cues, or reading paths.
- Frontend pages should heavily favor tables, diagrams, screenshots, video entry points, and artifact lists before adding large prose blocks.
- Avoid rewriting sibling pages to repeat the same material. If a neighboring page already owns the topic, link to it and keep the current page focused.
- If the requested change would alter topic boundaries, index-page structure, or multiple sibling pages at once, output a plan first instead of directly patching one page.
- Prefer internal doc links, route stability, and topic handoffs over standalone essay-style writing.
- For repo-local editorial or capability changes that affect how the project is maintained, update `CHANGELOG.md` under `Unreleased`.
