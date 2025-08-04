#!/bin/bash

# Safe Command Wrapper - Allows dev server management but protects system processes
# This prevents agents from killing Cursor's Node connection

# Load forbidden commands list
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../.agentrc" 2>/dev/null || true

# Function to check if a PID is a dev server
is_dev_server_pid() {
    local pid="$1"
    local cmd=$(ps -p "$pid" -o args= 2>/dev/null)
    
    # Check if it's a dev server process
    if [[ "$cmd" == *"nuxt"* ]] || \
       [[ "$cmd" == *"nuxi"* ]] || \
       [[ "$cmd" == *"vite"* ]] || \
       [[ "$cmd" == *"webpack"* ]] || \
       [[ "$cmd" == *"dev"* ]]; then
        return 0
    fi
    return 1
}

# Function to check if command is trying to kill system Node
is_dangerous_kill() {
    local cmd="$1"
    
    # Allow specific dev server kills
    if [[ "$cmd" =~ kill[[:space:]]+-[[:alnum:]]+[[:space:]]+([0-9]+) ]]; then
        local pid="${BASH_REMATCH[1]}"
        if is_dev_server_pid "$pid"; then
            echo "✅ Allowing kill of dev server process (PID: $pid)"
            return 1  # Not dangerous
        fi
    fi
    
    # Check for mass kill commands (always dangerous)
    if [[ "$cmd" =~ (killall|pkill)[[:space:]]+(.*)?node ]] || \
       [[ "$cmd" =~ kill[[:space:]]+-9[[:space:]]+.*node ]] || \
       [[ "$cmd" =~ kill.*\$\(.*pgrep.*node.*\) ]] || \
       [[ "$cmd" == *"xargs kill"* ]]; then
        return 0  # Dangerous!
    fi
    
    # Check for force kills
    if [[ "$cmd" =~ kill[[:space:]]+-f ]] || \
       [[ "$cmd" =~ kill[[:space:]]+-KILL ]] || \
       [[ "$cmd" =~ kill[[:space:]]+-9[[:space:]] ]]; then
        # Check if targeting Node
        if [[ "$cmd" == *"node"* ]]; then
            return 0  # Dangerous!
        fi
    fi
    
    return 1  # Not dangerous
}

# Check the command
COMMAND="$@"

if is_dangerous_kill "$COMMAND"; then
    echo "🚨 SAFETY BLOCK ACTIVATED! 🚨"
    echo ""
    echo "❌ DANGEROUS COMMAND DETECTED: $COMMAND"
    echo ""
    echo "This could kill Cursor's Node connection!"
    echo ""
    echo "✅ SAFE ALTERNATIVES:"
    echo "   1. npm run safe-stop     - Stop dev server only"
    echo "   2. Ctrl+C               - Stop process in terminal"
    echo "   3. npm run dev:alt      - Use different port"
    echo ""
    echo "📍 Dev server processes:"
    ps aux | grep -E "(nuxt|nuxi|vite|webpack)" | grep -v grep || echo "No dev servers running"
    echo ""
    echo "⚠️  To kill a specific dev server PID, use: kill -TERM [PID]"
    exit 1
fi

# Execute the command if it's safe
exec $COMMAND