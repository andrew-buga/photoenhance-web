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
    
    // Debug logging
    if (typeof window !== 'undefined') {
      console.log('AdSlot initialized:', {
        clientId,
        slot,
        adsbygoogleLoaded: !!(window as any).adsbygoogle,
      });
    }
  }, []);

  useEffect(() => {
    if (!mounted || !clientId || !slot) {
      console.log('AdSlot: Missing requirements', { mounted, clientId, slot });
      return;
    }
    
    // Check if adsbygoogle is available (script must be loaded)
    if (typeof window === 'undefined') return;
    
    const attemptPush = () => {
      if ((window as any).adsbygoogle) {
        try {
          console.log('Pushing ad slot:', slot);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense push error:", e);
        }
      }
    };
    
    if (!(window as any).adsbygoogle) {
      // Script not loaded yet, wait and retry
      const timer = setTimeout(attemptPush, 500);
      return () => clearTimeout(timer);
    }
    
    // Script is loaded, push immediately
    attemptPush();
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
