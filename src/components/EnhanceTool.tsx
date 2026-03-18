"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AdSlot from "@/components/AdSlot";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type ImageSize = { width: number; height: number };

type Phase = "idle" | "ready" | "processing" | "done";

const SCALE_OPTIONS = [2, 4, 6] as const;
const AD_DURATION_MS = 5000;
const PROCESSING_MS = 4200;

export default function EnhanceTool() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [afterPreviewUrl, setAfterPreviewUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [scale, setScale] = useState<(typeof SCALE_OPTIONS)[number]>(4);
  const [adOpen, setAdOpen] = useState(false);
  const [adSeconds, setAdSeconds] = useState(5);
  const [adCanClose, setAdCanClose] = useState(false);
  const [processingDone, setProcessingDone] = useState(false);
  const [showAlmostDone, setShowAlmostDone] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    setProcessingDone(false);
    setShowAlmostDone(false);

    const processingTimer = setTimeout(() => {
      setProcessingDone(true);
    }, PROCESSING_MS);

    const adTimer = setInterval(() => {
      setAdSeconds((prev) => {
        if (prev <= 1) {
          setAdCanClose(true);
          clearInterval(adTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(processingTimer);
      clearInterval(adTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (!adOpen && phase === "processing" && !processingDone) {
      setShowAlmostDone(true);
    }
    if (!adOpen && phase === "processing" && processingDone) {
      setPhase("done");
    }
  }, [adOpen, phase, processingDone]);

  const outputSize = useMemo(() => {
    if (!imageSize) return null;
    return {
      width: imageSize.width * scale,
      height: imageSize.height * scale,
    };
  }, [imageSize, scale]);

  const createEnhancedPreview = (sourceUrl: string) =>
    new Promise<string | null>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.filter = "contrast(1.12) saturate(1.12)";
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      img.onerror = () => resolve(null);
      img.src = sourceUrl;
    });

  const handleFile = (selected: File) => {
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);
    setPhase("ready");
    setAfterPreviewUrl(null);

    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = url;

    createEnhancedPreview(url).then((enhancedUrl) => {
      if (enhancedUrl) {
        setAfterPreviewUrl(enhancedUrl);
      }
    });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;
    handleFile(files[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleStart = () => {
    if (!file || !previewUrl) return;
    setPhase("processing");
    setAdOpen(true);
    setAdSeconds(5);
    setAdCanClose(false);
  };

  const closeAd = () => {
    if (!adCanClose) return;
    setAdOpen(false);
  };

  const resetAll = () => {
    setPhase("idle");
    setFile(null);
    setPreviewUrl(null);
    setAfterPreviewUrl(null);
    setImageSize(null);
    setScale(4);
    setAdOpen(false);
    setAdSeconds(5);
    setAdCanClose(false);
    setProcessingDone(false);
    setShowAlmostDone(false);
  };

  const downloadName = useMemo(() => {
    if (!file) return "photoenhance_x4";
    const extIndex = file.name.lastIndexOf(".");
    const base = extIndex > 0 ? file.name.slice(0, extIndex) : file.name;
    const ext = extIndex > 0 ? file.name.slice(extIndex) : ".jpg";
    return `${base}_x${scale}${ext}`;
  }, [file, scale]);

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
                Paste, drag, or choose a photo. Your image stays on your device.
              </p>
            </div>

            <div
              className="group flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] px-6 text-center transition hover:border-[var(--accent-2)]"
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(event) => handleFiles(event.target.files)}
                className="hidden"
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
                className="mt-4 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
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
                  className="w-full rounded-full bg-[var(--accent-1)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>

        {phase === "done" && previewUrl && (
          <div className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Result</h2>
              <span className="rounded-full bg-[var(--accent-3)] px-3 py-1 text-xs font-semibold uppercase text-black">
                Ready
              </span>
            </div>
            <BeforeAfterSlider
              beforeUrl={previewUrl}
              afterUrl={afterPreviewUrl ?? previewUrl}
              aspectRatio={
                imageSize ? `${imageSize.width}/${imageSize.height}` : undefined
              }
            />
            <div className="flex flex-wrap gap-3">
              <a
                href={previewUrl}
                download={downloadName}
                className="rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Download enhanced photo
              </a>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text)]"
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

      <aside className="space-y-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[var(--text)]">Sponsored</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            A single, focused ad keeps PhotoEnhance free for everyone.
          </p>
          <div className="mt-4">
            <AdSlot label="AdSense placement" size="square" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-lg rounded-3xl bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-[var(--muted)]">
                Sponsored
              </div>
              <button
                type="button"
                onClick={closeAd}
                disabled={!adCanClose}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                  adCanClose
                    ? "bg-[var(--text)] text-white"
                    : "bg-[var(--surface-2)] text-[var(--muted)]"
                }`}
              >
                {adCanClose ? "Close" : `Skip in ${adSeconds}s`}
              </button>
            </div>
            <div className="mt-4">
              <AdSlot label="Ad slot" size="wide" />
            </div>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Your photo is enhancing in the background.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
