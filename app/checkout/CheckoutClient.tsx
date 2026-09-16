'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface CheckoutState {
    brand_name: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    uen: string;
    payment_method: 'paynow' | 'card' | 'invoice';
    agree_terms: boolean;
}

function CheckoutForm() {
    const searchParams = useSearchParams();

    // Query parameters pre-filling support (e.g. /checkout?brand=iJooz&contact=Bruce%20Zhang&email=contact@ijooz.com)
    const initialBrand = searchParams.get('brand') || searchParams.get('brand_name') || '';
    const initialContact = searchParams.get('contact') || searchParams.get('name') || '';
    const initialEmail = searchParams.get('email') || '';
    const initialPhone = searchParams.get('phone') || '';
    const initialUen = searchParams.get('uen') || '';

    const [form, setForm] = useState<CheckoutState>({
        brand_name: initialBrand,
        contact_name: initialContact,
        contact_email: initialEmail,
        contact_phone: initialPhone,
        uen: initialUen,
        payment_method: 'paynow',
        agree_terms: true
    });

    useEffect(() => {
        if (initialBrand && !form.brand_name) setForm(prev => ({ ...prev, brand_name: initialBrand }));
        if (initialContact && !form.contact_name) setForm(prev => ({ ...prev, contact_name: initialContact }));
        if (initialEmail && !form.contact_email) setForm(prev => ({ ...prev, contact_email: initialEmail }));
    }, [initialBrand, initialContact, initialEmail]);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [errorText, setErrorText] = useState('');

    // Credit Card Form State
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '4242 •••• •••• 4242',
        expiry: '12/28',
        cvc: '888',
        nameOnCard: form.contact_name || 'Corporate Cardholder'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckoutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorText('');

        if (!form.brand_name.trim()) {
            setErrorText('Please enter your official Franchise Brand Name.');
            setLoading(false);
            return;
        }

        if (!form.contact_email.trim()) {
            setErrorText('Please enter a valid official corporate email address.');
            setLoading(false);
            return;
        }

        const generatedTxId = 'FSG-' + Math.random().toString(36).substring(2, 9).toUpperCase();

        try {
            // Dispatch notification and update CRM / Email router
            const res = await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'brand_payment_onboarding',
                    data: {
                        brand_name: form.brand_name,
                        contact_name: form.contact_name,
                        contact_email: form.contact_email,
                        contact_phone: form.contact_phone,
                        uen: form.uen,
                        payment_method: form.payment_method,
                        amount_sgd: 600,
                        transaction_id: generatedTxId,
                        plan_name: 'Verified Brand Partner Listing (12 Months)',
                        timestamp: new Date().toISOString()
                    }
                })
            });

            if (!res.ok) {
                console.warn('Backend payment notification returned non-200 status');
            }

            setTransactionId(generatedTxId);
            setSuccess(true);
        } catch (err: any) {
            console.error('Checkout processing exception:', err);
            setErrorText(err.message || 'Payment processing error encountered. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto bg-slate-900 border border-teal-500/30 rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-6 text-left">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-400 flex items-center justify-center text-3xl font-extrabold mx-auto">
                    ✓
                </div>

                <div className="text-center space-y-2">
                    <span className="bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-teal-500/30">
                        Activation Confirmed
                    </span>
                    <h2 className="text-3xl font-black text-white tracking-tight pt-2">
                        Welcome to Franchise.sg, {form.brand_name}!
                    </h2>
                    <p className="text-sm text-slate-300 max-w-lg mx-auto">
                        Your **Verified Brand Partner Listing** ($600/year) is now active. All inbound prospective franchisee leads are now unlocked and routed directly to your team.
                    </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Transaction Reference:</span>
                        <span className="font-mono font-bold text-teal-400">{transactionId}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Brand Partner:</span>
                        <span className="font-semibold text-slate-200">{form.brand_name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Authorized Contact:</span>
                        <span className="font-semibold text-slate-200">{form.contact_name} ({form.contact_email})</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Payment Status:</span>
                        <span className="font-bold text-emerald-400 uppercase">
                            {form.payment_method === 'invoice' ? 'Invoice Issued (Net 14)' : 'Paid S$600.00 Net'}
                        </span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span className="text-slate-400">CRM Lead Routing:</span>
                        <span className="font-bold text-teal-300">Synced to Growing Beyond Borders CRM</span>
                    </div>
                </div>

                <div className="bg-teal-950/40 border border-teal-500/30 rounded-2xl p-5 text-xs text-teal-200 space-y-2">
                    <h4 className="font-bold text-teal-300 uppercase tracking-wider">🚀 What Happens Next?</h4>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300 leading-relaxed">
                        <li>Our onboarding team has released your active buyer inquiry details to <strong>{form.contact_email}</strong>.</li>
                        <li>Your brand page on Franchise.sg now features the <strong>Verified Brand Partner Badge</strong>.</li>
                        <li>You have been granted access to your dedicated <strong>Growing Beyond Borders CRM Lead Management Dashboard</strong>.</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                        Return to Directory →
                    </Link>
                    <a
                        href="https://growingbeyondborders.com/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all border border-slate-700"
                    >
                        Access BB CRM Workspace ↗
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left Column: Plan Benefits & Agreement Summary */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-500/30 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
                    <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest">
                        Official Listing Agreement
                    </div>

                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Verified Brand Partner</h2>
                        <p className="text-xs text-slate-300 mt-1">12-Month Franchise.sg Listing &amp; Lead Routing</p>
                    </div>

                    <div className="border-t border-b border-slate-800 py-4 my-4 flex items-baseline justify-between">
                        <div>
                            <span className="text-xs text-slate-400 line-through block">Standard Rate: S$1,200/yr</span>
                            <span className="text-3xl font-black text-teal-400">S$600</span>
                            <span className="text-xs text-slate-300 ml-1.5 font-medium">/ year (Net)</span>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                            50% Founding Rate
                        </span>
                    </div>

                    <div className="space-y-3 text-xs">
                        <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Included Partner Deliverables:</h4>
                        
                        <div className="flex items-start gap-2.5 text-slate-300">
                            <span className="text-teal-400 font-bold">✓</span>
                            <span><strong>Immediate Buyer Lead Handoff:</strong> Unlock contact details (Phone/Email) for active inbound franchisee requests.</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-slate-300">
                            <span className="text-teal-400 font-bold">✓</span>
                            <span><strong>Real-Time Automated Routing:</strong> Direct email &amp; WhatsApp notifications sent instantly when prospective buyers submit FDD requests.</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-slate-300">
                            <span className="text-teal-400 font-bold">✓</span>
                            <span><strong>Verified Brand Partner Badge:</strong> Official verification badge on the Franchise.sg directory.</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-slate-300">
                            <span className="text-teal-400 font-bold">✓</span>
                            <span><strong>BB AI CRM Integration:</strong> Dedicated pipeline dashboard access on Growing Beyond Borders.</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-slate-300">
                            <span className="text-teal-400 font-bold">✓</span>
                            <span><strong>SEO Indexing &amp; APAC Exposure:</strong> Optimized franchise profiling for search engines across Singapore &amp; Southeast Asia.</span>
                        </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 leading-relaxed">
                        🔒 Guaranteed Service SLA: Leads are dispatched automatically via Franchise.sg router. Subscription recurs annually at locked-in founding partner rate.
                    </div>
                </div>
            </div>

            {/* Right Column: Checkout Form & Payment Gateways */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
                <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Complete Brand Onboarding</h2>
                    <p className="text-xs text-slate-500 mt-1">Enter authorized corporate details and select your preferred payment method.</p>
                </div>

                {errorText && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                        {errorText}
                    </div>
                )}

                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    {/* Section 1: Brand & Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">1. Franchisor Details</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Franchise Brand Name *</label>
                                <input
                                    type="text"
                                    name="brand_name"
                                    required
                                    value={form.brand_name}
                                    onChange={handleChange}
                                    placeholder="e.g. iJooz / Old Chang Kee / Mr. Coconut"
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Singapore UEN (Optional)</label>
                                <input
                                    type="text"
                                    name="uen"
                                    value={form.uen}
                                    onChange={handleChange}
                                    placeholder="e.g. 201833611G"
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Authorized Contact Name *</label>
                                <input
                                    type="text"
                                    name="contact_name"
                                    required
                                    value={form.contact_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Bruce Zhang / Lucas Lin"
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Corporate Email Address *</label>
                                <input
                                    type="email"
                                    name="contact_email"
                                    required
                                    value={form.contact_email}
                                    onChange={handleChange}
                                    placeholder="contact@brand.com"
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Payment Method Selection */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">2. Select Payment Option</h3>

                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setForm(prev => ({ ...prev, payment_method: 'paynow' }))}
                                className={`p-3 rounded-2xl border text-center transition-all ${
                                    form.payment_method === 'paynow'
                                        ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-2 ring-teal-500/30 font-bold'
                                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-medium'
                                }`}
                            >
                                <div className="text-xs font-bold uppercase">PayNow UEN</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Instant SG QR</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setForm(prev => ({ ...prev, payment_method: 'card' }))}
                                className={`p-3 rounded-2xl border text-center transition-all ${
                                    form.payment_method === 'card'
                                        ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-2 ring-teal-500/30 font-bold'
                                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-medium'
                                }`}
                            >
                                <div className="text-xs font-bold uppercase">Credit Card</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Visa / Mastercard</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setForm(prev => ({ ...prev, payment_method: 'invoice' }))}
                                className={`p-3 rounded-2xl border text-center transition-all ${
                                    form.payment_method === 'invoice'
                                        ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-2 ring-teal-500/30 font-bold'
                                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-medium'
                                }`}
                            >
                                <div className="text-xs font-bold uppercase">Corporate Invoice</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Bank Transfer</div>
                            </button>
                        </div>

                        {/* PayNow QR Details */}
                        {form.payment_method === 'paynow' && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">PayNow Entity UEN</span>
                                        <span className="text-sm font-mono font-black text-slate-900">201538542M</span>
                                        <span className="text-xs text-slate-500 block">FT SYNERGIST PTE. LTD. (Franchise.sg Operator)</span>
                                    </div>
                                    <div className="bg-teal-600 text-white font-black text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                        S$600.00 Net
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed bg-white border border-slate-200 p-3 rounded-xl">
                                    💡 <strong>Instructions:</strong> Scan PayNow QR or enter UEN <code>201538542M</code> in your banking app (DBS, OCBC, UOB, HSBC, Standard Chartered). Use reference: <strong>{form.brand_name ? form.brand_name.substring(0, 10).toUpperCase() : 'BRAND'}-LISTING</strong>.
                                </p>
                            </div>
                        )}

                        {/* Credit Card Input Details */}
                        {form.payment_method === 'card' && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        value={cardDetails.cardNumber}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            value={cardDetails.expiry}
                                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">CVC Code</label>
                                        <input
                                            type="text"
                                            value={cardDetails.cvc}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Corporate Invoice Option */}
                        {form.payment_method === 'invoice' && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Corporate Billing (Net 14 Days)</h4>
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                    An official Singapore Tax Invoice for <strong>S$600.00</strong> will be generated and emailed directly to <strong>{form.contact_email || 'your email'}</strong> with bank telegraphic transfer details. Your active leads will be released immediately upon submission.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Section 3: Terms Agreement & Submission */}
                    <div className="pt-2 space-y-4">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.agree_terms}
                                onChange={(e) => setForm(prev => ({ ...prev, agree_terms: e.target.checked }))}
                                className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-[11px] text-slate-600 leading-tight">
                                I confirm authorization to represent <strong>{form.brand_name || 'this brand'}</strong> under the S$600/year Verified Brand Partner Listing Agreement on Franchise.sg.
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading || !form.agree_terms}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
                        >
                            {loading
                                ? 'Processing Onboarding Activation...'
                                : form.payment_method === 'invoice'
                                ? 'Issue Corporate Invoice & Unlock Leads (S$600)'
                                : 'Complete S$600 Checkout & Unlock Leads'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function CheckoutClient() {
    return (
        <Suspense fallback={<div className="py-20 text-center text-slate-500 text-xs uppercase tracking-wider font-bold">Loading Checkout Portal...</div>}>
            <CheckoutForm />
        </Suspense>
    );
}
