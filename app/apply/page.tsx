import Link from 'next/link';

export const metadata = {
    title: 'List Your Franchise Brand | Singapore Franchise Portal',
    description: 'Put your brand footprint in front of high-net-worth investors and prospective corporate operators looking for franchise opportunities in Singapore.',
    alternates: {
        canonical: 'https://franchise.sg/apply',
    },
    openGraph: {
        title: 'List Your Franchise Brand | Singapore Franchise Portal',
        description: 'Put your brand footprint in front of high-net-worth investors and prospective corporate operators looking for franchise opportunities in Singapore.',
        url: 'https://franchise.sg/apply',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'List Your Franchise Brand | Singapore Franchise Portal',
        description: 'Put your brand footprint in front of high-net-worth investors and prospective corporate operators looking for franchise opportunities in Singapore.',
    }
};

export default function FranchiseApplyPage() {
    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">

            {/* Standardized Header Block */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-4xl mx-auto text-left">

                    {/* 100% Uniform Singapore Franchise Portal Pill Tag */}
                    <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                            Singapore Franchise Portal
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-none">
                        List Your Franchise Brand
                    </h1>

                    <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl font-light">
                        Put your brand footprint in front of high-net-worth investors and prospective corporate operators in Singapore.
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

            {/* Main Intake Form Grid Area */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">

                    <h2 className="text-xl font-extrabold text-slate-950 tracking-tight mb-2">
                        Brand Registration Profile
                    </h2>
                    <p className="text-xs text-slate-500 mb-8 leading-relaxed">
                        Fill out the operational fields below. Our review unit will verify the details against active business registry data before activating your public directory entry.
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
                                    Primary Category
                                </label>
                                <select className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-700 font-medium transition-all">
                                    <option>Food &amp; Beverage</option>
                                    <option>Retail Services</option>
                                    <option>Health &amp; Wellness</option>
                                    <option>Education Infrastructure</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Minimum Capital Required (SGD)
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="e.g. 60000"
                                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                                />
                            </div>
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
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                Ongoing Royalty Structure Details
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 5% Monthly Gross Profit or Fixed S$1,200/mo"
                                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                Brand Value Proposition &amp; Operational Overview
                            </label>
                            <textarea
                                rows={4}
                                required
                                placeholder="Provide a clean operational description detailing active outlet density, localized supply chains, or physical equipment footprint records."
                                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all resize-none leading-relaxed"
                            />
                        </div>

                        <hr className="my-6 border-slate-100" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Corporate Authorized Contact Name
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
                                    Official Corporate Email Address
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