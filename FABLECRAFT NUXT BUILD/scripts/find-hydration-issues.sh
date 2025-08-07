#!/bin/bash

# Hydration Issues Detection Script
# This script ONLY finds and reports potential hydration issues - makes NO changes

set -e

echo "🔍 Scanning for Hydration Issues"
echo "================================"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Counters
CRITICAL_ISSUES=0
WARNING_ISSUES=0
INFO_ISSUES=0

log_critical() {
    echo -e "${RED}🚨 CRITICAL:${NC} $1"
    ((CRITICAL_ISSUES++))
}

log_warning() {
    echo -e "${YELLOW}⚠️  WARNING:${NC} $1"
    ((WARNING_ISSUES++))
}

log_info() {
    echo -e "${BLUE}ℹ️  INFO:${NC} $1"
    ((INFO_ISSUES++))
}

log_section() {
    echo -e "\n${PURPLE}🔧 $1${NC}"
    echo "$(printf '%.0s-' {1..50})"
}

# 1. Check for direct DOM access
log_section "Checking for Direct DOM Access (Major Hydration Risk)"

echo "Scanning for window/document access in components..."
DIRECT_DOM=$(grep -r "window\." --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$DIRECT_DOM" -gt 0 ]; then
    log_critical "Found $DIRECT_DOM instances of direct window access"
    echo "Sample files with window access:"
    grep -r "window\." --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | head -5 | cut -d: -f1 | sort -u
    echo ""
fi

DIRECT_DOCUMENT=$(grep -r "document\." --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$DIRECT_DOCUMENT" -gt 0 ]; then
    log_critical "Found $DIRECT_DOCUMENT instances of direct document access"
    echo "Sample files with document access:"
    grep -r "document\." --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | head -5 | cut -d: -f1 | sort -u
    echo ""
fi

# 2. Check for client-side guards
log_section "Checking Client-Side Guards"

CLIENT_GUARDS=$(grep -r "import\.meta\.client\|process\.client" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$CLIENT_GUARDS" -eq 0 ]; then
    log_warning "No client-side guards found - all DOM access will cause hydration issues"
else
    log_info "Found $CLIENT_GUARDS client-side guards"
fi

# 3. Check for dynamic IDs/keys
log_section "Checking for Dynamic ID Generation"

DYNAMIC_IDS=$(grep -r "Math\.random\|Date\.now\|uuid\|uniqueId" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$DYNAMIC_IDS" -gt 0 ]; then
    log_critical "Found $DYNAMIC_IDS dynamic ID generators - major hydration risk"
    echo "Files with dynamic ID patterns:"
    grep -r "Math\.random\|Date\.now\|uuid\|uniqueId" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | head -3 | cut -d: -f1 | sort -u
    echo ""
fi

# 4. Check for useState vs ref issues
log_section "Checking State Management"

USESTATE_COUNT=$(grep -r "useState" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
REF_COUNT=$(grep -r " ref(" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)

log_info "Found $USESTATE_COUNT useState calls and $REF_COUNT ref calls"
if [ "$REF_COUNT" -gt "$USESTATE_COUNT" ]; then
    log_warning "More ref() than useState() - potential SSR state sync issues"
fi

# 5. Check for event listeners without guards
log_section "Checking Event Listeners"

UNSAFE_LISTENERS=$(grep -r "addEventListener" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | grep -v "import\.meta\.client" | wc -l)
if [ "$UNSAFE_LISTENERS" -gt 0 ]; then
    log_critical "Found $UNSAFE_LISTENERS unguarded event listeners"
    echo "Files with unguarded event listeners:"
    grep -r "addEventListener" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | grep -v "import\.meta\.client" | head -3 | cut -d: -f1 | sort -u
    echo ""
fi

# 6. Check for media queries
log_section "Checking Media Queries"

MEDIA_QUERIES=$(grep -r "matchMedia" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$MEDIA_QUERIES" -gt 0 ]; then
    log_warning "Found $MEDIA_QUERIES media query usages - check for SSR safety"
    echo "Media query usage:"
    grep -r "matchMedia" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | head -3
    echo ""
fi

# 7. Check for theme/styling hydration issues
log_section "Checking Theme/Styling Issues"

THEME_SCRIPTS=$(grep -r "document\.documentElement\|document\.body" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$THEME_SCRIPTS" -gt 0 ]; then
    log_critical "Found $THEME_SCRIPTS direct DOM style manipulations"
    echo "DOM manipulation found:"
    grep -r "document\.documentElement\|document\.body" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | head -3
    echo ""
fi

# 8. Check for localStorage/sessionStorage
log_section "Checking Storage Access"

STORAGE_ACCESS=$(grep -r "localStorage\|sessionStorage" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$STORAGE_ACCESS" -gt 0 ]; then
    log_warning "Found $STORAGE_ACCESS storage access calls - check for SSR guards"
    echo "Storage access:"
    grep -r "localStorage\|sessionStorage" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | head -3
    echo ""
fi

# 9. Check for time-based rendering
log_section "Checking Time-Based Rendering"

TIME_BASED=$(grep -r "new Date\|Date\.\|getTime\|getFullYear" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$TIME_BASED" -gt 0 ]; then
    log_warning "Found $TIME_BASED time-based operations - potential SSR/client differences"
fi

# 10. Check specific files for known patterns
log_section "Checking Specific Problem Files"

if [ -f "app.vue" ]; then
    INLINE_SCRIPTS=$(grep -c "children: \`" app.vue || echo "0")
    if [ "$INLINE_SCRIPTS" -gt 0 ]; then
        log_critical "app.vue has inline scripts - major hydration risk"
    fi
fi

if [ -f "nuxt.config.ts" ]; then
    SCRIPT_CONFIG=$(grep -c "script:" nuxt.config.ts || echo "0")
    if [ "$SCRIPT_CONFIG" -gt 0 ]; then
        log_warning "nuxt.config.ts has script configuration - check for hydration safety"
    fi
fi

# 11. Check for async components without proper loading
log_section "Checking Async Components"

ASYNC_COMPONENTS=$(grep -r "defineAsyncComponent" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$ASYNC_COMPONENTS" -gt 0 ]; then
    log_info "Found $ASYNC_COMPONENTS async components"
    
    # Check if they have loading states
    LOADING_COMPONENTS=$(grep -r "loadingComponent\|loading:" --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
    if [ "$LOADING_COMPONENTS" -eq 0 ]; then
        log_warning "Async components found but no loading states - potential hydration mismatches"
    fi
fi

# 12. Browser API usage
log_section "Checking Browser APIs"

BROWSER_APIS=$(grep -r "navigator\.\|location\.\|history\." --include="*.vue" --include="*.ts" --include="*.js" . | grep -v node_modules | wc -l)
if [ "$BROWSER_APIS" -gt 0 ]; then
    log_warning "Found $BROWSER_APIS browser API usages - verify SSR safety"
fi

# 13. Check for conditional rendering issues
log_section "Checking Conditional Rendering"

V_IF_COUNT=$(grep -r "v-if=" --include="*.vue" . | wc -l)
V_SHOW_COUNT=$(grep -r "v-show=" --include="*.vue" . | wc -l)

log_info "Found $V_IF_COUNT v-if and $V_SHOW_COUNT v-show directives"

# Look for client-specific conditionals
CLIENT_CONDITIONALS=$(grep -r "v-if.*client\|v-show.*client" --include="*.vue" . | wc -l)
if [ "$CLIENT_CONDITIONALS" -eq 0 ]; then
    log_warning "No client-specific conditionals found - all v-if/v-show may cause hydration issues"
fi

# Summary
log_section "SUMMARY"

echo -e "${RED}🚨 Critical Issues: $CRITICAL_ISSUES${NC}"
echo -e "${YELLOW}⚠️  Warning Issues: $WARNING_ISSUES${NC}"
echo -e "${BLUE}ℹ️  Info Issues: $INFO_ISSUES${NC}"

echo ""
echo "=== PRIORITY FIXES ==="

if [ "$CRITICAL_ISSUES" -gt 0 ]; then
    echo "1. 🚨 Fix critical issues first (direct DOM access, dynamic IDs, unguarded listeners)"
fi

if [ "$WARNING_ISSUES" -gt 0 ]; then
    echo "2. ⚠️  Address warnings (media queries, storage access, time-based rendering)"
fi

echo "3. ℹ️  Review info items for optimization opportunities"

echo ""
echo "=== RECOMMENDATIONS ==="
echo "• Wrap all window/document access in import.meta.client guards"
echo "• Use useState() instead of ref() for SSR-safe state"
echo "• Add ClientOnly components for browser-specific features"
echo "• Use server-safe alternatives for dynamic IDs"
echo "• Test hydration with: npm run build && npm run preview"

if [ "$CRITICAL_ISSUES" -gt 5 ]; then
    echo ""
    echo -e "${RED}⚠️  HIGH HYDRATION RISK DETECTED!${NC}"
    echo "This app likely has significant hydration mismatches."
    echo "Recommend addressing critical issues before implementing lazy loading."
fi