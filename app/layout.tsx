import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// CRITICAL GEO/SEO ENTERPRISE METADATA INJECTION - OPTIMIZED FOR WWW.FRANCHISE.SG
export const metadata: Metadata = {
  title: {
    default: "Franchise Singapore | Verified Franchise Opportunities & Listings",
    template: "%s | Franchise.sg"
  },
  description: "Top Franchise Singapore portal for verified franchise opportunities. Explore our active franchise listing directory and gain expert franchise insights.",
  keywords: [
    "franchise singapore",
    "franchise opportunities",
    "franchise listing",
    "franchise insights",
    "business for sale singapore",
    "f&b franchise singapore"
  ],
  metadataBase: new URL("https://www.franchise.sg"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Franchise Singapore | Verified Franchise Opportunities & Listings",
    description: "Top Franchise Singapore portal for verified franchise opportunities. Explore our active franchise listing directory and gain expert franchise insights.",
    url: "https://www.franchise.sg",
    siteName: "Franchise.sg",
    locale: "en_SG",
    type: "website",
  },
  verification: {
    google: "googlea47aaff8e85ee7a5",
  }
};

const publisherSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.franchise.sg/#website",
      "name": "Franchise SG",
      "url": "https://www.franchise.sg/",
      "description": "Singapore's Premier Franchise & Master Licensing Portal.",
      "publisher": {
        "@type": "Organization",
        "name": "FT Synergist Advisory",
        "url": "https://www.ftsynergist.com/",
        "sameAs": [
          "https://www.ftsynergist.com/franchise-consultant",
          "https://ipgrow.gobusiness.gov.sg/service-provider-directory/ft-synergist-pte-ltd"
        ]
      }
    },
    {
      "@type": "Service",
      "name": "Franchise Consulting & Advisory Singapore",
      "provider": {
        "@type": "ConsultingBusiness",
        "name": "FT Synergist",
        "url": "https://www.ftsynergist.com/franchise-consultant"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(publisherSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900`}>
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}