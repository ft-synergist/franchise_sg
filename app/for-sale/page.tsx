import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 60;

export default async function ForSaleDirectory() {
    const { data: listings, error } = await supabase
        .from('listings_for_sale')
        .select(`
      *,
      franchises (
        brand_name,
        category
      )
    `)
        .eq('status', 'active');

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans">
            {/* Exact Homepage Header Match */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Premium Dealflow</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight max-w-3xl leading-none">
                        Verified Franchise Businesses For Sale — Singapore
                    </h1>
                    <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl font-light">
                        Acquire cash-flowing established franchise locations with operational infrastructure and historical financial data intact.
                    </p>
                    <div className="mt-8">
                        <Link href="/" className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 px-6 py-3 rounded-xl font-semibold transition-all text-sm inline-block">
                            ← Return to Main Directory
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Grid Engine Matching Homepage */}
            <main className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-8">
                    Active Resale Commercial Nodes
                </h2>

                {!listings || listings.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <p className="text-slate-500">No active resale opportunities available at this time.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-all">

                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {item.franchises?.category || 'Food & Beverage'}
                                    </span>
                                    <span className="text-[10px] font-extrabold bg-teal-600 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
                                        Verified Resale
                                    </span>
                                </div>

                                <h3 className="text-xl font-black text-slate-950 mt-1">{item.title}</h3>

                                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-slate-100/50 p-2 rounded-lg w-fit">
                                    📍 <span className="text-slate-700 font-semibold">Region:</span> {item.location_region}
                                </div>

                                {/* Micro Financial Snapshot Matching Homepage Elements */}
                                <div className="mt-6 border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 bg-slate-50/80 p-3 rounded-xl">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Asking Price</span>
                                        <span className="font-extrabold text-slate-900 text-sm">S${item.asking_price_sgd.toLocaleString()}</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Rev</span>
                                        <span className="font-bold text-teal-600 text-sm">S${item.monthly_revenue_sgd.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-teal-50/50 border border-teal-100 p-2 rounded-lg">
                                    💰 <span className="text-teal-950 font-semibold">Net Profit (Take Home):</span> S${item.net_profit_sgd.toLocaleString()}
                                </div>

                                <p className="text-slate-500 text-xs sm:text-sm mt-4 line-clamp-3 leading-relaxed flex-1 italic">
                                    "{item.reason_for_selling}"
                                </p>

                                <button className="w-full mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors duration-150">
                                    Request Financial Statements
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}