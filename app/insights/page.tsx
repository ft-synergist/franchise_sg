import Link from 'next/link';

export const metadata = {
    title: 'Franchise Insights & Market Intelligence | Franchise.sg',
    description: 'Audited franchise cost analyses, regulatory compliance deep-dives, and commercial retail intelligence for Singapore investors.',
    alternates: {
        canonical: 'https://franchise.sg/insights',
    },
};

// Zero-latency local data matrix array
const articles = [
    {
        title: 'The End of the Passive Income Trap: How Vending Scams Are Changing the Singapore Franchise Landscape',
        slug: 'vending-machine-franchise-analysis-singapore',
        excerpt: 'The era of the effortless "vending machine side hustle" has collided with hard legal realities in Singapore. An editorial teardown of fractional micro-franchising configurations.',
        category: 'Market Analysis',
        author: 'Chen Yong Lin',
        role: 'Editor-in-Chief',
        date: 'July 12, 2026'
    }
];

export default function InsightsHubPage() {
    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">

            {/* Search & Brand Positioning Header - 100% Uniform Homepage Background Match */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

                    <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Singapore Commercial Portal</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-none">
                        Franchise Intelligence Hub
                    </h1>

                    <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl font-light">
                        Compare verified network data, legal compliance risk matrices, and commercial unit economics curated by verified domain experts.
                    </p>
                </div>
            </header>

            {/* Main Grid Engine - 100% Matching Homepage Layout Margins */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-8">
                    Latest Analysis &amp; Briefings
                </h2>

                {/* Dynamic Card Layout Grid Matching the Browse Open Opportunities Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {articles.map((article) => (
                        <article
                            key={article.slug}
                            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col transition-all shadow-sm hover:shadow-md hover:border-slate-300"
                        >
                            {/* Category Flag Blueprint */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
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
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                                    {article.excerpt}
                                </p>
                            </Link>

                            {/* Contributor Snapshot Footer Box matching Micro Financial Snapshots */}
                            <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col gap-2">
                                <div className="bg-slate-50/80 p-3 rounded-xl flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Analyst Identity</span>
                                    <span className="font-bold text-slate-800 text-xs mt-0.5">
                                        {article.author} <span className="font-normal text-slate-500">· {article.role}</span>
                                    </span>
                                </div>

                                {/* Unified Route Action Bridge Button */}
                                <Link
                                    href={`/insights/${article.slug}`}
                                    className="w-full text-center mt-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors block"
                                >
                                    Read Case Briefing
                                </Link>
                            </div>

                        </article>
                    ))}
                </div>
            </main>

        </div>
    );
}