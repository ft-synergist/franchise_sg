import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Cache category variants for 60 seconds

// Map incoming clean URL slugs to exact database category lookups
const categoryMap: Record<string, { dbName: string; displayName: string }> = {
    'food-beverage': { dbName: 'Food & Beverage', displayName: 'Food & Beverage' },
    'personal-services': { dbName: 'Personal Services', displayName: 'Personal Services' },
    'childrens-services': { dbName: 'Children\'s Services', displayName: "Children's Services" },
    'retail-convenience': { dbName: 'Retail & Convenience', displayName: 'Retail & Convenience' },
};

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

// Generate dynamic page metadata for hyper-targeted local category SEO
export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = await params;
    const config = categoryMap[slug];

    if (!config) return {};

    const title = `${config.displayName} Franchises Singapore | Top Sector Opportunities`;
    const description = `Compare initial setup fees, minimum capital requirements, and ongoing royalties for premium ${config.displayName} franchise opportunities across Singapore and Asia.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.franchise.sg/categories/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.franchise.sg/categories/${slug}`,
            type: 'website',
        }
    };
}

export default async function CategoryDirectoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const config = categoryMap[slug];

    // Soft fallback if an investor requests a non-existent marketplace vertical
    if (!config) {
        notFound();
    }

    // Query Supabase filtering exclusively on the matched targeted category sector
    const { data: franchises, error } = await supabase
        .from('franchises')
        .select('*')
        .eq('category', config.dbName)
        .order('is_featured', { ascending: false })
        .order('brand_name', { ascending: true });

    // Structural JSON-LD ItemList Schema to dominate niche specific search queries
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `https://www.franchise.sg/categories/${slug}/#webpage`,
        "url": `https://www.franchise.sg/categories/${slug}`,
        "name": `${config.displayName} Franchises Singapore Directory`,
        "description": `Analyze investment structures for ${config.displayName} brands in Singapore.`,
        "about": {
            "@type": "ItemList",
            "name": `${config.displayName} Business Opportunities`,
            "itemListElement": franchises?.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "BusinessWithPhysicalSystem",
                    "name": item.brand_name,
                    "description": item.description
                }
            })) || []
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />

            {/* Dynamic Segment Header Viewport */}
            <header className="bg-gradient-to-r from-teal-950 via-slate-950 to-slate-950 text-white py-16 px-6 border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

                    <Link
                        href="/"
                        className="text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors mb-4 inline-block"
                    >
                        ← Back to Main Directory
                    </Link>

                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white max-w-4xl leading-tight mt-2">
                        {config.displayName} Franchises in Singapore
                    </h1>

                    <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                        Review vetted investments, baseline overhead setups, and dynamic expansion trajectories for verified sectors inside the Singaporean and wider Asian demographic.
                    </p>
                </div>
            </header>

            {/* Filtered Context Grid Blocks */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {!franchises || franchises.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <p className="text-slate-500">No active brands currently listed under {config.displayName} for this cycle.</p>
                        <Link href="/apply" className="mt-4 inline-block text-xs font-bold text-teal-600 hover:underline">
                            Be the first to list your brand here →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {franchises.map((item) => (
                            <div key={item.id} className={`bg-white border rounded-2xl p-6 flex flex-col transition-all shadow-sm hover:shadow-md ${item.is_featured ? 'border-teal-500/40 bg-gradient-to-b from-teal-50/10 to-white' : 'border-slate-200/80'}`}>

                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {item.category}
                                    </span>
                                    {item.is_featured && (
                                        <span className="text-[10px] font-extrabold bg-teal-600 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
                                            Premium Partner
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-black text-slate-950">{item.brand_name}</h3>
                                <p className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed flex-1">
                                    {item.description}
                                </p>

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