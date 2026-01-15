# Deployment Guide - GitHub Pages

This guide will help you deploy your Next.js ERP application to GitHub Pages.

## ✅ What's Already Configured

1. ✅ `next.config.ts` - Configured for static export with base path support
2. ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
3. ✅ `package.json` - Build script updated
4. ✅ Server Components converted to static-compatible components

## 📋 Prerequisites

1. A GitHub account
2. Your code ready to push
3. Node.js 18+ (for local testing)

## 🚀 Step-by-Step Deployment

### Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to your project directory
cd /Users/hridhin/Documents/explaineddigital/erp

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Ready for GitHub Pages deployment"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name your repository (e.g., `erp` or `holiday-panda-erp`)
4. **DO NOT** initialize with README, .gitignore, or license (you already have these)
5. Click **Create repository**

### Step 3: Push Code to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

### Step 4: Update Base Path in next.config.ts

The base path is automatically detected from `GITHUB_REPOSITORY` environment variable. However, if you want to set it manually:

1. Open `next.config.ts`
2. Update the `repoName` variable if your repository name is different:
   ```typescript
   const repoName = 'your-repo-name'; // Change this to match your GitHub repo name
   ```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
5. Click **Save**

### Step 6: Trigger Deployment

1. **Option A - Automatic**: Push any commit to trigger the workflow:
   ```bash
   # Make a small change (or just add a comment)
   git add .
   git commit -m "Trigger GitHub Pages deployment"
   git push
   ```

2. **Option B - Manual**: 
   - Go to your repository → **Actions** tab
   - Click **Deploy to GitHub Pages** workflow
   - Click **Run workflow** → **Run workflow**

### Step 7: Monitor Deployment

1. Go to **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-5 minutes)
4. Once complete, you'll see a green checkmark ✅

### Step 8: Access Your Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:** If your username is `johndoe` and repo is `erp`:
```
https://johndoe.github.io/erp/
```

## 🔧 Configuration Details

### Base Path Handling

The app automatically handles the base path (`/YOUR_REPO_NAME/`) for:
- All internal links
- Asset paths
- Route navigation

### Static Export Features

✅ **Works:**
- Client-side routing
- React components
- localStorage (authentication)
- All UI interactions
- Static data rendering

❌ **Doesn't Work:**
- Server Actions (converted to client-side)
- API Routes (not available in static export)
- Server-only features

## 🐛 Troubleshooting

### Build Fails in GitHub Actions

**Error: "Cannot find module"**
- Solution: Ensure all dependencies are in `package.json`
- Run `npm install` locally and commit `package-lock.json`

**Error: "Static page generation failed"**
- Solution: Check if any pages use server-only features
- Convert async Server Components to synchronous (already done for main pages)

**Error: "Base path mismatch"**
- Solution: Verify repository name matches in `next.config.ts`
- Check GitHub Actions logs for the actual repository name

### 404 Errors on Routes

**Problem:** Routes return 404 after deployment

**Solutions:**
1. Ensure `trailingSlash: true` is set in `next.config.ts` (already set)
2. Verify base path is correct
3. Check that all links use Next.js `Link` component or relative paths

### Authentication Not Working

**Problem:** Login redirects don't work

**Solution:** 
- localStorage works in static export
- Ensure all redirects use relative paths
- Check browser console for errors

### Images Not Loading

**Problem:** Images show broken links

**Solution:**
- Images are set to `unoptimized: true` for static export
- Ensure image paths are relative or use the base path
- Check that images are in the `public/` folder

## 📝 Testing Locally Before Deployment

Test the static export locally:

```bash
# Build the static export
npm run build

# The 'out' folder will contain your static files
# You can test it with a simple HTTP server:
npx serve out

# Or use Python:
python3 -m http.server 3000 -d out
```

Visit `http://localhost:3000/YOUR_REPO_NAME/` to test.

## 🔄 Updating Your Site

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your app
2. Export static files
3. Deploy to GitHub Pages

Just push your changes:
```bash
git add .
git commit -m "Your update message"
git push
```

## 📚 Additional Resources

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## ⚠️ Important Notes

1. **Repository Name**: Make sure your repository name matches what's in the URL
2. **Build Time**: First build may take 5-10 minutes, subsequent builds are faster
3. **Custom Domain**: If you want a custom domain, add a `CNAME` file in `public/` folder
4. **Environment Variables**: For static export, environment variables must be available at build time (use GitHub Secrets)

## 🔄 Converting Remaining Async Pages (If Build Fails)

If your build fails due to async Server Components, convert them like this:

**Before (Async):**
```typescript
async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return { /* data */ }
}

export default async function Page() {
  const data = await getData()
  return <div>{/* content */}</div>
}
```

**After (Static):**
```typescript
function getData() {
  return { /* data */ }
}

export default function Page() {
  const data = getData()
  return <div>{/* content */}</div>
}
```

**Pages that may need conversion:**
- `app/(dashboard)/leads/page.tsx`
- `app/(dashboard)/users/page.tsx`
- `app/(dashboard)/members/page.tsx`
- `app/(dashboard)/team/page.tsx`
- `app/(dashboard)/leads/[id]/page.tsx`
- `app/(dashboard)/leads/[id]/edit/page.tsx`
- `app/(dashboard)/members/[id]/page.tsx`

**Already converted:**
- ✅ `app/(dashboard)/analytics/page.tsx`
- ✅ `components/dashboard/lead-dashboard.tsx`
- ✅ `components/dashboard/admin-dashboard.tsx`
- ✅ `components/dashboard/sales-dashboard.tsx`

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] Workflow completed successfully
- [ ] Site accessible at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- [ ] All routes working correctly
- [ ] Authentication working (localStorage)
- [ ] All pages loading properly
