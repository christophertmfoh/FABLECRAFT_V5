# Fablecraft Foundation

A modernized Nuxt 3 + Supabase foundation built to industry standards.

## 🚀 AGENTS: Initialize First!

```bash
# Run this IMMEDIATELY when starting work:
./AGENT_INIT.sh
# or
npm run init
```

This activates safety protections that prevent accidental disconnection.

## 🚨🚨🚨 CRITICAL - READ THIS FIRST 🚨🚨🚨

### ⛔ FORBIDDEN COMMANDS - NEVER RUN THESE ⛔

```bash
# ❌ NEVER RUN THESE - THEY WILL DESTROY THE ENVIRONMENT ❌
# kill node
# pkill node
# killall node
# kill -9 [any node process]
# pkill -9 node
# systemctl stop node
# service node stop
```

**WHY:** These commands don't just stop your dev server - they DESTROY the entire Cursor/development environment connection. The environment becomes permanently unusable.

**INSTEAD:** Always use `Ctrl+C` in the terminal where the process is running to gracefully stop it.

### ✅ SAFE WAYS TO STOP THE DEV SERVER

```bash
# Method 1: Use our safe-stop script
npm run safe-stop

# Method 2: Press Ctrl+C in the terminal running the server

# Method 3: Use alternative port if current is stuck
npm run dev:alt

# Method 4: Close the terminal tab/window
# Method 5: Use pnpm db:stop for Supabase only
```

### 🛡️ NEW SAFETY MECHANISMS IN PLACE

1. **Safe Stop Script**: `npm run safe-stop` - Gracefully stops the server
2. **Command Interceptor**: Dangerous commands are now blocked
3. **Pre-commit Hooks**: Prevents committing dangerous commands
4. **Agent Safety Guide**: See [AGENT_SAFETY_README.md](./AGENT_SAFETY_README.md)

### 📍 Check Port Status

```bash
# Safe commands to check what's running:
lsof -i :5050
lsof -i :5051
ps aux | grep node  # View only, don't pipe to kill!
```

---

## Quick Start

```bash
# Start the development server (RECOMMENDED)
npx nuxi dev --port 5050

# Alternative method
pnpm dev:alt

# Navigate to http://localhost:5050
```

## Development Scripts

```bash
# Development
pnpm dev:alt          # Start dev server (alternative method)
npx nuxi dev          # Start dev server (direct method)

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm typecheck        # Run TypeScript checks

# Database (Supabase)
pnpm db:start         # Start local Supabase
pnpm db:stop          # Stop local Supabase
pnpm db:push          # Push schema changes
pnpm db:status        # Check database status

# Build
pnpm build            # Build for production
pnpm preview          # Preview production build
```

## Setup Complete

✅ Nuxt 3 with modern configuration  
✅ Tailwind CSS with optimized setup  
✅ Supabase for backend services  
✅ TypeScript with strict mode  
✅ ESLint for code quality  
✅ Husky + Commitlint for git hooks  
✅ VSCode settings for consistent development  

## Foundation Status

This project has completed all 5 phases of the foundation setup:
- Phase 1: Project & Dependencies
- Phase 2: Core Configuration  
- Phase 3: Essential Files
- Phase 4: Backend Foundation
- Phase 5: Workflow & Finalization

Ready for feature development! 🚀
