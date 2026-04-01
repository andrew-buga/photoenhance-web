"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FileUploadSection from "@/components/FileUploadSection";
import ScaleSelector from "@/components/ScaleSelector";
import ProcessingProgress from "@/components/ProcessingProgress";
import ResultsDisplay from "@/components/ResultsDisplay";
import useAnalytics from "@/components/useAnalytics";
import { getCSRFToken } from "@/lib/csrf";

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

  // Get CSRF token for security
  const csrfToken = await getCSRFToken();

  const response = await fetch("/api/upscale", {
    method: "POST",
    headers: {
      "x-csrf-token": csrfToken,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { error?: string };
    const errorMessage = errorData.error || "Upscale API request failed";
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as { outputUrl?: string };
  if (!data.outputUrl) {
    throw new Error("No output returned");
  }

  return data.outputUrl;
}

export default function EnhanceTool() {
  // State
  const [phase, setPhase] = useState<Phase>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [afterPreviewUrl, setAfterPreviewUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [scale, setScale] = useState<(typeof SCALE_OPTIONS)[number]>(4);
  const [progress, setProgress] = useState(0);
  const [adSeconds, setAdSeconds] = useState(4);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showAlmostDone, setShowAlmostDone] = useState(false);

  const successTrackedRef = useRef(false);
  const { track } = useAnalytics();

  // Cleanup
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

  // Timers
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

  // Analytics
  useEffect(() => {
    if (phase === "done" && !successTrackedRef.current) {
      track({ action: "enhance_success", category: "enhance", label: `x${scale}` });
      successTrackedRef.current = true;
    }
  }, [phase, scale, track]);

  // Load file from upload navigation (window.__uploadedFile or sessionStorage)
  useEffect(() => {
    if (phase !== "idle") return; // Only do this on initial load

    // Method 1: Check window.__uploadedFile (fastest, from navigation)
    const uploadedFile = (window as any).__uploadedFile as File | undefined;
    if (uploadedFile) {
      handleFileSelect(uploadedFile);
      delete (window as any).__uploadedFile; // Clean up
      return;
    }

    // Method 2: Check sessionStorage (backup)
    const fileName = sessionStorage.getItem("upload-file-name");
    if (fileName) {
      try {
        // Just tell user to re-upload if we can't access the file
        console.log("File metadata found but full file not available. Please re-upload.");
      } finally {
        sessionStorage.removeItem("upload-file-name");
        sessionStorage.removeItem("upload-file-size");
      }
    }
  }, [phase, handleFileSelect]);

  // Memoized
  const outputSize = useMemo(() => {
    if (!imageSize) return null;
    return { width: imageSize.width * scale, height: imageSize.height * scale };
  }, [imageSize, scale]);

  const downloadName = useMemo(() => {
    if (!file) return "photoenhance_x4";
    const extIndex = file.name.lastIndexOf(".");
    const base = extIndex > 0 ? file.name.slice(0, extIndex) : file.name;
    const ext = extIndex > 0 ? file.name.slice(extIndex) : ".jpg";
    return `${base}_x${scale}${ext}`;
  }, [file, scale]);

  // Handlers
  const handleFileSelect = useCallback((selectedFile: File) => {
    successTrackedRef.current = false;
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setPhase("ready");
    setProgress(0);
    setErrorMessage("");
    setShowAlmostDone(false);
    setAfterPreviewUrl(null);
    setScale(4);
    track({ action: "upload", category: "enhance" });
    const img = new Image();
    img.onload = () => setImageSize({ width: img.width, height: img.height });
    img.src = url;
  }, [track]);

  const handleEnhance = useCallback(async () => {
    if (!file || !previewUrl) return;
    track({ action: "enhance_started", category: "enhance", label: `x${scale}` });
    setPhase("processing");
    setProgress(8);
    setAdSeconds(4);
    setErrorMessage("");
    try {
      let outputUrl: string;
      try {
        outputUrl = await requestUpscale(file, scale);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        // Check for specific security errors
        if (errorMessage.includes("Too many requests")) {
          throw new Error("Too many requests. Please wait before trying again.");
        }
        if (errorMessage.includes("CSRF validation failed")) {
          throw new Error("Security validation failed. Please refresh the page and try again.");
        }
        if (errorMessage.includes("appears to be corrupted")) {
          throw new Error("File appears invalid or corrupted. Please try another image.");
        }
        
        // Fallback to client-side upscaling
        outputUrl = await createLocalUpscale(file, scale);
      }
      setAfterPreviewUrl(outputUrl);
      setProgress(100);
      setPhase("done");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Processing failed. Please try another image or a different scale.";
      setErrorMessage(message);
      setPhase("error");
      track({ action: "enhance_error", category: "enhance", label: scale.toString() });
    }
  }, [file, previewUrl, scale, track]);

  const handleReset = useCallback(() => {
    setPhase("idle");
    setFile(null);
    setPreviewUrl(null);
    setAfterPreviewUrl(null);
    setImageSize(null);
    setScale(4);
    setProgress(0);
    setAdSeconds(4);
    setErrorMessage("");
    setShowAlmostDone(false);
    successTrackedRef.current = false;
  }, []);

  const handleDownload = useCallback(() => {
    track({ action: "download_clicked", category: "enhance" });
  }, [track]);

  // Render phases
  if (phase === "idle") {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] md:text-4xl">
              Upload. Enhance. Download.
            </h1>
            <p className="mt-3 text-base text-[var(--muted)]">
              Paste, drag, or choose a photo. No signup required and no permanent upload storage.
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--muted)]">Average processing: 4-6 seconds.</p>
          </div>
          <FileUploadSection onFileSelect={handleFileSelect} />
        </div>
      </div>
    );
  }

  if (phase === "ready") {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text)]">Enhance your image</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Preview and select enhancement level</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-black shadow-lg overflow-hidden">
            <img src={previewUrl!} alt="Uploaded" className="w-full h-auto max-h-[400px] object-contain" />
          </div>
          <ScaleSelector selectedScale={scale} onScaleChange={setScale} imageSize={imageSize} />
          {errorMessage && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleEnhance}
              className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              Enhance
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 font-semibold text-[var(--text)] transition-all hover:bg-[var(--surface)]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "processing") {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text)]">Processing</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Please wait while we enhance your photo...</p>
          </div>
          <ProcessingProgress progress={progress} adSeconds={adSeconds} showAlmostDone={showAlmostDone} />
        </div>
      </div>
    );
  }

  if (phase === "done" && afterPreviewUrl && previewUrl) {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text)]">Your enhanced image</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Drag the slider to compare</p>
          </div>
          <ResultsDisplay
            beforeUrl={previewUrl}
            afterUrl={afterPreviewUrl}
            downloadName={downloadName}
            outputSize={outputSize}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        </div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text)]">Processing failed</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">{errorMessage || "An error occurred"}</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:-translate-y-1"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
