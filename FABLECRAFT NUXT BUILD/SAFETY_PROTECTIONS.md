# 🛡️ Safety Protections Against Dangerous Commands

This project has multiple layers of protection to prevent the use of commands that destroy the development environment.

## Protection Layers Implemented:

### 1. **README.md** (Updated)
- Prominent warning section at the very top
- Lists all forbidden commands explicitly
- Provides safe alternatives
- Explains WHY these commands are dangerous

### 2. **CRITICAL_WARNING.md** (New)
- Highly visible warning file in project root
- Impossible to miss
- Detailed explanation of consequences
- Safe alternatives with examples

### 3. **.cursorrules** (New)
- Specific instructions for AI agents
- Cursor IDE will read this automatically
- Lists forbidden commands and safe alternatives

### 4. **package.json** 
- Safety warning in metadata
- Dev scripts now show reminders
- Added `safe-stop` script for checking processes

### 5. **scripts/safe-stop.sh** (New)
- Helper script to safely check running processes
- Shows what's using ports
- Provides safe alternatives
- Run with: `pnpm run safe-stop`

### 6. **Git Pre-commit Hook** (Updated)
- Scans code for dangerous commands
- Blocks commits containing kill commands
- Forces developers to use safe alternatives

## Quick Reference:

### ❌ NEVER USE:
- `kill node`
- `pkill node`
- `killall node`
- Any forceful process termination

### ✅ ALWAYS USE:
- `Ctrl+C` to stop servers
- `pnpm run safe-stop` to check processes
- Different ports if one is stuck: `npx nuxi dev --port 3003`

## Why This Matters:

Running forbidden commands doesn't just stop your server - it **permanently destroys the entire Cursor environment connection**. The environment becomes unusable and you lose all work.

---

**Remember:** Every single agent before you has made this mistake. These protections exist to help you avoid the same fate.