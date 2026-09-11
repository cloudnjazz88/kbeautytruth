# Cloudflare Pages Deployment Guide

## Prerequisites
- GitHub account
- Cloudflare account (free tier is sufficient)
- Git installed on your computer

## Step-by-Step Deployment

### 1. Initialize Git Repository

Open terminal/command prompt in your project folder:

```bash
cd "G:\Claude\뷰티블로그"
git init
git add .
git commit -m "Initial commit: K-beauty Insider blog"
```

### 2. Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon → **New repository**
3. Name it: `kbeauty-insider` (or your preferred name)
4. Keep it **Public** (required for free Cloudflare Pages)
5. Don't initialize with README (we already have one)
6. Click **Create repository**

### 3. Push to GitHub

Copy the commands from GitHub's "push an existing repository" section:

```bash
git remote add origin https://github.com/YOUR-USERNAME/kbeauty-insider.git
git branch -M main
git push -u origin main
```

### 4. Deploy on Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Pages** in the left sidebar
3. Click **Create a project** → **Connect to Git**
4. Click **Connect GitHub** and authorize Cloudflare
5. Select your `kbeauty-insider` repository
6. Configure build settings:
   - **Project name**: kbeauty-insider (will become your-project.pages.dev)
   - **Production branch**: main
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
7. Click **Save and Deploy**

🎉 Your site will be live at `https://kbeauty-insider.pages.dev` in ~1 minute!

### 5. Add Custom Domain (Optional but Recommended)

#### Option A: Buy Domain Through Cloudflare (Easiest)
1. In Cloudflare Dashboard → **Domain Registration**
2. Search for your desired .com domain
3. Purchase (usually $10-15/year)
4. In Pages → Your project → **Custom domains**
5. Click **Set up a custom domain**
6. Enter your domain
7. Cloudflare auto-configures DNS ✅

#### Option B: Use Existing Domain
1. In Pages → Your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name
4. Add the CNAME record to your domain's DNS:
   ```
   Type: CNAME
   Name: @ (or www)
   Target: kbeauty-insider.pages.dev
   ```
5. Wait for DNS propagation (5 mins - 24 hours)

### 6. Enable HTTPS (Automatic)

Cloudflare automatically provisions SSL certificates. Your site will be accessible via HTTPS within a few minutes.

### 7. Configure Custom Domain in Your Site

Update these files after deploying:

**index.html** - Update Open Graph URL:
```html
<meta property="og:url" content="https://yourdomain.com">
```

**sitemap.xml** - Replace `yourdomain.com` with your actual domain

**Push changes:**
```bash
git add .
git commit -m "Update domain URLs"
git push
```

Cloudflare Pages will automatically rebuild and deploy!

## Continuous Deployment

Every time you push to GitHub, Cloudflare Pages will automatically:
1. Detect the change
2. Rebuild your site
3. Deploy the new version
4. Keep the old version (in case you need to rollback)

## Troubleshooting

### Site not updating?
1. Check **Deployments** tab in Cloudflare Pages
2. Look for failed deployments
3. View build logs for errors

### Custom domain not working?
1. Wait 24 hours for DNS propagation
2. Check DNS records in Cloudflare
3. Clear browser cache

### Want to preview changes before deploying?
1. Create a new branch: `git checkout -b preview`
2. Make changes and push: `git push origin preview`
3. Cloudflare creates a preview URL: `preview.kbeauty-insider.pages.dev`
4. Merge to main when ready

## Performance Tips

Cloudflare Pages automatically provides:
- ✅ Global CDN (fast worldwide)
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Unlimited bandwidth
- ✅ Automatic minification (optional)

Enable additional optimizations:
1. Go to Pages project settings
2. Enable **Auto Minify** for HTML, CSS, JS
3. Enable **Brotli compression**

## Next Steps After Deployment

1. **Test on multiple devices**
   - Mobile (iOS and Android)
   - Tablet
   - Desktop browsers

2. **Set up Google Search Console**
   - Verify ownership
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

3. **Add Google Analytics**
   - Get tracking ID
   - Add code to `index.html` before `</head>`

4. **Monitor performance**
   - Use PageSpeed Insights
   - Check Core Web Vitals

5. **Start promoting**
   - Reddit: r/KoreanBeauty, r/SkincareAddiction
   - Pinterest boards
   - Beauty forums

## Free SSL Certificate ✅

Cloudflare automatically provides a free SSL certificate. No configuration needed!

## Cost Breakdown

- **Cloudflare Pages**: FREE ✅
- **Custom domain**: ~$10-15/year
- **Total**: Under $15/year

Compare to:
- Traditional hosting: $5-20/month ($60-240/year)
- WordPress hosting: $10-30/month ($120-360/year)

## Support Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [GitHub Docs](https://docs.github.com/)

---

**Your blog is ready to go live! 🚀**
