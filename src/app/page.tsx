import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="hero-glow" />
          <div className="hero-glow-2" />
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6 fade-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)] shadow">
                Free AI upscaler
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)] md:text-6xl">
                Enhance photos in seconds, no signup required.
              </h1>
              <p className="max-w-xl text-lg text-[var(--muted)]">
                PhotoEnhance upgrades everyday photos for ecommerce listings,
                social media, and personal memories. Fast, free, and always on
                your device.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/enhance"
                  className="rounded-full bg-[var(--accent-1)] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Enhance Photo
                </Link>
                <Link
                  href="/#how"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-8 py-4 text-sm font-semibold text-[var(--text)]"
                >
                  See how it works
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
                <div>
                  <span className="text-2xl font-bold text-[var(--text)]">
                    12,482
                  </span>
                  <div>photos enhanced today</div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[var(--text)]">
                    5s
                  </span>
                  <div>average processing time</div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[var(--text)]">
                    0
                  </span>
                  <div>uploads stored</div>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">
              <div className="rounded-3xl bg-[var(--surface-2)] p-6">
                <div className="text-sm font-semibold text-[var(--muted)]">
                  Live preview
                </div>
                <div className="mt-4 h-64 rounded-2xl bg-gradient-to-br from-[var(--accent-1)] via-[var(--accent-3)] to-[var(--accent-2)]" />
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold">Before / After slider</span>
                  <span className="text-[var(--muted)]">Drag to compare</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm">
                <span className="font-semibold">Ready to try?</span>
                <Link
                  href="/enhance"
                  className="rounded-full bg-[var(--text)] px-4 py-2 text-xs font-semibold text-white"
                >
                  Start now
                </Link>
              </div>
            </div>
          </div>
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
                q: "What formats are supported?",
                a: "JPG and PNG are supported on launch, with more to follow.",
              },
              {
                q: "How fast is it?",
                a: "Most photos enhance in under five seconds on modern devices.",
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
    </div>
  );
}
