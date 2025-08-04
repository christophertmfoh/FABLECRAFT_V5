#!/bin/bash

echo "🧪 SAFETY SYSTEM TEST"
echo "===================="
echo ""

# Test 1: Check if safety wrappers are in PATH
echo "Test 1: Checking PATH priority..."
which kill
echo ""

# Test 2: List safety wrappers
echo "Test 2: Safety wrappers installed:"
ls -la ~/.agent_safety_wrappers/ 2>/dev/null || echo "No wrappers found"
echo ""

# Test 3: Try to get help from kill (safe)
echo "Test 3: Testing kill wrapper (help only)..."
kill --help 2>&1 | head -n 3
echo ""

# Test 4: Check if Python safety is active
echo "Test 4: Testing Python protection..."
python3 -c "import os; print('Python os.kill available:', hasattr(os, 'kill'))" 2>/dev/null || echo "Python test skipped"
echo ""

# Test 5: Check audit log
echo "Test 5: Audit log status:"
if [ -f ~/.agent_safety_audit.log ]; then
    echo "✅ Audit log exists"
    echo "   Size: $(wc -l < ~/.agent_safety_audit.log) lines"
else
    echo "❌ Audit log not found"
fi
echo ""

# Test 6: Try a harmless kill -0 (just checks if process exists)
echo "Test 6: Testing kill -0 on init process (PID 1)..."
kill -0 1 2>&1
echo ""

echo "===================="
echo "✅ Safety test complete! Check output above."