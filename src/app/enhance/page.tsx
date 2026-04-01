import AdSlot from "@/components/AdSlot";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import EnhanceTool from "@/components/EnhanceTool";

export default function EnhancePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
            We don't store your photos permanently.
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
            Average processing time: 4-6 seconds.
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
            No signup required to enhance images.
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <EnhanceTool />
          </div>
          <div className="md:col-span-1">
            <AdSlot
              label="Advertisement"
              size="square"
              slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
