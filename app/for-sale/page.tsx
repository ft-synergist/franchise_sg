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
            {/* Uniform Portal Header */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 text-xs mb-4">
                        <Link href="/" className="text-teal-400 hover:underline">Directory</Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-slate-400">Resale Units</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full mb-4">
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Premium Dealflow</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight leading-none">
                        Verified Franchise Businesses For Sale
                    </h1>
                    <p className="text-slate-400 mt-3 text-base max-w-2xl font-light">
                        Acquire cash-flowing established franchise locations with operational infrastructure and historical financial data intact.
                    </p>
                </div>
            </header>

            {/* Grid Canvas */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {!listings || listings.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <p className="text-slate-500">No active resale opportunities available at this time.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-all">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {item.franchises?.category || 'Retail'}
                                </span>

                                <h3 className="text-xl font-black text-slate-950 mt-1">{item.title}</h3>

                                <div className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1.5">
                                    📍 Region: <span className="text-slate-800 font-bold">{item.location_region}</span>
                                </div>

                                {/* Unified Financial Metrics Container */}
                                <div className="mt-6 border-t border-slate-100 pt-4 bg-slate-50/80 p-4 rounded-xl space-y-2.5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 font-medium">Asking Price:</span>
                                        <span className="font-extrabold text-slate-900 text-sm">S${item.asking_price_sgd.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 font-medium">Monthly Revenue:</span>
                                        <span className="font-bold text-teal-600 text-sm">S${item.monthly_revenue_sgd.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-slate-200/60 pt-2">
                                        <span className="text-xs text-slate-600 font-semibold">Net Profit (Take Home):</span>
                                        <span className="font-extrabold text-slate-950 text-sm">S${item.net_profit_sgd.toLocaleString()}</span>
                                    </div>
                                </div>

                                <p className="text-slate-500 text-xs italic mt-4 line-clamp-2 leading-relaxed flex-1">
                                    "{item.reason_for_selling}"
                                </p>

                                <button className="w-full mt-6 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-sm transition-colors duration-150">
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