import AdSlot from "@/components/AdSlot";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Contact</h1>
        <p className="mt-4 text-[var(--muted)]">
          For support, partnerships, or advertising inquiries, reach out at
          support@photoenhance.me.
        </p>
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow">
          <p className="text-sm text-[var(--muted)]">
            We reply within 1-2 business days.
          </p>
        </div>

        <div className="mt-12">
          <AdSlot
            label="Advertisement"
            size="wide"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
