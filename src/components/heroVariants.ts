export type HeroVariant = {
  id: string;
  badge: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export const heroVariants: HeroVariant[] = [
  {
    id: "A",
    badge: "Free AI Upscale in 5s - No signup",
    headline: "Make blurry photos sharp in seconds.",
    description:
      "Free AI Image Upscaler for social media, ecommerce, and memories. No signup required.",
    primaryCta: "Try free - no signup",
    secondaryCta: "Enhance Photo - Free",
  },
  {
    id: "B",
    badge: "No upload stored",
    headline: "Free AI Image Upscaler with real before/after results.",
    description:
      "Upgrade details and resolution fast while keeping your workflow simple and private.",
    primaryCta: "Enhance Photo - Free",
    secondaryCta: "Try free now",
  },
  {
    id: "C",
    badge: "Used today: 12,482",
    headline: "From pixelated to polished in about 4-6 seconds.",
    description:
      "One-click enhancement built for creators, sellers, and families. No account needed.",
    primaryCta: "Start enhancing",
    secondaryCta: "No signup required",
  },
  {
    id: "D",
    badge: "Trusted by creators and sellers",
    headline: "Turn low-quality images into crisp, share-ready visuals.",
    description:
      "Boost clarity for product shots, portraits, and old photos in seconds.",
    primaryCta: "Try free tool",
    secondaryCta: "See it in action",
  },
  {
    id: "E",
    badge: "100k+ photos enhanced",
    headline: "AI upscale that keeps your photos natural and sharp.",
    description:
      "Fast, free, and designed to keep users moving from upload to download with zero friction.",
    primaryCta: "Upscale my photo",
    secondaryCta: "Enhance now",
  },
];

export const DEFAULT_WINNER_VARIANT = "B";
