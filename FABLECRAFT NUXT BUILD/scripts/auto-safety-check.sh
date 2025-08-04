#!/bin/bash

# Auto Safety Check - Ensures safety is active
# Can be sourced by other scripts: source scripts/auto-safety-check.sh

# Check if safety is already active
if ! type -t safe_stop &>/dev/null; then
    echo "⚠️  Safety protections not active. Initializing..."
    
    # Find and source safety configuration
    if [ -f ".bashrc.safety" ]; then
        source .bashrc.safety
    elif [ -f "../.bashrc.safety" ]; then
        source ../.bashrc.safety
    elif [ -f "../../.bashrc.safety" ]; then
        source ../../.bashrc.safety
    else
        echo "❌ Safety configuration not found!"
        echo "🔧 Please run: ./AGENT_INIT.sh"
        exit 1
    fi
fi

# Verify safety is active
if type -t safe_stop &>/dev/null; then
    echo "✅ Safety protections active"
else
    echo "❌ Failed to activate safety protections"
    exit 1
fi