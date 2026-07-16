'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ApplyForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [formData, setFormData] = useState({
        brand_name: '',
        uen: '',
        category: 'Food & Beverage',
        brand_origin: 'Singapore',
        established_year: '',
        current_outlets: '',
        min_capital: '',
        franchise_fee: '',
        royalty_structure: '',
        projected_breakeven: '',
        projected_payback: '',
        projected_roi: '',
        brand_summary: '',
        contact_name: '',
        contact_email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorText('');

        try {
            // 1. Core transactional database insertion
            const { error } = await supabase.from('crm_franchise_applications').insert([
                {
                    brand_name: formData.brand_name,
                    uen: formData.uen,
                    category: formData.category,
                    brand_origin: formData.brand_origin,
                    established_year: formData.established_year ? parseInt(formData.established_year) : null,
                    current_outlets: formData.current_outlets ? parseInt(formData.current_outlets) : 1,
                    min_capital_sgd: formData.min_capital ? parseFloat(formData.min_capital) : null,
                    franchise_fee_sgd: formData.franchise_fee ? parseFloat(formData.franchise_fee) : null,
                    royalty_fee_text: formData.royalty_structure,
                    projected_breakeven_text: formData.projected_breakeven,
                    projected_payback_text: formData.projected_payback,
                    projected_roi_text: formData.projected_roi,
                    description: formData.brand_summary,
                    contact_name: formData.contact_name,
                    contact_email: formData.contact_email
                }
            ]);

            if (error) throw error;

            // 2. Transmit notification request event to short-term centralized email bridge
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'franchisor_application',
                    data: formData
                })
            });

            setSuccess(true);
        } catch (err: any) {
            console.error('Franchisor Registry Failure:', err);
            setErrorText(err.message || 'Transmission exception encountered. Please review database sync rules.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full bg-teal-50 border border-teal-200 rounded-3xl p-8 text-center space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white text-xl font-bold">✓</div>
                <div>
                    <h2 className="text-xl font-black text-slate-950 uppercase tracking-wide">Brand Registry Received</h2>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 max-w-md mx-auto">
                        Commercial profiling for **{formData.brand_name}** has logged successfully. The system router has dispatched onboarding tracking references directly to **{formData.contact_email}**.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto text-left">
            <div className="border-b border-slate-100 pb-5 mb-6">
                <h1 className="text-2xl font-black text-slate-950 tracking-tight uppercase">Franchisor Listing Onboarding</h1>
                <p className="text-xs text-slate-500 mt-1">Provide unified configuration values to compile your structural directory profile, dynamic sitemaps, and automated SEO diagnostic cards.</p>
            </div>

            {errorText && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl mb-6">{errorText}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Core Institutional Parameters */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">1. Brand Identity &amp; Parameters</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Brand Name</label>
                            <input type="text" name="brand_name" required value={formData.brand_name} onChange={handleChange} placeholder="e.g. Pawa Bakery" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Singapore UEN</label>
                            <input type="text" name="uen" required value={formData.uen} onChange={handleChange} placeholder="e.g. 202612345N" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Industry Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-700 font-medium transition-all">
                                <option>Food &amp; Beverage</option>
                                <option>Retail &amp; Consumer Goods</option>
                                <option>Fitness &amp; Wellness</option>
                                <option>Education &amp; Enrichment</option>
                                <option>Services &amp; Logistics</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Brand Origin</label>
                            <input type="text" name="brand_origin" required value={formData.brand_origin} onChange={handleChange} placeholder="e.g. Singapore" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Established Year</label>
                            <input type="number" name="established_year" required value={formData.established_year} onChange={handleChange} placeholder="e.g. 2024" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Active System Outlets</label>
                            <input type="number" name="current_outlets" required value={formData.current_outlets} onChange={handleChange} placeholder="e.g. 5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                    </div>
                </div>

                {/* Section 2: Capital Deployment Matrices */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">2. Commercial &amp; Capital Allocation Parameters</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Min Capital Required (SGD)</label>
                            <input type="number" name="min_capital" required value={formData.min_capital} onChange={handleChange} placeholder="e.g. 95000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Initial Franchise Fee (SGD)</label>
                            <input type="number" name="franchise_fee" required value={formData.franchise_fee} onChange={handleChange} placeholder="e.g. 25000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Ongoing Royalty Structure</label>
                            <input type="text" name="royalty_structure" required value={formData.royalty_structure} onChange={handleChange} placeholder="e.g. 5% Gross Sales" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                    </div>
                </div>

                {/* Section 3: Performance & ROI Projections */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">3. Projections &amp; Market Summaries</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Projected Breakeven</label>
                            <input type="text" name="projected_breakeven" required value={formData.projected_breakeven} onChange={handleChange} placeholder="e.g. 6 - 9 Months" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Projected Payback Period</label>
                            <input type="text" name="projected_payback" required value={formData.projected_payback} onChange={handleChange} placeholder="e.g. 18 - 24 Months" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Estimated Return Matrix (ROI)</label>
                            <input type="text" name="projected_roi" required value={formData.projected_roi} onChange={handleChange} placeholder="e.g. 25% - 30% Annually" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Market Overview / Brand Summary</label>
                        <textarea name="brand_summary" required rows={3} value={formData.brand_summary} onChange={handleChange} placeholder="Artisanal bakery concept focusing on high-margin, trending local pastries combined with advanced centralized supply chain infrastructure..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all resize-none leading-relaxed" />
                    </div>
                </div>

                {/* Section 4: Officer Authentication Details */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">4. Authorized Representative Contact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Contact Full Name</label>
                            <input type="text" name="contact_name" required value={formData.contact_name} onChange={handleChange} placeholder="e.g. Frederick Tan" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Official Corporate Email</label>
                            <input type="email" name="contact_email" required value={formData.contact_email} onChange={handleChange} placeholder="fredtan@pawabakery.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50">
                        {loading ? 'Processing Brand Registry...' : 'Publish Official Franchise Listing'}
                    </button>
                </div>
            </form>
        </div>
    );
}