import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Franchise Market Insights & Intelligence | Franchise.sg',
    description: 'Data-driven analysis, unit economics, and regulatory compliance reports for Singapore franchise investors.',
};

const ARTICLES = [
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
    return (
        <main className="w-full bg-slate-50 min-h-screen pb-20 font-sans antialiased text-slate-900">

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
                        Franchise Market Insights & Intelligence
                    </h1>
                    <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Data-backed analysis, commercial tenancy audits, and unit economic teardowns for Singapore franchise investors and brand operators.
                    </p>
                </div>
            </section>

            {/* Articles Grid Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
                <h2 className="text-2xl font-black text-slate-950">
                    Latest Franchise Trends & Market Reports
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ARTICLES.map((article) => (
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
            </section>

        </main>
    );
}