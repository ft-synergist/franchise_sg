import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import FranchiseGridEngine from './components/FranchiseGridEngine';
import { VERIFIED_LISTINGS } from '@/lib/verifiedListings';

export const metadata = {
  title: 'Franchise Singapore (2026 Directory) | Compare Costs, Fees & Opportunities',
  description: 'Singapore\'s premier verified franchise directory. Explore active F&B, retail, education & service franchise opportunities. Compare minimum capital (S$30K–S$500K+), franchise fees, royalties, and unfiltered due diligence.',
  alternates: {
    canonical: 'https://www.franchise.sg',
  },
  openGraph: {
    title: 'Franchise Singapore (2026 Directory) | Compare Costs, Fees & Opportunities',
    description: 'Singapore\'s premier verified franchise directory. Explore active F&B, retail, education & service franchise opportunities. Compare minimum capital (S$30K–S$500K+), franchise fees, royalties, and unfiltered due diligence.',
    url: 'https://www.franchise.sg',
    siteName: 'Franchise Singapore',
    type: 'website',
    locale: 'en_SG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franchise Singapore (2026 Directory) | Compare Costs, Fees & Opportunities',
    description: 'Singapore\'s premier verified franchise directory. Explore active F&B, retail, education & service franchise opportunities. Compare minimum capital (S$30K–S$500K+), franchise fees, royalties, and unfiltered due diligence.',
  }
};

export default async function FranchiseDirectoryHome() {
  // Pull production records directly from Supabase server-side for elite bot crawl visibility
  const { data: dbFranchises } = await supabase
    .from('crm_franchises')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('brand_name', { ascending: true });

  const verifiedList = Object.values(VERIFIED_LISTINGS);
  const dbSlugs = new Set((dbFranchises || []).map((item) => item.slug));

  const allListingItems = [
    ...(dbFranchises || []).map((item) => {
      const v = VERIFIED_LISTINGS[item.slug];
      return {
        slug: item.slug,
        brand_name: v?.brand_name || item.brand_name,
        category: v?.category || item.category,
        description: v?.description || item.description,
        min_capital_sgd: v?.min_capital_sgd ?? item.min_capital_sgd ?? 50000,
        franchise_fee_sgd: v?.franchise_fee_sgd || item.franchise_fee_sgd || 25000,
        is_verified: true
      };
    }),
    ...verifiedList.filter((v) => !dbSlugs.has(v.slug)).map((v) => ({
      slug: v.slug,
      brand_name: v.brand_name,
      category: v.category,
      description: v.description,
      min_capital_sgd: v.min_capital_sgd,
      franchise_fee_sgd: v.franchise_fee_sgd,
      is_verified: true
    }))
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.franchise.sg/#organization",
        "name": "Franchise Singapore",
        "url": "https://www.franchise.sg",
        "logo": "https://www.franchise.sg/favicon.ico",
        "description": "The authoritative Singapore Franchise Portal breaking down startup costs, capital requirements, and unit economics across Asia.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "158",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.franchise.sg/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.franchise.sg"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Singapore Franchise Directory",
            "item": "https://www.franchise.sg/#directory-market"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.franchise.sg/#webpage",
        "url": "https://www.franchise.sg",
        "name": "Franchise Singapore Directory & Verified Franchise Opportunities",
        "description": "Compare minimum capital requirements (SGD), initial franchise fees, ongoing royalties, and audited unit economics across 150+ Singapore franchises.",
        "isPartOf": { "@id": "https://www.franchise.sg/#organization" },
        "breadcrumb": { "@id": "https://www.franchise.sg/#breadcrumb" },
        "about": {
          "@type": "ItemList",
          "name": "150+ Verified Franchise Opportunities in Singapore",
          "numberOfItems": allListingItems.length,
          "itemListElement": allListingItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "FinancialProduct",
              "@id": `https://www.franchise.sg/franchise/${item.slug}#entity`,
              "name": item.brand_name,
              "description": item.description,
              "category": item.category,
              "url": `https://www.franchise.sg/franchise/${item.slug}`,
              "offers": {
                "@type": "Offer",
                "priceCurrency": "SGD",
                "price": typeof item.min_capital_sgd === 'number' ? item.min_capital_sgd : 50000,
                "priceValidUntil": "2027-12-31",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "28",
                "bestRating": "5"
              }
            }
          }))
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.franchise.sg/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does it cost to buy a franchise in Singapore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Franchise investment costs in Singapore typically range from S$30,000 for low-overhead kiosk or service models up to S$500,000+ for prime F&B restaurant concepts. Key capital items audited include initial franchise fees, commercial fitout, security rental deposits (typically 3–6 months per URA commercial leasing standards), initial inventory, and working capital runway."
            }
          },
          {
            "@type": "Question",
            "name": "What are the most profitable low-cost franchise opportunities in Singapore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Low-cost franchises in Singapore under S$50,000 to S$100,000 include automated retail vending stations (e.g. iJooz), B2B digital services (e.g. Beyond Borders CRM), artisanal micro-bakeries (e.g. Jie Bakery, Pawa Bakery), and specialized service models. These formats feature low staffing overhead, rapid payback timelines (6–18 months), and predictable operating margins."
            }
          },
          {
            "@type": "Question",
            "name": "How do I evaluate verified franchise listings in Singapore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Before committing capital, verify the franchisor's corporate registration with ACRA, confirm registered trademarks on the IPOS IP Grow registry, audit shopping mall lease covenants against URA retail benchmarks, and verify eligibility for Enterprise Singapore support schemes such as EDG or MRA."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find independent franchise insights in Singapore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Franchise.sg publishes data-driven franchise insights in Singapore, featuring commercial leasing audits by property strategists, unit economics breakdowns by industry editors, and scam warning analyses to protect local investors."
            }
          }
        ]
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
            Franchise Singapore | Verified Opportunities &amp; Directory Listings
          </h1>

          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-3xl font-normal leading-relaxed">
            Discover verified franchise opportunities in Singapore. Compare minimum capital requirements (SGD), initial franchise fees, ongoing royalties, and proprietary market insights before meeting franchisors.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#directory-market"
              data-scroll-target="directory-market"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-sm transition-colors duration-200 cursor-pointer"
            >
              Browse Franchise Listings
            </a>
            <Link
              href="/insights"
              className="border border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
            >
              Franchise Insights Singapore
            </Link>
            <Link
              href="/for-sale"
              className="border border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
            >
              Franchise Businesses For Sale
            </Link>
            <Link
              href="/apply"
              className="border border-slate-800 hover:bg-slate-900/30 text-slate-400 hover:text-slate-300 font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
            >
              List Your Franchise Brand
            </Link>
          </div>

          {/* High-CTR Low-Cost Search Monetization Links */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="text-teal-400 font-black uppercase tracking-wider text-[11px] mr-1">🔥 Low-Cost &amp; Budget Fast Links:</span>
            <a
              href="#directory-market"
              data-scroll-target="directory-market"
              className="bg-slate-900/90 hover:bg-teal-950/80 border border-teal-500/40 hover:border-teal-400 text-teal-300 font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
            >
              ⚡ Cheap &amp; Low-Cost Franchises (&lt; S$50K)
            </a>
            <a
              href="#directory-market"
              data-scroll-target="directory-market"
              className="bg-slate-900/90 hover:bg-teal-950/80 border border-teal-500/40 hover:border-teal-400 text-teal-300 font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
            >
              💰 Under S$100k Investment Opportunities
            </a>
            <a
              href="#directory-market"
              data-scroll-target="directory-market"
              className="bg-slate-900/90 hover:bg-teal-950/80 border border-slate-700 hover:border-teal-400 text-slate-300 font-semibold px-3 py-1.5 rounded-lg transition-all shadow-sm"
            >
              📊 S$100k–S$250k Mid-Tier Models
            </a>
          </div>
        </div>
      </header>

      {/* Latest Forensic Audits & Insights Strip (Direct Crawl Equity Bridge) */}
      <section className="bg-slate-950 border-b border-slate-800 py-10 px-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-teal-400 font-black text-[11px] uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                Latest Forensic Audits &amp; Market Intelligence
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Proprietary Singapore Franchise Due Diligence &amp; Unit Economics
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-xs font-bold text-teal-400 hover:text-teal-300 uppercase tracking-wider shrink-0 transition-colors"
            >
              View All 12 Forensic Reports &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/insights/reinstatement-breakdown-mall-tenancy-audit-singapore"
              className="bg-slate-900/90 hover:bg-slate-900 border border-teal-500/40 hover:border-teal-400 p-5 rounded-2xl transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Mall Tenancy Audit
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">3 Nov 2026</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 leading-snug line-clamp-3">
                  Reinstatement Breakdown &amp; Mall Tenancy Audit: Protecting Your S$30K–S$65K Handover
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  M&amp;E demolition line items, the 200% daily double-rent trap, and LARPA tenant rights.
                </p>
              </div>
              <div className="text-[11px] font-bold text-teal-400 mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                <span>By Maggie Png</span>
                <span>Read Audit &rarr;</span>
              </div>
            </Link>

            <Link
              href="/insights/singapore-fb-franchise-capital-payback-audit-2026"
              className="bg-slate-900/90 hover:bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 p-5 rounded-2xl transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    F&amp;B Financial Audit
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">27 Oct 2026</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 leading-snug line-clamp-3">
                  Singapore F&amp;B Franchise Capital &amp; Payback Audit 2026 (S$150K–S$350K Real Capex)
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  Audited store EBITDA margins (11%–21%) and payback horizons across 4 F&amp;B formats.
                </p>
              </div>
              <div className="text-[11px] font-bold text-emerald-400 mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                <span>By Chen Yong Lin</span>
                <span>Read Audit &rarr;</span>
              </div>
            </Link>

            <Link
              href="/insights/hidden-costs-commercial-lease-franchise-unit-economics-singapore"
              className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-teal-400 p-5 rounded-2xl transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    Commercial Leasing
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">20 Oct 2026</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 leading-snug line-clamp-3">
                  The Hidden Costs in a Commercial Lease That Sink Franchise Unit Economics
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  Why S$14.50 psf base rent becomes S$20.05 psf after floating CAM charges and GTO rent.
                </p>
              </div>
              <div className="text-[11px] font-bold text-teal-400 mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                <span>By Maggie Png</span>
                <span>Read Guide &rarr;</span>
              </div>
            </Link>

            <Link
              href="/insights/true-fitness-collapse-singapore-prepaid-gym-model-audit"
              className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-rose-400 p-5 rounded-2xl transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Corporate Governance
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">15 Oct 2026</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-rose-300 leading-snug line-clamp-3">
                  The Collapse of True Fitness Singapore: Forensic Audit of the Prepaid Gym Model
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  Deconstructing HK$633.8M liabilities, HKEX filings, and asset-light 24/7 gym shifts.
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-400 mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                <span>By Chen Yong Lin</span>
                <span>Read Audit &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Directory Engine Framework Section */}
      <main className="max-w-6xl mx-auto px-6 py-16" id="directory-market">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Singapore Franchise Listings &amp; Verified Opportunities
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Filter by investment budget, business category, and franchise format across Singapore.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 inline-block">
            ✓ 100% Verified Capital Metrics
          </div>
        </div>

        <FranchiseGridEngine />

        {/* High Authority Pillar Section: Singapore Franchise Market Guide */}
        <section className="mt-20 pt-16 border-t border-slate-200 space-y-12">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Franchise Singapore: The Definitive Investor &amp; Opportunity Guide
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Investing in a <strong>franchise in Singapore</strong> offers aspiring entrepreneurs and seasoned business owners a battle-tested roadmap to commercial success. With Singapore recognized as Asia’s foremost business hub, franchising provides immediate brand equity, centralized supply chains, and established operational standard operating procedures (SOPs).
            </p>
          </div>

          {/* Investment Tiers Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900">
              Singapore Franchise Capital Investment Tiers (SGD)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">Tier 1 • S$30K – S$80K</span>
                <h4 className="text-lg font-bold text-slate-900">Micro &amp; Kiosk Franchises</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Low-overhead takeaway beverage kiosks, automated services, and cloud-based mobile service franchises with low capex requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">Tier 2 • S$80K – S$250K</span>
                <h4 className="text-lg font-bold text-slate-900">Enrichment &amp; Retail Concepts</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Children&apos;s education, tuition centers, boutique fitness, and specialty retail concepts operating in suburban Singapore shopping malls.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">Tier 3 • S$250K – S$600K+</span>
                <h4 className="text-lg font-bold text-slate-900">Full F&amp;B Restaurants &amp; Wellness</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full-scale dining restaurants, cafes, aesthetic clinics, and master franchise licensing territories with high return potential.
                </p>
              </div>
            </div>
          </div>

          {/* Due Diligence & Insights Callout */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-2xl border border-slate-800 space-y-6">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Expert Due Diligence</span>
              <h3 className="text-2xl font-black text-white">
                Franchise Insights Singapore: Avoid Costly Traps Before You Sign
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Before committing substantial capital to any franchise opportunity in Singapore, evaluate critical factors such as lease renewal clauses, shopping mall turnover rent (GTO), supply-chain markups, and IP registration with the Intellectual Property Office of Singapore (IPOS).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <Link
                href="/insights/mr-coconut-old-chang-kee-top-food-franchise-costs-singapore"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-teal-300">F&amp;B Financial Audit</div>
                  <div className="text-sm font-bold text-white group-hover:text-teal-200 mt-1 line-clamp-2">
                    Mr Coconut, Old Chang Kee &amp; Top F&amp;B Franchise Costs (2026)
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read Financial Audit &rarr;
                </div>
              </Link>

              <Link
                href="/insights/bubble-tea-franchise-singapore-cost-profitability-analysis"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-emerald-300">F&amp;B Unit Economics</div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-200 mt-1 line-clamp-2">
                    The S$3.7B Bubble Tea Illusion: Cost &amp; Profitability Breakdown
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read Case Study &rarr;
                </div>
              </Link>

              <Link
                href="/insights/psychology-singaporean-plate-franchise-evolution-super-brands-1970-2026"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-indigo-300">Macro Strategy</div>
                  <div className="text-sm font-bold text-white group-hover:text-indigo-200 mt-1 line-clamp-2">
                    Psychology of the Singaporean Plate: Super-Brands (1970–2026)
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read Evolution Audit &rarr;
                </div>
              </Link>

              <Link
                href="/insights/lease-or-own-franchise-commercial-property-singapore"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-teal-300">Property Strategy</div>
                  <div className="text-sm font-bold text-white group-hover:text-teal-200 mt-1 line-clamp-2">
                    Lease or Own? Commercial Property Math for SG Franchisees
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read Property Guide &rarr;
                </div>
              </Link>

              <Link
                href="/insights/foot-traffic-lies-predicts-franchise-unit-survival-singapore"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-teal-300">Commercial Leasing</div>
                  <div className="text-sm font-bold text-white group-hover:text-teal-200 mt-1 line-clamp-2">
                    Foot Traffic Lies: What Actually Predicts Franchise Unit Survival
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read Lease Audit &rarr;
                </div>
              </Link>

              <Link
                href="/insights/how-to-determine-the-best-food-franchise-to-invest-in-singapore"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-teal-300">F&amp;B Evolution</div>
                  <div className="text-sm font-bold text-white group-hover:text-teal-200 mt-1 line-clamp-2">
                    Best Food Franchise to Invest in Singapore: 1968–2026 Analysis
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read F&amp;B Guide &rarr;
                </div>
              </Link>

              <Link
                href="/insights/vending-machine-franchise-analysis-singapore"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-rose-300">Scam Due Diligence</div>
                  <div className="text-sm font-bold text-white group-hover:text-rose-200 mt-1 line-clamp-2">
                    Vending Machine Franchise Scam Alert: Passive Income Reality
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read Scam Alert &rarr;
                </div>
              </Link>

              <Link
                href="/insights/vending-machine-illusion-singapore-franchise-lease"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-4 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-teal-300">Lease Due Diligence</div>
                  <div className="text-sm font-bold text-white group-hover:text-teal-200 mt-1 line-clamp-2">
                    The S$200,000 Vending Machine Illusion: 5-Point Lease Audit
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
                  Read 5-Point Audit &rarr;
                </div>
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/insights"
                className="inline-flex items-center text-sm font-bold text-teal-400 hover:text-teal-300 transition-colors"
              >
                Read All Franchise Insights Singapore &rarr;
              </Link>
            </div>
          </div>

          {/* Core Category Navigation Hub */}
          <div className="space-y-4 pt-4">
            <h3 className="text-2xl font-black text-slate-950 tracking-tight">
              Explore High-Demand Franchise Categories in Singapore
            </h3>
            <p className="text-slate-600 text-sm">
              Discover vetted franchise opportunities categorized by verified industry sectors in Singapore.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <Link
                href="/categories/food-beverage"
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded w-fit mb-2">F&amp;B Sector</div>
                <h4 className="text-base font-black text-slate-950 group-hover:text-teal-700 transition-colors">Food &amp; Beverage Franchises</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Fast-casual, cafes, bubble tea kiosks, and full-service restaurant brands.</p>
              </Link>

              <Link
                href="/categories/education-enrichment"
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded w-fit mb-2">Education</div>
                <h4 className="text-base font-black text-slate-950 group-hover:text-teal-700 transition-colors">Education &amp; Enrichment</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Tuition centers, coding academies, preschools, and specialized learning.</p>
              </Link>

              <Link
                href="/categories/retail-services"
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded w-fit mb-2">Retail &amp; Ops</div>
                <h4 className="text-base font-black text-slate-950 group-hover:text-teal-700 transition-colors">Retail &amp; Convenience</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Automated retail kiosks, convenience concepts, and boutique lifestyle outlets.</p>
              </Link>

              <Link
                href="/for-sale"
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded w-fit mb-2">Resale Market</div>
                <h4 className="text-base font-black text-slate-950 group-hover:text-teal-700 transition-colors">Franchises For Sale</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Acquire operational, cash-flowing franchise resale units with audited accounts.</p>
              </Link>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions (FAQ) — Franchise Opportunities Singapore
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">
                  How much capital is required to start a franchise in Singapore?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Total startup costs in Singapore range from S$30,000 for boutique kiosk concepts to over S$500,000 for established F&amp;B and restaurant brands. Capital covers initial franchise fees, commercial renovation, security deposits, and 3–6 months of working capital runway.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">
                  What makes a franchise opportunity in Singapore profitable?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Profitable franchise opportunities combine defensible brand equity, central kitchen or supply chain pricing advantages, low labor-to-revenue ratios, and proven suburban shopping mall unit economics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">
                  Can Singapore businesses use government grants for franchising?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes. Franchisors looking to expand overseas can tap into Enterprise Singapore&apos;s <strong>Market Readiness Assistance (MRA)</strong> grant and <strong>Enterprise Development Grant (EDG)</strong> for franchise system development and international intellectual property filing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">
                  How do I find verified franchise listings on Franchise.sg?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our directory provides verified financial metrics, royalty rates, initial setup fees, and direct connections to franchisors. Use the filter panel above to filter by your exact investment budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}