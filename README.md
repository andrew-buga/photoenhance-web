# PhotoEnhance Web

Landing page and tool UI for PhotoEnhance. The site is built with Next.js App Router, TypeScript, and Tailwind CSS.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run start` - run the production build

## Structure

- `src/app/page.tsx` - landing page
- `src/app/enhance/page.tsx` - tool flow (upload, scale, download)
- `src/app/how-to-upscale-image/page.tsx` - SEO article page
- `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/cookies/page.tsx` - legal pages
- `src/components` - shared UI components

## Notes

- Supports drag/drop and paste upload.
- Includes before/after slider demos and sticky CTA on mobile.
- Cookie consent gates ads and analytics scripts.

## AdSense configuration

To monetize the site with ads, set in `.env.local`:

- `NEXT_PUBLIC_ADSENSE_CLIENT` - Your AdSense Publisher ID (format: `ca-pub-xxxxxxxxxxxxxxxx`)
- `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` - Sidebar ad slot ID
- `NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY` - Overlay ad slot ID

### Getting AdSense credentials

1. Go to [Google AdSense](https://www.google.com/adsense/start)
2. Create an account and get approval
3. Navigate to **Ads → Ad units**
4. Create ad units and copy their slot IDs
5. Add to `.env.local`

**Note**: Ads only show if enabled and approved by Google. Without these values, ad slots will be empty (site still works).

## Analytics configuration

To track user behavior with Google Analytics 4:

- `NEXT_PUBLIC_GA_ID` - Your GA4 Measurement ID (format: `G-XXXXXXXXXX`)

### Getting GA4 ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a property for your site
3. Navigate to **Admin → Data streams**
4. Select your web stream and copy the Measurement ID
5. Add to `.env.local`

**Already configured in your `.env.local`**: `NEXT_PUBLIC_GA_ID=G-KQ4MZMLV8J`

Analytics only track if enabled and user accepts cookie consent.

## Real AI upscale backend

To enable real AI upscale via Replicate in `/api/upscale`, set:

- `REPLICATE_API_TOKEN` (**Required for actual upscaling**)
- `REPLICATE_MODEL_VERSION` (optional override, defaults to Real-ESRGAN)

**Without REPLICATE_API_TOKEN:** The app falls back to local canvas-based upscaling (fast but lower quality).

### Getting a Replicate API Token

1. Go to [Replicate.com](https://replicate.com)
2. Sign up or log in
3. Navigate to **Account → API tokens**
4. Copy your API token
5. Paste it into `.env.local` as `REPLICATE_API_TOKEN=your_token_here`

**Cost**: Replicate charges per API call (~$0.001-0.01 per upscale depending on model)

## Hero A/B test controls

- `NEXT_PUBLIC_HERO_VARIANT_FORCE` to pin one variant (A, B, C, D, E)
- Without force, variant is assigned per user and tracked via GA4 events
