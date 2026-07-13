import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 60; // Cache index pages globally on Vercel Edge nodes for 60 seconds

export default async function FranchiseDirectoryHome() {
  // Fetch both featured premium client nodes and un-solicited benchmark options dynamically
  const { data: franchises, error } = await supabase
    .from('franchises')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('brand_name', { ascending: true });

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">

      {/* Search & Brand Positioning Header */}
      <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Singapore Franchise Portal
            </span>
          </div>

          {/* UPDATED: Strategic Headline */}
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            Find the Latest Franchise Opportunities in Singapore
          </h1>

          {/* UPDATED: Strategic SEO Parameter Copy */}
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-3xl font-normal leading-relaxed">
            Understand the Minimum Investment Capital Required (SGD) before meeting the franchisors. Access initial franchise fees and setup fees, ongoing royalties and franchise categories across Singapore and Asian markets.
          </p>

          {/* UPDATED: Coherent Strategic Action Button Array */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-sm transition-colors duration-200"
            >
              Find the Latest Franchise Opportunities in Singapore
            </Link>

            <Link
              href="/insights"
              className="border border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
            >
              Franchise Insights
            </Link>

            <Link
              href="/apply"
              className="border border-slate-800 hover:bg-slate-900/30 text-slate-400 hover:text-slate-300 font-bold py-3 px-6 rounded-xl text-sm transition-colors duration-200"
            >
              Register Your Franchise Brand
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid Engine */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-8">
          Browse Verified Open Opportunities
        </h2>

        {!franchises || franchises.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500">Database synchronization in progress. Please refresh shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {franchises.map((item) => (
              <div key={item.id} className={`bg-white border rounded-2xl p-6 flex flex-col transition-all shadow-sm hover:shadow-md ${item.is_featured ? 'border-teal-500/40 bg-gradient-to-b from-teal-50/10 to-white' : 'border-slate-200/80'}`}>

                {/* Header Flag */}
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                  {item.is_featured && (
                    <span className="text-[10px] font-extrabold bg-teal-600 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
                      Premium Partner
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-950 mt-1">{item.brand_name}</h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Micro Financial Snapshot */}
                <div className="mt-6 border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 bg-slate-50/80 p-3 rounded-xl">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Min Capital</span>
                    <span className="font-extrabold text-slate-900 text-sm">S${item.min_capital_sgd ? item.min_capital_sgd.toLocaleString() : '0'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Franchise Fee</span>
                    <span className="font-bold text-slate-700 text-sm">S${item.franchise_fee_sgd ? item.franchise_fee_sgd.toLocaleString() : '0'}</span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-slate-100/50 p-2 rounded-lg">
                  💰 <span className="text-slate-700 font-semibold">Royalty:</span> {item.royalty_fee_text}
                </div>

                {/* Route Action Bridge */}
                <button className="w-full mt-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors duration-150">
                  Request Full Disclosure Packet
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}