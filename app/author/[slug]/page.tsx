import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EDITORS } from '@/lib/editors';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }> | { slug: string };
};

// Registered articles mapped by author slug
const AUTHOR_ARTICLES: Record<string, Array<{ slug: string; title: string; description: string; date: string; category: string }>> = {
    'maggie-png': [
        {
            slug: 'lease-or-own-franchise-commercial-property-singapore',
            title: 'Lease or Own? What Franchisees in Singapore Must Calculate Before Deciding (2026 Commercial Guide)',
            description: 'Commercial Property Strategist Maggie Png breaks down the true financial and operational comparison between leasing vs buying franchise premises in Singapore, covering BSD, MAS LTV rules, CoC protections, and capital allocation.',
            date: 'September 1, 2026',
            category: 'Commercial Real Estate Strategy',
        },
        {
            slug: 'foot-traffic-lies-predicts-franchise-unit-survival-singapore',
            title: "Foot Traffic Lies. Here's What Actually Predicts a Franchise Unit's Survival",
            description: "Every leasing pitch in Singapore comes with footfall numbers, yet high-profile F&B units fail within years. Commercial Property Strategist Maggie Png exposes why raw foot traffic lies and reveals the true predictors of 5-year unit survival.",
            date: 'August 13, 2026',
            category: 'Commercial Leasing Strategy',
        },
        {
            slug: 'vending-machine-illusion-singapore-franchise-lease',
            title: 'The $200,000 Vending Machine Illusion: What Singapore’s Retail Scandals Must Teach Franchise Buyers About Their Leases',
            description: 'As automated retail scandals shock local investors, commercial property strategist Maggie Png breaks down the 5-point Singapore lease audit every franchisee needs before signing.',
            date: 'July 31, 2026',
            category: 'Commercial Leasing Audit',
        }
    ],
    'chen-yong-lin': [
        {
            slug: 'how-to-determine-the-best-food-franchise-to-invest-in-singapore',
            title: 'How to Determine the Best F&B Franchise to Invest in Singapore: The Evolution of Singapore F&B Franchise (1968–2026)',
            description: 'Discover what makes a resilient food franchise opportunity in Singapore. An unfiltered analysis of historical fast-food evolution, rental traps, and navigating the manpower squeeze.',
            date: 'July 14, 2026',
            category: 'Market Strategy',
        },
        {
            slug: 'vending-machine-franchise-analysis-singapore',
            title: 'Vending Machine Franchise Scam Alert: The Reality Behind "Hands-Off Passive Income" in Singapore',
            description: 'The promise of 30%+ passive ROI has collapsed under real criminal court charges in Singapore. Read our hard hitting article on real equipment setup fees, empty location tricks, and how to verify actual unit economics.',
            date: 'July 12, 2026',
            category: 'Franchise Scam Alert',
        }
    ],
    'frederick-tan': [
        {
            slug: 'bubble-tea-franchise-singapore-cost-profitability-analysis',
            title: 'The $3.7 Billion Bubble Tea Illusion: Franchise Hype vs. Reality in Singapore (2026 Breakdown)',
            description: 'From 1999 Each-A-Cup survival pivots to 2026 Mixue $1 ice cream disruption and Chagee automated brewing: an unfiltered unit economic teardown of bubble tea franchising in Singapore.',
            date: 'August 26, 2026',
            category: 'Franchise Unit Economics',
        }
    ]
};

export async function generateStaticParams() {
    return Object.keys(EDITORS).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const editor = EDITORS[resolvedParams.slug];
    if (!editor) return {};

    return {
        title: `${editor.name} - ${editor.role} | Franchise.sg`,
        description: editor.bio,
    };
}

export default async function AuthorProfilePage({ params }: Props) {
    const resolvedParams = await params;
    const editor = EDITORS[resolvedParams.slug];

    if (!editor) {
        notFound();
    }

    const articles = AUTHOR_ARTICLES[resolvedParams.slug] || [];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        'mainEntity': {
            '@type': 'Person',
            'name': editor.name,
            'jobTitle': editor.role,
            'worksFor': {
                '@type': 'Organization',
                'name': 'Franchise.sg',
                'url': 'https://www.franchise.sg'
            },
            'url': `https://www.franchise.sg/author/${editor.slug}`,
            'description': editor.bio,
            'knowsAbout': editor.specialties
        }
    };

    return (
        <main className="w-full bg-slate-50 min-h-screen text-slate-900 pb-20 font-sans antialiased">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Banner */}
            <section className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Link
                        href="/editors"
                        className="text-xs font-black uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors inline-block"
                    >
                        ← Back to Editorial Board
                    </Link>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-teal-700 flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-teal-400 shrink-0">
                            {editor.initials}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">{editor.name}</h1>
                            <p className="text-teal-400 text-sm font-bold mt-1">{editor.role} · Franchise.sg</p>
                            <p className="text-slate-400 text-xs mt-0.5">Vertical Focus: {editor.vertical}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profile Details & Articles */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-black uppercase tracking-wider text-slate-600">
                            {editor.slug === 'frederick-tan' ? 'About the Contributor' : 'About the Analyst'}
                        </h2>
                        {editor.slug === 'frederick-tan' && (
                            <a
                                href="https://www.ftsynergist.com/franchise-consultant"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-black text-teal-700 hover:text-teal-800 underline uppercase tracking-wider"
                            >
                                FT Synergist Advisory →
                            </a>
                        )}
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{editor.bio}</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">Primary Research Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                        {editor.specialties.map((topic) => (
                            <span key={topic} className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Published Articles Section */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">
                            Published Insights & Research ({articles.length})
                        </h3>
                    </div>

                    {articles.length === 0 ? (
                        <p className="text-slate-500 text-xs italic">No published insights yet for this analyst.</p>
                    ) : (
                        <div className="space-y-4">
                            {articles.map((art) => (
                                <div
                                    key={art.slug}
                                    className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                >
                                    <div className="space-y-1.5 max-w-2xl">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                                                {art.category}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">{art.date}</span>
                                        </div>
                                        <h4 className="text-base font-black text-slate-950 leading-snug">
                                            <Link href={`/insights/${art.slug}`} className="hover:text-teal-700 transition-colors">
                                                {art.title}
                                            </Link>
                                        </h4>
                                        <p className="text-slate-600 text-xs line-clamp-2">{art.description}</p>
                                    </div>

                                    <Link
                                        href={`/insights/${art.slug}`}
                                        className="shrink-0 text-xs font-black text-teal-700 hover:text-teal-800 underline underline-offset-2"
                                    >
                                        Read Article →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}