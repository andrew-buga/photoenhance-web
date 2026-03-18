import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "How To Upscale Image Online Free",
  description:
    "Learn how to upscale images online with AI, improve clarity, and keep quality for social media, print, and ecommerce.",
  alternates: {
    canonical: "/how-to-upscale-image",
  },
};

export default function HowToUpscaleImagePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I upscale an image without losing quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use an AI image upscaler that predicts high-frequency details rather than simple pixel stretching.",
        },
      },
      {
        "@type": "Question",
        name: "Is PhotoEnhance free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. PhotoEnhance is free and supported by ads.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <article className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
          <h1 className="text-4xl font-extrabold tracking-tight">How to Upscale Image Online Free</h1>
          <p className="mt-4 text-[var(--muted)]">
            AI upscaling improves image resolution while preserving texture,
            edges, and readability. This guide explains when to use x2, x4, or
            x6 and how to prepare photos for the best result.
          </p>

          <h2 className="mt-10 text-2xl font-bold">Step-by-step process</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-[var(--muted)]">
            <li>Upload or paste your image.</li>
            <li>Select the target scale (x2, x4, x6).</li>
            <li>Enhance and review with the before/after slider.</li>
            <li>Download the final output.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold">Best practices</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-[var(--muted)]">
            <li>Start with the highest-quality original available.</li>
            <li>Use x2 for web, x4 for product photos, x6 for prints.</li>
            <li>Review text edges and skin tones before exporting.</li>
          </ul>

          <div className="mt-10 rounded-2xl bg-[var(--surface-2)] p-6">
            <h3 className="text-xl font-bold">Try it now</h3>
            <p className="mt-2 text-[var(--muted)]">
              Ready to upscale your image? Use the tool and compare the result in seconds.
            </p>
            <Link
              href="/enhance"
              className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[var(--accent-1)] px-6 py-3 text-sm font-semibold text-white"
            >
              Open PhotoEnhance Tool
            </Link>
          </div>
        </article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
