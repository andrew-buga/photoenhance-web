"use client";

import { useCallback, useEffect, useRef } from "react";

type FileUploadSectionProps = {
  onFileSelect: (file: File) => void;
  isDisabled?: boolean;
};

export default function FileUploadSection({
  onFileSelect,
  isDisabled = false,
}: FileUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!isDisabled) {
        onFileSelect(file);
      }
    },
    [onFileSelect, isDisabled]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || !files[0]) return;
      handleFile(files[0]);
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleFiles(event.dataTransfer.files);
    },
    [handleFiles]
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const item = event.clipboardData?.items?.[0];
      if (!item) return;
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          handleFile(file);
        }
      }
    },
    [handleFile]
  );

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  return (
    <div
      className="group flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 transition-all duration-300 dark:border-slate-600 dark:bg-slate-800/40 hover:border-blue-500 hover:bg-blue-50/20 dark:hover:border-blue-400 dark:hover:bg-slate-800/60"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <input
        ref={inputRef}
        id="enhance-file-input"
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/webp,image/bmp"
        onChange={(event) => handleFiles(event.target.files)}
        className="hidden"
        aria-label="Upload image file"
        disabled={isDisabled}
      />

      {/* Icon */}
      <div className="mb-6 flex transform transition-transform duration-300 group-hover:scale-110">
        <svg
          className="h-16 w-16 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z"
          />
        </svg>
      </div>

      {/* Main text */}
      <p className="text-center text-lg font-semibold text-slate-800 dark:text-slate-100">
        Drop your photo here
      </p>

      {/* Secondary text */}
      <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
        Or press <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-700">Ctrl+V</kbd> to paste from clipboard
      </p>

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isDisabled}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Choose a photo
      </button>
    </div>
  );
}
