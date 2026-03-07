#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <topic-slug>"
  exit 1
fi

slug="$1"
date_prefix="$(date +%F)"
out_dir="drafts/notes"
out_file="${out_dir}/${date_prefix}-${slug}.md"

mkdir -p "$out_dir"

if [[ -f "$out_file" ]]; then
  echo "File already exists: $out_file"
  exit 1
fi

cat > "$out_file" <<TEMPLATE
# ${slug}

## 目标
- 受众：
- 场景：

## 已知信息
- 待补充

## 核心判断
- 待补充

## 推荐结构
1. 待补充
2. 待补充
3. 待补充

## 待补证据
- 待补充

## 风险与边界
- 待补充

## 相关链接
- 待补充
TEMPLATE

echo "Created: $out_file"
