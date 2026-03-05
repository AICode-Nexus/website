#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <topic-slug>"
  exit 1
fi

slug="$1"
date_prefix="$(date +%F)"
out_dir="docs/notes"
out_file="${out_dir}/${date_prefix}-${slug}.md"

mkdir -p "$out_dir"

if [[ -f "$out_file" ]]; then
  echo "File already exists: $out_file"
  exit 1
fi

cat > "$out_file" <<TEMPLATE
# ${slug}

## 背景
- 问题：
- 场景：

## 结论
- 

## 详细步骤
1. 
2. 
3. 

## 示例
\`\`\`bash
# command here
\`\`\`

## 风险与边界
- 

## 参考
- 
TEMPLATE

echo "Created: $out_file"
