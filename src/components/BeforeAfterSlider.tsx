"use client";

import { forwardRef, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeUrl: string;
  afterUrl: string;
  alt?: string;
  aspectRatio?: string;
};

export default forwardRef<HTMLDivElement, BeforeAfterSliderProps>(
  function BeforeAfterSlider(
    { beforeUrl, afterUrl, alt = "Photo preview", aspectRatio }: BeforeAfterSliderProps,
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [beforeLoaded, setBeforeLoaded] = useState(false);
    const [afterLoaded, setAfterLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleTouchEnd = () => {
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
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
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

    if (loadError) {
      return (
        <div
          className="relative w-full bg-slate-300 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-center p-6"
          style={aspectRatio ? { aspectRatio } : { aspectRatio: "16/10" }}
        >
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <p className="font-semibold mb-2">Unable to load image</p>
            <p className="text-xs">Please check your internet connection</p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref || containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-black shadow-2xl select-none"
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
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
      >
        {/* Loading state */}
        {(!beforeLoaded || !afterLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* After Image (Background) - the enhanced version */}
        <img
          src={afterUrl}
          alt={`${alt} - Enhanced`}
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          onLoad={() => setAfterLoaded(true)}
          onError={() => setLoadError(true)}
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
          onLoad={() => setBeforeLoaded(true)}
          onError={() => setLoadError(true)}
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
          onTouchStart={handleTouchStart}
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
);
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
);
