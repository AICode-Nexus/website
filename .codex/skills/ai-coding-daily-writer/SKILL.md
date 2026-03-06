---
name: ai-coding-daily-writer
description: Draft and maintain daily AI coding trend articles for a docs or blog repository. Use when Codex needs to research the latest AI coding models, agents, IDEs, release notes, pricing changes, workflow shifts, or benchmark updates; create a dated daily brief; or turn current product changes into a publishable article.
---

# AI Coding Daily Writer

## Overview

Create publishable daily AI coding articles with a fixed structure, dated sourcing, and clear engineering impact. Use the bundled script to open a dated blog file, then fill it with verified, time-sensitive content.

## Workflow

### 1. Define scope

- Use the requested date if the user provides one. Otherwise use the current local date.
- Keep scope tightly focused on AI coding, not general AI news.
- Prefer one daily brief over multiple fragmented updates.

### 2. Research before writing

- Browse because the content is time-sensitive.
- Prefer primary sources: official blogs, docs, release notes, GitHub releases.
- Use secondary analysis only to add context, not as the factual base.
- Read `source-playbook.md` before drafting if the topic mix is unclear.

### 3. Create the daily file

From the repo root, run:

```bash
./skills/ai-coding-daily-writer/new-daily-brief.sh <topic-slug>
```

The script creates:

```text
blog/YYYY-MM-DD-<topic-slug>.md
```

Use short ASCII slugs such as `codex-cli-release-shift` or `claude-code-team-rollout`.

### 4. Draft the article

Use this structure:

1. `TL;DR`
2. `What changed today`
3. `Why it matters`
4. `What to test`
5. `Watchlist`
6. `Sources`

Keep the piece focused on 3 to 5 material changes.

### 5. Preserve rigor

- Write exact dates for time-sensitive facts.
- Distinguish facts from inference.
- Translate product announcements into engineering consequences.
- If evidence is thin, say so explicitly.
- If nothing truly important happened, publish a short no-signal brief instead of forcing weak items.

## Resources

- `source-playbook.md`: source priority, topic selection rules, and article checklist
- `new-daily-brief.sh`: creates a Docusaurus blog post template for the current date

## Output Standard

- The article must be ready to publish in a Docusaurus blog without extra restructuring.
- Keep tone analytical, not promotional.
- Every item should answer one question: what should an engineer or technical leader do with this information?
