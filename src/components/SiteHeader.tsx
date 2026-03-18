import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          PhotoEnhance
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--muted)] md:flex">
          <Link href="/enhance" className="transition hover:text-[var(--text)]">
            Enhance
          </Link>
          <Link
            href="/how-to-upscale-image"
            className="transition hover:text-[var(--text)]"
          >
            Guide
          </Link>
          <Link href="/#how" className="transition hover:text-[var(--text)]">
            How it works
          </Link>
          <Link href="/#faq" className="transition hover:text-[var(--text)]">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/enhance"
            className="hidden min-h-12 items-center rounded-full bg-[var(--text)] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg md:inline-flex"
          >
            Enhance Photo - Free
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
