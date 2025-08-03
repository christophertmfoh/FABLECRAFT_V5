#!/bin/bash

# List Dev Servers - Shows only dev server processes (safe to kill)
# Does NOT show system Node processes

echo "🔍 Scanning for dev server processes..."
echo ""

# Function to check if a process is a dev server
is_dev_server() {
    local cmd="$1"
    if [[ "$cmd" == *"nuxt"* ]] || \
       [[ "$cmd" == *"nuxi"* ]] || \
       [[ "$cmd" == *"vite"* ]] || \
       [[ "$cmd" == *"webpack"* ]] || \
       [[ "$cmd" == *"next dev"* ]] || \
       [[ "$cmd" == *"npm run dev"* ]] || \
       [[ "$cmd" == *"pnpm dev"* ]] || \
       [[ "$cmd" == *"yarn dev"* ]]; then
        return 0
    fi
    return 1
}

# Find Node processes
FOUND_DEV=0
echo "📋 DEV SERVER PROCESSES (Safe to kill):"
echo "----------------------------------------"

while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        PID=$(echo "$line" | awk '{print $2}')
        CMD=$(echo "$line" | awk '{for(i=11;i<=NF;i++) printf "%s ", $i; print ""}')
        
        if is_dev_server "$CMD"; then
            echo "✅ PID: $PID"
            echo "   Command: $(echo "$CMD" | cut -c1-70)..."
            echo "   Port: $(lsof -p $PID -i -n 2>/dev/null | grep LISTEN | awk '{print $9}' | head -1 || echo "unknown")"
            echo ""
            FOUND_DEV=1
        fi
    fi
done < <(ps aux | grep node | grep -v grep | grep -v "list-dev-servers")

if [ $FOUND_DEV -eq 0 ]; then
    echo "   No dev servers currently running"
fi

echo ""
echo "🛡️ SYSTEM NODE PROCESSES (DO NOT KILL):"
echo "----------------------------------------"

FOUND_SYS=0
while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        PID=$(echo "$line" | awk '{print $2}')
        CMD=$(echo "$line" | awk '{for(i=11;i<=NF;i++) printf "%s ", $i; print ""}')
        
        if ! is_dev_server "$CMD"; then
            echo "❌ PID: $PID (SYSTEM PROCESS - DO NOT KILL)"
            echo "   Command: $(echo "$CMD" | cut -c1-70)..."
            echo ""
            FOUND_SYS=1
        fi
    fi
done < <(ps aux | grep node | grep -v grep | grep -v "list-dev-servers")

if [ $FOUND_SYS -eq 0 ]; then
    echo "   No system Node processes visible"
fi

echo ""
echo "💡 TIPS:"
echo "   - Use 'npm run safe-stop' to stop dev servers"
echo "   - To kill a specific dev server: kill -TERM [PID]"
echo "   - NEVER use killall or pkill with node"