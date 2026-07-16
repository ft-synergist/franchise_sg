import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import FranchiseGridEngine from './components/FranchiseGridEngine';

export const revalidate = 60; // Cache index pages globally on Vercel Edge nodes for 60 seconds

export const metadata = {
  title: 'Franchise Singapore | Verified Franchise Listings & Opportunities',
  description: 'Top Franchise Singapore directory portal for active franchise listings, expert insights, and verified investment metrics. Analyze initial fees and capital setup requirements.',
  alternates: {
    canonical: 'https://www.franchise.sg',
  },
  openGraph: {
    title: 'Franchise Singapore | Verified Franchise Listings & Opportunities',
    description: 'Top Franchise Singapore directory portal for active franchise listings, expert insights, and verified investment metrics.',
    url: 'https://www.franchise.sg',
    siteName: 'Franchise Singapore',
    type: 'website',
    locale: 'en_SG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franchise Singapore | Verified Franchise Listings & Opportunities',
    description: 'Top Franchise Singapore directory portal for active franchise listings, expert insights, and verified investment metrics.',
  }
};

export default async function FranchiseDirectoryHome() {
  // Pull production records directly from Supabase server-side for elite bot crawl visibility
  const { data: franchises, error } = await supabase
    .from('crm_franchises')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('brand_name', { ascending: true });

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.franchise.sg/#organization",
        "name": "Franchise Singapore",
        "url": "https://www.franchise.sg",
        "logo": "https://www.franchise.sg/favicon.ico",
        "description": "The authoritative Singapore Franchise Portal breaking down startup costs, capital requirements, and margins across Asia."
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.franchise.sg/#webpage",
        "url": "https://www.franchise.sg",
        "name": "Franchise Singapore Directory",
        "description": "Understand the Minimum Investment Capital Required (SGD) before meeting the franchisors.",
        "isPartOf": { "@id": "https://www.franchise.sg/#organization" },
        "about": {
          "@type": "ItemList",
          "name": "Franchise Opportunities in Singapore",
          "itemListElement": franchises?.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "BusinessWithPhysicalSystem",
              "name": item.brand_name,
              "description": item.description,
              "category": item.category
            }
          })) || []
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* URL-Safe Smooth Scroll Interceptor Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function(e) {
              var scrollLink = e.target.closest('a[data-scroll-target]');
              if (scrollLink) {
                e.preventDefault();
                var targetId = scrollLink.getAttribute('data-scroll-target');
                var targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            });
          `
        }}
      />

      {/* Core SEO Authority Header */}
      <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Singapore Franchise Portal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            Find the Latest Franchise Opportunities in Singapore
          </h1>

          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-3xl font-normal leading-relaxed">
            Understand the Minimum Investment Capital Required (SGD) before meeting the franchisors. Access initial franchise fees and setup fees, ongoing royalties and franchise categories across Singapore and Asian markets.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* Green Bar: Modified to intercept jump behavior and preserve the clean root URL */}
            <a
              href="#directory-market"
              data-scroll-target="directory-market"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-sm transition-colors duration-200 cursor-pointer"
            >
              Find the Latest Franchise Opportunities in Singapore
            </a>
            <Link
              href="/insights"
              className="border border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
            >
              Franchise Insights
            </Link>
            <Link
              href="/apply"
              className="border border-slate-800 hover:bg-slate-900/30 text-slate-400 hover:text-slate-300 font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
            >
              Register Your Franchise Brand
            </Link>
          </div>
        </div>
      </header>

      {/* Directory Engine Framework Section */}
      <main className="max-w-6xl mx-auto px-6 py-16" id="directory-market">
        {/* Optimized H2 to directly capture the target "franchise listing" keyword */}
        <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-8 text-left">
          Singapore Franchise Listings & Verified Opportunities
        </h2>

        {!franchises || franchises.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500">Database synchronization in progress. Please refresh shortly.</p>
          </div>
        ) : (
          <FranchiseGridEngine />
        )}
      </main>
    </div>
  );
}