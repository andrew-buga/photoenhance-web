"use client";

import { useEffect, useState } from "react";
import useCookieConsent from "@/components/useCookieConsent";

type AdSlotProps = {
  label?: string;
  size?: "banner" | "square" | "wide";
  slot?: string;
};

const sizeClasses: Record<NonNullable<AdSlotProps["size"]>, string> = {
  banner: "h-24",
  square: "h-64",
  wide: "h-40",
};

export default function AdSlot({
  label = "Ad slot",
  size = "wide",
  slot,
}: AdSlotProps) {
  const { hasConsent } = useCookieConsent();
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const canRender = hasConsent && clientId && slot;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canRender || !mounted) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, [canRender, mounted]);

  if (!mounted) return null;

  if (!canRender) {
    return (
      <div
        className={`flex ${sizeClasses[size]} w-full items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] text-sm font-semibold uppercase tracking-widest text-[var(--muted)]`}
      >
        {label}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${sizeClasses[size]} w-full rounded-2xl`}
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
