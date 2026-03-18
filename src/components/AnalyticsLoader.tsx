"use client";

import { useEffect } from "react";
import useCookieConsent from "@/components/useCookieConsent";

export default function AnalyticsLoader() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (typeof window === "undefined") return;

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
  }, [consent]);

  return null;
}
