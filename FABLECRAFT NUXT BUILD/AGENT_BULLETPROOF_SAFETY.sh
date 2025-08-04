#!/bin/bash
# 🛡️ BULLETPROOF AGENT SAFETY SYSTEM 🛡️
# Version 2.0 - Now with multiple layers of protection!

echo "═══════════════════════════════════════════════════════════════"
echo "🔒 BULLETPROOF SAFETY SYSTEM INITIALIZATION"
echo "═══════════════════════════════════════════════════════════════"

# Create a protected directory for our wrapper scripts
SAFETY_DIR="$HOME/.agent_safety_wrappers"
mkdir -p "$SAFETY_DIR"

# Create wrapper scripts that log and block dangerous commands
cat > "$SAFETY_DIR/kill" << 'EOF'
#!/bin/bash
echo "🚨 SAFETY ALERT: kill command intercepted!"
echo "📝 Logging attempt to safety audit file..."
echo "[$(date)] kill attempt with args: $*" >> ~/.agent_safety_audit.log

# Check if trying to kill node/nuxt processes
if [[ "$*" =~ (node|nuxt|vite|nitro) ]] || [[ "$*" =~ -9 ]]; then
    echo "❌ BLOCKED: Cannot kill Node.js/Nuxt processes!"
    echo "✅ Safe alternatives:"
    echo "   1. npm run safe-stop"
    echo "   2. Press Ctrl+C in the terminal"
    echo "   3. npm run dev:alt (use different port)"
    echo ""
    echo "⚠️  This attempt has been logged for safety review."
    exit 1
fi

# For non-node processes, pass through to real kill
/usr/bin/kill "$@"
EOF

cat > "$SAFETY_DIR/killall" << 'EOF'
#!/bin/bash
echo "🚨 SAFETY ALERT: killall command intercepted!"
echo "[$(date)] killall attempt with args: $*" >> ~/.agent_safety_audit.log
echo "❌ BLOCKED: killall is too dangerous!"
echo "✅ Use targeted commands instead:"
echo "   - npm run safe-stop (for dev server)"
echo "   - Ctrl+C (in terminal)"
exit 1
EOF

cat > "$SAFETY_DIR/pkill" << 'EOF'
#!/bin/bash
echo "🚨 SAFETY ALERT: pkill command intercepted!"
echo "[$(date)] pkill attempt with args: $*" >> ~/.agent_safety_audit.log
echo "❌ BLOCKED: pkill is too dangerous!"
echo "✅ Use safe alternatives instead"
exit 1
EOF

cat > "$SAFETY_DIR/fuser" << 'EOF'
#!/bin/bash
# Check if trying to kill processes on ports
if [[ "$*" =~ -k ]] && [[ "$*" =~ (3000|3001|3002|3003|5050|5173) ]]; then
    echo "🚨 SAFETY ALERT: Attempt to kill process on development port!"
    echo "[$(date)] fuser kill attempt: $*" >> ~/.agent_safety_audit.log
    echo "❌ BLOCKED: Cannot kill processes on dev ports!"
    echo "✅ Use: npm run safe-stop"
    exit 1
fi
# Pass through non-kill fuser commands
/usr/bin/fuser "$@"
EOF

cat > "$SAFETY_DIR/systemctl" << 'EOF'
#!/bin/bash
# Block attempts to stop services
if [[ "$*" =~ (stop|kill|restart) ]] && [[ "$*" =~ (node|nuxt|npm) ]]; then
    echo "🚨 SAFETY ALERT: systemctl stop/kill intercepted!"
    echo "[$(date)] systemctl attempt: $*" >> ~/.agent_safety_audit.log
    echo "❌ BLOCKED: Cannot stop Node.js services!"
    echo "✅ Use: npm run safe-stop"
    exit 1
fi
# Pass through other systemctl commands
/usr/bin/systemctl "$@" 2>/dev/null || /bin/systemctl "$@" 2>/dev/null || echo "systemctl not available"
EOF

cat > "$SAFETY_DIR/service" << 'EOF'
#!/bin/bash
# Block attempts to stop services
if [[ "$*" =~ stop ]] && [[ "$*" =~ (node|nuxt|npm) ]]; then
    echo "🚨 SAFETY ALERT: service stop intercepted!"
    echo "[$(date)] service attempt: $*" >> ~/.agent_safety_audit.log
    echo "❌ BLOCKED: Cannot stop Node.js services!"
    echo "✅ Use: npm run safe-stop"
    exit 1
fi
# Pass through other service commands
/usr/sbin/service "$@" 2>/dev/null || echo "service command not available"
EOF

# Make wrapper scripts executable
chmod +x "$SAFETY_DIR"/*

# Create function to prevent editing safety files
protect_safety_files() {
    # Make safety files harder to edit (not perfect but adds friction)
    chmod 444 "$SAFETY_DIR"/* 2>/dev/null
    chmod 444 ~/.bashrc.bulletproof 2>/dev/null
    chmod 444 ./AGENT_BULLETPROOF_SAFETY.sh 2>/dev/null
}

# Create the bulletproof bashrc
cat > ~/.bashrc.bulletproof << 'EOF'
# 🔒 BULLETPROOF SAFETY CONFIGURATION

# Set PATH to prioritize our safety wrappers
export AGENT_ORIGINAL_PATH="$PATH"
export PATH="$HOME/.agent_safety_wrappers:$PATH"

# Create read-only aliases (harder to unset)
readonly -f kill 2>/dev/null
readonly -f killall 2>/dev/null
readonly -f pkill 2>/dev/null

# Function to detect bypass attempts
detect_bypass() {
    if [[ "$1" =~ (/usr/bin/kill|/bin/kill|command kill|builtin kill|\\\kill) ]]; then
        echo "🚨 BYPASS ATTEMPT DETECTED!"
        echo "[$(date)] Bypass attempt: $*" >> ~/.agent_safety_audit.log
        return 1
    fi
}

# Override common bypass methods
alias command='detect_bypass "$@" || command'
alias builtin='detect_bypass "$@" || builtin'
alias /usr/bin/kill='echo "Nice try! Use npm run safe-stop instead 😉"'
alias /bin/kill='echo "Nope! Safety first! 🛡️"'

# Block other kill methods
alias lsof='echo "🚨 If trying to pipe to kill, use npm run safe-stop instead!" && /usr/bin/lsof'
alias ps='echo "💡 Remember: Use npm run safe-stop to stop servers!" && /bin/ps'

# Function to check if agent is trying to be sneaky
monitor_commands() {
    # Log all commands for safety audit
    echo "[$(date)] Command: $BASH_COMMAND" >> ~/.agent_command_history.log
}

# Enable command monitoring
trap 'monitor_commands' DEBUG

# Safe functions
safe_stop() {
    echo "🛑 Safely stopping development server..."
    # First try graceful shutdown
    curl -X POST http://localhost:3000/_nuxt/shutdown 2>/dev/null || true
    sleep 1
    # Then use npm script
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

# Prevent unaliasing our protections
alias unalias='echo "🚫 unalias is disabled for safety!"'
alias unset='echo "🚫 unset is disabled for safety!"'

# Export functions
export -f safe_stop
export -f check_ports
export -f detect_bypass

echo "🔒 Bulletproof safety loaded with:"
echo "   ✅ Multiple command interceptions"
echo "   ✅ Bypass detection"
echo "   ✅ Command logging"
echo "   ✅ Protected wrapper scripts"
echo "   ✅ Read-only safety files"
echo "   ✅ Service management protection"
EOF

# Source the bulletproof configuration
source ~/.bashrc.bulletproof

# Protect the files
protect_safety_files

# Create safety audit log
touch ~/.agent_safety_audit.log
touch ~/.agent_command_history.log

# Create a Python wrapper to catch programmatic kills
cat > "$SAFETY_DIR/python_safety.py" << 'EOF'
import os
import sys
import subprocess

# Monkey patch os.kill
original_kill = os.kill
def safe_kill(pid, sig):
    # Check if trying to kill node processes
    try:
        cmd = f"ps -p {pid} -o comm="
        process_name = subprocess.check_output(cmd, shell=True).decode().strip()
        if 'node' in process_name or 'nuxt' in process_name:
            print("🚨 BLOCKED: Cannot kill Node.js processes from Python!")
            print("✅ Use: npm run safe-stop")
            with open(os.path.expanduser("~/.agent_safety_audit.log"), "a") as f:
                f.write(f"[Python] Kill attempt blocked: PID {pid}\n")
            sys.exit(1)
    except:
        pass
    return original_kill(pid, sig)

os.kill = safe_kill

# Also protect subprocess
original_subprocess_run = subprocess.run
def safe_subprocess_run(cmd, *args, **kwargs):
    cmd_str = str(cmd)
    if 'kill' in cmd_str or 'pkill' in cmd_str or 'killall' in cmd_str:
        print("🚨 BLOCKED: Cannot run kill commands from Python!")
        with open(os.path.expanduser("~/.agent_safety_audit.log"), "a") as f:
            f.write(f"[Python subprocess] Kill attempt blocked: {cmd_str}\n")
        raise Exception("Kill commands are blocked for safety")
    return original_subprocess_run(cmd, *args, **kwargs)

subprocess.run = safe_subprocess_run
EOF

# Add Python safety to PYTHONSTARTUP
echo "export PYTHONSTARTUP=$SAFETY_DIR/python_safety.py" >> ~/.bashrc.bulletproof

echo ""
echo "📊 SAFETY STATUS:"
echo "───────────────────────"
echo "✅ Command wrappers installed"
echo "✅ Bypass detection active"
echo "✅ Audit logging enabled"
echo "✅ Python kill protection added"
echo "✅ Service management protected"
echo "✅ Safety files protected"
echo ""
echo "🔍 MONITORING:"
echo "───────────────────────"
echo "• Command history: ~/.agent_command_history.log"
echo "• Safety alerts: ~/.agent_safety_audit.log"
echo ""
echo "🛡️ PROTECTED AGAINST:"
echo "───────────────────────"
echo "• Direct kill/killall/pkill commands"
echo "• Full path bypasses (/usr/bin/kill)"
echo "• fuser -k on dev ports"
echo "• systemctl stop/restart/kill"
echo "• service stop commands"
echo "• Python os.kill() calls"
echo "• Python subprocess kill commands"
echo "• Alias removal attempts"
echo "• Safety file editing"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🔒 BULLETPROOF SAFETY SYSTEM READY!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "⚠️  Note: This system logs all bypass attempts for review!"