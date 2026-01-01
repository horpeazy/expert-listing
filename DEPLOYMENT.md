# Deployment Guide - Expert Listing

Complete step-by-step guide for deploying Expert Listing to production.

## Pre-Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database migration executed
- [ ] Google OAuth credentials configured
- [ ] Resend account set up
- [ ] All environment variables ready
- [ ] Code pushed to GitHub

## Step 1: Supabase Setup

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and fill in details
4. Wait for project to initialize

### 1.2 Run Database Migration
1. Go to SQL Editor in Supabase dashboard
2. Create a new query
3. Copy contents from `supabase/migrations/001_initial_schema.sql`
4. Run the query
5. Verify tables are created in Table Editor

### 1.3 Create Storage Bucket
1. Go to Storage in Supabase dashboard
2. Create new bucket named `images`
3. Set it to Public
4. Configure policies as needed

### 1.4 Configure Authentication
1. Go to Authentication > Providers
2. Enable Email provider
3. Enable Google provider:
   - Add Client ID
   - Add Client Secret
   - Set redirect URL: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
4. Go to Authentication > URL Configuration:
   - Site URL: Your production URL
   - Redirect URLs: Add `https://your-domain.com/auth/callback`

### 1.5 Get API Credentials
1. Go to Project Settings > API
2. Copy:
   - Project URL
   - anon/public key
   - service_role key (keep secret!)

## Step 2: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://your-domain.com` (for production)
   - `https://[PROJECT-REF].supabase.co`
7. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`
   - `https://[PROJECT-REF].supabase.co/auth/v1/callback`
8. Copy Client ID and Client Secret

## Step 3: Resend Email Setup

1. Create account at [resend.com](https://resend.com)
2. Verify your domain (or use their test domain for now)
3. Get API key from API Keys section
4. (Optional) Add your domain in Domains section for production

## Step 4: Vercel Deployment

### 4.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 4.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Add Environment Variables (see below)
6. Click "Deploy"

### 4.3 Environment Variables

Add these in Vercel Project Settings > Environment Variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=Expert Listing

# Email
RESEND_API_KEY=your-resend-api-key
```

## Step 5: Post-Deployment Configuration

### 5.1 Update Supabase URLs
1. Go to Supabase > Authentication > URL Configuration
2. Update Site URL to your Vercel URL
3. Add Vercel URL to Redirect URLs

### 5.2 Update Google OAuth
1. Go to Google Cloud Console
2. Add your Vercel URL to authorized origins
3. Add `https://your-domain.vercel.app/auth/callback` to redirect URIs

### 5.3 Configure Custom Domain (Optional)
1. In Vercel, go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update all URLs in Supabase and Google OAuth

### 5.4 Create Admin User
1. Register a new account on your deployed site
2. Go to Supabase > Table Editor > profiles
3. Find your user
4. Change `role` from 'user' to 'admin'
5. Set `is_verified` to true

## Step 6: Verification & Testing

### Test Checklist
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] Email verification works
- [ ] Google Sign-In works
- [ ] Property listing submission works
- [ ] Search and filters work
- [ ] Snagging booking works
- [ ] Dashboard accessible
- [ ] Admin panel accessible (for admin users)
- [ ] Images upload correctly
- [ ] Email notifications send

## Step 7: Monitoring & Maintenance

### Set Up Monitoring
1. Enable Vercel Analytics
2. Set up Sentry for error tracking (optional)
3. Configure Supabase alerts
4. Set up uptime monitoring

### Regular Maintenance
- Monitor Supabase database size
- Check Vercel usage and bandwidth
- Review Resend email credits
- Backup database regularly
- Update dependencies monthly

## Troubleshooting

### OAuth Not Working
- Verify all URLs match exactly (including trailing slashes)
- Check that OAuth credentials are correct
- Ensure redirect URLs are whitelisted

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies
- Ensure migrations ran successfully

### Image Upload Fails
- Verify storage bucket exists and is public
- Check CORS configuration
- Verify file size limits

### Email Not Sending
- Verify Resend API key
- Check email from address
- Ensure domain is verified (for production)

## Rollback Procedure

If deployment fails:
1. Go to Vercel > Deployments
2. Find last working deployment
3. Click "..." > "Promote to Production"

## Support

For deployment issues:
- Check Vercel logs
- Review Supabase logs
- Check browser console
- Review server logs in Vercel Functions

---

## Quick Commands

```bash
# Build locally to test
npm run build

# Start production server locally
npm start

# Check for errors
npm run lint

# Force redeploy on Vercel
vercel --prod --force
```

## Production URLs

After deployment, save these URLs:
- **Live Site:** https://your-domain.vercel.app
- **Supabase Dashboard:** https://app.supabase.com/project/[PROJECT-REF]
- **Vercel Dashboard:** https://vercel.com/[your-username]/expert-listing
- **Google Cloud Console:** https://console.cloud.google.com
- **Resend Dashboard:** https://resend.com/emails

---

Good luck with your deployment! 🚀

