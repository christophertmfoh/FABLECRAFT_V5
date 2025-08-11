# 🎯 Crisp Chat Setup Instructions

## ✅ What's Already Done:
1. ✅ Crisp plugin created and configured
2. ✅ "Start Chat Now" button connected
3. ✅ Chat widget hidden by default (only opens when button clicked)
4. ✅ TypeScript support added

## 📝 What You Need To Do (5 minutes):

### Step 1: Create Free Crisp Account
1. Go to https://crisp.chat
2. Click "Get Started for Free"
3. Sign up with your email
4. Create your workspace (name it "Fablecraft")

### Step 2: Get Your Website ID
1. After signup, you'll be in the Crisp dashboard
2. Go to Settings → Website Settings → Setup instructions
3. Look for your Website ID (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
4. Copy it

### Step 3: Add Your ID to the Code
1. Open `plugins/crisp-chat.client.ts`
2. Replace `YOUR-CRISP-ID` with your actual Website ID:
```typescript
window.CRISP_WEBSITE_ID = "your-actual-id-here"
```

### Step 4: Customize Crisp (Optional but Recommended)
In your Crisp dashboard:
1. Go to Settings → Website Settings → Chatbox & Email Settings
2. Set your colors to match your theme:
   - Primary Color: Your primary color
   - Text Color: Match your foreground
   - Background: Match your background
3. Set your welcome message
4. Upload your logo
5. Set office hours to match "Mon-Fri, 9AM-6PM EST"

## 🎨 Theme Matching Colors:
Use these hex codes in Crisp settings to match your theme:
- Primary: `#3b82f6` (or your primary color)
- Background: `#ffffff` for light, `#0a0a0a` for dark
- Text: `#0a0a0a` for light, `#fafafa` for dark

## 🚀 That's It!
Once you add your Website ID, the chat will work immediately:
- Click "Start Chat Now" on the Contact page to open chat
- Chat widget is hidden by default (won't annoy users)
- Fully integrated with your theme-aware design

## 💡 Pro Tips:
- Set up automated responses in Crisp for common questions
- Use their mobile app to respond on the go
- Add team members for free (2 seats on free plan)
- Set up email notifications so you don't miss chats