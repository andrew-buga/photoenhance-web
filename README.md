# PhotoEnhance Web

Landing page and tool UI for PhotoEnhance. The site is built with Next.js App Router, TypeScript, and Tailwind CSS.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run start` - run the production build

## Structure

- `src/app/page.tsx` - landing page
- `src/app/enhance/page.tsx` - tool flow (upload, scale, download)
- `src/components` - shared UI components

## Notes

- Ad placements are placeholders and should be replaced with AdSense snippets.
- Enhancement processing is UI-only right now and should be wired to the final AI engine.

## AdSense configuration

Copy `.env.example` to `.env.local` and fill in your AdSense values:

- `NEXT_PUBLIC_ADSENSE_CLIENT`
- `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`
- `NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY`

## Analytics configuration

- `NEXT_PUBLIC_GA_ID`
