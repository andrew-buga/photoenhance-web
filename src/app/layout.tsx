import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import AdSenseLoader from "@/components/AdSenseLoader";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const baseUrl = new URL("https://photoenhance-web.vercel.app");

export const metadata: Metadata = {
  title: {
    default: "Free AI Image Upscaler | PhotoEnhance",
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
  metadataBase: baseUrl,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free AI Image Upscaler | PhotoEnhance",
    description:
      "Enhance photo quality in seconds. Free AI upscaler with smooth before/after preview and instant download.",
    url: baseUrl,
    siteName: "PhotoEnhance",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "PhotoEnhance Free AI Image Upscaler",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Free AI Image Upscaler | PhotoEnhance",
    description:
      "Enhance photo quality in seconds. Free AI upscaler with smooth before/after preview and instant download.",
    images: ["/og-image.svg"],
  },
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
        <AnalyticsLoader />
        <AdSenseLoader />
        <CookieBanner />
      </body>
    </html>
  );
}
