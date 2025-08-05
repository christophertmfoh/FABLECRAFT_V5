#!/bin/bash

echo "🚀 Starting Nuxt development server on port 5252..."
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Source the safety environment
source ~/.bashrc.cursor_safe 2>/dev/null || true

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Set the port environment variable
export PORT=5252
export NUXT_PORT=5252

# Start the development server
echo "⚡ Running: npx nuxi dev --port 5252 --host 0.0.0.0"
echo ""
npx nuxi dev --port 5252 --host 0.0.0.0