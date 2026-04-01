import AdSlot from "@/components/AdSlot";
import DemoShowcase from "@/components/DemoShowcase";
import HeroSection from "@/components/HeroSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StickyCTA from "@/components/StickyCTA";
import UploadSection from "@/components/UploadSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main>
        <HeroSection />

        {/* Upload Section */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <UploadSection />
        </section>

        <DemoShowcase />

        {/* Advertisement */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <AdSlot
            label="Advertisement"
            size="wide"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY}
          />
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Instant quality boost",
                description:
                  "Sharpen details and lift clarity in seconds with on-device AI.",
              },
              {
                title: "Built for ecommerce",
                description:
                  "Create sharper product photos and stand out on marketplaces.",
              },
              {
                title: "No signup, no uploads",
                description:
                  "Your photos stay local while the processing happens fast.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-[var(--text)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
              <h2 className="text-2xl font-extrabold">Why trust us?</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <li>We do not permanently store your original photo.</li>
                <li>Transparent free model supported by ads.</li>
                <li>Clear before/after comparison before download.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
              <h2 className="text-2xl font-extrabold">Trusted by creators, sellers, and families</h2>
              <p className="mt-4 text-sm text-[var(--muted)]">
                PhotoEnhance is used for ecommerce product photos, social posts,
                and personal memory restoration every day.
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-extrabold">How it works</h2>
            <span className="rounded-full bg-[var(--accent-3)] px-4 py-1 text-xs font-semibold uppercase">
              3 easy steps
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload or paste",
                text: "Drop a photo or paste directly from your clipboard.",
              },
              {
                step: "02",
                title: "Pick your scale",
                text: "Choose x2, x4, or x6 and see the output size instantly.",
              },
              {
                step: "03",
                title: "Download",
                text: "Get the enhanced version with a smooth before/after slider.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg"
              >
                <div className="text-sm font-semibold text-[var(--muted)]">
                  {item.step}
                </div>
                <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advertisement Before FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <AdSlot
            label="Advertisement"
            size="wide"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY}
          />
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold">FAQ</h2>
            <p className="mt-3 text-[var(--muted)]">
              Answers to the most common questions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Is PhotoEnhance free?",
                a: "Yes, it is free to use. Ads keep the service running.",
              },
              {
                q: "Do you store my photos?",
                a: "No. The goal is to process directly on your device.",
              },
              {
                q: "Is it safe for private images?",
                a: "Yes. Processing is temporary and we do not keep your files as permanent content.",
              },
              {
                q: "What formats are supported?",
                a: "JPG and PNG are supported on launch, with more to follow.",
              },
              {
                q: "How fast is it?",
                a: "Most photos are processed in about 4 to 6 seconds depending on size.",
              },
              {
                q: "Do I need to pay?",
                a: "No signup and no payment are required for the core enhancement flow.",
              },
              {
                q: "How is this tool monetized?",
                a: "PhotoEnhance is supported by lightweight ads shown during or near processing.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold">{item.q}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCTA />
    </div>
  );
}
