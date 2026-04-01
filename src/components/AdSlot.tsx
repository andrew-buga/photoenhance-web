"use client";

import { useEffect, useState } from "react";

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
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !clientId || !slot) return;
    
    // Check if adsbygoogle is available (script must be loaded)
    if (typeof window === 'undefined') return;
    if (!(window as any).adsbygoogle) {
      // Script not loaded yet, wait and retry
      const timer = setTimeout(() => {
        if ((window as any).adsbygoogle) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error("AdSense push error:", e);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
    
    // Script is loaded, push immediately
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, [mounted, clientId, slot]);

  if (!mounted || !clientId || !slot) {
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
