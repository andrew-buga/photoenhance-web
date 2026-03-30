"use client";

import { useRef } from "react";
import Link from "next/link";

type UploadSectionProps = {
  onFileSelect?: (file: File) => void;
};

export default function UploadSection({ onFileSelect }: UploadSectionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;
    handleFile(files[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="mx-auto w-full max-w-[580px] rounded-xl border border-white/40 bg-white/90 p-5 shadow-lg dark:border-black/40 dark:bg-slate-900/90 md:p-6">
      <input
        ref={inputRef}
        id="upload-input-home"
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/webp,image/bmp"
        onChange={(event) => handleFiles(event.target.files)}
        className="hidden"
        aria-label="Upload image file"
      />

      <label
        htmlFor="upload-input-home"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="group block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 transition-all dark:border-slate-600 dark:bg-slate-800/40 hover:border-blue-500 hover:bg-blue-50/20 dark:hover:border-blue-400 dark:hover:bg-slate-800/60"
      >
        {/* Upload Icon */}
        <div className="mb-6 flex transform justify-center transition-transform duration-300 group-hover:scale-110">
          <svg
            className="h-16 w-16 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v6m0 0l-3-3m3 3l3-3M3.172 5.172a4 4 0 015.656 0L12 7.343m0 0l3.172-3.171a4 4 0 015.656 5.656L12 18.485m0 0l-5.828-5.829a4 4 0 010-5.656m5.828 5.829L12 7.343"
            />
          </svg>
        </div>

        {/* Title */}
        <p className="mb-3 text-center text-xl font-bold text-slate-800 dark:text-slate-100 md:text-2xl">
          Upload to get high resolution of images
        </p>

        {/* Upload Button */}
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Upload Image
          </button>
        </div>

        {/* Footer Text */}
        <div className="max-w-xs text-center text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 mx-auto">
          Click or press Ctrl+V to upload an image. Uploading means you agree to our{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="nofollow noreferrer"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400"
          >
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="nofollow noreferrer"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </label>
    </div>
  );
}
