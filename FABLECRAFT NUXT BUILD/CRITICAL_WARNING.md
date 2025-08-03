# 🚨🚨🚨 STOP! READ THIS BEFORE DOING ANYTHING 🚨🚨🚨

## ⛔ THESE COMMANDS WILL PERMANENTLY BREAK YOUR ENVIRONMENT ⛔

### NEVER RUN ANY OF THESE COMMANDS:
- ❌ `kill node`
- ❌ `pkill node`
- ❌ `killall node`
- ❌ `kill -9` (with any node process ID)
- ❌ `pkill -9 node`
- ❌ `systemctl stop node`
- ❌ `service node stop`
- ❌ Any command that forcefully kills node processes

## ✅ SAFE ALTERNATIVES:

### To Stop the Dev Server:
1. **Press `Ctrl+C`** in the terminal where it's running
2. Close the terminal tab/window
3. Let it timeout naturally

### To Check Running Processes:
```bash
# Safe commands to check what's running:
ps aux | grep node     # Just to VIEW processes
lsof -i :3002         # Check what's using port 3002
```

### To Free Up a Port:
```bash
# If port 3002 is stuck, use a different port:
npx nuxi dev --port 3003
# or
npx nuxi dev --port 3004
```

## 🔴 WHY THIS MATTERS:

Running `kill node` or similar commands doesn't just stop your development server - it **DESTROYS THE ENTIRE CURSOR ENVIRONMENT CONNECTION**. The environment becomes permanently unusable and you lose all your work.

## 💡 REMEMBER:
- Always use `Ctrl+C` to stop processes gracefully
- If something seems stuck, ask for help instead of killing processes
- When in doubt, use a different port instead of trying to force-stop

---

**This warning exists because EVERY agent has made this mistake. Don't be the next one.**