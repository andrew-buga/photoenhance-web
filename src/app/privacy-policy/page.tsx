import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="mt-4 text-[var(--muted)]">
          PhotoEnhance does not store or upload your photos. All processing is
          intended to happen on your device. We only collect basic analytics to
          understand traffic and improve performance.
        </p>
        <h2 className="mt-8 text-xl font-bold">What we collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--muted)]">
          <li>Anonymous usage metrics (page views, device type).</li>
          <li>Basic performance data to improve speed.</li>
        </ul>
        <h2 className="mt-8 text-xl font-bold">Ads</h2>
        <p className="mt-3 text-[var(--muted)]">
          We display ads to keep the service free. Ads may use cookies to show
          relevant content based on your interests.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
