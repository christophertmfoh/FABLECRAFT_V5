#!/bin/bash

# 🚀 AGENT INITIALIZATION SCRIPT - RUN THIS FIRST! 🚀
# This script sets up safety protections for your development session

echo "═══════════════════════════════════════════════════════════════"
echo "🤖 AGENT WORKSPACE INITIALIZATION"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Setting up safety protections to prevent accidental disconnection..."
echo ""

# Source the safety configuration
if [ -f ".bashrc.safety" ]; then
    source .bashrc.safety
    echo "✅ Command safety protection activated"
else
    echo "⚠️  Warning: .bashrc.safety not found"
fi

# Display current environment status
echo ""
echo "📊 ENVIRONMENT STATUS:"
echo "───────────────────────"
check_ports 2>/dev/null || echo "Ports: Unable to check"
echo ""
echo "🛡️ PROTECTED COMMANDS:"
echo "───────────────────────"
echo "❌ kill/killall/pkill → Use 'npm run safe-stop' instead"
echo "✅ safe_stop         → Safely stop dev server"
echo "✅ check_ports       → Check port usage"
echo ""
echo "📚 IMPORTANT DOCS:"
echo "───────────────────────"
echo "• AGENT_SAFETY_README.md - Critical safety guidelines"
echo "• npm run safe-stop      - Stop dev server safely"
echo "• npm run dev:alt        - Use alternative port"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🟢 READY TO WORK SAFELY!"
echo "═══════════════════════════════════════════════════════════════"