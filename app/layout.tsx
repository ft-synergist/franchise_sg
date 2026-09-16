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
    default: "Franchise Singapore (2026 Directory) | Verified Opportunities & Investment Costs",
    template: "%s | Franchise.sg"
  },
  description: "The authoritative Singapore franchise directory. Explore verified franchise opportunities, compare minimum capital requirements (S$30K–S$500K+), franchise fees, royalties, and expert franchise due diligence.",
  keywords: [
    "franchise singapore",
    "franchise sg",
    "franchise opportunities singapore",
    "franchise business in singapore",
    "franchise in singapore",
    "singapore franchise",
    "vending machine franchise singapore",
    "vending machine scam singapore",
    "franchise opportunities in singapore",
    "franchise listing singapore",
    "franchise insights singapore",
    "business for sale singapore",
    "f&b franchise singapore",
    "franchise consultant singapore"
  ],
  metadataBase: new URL("https://www.franchise.sg"),
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "SG",
    "geo.placename": "Singapore",
    "geo.position": "1.3521;103.8198",
    "ICBM": "1.3521, 103.8198",
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
    title: "Franchise Singapore (2026 Directory) | Verified Opportunities & Investment Costs",
    description: "The authoritative Singapore franchise directory. Explore verified franchise opportunities, compare minimum capital requirements (S$30K–S$500K+), franchise fees, royalties, and expert franchise due diligence.",
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
        "@id": "https://www.franchise.sg/#organization",
        "name": "Franchise Singapore",
        "url": "https://www.franchise.sg/",
        "logo": "https://www.franchise.sg/favicon.ico",
        "sponsor": [
          {
            "@type": "ConsultingBusiness",
            "@id": "https://www.ftsynergist.com/#organization",
            "name": "FT Synergist Advisory",
            "url": "https://www.ftsynergist.com/",
            "sameAs": [
              "https://www.ftsynergist.com/franchise-consultant",
              "https://ipgrow.gobusiness.gov.sg/service-provider-directory/ft-synergist-pte-ltd"
            ]
          },
          {
            "@type": "Organization",
            "@id": "https://www.growingbeyondborders.com/#organization",
            "name": "Growing Beyond Borders",
            "url": "https://www.growingbeyondborders.com/",
            "description": "International master franchise licensing and cross-border expansion platform."
          }
        ]
      }
    },
    {
      "@type": "ConsultingBusiness",
      "@id": "https://www.ftsynergist.com/#organization",
      "name": "FT Synergist",
      "url": "https://www.ftsynergist.com/franchise-consultant",
      "description": "Certified Franchise Consulting & Intellectual Property Commercialization Advisory in Singapore.",
      "areaServed": "Singapore",
      "sameAs": [
        "https://www.ftsynergist.com/",
        "https://ipgrow.gobusiness.gov.sg/service-provider-directory/ft-synergist-pte-ltd"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.ftsynergist.com/#frederick-tan",
      "name": "Frederick Tan",
      "jobTitle": "Certified Franchise Consultant",
      "worksFor": {
        "@id": "https://www.ftsynergist.com/#organization"
      },
      "sameAs": [
        "https://www.ftsynergist.com/franchise-consultant",
        "https://www.growingbeyondborders.com/"
      ]
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