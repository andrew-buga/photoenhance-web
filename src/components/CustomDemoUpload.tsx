"use client";

import { useRef, useState } from "react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function CustomDemoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 12MB like the API)
    if (file.size > 12 * 1024 * 1024) {
      alert("Image must be smaller than 12MB");
      return;
    }

    setIsLoading(true);

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImageUrl(dataUrl);
      setIsLoading(false);
    };
    reader.onerror = () => {
      alert("Failed to read file");
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setImageUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold">Try It Yourself</h2>
        <p className="mt-2 text-[var(--muted)]">
          Upload your own photo to see the enhancement effect instantly.
        </p>
      </div>

      {!imageUrl ? (
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-2xl">
            <label
              htmlFor="demo-upload"
              className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-12 cursor-pointer transition-colors hover:border-blue-400 hover:bg-[var(--surface-2)]"
            >
              <svg
                className="h-12 w-12 text-[var(--muted)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="text-center">
                <p className="text-lg font-semibold text-[var(--text)]">
                  {isLoading ? "Processing..." : "Click to upload photo"}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  PNG, JPG, WEBP, BMP (max 12MB)
                </p>
              </div>
              <input
                ref={inputRef}
                id="demo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isLoading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-lg">
            <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden">
              <BeforeAfterSlider
                beforeUrl={imageUrl}
                afterUrl={imageUrl}
                alt="Your photo"
                aspectRatio="4/3"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold">Your Enhancement</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Left side (blurred) vs Right side (enhanced). Drag the slider to compare.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--text)] transition-colors hover:bg-[var(--surface-2)]"
            >
              Upload Another Photo
            </button>
            <button
              onClick={() => {
                window.location.href = "/enhance";
              }}
              className="flex-1 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Enhance This Photo
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
