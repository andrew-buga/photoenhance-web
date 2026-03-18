import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 text-sm text-[var(--muted)] md:flex-row md:items-center">
        <div>
          <div className="text-base font-bold text-[var(--text)]">PhotoEnhance</div>
          <p className="mt-1 max-w-md">
            Free AI photo upscaling for everyday photos, social media, and
            ecommerce.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 font-semibold">
          <Link href="/privacy" className="transition hover:text-[var(--text)]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-[var(--text)]">
            Terms
          </Link>
          <Link href="/cookies" className="transition hover:text-[var(--text)]">
            Cookies
          </Link>
          <Link href="/how-to-upscale-image" className="transition hover:text-[var(--text)]">
            Guide
          </Link>
          <Link href="/contact" className="transition hover:text-[var(--text)]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
