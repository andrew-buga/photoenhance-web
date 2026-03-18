type AdSlotProps = {
  label?: string;
  size?: "banner" | "square" | "wide";
};

const sizeClasses: Record<NonNullable<AdSlotProps["size"]>, string> = {
  banner: "h-24",
  square: "h-64",
  wide: "h-40",
};

export default function AdSlot({ label = "Ad slot", size = "wide" }: AdSlotProps) {
  return (
    <div
      className={`flex ${sizeClasses[size]} w-full items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] text-sm font-semibold uppercase tracking-widest text-[var(--muted)]`}
    >
      {label}
    </div>
  );
}
