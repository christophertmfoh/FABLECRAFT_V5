#!/bin/bash

# AGENT_INIT.sh - Basic initialization script
# This script is called by the predev npm script

echo "🚀 Agent initialization complete"
echo "⚠️  REMINDER: Use Ctrl+C to stop the server, NEVER use killall/pkill node! ⚠️"

# Set executable permissions for safety scripts if they exist
if [ -f "./scripts/safe-stop.sh" ]; then
    chmod +x ./scripts/safe-stop.sh
fi

if [ -f "./scripts/list-dev-servers.sh" ]; then
    chmod +x ./scripts/list-dev-servers.sh
fi

exit 0