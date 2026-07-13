import Link from 'next/link';

export const metadata = {
    title: 'List Your Franchise Brand | Singapore Franchise Portal',
    description: 'Connect your brand with investment funds, family offices, high-net-worth investors, and master franchise operators in Singapore.',
    alternates: {
        canonical: 'https://franchise.sg/apply',
    },
    openGraph: {
        title: 'List Your Franchise Brand | Singapore Franchise Portal',
        description: 'Connect your brand with investment funds, family offices, high-net-worth investors, and master franchise operators in Singapore.',
        url: 'https://franchise.sg/apply',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'List Your Franchise Brand | Singapore Franchise Portal',
        description: 'Connect your brand with investment funds, family offices, high-net-worth investors, and master franchise operators in Singapore.',
    }
};

export default function FranchiseApplyPage() {
    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">

            {/* Standardized Header Block */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-4xl mx-auto text-left">

                    <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                            Singapore Franchise Portal
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-none">
                        List Your Franchise Brand
                    </h1>

                    {/* Broadened Investment Target Copy */}
                    <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                        Connect your brand footprint directly with high-net-worth individuals, family offices, private equity houses, and experienced master franchise operators across the Singapore and Asian markets.
                    </p>

                    <div className="mt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors"
                        >
                            ← Return to Main Directory
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Intake Form Area */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">

                    <h2 className="text-xl font-extrabold text-slate-950 tracking-tight mb-2">
                        Brand Registration Profile
                    </h2>
                    <p className="text-xs text-slate-500 mb-8 leading-relaxed">
                        Fill out the verified metrics below. Our review unit cross-references all applications with ACRA corporate registry records before deploying your listing profile to our active investor network.
                    </p>

                    <form className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Brand / Corporate Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Jie Bakery"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Singapore UEN (Unique Entity Number)
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 202612345N"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Primary Business Category
                                </label>
                                <select className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-700 font-medium transition-all">
                                    <option>Food &amp; Beverage</option>
                                    <option>Retail &amp; Consumer Kiosks</option>
                                    <option>Health, Wellness &amp; Fitness</option>
                                    <option>Education &amp; Enrichment Infrastructure</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Minimum Investment Capital Required (SGD)
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="e.g. 60000"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Initial Franchise Fee (SGD)
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="e.g. 15000"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Ongoing Monthly Royalty Structure
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 5% Gross Monthly Sales or Fixed S$1,500/mo"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
                        </div>

                        {/* Realigned, Concrete Textarea Block */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                Brand Summary &amp; Franchise Structure
                            </label>
                            <textarea
                                rows={4}
                                required
                                placeholder="State your business model clearly. Include current number of active outlets, required physical store footprint square footage, and standard supply chain arrangements."
                                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all resize-none leading-relaxed"
                            />
                        </div>

                        <hr className="my-6 border-slate-100" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Authorized Management Contact Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Official Management Corporate Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="button"
                                className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-sm transition-colors duration-200 block"
                            >
                                Submit Brand Verification Profile
                            </button>
                        </div>

                    </form>

                </div>

            </main>
        </div>
    );
}