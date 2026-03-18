import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Terms</h1>
        <p className="mt-4 text-[var(--muted)]">
          PhotoEnhance is provided as-is without warranties. By using this site
          you agree not to upload illegal or harmful content. You are
          responsible for the photos you process and share.
        </p>
        <h2 className="mt-8 text-xl font-bold">Acceptable use</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--muted)]">
          <li>Use the service for lawful purposes only.</li>
          <li>Respect copyrights and privacy of others.</li>
          <li>Do not attempt to abuse or overload the service.</li>
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
