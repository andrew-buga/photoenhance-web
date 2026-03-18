"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import HeroPreview from "@/components/HeroPreview";
import useAnalytics from "@/components/useAnalytics";
import {
  DEFAULT_WINNER_VARIANT,
  heroVariants,
  type HeroVariant,
} from "@/components/heroVariants";

const STORAGE_KEY = "pe-hero-variant";

function getVariantById(id: string): HeroVariant | undefined {
  return heroVariants.find((variant) => variant.id === id);
}

export default function HeroSection() {
  const [variantId, setVariantId] = useState<string>(DEFAULT_WINNER_VARIANT);
  const { track } = useAnalytics();

  useEffect(() => {
    const forceVariant = process.env.NEXT_PUBLIC_HERO_VARIANT_FORCE;
    if (forceVariant && getVariantById(forceVariant)) {
      setVariantId(forceVariant);
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && getVariantById(saved)) {
      setVariantId(saved);
      return;
    }

    const random = heroVariants[Math.floor(Math.random() * heroVariants.length)];
    window.localStorage.setItem(STORAGE_KEY, random.id);
    setVariantId(random.id);
  }, []);

  const variant = useMemo(
    () => getVariantById(variantId) ?? heroVariants[0],
    [variantId]
  );

  useEffect(() => {
    track({
      action: "hero_variant_view",
      category: "ab_test",
      label: variant.id,
    });
  }, [track, variant.id]);

  const onPrimaryClick = () => {
    track({
      action: "hero_primary_click",
      category: "ab_test",
      label: variant.id,
    });
  };

  const onSecondaryClick = () => {
    track({
      action: "hero_secondary_click",
      category: "ab_test",
      label: variant.id,
    });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow" />
      <div className="hero-glow-2" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6 fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)] shadow">
            {variant.badge}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)] md:text-6xl">
            {variant.headline}
          </h1>
          <p className="max-w-xl text-lg text-[var(--muted)]">
            {variant.description}
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
              No upload stored
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
              Average 4-6s processing
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
              No signup required
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/enhance"
              onClick={onPrimaryClick}
              className="min-h-12 rounded-full bg-[var(--accent-1)] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {variant.primaryCta}
            </Link>
            <Link
              href="/enhance"
              onClick={onSecondaryClick}
              className="min-h-12 rounded-full border border-[var(--border)] bg-[var(--surface)] px-8 py-4 text-sm font-semibold text-[var(--text)]"
            >
              {variant.secondaryCta}
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
            <div>
              <span className="text-2xl font-bold text-[var(--text)]">100k+</span>
              <div>photos enhanced</div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[var(--text)]">12,482</span>
              <div>used today</div>
            </div>
            <div>
              <span className="text-2xl font-bold text-[var(--text)]">4-6s</span>
              <div>average processing</div>
            </div>
          </div>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}
