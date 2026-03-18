import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { demoItems } from "@/components/demoData";

export default function HeroPreview() {
  const item = demoItems[0];
  return (
    <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">
      <div className="rounded-3xl bg-[var(--surface-2)] p-4">
        <div className="mb-3 text-sm font-semibold text-[var(--muted)]">Live upscale preview</div>
        <BeforeAfterSlider
          beforeUrl={item.beforeUrl}
          afterUrl={item.afterUrl}
          alt={item.title}
          aspectRatio={item.aspectRatio}
        />
      </div>
      <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--muted)]">
        Free AI Upscale in 5s - No signup required.
      </div>
    </div>
  );
}
