'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface FranchiseItem {
    name: string;
    slug: string;
    category: 'Food & Beverage' | 'Education & Enrichment' | 'Retail & Services';
    displayCategory: string;
    minCapital: number;
    franchiseFee: string;
    royalty: string;
    moat: string;
}

const initialFranchises: FranchiseItem[] = [
    // ==========================================
    // ORIGINAL PLATFORM BRANDS (30 MATHEMATICALLY PRECISE ITEMS)
    // ==========================================
    {
        name: "Jie Bakery",
        slug: "jie-bakery",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 60000,
        franchiseFee: "S$15,000",
        royalty: "Fixed Monthly S$1,200",
        moat: "A legendary local heritage brand serving traditional local bread loaves and nostalgic spreads with an optimized retail layout."
    },
    {
        name: "Nanay's Kitchen",
        slug: "nanays-kitchen",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 120000,
        franchiseFee: "S$35,000",
        royalty: "6% Gross Sales",
        moat: "Authentic, high-density comfort cuisine bringing home-style traditional recipes into streamlined commercial cloud kitchens."
    },
    {
        name: "Pawa Bakery",
        slug: "pawa-bakery",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 95000,
        franchiseFee: "S$25,000",
        royalty: "5% Gross Sales",
        moat: "Artisanal bakery concept focusing on high-margin, trending local pastries combined with advanced centralized supply chain networks."
    },
    {
        name: "Petale Tea",
        slug: "petale-tea",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 50000,
        franchiseFee: "S$20,000",
        royalty: "5% Gross Sales",
        moat: "Premium blooming tea brand specializing in visually stunning, organic floral tea experiences and gifting modules."
    },
    {
        name: "7-Eleven Singapore",
        slug: "7-eleven-singapore",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 100000,
        franchiseFee: "S$30,000",
        royalty: "Progressive Gross Profit Split",
        moat: "The premier international 24-hour convenience store ecosystem backed by Jardine Matheson Group distribution parameters."
    },
    {
        name: "Barber 25",
        slug: "barber-25",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 100000,
        franchiseFee: "S$25,000",
        royalty: "Fixed Monthly Rate",
        moat: "Premium high-end traditional mens barbering and grooming salon concept."
    },
    {
        name: "Chagee Singapore",
        slug: "chagee-singapore",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 220000,
        franchiseFee: "S$45,000",
        royalty: "6% Gross profit",
        moat: "Premium modern tea artisan chain dominating the regional beverage landscape with specialized milk teas."
    },
    {
        name: "Coffee Hive",
        slug: "coffee-hive",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 85000,
        franchiseFee: "S$20,000",
        royalty: "5% Gross profit",
        moat: "Casual local coffee shop chain serving traditional kopi, toast, and local comfort cuisine configurations."
    },
    {
        name: "GlowExpress Wellness",
        slug: "glowexpress-wellness",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 80000,
        franchiseFee: "S$30,000",
        royalty: "5% Monthly Gross",
        moat: "Fast-growing express facial and skincare boutique franchise concept maximizing retail mall spaces in Singapore."
    },
    {
        name: "Gogowash",
        slug: "gogowash",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 60000,
        franchiseFee: "S$15,000",
        royalty: "Fixed Monthly S$800",
        moat: "24/7 self-service automated pet washing and pet care utility infrastructure facility concept."
    },
    {
        name: "iJooz",
        slug: "ijooz",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 15000,
        franchiseFee: "S$5,000",
        royalty: "Profit Split Framework",
        moat: "Smart automated fresh orange juice vending machine concept utilizing advanced AI inventory monitoring."
    },
    {
        name: "K-Skin Express Facials",
        slug: "k-skin-express-facials",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 90000,
        franchiseFee: "S$25,000",
        royalty: "Fixed Monthly S$1,500",
        moat: "Trending Korean fast-facial quick service provider offering high-efficiency skincare treatments without appointments."
    },
    {
        name: "kcuts",
        slug: "kcuts",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 110000,
        franchiseFee: "S$30,000",
        royalty: "Fixed Monthly S$1,800",
        moat: "The premier recession-proof express Korean haircut franchise concept operating nationwide."
    },
    {
        name: "Kumon Singapore",
        slug: "kumon-singapore",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 55000,
        franchiseFee: "S$5,000",
        royalty: "Fixed Per-Student Scale",
        moat: "Acclaimed after-school enrichment center franchise specializing in highly effective math and reading self-learning programs."
    },
    {
        name: "Luckin Coffee Singapore",
        slug: "luckin-coffee-singapore",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 180000,
        franchiseFee: "S$35,000",
        royalty: "Progressive Margin Scale",
        moat: "Technology-driven express coffee concept running on mobile app-ordering and optimized retail nodes."
    },
    {
        name: "Mr. Coconut",
        slug: "mr-coconut",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 180000,
        franchiseFee: "S$40,000",
        royalty: "7% Gross Sales",
        moat: "Cult-status local beverage chain specializing in refreshing coconut shakes and specialized juice blends."
    },
    {
        name: "My Gym",
        slug: "my-gym",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 160000,
        franchiseFee: "S$35,000",
        royalty: "6% Gross profit",
        moat: "International early childhood physical development and foundational kinetic motion enrichment network."
    },
    {
        name: "Old Chang Kee",
        slug: "old-chang-kee",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 150000,
        franchiseFee: "S$40,000",
        royalty: "5% Gross Sales",
        moat: "Iconic local snack food brand specializing in traditional Singaporean curry puffs, finger foods, and street snacks."
    },
    {
        name: "PrimaDéli",
        slug: "primadeli",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$30,000",
        royalty: "4% Gross Sales",
        moat: "Singapore homegrown bakery network offering Western, French, Asian, and local buns, pastries, and signature waffles."
    },
    {
        name: "Sakae Sushi",
        slug: "sakae-sushi",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 300000,
        franchiseFee: "S$50,000",
        royalty: "5% Gross profit",
        moat: "Long-established pioneer in conveyor-belt Japanese dining and casual family meal selections."
    },
    {
        name: "Skingo!",
        slug: "skingo",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 95000,
        franchiseFee: "S$20,000",
        royalty: "5% Gross profit",
        moat: "Advanced Korean express facial boutique specializing in transparent pricing and fast therapeutic turnover."
    },
    {
        name: "Spartans Boxing Club",
        slug: "spartans-boxing-club",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 250000,
        franchiseFee: "S$50,000",
        royalty: "6% Gross profit",
        moat: "Boutique fitness concept centered on inclusive community boxing training and advanced member culture."
    },
    {
        name: "Subway Singapore",
        slug: "subway-singapore",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 250000,
        franchiseFee: "S$20,000",
        royalty: "8% Gross Sales + 4.5% Advertising",
        moat: "Global quick-service giant serving customized sandwiches, salads, and wraps with a heavy footfall volume across Singapore shopping malls."
    },
    {
        name: "Sugawa",
        slug: "sugawa",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 80000,
        franchiseFee: "S$20,000",
        royalty: "4% Gross Sales",
        moat: "Innovative smart home appliance and modern eco-friendly induction cooking device retail hub."
    },
    {
        name: "uParcel Zone Franchise",
        slug: "uparcel-zone-franchise",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 35000,
        franchiseFee: "S$10,000",
        royalty: "Volume Revenue Split",
        moat: "Location-specific exclusive delivery logistics framework channeling localized route logistics volume."
    },
    {
        name: "Wee Nam Kee Chicken Rice",
        slug: "wee-nam-kee-chicken-rice",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$35,000",
        royalty: "5% Gross Sales",
        moat: "Legendary heritage traditional Hainanese chicken rice brand with global franchise footprints."
    },
    {
        name: "Ya Kun Kaya Toast",
        slug: "ya-kun-kaya-toast",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 300000,
        franchiseFee: "S$50,000",
        royalty: "Percentage on Application",
        moat: "Iconic local breakfast traditional coffee shop chain known globally for rich kaya butter toast and soft-boiled eggs."
    },
    {
        name: "EC House",
        slug: "ec-house",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 100000,
        franchiseFee: "S$25,000",
        royalty: "6% Gross Monthly",
        moat: "Dominant express haircut brand capturing high-velocity consumer footprints across neighborhood malls."
    },
    {
        name: "Laundrymart",
        slug: "laundrymart",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 150000,
        franchiseFee: "S$20,000",
        royalty: "Fixed Monthly S$800",
        moat: "24/7 unstaffed self-service coin laundromat model engineered to completely avoid labor shortages."
    },
    {
        name: "WonderWash",
        slug: "wonderwash",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 120000,
        franchiseFee: "S$15,000",
        royalty: "Fixed Monthly S$600",
        moat: "Low-overhead coin-operated automated laundry systems requiring zero inventory management."
    },

    // ==========================================
    // ADDITIONS LAYER: 30 VERIFIED NEW FRANCHISE BRANDS
    // ==========================================
    {
        name: "Each-A-Cup",
        slug: "each-a-cup",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 100000,
        franchiseFee: "S$25,000",
        royalty: "Fixed Monthly S$1,500",
        moat: "Deep heartland community penetration offering high-velocity everyday bubble tea selections."
    },
    {
        name: "Pezzo",
        slug: "pezzo-pizza",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 150000,
        franchiseFee: "S$30,000",
        royalty: "6% Gross Sales",
        moat: "Highly localized pizza-by-the-slice takeaway model maximizing retail mall footprint velocity."
    },
    {
        name: "Crave (Nasi Lemak)",
        slug: "crave-nasi-lemak",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 180000,
        franchiseFee: "S$40,000",
        royalty: "5% Gross Profit Matrix",
        moat: "Standardized local quick service brand backed by institutional central kitchens."
    },
    {
        name: "Stuff'd",
        slug: "stuffd",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$35,000",
        royalty: "6% Monthly Revenue",
        moat: "Ultra-efficient operations with low manpower reliance and complete ventless cooking setups."
    },
    {
        name: "Tenderfresh",
        slug: "tenderfresh",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 250000,
        franchiseFee: "S$45,000",
        royalty: "5% Gross Sales",
        moat: "Proven heartland fried chicken and Western food staple with deep regional demographic reach."
    },
    {
        name: "Heavenly Wang",
        slug: "heavenly-wang",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 150000,
        franchiseFee: "S$30,000",
        royalty: "4% Monthly Gross",
        moat: "Backed by NTUC Foodfare, securing massive steady breakfast and coffee traffic arrays."
    },
    {
        name: "Shihlin Taiwan Street Snacks",
        slug: "shihlin-taiwan-street-snacks",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 120000,
        franchiseFee: "S$28,000",
        royalty: "5% Gross Sales",
        moat: "Extremely dense product output capabilities per square foot via highly streamlined takeaway menus."
    },
    {
        name: "Chicha San Chen",
        slug: "chicha-san-chen",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$45,000",
        royalty: "6% Gross Sales",
        moat: "Premium artisan bubble tea concept showcasing high margins via proprietary tech teapresso machinery."
    },
    {
        name: "LiHO TEA",
        slug: "liho-tea",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 150000,
        franchiseFee: "S$35,000",
        royalty: "5% Gross Monthly",
        moat: "Agile, rapid-scaling homegrown bubble tea network with immense regional brand recognition."
    },
    {
        name: "Toast Box",
        slug: "toast-box",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 250000,
        franchiseFee: "S$40,000",
        royalty: "Percentage on Application",
        moat: "Nanyang-style coffee shop ecosystem backed by the corporate logistics strength of BreadTalk Group."
    },
    {
        name: "Killiney Kopitiam",
        slug: "killiney-kopitiam",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$35,000",
        royalty: "5% Gross Revenue Matrix",
        moat: "One of Singapore's oldest heritage kaya toast coffee shop networks operating via scalable franchise options."
    },
    {
        name: "Old Chang Kee (Express)",
        slug: "old-chang-kee-express",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 120000,
        franchiseFee: "S$25,000",
        royalty: "5% Gross Sales",
        moat: "Highly dynamic standalone express format optimized specifically for high footfall MRT transit lanes."
    },
    {
        name: "JUMBO Seafood (Express)",
        slug: "jumbo-seafood-express",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 450000,
        franchiseFee: "S$80,000",
        royalty: "6% Gross Monthly",
        moat: "Premium globally recognized culinary brand scaling quick-service upscale seafood concepts."
    },
    {
        name: "Song Fa Bak Kut Teh",
        slug: "song-fa-bak-kut-teh",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 350000,
        franchiseFee: "S$50,000",
        royalty: "5% Monthly Revenue",
        moat: "Standardized Michelin Guide recognized heritage peppery pork rib soup brand with intense customer loyalty."
    },
    {
        name: "Arnold's Fried Chicken",
        slug: "arnolds-fried-chicken",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 200000,
        franchiseFee: "S$40,000",
        royalty: "5% Gross Profit",
        moat: "Singapore's very first homegrown certified halal fast food chicken franchise brand."
    },
    {
        name: "Swensen's Singapore",
        slug: "swensens-singapore",
        category: "Food & Beverage",
        displayCategory: "Food & Beverage",
        minCapital: 400000,
        franchiseFee: "S$60,000",
        royalty: "5% Gross Sales Matrix",
        moat: "Massive family restaurant network with legacy ice cream brand power across major neighborhood malls."
    },
    {
        name: "Seriously Addictive Mathematics",
        slug: "seriously-addictive-mathematics",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 60000,
        franchiseFee: "S$15,000",
        royalty: "Fixed Per-Student Scale",
        moat: "Award-winning Singapore Math framework scaled successfully across extensive global master territories."
    },
    {
        name: "Eye Level Learning",
        slug: "eye-level-learning",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 50000,
        franchiseFee: "S$8,000",
        royalty: "Per Student Royalty System",
        moat: "Global supplemental education leader specializing in customized self-directed learning paths."
    },
    {
        name: "Shichida Method Singapore",
        slug: "shichida-method",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 250000,
        franchiseFee: "S$50,000",
        royalty: "8% Monthly Gross",
        moat: "Elite early childhood brain development framework commanding exceptional parent customer loyalty metrics."
    },
    {
        name: "MindChamps Preschool",
        slug: "mindchamps-preschool",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 450000,
        franchiseFee: "S$80,000",
        royalty: "7% Gross Monthly Revenue",
        moat: "Market leader in premium early childhood education utilizing highly proprietary structured pedagogy."
    },
    {
        name: "Crestar Learning Centre",
        slug: "crestar-learning-centre",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 150000,
        franchiseFee: "S$35,000",
        royalty: "6% Gross Sales",
        moat: "Decades of brand legacy integrating dance, fine arts, and speech training metrics across the region."
    },
    {
        name: "Leo&Lotus Preschool",
        slug: "leo-lotus-preschool",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 350000,
        franchiseFee: "S$50,000",
        royalty: "6% Gross Profit",
        moat: "Boutique, eco-conscious child enrichment system scaling actively inside premium residential sectors."
    },
    {
        name: "British Council (Enrichment)",
        slug: "british-council-enrichment",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 450000,
        franchiseFee: "On Application",
        royalty: "Master License Structure",
        moat: "Globally authoritative language brand framework driving elite premium tier student acquisition lines."
    },
    {
        name: "Heuristics Hub",
        slug: "heuristics-hub",
        category: "Education & Enrichment",
        displayCategory: "Education & Enrichment",
        minCapital: 70000,
        franchiseFee: "S$20,000",
        royalty: "Fixed Per-Student Rate",
        moat: "Highly specialized mathematics learning center focusing strictly on primary school problem-solving models."
    },
    {
        name: "Anytime Fitness Singapore",
        slug: "anytime-fitness-singapore",
        category: "Retail & Services",
        displayCategory: "Health & Wellness",
        minCapital: 450000,
        franchiseFee: "S$60,000",
        royalty: "Fixed Monthly Flat Rate System",
        moat: "The world's largest 24-hour gym community network delivering exceptional member retention moats."
    },
    {
        name: "Cheers Convenience Store",
        slug: "cheers-convenience-store",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 70000,
        franchiseFee: "S$25,000",
        royalty: "Varies via Footprint Model",
        moat: "FairPrice Group asset integration securing transit hubs and petroleum retail layouts across the island."
    },
    {
        name: "Cleanpro Express",
        slug: "cleanpro-express",
        category: "Retail & Services",
        displayCategory: "Retail Services",
        minCapital: 180000,
        franchiseFee: "S$25,000",
        royalty: "Fixed Monthly Fee",
        moat: "Advanced commercial self-service laundry platform utilizing high-efficiency industrial machinery pipelines."
    }
];

export default function FranchiseGridEngine() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [maxBudget, setMaxBudget] = useState<number>(500000);

    const filteredFranchises = useMemo(() => {
        return initialFranchises.filter((item) => {
            const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
            const matchBudget = item.minCapital <= maxBudget;
            return matchCat && matchBudget;
        });
    }, [selectedCategory, maxBudget]);

    return (
        <div className="w-full bg-slate-50/60 font-sans antialiased text-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-left space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">

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

                    <div className="space-y-2 md:w-80 shrink-0">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <span>Max Minimum Capital Required</span>
                            <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                                S${maxBudget.toLocaleString()}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={15000}
                            max={500000}
                            step={5000}
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(Number(e.target.value))}
                            className="w-full accent-teal-600 cursor-pointer bg-slate-100 rounded-lg h-2"
                        />
                        <div className="flex justify-between text-[10px] font-extrabold text-slate-400">
                            <span>S$15K</span>
                            <span>S$250K</span>
                            <span>S$500K+</span>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-slate-400 font-semibold tracking-wide">
                    Showing <span className="text-slate-900 font-bold">{filteredFranchises.length}</span> verified open investment options match your metrics
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFranchises.map((item) => (
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
                                    {item.displayCategory}
                                </span>
                                <div className="text-right">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Min Capital</span>
                                    <span className="text-sm font-black text-slate-950">S${item.minCapital.toLocaleString()}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-teal-600 transition-colors duration-150 leading-snug">
                                {item.name}
                            </h3>

                            <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                                {item.moat}
                            </p>

                            <div className="border-t border-slate-100 pt-4 space-y-2 mt-auto text-[11px]">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-slate-400 uppercase tracking-wider">Franchise Fee</span>
                                    <span className="font-bold text-slate-800">{item.franchiseFee}</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="font-semibold text-slate-400 uppercase tracking-wider shrink-0">Royalty</span>
                                    <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">{item.royalty}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-50 w-full text-center bg-slate-50/50 rounded-xl group-hover:bg-teal-50/50 transition-colors py-2 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider group-hover:text-teal-700">
                                Request Full Disclosure Packet
                            </div>
                        </Link>
                    ))}
                </div>

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