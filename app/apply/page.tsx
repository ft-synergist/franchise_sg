'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function FranchiseApplyPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [formData, setFormData] = useState({
        brand_name: '',
        uen: '',
        category: 'Food & Beverage (QSR & Full-Service)',
        min_capital: '',
        franchise_fee: '',
        royalty_structure: '',
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
            const { error } = await supabase.from('franchise_applications').insert([
                {
                    brand_name: formData.brand_name,
                    uen: formData.uen,
                    category: formData.category,
                    min_capital: formData.min_capital ? parseFloat(formData.min_capital) : null,
                    franchise_fee: formData.franchise_fee ? parseFloat(formData.franchise_fee) : null,
                    royalty_structure: formData.royalty_structure,
                    brand_summary: formData.brand_summary,
                    contact_name: formData.contact_name,
                    contact_email: formData.contact_email
                }
            ]);

            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setErrorText(err.message || 'Submission failed. Please check network integrity.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans w-full text-left">
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-4xl mx-auto text-left">
                    <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Singapore Franchise Portal</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-none">List Your Franchise Brand</h1>
                    <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                        Connect your brand footprint directly with high-net-worth individuals, family offices, private equity houses, and experienced master franchise operators across the Singapore and Asian markets.
                    </p>
                    <div className="mt-6">
                        <Link href="/" className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors">← Return to Main Directory</Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
                    {success ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center text-xl font-bold mx-auto">✓</div>
                            <h2 className="text-2xl font-black text-slate-950 tracking-tight">Application Submitted Successfully</h2>
                            <p className="text-sm text-slate-500 max-w-md mx-auto">Our internal verification team will cross-reference your UEN parameter layout records against live ACRA filings. You will receive an operational update via email shortly.</p>
                            <div className="pt-4">
                                <Link href="/" className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors">Return to Home Layout</Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-extrabold text-slate-950 tracking-tight mb-2">Brand Registration Profile</h2>
                            <p className="text-xs text-slate-500 mb-8 leading-relaxed">Fill out the verified metrics below. Our review unit cross-references all applications with ACRA corporate registry records before deploying your listing profile to our active investor network.</p>

                            {errorText && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">{errorText}</div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Brand / Corporate Name</label>
                                        <input type="text" name="brand_name" required value={formData.brand_name} onChange={handleChange} placeholder="e.g. Jie Bakery" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Singapore UEN</label>
                                        <input type="text" name="uen" required value={formData.uen} onChange={handleChange} placeholder="e.g. 201538542M" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
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
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Minimum Investment Capital Required (SGD)</label>
                                        <input type="number" name="min_capital" required value={formData.min_capital} onChange={handleChange} placeholder="e.g. 5000" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Initial Franchise Fee (SGD)</label>
                                        <input type="number" name="franchise_fee" required value={formData.franchise_fee} onChange={handleChange} placeholder="e.g. 5000" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Ongoing Monthly Royalty Structure</label>
                                        <input type="text" name="royalty_structure" required value={formData.royalty_structure} onChange={handleChange} placeholder="e.g. 5%" className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Brand Summary &amp; Franchise Structure</label>
                                    <textarea name="brand_summary" rows={4} required value={formData.brand_summary} onChange={handleChange} placeholder="State your business model clearly..." className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all resize-none leading-relaxed" />
                                </div>

                                <hr className="my-6 border-slate-100" />

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
                                        {loading ? 'Processing System Check...' : 'Submit Brand Verification Profile'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}