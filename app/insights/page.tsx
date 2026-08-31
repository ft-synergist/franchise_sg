import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 0; // Force immediate fresh rendering on insights index

export const metadata: Metadata = {
    title: 'Franchise Insights Singapore | Market Intelligence, Due Diligence & Unit Economics',
    description: 'Proprietary Franchise Insights Singapore. Data-driven unit economics, commercial mall lease audits, F&B market trends, and scam prevention for Singapore franchise investors.',
    alternates: {
        canonical: 'https://www.franchise.sg/insights',
    },
    openGraph: {
        title: 'Franchise Insights Singapore | Market Intelligence, Due Diligence & Unit Economics',
        description: 'Proprietary Franchise Insights Singapore. Data-driven unit economics, commercial mall lease audits, F&B market trends, and scam prevention.',
        url: 'https://www.franchise.sg/insights',
        siteName: 'Franchise.sg',
        locale: 'en_SG',
        type: 'website',
    }
};


const ARTICLES = [
    {
        slug: 'mr-coconut-old-chang-kee-top-food-franchise-costs-singapore',
        title: 'Mr Coconut, Old Chang Kee & Top F&B Franchise Costs in Singapore (2026 Financial Audit)',
        description: 'Unfiltered 2026 financial audit of Singapore\'s leading F&B franchises. Compare real startup capital (S$150K–S$350K), store EBITDA margins, supply chain moats, Nutri-Grade laws, and SGX audited cash flows.',
        category: 'F&B Financial Audit',
        categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        date: 'September 1, 2026',
        publishAt: '2026-09-01T08:00:00+08:00',
        authorName: 'Chen Yong Lin',
        authorRole: 'Editor-in-Chief & Lead Analyst',
        authorSlug: 'chen-yong-lin',
    },
    {
        slug: 'lease-or-own-franchise-commercial-property-singapore',
        title: 'Lease or Own? What Franchisees in Singapore Must Calculate Before Deciding (2026 Commercial Guide)',
        description: 'Should your franchise lease or buy its commercial unit? Commercial Property Strategist Maggie Png compares IRAS stamp duties, MAS commercial LTV limits, CoC retail tenant protections, and the 3-year cash flow model.',
        category: 'Commercial Property Strategy',
        categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
        date: 'September 8, 2026',
        publishAt: '2026-09-08T08:00:00+08:00',
        authorName: 'Maggie Png',
        authorRole: 'Commercial Property Strategist',
        authorSlug: 'maggie-png',
    },
    {
        slug: 'bubble-tea-franchise-singapore-cost-profitability-analysis',
        title: 'The $3.7 Billion Bubble Tea Illusion: Franchise Hype vs. Reality in Singapore (2026 Breakdown)',
        description: 'From 1999 Each-A-Cup survival pivots to 2026 Mixue $1 ice cream disruption and Chagee automated brewing: an unfiltered unit economic teardown of bubble tea franchising in Singapore.',
        category: 'Franchise Unit Economics',
        categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        date: 'August 26, 2026',
        authorName: 'Frederick Tan',
        authorRole: 'Guest Contributor · Certified Management Consultant',
        authorSlug: 'frederick-tan',
    },
    {
        slug: 'foot-traffic-lies-predicts-franchise-unit-survival-singapore',
        title: "Foot Traffic Lies. Here's What Actually Predicts a Franchise Unit's Survival",
        description: "Every leasing pitch in Singapore comes with footfall numbers, yet high-profile F&B units fail within years. Commercial Property Strategist Maggie Png exposes why raw foot traffic lies and reveals the true predictors of 5-year unit survival.",
        category: 'Commercial Leasing Strategy',
        categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
        date: 'August 13, 2026',
        authorName: 'Maggie Png',
        authorRole: 'Commercial Property Strategist',
        authorSlug: 'maggie-png',
    },
    {
        slug: 'vending-machine-illusion-singapore-franchise-lease',
        title: 'The $200,000 Vending Machine Illusion: What Singapore’s Retail Scandals Must Teach Franchise Buyers About Their Leases',
        description: 'As automated retail scandals shock local investors, commercial property strategist Maggie Png breaks down the 5-point Singapore lease audit every franchisee needs before signing.',
        category: 'Commercial Leasing Audit',
        categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
        date: 'July 31, 2026',
        authorName: 'Maggie Png',
        authorRole: 'Commercial Property Strategist',
        authorSlug: 'maggie-png',
    },
    {
        slug: 'how-to-determine-the-best-food-franchise-to-invest-in-singapore',
        title: 'How to Determine the Best F&B Franchise to Invest in Singapore: The Evolution of Singapore F&B Franchise (1968–2026)',
        description: 'Why are F&B operations in Singapore uniquely resilient? Discover what makes a profitable food franchise opportunity. An unfiltered, data-backed analysis of historical fast-food evolution, rental asymmetries, and top homegrown SG brands.',
        category: 'Market Strategy',
        categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
        date: 'July 14, 2026',
        authorName: 'Chen Yong Lin',
        authorRole: 'Editor, Franchise.sg',
        authorSlug: 'chen-yong-lin',
    },
    {
        slug: 'vending-machine-franchise-analysis-singapore',
        title: 'Vending Machine Franchise Scam Alert: The Reality Behind "Hands-Off Passive Income" in Singapore',
        description: 'The promise of 30% passive ROI has collapsed under real criminal court charges in Singapore. Read our hard hitting article on real equipment setup fees, empty location tricks, and how to verify actual unit economics before you lose your capital.',
        category: 'Franchise Scam Alert',
        categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
        date: 'July 12, 2026',
        authorName: 'Chen Yong Lin',
        authorRole: 'Editor, Franchise.sg',
        authorSlug: 'chen-yong-lin',
    }
];

export default function InsightsPage() {
    const visibleArticles = ARTICLES.filter((article) => {
        if (!('publishAt' in article) || !article.publishAt) return true;
        return new Date(article.publishAt).getTime() <= Date.now();
    });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://www.franchise.sg/insights#webpage",
        "url": "https://www.franchise.sg/insights",
        "name": "Franchise Insights Singapore | Market Intelligence & Unit Economics",
        "description": "Data-driven analysis, unit economics, and regulatory compliance reports for Singapore franchise investors.",
        "isPartOf": {
            "@id": "https://www.franchise.sg/#website"
        },
        "about": {
            "@type": "ItemList",
            "itemListElement": visibleArticles.map((article, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "url": `https://www.franchise.sg/insights/${article.slug}`,
                "name": article.title
            }))
        }
    };

    return (
        <main className="w-full bg-slate-50 min-h-screen pb-20 font-sans antialiased text-slate-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Banner */}
            <section className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-6xl mx-auto space-y-4">
                    <Link
                        href="/"
                        className="text-xs font-black uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors inline-block"
                    >
                        ← Return to Franchise Singapore Directory
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">
                        Franchise Insights Singapore | Market Intelligence &amp; Due Diligence
                    </h1>
                    <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Data-backed analysis, commercial tenancy audits, and unit economic teardowns for Singapore franchise investors and brand operators.
                    </p>
                </div>
            </section>

            {/* Articles Grid Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
                <h2 className="text-2xl font-black text-slate-950">
                    Latest Franchise Trends &amp; Market Reports
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleArticles.map((article) => (
                        <div
                            key={article.slug}
                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${article.categoryColor}`}>
                                        {article.category}
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        {article.date}
                                    </span>
                                </div>

                                <h3 className="text-lg font-black text-slate-950 leading-snug">
                                    <Link href={`/insights/${article.slug}`} className="hover:text-teal-700 transition-colors">
                                        {article.title}
                                    </Link>
                                </h3>

                                <p className="text-slate-600 text-xs leading-relaxed line-clamp-4">
                                    {article.description}
                                </p>
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                                        Contributor
                                    </span>
                                    <Link
                                        href={`/author/${article.authorSlug}`}
                                        className="text-xs font-bold text-slate-900 hover:text-teal-700 transition-colors"
                                    >
                                        {article.authorName} <span className="text-slate-500 font-normal">· {article.authorRole}</span>
                                    </Link>
                                </div>

                                <Link
                                    href={`/insights/${article.slug}`}
                                    className="w-full text-center block bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black py-2.5 rounded-xl transition-colors"
                                >
                                    Read Full Article →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ecosystem Advisory & International Expansion Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full text-teal-800 text-xs font-bold uppercase tracking-wider">
                            Singapore Advisory
                        </div>
                        <h3 className="text-xl font-bold text-slate-950">
                            Franchise Feasibility &amp; IP Strategy
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Looking to transform your existing Singapore business into a certified franchise system? Consult with recognized Singapore IP &amp; franchise specialists.
                        </p>
                        <a
                            href="https://www.ftsynergist.com/franchise-consultant"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold text-sm transition-colors pt-2"
                        >
                            Explore FT Synergist Advisory →
                        </a>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full text-sky-800 text-xs font-bold uppercase tracking-wider">
                            Global Scaling
                        </div>
                        <h3 className="text-xl font-bold text-slate-950">
                            Cross-Border Master Licensing
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Scale your franchise brand across Southeast Asia, Australia, and international markets through regional master franchise networks.
                        </p>
                        <a
                            href="https://www.growingbeyondborders.com/"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-bold text-sm transition-colors pt-2"
                        >
                            Explore Growing Beyond Borders →
                        </a>
                    </div>
                </div>
            </section>

        </main>
    );
}