


import CookieCard from "@/components/shared/CookieCard";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/provider/redux-provider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-Montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find Salon Jobs & Hire Beauty Professionals | Roqit",
  description:
    "Discover salon, barber, and beauty job opportunities. Hire verified hair stylists, color specialists, and beauty experts instantly with Roqit – the smart talent marketplace.",
  keywords: [
    "salon jobs",
    "beauty jobs",
    "barber jobs",
    "hire hairstylists",
    "hair stylist jobs",
    "beauty professionals",
    "salon recruitment",
    "hairdresser jobs",
    "Roqit careers",
  ],
  authors: [{ name: "Roqit" }],
  openGraph: {
    type: "website",
    url: "https://www.roqit.com/",
    title: "Find Salon Jobs & Hire Beauty Professionals | Roqit",
    description:
      "Roqit connects salons, barbers, and beauty creatives with fresh talent and opportunities. Find verified professionals, browse job listings, and hire instantly.",
    images: [
      {
        url: "https://www.roqit.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Roqit – Find Salon Jobs & Hire Beauty Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Salon Jobs & Hire Beauty Professionals | Roqit",
    description:
      "Search beauty jobs or hire talented hairstylists instantly. Join Roqit – the smart salon & beauty hiring platform.",
    images: ["https://www.roqit.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://www.roqit.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`} suppressHydrationWarning>
        <ReduxProvider>
          <Suspense>{children}</Suspense>
          <Toaster position="top-right" />
          <CookieCard />
        </ReduxProvider>
      </body>
    </html>
  );
}
