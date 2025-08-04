#!/bin/bash

echo "═══════════════════════════════════════════════════════════════"
echo "🛡️ CURSOR-FRIENDLY SAFETY SYSTEM"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Create safety directory if needed
SAFETY_DIR="$HOME/.agent_safety_wrappers"
mkdir -p "$SAFETY_DIR"

# Create simple wrapper for kill (no logging to avoid DEBUG trap issues)
cat > "$SAFETY_DIR/kill" << 'EOF'
#!/bin/bash
if [[ "$*" =~ (node|nuxt|vite|nitro) ]] || [[ "$*" =~ -9 ]]; then
    echo "❌ BLOCKED: Cannot kill Node.js/Nuxt processes!"
    echo "✅ Use: npm run safe-stop"
    exit 1
fi
/usr/bin/kill "$@"
EOF

# Simple wrappers for other commands
cat > "$SAFETY_DIR/killall" << 'EOF'
#!/bin/bash
echo "❌ BLOCKED: killall is dangerous! Use npm run safe-stop"
exit 1
EOF

cat > "$SAFETY_DIR/pkill" << 'EOF'
#!/bin/bash
echo "❌ BLOCKED: pkill is dangerous! Use npm run safe-stop"
exit 1
EOF

chmod +x "$SAFETY_DIR"/*

# MINIMAL bashrc that won't break Cursor
cat > ~/.bashrc.cursor_safe << 'EOF'
# Cursor-friendly safety configuration

# Only modify PATH (no DEBUG trap, no complex aliases)
export AGENT_ORIGINAL_PATH="$PATH"
export PATH="$HOME/.agent_safety_wrappers:$PATH"

# Simple safe functions (no monitoring)
safe_stop() {
    echo "🛑 Safely stopping development server..."
    npm run safe-stop 2>/dev/null || echo "Server may already be stopped"
}

check_ports() {
    echo "📊 Port Status:"
    for port in 3000 3001 3002 3003 5050 5173; do
        if lsof -i:$port -t >/dev/null 2>&1; then
            echo "  Port $port: ⚡ In use"
        else
            echo "  Port $port: ✅ Free"
        fi
    done
}

# Export functions
export -f safe_stop
export -f check_ports

echo "✅ Cursor-friendly safety loaded!"
echo "   • kill/killall/pkill protection active"
echo "   • No terminal interference"
echo "   • Use 'npm run safe-stop' to stop servers"
EOF

# Source the cursor-safe configuration
source ~/.bashrc.cursor_safe

echo ""
echo "✅ CURSOR-FRIENDLY SAFETY ACTIVE!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Protected against:"
echo "• kill/killall/pkill commands"
echo "• Killing Node.js processes"
echo ""
echo "WITHOUT:"
echo "• DEBUG traps that log every command"
echo "• Complex aliases that break Cursor"
echo "• Excessive monitoring"
echo ""
echo "This version won't interfere with Cursor's terminal! 🎉"