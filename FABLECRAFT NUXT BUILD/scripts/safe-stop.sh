#!/bin/bash

# Safe Stop Script - Gracefully stops Nuxt dev server
# NEVER kills Node processes directly

echo "🛑 Stopping Nuxt development server safely..."

# Find the Nuxt dev server process
NUXT_PID=$(lsof -ti:3000 2>/dev/null || lsof -ti:3002 2>/dev/null)

if [ -z "$NUXT_PID" ]; then
    echo "✅ No Nuxt server running"
    exit 0
fi

echo "📍 Found Nuxt server on PID: $NUXT_PID"

# Send SIGTERM for graceful shutdown
echo "📤 Sending graceful shutdown signal..."
kill -TERM $NUXT_PID 2>/dev/null

# Wait up to 10 seconds for graceful shutdown
COUNTER=0
while [ $COUNTER -lt 10 ] && kill -0 $NUXT_PID 2>/dev/null; do
    echo -n "."
    sleep 1
    COUNTER=$((COUNTER + 1))
done

echo ""

# Check if process is still running
if kill -0 $NUXT_PID 2>/dev/null; then
    echo "⚠️  Process still running, sending SIGINT..."
    kill -INT $NUXT_PID 2>/dev/null
    sleep 2
fi

# Final check
if kill -0 $NUXT_PID 2>/dev/null; then
    echo "❌ Failed to stop server gracefully"
    echo "💡 TIP: Use Ctrl+C in the terminal where the server is running"
    exit 1
else
    echo "✅ Server stopped successfully"
    exit 0
fi