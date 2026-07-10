#!/bin/bash
# ─── AbeHayaat Deploy Script ───
# Usage:
#   ./deploy.sh                   → deploy with auto message
#   ./deploy.sh "my changes"      → deploy with custom message
#   ./deploy.sh --env NAME VALUE  → add/update env var on Vercel + redeploy
#   ./deploy.sh --env-only NAME V → only update env, no code deploy

set -e

# ── Env variable update mode ──────────────────────────────────
if [[ "$1" == "--env" ]]; then
  VAR_NAME="$2"
  VAR_VALUE="$3"
  echo "🔑 Updating env variable: $VAR_NAME"
  # Remove old value if exists
  npx vercel env rm "$VAR_NAME" production --yes 2>/dev/null || true
  # Add new value
  echo "$VAR_VALUE" | npx vercel env add "$VAR_NAME" production
  echo "⚡ Redeploying to apply new env..."
  npx vercel --prod
  echo "✅ Env updated & redeployed → https://abehayat.vercel.app"
  exit 0
fi

if [[ "$1" == "--env-only" ]]; then
  VAR_NAME="$2"
  VAR_VALUE="$3"
  echo "🔑 Updating env variable: $VAR_NAME (no redeploy)"
  npx vercel env rm "$VAR_NAME" production --yes 2>/dev/null || true
  echo "$VAR_VALUE" | npx vercel env add "$VAR_NAME" production
  echo "✅ Env saved. Run './deploy.sh' to redeploy."
  exit 0
fi

# ── Code deploy mode ──────────────────────────────────────────
MSG="${1:-auto-update $(date '+%Y-%m-%d %H:%M')}"

echo "📦 Committing: $MSG"
git add -A
git commit -m "$MSG" 2>/dev/null || echo "   (nothing new to commit)"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "⚡ Deploying to Vercel..."
npx vercel --prod

echo ""
echo "✅ Live at: https://abehayat.vercel.app"
echo "📊 DB check: https://abehayat.vercel.app/api/db-test"
