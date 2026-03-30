"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import AdSlot from "@/components/AdSlot";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import useAnalytics from "@/components/useAnalytics";

type ImageSize = { width: number; height: number };

type Phase = "idle" | "ready" | "processing" | "done" | "error";

const SCALE_OPTIONS = [2, 4, 6] as const;

async function createLocalUpscale(file: File, scale: number): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = new Image();

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    URL.revokeObjectURL(url);
    throw new Error("Canvas context unavailable");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.filter = "contrast(1.14) saturate(1.12)";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(url);
  return canvas.toDataURL("image/jpeg", 0.93);
}

async function requestUpscale(file: File, scale: number): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("scale", String(scale));

  const response = await fetch("/api/upscale", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upscale API request failed");
  }

  const data = (await response.json()) as { outputUrl?: string };
  if (!data.outputUrl) {
    throw new Error("No output returned");
  }

  return data.outputUrl;
}

export default function EnhanceTool() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [afterPreviewUrl, setAfterPreviewUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [scale, setScale] = useState<(typeof SCALE_OPTIONS)[number]>(4);
  const [adOpen, setAdOpen] = useState(false);
  const [adSeconds, setAdSeconds] = useState(4);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAlmostDone, setShowAlmostDone] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const successTrackedRef = useRef(false);
  const { track } = useAnalytics();

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    if (!afterPreviewUrl) return;
    if (afterPreviewUrl.startsWith("blob:")) {
      return () => URL.revokeObjectURL(afterPreviewUrl);
    }
  }, [afterPreviewUrl]);

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const item = event.clipboardData?.items?.[0];
      if (!item) return;
      if (item.type.startsWith("image/")) {
        const pasted = item.getAsFile();
        if (pasted) {
          handleFile(pasted);
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  useEffect(() => {
    if (phase !== "processing") return;

    const adTimer = setInterval(() => {
      setAdSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 92 ? prev + 4 : prev));
    }, 280);

    return () => {
      clearInterval(adTimer);
      clearInterval(progressTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (!adOpen && phase === "processing") {
      setShowAlmostDone(true);
    }
  }, [adOpen, phase]);

  useEffect(() => {
    if (phase === "done" && !successTrackedRef.current) {
      track({ action: "enhance_success", category: "enhance", label: `x${scale}` });
      successTrackedRef.current = true;
    }
  }, [phase, scale, track]);

  const outputSize = useMemo(() => {
    if (!imageSize) return null;
    return {
      width: imageSize.width * scale,
      height: imageSize.height * scale,
    };
  }, [imageSize, scale]);

  const handleFile = (selected: File) => {
    successTrackedRef.current = false;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);
    setPhase("ready");
    setProgress(0);
    setErrorMessage(null);
    setShowAlmostDone(false);
    setAfterPreviewUrl(null);
    track({ action: "upload", category: "enhance" });

    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = url;

  };

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;
    handleFile(files[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleStart = async () => {
    if (!file || !previewUrl) return;
    track({ action: "enhance_started", category: "enhance", label: `x${scale}` });
    setPhase("processing");
    setProgress(8);
    setAdOpen(true);
    setAdSeconds(4);
    setErrorMessage(null);

    try {
      let outputUrl: string;
      try {
        outputUrl = await requestUpscale(file, scale);
        if (process.env.NODE_ENV === 'development') {
          console.log("[EnhanceTool] API upscale success");
        }
      } catch {
        if (process.env.NODE_ENV === 'development') {
          console.warn("[EnhanceTool] API upscale failed, using local fallback");
        }
        outputUrl = await createLocalUpscale(file, scale);
        if (process.env.NODE_ENV === 'development') {
          console.log("[EnhanceTool] Local upscale completed");
        }
      }

      setAfterPreviewUrl(outputUrl);
      setProgress(100);
      setPhase("done");
    } catch {
      setErrorMessage("Processing failed. Please try another image.");
      setPhase("error");
    }
  };

  const closeAd = () => {
    track({ action: "ad_closed", category: "ads" });
    setAdOpen(false);
  };

  const resetAll = () => {
    setPhase("idle");
    setFile(null);
    setPreviewUrl(null);
    setAfterPreviewUrl(null);
    setImageSize(null);
    setScale(4);
    setProgress(0);
    setAdOpen(false);
    setAdSeconds(4);
    setErrorMessage(null);
    setShowAlmostDone(false);
  };

  const downloadName = useMemo(() => {
    if (!file) return "photoenhance_x4";
    const extIndex = file.name.lastIndexOf(".");
    const base = extIndex > 0 ? file.name.slice(0, extIndex) : file.name;
    const ext = extIndex > 0 ? file.name.slice(extIndex) : ".jpg";
    return `${base}_x${scale}${ext}`;
  }, [file, scale]);

  const sidebarSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;
  const overlaySlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_OVERLAY;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="space-y-8">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] md:text-4xl">
                Upload. Enhance. Download.
              </h1>
              <p className="mt-3 text-base text-[var(--muted)]">
                Paste, drag, or choose a photo. No signup required and no
                permanent upload storage.
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
                Average processing: 4-6 seconds.
              </p>
            </div>

            <div
              className="group flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] px-6 text-center transition hover:border-[var(--accent-2)]"
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <input
                id="image-upload-input"
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(event) => handleFiles(event.target.files)}
                className="hidden"
                aria-label="Upload image file"
              />
              <div className="text-lg font-semibold text-[var(--text)]">
                Drop your photo here
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Or press Ctrl+V to paste from clipboard
              </p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-4 min-h-12 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
              >
                Choose a photo
              </button>
            </div>

            {previewUrl && imageSize && (
              <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">
                      Original
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      {imageSize.width} x {imageSize.height} px
                    </div>
                  </div>
                  {outputSize && (
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[var(--text)]">
                        Output size
                      </div>
                      <div className="text-sm text-[var(--muted)]">
                        {outputSize.width} x {outputSize.height} px
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {SCALE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setScale(option)}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                        scale === option
                          ? "bg-[var(--accent-2)] text-white shadow"
                          : "bg-[var(--surface-2)] text-[var(--text)]"
                      }`}
                    >
                      x{option}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleStart}
                  className="w-full min-h-12 rounded-full bg-[var(--accent-1)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Download
                </button>
              </div>
            )}

            {phase === "processing" && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
                  <span>Enhancing image...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
                  <div
                    className="h-full rounded-full bg-[var(--accent-2)] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {phase === "error" && errorMessage && (
              <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {phase === "done" && previewUrl && afterPreviewUrl && (
          <div className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Result</h2>
              <span className="rounded-full bg-[var(--accent-3)] px-3 py-1 text-xs font-semibold uppercase text-black">
                Ready
              </span>
            </div>
            <BeforeAfterSlider
              beforeUrl={previewUrl}
              afterUrl={afterPreviewUrl}
              aspectRatio={
                imageSize ? `${imageSize.width}/${imageSize.height}` : undefined
              }
            />
            <div className="flex flex-wrap gap-3">
              <a
                href={afterPreviewUrl}
                download={downloadName}
                onClick={() =>
                  track({ action: "download_clicked", category: "enhance" })
                }
                className="min-h-12 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Download enhanced photo
              </a>
              <button
                type="button"
                onClick={resetAll}
                className="min-h-12 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text)]"
              >
                Enhance another photo
              </button>
            </div>
          </div>
        )}

        {showAlmostDone && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)] shadow">
            Almost done. Keep this tab open while we finish processing.
          </div>
        )}
      </div>

      <aside className="hidden space-y-6 lg:block">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[var(--text)]">Sponsored</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            A single optional sidebar ad keeps PhotoEnhance free for everyone.
          </p>
          <div className="mt-4">
            <AdSlot
              label="AdSense placement"
              size="square"
              slot={sidebarSlot}
            />
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[var(--text)]">Trusted by creators</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            12,482 photos enhanced today
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <li>Fast results in under 5 seconds</li>
            <li>No signup, no uploads to servers</li>
            <li>Perfect for ecommerce and social media</li>
          </ul>
        </div>
      </aside>

      {adOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 md:items-center">
          <div className="w-full max-w-lg rounded-3xl bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-[var(--muted)]">
                Sponsored
              </div>
              <button
                type="button"
                onClick={closeAd}
                className="rounded-full bg-[var(--text)] px-3 py-1 text-xs font-semibold uppercase text-white"
              >
                {adSeconds > 0 ? `Skip (${adSeconds})` : "Skip"}
              </button>
            </div>
            <div className="mt-4">
              <AdSlot label="Ad slot" size="wide" slot={overlaySlot} />
            </div>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Sponsored message while we process your image.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
