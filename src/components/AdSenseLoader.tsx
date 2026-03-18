"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import useCookieConsent from "@/components/useCookieConsent";

export default function AdSenseLoader() {
  const { hasConsent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasConsent || !clientId) return null;

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}
