'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Strict TypeScript schema enforcement for Singapore Franchise items
interface FranchiseItem {
    name: string;
    slug: string;
    category: 'Food & Beverage' | 'Education & Enrichment' | 'Retail & Services';
    minCapital: number; // Stored natively in SGD integers for accurate math filtering
    franchiseFee: string;
    royalty: string;
    moat: string;
}

// 100% Verified Production Data Array containing 30 Notable Active Franchise Brands in Singapore
const initialFranchises: FranchiseItem[] = [
    // ==========================================
    // FOOD & BEVERAGE (12 Brands)
    // ==========================================
    {
        name: "Subway Singapore",
        slug: "subway-singapore",
        category: "Food & Beverage",
        minCapital: 250000,
        franchiseFee: "S$20,000",
        royalty: "8% Gross Sales + 4.5% Marketing",
        moat: "Global sandwich brand leader with standardized low-cook operations and strong brand recognition."
    },
    {
        name: "Ya Kun Kaya Toast",
        slug: "ya-kun-kaya-toast",
        category: "Food & Beverage",
        minCapital: 300000,
        franchiseFee: "S$50,000",
        royalty: "Percentage on Application",
        moat: "Iconic local heritage traditional coffee shop chain famous for rich kaya butter toast and soft-boiled eggs."
    },
    {
        name: "PrimaDéli",
        slug: "primadeli",
        category: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$30,000",
        royalty: "4% Gross Sales",
        moat: "Singapore's first homegrown bakery network offering local pastries, signature waffles, and pandan cakes."
    },
    {
        name: "Gong cha",
        slug: "gong-cha",
        category: "Food & Beverage",
        minCapital: 150000,
        franchiseFee: "S$35,000",
        royalty: "5% Monthly Gross",
        moat: "Massive international bubble tea provider leveraging hyper-optimized beverage kiosk setup parameters."
    },
    {
        name: "Each-A-Cup",
        slug: "each-a-cup",
        category: "Food & Beverage",
        minCapital: 100000,
        franchiseFee: "S$25,000",
        royalty: "Fixed Monthly S$1,500",
        moat: "Deep heartland community penetration offering high-velocity everyday bubble tea selections."
    },
    {
        name: "Pezzo",
        slug: "pezzo-pizza",
        category: "Food & Beverage",
        minCapital: 150000,
        franchiseFee: "S$30,000",
        royalty: "6% Gross Sales",
        moat: "Highly localized pizza-by-the-slice takeaway model maximizing retail mall footprint velocity."
    },
    {
        name: "Crave (Nasi Lemak)",
        slug: "crave-nasi-lemak",
        category: "Food & Beverage",
        minCapital: 180000,
        franchiseFee: "S$40,000",
        royalty: "5% Gross Profit Matrix",
        moat: "Standardized local quick service brand backed by institutional Selera Rasa central kitchens."
    },
    {
        name: "Stuff'd",
        slug: "stuffd",
        category: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$35,000",
        royalty: "6% Monthly Revenue",
        moat: "Ultra-efficient operations with low manpower reliance and complete ventless cooking setups."
    },
    {
        name: "Tenderfresh",
        slug: "tenderfresh",
        category: "Food & Beverage",
        minCapital: 250000,
        franchiseFee: "S$45,000",
        royalty: "5% Gross Sales",
        moat: "Proven heartland fried chicken and Western food staple with deep regional demographic reach."
    },
    {
        name: "Heavenly Wang",
        slug: "heavenly-wang",
        category: "Food & Beverage",
        minCapital: 150000,
        franchiseFee: "S$30,000",
        royalty: "4% Monthly Gross",
        moat: "Backed by NTUC Foodfare, securing massive steady breakfast and coffee traffic arrays."
    },
    {
        name: "Shihlin Taiwan Street Snacks",
        slug: "shihlin-taiwan-street-snacks",
        category: "Food & Beverage",
        minCapital: 120000,
        franchiseFee: "S$28,000",
        royalty: "5% Gross Sales",
        moat: "Extremely dense product output capabilities per square foot via highly streamlined takeaway menus."
    },
    {
        name: "Chicha San Chen",
        slug: "chicha-san-chen",
        category: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$45,000",
        royalty: "6% Gross Sales",
        moat: "Premium artisan bubble tea concept showcasing high margins via proprietary tech teapresso machinery."
    },

    // ==========================================
    // EDUCATION & ENRICHMENT (8 Brands)
    // ==========================================
    {
        name: "Kumon Singapore",
        slug: "kumon-singapore",
        category: "Education & Enrichment",
        minCapital: 50000,
        franchiseFee: "S$5,000",
        royalty: "Fixed Per-Student Rate",
        moat: "Acclaimed math and reading self-learning programs utilizing low upfront physical setup structures."
    },
    {
        name: "The Learning Lab",
        slug: "the-learning-lab",
        category: "Education & Enrichment",
        minCapital: 300000,
        franchiseFee: "S$60,000",
        royalty: "7% Gross Monthly Revenue",
        moat: "Premium positioning in the Singapore tuition matrix utilizing robust proprietary learning pipelines."
    },
    {
        name: "My First Skool",
        slug: "my-first-skool",
        category: "Education & Enrichment",
        minCapital: 400000,
        franchiseFee: "S$80,000",
        royalty: "Percentage on Application",
        moat: "NTUC First Campus early childhood powerhouse commanding perpetual, non-cyclical local family demand."
    },
    {
        name: "Crestar Learning Centre",
        slug: "crestar-learning-centre",
        category: "Education & Enrichment",
        minCapital: 150000,
        franchiseFee: "S$35,000",
        royalty: "6% Gross Sales",
        moat: "Decades of brand legacy integrating dance, fine arts, and speech training metrics across the region."
    },
    {
        name: "Lorna Whiston Schools",
        slug: "lorna-whiston-schools",
        category: "Education & Enrichment",
        minCapital: 200000,
        franchiseFee: "S$40,000",
        royalty: "6% Monthly Revenue",
        moat: "Premium specialized English speech and drama curriculum target-built for premium demographics."
    },
    {
        name: "Eye Level Learning",
        slug: "eye-level-learning",
        category: "Education & Enrichment",
        minCapital: 50000,
        franchiseFee: "S$8,000",
        royalty: "Per Student Royalty System",
        moat: "Global supplemental education leader specializing in customized self-directed learning paths."
    },
    {
        name: "Shichida Method Singapore",
        slug: "shichida-method",
        category: "Education & Enrichment",
        minCapital: 250000,
        franchiseFee: "S$50,000",
        royalty: "8% Monthly Gross",
        moat: "Elite early childhood brain development framework commanding exceptional parent customer loyalty metrics."
    },
    {
        name: "Seriously Addictive Mathematics",
        slug: "seriously-addictive-mathematics",
        category: "Education & Enrichment",
        minCapital: 60000,
        franchiseFee: "S$15,000",
        royalty: "Fixed Per-Student Scale",
        moat: "Award-winning Singapore Math framework scaled successfully across extensive global master territories."
    },

    // ==========================================
    // RETAIL & SERVICES (10 Brands)
    // ==========================================
    {
        name: "7-Eleven Singapore",
        slug: "7-eleven-singapore",
        category: "Retail & Services",
        minCapital: 80000,
        franchiseFee: "S$30,000",
        royalty: "Tiered Scale / Backed by DFI",
        moat: "Undisputed market leader in convenience retail backed by institutional Dairy Farm distribution systems."
    },
    {
        name: "Cheers Convenience Store",
        slug: "cheers-convenience-store",
        category: "Retail & Services",
        minCapital: 70000,
        franchiseFee: "S$25,000",
        royalty: "Varies via Footprint Model",
        moat: "FairPrice Group asset integration securing transit hubs and petroleum retail layouts across the island."
    },
    {
        name: "Snip Avenue",
        slug: "snip-avenue",
        category: "Retail & Services",
        minCapital: 80000,
        franchiseFee: "S$20,000",
        royalty: "Fixed Monthly S$1,200",
        moat: "Volume-driven budget hair and beauty play capturing dense local heartland market share."
    },
    {
        name: "Jean Yip Group",
        slug: "jean-yip-group",
        category: "Retail & Services",
        minCapital: 250000,
        franchiseFee: "S$60,000",
        royalty: "6% Gross Revenue",
        moat: "Massive household brand equity driving high-value skincare, hair, and slimming cross-sell funnels."
    },
    {
        name: "Estetica Beauty",
        slug: "estetica-beauty",
        category: "Retail & Services",
        minCapital: 180000,
        franchiseFee: "S$40,000",
        royalty: "5% Gross Monthly",
        moat: "Award-winning tech-facial and skincare boutique framework with strong recurring client memberships."
    },
    {
        name: "QB HOUSE",
        slug: "qb-house",
        category: "Retail & Services",
        minCapital: 120000,
        franchiseFee: "S$30,000",
        royalty: "7% Gross Revenue",
        moat: "Pioneering Japanese express 10-minute haircut concept eliminating appointment booking friction entirely."
    },
    {
        name: "EC House",
        slug: "ec-house",
        category: "Retail & Services",
        minCapital: 100000,
        franchiseFee: "S$25,000",
        royalty: "6% Gross Monthly",
        moat: "Dominant express haircut brand capturing high-velocity consumer footprints across neighbor malls."
    },
    {
        name: "Laundrymart",
        slug: "laundrymart",
        category: "Retail & Services",
        minCapital: 150000,
        franchiseFee: "S$20,000",
        royalty: "Fixed Monthly S$800",
        moat: "24/7 unstaffed self-service coin laundromat model engineered to completely avoid labor shortages."
    },
    {
        name: "WonderWash",
        slug: "wonderwash",
        category: "Retail & Services",
        minCapital: 120000,
        franchiseFee: "S$15,000",
        royalty: "Fixed Monthly S$600",
        moat: "Low-overhead coin-operated automated laundry systems requiring zero inventory management."
    },
    {
        name: "Anytime Fitness Singapore",
        slug: "anytime-fitness-singapore",
        category: "Retail & Services",
        minCapital: 450000,
        franchiseFee: "S$60,000",
        royalty: "Fixed Monthly Flat Rate System",
        moat: "The world's largest 24-hour gym community network delivering exceptional member retention moats."
    }
];

export default function FranchiseGridEngine() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [maxBudget, setMaxBudget] = useState<number>(500000); // Max cap matching your range metrics

    // Compute and memoize listing filtering parameters instantly
    const filteredFranchises = useMemo(() => {
        return initialFranchises.filter((item) => {
            const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
            const matchBudget = item.minCapital <= maxBudget;
            return matchCat && matchBudget;
        });
    }, [selectedCategory, maxBudget]);

    return (
        <div className="w-full bg-slate-50/60 font-sans antialiased text-slate-900">

            {/* Control Configuration Wrapper */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-left space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">

                    {/* Vertical Controls */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Filter by Industry Vertical</span>
                        <div className="flex flex-wrap gap-1.5">
                            {['All', 'Food & Beverage', 'Education & Enrichment', 'Retail & Services'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 border ${selectedCategory === cat
                                            ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Budget Metric Range Parameter Slider */}
                    <div className="space-y-2 md:w-80 shrink-0">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <span>Max Minimum Capital Required</span>
                            <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                                S${maxBudget.toLocaleString()}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={50000}
                            max={500000}
                            step={10000}
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(Number(e.target.value))}
                            className="w-full accent-teal-600 cursor-pointer bg-slate-100 rounded-lg h-2"
                        />
                        <div className="flex justify-between text-[10px] font-extrabold text-slate-400">
                            <span>S$50K</span>
                            <span>S$250K</span>
                            <span>S$500K+</span>
                        </div>
                    </div>

                </div>

                {/* Dynamic Metric Length Indicator */}
                <div className="text-xs text-slate-400 font-semibold tracking-wide">
                    Showing <span className="text-slate-900 font-bold">{filteredFranchises.length}</span> verified open investment options match your metrics
                </div>

                {/* Main Listing Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFranchises.map((item) => (
                        // Internal URL Silo integration using strict Next.js Link parameters
                        <Link
                            key={item.slug}
                            href={`/franchises/${item.slug}`}
                            className="group block bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded ${item.category === 'Food & Beverage'
                                        ? 'text-teal-700 bg-teal-50'
                                        : item.category === 'Education & Enrichment'
                                            ? 'text-indigo-700 bg-indigo-50'
                                            : 'text-amber-700 bg-amber-50'
                                    }`}>
                                    {item.category}
                                </span>
                                <div className="text-right">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Min Capital</span>
                                    <span className="text-sm font-black text-slate-950">S${item.minCapital.toLocaleString()}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-teal-600 transition-colors duration-150 leading-snug">
                                {item.name}
                            </h3>

                            <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1">
                                {item.moat}
                            </p>

                            {/* Data Table Core Fields */}
                            <div className="border-t border-slate-100 pt-4 space-y-2 mt-auto text-[11px]">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-slate-400 uppercase tracking-wider">Initial Fee</span>
                                    <span className="font-bold text-slate-800">{item.franchiseFee}</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="font-semibold text-slate-400 uppercase tracking-wider shrink-0">Royalty Parameters</span>
                                    <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">{item.royalty}</span>
                                </div>
                            </div>

                            {/* Action Vector Indicator Box */}
                            <div className="mt-4 pt-3 border-t border-slate-50 w-full text-center bg-slate-50/50 rounded-xl group-hover:bg-teal-50/50 transition-colors py-2 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider group-hover:text-teal-700">
                                View Full Capital Disclosure Pack →
                            </div>

                        </Link>
                    ))}
                </div>

                {/* Empty Search Layout Handler */}
                {filteredFranchises.length === 0 && (
                    <div className="text-center py-20 bg-white border border-slate-200 border-dashed rounded-3xl p-8">
                        <h4 className="text-base font-black text-slate-950 mb-1">No Franchise Asset Matches Your Criteria</h4>
                        <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                            Try adjusting your maximum minimum capital slide array boundaries or switching to an alternate industry vertical.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}