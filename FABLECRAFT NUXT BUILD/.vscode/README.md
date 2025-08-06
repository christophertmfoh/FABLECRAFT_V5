# VS Code Configuration for Fablecraft Nuxt Development

This directory contains VS Code workspace configuration optimized for Nuxt 3 + Vue 3 + TypeScript development.

## 🚀 Quick Setup

### 1. Install Recommended Extensions
When you open this project in VS Code, you'll be prompted to install recommended extensions. Click **"Install All"** or install them manually:

- **Vue.volar** - Vue 3 language support with better performance than Vetur
- **Vue.vscode-typescript-vue-plugin** - TypeScript support in `.vue` files  
- **bradlc.vscode-tailwindcss** - Tailwind CSS IntelliSense
- **esbenp.prettier-vscode** - Code formatting
- **dbaeumer.vscode-eslint** - Linting and auto-fixing

### 2. Reload VS Code
After installing extensions, reload the window: `Ctrl+Shift+P` → `Developer: Reload Window`

## 🛠️ Available Tasks

Press `Ctrl+Shift+P` → `Tasks: Run Task` to access these commands:

### Development Tasks
- **Nuxt: Dev Server** - Start development server (`pnpm dev`)
- **Nuxt: Build** - Build for production (`pnpm build`)
- **ESLint: Fix All** - Auto-fix linting issues (`pnpm lint:fix`)
- **TypeScript: Check** - Type checking (`pnpm typecheck`)
- **Prettier: Format All** - Format all files (`pnpm prettier:fix`)

### Utility Tasks  
- **Clean Build** - Remove build artifacts (`pnpm clean`)
- **Install Dependencies** - Install/update packages (`pnpm install`)
- **Supabase: Start** - Start local Supabase (`pnpm db:start`)

## ⚡ Key Features Enabled

### Vue Development
- **Syntax highlighting** for `.vue` files
- **IntelliSense** for Vue APIs, directives, and components
- **Auto-completion** for props, events, and slots
- **Error checking** in templates and scripts
- **Auto imports** for Vue composables

### TypeScript Support
- **Full type checking** in Vue SFCs
- **Auto-imports** with proper typing
- **Refactoring** support (rename, extract, etc.)
- **Go to definition** across Vue files

### Tailwind CSS
- **Class name completion** with documentation
- **Color previews** in editor
- **CSS-in-JS** support for `cn()` and `cva()` functions
- **Hover documentation** for utility classes

### Code Quality
- **Auto-formatting** on save with Prettier
- **Auto-fixing** ESLint issues on save
- **Inline error display** with Error Lens
- **TODO/FIXME highlighting** in sidebar

## 🎨 Enhanced Development Experience

### File Associations
- `.vue` files are properly recognized
- `.md` files get markdown support
- Emmet support in Vue templates

### Editor Features
- **Path IntelliSense** - Autocomplete file paths
- **Auto Rename Tag** - Rename both opening/closing tags
- **GitLens** - Git blame and history in editor
- **TODO Tree** - Scan for TODO comments across project

## 🔧 Customization

### Settings Explained
The `settings.json` includes:

```json
{
  // Vue-specific settings
  "vue.complete.casing.tags": "kebab",        // <my-component>
  "vue.complete.casing.props": "camel",       // myProp
  
  // TypeScript optimizations
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  
  // Tailwind CSS support
  "tailwindCSS.emmetCompletions": true,
  "tailwindCSS.includeLanguages": {
    "vue": "html"
  }
}
```

### Adding More Extensions
To add project-specific extensions, edit `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "your.extension.id"
  ]
}
```

## 🚨 Troubleshooting

### Common Issues

**Vue templates not highlighted?**
- Ensure Volar is installed and enabled
- Disable old Vetur extension if present
- Reload VS Code window

**TypeScript errors in .vue files?**
- Install TypeScript Vue Plugin
- Check that `vue-tsc` is in dependencies
- Verify TypeScript service is running

**Tailwind classes not autocompleting?**
- Ensure `tailwind.config.ts` is in project root
- Check Tailwind extension is enabled
- Verify Tailwind is in `dependencies`

**Tasks not working?**
- Ensure `pnpm` is installed globally
- Check task definitions in `.vscode/tasks.json`
- Verify script names match `package.json`

## 📚 Extension Documentation

### Essential Extensions
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)  
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Productivity Extensions
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [TODO Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

---

**Happy coding! 🎉**

This configuration provides a professional Nuxt/Vue development environment with excellent DX, type safety, and productivity features.