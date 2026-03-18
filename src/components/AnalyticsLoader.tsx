"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import useCookieConsent from "@/components/useCookieConsent";

export default function AnalyticsLoader() {
  const { hasConsent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasConsent || !measurementId) return null;

  return (
    <>
      <Script
        id="ga4-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
window.gtag('js', new Date());
window.gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
