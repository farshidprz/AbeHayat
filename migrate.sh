#!/bin/bash
# ─── Run Supabase Migrations ───
# Usage:
#   ./migrate.sh              → run all pending migrations
#   ./migrate.sh 001          → run specific migration

set -e

# Load DATABASE_URL from .env.local if not set
if [[ -z "$DATABASE_URL" ]]; then
  if [[ -f .env.local ]]; then
    export DATABASE_URL=$(grep '^DATABASE_URL=' .env.local | cut -d '=' -f2-)
  fi
fi

if [[ -z "$DATABASE_URL" ]]; then
  echo ""
  echo "❌  DATABASE_URL is not set."
  echo ""
  echo "Add this line to your .env.local:"
  echo "  DATABASE_URL=postgresql://postgres:<PASSWORD>@db.sbmvyhitocqbvbthdkub.supabase.co:5432/postgres"
  echo ""
  echo "Or run migrations manually in Supabase SQL Editor:"
  echo "  https://supabase.com/dashboard/project/sbmvyhitocqbvbthdkub/sql/new"
  echo ""
  echo "Migration files are in: ./migrations/"
  exit 1
fi

MIGRATIONS_DIR="./migrations"
FILTER="${1:-}"

echo "🗄️  Running migrations..."
echo ""

for file in "$MIGRATIONS_DIR"/*.sql; do
  name=$(basename "$file")
  
  # Filter by number if argument given
  if [[ -n "$FILTER" && "$name" != "${FILTER}"* ]]; then
    continue
  fi

  echo "  ▶ $name"
  PGPASSWORD="${DATABASE_URL##*:}" psql "$DATABASE_URL" -f "$file" 2>&1 \
    | grep -v "^$" | sed 's/^/    /'
  echo ""
done

echo "✅  Migrations complete."
