"use client";

import { useRef } from "react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type ResultsDisplayProps = {
  beforeUrl: string;
  afterUrl: string;
  downloadName: string;
  outputSize?: { width: number; height: number } | null;
  onDownload: () => void;
  onReset: () => void;
};

export default function ResultsDisplay({
  beforeUrl,
  afterUrl,
  downloadName,
  outputSize,
  onDownload,
  onReset,
}: ResultsDisplayProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDownloadClick = () => {
    onDownload();
    // Auto-scroll to slider for better UX
    setTimeout(() => {
      sliderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Before/After Slider */}
      <div ref={sliderRef} className="rounded-2xl overflow-hidden border border-[var(--border)]">
        <BeforeAfterSlider
          beforeUrl={beforeUrl}
          afterUrl={afterUrl}
          alt="Before and after enhancement comparison"
          aspectRatio="16/10"
        />
      </div>

      {/* Output info */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-4">
          <div className="text-sm font-semibold text-[var(--text)]">
            Enhanced image
          </div>
          {outputSize && (
            <div className="mt-1 text-sm text-[var(--muted)]">
              {outputSize.width} × {outputSize.height} px
            </div>
          )}
        </div>

        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownloadClick}
          className="w-full rounded-full bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:shadow-green-500/40 hover:-translate-y-1"
        >
          <svg
            className="inline-block h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download {downloadName}
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--text)] transition-all hover:bg-[var(--surface-2)]"
        >
          Try another image
        </button>
      </div>
    </div>
  );
}
