import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Privacy Policy (Legacy URL)</h1>
        <p className="mt-4 text-[var(--muted)]">
          This route is kept for backward compatibility.
        </p>
        <p className="mt-4 text-[var(--muted)]">
          Please see the latest policy page for current terms and data handling.
        </p>
        <Link
          href="/privacy"
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white"
        >
          Open current Privacy Policy
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
