import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="mt-4 text-[var(--muted)]">
          PhotoEnhance processes photos in memory for enhancement and does not
          permanently store your uploaded images on our servers by default.
        </p>
        <h2 className="mt-8 text-xl font-bold">Data storage policy</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--muted)]">
          <li>Uploaded files are used only to produce enhanced output.</li>
          <li>Temporary processing files are deleted after completion.</li>
          <li>Analytics data is aggregated and non-personal.</li>
        </ul>
        <p className="mt-8 text-[var(--muted)]">
          Contact: support@photoenhance.me
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
