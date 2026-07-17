'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FddRequestFormProps {
    brandName: string;
}

export default function FddRequestForm({ brandName }: FddRequestFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        capital: 'S$100,000 - S$250,000',
        timeline: '3 - 6 Months',
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorText('');

        try {
            // 1. Write transactional lead to Supabase
            const { error } = await supabase.from('crm_lead_payloads').insert([
                {
                    brand_name: brandName,
                    investor_name: formData.name,
                    investor_email: formData.email,
                    investor_phone: formData.phone,
                    available_capital: formData.capital,
                    target_timeline: formData.timeline,
                    custom_notes: formData.notes
                }
            ]);

            if (error) throw error;

            // 2. Fire live notification request packet directly to our API route
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'investor_lead',
                    data: { ...formData, brand_name: brandName }
                })
            });

            setSuccess(true);
        } catch (err: any) {
            console.error('Lead Capture Routing Failure:', err);
            setErrorText(err.message || 'Unable to register request. Please verify network status.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-700 text-white font-bold">✓</div>
                <div>
                    <h3 className="text-sm font-black text-slate-950 uppercase tracking-wide">FDD Request Registered</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1 max-w-md mx-auto">
                        Your verification signature has been logged. The official Franchise Disclosure &amp; Info Pack for **{brandName}** is being compiled and will be routed to your corporate inbox shortly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-5 sm:p-6 text-left">
            <div className="mb-4">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Request Franchise Disclosure Document (FDD)</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Provide your investment parameters below to securely extract the complete financial packet and unit economics for {brandName}.</p>
            </div>

            {errorText && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold rounded-lg mb-4">{errorText}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Full Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Jasmine Lee" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="jasmine@gmail.com" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Number</label>
                        <input type="text" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+659XXXXXXX" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Liquid Capital Allocation</label>
                        <select name="capital" value={formData.capital} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                            <option>Under S$50,000</option>
                            <option>S$50,000 - S$100,000</option>
                            <option>S$100,000 - S$250,000</option>
                            <option>S$250,000 - S$500,000</option>
                            <option>Over S$500,000</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Target Deployment Timeline</label>
                        <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                            <option>Immediate (Within 1 Month)</option>
                            <option>3 - 6 Months</option>
                            <option>6 - 12 Months</option>
                            <option>Flexible / Researching</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Additional Queries / Intent Notes (Optional)</label>
                    <textarea name="notes" rows={2} value={formData.notes} onChange={handleChange} placeholder="TEST" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none" />
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="w-full sm:w-auto bg-teal-800 hover:bg-teal-900 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider transition-colors disabled:opacity-50">
                        {loading ? 'Processing...' : 'Submit Official FDD Request'}
                    </button>
                </div>
            </form>
        </div>
    );
}