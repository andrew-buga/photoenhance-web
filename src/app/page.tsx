import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CustomDemoUpload from "@/components/CustomDemoUpload";
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

        <CustomDemoUpload />

        {/* Advertisement */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <AdSlot
            label="Advertisement"
            size="wide"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY}
          />
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-3xl font-extrabold mb-8">What makes PhotoEnhance different</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "AI-Powered Upscaling",
                description:
                  "Modern deep neural networks recognize patterns in real-world images and reconstruct missing details intelligently. Not just pixel stretching—true quality enhancement that preserves texture and sharpness.",
              },
              {
                title: "Privacy-First Design",
                description:
                  "Your photos never leave your browser. Processing happens locally on your device using WebGL acceleration. No uploads to servers, no permanent storage, no tracking.",
              },
              {
                title: "Choice of Scales",
                description:
                  "x2 for web, x4 for product photos and prints, x6 for large formats. See the exact output size before processing and choose the scale that fits your needs.",
              },
              {
                title: "Instant Comparison",
                description:
                  "The interactive before/after slider appears immediately after processing. Verify the enhancement matches your expectations before downloading anything.",
              },
              {
                title: "No Barriers",
                description:
                  "Zero signup required. Zero payment. Zero account creation. Upload, enhance, and download—done in under 10 seconds total.",
              },
              {
                title: "Supported by Ads",
                description:
                  "We're transparent about our business model. PhotoEnhance stays free through unobtrusive advertising. No surprise costs or hidden fees.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-[var(--text)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
            <h2 className="text-2xl font-extrabold mb-6">Perfect for your use case</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="font-semibold text-[var(--accent-1)] mb-2">Ecommerce</h3>
                <p className="text-sm text-[var(--muted)]">
                  Product photos on Amazon, Etsy, and eBay rank better and convert higher when larger and sharper. Upscale product images to 2400×2400px to show texture detail competitors miss.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent-1)] mb-2">Social Media</h3>
                <p className="text-sm text-[var(--muted)]">
                  Instagram, TikTok, and Pinterest demand high-resolution assets. Transform smartphone photos into crisp, professional-looking content without reshooting.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent-1)] mb-2">Photo Restoration</h3>
                <p className="text-sm text-[var(--muted)]">
                  Old family photos, historical images, and scanned documents come back to life. Reveal details hidden in compressed originals and create print-ready versions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent-1)] mb-2">Screenshots & Docs</h3>
                <p className="text-sm text-[var(--muted)]">
                  Tutorials and documentation need crisp, readable screenshots. Standard scaling makes text blurry. AI upscaling keeps every letter sharp and professional.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent-1)] mb-2">Print Production</h3>
                <p className="text-sm text-[var(--muted)]">
                  Print requires 300 DPI. Web images are 72 DPI. Upscale to the dimensions you need without reshooting. Works for posters, banners, and large-format prints.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--accent-1)] mb-2">Portfolio & Art</h3>
                <p className="text-sm text-[var(--muted)]">
                  Showcase your work at larger sizes for galleries and online portfolios. Crisp, sharp output that doesn't look artificially smoothed or pixelated.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
              <h2 className="text-2xl font-extrabold mb-4">Why photographers choose PhotoEnhance</h2>
              <ul className="space-y-3 text-sm text-[var(--muted)]">
                <li className="flex items-start">
                  <span className="text-[var(--accent-1)] font-bold mr-3">✓</span>
                  <span>Photos stay private—no uploads, no storage, no tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-1)] font-bold mr-3">✓</span>
                  <span>See the before/after slider before downloading anything</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-1)] font-bold mr-3">✓</span>
                  <span>Works instantly—no waiting for email or account creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--accent-1)] font-bold mr-3">✓</span>
                  <span>Completely free with transparent, lightweight ads</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
              <h2 className="text-2xl font-extrabold mb-4">How AI upscaling works</h2>
              <p className="text-sm text-[var(--muted)] mb-3">
                Traditional scaling (stretch, interpolate) just guesses what enlarged pixels should look like. AI upscaling is smarter:
              </p>
              <ol className="space-y-2 text-sm text-[var(--muted)] list-decimal list-inside">
                <li>Neural networks trained on millions of high-quality images</li>
                <li>Models learn patterns: edges, textures, details, color transitions</li>
                <li>When you upscale, the AI reconstructs missing information intelligently</li>
                <li>Result: sharp, natural-looking enlargement, not blurry stretching</li>
              </ol>
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

        <section className="mx-auto max-w-6xl px-6 py-16 bg-gradient-to-r from-[var(--accent-1)]/10 to-[var(--accent-2)]/10 rounded-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-3">Learn Image Enhancement</h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Discover professional techniques, best practices, and the science behind AI image enhancement.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Link 
              href="/how-to-upscale-image" 
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg hover:shadow-xl hover:border-[var(--accent-1)] transition-all"
            >
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">How to Upscale Images</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Complete step-by-step guide covering x2, x4, x6 scaling, best practices, and troubleshooting for every use case.
              </p>
              <span className="text-sm font-semibold text-[var(--accent-1)]">Read the Guide →</span>
            </Link>
            <Link 
              href="/image-enhancement-guide" 
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg hover:shadow-xl hover:border-[var(--accent-1)] transition-all"
            >
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">Image Enhancement Techniques</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Professional enhancement methods, AI sharpening explained, texture preservation, and enhancement by use case.
              </p>
              <span className="text-sm font-semibold text-[var(--accent-1)]">Read the Guide →</span>
            </Link>
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
