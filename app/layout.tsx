import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// CRITICAL GEO/SEO ENTERPRISE METADATA INJECTION
export const metadata: Metadata = {
  title: {
    default: "Franchise Singapore | Top Franchise Opportunities & Resale Listings",
    template: "%s | Franchise.sg"
  },
  description: "Explore Singapore's authoritative franchise directory portal. Analyze audited investment capital matrices, initial startup fees, and operational commercial opportunities for trending local and international brands.",
  keywords: ["Franchise Singapore", "Franchise Opportunities Singapore", "Franchises for Sale Singapore", "Buy a Franchise Singapore", "Singapore Commercial Business Listings", "F&B Franchise Singapore"],
  metadataBase: new URL("https://franchise.sg"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Franchise Singapore | Top Franchise Opportunities & Resale Listings",
    description: "Analyze audited investment capital matrices, initial startup fees, and operational commercial opportunities for trending local and international brands.",
    url: "https://franchise.sg",
    siteName: "Franchise.sg",
    locale: "en_SG",
    type: "website",
  },
  verification: {
    google: "googlea47aaff8e85ee7a5",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}