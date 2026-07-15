'use client';

import { useState } from 'react';

interface FranchiseFilterPanelProps {
    onCapitalChange?: (value: number) => void;
    onCategoryChange?: (category: string) => void;
}

export default function FranchiseFilterPanel({ onCapitalChange, onCategoryChange }: FranchiseFilterPanelProps) {
    const [capital, setCapital] = useState(500000);
    const [activeCategory, setActiveCategory] = useState('All');

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setCapital(value);
        if (onCapitalChange) onCapitalChange(value);
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        if (onCategoryChange) onCategoryChange(category);
    };

    const categories = ['All', 'F&B', 'Fitness', 'Retail', 'Education'];

    return (
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* 1. Capital Range Slider Block */}
            <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                    {/* Explicitly linked label tag ensures the accessibility tree maps perfectly */}
                    <label
                        htmlFor="capital-range-input"
                        className="text-xs font-black text-slate-900 uppercase tracking-wider"
                    >
                        Maximum Investment Capital
                    </label>
                    <span className="text-sm font-black text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                        S${capital.toLocaleString()}
                    </span>
                </div>

                {/* High contrast explanatory copy using text-slate-600 instead of text-slate-400 */}
                <p className="text-[11px] text-slate-600 leading-relaxed">
                    Adjust the threshold below to filter verified Singapore networks matching your exact capital allocation profile.
                </p>

                <div className="relative pt-2">
                    <input
                        id="capital-range-input"
                        type="range"
                        min="15000"
                        max="500000"
                        step="5000"
                        value={capital}
                        onChange={handleSliderChange}
                        // Dual protection: htmlFor maps to ID, and aria-label describes functionality explicitly to AI agents
                        aria-label="Filter franchises by maximum investment capital requirement amount"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    />
                    <div className="flex justify-between text-[9px] font-bold text-slate-700 uppercase mt-2 tracking-wide">
                        <span>S$15,000</span>
                        <span>S$250,000</span>
                        <span>S$500,000+</span>
                    </div>
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* 2. High-Contrast Category Pill Selector */}
            <div className="space-y-3">
                <span className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                    Sector Classification
                </span>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => handleCategoryClick(cat)}
                                // Accessible names are inherited natively via button text strings
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isActive
                                        ? 'bg-teal-800 text-white shadow-sm hover:bg-teal-900'
                                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-2 focus:ring-slate-300'
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}