"use client";

import { useState } from "react";

type BeforeAfterSliderProps = {
  beforeUrl: string;
  afterUrl: string;
  alt?: string;
  aspectRatio?: string;
};

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  alt = "Photo preview",
  aspectRatio,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-lg"
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={afterUrl}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeUrl}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `calc(${position}% - 1px)` }}
      >
        <div className="h-full w-1 bg-white/90 shadow-[0_0_16px_rgba(0,0,0,0.35)]" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 flex items-center"
        style={{ left: `calc(${position}% - 28px)` }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-[var(--text)] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <span className="sr-only">Drag</span>
          <span aria-hidden>↔</span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 touch-none"
        aria-label="Before after slider"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
        Before
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
        After
      </div>
    </div>
  );
}
