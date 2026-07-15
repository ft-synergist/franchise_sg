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
        capital: 'S$50,000 - S$100,000',
        timeline: 'Within 3 Months',
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
            const { error } = await supabase.from('lead_payloads').insert([
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
            setSuccess(true);
        } catch (err: any) {
            console.error('FDD Submission Exception:', err);
            setErrorText(err.message || 'Request transmission split. Please verify network integrity.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center space-y-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-sm">✓</span>
                <h4 className="text-sm font-black text-slate-950 uppercase tracking-wider">FDD Request Registered</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your verification signature has been logged. The official Franchise Disclosure & Info Pack for **{brandName}** is being compiled and will be routed to your corporate inbox shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-left">
            <div>
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Request Franchise Disclosure Document (FDD)</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">Provide your investment parameters below to securely extract the complete financial packet, territorial allocation matrices, and unit economics for {brandName}.</p>
            </div>

            {errorText && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">{errorText}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Alex Lim" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="alex@familyoffice.sg" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Contact Number</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="e.g. +65 9123 4567" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Liquid Capital Allocation</label>
                        <select name="capital" value={formData.capital} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-700 font-medium transition-all">
                            <option>Under S$50,000</option>
                            <option>S$50,000 - S$100,000</option>
                            <option>S$100,000 - S$250,000</option>
                            <option>S$250,000 - S$500,000</option>
                            <option>S$500,000+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Target Deployment Timeline</label>
                        <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-700 font-medium transition-all">
                            <option>Within 3 Months</option>
                            <option>3 - 6 Months</option>
                            <option>6 - 12 Months</option>
                            <option>Information Gathering Only</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Additional Queries / Intent Notes (Optional)</label>
                    <textarea name="notes" rows={2} value={formData.notes} onChange={handleChange} placeholder="Requesting structural breakdowns for master franchise territory expansions..." className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800 font-medium transition-all resize-none leading-relaxed" />
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" disabled={loading} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-colors disabled:opacity-50">
                        {loading ? 'Processing Document Request...' : 'Submit Official FDD Request'}
                    </button>
                </div>
            </form>
        </div>
    );
}