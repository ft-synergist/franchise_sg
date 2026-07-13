'use client';

import { useState, useMemo } from 'react';

interface FranchiseItem {
    id: string;
    brand_name: string;
    category: string;
    description: string;
    is_featured: boolean;
    min_capital_sgd: number;
    franchise_fee_sgd: number;
    royalty_fee_text: string;
}

interface GridEngineProps {
    initialFranchises: FranchiseItem[];
}

export default function FranchiseGridEngine({ initialFranchises }: GridEngineProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [maxBudget, setMaxBudget] = useState<number>(300000); // Default high boundary tier

    // Dynamically extract unique categories available in the current database payload
    const categories = useMemo(() => {
        const list = new Set(initialFranchises.map(f => f.category));
        return ['All', ...Array.from(list)];
    }, [initialFranchises]);

    // Perform hyper-fast client-side filtering operations
    const filteredFranchises = useMemo(() => {
        return initialFranchises.filter((item) => {
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesBudget = !item.min_capital_sgd || item.min_capital_sgd <= maxBudget;
            return matchesCategory && matchesBudget;
        });
    }, [initialFranchises, selectedCategory, maxBudget]);

    return (
        <div className="w-full">
            {/* Interactive Operational Control Suite Block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-10 shadow-sm flex flex-col md:flex-row gap-8 items-center justify-between">

                {/* Category Pill Switcher */}
                <div className="w-full md:w-2/3 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                        Filter by Industry Vertical
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${selectedCategory === cat
                                    ? 'bg-teal-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Budget Tier Range Selector */}
                <div className="w-full md:w-1/3 text-left">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Max Minimum Capital Required
                        </label>
                        <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                            S${maxBudget.toLocaleString()}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="10000"
                        max="300000"
                        step="10000"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(Number(e.target.value))}
                        className="w-full accent-teal-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                        <span>S$10k</span>
                        <span>S$150k</span>
                        <span>S$300k+</span>
                    </div>
                </div>

            </div>

            {/* Render Viewport Loops based on Filter Array State */}
            {filteredFranchises.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                    <p className="text-slate-500 font-medium">No opportunities match your selected filter matrix.</p>
                    <button
                        onClick={() => { setSelectedCategory('All'); setMaxBudget(300000); }}
                        className="mt-3 text-xs font-bold text-teal-600 hover:underline"
                    >
                        Reset filter parameters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFranchises.map((item) => (
                        <div key={item.id} className={`bg-white border rounded-2xl p-6 flex flex-col transition-all shadow-sm hover:shadow-md ${item.is_featured ? 'border-teal-500/40 bg-gradient-to-b from-teal-50/10 to-white' : 'border-slate-200/80'}`}>

                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {item.category}
                                </span>
                                {item.is_featured && (
                                    <span className="text-[10px] font-extrabold bg-teal-600 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
                                        Premium Partner
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-black text-slate-950 mt-1">{item.brand_name}</h3>
                            <p className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed flex-1">
                                {item.description}
                            </p>

                            <div className="mt-6 border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 bg-slate-50/80 p-3 rounded-xl text-left">
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Min Capital</span>
                                    <span className="font-extrabold text-slate-900 text-sm">S${item.min_capital_sgd ? item.min_capital_sgd.toLocaleString() : '0'}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Franchise Fee</span>
                                    <span className="font-bold text-slate-700 text-sm">S${item.franchise_fee_sgd ? item.franchise_fee_sgd.toLocaleString() : '0'}</span>
                                </div>
                            </div>

                            <div className="mt-3 text-[11px] font-medium text-slate-500 flex items-center gap-1 bg-slate-100/50 p-2 rounded-lg text-left">
                                💰 <span className="text-slate-700 font-semibold">Royalty:</span> {item.royalty_fee_text}
                            </div>

                            {/* Gated High Intent Convincement Loop Action Target */}
                            <button className="w-full mt-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors duration-150">
                                Request Full Disclosure Packet
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}