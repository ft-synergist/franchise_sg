import Link from 'next/link';

export const metadata = {
    title: 'Franchise Insights | Singapore Fees, Trends & Costs',
    description: 'Before you sign a franchise agreement, compare initial setup fees, franchise trends, ongoing royalties, operational costs, and breakeven timelines across Singapore and Asia.',
    alternates: {
        canonical: 'https://franchise.sg/insights',
    },
    openGraph: {
        title: 'Franchise Insights | Singapore Fees, Trends & Costs',
        description: 'Before you sign a franchise agreement, compare initial setup fees, franchise trends, ongoing royalties, operational costs, and breakeven timelines across Singapore and Asia.',
        url: 'https://franchise.sg/insights',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Franchise Insights | Singapore Fees, Trends & Costs',
        description: 'Before you sign a franchise agreement, compare initial setup fees, franchise trends, ongoing royalties, operational costs, and breakeven timelines across Singapore and Asia.',
    }
};

const articles = [
    {
        title: 'Vending Machine Franchise Scam Alert: The Reality Behind "Hands-Off Passive Income" in Singapore',
        slug: 'vending-machine-franchise-analysis-singapore',
        excerpt: 'The promise of 30%+ passive ROI has collapsed under real criminal court charges in Singapore. Read our hard hitting article on real equipment setup fees, empty location tricks, and how to verify actual unit economics before you lose your capital.',
        category: 'Franchise Scam Alert',
        author: 'Chen Yong Lin',
        role: 'Editor-in-Chief',
        date: 'July 12, 2026'
    }
];

export default function InsightsHubPage() {
    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">

            {/* Dynamic Header Block */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

                    <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Singapore Franchise Portal</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
                        Franchise Insights
                    </h1>

                    {/* Exact User-Optimized Intent Copy Block */}
                    <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-3xl font-normal leading-relaxed">
                        Don&apos;t sign a franchise agreement blindly. We break down the real data and numbers investors care about: franchise trends and growth, initial setup fees, ongoing royalties, hidden operational costs, projected breakeven timelines, and transparent EBITDA margins across Singapore and Asia Region.
                    </p>
                </div>
            </header>

            {/* Main Listing Layout - Misleading Subheader Completely Stripped */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Dynamic Card Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {articles.map((article) => (
                        <article
                            key={article.slug}
                            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col transition-all shadow-sm hover:shadow-md hover:border-slate-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                                    {article.category}
                                </span>
                                <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider">
                                    {article.date}
                                </span>
                            </div>

                            <Link href={`/insights/${article.slug}`} className="block group flex-1">
                                <h3 className="text-xl font-black text-slate-950 mt-1 mb-2 group-hover:text-teal-600 transition-colors leading-snug">
                                    {article.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                                    {article.excerpt}
                                </p>
                            </Link>

                            <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col gap-2">
                                <div className="bg-slate-50/80 p-3 rounded-xl flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lead Analyst</span>
                                    <span className="font-bold text-slate-800 text-xs mt-0.5">
                                        {article.author} <span className="font-normal text-slate-500">· {article.role}</span>
                                    </span>
                                </div>

                                <Link
                                    href={`/insights/${article.slug}`}
                                    className="w-full text-center mt-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors block"
                                >
                                    Read Full Article
                                </Link>
                            </div>

                        </article>
                    ))}
                </div>
            </main>

        </div>
    );
}