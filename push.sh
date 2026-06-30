#!/bin/bash
# push.sh - 一键提交 + 推送 UUPAY website 代码
# 用法: ./push.sh "你的 commit message"
#      ./push.sh   (不传 message, 用默认)

set -e

# cd 到脚本所在目录
cd "$(dirname "$0")"

# 默认 commit message
MSG="${1:-Update UUPAY website}"

# 显示当前状态
echo "📊 Git status:"
git status -sb

# 检查有没有改动 (包括未跟踪文件)
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo ""
  echo "✅ 没有改动,无需提交"
  exit 0
fi

# Stage + commit + push
echo ""
echo "📝 Commit message: $MSG"
git add .
git commit -m "$MSG"
echo ""
echo "🚀 Pushing to origin/main..."
git push origin main
echo ""
echo "✅ Done!"
