import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Cache individual profile data on Edge layers for 60 seconds

interface PageProps {
    params: Promise<{ slug: string }>;
}

// ==========================================
// DYNAMIC METADATA ENGINE (COMMERCIAL MATRIX)
// ==========================================
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    const { data: franchise } = await supabase
        .from('franchises')
        .select('brand_name, description, category')
        .eq('slug', slug)
        .single();

    if (!franchise) {
        return { title: 'Franchise Listing Not Found | Franchise.sg' };
    }

    const titleText = `${franchise.brand_name} Franchise Cost, Fees & ROI | Singapore`;
    const descText = `Analyze verified investment matrices for ${franchise.brand_name} Singapore. Review initial franchise fees, projected payback timelines, ROI margins, and minimum capital requirements.`;
    const itemUrl = `https://www.franchise.sg/franchise/${slug}`;

    return {
        title: titleText,
        description: descText,
        alternates: {
            canonical: itemUrl,
        },
        openGraph: {
            title: titleText,
            description: descText,
            url: itemUrl,
            siteName: 'Franchise Singapore',
            locale: 'en_SG',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: titleText,
            description: descText,
        }
    };
}

// ==========================================
// PRIMARY COMMERCIAL PROFILE CORE RENDER
// ==========================================
export default async function FranchiseProfilePage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch unified financial parameters directly from the newly updated Supabase layer
    const { data: franchise } = await supabase
        .from('franchises')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!franchise) {
        notFound();
    }

    // Dynamic Variables Definition with Robust Fallbacks
    const formattedCapital = (franchise.min_capital_sgd || 0).toLocaleString();
    const formattedFee = typeof franchise.franchise_fee_sgd === 'number'
        ? `S$${franchise.franchise_fee_sgd.toLocaleString()}`
        : franchise.franchise_fee_sgd || 'N/A';

    const brandOrigin = franchise.brand_origin || 'Singapore';
    const estYear = franchise.established_year || 'N/A';
    const totalOutlets = franchise.current_outlets || '1';

    const projectedBreakeven = franchise.projected_breakeven_text || 'TBD';
    const projectedPayback = franchise.projected_payback_text || 'Pending Audit';
    const projectedRoi = franchise.projected_roi_text || 'Pending Evaluation';

    // RAG AI-Engine Optimized Structured Context Values
    const q1Answer = `The minimum capital required for the ${franchise.brand_name} franchise in Singapore is S$${formattedCapital}, with an initial upfront franchise fee set at ${formattedFee}. This capital structure covers vital baseline deployment allocations required by master systems access before opening standard operations.`;
    const q2Answer = `The ongoing royalty model for ${franchise.brand_name} requires a ${franchise.royalty_fee_text || 'vetted operational tier split'}. Under standard operating performance parameters, the projected operational baseline breakeven timeframe is targeted at approximately ${projectedBreakeven}, relying heavily on system logistics.`;
    const q3Answer = `The estimated capital investment payback period for this franchise asset is projected within ${projectedPayback}, delivering an anticipated operational return matrix range of ${projectedRoi}. This data set provides high-value verification metrics necessary for private networks analyzing asset defensibility.`;

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BusinessWithPhysicalSystem",
                "@id": `https://www.franchise.sg/franchise/${slug}#franchise-entity`,
                "name": `${franchise.brand_name} Franchise`,
                "category": franchise.category,
                "description": franchise.description,
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "SG"
                }
            },
            {
                "@type": "FAQPage",
                "@id": `https://www.franchise.sg/franchise/${slug}#faq-entity`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `What is the initial franchise fee and capital requirement for ${franchise.brand_name} Singapore?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": q1Answer
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `What are the ongoing royalties and projected breakeven timelines for ${franchise.brand_name}?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": q2Answer
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `What is the projected payback period and return on investment (ROI) for this listing?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": q3Answer
                        }
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans w-full text-left py-12 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Semantic Breadcrumb Line */}
                <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Link href="/" className="hover:text-teal-600 transition-colors">Franchise Singapore Directory</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-600">{franchise.brand_name} Listing Profile</span>
                </nav>

                {/* Master Identification Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-100 mb-2 inline-block">
                                {franchise.category}
                            </span>
                            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
                                {franchise.brand_name} Franchise
                            </h1>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 min-w-[220px] text-left sm:text-right">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Min Capital Required</span>
                            <span className="text-2xl font-black text-teal-600 block">
                                S${formattedCapital}
                            </span>
                        </div>
                    </div>

                    {/* Core Baseline Parameters Sub-Grid */}
                    <div className="grid grid-cols-3 gap-4 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div>
                            <span className="text-[9px] text-slate-400 block mb-0.5">Brand Origin</span>
                            <span className="text-slate-900 text-sm normal-case">{brandOrigin}</span>
                        </div>
                        <div>
                            <span className="text-[9px] text-slate-400 block mb-0.5">Established</span>
                            <span className="text-slate-900 text-sm">{estYear}</span>
                        </div>
                        <div>
                            <span className="text-[9px] text-slate-400 block mb-0.5">Active Outlets</span>
                            <span className="text-slate-900 text-sm">{totalOutlets}</span>
                        </div>
                    </div>

                    {/* Integrated Financial Data Matrices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-4">
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Financial Parameters</h2>
                            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5 space-y-3.5 text-xs font-semibold">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Initial Franchise Fee</span>
                                    <span className="text-slate-900 font-bold">{formattedFee}</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-slate-500 shrink-0">Ongoing Royalty Fee</span>
                                    <span className="text-slate-900 font-bold text-right">{franchise.royalty_fee_text || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-200/60 pt-3">
                                    <span className="text-slate-500">Investment Class Tier</span>
                                    <span className="text-slate-900 font-bold">{franchise.investment_tier || 'Standard'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Performance &amp; ROI Projections</h2>
                            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5 space-y-3.5 text-xs font-semibold">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Projected Breakeven</span>
                                    <span className="text-teal-700 font-bold">{projectedBreakeven}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Projected Payback Period</span>
                                    <span className="text-teal-700 font-bold">{projectedPayback}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-200/60 pt-3">
                                    <span className="text-slate-500">Estimated Return Matrix (ROI)</span>
                                    <span className="text-teal-700 font-bold">{projectedRoi}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Market Overview</h2>
                        <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5 text-xs leading-relaxed text-slate-600 font-medium whitespace-pre-line">
                            {franchise.description || "Comprehensive commercial parameters pending primary brand manager validation metrics."}
                        </div>
                    </div>

                    {/* Premium Lead Generation Funnel Action Call */}
                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <Link
                            href={`/apply?brand=${encodeURIComponent(franchise.brand_name)}`}
                            className="w-full sm:w-auto text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-colors"
                        >
                            Request Franchise Disclosure Document (FDD)
                        </Link>
                    </div>
                </div>

                {/* Conversational AI Search Extraction Layer (GEO Matrix) */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 text-left">
                    <h2 className="text-lg font-black text-slate-950 tracking-tight border-b border-slate-100 pb-3">
                        Vetted Investor Diagnostics &amp; FAQ Analysis
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-slate-950">
                                What is the initial franchise fee and capital requirement for {franchise.brand_name} Singapore?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                {q1Answer}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-slate-950">
                                What are the ongoing royalties and projected breakeven timelines for {franchise.brand_name}?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                {q2Answer}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-slate-950">
                                What is the projected payback period and return on investment (ROI) for this listing?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                {q3Answer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}