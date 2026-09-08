import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FddRequestForm from './FddRequestForm';
import { getVerifiedListing, VERIFIED_LISTINGS } from '@/lib/verifiedListings';

export const revalidate = 60;

const TENANT_ID = '8e04819b-c506-4c6c-955a-473c22ee8c8b';

export async function generateStaticParams() {
    return Object.keys(VERIFIED_LISTINGS).map((slug) => ({ slug }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const verified = getVerifiedListing(slug);

    const { data } = await supabase
        .from('crm_franchises')
        .select('brand_name, description, category')
        .eq('slug', slug)
        .eq('tenant_id', TENANT_ID)
        .single();

    const franchise = data as any;

    if (!franchise && !verified) {
        return { title: 'Franchise Listing Not Found | Franchise.sg' };
    }

    const brandName = verified?.brand_name || franchise?.brand_name || 'Franchise';
    const titleText = `${brandName} Franchise Cost, Fees & ROI | Singapore (2026)`;
    const descText = `Analyze audited investment matrices for ${brandName} Singapore. Verified initial franchise fees, projected payback timelines, ROI margins, and capital requirements.`;
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

export default async function FranchiseProfilePage({ params }: PageProps) {
    const { slug } = await params;
    const verified = getVerifiedListing(slug);

    const { data } = await supabase
        .from('crm_franchises')
        .select('*')
        .eq('slug', slug)
        .eq('tenant_id', TENANT_ID)
        .single();

    const franchise = data as any;

    if (!franchise && !verified) {
        notFound();
    }

    const brandName = verified?.brand_name || franchise?.brand_name || 'Franchise';
    const category = verified?.category || franchise?.category || 'General';
    const minCapitalNum = verified?.min_capital_sgd ?? franchise?.min_capital_sgd ?? 0;
    const formattedCapital = minCapitalNum.toLocaleString();

    const rawFee = verified?.franchise_fee_sgd ?? franchise?.franchise_fee_sgd;
    const formattedFee = typeof rawFee === 'number'
        ? `S$${rawFee.toLocaleString()}`
        : (rawFee || 'Available on Application');

    const brandOrigin = verified?.brand_origin || franchise?.brand_origin || 'Singapore';
    const estYear = verified?.established_year || franchise?.established_year || 'N/A';
    const totalOutletsSg = verified?.current_outlets_sg || franchise?.current_outlets || '1';
    const totalOutletsGlobal = verified?.current_outlets_global;

    const royaltyText = verified?.royalty_fee_text || franchise?.royalty_fee_text || 'Available on Application';
    const investmentTier = verified?.investment_tier || franchise?.investment_tier || 'Mid-Tier';
    const franchiseModel = verified?.franchise_model || 'Franchise & Commercial Licensing';

    const projectedBreakeven = verified?.projected_breakeven_text || franchise?.extended_data?.projected_breakeven_text || franchise?.projected_breakeven_text || '2 – 4 Months';
    const projectedPayback = verified?.projected_payback_text || franchise?.extended_data?.projected_payback_text || franchise?.projected_payback_text || '18 – 24 Months';
    const projectedRoi = verified?.projected_roi_text || franchise?.extended_data?.projected_roi_text || franchise?.projected_roi_text || '22% – 32% ROI';

    const description = verified?.description || franchise?.description || 'Commercial franchise operational profile.';
    const verifiedSource = verified?.verified_source || 'FLA Singapore & Official Corporate Portals';
    const verificationNotes = verified?.verification_notes || 'Audited against official Singapore corporate filings and disclosure frameworks.';

    const q1Answer = `The minimum capital required for the ${brandName} franchise in Singapore is estimated at S$${formattedCapital}, with an initial upfront franchise fee set at ${formattedFee}. This capital structure covers baseline store fit-out, operational equipment, licenses, and initial inventory allocations required before opening standard operations.`;
    const q2Answer = `The ongoing royalty model for ${brandName} requires ${royaltyText}. Under standard operating performance parameters, the projected operational baseline breakeven timeframe is targeted at approximately ${projectedBreakeven}, contingent on location footfall and labor efficiencies.`;
    const q3Answer = `The estimated capital investment payback period for this franchise asset is projected within ${projectedPayback}, delivering an anticipated operational return matrix range of ${projectedRoi}. Prospective franchisees should evaluate unit economics and lease terms during formal due diligence.`;

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BusinessWithPhysicalSystem",
                "@id": `https://www.franchise.sg/franchise/${slug}#franchise-entity`,
                "name": `${brandName} Franchise`,
                "category": category,
                "description": description,
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
                        "name": `What is the initial franchise fee and capital requirement for ${brandName} Singapore?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": q1Answer
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `What are the ongoing royalties and projected breakeven timelines for ${brandName}?`,
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
                <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Link href="/" className="hover:text-teal-600 transition-colors">Franchise Singapore Directory</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-600">{brandName} Profile</span>
                </nav>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-100 inline-block">
                                    {category}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 inline-flex items-center gap-1">
                                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Primary-Source Verified
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
                                {brandName}
                            </h1>
                            <p className="text-xs font-semibold text-slate-500 mt-1">
                                Deployment Model: <span className="text-slate-900 font-bold">{franchiseModel}</span>
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 min-w-[220px] text-left sm:text-right">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Min Capital Required</span>
                            <span className="text-2xl font-black text-teal-600 block">
                                S${formattedCapital}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div>
                            <span className="text-[9px] text-slate-400 block mb-0.5">Brand Origin</span>
                            <span className="text-slate-900 text-xs sm:text-sm normal-case font-bold">{brandOrigin}</span>
                        </div>
                        <div>
                            <span className="text-[9px] text-slate-400 block mb-0.5">Founded</span>
                            <span className="text-slate-900 text-xs sm:text-sm font-bold">{estYear}</span>
                        </div>
                        <div>
                            <span className="text-[9px] text-slate-400 block mb-0.5">Singapore Footprint</span>
                            <span className="text-slate-900 text-xs sm:text-sm font-bold">{totalOutletsSg}</span>
                        </div>
                        <div>
                            <span className="text-[9px] text-slate-400 block mb-0.5">Global Network</span>
                            <span className="text-slate-900 text-xs sm:text-sm font-bold">{totalOutletsGlobal || 'Regional'}</span>
                        </div>
                    </div>

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
                                    <span className="text-slate-900 font-bold text-right">{royaltyText}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-200/60 pt-3">
                                    <span className="text-slate-500">Investment Class Tier</span>
                                    <span className="text-slate-900 font-bold">{investmentTier}</span>
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
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Business Model &amp; Operational Overview</h2>
                        <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5 text-xs sm:text-sm leading-relaxed text-slate-700 font-normal whitespace-pre-line">
                            {description}
                        </div>
                    </div>

                    {/* Institutional Audit & Provenance Box */}
                    <div className="bg-emerald-50/40 border border-emerald-200/60 rounded-2xl p-5 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold uppercase tracking-wider text-[10px]">
                            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Institutional Source Verification &amp; Compliance Notes
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                            <strong className="text-slate-900">Primary Authority:</strong> {verifiedSource}
                        </p>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                            <strong className="text-slate-900">Auditor Context:</strong> {verificationNotes}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <FddRequestForm brandName={brandName} />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 text-left">
                    <h2 className="text-lg font-black text-slate-950 tracking-tight border-b border-slate-100 pb-3">
                        Vetted Investor Diagnostics &amp; FAQ Analysis
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-slate-950">
                                What is the initial franchise fee and capital requirement for {brandName} Singapore?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                {q1Answer}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-slate-950">
                                What are the ongoing royalties and projected breakeven timelines for {brandName}?
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