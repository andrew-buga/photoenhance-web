import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PhotoEnhance - AI Photo Upscaler",
    template: "%s | PhotoEnhance",
  },
  description:
    "Enhance photo quality in seconds. Free AI upscaler with smooth before/after preview and instant download.",
  applicationName: "PhotoEnhance",
  keywords: [
    "ai photo enhancer",
    "image upscaler",
    "photo upscaler",
    "enhance image quality",
    "free photo enhancer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${spaceGrotesk.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
