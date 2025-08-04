# 🚨 CRITICAL: AGENT SAFETY GUIDELINES 🚨

## ⚠️ PROTECT CURSOR'S NODE CONNECTION ⚠️

**IMPORTANT**: Mass killing Node processes will disconnect you from Cursor's server!

## ❌ FORBIDDEN COMMANDS (BREAK CURSOR CONNECTION)

The following commands are **STRICTLY FORBIDDEN** as they kill ALL Node processes:

```bash
# NEVER USE THESE - They kill Cursor's Node:
killall node          # Kills ALL Node processes
pkill node            # Kills ALL Node processes  
kill -9 node          # Force kills ALL Node
killall -9 node       # Force kills ALL Node
pkill -9 node         # Force kills ALL Node
kill $(pgrep node)    # Kills ALL Node PIDs
ps aux | grep node | xargs kill  # Kills ALL Node
kill -f node          # Force kills Node
```

## ✅ ALLOWED: DEV SERVER MANAGEMENT

You CAN safely manage the dev server with these commands:

```bash
# SAFE - Only affects dev server:
npm run safe-stop                    # Recommended: Smart stop script
kill -TERM [specific_dev_pid]        # Kill specific dev server PID
kill -INT [specific_dev_pid]         # Interrupt specific dev server
lsof -ti:5050 | xargs kill -TERM    # Kill only process on port 5050
lsof -ti:5051 | xargs kill -TERM    # Kill only process on port 5051
```

## ✅ SAFE ALTERNATIVES

### To Stop the Development Server:

1. **Use the safe-stop script**:
   ```bash
   npm run safe-stop
   ```

2. **Use Ctrl+C** in the terminal where the server is running

3. **Use a different port** if the current one is stuck:
   ```bash
   npm run dev:alt  # Uses port 5051 instead of 5050
   ```

### To Check What's Running:

```bash
# View only (safe):
ps aux | grep node
lsof -i :5050
lsof -i :5051
```

### If Port is Already in Use:

```bash
# Instead of killing, use a different port:
npx nuxi dev --port 3003
# or
npm run dev:alt
```

## 🛡️ SAFETY MECHANISMS IN PLACE

1. **Command Wrapper**: `scripts/safe-command-wrapper.sh` intercepts dangerous commands
2. **Safe Stop Script**: `scripts/safe-stop.sh` gracefully stops servers
3. **Package.json Warnings**: All scripts include safety reminders
4. **Agent Config**: `.agentrc` defines forbidden commands

## 📋 DEVELOPMENT WORKFLOW

### Starting the Server:
```bash
npm run dev        # Default port 5050
npm run dev:alt    # Alternative port 5051
```

### Stopping the Server:
```bash
# Option 1: In the terminal running the server
Ctrl+C

# Option 2: From another terminal
npm run safe-stop

# Option 3: Close the terminal window
```

### If Something Goes Wrong:
```bash
# Check what's using ports:
lsof -i :5050
lsof -i :5051

# Use a different port:
npx nuxi dev --port 5052
```

## 🔴 CONSEQUENCES OF KILLING NODE

If you kill Node processes:
- ❌ You'll lose connection to the server
- ❌ Development will stop
- ❌ You may corrupt the environment
- ❌ Progress will be halted
- ❌ The user will have to manually restart everything

## 💡 REMEMBER

- **ALWAYS** use safe methods to stop servers
- **NEVER** use kill, killall, or pkill on Node processes
- **PREFER** using different ports over killing processes
- **CHECK** this guide before attempting to stop any process

---

**Last Updated**: January 2025
**Priority**: CRITICAL - Read before any development work