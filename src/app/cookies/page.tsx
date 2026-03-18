import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Cookie Policy</h1>
        <p className="mt-4 text-[var(--muted)]">
          PhotoEnhance uses essential cookies for site operation and optional
          cookies for analytics and advertising. Optional cookies are only used
          after consent.
        </p>
        <h2 className="mt-8 text-xl font-bold">Why cookies are used</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--muted)]">
          <li>Remember your cookie preferences.</li>
          <li>Measure usage trends and improve performance.</li>
          <li>Serve relevant ads for free access to the tool.</li>
        </ul>
        <p className="mt-8 text-[var(--muted)]">Contact: support@photoenhance.me</p>
      </main>
      <SiteFooter />
    </div>
  );
}
