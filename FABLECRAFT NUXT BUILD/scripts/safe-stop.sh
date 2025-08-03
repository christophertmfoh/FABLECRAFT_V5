#!/bin/bash

# Safe Stop Script - Gracefully stops Nuxt dev server
# This ONLY stops the dev server, never system Node processes

echo "🛑 Stopping Nuxt development server safely..."

# Find ONLY the Nuxt dev server process (not system Node)
NUXT_PID=$(lsof -ti:3000 2>/dev/null | head -1)
if [ -z "$NUXT_PID" ]; then
    NUXT_PID=$(lsof -ti:3002 2>/dev/null | head -1)
fi

if [ -z "$NUXT_PID" ]; then
    echo "✅ No Nuxt dev server running on ports 3000 or 3002"
    exit 0
fi

# Verify this is actually a Nuxt process
PROCESS_CMD=$(ps -p $NUXT_PID -o comm= 2>/dev/null)
if [[ "$PROCESS_CMD" != *"node"* ]]; then
    echo "❌ Process $NUXT_PID is not a Node process"
    exit 1
fi

# Check if it's a dev server (not system Node)
FULL_CMD=$(ps -p $NUXT_PID -o args= 2>/dev/null)
if [[ "$FULL_CMD" != *"nuxt"* ]] && [[ "$FULL_CMD" != *"nuxi"* ]] && [[ "$FULL_CMD" != *"vite"* ]]; then
    echo "⚠️  Process appears to be a system Node process, not dev server"
    echo "📍 Command: $FULL_CMD"
    echo "❓ Are you sure this is the dev server? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Aborted for safety"
        exit 1
    fi
fi

echo "📍 Found Nuxt dev server on PID: $NUXT_PID"
echo "📋 Command: $(ps -p $NUXT_PID -o args= | cut -c1-60)..."

# Send SIGTERM for graceful shutdown
echo "📤 Sending graceful shutdown signal..."
kill -TERM $NUXT_PID 2>/dev/null

# Wait up to 5 seconds for graceful shutdown
COUNTER=0
while [ $COUNTER -lt 5 ] && kill -0 $NUXT_PID 2>/dev/null; do
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
    echo "⚠️  Process still running, using force stop..."
    kill -KILL $NUXT_PID 2>/dev/null
    sleep 1
fi

# Verify it's stopped
if kill -0 $NUXT_PID 2>/dev/null; then
    echo "❌ Failed to stop dev server"
    exit 1
else
    echo "✅ Dev server stopped successfully"
    exit 0
fi