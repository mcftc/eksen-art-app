# Eksen Art - Deployment Guide

## Quick Deployment to Vercel

### Prerequisites
1. GitHub account
2. Vercel account connected to GitHub
3. Supabase project set up
4. Domain name (optional)

### Step 1: GitHub Repository Setup

1. Create a new private repository on GitHub named `eksen-art-app`
2. Push your code to the repository
3. Make sure `.env.local` is ignored by Git (it's in .gitignore)

### Step 2: Environment Variables

In your Vercel project settings, add these environment variables:

#### Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://abxxhysgdhrigvvrrczx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_KVujpedS71yt4-IewcKF_w_4yuFdPuQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFieHhoeXNnZGhyaWd2dnJyY3p4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjUwNTM1OSwiZXhwIjoyMDcyMDgxMzU5fQ.gdlvG5Cz9YfoLMn_aM9i71i1Nltdm8XAIpqlYhgoKXQ
DATABASE_URL=postgresql://postgres.abxxhysgdhrigvvrrczx:vJcpvwFIqCXbFJ1y@aws-1-eu-central-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=projects
```

#### Optional Variables:
```
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
NEXT_PUBLIC_INSTAGRAM_USERNAME=eksenartmimarlik
```

### Step 3: Vercel Configuration

1. Connect your GitHub repository to Vercel
2. Select the `eksen-art-app` repository
3. Framework: Next.js (auto-detected)
4. Build settings will be handled by vercel.json
5. Add all environment variables in the settings

### Step 4: Database Migration

After successful deployment, you need to apply the database migration:

1. Go to your Supabase SQL Editor
2. Run the migration from `add_images_column_migration.sql`:
   ```sql
   ALTER TABLE stand_types 
   ADD COLUMN images JSONB;
   ```

### Step 5: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS settings as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Step 6: Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Dark theme is default
- [ ] Admin panel works (test login)
- [ ] Images display correctly with fallbacks
- [ ] Forms work (contact, quote request)
- [ ] Database operations work
- [ ] All pages are accessible
- [ ] Mobile responsive design works

## Troubleshooting

### Common Issues:

1. **Build fails**: Check environment variables are set correctly
2. **Images don't load**: Verify Supabase storage configuration
3. **Database errors**: Ensure migration was applied
4. **Admin panel not working**: Check authentication configuration

### Support
For deployment issues, check:
1. Vercel build logs
2. Supabase logs
3. Browser console for client-side errors

## Performance Optimizations

- Images are optimized with Next.js Image component
- Static generation for better performance
- Frankfurt region selected for European users
- CDN caching enabled

## Security Features

- Environment variables are secure
- RLS policies applied to database
- API rate limiting implemented
- Security headers configured