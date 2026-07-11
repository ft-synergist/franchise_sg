'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default function ApplyForListingPage() {
    const [formData, setFormData] = useState({
        brandName: '',
        category: 'Food & Beverage',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        tierRequested: 'free',
        hasAuditedAccounts: false,
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const { error } = await supabaseClient
                .from('listing_applications')
                .insert([{
                    brand_name: formData.brandName,
                    category: formData.category,
                    contact_person: formData.contactPerson,
                    email: formData.email,
                    phone_number: formData.phoneNumber,
                    tier_requested: formData.tierRequested,
                    has_audited_accounts: formData.hasAuditedAccounts,
                    message: formData.message
                }]);

            if (error) throw error;
            setSubmitted(true);
        } catch (err: any) {
            setErrorMessage(err.message || 'Transmission error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50/60 flex items-center justify-center p-6 antialiased font-sans">
                <div className="bg-white max-w-md w-full rounded-2xl p-8 border border-slate-200 text-center shadow-md">
                    <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl text-teal-600">✓</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Application Submitted</h2>
                    <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                        Our audit division will review your brand framework parameters and compliance history within 48 hours.
                    </p>
                    <Link href="/" className="mt-6 inline-block w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors">
                        Return to Directory
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans pb-16">
            {/* Exact Homepage Header Match */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Brand Network Onboarding</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight max-w-3xl leading-none">
                        List Your Franchise Brand Node — Franchise.sg
                    </h1>
                    <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl font-light">
                        Put your brand footprint in front of thousands of high-net-worth investors and prospective corporate operators in Singapore.
                    </p>
                    <div className="mt-8">
                        <Link href="/" className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 px-6 py-3 rounded-xl font-semibold transition-all text-sm inline-block">
                            ← Return to Main Directory
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Layout Block */}
            <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Sidebar Info Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-black text-slate-950 tracking-tight">Onboarding Requirements</h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                            To preserve directory integrity, entries are categorized by tiering benchmarks. Premium badges require verified accounting uploads.
                        </p>
                    </div>
                </div>

                {/* Unified Input Panel Form Container */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
                    {errorMessage && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs font-semibold">
                            ⚠️ {errorMessage}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Brand Name</label>
                            <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50" placeholder="e.g. Petale Tea" value={formData.brandName} onChange={e => setFormData({ ...formData, brandName: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Primary Category</label>
                            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                <option>Food & Beverage</option>
                                <option>Health & Wellness</option>
                                <option>Education & Enrichment</option>
                                <option>Retail Services</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Listing Infrastructure Tier</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <label className={`border-2 rounded-xl p-4 flex flex-col cursor-pointer transition-all ${formData.tierRequested === 'free' ? 'border-teal-600 bg-teal-50/10' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                <div className="flex items-center gap-2">
                                    <input type="radio" name="tierRequested" value="free" checked={formData.tierRequested === 'free'} onChange={() => setFormData({ ...formData, tierRequested: 'free' })} className="text-teal-600 focus:ring-teal-500" />
                                    <span className="font-bold text-sm text-slate-900">Standard Free Directory</span>
                                </div>
                                <span className="text-xs text-slate-500 mt-1.5 leading-normal">Basic visibility across public indexes.</span>
                            </label>

                            <label className={`border-2 rounded-xl p-4 flex flex-col cursor-pointer transition-all ${formData.tierRequested === 'premium_verified' ? 'border-teal-600 bg-teal-50/10' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                <div className="flex items-center gap-2">
                                    <input type="radio" name="tierRequested" value="premium_verified" checked={formData.tierRequested === 'premium_verified'} onChange={() => setFormData({ ...formData, tierRequested: 'premium_verified' })} className="text-teal-600 focus:ring-teal-500" />
                                    <span className="font-bold text-sm text-teal-950 flex items-center gap-1.5">
                                        ✨ Premium Verified Badge
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500 mt-1.5 leading-normal">Includes full audited verification markup indicators.</span>
                            </label>
                        </div>
                    </div>

                    {formData.tierRequested === 'premium_verified' && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={formData.hasAuditedAccounts} onChange={e => setFormData({ ...formData, hasAuditedAccounts: e.target.checked })} className="mt-1 text-teal-600 focus:ring-teal-500 rounded" />
                                <div>
                                    <span className="text-sm font-bold text-slate-900 block">We possess verified, audited operational accounts</span>
                                    <span className="text-xs text-slate-500 mt-0.5 block leading-normal">
                                        Confirms consistency with regional disclosure frameworks. Unverified metrics will be flagged during onboarding review.
                                    </span>
                                </div>
                            </label>
                        </div>
                    )}

                    <div className="border-t border-slate-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Contact Person</label>
                            <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50" placeholder="Your Name" value={formData.contactPerson} onChange={e => setFormData({ ...formData, contactPerson: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Corporate Email</label>
                            <input type="email" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50" placeholder="name@brand.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                            <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50" placeholder="+65 Mobile/Office" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Brand Metrics Overview (Optional)</label>
                        <textarea className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50" rows={3} placeholder="Provide details on current unit counts or target operational footprints..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50">
                        {loading ? 'Transmitting Inbound Payload...' : 'Submit Official Directory Application'}
                    </button>
                </form>
            </main>
        </div>
    );
}