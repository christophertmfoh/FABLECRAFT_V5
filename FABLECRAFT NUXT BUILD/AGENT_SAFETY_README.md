# 🚨 CRITICAL: AGENT SAFETY GUIDELINES 🚨

## ⚠️ NEVER KILL NODE PROCESSES ⚠️

**IMPORTANT**: Killing Node processes will disconnect you from the server and halt all progress!

## ❌ FORBIDDEN COMMANDS (DO NOT USE)

The following commands are **STRICTLY FORBIDDEN** and will break your connection:

```bash
# NEVER USE THESE:
kill node
killall node
pkill node
kill -9 [any process]
killall -9 node
pkill -9 node
kill $(pgrep node)
ps aux | grep node | awk '{print $2}' | xargs kill
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
   npm run dev:alt  # Uses port 3002 instead of 3000
   ```

### To Check What's Running:

```bash
# View only (safe):
ps aux | grep node
lsof -i :3000
lsof -i :3002
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
npm run dev        # Default port 3000
npm run dev:alt    # Alternative port 3002
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
lsof -i :3000
lsof -i :3002

# Use a different port:
npx nuxi dev --port 3005
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