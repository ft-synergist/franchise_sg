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
}

export default function FranchiseGridEngine() {
    const [franchises, setFranchises] = useState<FranchiseItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [maxBudget, setMaxBudget] = useState<number>(500000);

    // THE ABSOLUTE TAXONOMY: Locked to the exact specs of /apply form
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
                    .from('franchises')
                    .select('id, brand_name, slug, category, min_capital_sgd, franchise_fee_sgd, royalty_fee_text, description')
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
        return <div className="w-full text-center py-20 text-slate-500 font-semibold">Loading verified franchise opportunities...</div>;
    }

    if (error) {
        return <div className="w-full text-center py-20 text-red-500 font-semibold">{error}</div>;
    }

    return (
        <div className="w-full bg-slate-50/60 font-sans antialiased text-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-left space-y-8">

                {/* --- Filters Section --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">

                    {/* Category Filter Grouping */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Filter by Industry Vertical</span>
                        <div className="flex flex-wrap gap-1.5">
                            {MASTER_CATEGORIES.map((cat) => (
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

                    {/* Budget Slider */}
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

                {/* --- Results Section --- */}
                <div className="text-xs text-slate-400 font-semibold tracking-wide">
                    Showing <span className="text-slate-900 font-bold">{filteredFranchises.length}</span> verified open investment options match your metrics
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFranchises.map((item) => {
                        const isFood = item.category.includes('Food');
                        const isEducation = item.category.includes('Children') || item.category.includes('Education');
                        const isPersonal = item.category.includes('Personal');
                        const isRetail = item.category.includes('Retail');

                        const tagColorClass = isFood
                            ? 'text-teal-700 bg-teal-50 border-teal-100'
                            : isEducation
                                ? 'text-indigo-700 bg-indigo-50 border-indigo-100'
                                : isPersonal
                                    ? 'text-purple-700 bg-purple-50 border-purple-100'
                                    : isRetail
                                        ? 'text-amber-700 bg-amber-50 border-amber-100'
                                        : 'text-slate-700 bg-slate-50 border-slate-100';

                        return (
                            <Link
                                key={item.id}
                                href={`/insights/${item.slug}`}
                                className="group block bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border text-center leading-normal ${tagColorClass}`}>
                                        {item.category}
                                    </span>
                                    <div className="text-right shrink-0">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Min Capital</span>
                                        <span className="text-sm font-black text-slate-950">S${(item.min_capital_sgd || 0).toLocaleString()}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-slate-950 mb-2 group-hover:text-teal-600 transition-colors duration-150 leading-snug">
                                    {item.brand_name}
                                </h3>

                                <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {item.description || "No description provided."}
                                </p>

                                <div className="border-t border-slate-100 pt-4 space-y-2 mt-auto text-[11px]">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-slate-400 uppercase tracking-wider">Franchise Fee</span>
                                        <span className="font-bold text-slate-800">
                                            {typeof item.franchise_fee_sgd === 'number' ? `S$${item.franchise_fee_sgd.toLocaleString()}` : item.franchise_fee_sgd || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start gap-4">
                                        <span className="font-semibold text-slate-400 uppercase tracking-wider shrink-0">Royalty</span>
                                        <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">{item.royalty_fee_text || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-50 w-full text-center bg-slate-50/50 rounded-xl group-hover:bg-teal-50/50 transition-colors py-2 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider group-hover:text-teal-700">
                                    Request Full Disclosure Packet
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Empty State */}
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