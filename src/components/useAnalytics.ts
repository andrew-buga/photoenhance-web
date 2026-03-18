"use client";

import { useCallback } from "react";

type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export default function useAnalytics() {
  const track = useCallback(({ action, category, label, value }: AnalyticsEvent) => {
    if (typeof window === "undefined") return;
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }, []);

  return { track };
}
