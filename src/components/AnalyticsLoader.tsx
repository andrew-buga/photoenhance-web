"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import useCookieConsent from "@/components/useCookieConsent";

export default function AnalyticsLoader() {
  const { consent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !measurementId || typeof window === "undefined") return;

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") return;

    if (consent === "accepted") {
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
      return;
    }

    if (consent === "dismissed") {
      gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, [consent, measurementId, mounted]);

  if (!mounted || !measurementId) return null;

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
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
window.gtag('js', new Date());
window.gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
