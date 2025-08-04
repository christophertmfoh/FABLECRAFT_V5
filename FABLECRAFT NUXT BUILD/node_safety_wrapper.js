#!/usr/bin/env node

// 🔒 Node.js Safety Wrapper - Prevents programmatic kills
const fs = require('fs');
const path = require('path');
const os = require('os');

// Store original process.kill
const originalKill = process.kill;

// Override process.kill
process.kill = function(pid, signal) {
    const logPath = path.join(os.homedir(), '.agent_safety_audit.log');
    const timestamp = new Date().toISOString();
    
    // Log the attempt
    fs.appendFileSync(logPath, `[${timestamp}] Node.js kill attempt: PID ${pid}, Signal ${signal}\n`);
    
    // Check if trying to kill Node processes
    try {
        const { execSync } = require('child_process');
        const processName = execSync(`ps -p ${pid} -o comm=`, { encoding: 'utf8' }).trim();
        
        if (processName.includes('node') || processName.includes('nuxt') || processName.includes('vite')) {
            console.error('🚨 BLOCKED: Cannot kill Node.js/Nuxt processes from Node.js!');
            console.error('✅ Use: npm run safe-stop');
            console.error('⚠️  This attempt has been logged.');
            process.exit(1);
        }
    } catch (e) {
        // Process might not exist, continue
    }
    
    // For non-node processes, pass through
    return originalKill.call(process, pid, signal);
};

// Also protect child_process.exec/spawn from kill commands
const { exec: originalExec, spawn: originalSpawn } = require('child_process');

require('child_process').exec = function(command, ...args) {
    if (command && (command.includes('kill') || command.includes('fuser -k'))) {
        const logPath = path.join(os.homedir(), '.agent_safety_audit.log');
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logPath, `[${timestamp}] Node.js exec kill attempt: ${command}\n`);
        
        console.error('🚨 BLOCKED: Cannot execute kill commands from Node.js!');
        console.error('✅ Use: npm run safe-stop');
        throw new Error('Kill commands are blocked for safety');
    }
    return originalExec.call(this, command, ...args);
};

// Export for use in other scripts
module.exports = {
    safeShutdown: async function() {
        console.log('🛑 Performing safe shutdown...');
        // Implement graceful shutdown logic here
        try {
            await fetch('http://localhost:3000/_nuxt/shutdown', { method: 'POST' });
        } catch (e) {
            // Server might already be down
        }
    }
};