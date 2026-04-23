# Macro Tracker — Deployment Guide

## What this app does
- **Guest mode** — anyone can use it immediately, no account needed (data saves in browser)
- **Registered mode** — free Google login or email/password, diary saves permanently to database
- **Open Food Facts** — automatic branded product search when local database doesn't match
- **Barcode scanning** — point camera at any product barcode
- **Full diary history** — browse past days with macro breakdowns

---

## Step 1 — Set up the Supabase database

1. Log in to [supabase.com](https://supabase.com) and open your project
2. In the left sidebar, click **SQL Editor** → **New query**
3. Copy the entire contents of `supabase-setup.sql` and paste it in
4. Click **Run** — you should see "Success"

### Enable Google login (optional but recommended)
1. In Supabase, go to **Authentication** → **Providers** → **Google**
2. Toggle it on
3. You'll need a Google OAuth Client ID and Secret — follow the guide at:
   https://supabase.com/docs/guides/auth/social-login/auth-google
4. Add your Vercel domain to the allowed redirect URLs in both Google Console and Supabase

---

## Step 2 — Upload to GitHub

1. Create a new repository at [github.com](https://github.com) — name it `macro-tracker`
2. Upload all these files maintaining the folder structure:
   ```
   macro-tracker/
   ├── public/
   │   └── index.html
   ├── src/
   │   ├── App.js
   │   ├── index.js
   │   ├── supabaseClient.js
   │   └── foodDatabase.js
   ├── package.json
   ├── supabase-setup.sql
   └── README.md
   ```

---

## Step 3 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New → Project**
3. Import your `macro-tracker` repository
4. Leave all settings as default — Vercel detects it's a React app automatically
5. Click **Deploy**
6. Your app will be live at `macro-tracker-yourname.vercel.app` within 60 seconds

---

## Step 4 — Connect your custom domain (Kualo)

1. Buy your domain on [kualo.com](https://kualo.com)
2. In Vercel, go to your project → **Settings** → **Domains** → add your domain
3. Vercel will show you two DNS records to add
4. Log in to Kualo → **cPanel** → **Zone Editor** (or DNS Manager)
5. Add the two records Vercel gives you (an A record and a CNAME)
6. Wait 10–30 minutes — your domain is now live

**Important:** Once your custom domain is working, add it to Supabase:
- Go to **Authentication** → **URL Configuration**
- Add your domain to the **Redirect URLs** list

---

## Updating the app later

When you want to make changes, ask Claude to update the code, then:
1. On GitHub, navigate to the file you want to update
2. Click the pencil icon to edit
3. Paste the new code
4. Click **Commit changes**
5. Vercel automatically redeploys within ~60 seconds

---

## Troubleshooting

**"Invalid API key" error** — double-check the URL and anon key in `supabaseClient.js`

**Google login not working** — make sure your domain is in both Google Console's allowed origins AND Supabase's redirect URLs

**Diary not saving** — open browser developer tools (F12) → Console tab and look for red error messages. Share them with Claude.

**Barcode not scanning** — make sure you've allowed camera permissions in your browser settings for your domain

---

## Tech stack
- React (frontend)
- Supabase (database + authentication)
- Vercel (hosting)
- Open Food Facts API (branded product search)
- @zxing/browser (barcode scanning)
