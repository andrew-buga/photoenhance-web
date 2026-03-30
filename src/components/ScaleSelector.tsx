"use client";

const SCALE_OPTIONS = [2, 4, 6] as const;

type ScaleSelectorProps = {
  selectedScale: (typeof SCALE_OPTIONS)[number];
  onScaleChange: (scale: (typeof SCALE_OPTIONS)[number]) => void;
  imageSize?: { width: number; height: number } | null;
  isDisabled?: boolean;
};

export default function ScaleSelector({
  selectedScale,
  onScaleChange,
  imageSize,
  isDisabled = false,
}: ScaleSelectorProps) {
  const outputSize = imageSize
    ? {
        width: imageSize.width * selectedScale,
        height: imageSize.height * selectedScale,
      }
    : null;

  return (
    <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      {/* Size info */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-[var(--text)]">
            Original
          </div>
          {imageSize && (
            <div className="text-sm text-[var(--muted)]">
              {imageSize.width} × {imageSize.height} px
            </div>
          )}
        </div>
        {outputSize && (
          <div className="text-right">
            <div className="text-sm font-semibold text-[var(--text)]">
              Output size
            </div>
            <div className="text-sm text-[var(--muted)]">
              {outputSize.width} × {outputSize.height} px
            </div>
          </div>
        )}
      </div>

      {/* Scale buttons */}
      <div className="flex flex-wrap gap-3">
        {SCALE_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onScaleChange(option)}
            disabled={isDisabled}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              selectedScale === option
                ? "bg-[var(--accent-1)] text-white shadow-lg"
                : "bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--accent-2)]/20"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            ×{option}
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--muted)]">
        Higher scale = larger output file & longer processing time
      </p>
    </div>
  );
}
