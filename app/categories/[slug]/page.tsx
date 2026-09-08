import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VERIFIED_LISTINGS } from '@/lib/verifiedListings';

export const revalidate = 60; // Cache category variants for 60 seconds

// Exact routing taxonomy configuration map with verified third-party citations
const categoryMap: Record<string, { dbNames: string[]; displayName: string; canonicalSlug: string; marketSummary: string; citation: string }> = {
    'food-beverage': {
        dbNames: ['Food & Beverage', 'Food and Beverage', 'F&B', 'Food & Beverage (QSR & Full-Service)'],
        displayName: 'Food & Beverage',
        canonicalSlug: 'food-beverage',
        marketSummary: 'Food & Beverage remains Singapore\'s most active franchise category, anchored by dense consumer footfall and established dining habits. Profitable operators leverage central kitchen economies, standardized operating procedures (SOPs), and MUIS Halal certification to access Singapore\'s multi-ethnic market.',
        citation: 'Source: Department of Statistics Singapore (SingStat) F&B Services Index; Singapore Food Agency (SFA) Retail Food Establishment Licensing Framework.'
    },
    'education-enrichment': {
        dbNames: ['Education & Enrichment', 'Education and Enrichment', 'Education', "Children's Services (Education & Enrichment)"],
        displayName: 'Education & Enrichment',
        canonicalSlug: 'education-enrichment',
        marketSummary: 'Singapore\'s private education and enrichment sector benefits from high household investment in supplementary academics, language enrichment, STEM, and early childhood development. Franchise systems in this sector feature predictable term-based recurring revenue and strong student retention rates.',
        citation: 'Source: SingStat Household Expenditure Survey; Ministry of Social and Family Development (MSFD) Early Childhood Guidelines.'
    },
    'education': {
        dbNames: ['Education & Enrichment', 'Education and Enrichment', 'Education', "Children's Services (Education & Enrichment)"],
        displayName: 'Education & Enrichment',
        canonicalSlug: 'education-enrichment',
        marketSummary: 'Singapore\'s private education and enrichment sector benefits from high household investment in supplementary academics, language enrichment, STEM, and early childhood development. Franchise systems in this sector feature predictable term-based recurring revenue and strong student retention rates.',
        citation: 'Source: SingStat Household Expenditure Survey; Ministry of Social and Family Development (MSFD) Early Childhood Guidelines.'
    },
    'retail-services': {
        dbNames: ['Retail Services', 'Retail', 'Retail & Convenience'],
        displayName: 'Retail & Convenience',
        canonicalSlug: 'retail-services',
        marketSummary: 'Retail franchising in Singapore covers automated retail kiosks, convenience chains, and specialized lifestyle merchandise. Key success factors include automated POS inventory replenishment, streamlined staffing footprints, and prime transit or heartland mall positioning.',
        citation: 'Source: SingStat Retail Sales Index; Urban Redevelopment Authority (URA) Commercial Real Estate Statistics.'
    },
    'retail': {
        dbNames: ['Retail Services', 'Retail', 'Retail & Convenience'],
        displayName: 'Retail & Convenience',
        canonicalSlug: 'retail-services',
        marketSummary: 'Retail franchising in Singapore covers automated retail kiosks, convenience chains, and specialized lifestyle merchandise. Key success factors include automated POS inventory replenishment, streamlined staffing footprints, and prime transit or heartland mall positioning.',
        citation: 'Source: SingStat Retail Sales Index; Urban Redevelopment Authority (URA) Commercial Real Estate Statistics.'
    },
    'health-wellness': {
        dbNames: ['Health & Wellness', 'Health and Wellness', 'Personal Services (Wellness, Fitness & Salons)', 'Eldercare Services & Healthcare Centers'],
        displayName: 'Health & Wellness',
        canonicalSlug: 'health-wellness',
        marketSummary: 'The health, personal wellness, and aesthetics sector in Singapore is driven by high per-capita disposable income and wellness consciousness. Scalable brands utilize certified treatment protocols, recurring membership packages, and standardized customer care models.',
        citation: 'Source: SingStat Consumer Price Index (Health & Personal Care); Ministry of Health (MOH) Healthcare Services Act (HCSA).'
    },
    'beauty-wellness': {
        dbNames: ['Health & Wellness', 'Health and Wellness', 'Personal Services (Wellness, Fitness & Salons)', 'Eldercare Services & Healthcare Centers'],
        displayName: 'Health & Wellness',
        canonicalSlug: 'health-wellness',
        marketSummary: 'The health, personal wellness, and aesthetics sector in Singapore is driven by high per-capita disposable income and wellness consciousness. Scalable brands utilize certified treatment protocols, recurring membership packages, and standardized customer care models.',
        citation: 'Source: SingStat Consumer Price Index (Health & Personal Care); Ministry of Health (MOH) Healthcare Services Act (HCSA).'
    },
    'services': {
        dbNames: ['Commercial & Residential Services', 'Business Services (B2B & Consulting)', 'Software, AI & Digital Technology', 'Automotive Tech & Maintenance'],
        displayName: 'Commercial & B2B Services',
        canonicalSlug: 'services',
        marketSummary: 'Service franchises in Singapore encompass commercial facilities maintenance, logistics support, automotive engineering, and digital business services. These asset-light models feature low capital fitout requirements and stable recurring contract revenues.',
        citation: 'Source: Accounting and Corporate Regulatory Authority (ACRA); Enterprise Singapore (EnterpriseSG) Industry Transformation Maps (ITMs).'
    }
};

export async function generateStaticParams() {
    return Object.keys(categoryMap).map((slug) => ({ slug }));
}

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = await params;
    const config = categoryMap[slug];

    if (!config) return {};

    const title = `${config.displayName} Franchises Singapore (2026) | Verified Opportunities`;
    const description = `Compare capital requirements, initial franchise fees, and royalty structures for ${config.displayName} franchise opportunities in Singapore. Audited directory data.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.franchise.sg/categories/${config.canonicalSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://www.franchise.sg/categories/${config.canonicalSlug}`,
            type: 'website',
            locale: 'en_SG',
        }
    };
}

export default async function CategoryDirectoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const config = categoryMap[slug];

    if (!config) {
        notFound();
    }

    const { data: rawFranchises } = await supabase
        .from('crm_franchises')
        .select('*')
        .in('category', config.dbNames)
        .order('is_featured', { ascending: false })
        .order('brand_name', { ascending: true });

    const dbList = rawFranchises || [];
    const dbSlugs = new Set(dbList.map((item) => item.slug));

    const enrichedFromDb = dbList.map((item) => {
        const v = VERIFIED_LISTINGS[item.slug];
        if (!v) return item;
        return {
            ...item,
            brand_name: v.brand_name || item.brand_name,
            category: v.category || item.category,
            brand_origin: v.brand_origin || item.brand_origin,
            current_outlets: v.current_outlets_sg || item.current_outlets,
            min_capital_sgd: v.min_capital_sgd ?? item.min_capital_sgd,
            franchise_fee_sgd: typeof v.franchise_fee_sgd === 'number' ? v.franchise_fee_sgd : (item.franchise_fee_sgd || v.franchise_fee_sgd),
            royalty_fee_text: v.royalty_fee_text || item.royalty_fee_text,
            description: v.description || item.description
        };
    });

    const extraVerified = Object.values(VERIFIED_LISTINGS)
        .filter((v) => config.dbNames.includes(v.category) && !dbSlugs.has(v.slug))
        .map((v) => ({
            id: v.slug,
            brand_name: v.brand_name,
            slug: v.slug,
            category: v.category,
            brand_origin: v.brand_origin,
            current_outlets: v.current_outlets_sg,
            min_capital_sgd: v.min_capital_sgd,
            franchise_fee_sgd: v.franchise_fee_sgd,
            royalty_fee_text: v.royalty_fee_text,
            description: v.description,
            is_featured: false
        }));

    const franchises = [...enrichedFromDb, ...extraVerified].sort((a, b) => 
        a.brand_name.localeCompare(b.brand_name)
    );

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `https://www.franchise.sg/categories/${config.canonicalSlug}/#webpage`,
                "url": `https://www.franchise.sg/categories/${config.canonicalSlug}`,
                "name": `${config.displayName} Franchises Singapore Directory`,
                "description": `Analyze investment structures and capital requirements for ${config.displayName} franchise opportunities in Singapore.`,
                "about": {
                    "@type": "ItemList",
                    "name": `${config.displayName} Business Opportunities in Singapore`,
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
            },
            {
                "@type": "FAQPage",
                "@id": `https://www.franchise.sg/categories/${config.canonicalSlug}/#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `How much does a ${config.displayName} franchise cost in Singapore?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Investment capital for ${config.displayName} franchises in Singapore varies by format. Typical capital requirements range from S$30,000 for compact kiosk setups to S$500,000+ for large format premises, covering franchise fees, commercial fitout, and working capital.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `What are the key regulations for ${config.displayName} franchises in Singapore?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Operators must comply with Singapore statutory regulations including ACRA corporate registration, IPOS trademark licensing compliance, and relevant sectoral licensing (such as SFA for food safety or MOH for healthcare standards).`
                        }
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />

            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-16 px-6 border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    <Link
                        href="/"
                        className="text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors mb-4 inline-block"
                    >
                        ← Back to Main Directory
                    </Link>

                    <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full mb-4 ml-4">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                            Singapore Industry Sector
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
                        {config.displayName} Franchises in Singapore
                    </h1>

                    <p className="text-slate-300 mt-4 text-sm sm:text-base max-w-3xl font-normal leading-relaxed">
                        Compare verified minimum capital requirements (SGD), initial franchise fees, and royalty models for {config.displayName} brands operating in Singapore.
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Sector Authority Brief with Statutory Citations */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-10 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                            Sector Economic Overview
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                            Singapore Commercial Intelligence
                        </span>
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        {config.marketSummary}
                    </p>
                    <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-3 italic">
                        {config.citation}
                    </p>
                </div>

                <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                        Verified {config.displayName} Listings ({franchises?.length || 0})
                    </h2>
                    <Link href="/" className="text-xs font-bold text-teal-700 hover:text-teal-800">
                        View All Categories &rarr;
                    </Link>
                </div>

                {!franchises || franchises.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <p className="text-slate-500 font-medium">
                            No active brands currently listed under {config.displayName} for this verification cycle.
                        </p>
                        <Link href="/" className="mt-4 inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors">
                            Browse All Active Singapore Franchises
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
                                        <span className="font-bold text-slate-700 text-sm">
                                            {typeof item.franchise_fee_sgd === 'number' ? `S$${item.franchise_fee_sgd.toLocaleString()}` : (item.franchise_fee_sgd || 'On Application')}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-slate-100/50 p-2 rounded-lg">
                                    💰 <span className="text-slate-700 font-semibold">Royalty:</span> {item.royalty_fee_text}
                                </div>

                                <Link
                                    href={`/franchise/${item.slug}`}
                                    className="w-full mt-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-center font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors duration-150 block"
                                >
                                    View Full Capital &amp; Unit Breakdown
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ Section */}
                <section className="mt-16 pt-12 border-t border-slate-200 space-y-6">
                    <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                        Frequently Asked Questions — {config.displayName} Franchises
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                                How much capital is required to start a {config.displayName} franchise in Singapore?
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Capital typically ranges from S$30,000 for compact kiosks to over S$500,000 for full-scale premises. This covers initial franchise fees, commercial fitout, rental deposits, and working capital.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                                What statutory regulations apply to {config.displayName} franchises in Singapore?
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Key statutory frameworks include ACRA corporate registration, IPOS trademark licensing compliance, and sectoral licensing governed by statutory boards such as SFA or MOH.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}