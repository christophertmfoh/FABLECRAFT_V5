# 📝 COMMIT STANDARDS

## ✅ Conventional Commit Format

```
<type>: <description>

<optional body>

<optional footer>
```

## 🎯 Commit Types

| Type       | Purpose          | Example                                    |
| ---------- | ---------------- | ------------------------------------------ |
| `feat`     | New feature      | `feat: add user authentication`            |
| `fix`      | Bug fix          | `fix: resolve Tailwind CSS import error`   |
| `docs`     | Documentation    | `docs: update README with setup guide`     |
| `chore`    | Maintenance      | `chore: update dependencies`               |
| `refactor` | Code improvement | `refactor: simplify user validation logic` |
| `test`     | Adding tests     | `test: add unit tests for auth service`    |
| `style`    | Formatting       | `style: fix ESLint formatting issues`      |
| `perf`     | Performance      | `perf: optimize database queries`          |
| `ci`       | CI/CD changes    | `ci: add automated testing workflow`       |
| `build`    | Build system     | `build: update Nuxt configuration`         |

## ✅ Good Examples

```bash
✅ git commit -m "feat: implement dark mode toggle"
✅ git commit -m "fix: resolve TypeScript compilation error"
✅ git commit -m "docs: add Phase 2 configuration guide"
✅ git commit -m "chore: update to latest dependencies"
✅ git commit -m "refactor: improve component structure"
```

## ❌ Bad Examples

```bash
❌ git commit -m "fixed stuff"
❌ git commit -m "updates"
❌ git commit -m "working on auth"
❌ git commit -m "forgot to commit this"
❌ git commit -m "WIP"
```

## 🚀 Pro Tips

1. **Keep it concise**: Max 50 characters for the subject
2. **Use imperative mood**: "add" not "added" or "adds"
3. **No period at the end**: `feat: add login` not `feat: add login.`
4. **Be specific**: What exactly did you change?

## 🛠️ If Commit is Rejected

```bash
# This will fail
git commit -m "random message"

# Fix it like this
git commit -m "feat: add the feature I was working on"
```

## 🎯 Breaking Changes

For breaking changes, add `!` after the type:

```bash
git commit -m "feat!: change API response structure"
```

**Happy committing!** 🎉
