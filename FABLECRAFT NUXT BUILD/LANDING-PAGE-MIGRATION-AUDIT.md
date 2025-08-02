# LANDING PAGE MIGRATION AUDIT - GUIDED BLUEPRINT

Hello Cursor,

The following is a guided, micro-stepped blueprint for auditing the Fablecraft landing page. We will work together, step-by-step, to analyze the old React build and create a professional migration plan. Your role is to be a static code analysis tool, providing raw data based on specific commands.

## Core Principles:

**Static Analysis Only:** You will only read and analyze the code in the /old-react-build directory. Do not attempt to run it.

**Data-Driven:** We will make no assumptions. Each step will be informed by the real data you provide in the previous step.

**Targeted Scope:** We will focus exclusively on the landing page. Ignore all code related to the broken authentication or dashboard systems.

## Phase 1: Project Reconnaissance (Data Gathering)
**Our Goal:** To create a map of the old project so we can navigate it effectively.

### Step 1.1 - Command:

Please provide a recursive file listing of the /old-react-build/src/ directory, showing the full tree structure.

*(Wait for Cursor's output. We will analyze the file tree to determine the next step.)*

### Step 1.2 - Command:

Based on the previous file list, what are the most likely entry point files for the main application and the landing page? Please list the top 2-3 candidates.

*(Wait for Cursor's output. We will review your suggestions and choose the most logical file to analyze next.)*

### Step 1.3 - Command:

Please provide the full file content of the landing page entry point file we identified: [path/to/landing/page/file.js]

*(Wait for Cursor's output. We will analyze this file's content to identify the high-level components that make up the page.)*

## Phase 2: High-Level Structure Identification (Analysis)
**Our Goal:** Using the data from Phase 1, we will now identify the major sections and global systems of the landing page.

### Step 2.1 - Analysis & Command:

Based on the content of the entry point file from Step 1.3, I have identified the following high-level components: [ComponentName1, ComponentName2, etc.]. Please provide the file content for the component that appears to be the main Header/Navbar.

*(We will repeat this command for each major component identified, allowing us to map out the entire page structure.)*

### Step 2.2 - Analysis & Command:

Now that we have a map of the components, we need to find the global styles. Based on the file tree from Step 1.1, please provide the content of the most likely file for global theme configuration (e.g., tailwind.config.js or a global CSS file).

*(Wait for Cursor's output. We will analyze this to reverse-engineer the design system.)*

## Phase 3: Deep Dive Deconstruction (Iterative & Guided)
**Our Goal:** To perform a deep audit of each major section we identified in Phase 2, one at a time, and create a specific, professional re-implementation plan for each.

### Step 3.1 (First Identified Section) - Analysis & Recommendation:

We will now begin the deep dive, starting with the component we identified as the [First Section Name, e.g., Header]. I have analyzed its code.

**My Analysis:** [I will provide a full breakdown of the React code: its sub-components, state management, and effects.]

**My Professional Recommendation:** [I will provide the researched, scalable Nuxt implementation strategy. For example: "The React code uses a manual scroll listener. For the Nuxt version, we will use the @vueuse/core useWindowScroll composable, which is more performant. We will create a LandingHeader.vue and a reusable ThemeToggle.vue component..."]

### Step 3.2 (Next Identified Section) - Command:

Now, please provide the full file content for the component we identified as the [Next Section Name, e.g., Hero Section].

*(We will repeat this "Analysis & Recommendation" loop for every major section of the landing page, allowing us to build a complete migration plan based on the actual code.)*

## Phase 4: Final Implementation Blueprint (Consolidated)
**Our Goal:** Once our iterative audit is complete, I will consolidate all of my analysis and recommendations into a final, ordered, and actionable build plan. This final plan will be based on the actual code from your old project, not on assumptions. It will detail the reusable Tier 1, Tier 2, and Tier 3 components to be built, and the final assembly in pages/index.vue.