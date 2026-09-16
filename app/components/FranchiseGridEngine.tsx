'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { VERIFIED_LISTINGS } from '@/lib/verifiedListings';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TENANT_ID = '8e04819b-c506-4c6c-955a-473c22ee8c8b';

interface FranchiseItem {
    id: string;
    brand_name: string;
    slug: string;
    category: string;
    is_verified_partner?: boolean;
    min_capital_sgd: number;
    franchise_fee_sgd: number;
    royalty_fee_text: string;
    description: string;
    brand_origin?: string;
    current_outlets?: number | string;
}

export default function FranchiseGridEngine() {
    const [franchises, setFranchises] = useState<FranchiseItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [maxBudget, setMaxBudget] = useState<number>(500000);

    // Dynamic Spec Matching Taxonomy 
    const MASTER_CATEGORIES = [
        'All',
        'Food & Beverage (QSR & Full-Service)',
        'Commercial & Residential Services',
        'Personal Services (Wellness, Fitness & Salons)',
        'Business Services (B2B & Consulting)',
        'Software, AI & Digital Technology',
        'Eldercare Services & Healthcare Centers',
        'Retail & Convenience',
        'Automotive Tech & Maintenance',
        'Hospitality & Lodging',
        "Children's Services (Education & Enrichment)"
    ];

    useEffect(() => {
        async function fetchFranchises() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('crm_franchises')
                    .select('id, brand_name, slug, category, min_capital_sgd, franchise_fee_sgd, royalty_fee_text, description, brand_origin, current_outlets')
                    .eq('tenant_id', TENANT_ID)
                    .order('brand_name', { ascending: true });

                if (error) throw error;
                const dbList = data || [];
                const dbSlugs = new Set(dbList.map((item) => item.slug));

                const enriched: FranchiseItem[] = dbList.map((item) => {
                    const v = VERIFIED_LISTINGS[item.slug];
                    return {
                        ...item,
                        brand_name: v?.brand_name || item.brand_name,
                        category: v?.category || item.category,
                        is_verified_partner: Boolean(v?.is_verified_partner),
                        brand_origin: v?.brand_origin || item.brand_origin,
                        current_outlets: v?.current_outlets_sg || item.current_outlets,
                        min_capital_sgd: v?.min_capital_sgd ?? item.min_capital_sgd,
                        franchise_fee_sgd: typeof v?.franchise_fee_sgd === 'number' ? v.franchise_fee_sgd : (item.franchise_fee_sgd || 0),
                        royalty_fee_text: v?.royalty_fee_text || item.royalty_fee_text,
                        description: v?.description || item.description
                    };
                });

                const extraVerified: FranchiseItem[] = Object.values(VERIFIED_LISTINGS)
                    .filter((v) => !dbSlugs.has(v.slug))
                    .map((v) => ({
                        id: v.slug,
                        brand_name: v.brand_name,
                        slug: v.slug,
                        category: v.category,
                        is_verified_partner: Boolean(v.is_verified_partner),
                        brand_origin: v.brand_origin,
                        current_outlets: v.current_outlets_sg,
                        min_capital_sgd: v.min_capital_sgd,
                        franchise_fee_sgd: typeof v.franchise_fee_sgd === 'number' ? v.franchise_fee_sgd : 0,
                        royalty_fee_text: v.royalty_fee_text,
                        description: v.description
                    }));

                // Layer 1: Priority Grid Sorting (Verified Partners float to top)
                const combined = [...enriched, ...extraVerified].sort((a, b) => {
                    if (a.is_verified_partner && !b.is_verified_partner) return -1;
                    if (!a.is_verified_partner && b.is_verified_partner) return 1;
                    return a.brand_name.localeCompare(b.brand_name);
                });

                setFranchises(combined);
            } catch (err: any) {
                console.error("Error fetching franchises from DB, falling back to verified listings:", err);
                const allVerified = Object.values(VERIFIED_LISTINGS).map((v) => ({
                    id: v.slug,
                    brand_name: v.brand_name,
                    slug: v.slug,
                    category: v.category,
                    is_verified_partner: Boolean(v.is_verified_partner),
                    brand_origin: v.brand_origin,
                    current_outlets: v.current_outlets_sg,
                    min_capital_sgd: v.min_capital_sgd,
                    franchise_fee_sgd: typeof v.franchise_fee_sgd === 'number' ? v.franchise_fee_sgd : 0,
                    royalty_fee_text: v.royalty_fee_text,
                    description: v.description
                })).sort((a, b) => {
                    if (a.is_verified_partner && !b.is_verified_partner) return -1;
                    if (!a.is_verified_partner && b.is_verified_partner) return 1;
                    return a.brand_name.localeCompare(b.brand_name);
                });
                setFranchises(allVerified);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFranchises();
    }, []);

    const filteredFranchises = useMemo(() => {
        return franchises.filter((item) => {
            const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
            const capital = item.min_capital_sgd || 0;
            const matchBudget = capital <= maxBudget;
            return matchCat && matchBudget;
        });
    }, [franchises, selectedCategory, maxBudget]);

    // Separate verified brand partners for Spotlight Section
    const featuredVerifiedPartners = useMemo(() => {
        return filteredFranchises.filter(f => f.is_verified_partner);
    }, [filteredFranchises]);

    if (isLoading) {
        return <div className="w-full text-center py-20 text-slate-700 font-semibold">Loading verified franchise opportunities...</div>;
    }

    if (error) {
        return <div className="w-full text-center py-20 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="w-full bg-slate-50/60 font-sans antialiased text-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-left space-y-8">

                {/* --- Filters Section --- */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">

                    {/* Category Filter Grouping */}
                    <div className="space-y-3 flex-1">
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                            Filter by Industry Vertical
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {MASTER_CATEGORIES.map((cat) => {
                                const active = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            active
                                                ? 'bg-teal-700 text-white shadow-sm'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Capital Allocation Filter Slider */}
                    <div className="w-full md:w-72 space-y-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div className="flex justify-between items-center">
                            <label htmlFor="budget-range-input" className="text-xs font-black text-slate-700 uppercase tracking-wider">
                                Max Minimum Capital Required
                            </label>
                            <span className="text-xs font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                                S${maxBudget >= 500000 ? '500,000+' : maxBudget.toLocaleString()}
                            </span>
                        </div>
                        <div className="pt-1">
                            <input
                                id="budget-range-input"
                                name="maxBudget"
                                type="range"
                                min={15000}
                                max={500000}
                                step={5000}
                                value={maxBudget}
                                onChange={(e) => setMaxBudget(Number(e.target.value))}
                                aria-label="Filter directory listings by maximum baseline minimum investment capital required"
                                aria-valuemin={15000}
                                aria-valuemax={500000}
                                aria-valuenow={maxBudget}
                                aria-valuetext={`S$ ${maxBudget.toLocaleString()}`}
                                className="w-full accent-teal-700 cursor-pointer bg-slate-200 rounded-lg h-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            />
                            <div className="flex justify-between text-[10px] font-black text-slate-600 mt-1.5">
                                <span>S$15K</span>
                                <span>S$250K</span>
                                <span>S$500K+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Layer 3: Featured Verified Brand Partners Spotlight Section */}
                {featuredVerifiedPartners.length > 0 && (
                    <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/30 pb-4">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Official Partner Spotlight
                                </div>
                                <h2 className="text-2xl font-black text-white tracking-tight">Verified Brand Partners</h2>
                                <p className="text-xs text-slate-300 mt-1">These franchisors have active direct lead routing enabled. Inquiries go straight to their BD team.</p>
                            </div>
                            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-3 py-1.5 rounded-xl self-start sm:self-center">
                                ⚡ Direct Lead Handoff Guaranteed
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredVerifiedPartners.map((item) => (
                                <Link
                                    key={`featured-${item.id}`}
                                    href={`/franchise/${item.slug}`}
                                    className="group block bg-slate-900/90 border-2 border-emerald-500/60 rounded-2xl p-6 shadow-xl hover:border-emerald-400 transition-all text-left flex flex-col h-full relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 bg-emerald-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-md">
                                        VERIFIED PARTNER ✓
                                    </div>

                                    <div className="flex justify-between items-start mb-3 pt-2 gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border border-emerald-500/40 text-emerald-300 bg-emerald-950/60">
                                            {item.category}
                                        </span>
                                        <div className="text-right shrink-0">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Min Capital</span>
                                            <span className="text-sm font-black text-emerald-400">S${(item.min_capital_sgd || 0).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors duration-150 leading-snug">
                                        {item.brand_name}
                                    </h3>

                                    <div className="flex gap-4 text-[10px] text-slate-300 font-black uppercase tracking-wider mb-3 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                                        <div>Origin: <span className="text-slate-200 normal-case">{item.brand_origin || 'Singapore'}</span></div>
                                        <div>Outlets: <span className="text-slate-200">{item.current_outlets || '1'}</span></div>
                                    </div>

                                    <p className="text-slate-300 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {item.description}
                                    </p>

                                    <div className="border-t border-slate-800 pt-4 space-y-2 mt-auto text-[11px]">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-slate-400 uppercase tracking-wider">Franchise Fee</span>
                                            <span className="font-black text-white">
                                                {typeof item.franchise_fee_sgd === 'number' ? `S$${item.franchise_fee_sgd.toLocaleString()}` : item.franchise_fee_sgd || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="font-bold text-slate-400 uppercase tracking-wider shrink-0">Royalty</span>
                                            <span className="font-black text-white text-right truncate max-w-[180px]">{item.royalty_fee_text || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-800 w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white transition-all py-2.5 text-[10px] font-extrabold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2">
                                        <span>Request FDD &amp; Direct Lead Info</span>
                                        <span>→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Results Section Indicator --- */}
                <div className="text-xs text-slate-600 font-bold tracking-wide">
                    Showing <span className="text-slate-950 font-black">{filteredFranchises.length}</span> verified open investment options matching your metrics
                </div>

                {/* High Contrast Structural Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFranchises.map((item) => {
                        const isFood = item.category.includes('Food');
                        const isEducation = item.category.includes('Children') || item.category.includes('Education');
                        const isPersonal = item.category.includes('Personal');
                        const isRetail = item.category.includes('Retail');

                        const tagColorClass = isFood
                            ? 'text-teal-800 bg-teal-50 border-teal-100'
                            : isEducation
                                ? 'text-indigo-800 bg-indigo-50 border-indigo-100'
                                : isPersonal
                                    ? 'text-purple-800 bg-purple-50 border-purple-100'
                                    : isRetail
                                        ? 'text-amber-800 bg-amber-50 border-amber-100'
                                        : 'text-slate-800 bg-slate-50 border-slate-200';

                        // Layer 2: Visual Badging & Elevated Card Styling for Verified Partners
                        if (item.is_verified_partner) {
                            return (
                                <Link
                                    key={item.id}
                                    href={`/franchise/${item.slug}`}
                                    className="group block bg-gradient-to-b from-emerald-950/10 via-white to-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 rounded-2xl p-6 transition-all text-left flex flex-col h-full relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                >
                                    <div className="absolute top-0 right-0 bg-emerald-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                        VERIFIED PARTNER ✓
                                    </div>

                                    <div className="flex justify-between items-start mb-3 pt-2 gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border border-emerald-300 text-emerald-900 bg-emerald-50">
                                            {item.category}
                                        </span>
                                        <div className="text-right shrink-0">
                                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-wider block">Min Capital</span>
                                            <span className="text-sm font-black text-emerald-700">S${(item.min_capital_sgd || 0).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-emerald-700 transition-colors duration-150 leading-snug">
                                        {item.brand_name}
                                    </h3>

                                    <div className="mb-3">
                                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                                            ⚡ Direct Lead Handoff Active
                                        </span>
                                    </div>

                                    <div className="flex gap-4 text-[10px] text-slate-600 font-black uppercase tracking-wider mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <div>Origin: <span className="text-slate-800 normal-case">{item.brand_origin || 'Singapore'}</span></div>
                                        <div>Outlets: <span className="text-slate-800">{item.current_outlets || '1'}</span></div>
                                    </div>

                                    <p className="text-slate-700 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {item.description || "No description provided."}
                                    </p>

                                    <div className="border-t border-slate-100 pt-4 space-y-2 mt-auto text-[11px]">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-slate-600 uppercase tracking-wider">Franchise Fee</span>
                                            <span className="font-black text-slate-900">
                                                {typeof item.franchise_fee_sgd === 'number' ? `S$${item.franchise_fee_sgd.toLocaleString()}` : item.franchise_fee_sgd || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="font-bold text-slate-600 uppercase tracking-wider shrink-0">Royalty</span>
                                            <span className="font-black text-slate-900 text-right truncate max-w-[180px]">{item.royalty_fee_text || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 w-full text-center bg-emerald-600 group-hover:bg-emerald-700 text-white transition-colors py-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-1">
                                        <span>Request FDD &amp; Direct Lead Info</span>
                                        <span>→</span>
                                    </div>
                                </Link>
                            );
                        }

                        // Standard Unverified / Directory Card
                        return (
                            <Link
                                key={item.id}
                                href={`/franchise/${item.slug}`}
                                className="group block bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            >
                                <div className="flex justify-between items-start mb-3 gap-4">
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border text-center leading-normal ${tagColorClass}`}>
                                        {item.category}
                                    </span>
                                    <div className="text-right shrink-0">
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-wider block">Min Capital</span>
                                        <span className="text-sm font-black text-slate-950">S${(item.min_capital_sgd || 0).toLocaleString()}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-teal-700 transition-colors duration-150 leading-snug">
                                    {item.brand_name}
                                </h3>

                                <div className="flex gap-4 text-[10px] text-slate-600 font-black uppercase tracking-wider mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                    <div>Origin: <span className="text-slate-800 normal-case">{item.brand_origin || 'Singapore'}</span></div>
                                    <div>Outlets: <span className="text-slate-800">{item.current_outlets || '1'}</span></div>
                                </div>

                                <p className="text-slate-700 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {item.description || "No description provided."}
                                </p>

                                <div className="border-t border-slate-100 pt-4 space-y-2 mt-auto text-[11px]">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-slate-600 uppercase tracking-wider">Franchise Fee</span>
                                        <span className="font-black text-slate-900">
                                            {typeof item.franchise_fee_sgd === 'number' ? `S$${item.franchise_fee_sgd.toLocaleString()}` : item.franchise_fee_sgd || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start gap-4">
                                        <span className="font-bold text-slate-600 uppercase tracking-wider shrink-0">Royalty</span>
                                        <span className="font-black text-slate-900 text-right truncate max-w-[180px]">{item.royalty_fee_text || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 w-full text-center bg-slate-50 rounded-xl group-hover:bg-teal-50/70 transition-colors py-2.5 text-[10px] font-black text-slate-800 uppercase tracking-wider group-hover:text-teal-800">
                                    Request Franchise Disclosure Document (FDD)
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Dynamic Fallback Empty View State */}
                {filteredFranchises.length === 0 && (
                    <div className="text-center py-20 bg-white border border-slate-200 border-dashed rounded-3xl p-8">
                        <h4 className="text-base font-black text-slate-950 mb-1">No Franchise Asset Matches Your Criteria</h4>
                        <p className="text-slate-700 text-xs max-w-sm mx-auto leading-relaxed">
                            Try adjusting your maximum minimum capital slide array boundaries or switching to an alternate industry vertical selection.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}