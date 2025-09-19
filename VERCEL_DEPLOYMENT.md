# Deploy Your Portfolio to Vercel

Your portfolio is now ready for Vercel deployment! Follow these steps to deploy it:

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your code in a Git repository (GitHub, GitLab, or Bitbucket)
3. A PostgreSQL database (we recommend Neon Database for serverless)

## Step 1: Prepare Your Database

### Option A: Use Neon Database (Recommended)
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new database project
3. Copy the connection string (it looks like: `postgresql://user:password@host/database`)

### Option B: Use Your Existing Database
- Make sure your PostgreSQL database is accessible from the internet
- Get your DATABASE_URL connection string

## Step 2: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and log in
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Build Command**: `vite build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

### Method 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to configure your project
```

## Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

### Required Variables:
```
DATABASE_URL = your_postgresql_connection_string
```

### Optional Variables (for full functionality):
```
SENDGRID_API_KEY = your_sendgrid_api_key (for contact form emails)
GOOGLE_SERVICE_ACCOUNT_EMAIL = your_google_service_account_email
GOOGLE_PRIVATE_KEY = your_google_private_key
GOOGLE_SHEETS_ID = your_google_sheets_id
```

## Step 4: Deploy Database Schema

After your first deployment, you need to push your database schema:

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push
```

## Step 5: Test Your Deployment

Your portfolio should now be live! Test:

1. ✅ Homepage loads with your welcome message
2. ✅ Contact form submits messages
3. ✅ Dino game saves scores to leaderboard
4. ✅ Games are playable (Tic-tac-toe, Dino game)

**Note**: Contact messages are stored securely in your database. To view submitted messages, access your database directly or set up an admin panel.

## Optional Enhancements

### Custom Domain
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain and follow DNS setup instructions

### Email Notifications
1. Sign up for SendGrid account
2. Get your API key from SendGrid dashboard
3. Add `SENDGRID_API_KEY` to Vercel environment variables

### Google Sheets Integration
1. Follow instructions in `GOOGLE_SHEETS_SETUP.md`
2. Add Google Sheets environment variables to Vercel

## Troubleshooting

### Build Errors
- Check that all dependencies are properly installed
- Verify that your environment variables are set correctly

### Database Connection Issues
- Ensure your DATABASE_URL is correct and accessible
- Check that your database schema has been pushed with `npm run db:push`

### API Function Errors
- Check Vercel function logs in the dashboard
- Verify all environment variables are set

## File Structure for Vercel

Your project is configured with:
- ✅ `vercel.json` - Vercel configuration
- ✅ `api/` - Serverless API functions
- ✅ Frontend builds to `dist/public`
- ✅ Database integration ready

## Automatic Deployments

Once connected to Git, Vercel will automatically:
- Deploy on every push to main branch
- Run builds and tests
- Update your live site

Your portfolio is ready for the world! 🚀