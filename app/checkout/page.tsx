import Link from 'next/link';
import CheckoutClient from './CheckoutClient';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Verified Brand Partner Checkout & Onboarding | Franchise.sg',
    description: 'Activate your $600/year Verified Brand Partner listing on Franchise.sg. Route inbound buyer leads directly to your sales team.',
    alternates: {
        canonical: 'https://www.franchise.sg/checkout',
    }
};

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col justify-between w-full text-left">
            <div>
                {/* Header Navbar */}
                <header className="bg-slate-950 border-b border-slate-800 text-white py-6 px-4 sm:px-8">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="font-extrabold text-white text-xl tracking-tight">Franchise.sg</span>
                            <span className="bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                                Partner Onboarding
                            </span>
                        </Link>
                        <div className="text-xs text-slate-400 hidden sm:block">
                            Need help? Contact <a href="mailto:fredtan@ftsynergist.com" className="text-teal-400 font-semibold hover:underline">fredtan@ftsynergist.com</a>
                        </div>
                    </div>
                </header>

                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <CheckoutClient />
                </main>
            </div>

            <Footer />
        </div>
    );
}
