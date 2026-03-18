"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pe-cookie-consent";
const CONSENT_EVENT = "pe-consent-changed";

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
    const syncConsent = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY) as ConsentState;
      setConsent(saved ?? null);
    };

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener(CONSENT_EVENT, syncConsent);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener(CONSENT_EVENT, syncConsent);
    };
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "dismissed");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return {
    consent,
    accept,
    dismiss,
    hasConsent: consent === "accepted",
  };
}
