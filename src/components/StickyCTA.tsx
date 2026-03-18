"use client";

import Link from "next/link";

export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-2xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            No signup required
          </p>
          <p className="text-sm font-bold">Enhance in 5 seconds</p>
        </div>
        <Link
          href="/enhance"
          className="min-h-12 rounded-full bg-[var(--accent-1)] px-5 py-3 text-sm font-semibold text-white"
        >
          Try free
        </Link>
      </div>
    </div>
  );
}
