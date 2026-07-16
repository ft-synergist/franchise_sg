'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FranchiseItem {
    id: string;
    brand_name: string;
    slug: string;
    category: string;
    min_capital_sgd: number;
    franchise_fee_sgd: number;
    royalty_fee_text: string;
    description: string;
    brand_origin?: string;
    current_outlets?: number;
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
                    .order('brand_name', { ascending: true });

                if (error) throw error;
                if (data) setFranchises(data);
            } catch (err: any) {
                console.error("Error fetching franchises:", err);
                setError("Failed to load franchise listings.");
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
                                const isSelected = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        aria-pressed={isSelected}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 border ${isSelected
                                            ? 'bg-teal-700 border-teal-700 text-white shadow-sm'
                                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-slate-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Budget Slider Box: Linked cleanly to clear Accessibility/Agentic Checks */}
                    <div className="space-y-3 md:w-80 shrink-0 w-full">
                        <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase tracking-wider">
                            <label htmlFor="budget-range-input">Max Minimum Capital Required</label>
                            <span className="text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 font-black">
                                S${maxBudget.toLocaleString()}
                            </span>
                        </div>
                        <div className="relative pt-1">
                            <input
                                id="budget-range-input"
                                name="maxBudget"
                                type="range"
                                min={15000}
                                max={500000}
                                step={5000}
                                value={maxBudget}
                                onChange={(e) => setMaxBudget(Number(e.target.value))}

                                // Agentic Tree Bindings
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

                                {/* Metric Data Block */}
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

                                {/* Conversion CTA block matching AAA specifications */}
                                <div className="mt-4 pt-3 border-t border-slate-100 w-full text-center bg-slate-50 rounded-xl group-hover:bg-teal-50/70 transition-colors py-2.5 text-[10px] font-black text-slate-800 uppercase tracking-wider group-hover:text-teal-800">
                                    Request Franchise Disclosure Document (FDD)
                                </div>
                            </Link>
                        )
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