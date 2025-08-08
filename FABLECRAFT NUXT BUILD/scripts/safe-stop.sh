#!/bin/bash

# Safe Stop Script - Gracefully stops Nuxt dev server
# This ONLY stops the dev server, never system Node processes

set -euo pipefail

echo "🛑 Stopping Nuxt development server safely..."

PROJECT_DIR="/workspace/FABLECRAFT NUXT BUILD"
PORTS=(8000 3000 3001 3002 3050)

# Collect PIDs listening on target ports
PIDS=()
for PORT in "${PORTS[@]}"; do
  PID=$(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -1 || true)
  if [ -n "${PID:-}" ]; then
    PIDS+=("$PID")
  fi
done

# Also collect any nuxt dev processes within this project directory
MAPFILE -t NUXT_PIDS < <(ps aux | grep -E "nuxt\.mjs dev|nuxi dev" | grep -F "$PROJECT_DIR" | awk '{print $2}' | sort -u)
for PID in "${NUXT_PIDS[@]:-}"; do
  if [ -n "$PID" ]; then
    PIDS+=("$PID")
  fi
done

# De-duplicate PIDs
if [ ${#PIDS[@]} -eq 0 ]; then
  echo "✅ No Nuxt dev server running on ports ${PORTS[*]} or within project"
  exit 0
fi

# Unique PIDs
UNIQUE_PIDS=($(printf "%s\n" "${PIDS[@]}" | sort -u))

for NUXT_PID in "${UNIQUE_PIDS[@]}"; do
  # Verify this is a Node process
  PROCESS_CMD=$(ps -p "$NUXT_PID" -o comm= 2>/dev/null || true)
  if [[ "$PROCESS_CMD" != *"node"* ]]; then
    continue
  fi

  FULL_CMD=$(ps -p "$NUXT_PID" -o args= 2>/dev/null || true)
  if [[ "$FULL_CMD" != *"nuxt"* && "$FULL_CMD" != *"nuxi"* && "$FULL_CMD" != *"vite"* ]]; then
    continue
  fi

  echo "📍 Found Nuxt dev process PID: $NUXT_PID"
  echo "📋 Command: $(echo "$FULL_CMD" | cut -c1-120)..."

  # Send SIGTERM for graceful shutdown
  echo "📤 Sending graceful shutdown signal..."
  kill -TERM "$NUXT_PID" 2>/dev/null || true

  # Wait up to 5 seconds for graceful shutdown
  COUNTER=0
  while [ $COUNTER -lt 5 ] && kill -0 "$NUXT_PID" 2>/dev/null; do
    echo -n "."
    sleep 1
    COUNTER=$((COUNTER + 1))
  done
  echo ""

  # Escalate if still alive
  if kill -0 "$NUXT_PID" 2>/dev/null; then
    echo "⚠️  Process still running, sending SIGINT..."
    kill -INT "$NUXT_PID" 2>/dev/null || true
    sleep 2
  fi

  if kill -0 "$NUXT_PID" 2>/dev/null; then
    echo "⚠️  Process still running, using force stop..."
    kill -KILL "$NUXT_PID" 2>/dev/null || true
    sleep 1
  fi

  if kill -0 "$NUXT_PID" 2>/dev/null; then
    echo "❌ Failed to stop dev server PID $NUXT_PID"
  else
    echo "✅ Stopped PID $NUXT_PID"
  fi

done

exit 0