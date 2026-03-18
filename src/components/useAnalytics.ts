"use client";

type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export default function useAnalytics() {
  const track = ({ action, category, label, value }: AnalyticsEvent) => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  };

  return { track };
}
