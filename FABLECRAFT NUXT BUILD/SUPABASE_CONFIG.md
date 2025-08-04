# Supabase Configuration

## ⚠️ SECURITY WARNING
**NEVER commit sensitive keys to git!** Use environment variables instead.

## Project Details

### Supabase URL
```
https://kxqkakogiaxqfajfszgp.supabase.co
```

### Public Keys (Safe to share)

#### Anon/Public Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cWtha29naWF4cWZhamZzemdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNjkwNTYsImV4cCI6MjA2OTc0NTA1Nn0.R5SCemwwE_v_kQBAV1nc_0znqATm9uU41J0O5yO3JlU
```

### Private Keys (NEVER commit to git!)

⚠️ **Service Role Key**: Store in `.env.local` file only
```
SUPABASE_SERVICE_ROLE_KEY=sb_secret_[REDACTED]
```

## Environment Setup

### 1. Create `.env.local` file (already in .gitignore)
```bash
# .env.local
SUPABASE_URL=https://kxqkakogiaxqfajfszgp.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cWtha29naWF4cWZhamZzemdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNjkwNTYsImV4cCI6MjA2OTc0NTA1Nn0.R5SCemwwE_v_kQBAV1nc_0znqATm9uU41J0O5yO3JlU
SUPABASE_SERVICE_ROLE_KEY=YOUR_SECRET_KEY_HERE
```

### 2. Nuxt Configuration
The project is already configured to use these environment variables in `nuxt.config.ts`:

```typescript
supabase: {
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_ANON_KEY,
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  redirect: false
}
```

## Usage Examples

### Client-side (Browser)
```typescript
// Automatically available via Nuxt Supabase module
const supabase = useSupabaseClient()
```

### Server-side (API Routes)
```typescript
// Use service role for admin operations
const supabase = serverSupabaseServiceRole(event)
```

## Security Best Practices

1. **NEVER** expose the service role key in client-side code
2. **NEVER** commit `.env.local` to git
3. **ALWAYS** use environment variables for sensitive data
4. **USE** the anon key for client-side operations
5. **USE** the service role key only for server-side admin operations

## Database Connection

- **Project Ref**: `kxqkakogiaxqfajfszgp`
- **Region**: Check your Supabase dashboard
- **Database Password**: Set in Supabase dashboard (Settings > Database)

## Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Nuxt Supabase Module](https://supabase.nuxtjs.org/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)