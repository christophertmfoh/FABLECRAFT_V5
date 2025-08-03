#!/bin/bash

# Safe Stop Script - Use this instead of kill commands

echo "🚨 SAFETY REMINDER: Never use 'kill node' or 'pkill node' commands!"
echo ""
echo "✅ SAFE WAYS TO STOP YOUR DEV SERVER:"
echo ""
echo "1. Press Ctrl+C in the terminal where the server is running"
echo "2. Close the terminal tab/window"
echo "3. Use a different port if the current one is stuck:"
echo "   npx nuxi dev --port 3003"
echo ""
echo "📍 Currently running Node processes (view only):"
ps aux | grep node | grep -v grep

echo ""
echo "📍 What's using port 3002:"
lsof -i :3002 2>/dev/null || echo "Port 3002 is free"

echo ""
echo "🔴 Remember: kill/pkill commands will DESTROY your environment!"