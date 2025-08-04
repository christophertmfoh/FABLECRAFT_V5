#!/bin/bash

# 🚀 AGENT INITIALIZATION SCRIPT - RUN THIS FIRST! 🚀
# This script sets up BULLETPROOF safety protections for your development session

echo "═══════════════════════════════════════════════════════════════"
echo "🤖 AGENT WORKSPACE INITIALIZATION (v2.0 BULLETPROOF)"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Setting up bulletproof safety protections..."
echo ""

# Use Cursor-friendly safety by default
if [ -f "./AGENT_SAFETY_CURSOR_FRIENDLY.sh" ]; then
    # Run the Cursor-friendly safety system
    source ./AGENT_SAFETY_CURSOR_FRIENDLY.sh
elif [ -f ".bashrc.safety" ]; then
    # Fallback to basic safety
    source .bashrc.safety
    echo "✅ Basic command safety protection activated"
else
    echo "⚠️  Warning: No safety systems found!"
fi

# Add Node.js safety wrapper to NODE_OPTIONS
export NODE_OPTIONS="--require $(pwd)/node_safety_wrapper.js"

# Display current environment status
echo ""
echo "📊 ENVIRONMENT STATUS:"
echo "───────────────────────"
check_ports 2>/dev/null || echo "Ports: Unable to check"

echo ""
echo "🛡️ PROTECTION LEVELS:"
echo "───────────────────────"
if [ -f "$HOME/.agent_safety_wrappers/kill" ]; then
    echo "✅ Level 1: Command interception (Active)"
    echo "✅ Level 2: Bypass detection (Active)"
    echo "✅ Level 3: Audit logging (Active)"
    echo "✅ Level 4: File protection (Active)"
    echo "✅ Level 5: Node.js protection (Active)"
else
    echo "⚠️  Basic protection only"
fi

echo ""
echo "📚 IMPORTANT DOCS:"
echo "───────────────────────"
echo "• AGENT_SAFETY_README.md - Critical safety guidelines"
echo "• npm run safe-stop      - Stop dev server safely"
echo "• npm run dev:alt        - Use alternative port"

echo ""
echo "🔍 BYPASS ATTEMPTS WILL BE LOGGED TO:"
echo "───────────────────────"
echo "• ~/.agent_safety_audit.log"
echo "• ~/.agent_command_history.log"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🟢 READY TO WORK SAFELY!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "⚡ Pro tip: Even the agent who wrote this can't bypass it now! 😄"