w# Token & Configuration Requirements for PhotoEnhance Web

This document lists all external services and tokens required to run PhotoEnhance Web at full capacity.

## Quick Start (Minimum Setup)

To get the site running locally with basic functionality:

```bash
npm install
npm run dev
# Opens at http://localhost:3000 - Image upscaling will use local fallback
```

**No tokens required** for basic functionality, but upscaling will be limited to canvas-based processing.

---

## Full Configuration (Recommended)

### 1. **Replicate API Token** (For AI Image Upscaling) ⭐

**Purpose**: Powers the actual AI-based image upscaling using Real-ESRGAN model.

**Status**: Optional but **highly recommended** for production

**How to get:**
1. Visit [replicate.com](https://replicate.com)
2. Sign up (free account available)
3. Go to Account → API Tokens
4. Copy your token (format: looks like `r8_...`)

**Where to add**: `.env.local`
```
REPLICATE_API_TOKEN=r8_your_token_here
```

**Cost**: ~$0.001-0.01 per upscale (you pay as you go)

**Fallback behavior**: Without this token, images are upscaled using browser-based canvas (fast, lower quality)

**Status in your setup**: 🔴 **Not configured** - Add your token to `.env.local` to enable AI upscaling

---

### 2. **Google Analytics 4** (For Usage Tracking)

**Purpose**: Tracks user interactions, page views, conversion events.

**Status**: Optional but **already configured** in your project

**Your setup**: ✅ `NEXT_PUBLIC_GA_ID=G-KQ4MZMLV8J` (already in `.env.local`)

**What it tracks**:
- Page views
- Image uploads
- Upscaling events
- Downloads
- Ad impressions

**No additional setup needed** - Already active

---

### 3. **Google AdSense** (For Monetization with Ads)

**Purpose**: Display ads on the site and earn revenue.

**Status**: Optional (site works without ads)

**How to get:**
1. Visit [google.com/adsense](https://www.google.com/adsense)
2. Apply for AdSense (requires 6+ months old domain)
3. Once approved, get:
   - Publisher ID (format: `ca-pub-xxxxxxxxxxxxxxxx`)
   - Ad Unit IDs (sidebar, overlay slots)

**Where to add**: `.env.local`
```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY=0987654321
```

**Status in your setup**: 🔴 **Not configured** - Leave as is if you don't have AdSense

---

## Configuration Summary Table

| Token | Required | Status | When Used | Cost |
|-------|----------|--------|-----------|------|
| **REPLICATE_API_TOKEN** | No | 🔴 Missing | Real AI upscaling | Pay-per-use |
| **NEXT_PUBLIC_GA_ID** | No | ✅ Configured | Analytics tracking | Free |
| **NEXT_PUBLIC_ADSENSE_CLIENT** | No | 🔴 Missing | Serve ads | Free |
| **NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR** | No | 🔴 Missing | Sidebar ads | Free |
| **NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY** | No | 🔴 Missing | Modal ads | Free |

---

## Feature Matrix: What Works Without Each Token

| Feature | No Tokens | + Replicate | + AdSense | Full Setup |
|---------|-----------|------------|----------|-----------|
| **Upload images** | ✅ | ✅ | ✅ | ✅ |
| **AI upscaling** | ❌ | ✅ | ✅ | ✅ |
| **Canvas fallback upscaling** | ✅ | ✅ | ✅ | ✅ |
| **Before/After slider** | ✅ | ✅ | ✅ | ✅ |
| **Download enhanced images** | ✅ | ✅ | ✅ | ✅ |
| **Usage analytics** | ✅ | ✅ | ✅ | ✅ |
| **Ad revenue** | ❌ | ❌ | ✅ | ✅ |
| **Track revenue in GA4** | ❌ | ❌ | ℹ️ Manual | ✅ |

---

## Environment File (.env.local)

**Current status:**
```bash
# What's configured:
NEXT_PUBLIC_GA_ID=G-KQ4MZMLV8J ✅

# What's missing:
REPLICATE_API_TOKEN=           ❌ Add your token here
# NEXT_PUBLIC_ADSENSE_CLIENT=   ❌ Uncomment when ready
# NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=  ❌ Uncomment when ready  
# NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY=  ❌ Uncomment when ready
```

---

## Step-by-Step Setup for Production

### Step 1: Get Replicate Token (Recommended)
```bash
# 1. Visit https://replicate.com
# 2. Sign up
# 3. Copy API token from Account → API Tokens
# 4. Update .env.local:
REPLICATE_API_TOKEN=r8_paste_your_token_here
```

### Step 2: (Optional) Apply for Google AdSense
```bash
# 1. Visit https://www.google.com/adsense
# 2. Apply for an account
# 3. Wait for approval (1-2 weeks)
# 4. Create ad units and get IDs
# 5. Update .env.local with IDs
```

### Step 3: Deploy with tokens
```bash
npm run build
npm run start
# or deploy to Vercel/another platform with env vars
```

---

## Testing the Configuration

### Test 1: Image Upscaling Works
1. Go to http://localhost:3000/enhance
2. Upload an image
3. Click "Download"
4. Check:
   - ✅ No errors displayed
   - ✅ Image is larger (upscaled)

### Test 2: Analytics Tracking
1. Open DevTools (F12)
2. Go to Network tab
3. Upload an image
4. Check for API calls to `google-analytics.com`
5. Analytics event should appear

### Test 3: AdSense Ads Display
1. Go to homepage
2. Look for ad placeholders in sidebar
3. (Requires AdSense configuration + approval)

---

## Troubleshooting

**Q: "Upscale failed" error**
- ✅ Solution: You don't have REPLICATE_API_TOKEN set. This is normal - site falls back to canvas upscaling
- The image will still be enhanced but with lower quality

**Q: Ads aren't showing**
- ✅ Solution: AdSense isn't configured or domain isn't approved
- Site still works normally without ads

**Q: Can't see upscaling progress**
- ✅ Solution: This is normal - progress bar is simulated. Actual processing happens server-side

**Q: Image upload not working**
- ✅ Solution: Check browser console (F12) for errors
- Verify file is actual image (JPG, PNG, WebP)
- Check file size < 12MB

---

## Production Deployment Notes

When deploying to production (Vercel, etc.):

1. **Add environment variables** in platform's dashboard:
   - REPLICATE_API_TOKEN (server-side, not public)
   - NEXT_PUBLIC_GA_ID (public)
   - NEXT_PUBLIC_ADSENSE_CLIENT (public)
   - NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR (public)
   - NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY (public)

2. **Don't commit tokens** to git:
   - `.env.local` should be in `.gitignore` ✅ (already is)

3. **Test all features** after deployment:
   - Upload and upscale an image
   - Check analytics in GA4 dashboard
   - Verify ads appear (if using AdSense)

---

## Cost Estimation

| Service | Free Tier | Pricing | Est. Monthly @ 1000 upscales |
|---------|-----------|---------|------------------------------|
| Replicate API | ❌ | $0.001-0.01/call | $1-10 |
| Google Analytics | ✅ Free | Forever free | $0 |
| Google AdSense | ✅ Free | Revenue share | $0-100+ per month |
| Next.js/Vercel | ✅ 100GB bandwidth | From $5/mo | $5+ |

**Total estimated monthly cost**: $5-15 for infrastructure + API usage (before ad revenue)

---

## Summary

Your PhotoEnhance site is **fully functional right now** with:
- ✅ Image upload and enhancement 
- ✅ Analytics tracking configured
- ✅ Local fallback upscaling active

To unlock full potential:
1. 🎯 **Add Replicate token** for AI upscaling
2. 🎯 **(Optional) Add AdSense IDs** for ad revenue
3. 🎯 Deploy to production

Questions? Check the `.env.local` file comments for detailed setup guidance.
