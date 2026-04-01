"use client";

import Link from "next/link";

export default function StickyCTA() {
  return (
    <>
      {/* Spacer to prevent content from being hidden */}
      <div className="h-24 md:hidden" />

      {/* Sticky button */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-t-3xl border-t border-l border-r border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-2xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              No signup required
            </p>
            <p className="text-sm font-bold">Enhance in 5 seconds</p>
          </div>
          <Link
            href="/enhance"
            className="min-h-12 rounded-full bg-[var(--accent-1)] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap"
          >
            Try free
          </Link>
        </div>
      </div>
    </>
  );
}
