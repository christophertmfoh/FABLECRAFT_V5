#!/bin/bash

# Safe Command Wrapper - Intercepts dangerous commands
# This prevents agents from killing Node processes

# Load forbidden commands list
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../.agentrc" 2>/dev/null || true

# Function to check if command is forbidden
is_forbidden_command() {
    local cmd="$1"
    
    # Check against forbidden patterns
    for forbidden in "${FORBIDDEN_COMMANDS[@]}"; do
        if [[ "$cmd" == *"$forbidden"* ]]; then
            return 0
        fi
    done
    
    # Additional pattern checks
    if [[ "$cmd" =~ kill.*node ]] || \
       [[ "$cmd" =~ killall.*node ]] || \
       [[ "$cmd" =~ pkill.*node ]] || \
       [[ "$cmd" =~ kill.*-9 ]] || \
       [[ "$cmd" =~ kill.*pgrep.*node ]]; then
        return 0
    fi
    
    return 1
}

# Check the command
COMMAND="$@"

if is_forbidden_command "$COMMAND"; then
    echo "🚨 SAFETY BLOCK ACTIVATED! 🚨"
    echo ""
    echo "❌ FORBIDDEN COMMAND DETECTED: $COMMAND"
    echo ""
    echo "This command would kill Node processes and disconnect you from the server!"
    echo ""
    echo "✅ SAFE ALTERNATIVES:"
    echo "   1. npm run safe-stop     - Gracefully stop the server"
    echo "   2. Ctrl+C               - Stop process in current terminal"
    echo "   3. npm run dev:alt      - Start on different port"
    echo ""
    echo "📍 Current server status:"
    lsof -i :3000 2>/dev/null | grep LISTEN || echo "Port 3000: Not in use"
    lsof -i :3002 2>/dev/null | grep LISTEN || echo "Port 3002: Not in use"
    echo ""
    echo "💡 TIP: If a port is stuck, use a different port instead of killing processes"
    exit 1
fi

# Execute the command if it's safe
exec $COMMAND