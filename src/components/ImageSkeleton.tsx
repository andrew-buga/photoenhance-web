/**
 * Skeleton loader for image preview areas
 * Shows animated placeholder while image is loading
 */

export default function ImageSkeleton() {
  return (
    <div
      className="w-full rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--surface-2)] via-[var(--surface)] to-[var(--surface-2)] shadow-lg"
      style={{
        aspectRatio: "16 / 9",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
  );
}
