"use client";

import useCookieConsent from "@/components/useCookieConsent";

export default function CookieBanner() {
  const { consent, accept, dismiss } = useCookieConsent();

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-6xl px-6 pb-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-[var(--muted)]">
          We use cookies to improve performance and show relevant ads. By
          clicking Accept, you agree to our cookie policy.
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-[var(--border)] px-5 py-2 text-xs font-semibold text-[var(--text)]"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-[var(--text)] px-6 py-2 text-xs font-semibold text-white shadow-md"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
