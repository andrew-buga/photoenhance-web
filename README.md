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

Copy `.env.example` to `.env.local` and fill in your AdSense values:

- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`
- `NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY`

## Analytics configuration

- `NEXT_PUBLIC_GA_ID`

## Real AI upscale backend

To enable real AI upscale via Replicate in `/api/upscale`, set:

- `REPLICATE_API_TOKEN`
- `REPLICATE_MODEL_VERSION` (optional override)

Without these values, the app falls back to local high-quality upscale rendering.

## Hero A/B test controls

- `NEXT_PUBLIC_HERO_VARIANT_FORCE` to pin one variant (A, B, C, D, E)
- Without force, variant is assigned per user and tracked via GA4 events
