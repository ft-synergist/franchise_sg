'use client';

import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

function ApplyFormContent() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [formData, setFormData] = useState({
        brand_name: '',
        uen: '',
        category: 'Food & Beverage (QSR & Full-Service)',
        brand_origin: 'Singapore',
        established_year: '',
        current_outlets: '1',
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

    // Detect and extract preset brand allocations directly from the URL stream
    useEffect(() => {
        const brandParam = searchParams.get('brand');
        if (brandParam) {
            setFormData(prev => ({ ...prev, brand_name: brandParam }));
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorText('');

        try {
            // Pipeline mutations directly into the updated table schema structures
            const { error } = await supabase.from('franchise_applications').insert([
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
            setSuccess(true);
        } catch (err: any) {
            setErrorText(err.message || 'Submission matrix interrupted. Please check database parameter structures.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center text-xl font-bold mx-auto">✓</div>
                <h2 className="text-2xl font-black text-slate-950 tracking-tight">Verification Profile Submitted</h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto">Data sync is operational. Our audit unit will verify these operational parameters against live ACRA filings before staging updates live to the directory network.</p>
                <div className="pt-4">
                    <Link href="/" className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors">
                        Return to Franchise Singapore Directory
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-xl font-extrabold text-slate-950 tracking-tight mb-2">Brand Registration Profile</h2>
            <p className="text-xs text-slate-500 mb-8 leading-relaxed">Provide absolute, verified operational matrices below. All submitted fields map explicitly to our live investor diagnostic dashboards and conversational AI recommendation data chunks.</p>

            {errorText && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">{errorText}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section: Identity Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Brand / Corporate Name</label>
                        <input type="text" name="brand_name" required value={formData.brand_name} onChange={handleChange} placeholder="e.g. Barber 25" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Singapore UEN</label>
                        <input type="text" name="uen" required value={formData.uen} onChange={handleChange} placeholder="e.g. 201538542M" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                </div>

                {/* Section: Taxonomy & Historical Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Primary Business Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-700 font-medium transition-all">
                            <option>Food &amp; Beverage (QSR &amp; Full-Service)</option>
                            <option>Commercial &amp; Residential Services</option>
                            <option>Personal Services (Wellness, Fitness &amp; Salons)</option>
                            <option>Business Services (B2B &amp; Consulting)</option>
                            <option>Software, AI &amp; Digital Technology</option>
                            <option>Eldercare Services &amp; Healthcare Centers</option>
                            <option>Retail &amp; Convenience</option>
                            <option>Automotive Tech &amp; Maintenance</option>
                            <option>Hospitality &amp; Lodging</option>
                            <option>Children&apos;s Services (Education &amp; Enrichment)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Brand Origin</label>
                        <input type="text" name="brand_origin" required value={formData.brand_origin} onChange={handleChange} placeholder="e.g. Japan" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Year Est.</label>
                        <input type="number" name="established_year" required value={formData.established_year} onChange={handleChange} placeholder="e.g. 2015" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                </div>

                {/* Section: Baseline Financial Allocations */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Active Outlets</label>
                        <input type="number" name="current_outlets" required value={formData.current_outlets} onChange={handleChange} placeholder="e.g. 1" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Min Capital (SGD)</label>
                        <input type="number" name="min_capital" required value={formData.min_capital} onChange={handleChange} placeholder="e.g. 100000" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Franchise Fee (SGD)</label>
                        <input type="number" name="franchise_fee" required value={formData.franchise_fee} onChange={handleChange} placeholder="e.g. 25000" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Royalty Model</label>
                        <input type="text" name="royalty_structure" required value={formData.royalty_structure} onChange={handleChange} placeholder="e.g. Fixed Monthly Rate" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                </div>

                {/* Section: Premium Performance Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-teal-50/30 p-4 border border-teal-500/10 rounded-2xl">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-teal-800 mb-2">Projected Breakeven</label>
                        <input type="text" name="projected_breakeven" required value={formData.projected_breakeven} onChange={handleChange} placeholder="e.g. 3 - 6 Months" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-teal-800 mb-2">Projected Payback Period</label>
                        <input type="text" name="projected_payback" required value={formData.projected_payback} onChange={handleChange} placeholder="e.g. 18 - 24 Months" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-teal-800 mb-2">Estimated ROI Matrix</label>
                        <input type="text" name="projected_roi" required value={formData.projected_roi} onChange={handleChange} placeholder="e.g. 25% - 35%" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                </div>

                {/* Section: Strategic Narrative */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Brand Summary &amp; Market Overview</label>
                    <textarea name="brand_summary" rows={4} required value={formData.brand_summary} onChange={handleChange} placeholder="Premium high-end traditional mens barbering and grooming salon concept..." className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all resize-none leading-relaxed" />
                </div>

                <hr className="my-6 border-slate-100" />

                {/* Section: Administrative Verification Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Authorized Management Contact Name</label>
                        <input type="text" name="contact_name" required value={formData.contact_name} onChange={handleChange} placeholder="Frederick Tan" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Official Management Corporate Email</label>
                        <input type="email" name="contact_email" required value={formData.contact_email} onChange={handleChange} placeholder="fredtan@ftsynergist.com" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={loading} className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-sm transition-colors duration-200 block disabled:opacity-50">
                        {loading ? 'Processing Verification Data Sync...' : 'Submit Brand Verification Profile'}
                    </button>
                </div>
            </form>
        </>
    );
}

// Wrap inside a strict Suspense boundary to protect Next.js layout compilation pipelines from useSearchParams runtime checking
export default function ApplyForm() {
    return (
        <Suspense fallback={<div className="text-center py-10 text-xs font-bold text-slate-400 uppercase tracking-wider">Synchronizing Form Elements...</div>}>
            <ApplyFormContent />
        </Suspense>
    );
}