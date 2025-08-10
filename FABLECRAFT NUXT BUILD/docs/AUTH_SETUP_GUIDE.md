# Authentication Setup Guide

## ✅ What's Already Done

1. **Environment Variables** - Your `.env` file has Supabase credentials configured
2. **Supabase Module** - `@nuxtjs/supabase` is installed and configured in `nuxt.config.ts`
3. **Authentication Components** - All UI components are built and ready:
   - `AuthOverlay.vue` - Now wired with working auth logic
   - `SignupForm.vue` & `LoginForm.vue` - Full form components
   - `/pages/login.vue` - Standalone login page
   - `/pages/confirm.vue` - Email confirmation handler (NEW)
4. **Database Migration** - Profile table and RLS policies ready in `/supabase/migrations/001_auth_setup.sql`

## 🚀 Final Setup Steps

### Step 1: Configure Supabase Dashboard

1. **Go to your Supabase project** at [app.supabase.com](https://app.supabase.com)

2. **Enable Email Authentication:**
   - Navigate to `Authentication` > `Providers` > `Email`
   - Ensure "Enable Email provider" is ON
   - Set "Confirm email" to ON (for production)
   - For testing, you can temporarily set it to OFF

3. **Configure Redirect URLs:**
   - Go to `Authentication` > `URL Configuration`
   - Add these to "Redirect URLs":
     ```
     http://localhost:3000/confirm
     http://localhost:3000/
     http://localhost:8000/confirm
     http://localhost:8000/
     ```
   - Add your production URLs when deploying

4. **Configure Email Templates (Optional):**
   - Go to `Authentication` > `Email Templates`
   - Customize the confirmation email
   - Make sure the confirmation URL points to: `{{ .SiteURL }}/confirm#access_token={{ .Token }}&refresh_token={{ .RefreshToken }}&type=signup`

5. **Enable Social Providers (Optional):**
   - For Google: `Authentication` > `Providers` > `Google`
     - Need Google Cloud Console OAuth credentials
   - For GitHub: `Authentication` > `Providers` > `GitHub`
     - Need GitHub OAuth App credentials

### Step 2: Run Database Migration

**Option A: Via Supabase Dashboard (Easiest)**
1. Go to `SQL Editor` in your Supabase dashboard
2. Copy the entire contents of `/supabase/migrations/001_auth_setup.sql`
3. Paste and run the SQL

**Option B: Via Supabase CLI**
```bash
cd "FABLECRAFT NUXT BUILD"
npx supabase db push
```

### Step 3: Test Authentication

1. **Start your dev server:**
   ```bash
   pnpm dev
   ```

2. **Test Signup:**
   - Click the auth button in the header
   - Switch to "Sign up" tab
   - Enter your details
   - Submit the form
   - Check your email for confirmation link (if email confirmation is enabled)
   - Click the link to verify your account

3. **Test Login:**
   - After confirming email, try logging in
   - You should be redirected to the home page
   - Your user session should persist

4. **Check Supabase Dashboard:**
   - Go to `Authentication` > `Users`
   - You should see your new user listed
   - Go to `Table Editor` > `profiles`
   - You should see a profile created automatically

## 🔍 How It Works

### Signup Flow:
1. User fills out the signup form in `AuthOverlay`
2. `supabase.auth.signUp()` creates the user
3. Supabase sends confirmation email
4. User clicks link → redirected to `/confirm`
5. `/confirm` page handles token verification
6. Database trigger creates profile automatically
7. User is logged in and redirected to home

### Login Flow:
1. User enters credentials in `AuthOverlay`
2. `supabase.auth.signInWithPassword()` authenticates
3. Session is created and stored
4. User is redirected to home page
5. `useSupabaseUser()` composable provides user state

### OAuth Flow:
1. User clicks social login button
2. `supabase.auth.signInWithOAuth()` redirects to provider
3. After authorization, redirected back to `/confirm`
4. `/confirm` exchanges code for session
5. User is logged in

## 🛠️ Troubleshooting

### "Auth session missing" Error
- Make sure your `.env` file has correct Supabase credentials
- Restart the dev server after changing `.env`

### Email Not Sending
- Check Supabase dashboard email settings
- For development, disable email confirmation temporarily
- For production, configure SMTP settings in Supabase

### User Not Created
- Check browser console for errors
- Verify Supabase project is active (not paused)
- Check Authentication > Logs in Supabase dashboard

### OAuth Not Working
- Ensure redirect URLs are configured correctly
- Check that OAuth providers are enabled and configured
- Verify OAuth app credentials are correct

## 📝 Testing Checklist

- [ ] Can create new account via signup form
- [ ] Receive confirmation email (if enabled)
- [ ] Email confirmation link works
- [ ] Can log in with email/password
- [ ] Session persists after page refresh
- [ ] Can log out successfully
- [ ] Profile is created automatically in database
- [ ] OAuth login works (if configured)
- [ ] Proper error messages shown for invalid credentials
- [ ] Loading states work correctly

## 🎯 Next Steps

Once authentication is working:

1. **Add Protected Routes:**
   ```vue
   <!-- In pages that require auth -->
   <script setup>
   definePageMeta({
     middleware: 'auth'
   })
   </script>
   ```

2. **Create Auth Middleware:**
   ```ts
   // middleware/auth.ts
   export default defineNuxtRouteMiddleware((to, from) => {
     const user = useSupabaseUser()
     if (!user.value) {
       return navigateTo('/login')
     }
   })
   ```

3. **Add User Profile Page:**
   - Create `/pages/profile.vue`
   - Allow users to update their profile
   - Add avatar upload functionality

4. **Implement Password Reset:**
   - Create `/pages/forgot-password.vue`
   - Create `/pages/reset-password.vue`
   - Use `supabase.auth.resetPasswordForEmail()`

## 🚢 Production Checklist

Before going live:

- [ ] Enable email confirmation in Supabase
- [ ] Configure custom SMTP for emails
- [ ] Add production URLs to redirect whitelist
- [ ] Set up proper email templates with branding
- [ ] Enable ReCAPTCHA for signup (anti-spam)
- [ ] Configure rate limiting
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Test on multiple devices/browsers
- [ ] Add terms of service and privacy policy pages
- [ ] Implement proper session timeout handling