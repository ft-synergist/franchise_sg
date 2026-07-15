import Link from 'next/link';
import ApplyForm from './ApplyForm';

export const metadata = {
    title: 'Register Your Franchise Brand | Franchise Singapore Listing Portal',
    description: 'List your franchise business on the authoritative Franchise Singapore directory portal. Connect with vetted family offices, master operators, and private investors.',
    alternates: {
        canonical: 'https://www.franchise.sg/apply',
    },
    openGraph: {
        title: 'Register Your Franchise Brand | Franchise Singapore Listing Portal',
        description: 'List your franchise business on the authoritative Franchise Singapore directory portal. Connect with vetted family offices, master operators, and private investors.',
        url: 'https://www.franchise.sg/apply',
        siteName: 'Franchise Singapore',
        locale: 'en_SG',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Register Your Franchise Brand | Franchise Singapore Listing Portal',
        description: 'List your franchise business on the authoritative Franchise Singapore directory portal.',
    }
};

export default function FranchiseApplyPage() {
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
                        <Link href="/" className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors">
                            ← Return to Franchise Singapore Directory
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
                    {/* Render the interactive Client Form Component */}
                    <ApplyForm />
                </div>
            </main>
        </div>
    );
}