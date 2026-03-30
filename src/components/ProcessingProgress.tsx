"use client";

type ProcessingProgressProps = {
  progress: number;
  adSeconds: number;
  showAlmostDone?: boolean;
};

export default function ProcessingProgress({
  progress,
  adSeconds,
  showAlmostDone = false,
}: ProcessingProgressProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
      {/* Enhancing message */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-[var(--text)]">
          Enhancing image...
        </div>
        {adSeconds > 0 && (
          <span className="text-xs font-semibold text-[var(--muted)]">
            Ad closes in {adSeconds}s
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--surface)] shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress text */}
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span>Processing...</span>
        <span className="font-semibold">{progress}%</span>
      </div>

      {/* Almost done message */}
      {showAlmostDone && progress > 90 && (
        <div className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-3 text-xs font-semibold text-blue-600 dark:text-blue-400">
          ✓ Almost done! Preparing your result...
        </div>
      )}

      <p className="text-xs text-[var(--muted)]">
        Average processing time: 4-6 seconds
      </p>
    </div>
  );
}
