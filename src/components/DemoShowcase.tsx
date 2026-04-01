import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { demoItems } from "@/components/demoData";

export default function DemoShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold">Real Before/After Examples</h2>
          <p className="mt-2 text-[var(--muted)]">
            Portraits, product photos, old images, and text screenshots.
          </p>
        </div>
        <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Drag the slider
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {demoItems.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-lg"
          >
            <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden">
              <BeforeAfterSlider
                beforeUrl={item.beforeUrl}
                afterUrl={item.afterUrl}
                alt={item.title}
                aspectRatio={item.aspectRatio}
              />
            </div>
            <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
