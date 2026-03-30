import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
const measurementId = process.env.NEXT_PUBLIC_GA_ID || "G-KQ4MZMLV8J";

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
  verification: {
    google: "8067856882124743",
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
      <head>
        <Script
          id="ga4-head-script"
          strategy="beforeInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        />
        <Script id="ga4-head-config" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
window.gtag('js', new Date());
window.gtag('config', '${measurementId}', { anonymize_ip: true });`}
        </Script>
      </head>
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
