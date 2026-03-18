"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pe-cookie-consent";

type ConsentState = "accepted" | "dismissed" | null;

type ConsentInfo = {
  consent: ConsentState;
  accept: () => void;
  dismiss: () => void;
  hasConsent: boolean;
};

export default function useCookieConsent(): ConsentInfo {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ConsentState;
    if (saved) {
      setConsent(saved);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  };

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "dismissed");
    setConsent("dismissed");
  };

  return {
    consent,
    accept,
    dismiss,
    hasConsent: consent === "accepted",
  };
}
