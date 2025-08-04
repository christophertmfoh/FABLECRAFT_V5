#!/bin/bash

echo "🚀 Starting Nuxt development server on port 5050..."
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Source the safety environment
source ~/.bashrc.cursor_safe 2>/dev/null || true

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Set the port environment variable
export PORT=5050
export NUXT_PORT=5050

# Start the development server
echo "⚡ Running: npx nuxi dev --port 5050"
echo ""
npx nuxi dev --port 5050