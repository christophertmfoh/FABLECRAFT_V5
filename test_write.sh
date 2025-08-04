#!/bin/bash
echo "Testing write tool with timeout..."
timeout 10 bash -c 'echo "Testing write operation" > /workspace/fablecraft-nuxt/test-write.vue'
if [ $? -eq 0 ]; then
    echo "Write succeeded"
    cat /workspace/fablecraft-nuxt/test-write.vue
else
    echo "Write failed or timed out after 10 seconds"
fi
