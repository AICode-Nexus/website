#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <topic-slug>"
  exit 1
fi

slug="$1"
date_prefix="$(date +%F)"
title_suffix="${slug//-/ }"
out_dir="blog"
out_file="${out_dir}/${date_prefix}-${slug}.md"

mkdir -p "$out_dir"

if [[ -f "$out_file" ]]; then
  echo "File already exists: $out_file"
  exit 1
fi

cat > "$out_file" <<TEMPLATE
---
slug: ${slug}
title: "AI Coding Daily Brief | ${date_prefix} | ${title_suffix}"
description: "Daily brief for the most important AI coding updates on ${date_prefix}."
tags: [ai-coding, daily-brief]
---

## TL;DR

- 

## What changed today

### 1.

-

## Why it matters

- 

## What to test

1.

## Watchlist

- 

## Sources

- 
TEMPLATE

echo "Created: $out_file"
