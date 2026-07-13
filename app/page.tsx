import Link from 'next/link';

export const metadata = {
  title: 'Franchise Singapore | Find the Latest Franchise Opportunities',
  description: 'Understand the Minimum Investment Capital Required (SGD) before meeting the franchisors. Access initial franchise fees and setup fees, ongoing royalties and franchise categories across Singapore and Asian markets.',
  alternates: {
    canonical: 'https://www.franchise.sg',
  },
  openGraph: {
    title: 'Franchise Singapore | Find the Latest Franchise Opportunities',
    description: 'Understand the Minimum Investment Capital Required (SGD) before meeting the franchisors. Access initial franchise fees and setup fees, ongoing royalties and franchise categories across Singapore and Asian markets.',
    url: 'https://www.franchise.sg',
    siteName: 'Franchise Singapore',
    type: 'website',
    locale: 'en_SG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franchise Singapore | Find the Latest Franchise Opportunities',
    description: 'Understand the Minimum Investment Capital Required (SGD) before meeting the franchisors. Access initial franchise fees and setup fees, ongoing royalties and franchise categories across Singapore and Asian markets.',
  }
};

const featuredFranchises = [
  {
    name: 'Jie Bakery',
    category: 'Food & Beverage',
    description: 'A legendary local heritage brand serving traditional local bread loaves and nostalgic spreads with an optimized retail layout.'
  },
  {
    name: "Nanay's Kitchen",
    category: 'Food & Beverage',
    description: 'Authentic, high-density comfort cuisine bringing home-style traditional recipes into streamlined commercial cloud kitchens and...'
  },
  {
    name: 'Pawa Bakery',
    category: 'Food & Beverage',
    description: 'Artisanal bakery concept focusing on high-margin, trending local pastries combined with advanced centralized supply chain...'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">

      {/* Master Hero Header Block */}
      <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

          <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Singapore Franchise Portal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            Find the Best Franchise Opportunities in Singapore
          </h1>

          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-3xl font-normal leading-relaxed">
            Analyze audited investment metrics, initial startup fees, and historical growth vectors across trending local assets and international legacies.
          </p>

          {/* Integrated Coherent Strategic Navigation Block */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-sm transition-colors duration-200"
            >
              Explore Active Resale Listings
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

      {/* Core Directory Grid Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-8">
          Browse Verified Open Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFranchises.map((franchise) => (
            <div
              key={franchise.name}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col transition-all shadow-sm hover:shadow-md hover:border-slate-300"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {franchise.category}
                </span>
                <span className="text-[10px] font-extrabold bg-teal-50 text-teal-700 px-2 py-0.5 rounded uppercase tracking-wider">
                  Premium Partner
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-950 mb-2 leading-snug">
                {franchise.name}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                {franchise.description}
              </p>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors inline-flex items-center gap-1 cursor-pointer">
                  View Parameters →
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}