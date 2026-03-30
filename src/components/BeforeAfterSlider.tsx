"use client";

import { useRef, useState } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Log image dimensions for debugging
  const handleAfterImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (process.env.NODE_ENV === 'development') {
      console.log(`[BeforeAfterSlider] After (enhanced) image loaded: ${img.naturalWidth}x${img.naturalHeight}`);
    }
  };

  const handleBeforeImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (process.env.NODE_ENV === 'development') {
      console.log(`[BeforeAfterSlider] Before (original) image loaded: ${img.naturalWidth}x${img.naturalHeight}`);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const newPosition = ((touch.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setPosition((prev) => Math.max(0, prev - 5));
        break;
      case "ArrowRight":
        e.preventDefault();
        setPosition((prev) => Math.min(100, prev + 5));
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-black shadow-2xl"
      style={aspectRatio ? { aspectRatio } : { aspectRatio: "16/10" }}
      role="slider"
      aria-label="Image comparison: drag to compare original and enhanced photos"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onKeyDown={handleKeyDown}
    >
      {/* After Image (Background) - the enhanced version */}
      <img
        src={afterUrl}
        alt={`${alt} - Enhanced`}
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        onLoad={handleAfterImageLoad}
        draggable={false}
      />

      {/* Before Image (Overlay) - the original version, clipped by position */}
      <img
        src={beforeUrl}
        alt={`${alt} - Original`}
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
        onLoad={handleBeforeImageLoad}
        draggable={false}
      />

      {/* Divider Line */}
      <div
        className="absolute inset-y-0 w-1 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Draggable Handle */}
      <div
        className={`absolute inset-y-0 flex items-center transition-opacity ${
          isDragging ? "opacity-100" : "opacity-70 hover:opacity-100"
        }`}
        style={{ left: `${position}%`, transform: "translateX(-50%)", cursor: "ew-resize" }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
          <svg
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19l7-7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute top-4 left-4 flex flex-col gap-1">
        <div className="text-xs font-semibold uppercase tracking-widest text-white drop-shadow-lg">
          Original
        </div>
        <div className="text-2xl font-bold text-white drop-shadow-lg">Before</div>
      </div>

      <div className="pointer-events-none absolute top-4 right-4 flex flex-col gap-1 text-right">
        <div className="text-xs font-semibold uppercase tracking-widest text-white drop-shadow-lg">
          Enhanced
        </div>
        <div className="text-2xl font-bold text-white drop-shadow-lg">After</div>
      </div>

      {/* Click hint (hidden on mobile) */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="text-xs font-medium text-white/70 drop-shadow-lg">
          Drag to compare
        </div>
      </div>
    </div>
  );
}
