import { supabase } from '@/lib/supabase';

// Forces Next.js to dynamically fetch data on every request for up-to-the-second listing status
export const revalidate = 0;

export default async function FranchiseForSalePage() {
    // Fetch active commercial entries directly from Supabase, joining the brand table
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
        <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans">
            {/* Header Banner */}
            <header className="bg-white border-b border-slate-200 py-12 px-6 shadow-sm">
                <div className="max-w-6xl mx-auto">
                    <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        Premium Dealflow
                    </span>
                    <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight mt-3">
                        Verified Franchise Businesses For Sale — Singapore
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg max-w-2xl">
                        Acquire cash-flowing established franchise locations with operational infrastructure and historical financial data intact.
                    </p>
                </div>
            </header>

            {/* Main Grid View */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {(!listings || listings.length === 0) ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800">No active resale listings found</h3>
                        <p className="text-slate-500 mt-1">We are currently vetting new franchise acquisitions. Check back shortly.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((item: any) => (
                            <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                                <div className="p-6 flex-1">
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                                        {item.franchises?.category || 'General Business'}
                                    </span>
                                    <h2 className="text-xl font-bold text-slate-950 mt-1 leading-snug">
                                        {item.title}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                        📍 Region: <span className="font-semibold text-slate-700">{item.location_region}</span>
                                    </p>

                                    {/* Financial Metrics Stack */}
                                    <div className="mt-6 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="flex justify-between items-center text-sm border-b border-slate-200/50 pb-2">
                                            <span className="text-slate-500 font-medium">Asking Price:</span>
                                            <span className="font-bold text-slate-900 text-base">S${item.asking_price_sgd.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-slate-200/50 pb-2">
                                            <span className="text-slate-500 font-medium">Monthly Revenue:</span>
                                            <span className="font-semibold text-emerald-600">S${item.monthly_revenue_sgd?.toLocaleString() || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 font-medium">Net Profit (Take Home):</span>
                                            <span className="font-bold text-slate-900">S${item.net_profit_sgd?.toLocaleString() || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 mt-4 line-clamp-2 italic">
                                        "{item.reason_for_selling || 'Reason for sale confidential.'}"
                                    </p>
                                </div>

                                {/* Call To Action Block */}
                                <div className="p-4 bg-slate-50/50 border-t border-slate-100 mt-auto">
                                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-colors duration-150 text-sm">
                                        Request Financial Statements
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}