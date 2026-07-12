import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface InsightPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightPageProps) {
    const resolvedParams = await params;
    const { data: article } = await supabase
        .from('articles')
        .select('title, category')
        .eq('slug', resolvedParams.slug)
        .single();

    if (!article) return {};

    return {
        title: `${article.title} | Franchise.sg Insights`,
        description: `Expert insights on Singapore ${article.category} frameworks, written by verified commercial network operators.`,
    };
}

export default async function InsightArticlePage({ params }: InsightPageProps) {
    const resolvedParams = await params;

    const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .single();

    if (!article) {
        notFound();
    }

    const publishDate = article.created_at
        ? new Date(article.created_at).toLocaleDateString('en-SG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'July 12, 2026';

    return (
        <div className="min-h-screen bg-white text-slate-900 antialiased font-sans w-full text-left">

            {/* Search & Brand Positioning Header Banner */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

                    <div className="mb-6">
                        <span className="text-xs font-bold text-teal-300 uppercase tracking-wider bg-teal-500/10 px-3 py-1 rounded-md ring-1 ring-inset ring-teal-500/20">
                            Insights
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-3xl leading-none">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-xs font-semibold uppercase tracking-wider text-slate-400 border-t border-slate-800/80 mt-8 pt-6">
                        <div>
                            <span className="text-slate-500 block text-[10px] mb-0.5">Contributed By</span>
                            <strong className="text-white font-bold text-sm normal-case">{article.author_name}</strong>
                            <span className="text-slate-400 font-normal normal-case"> · {article.author_company}</span>
                        </div>
                        <div className="sm:ml-auto">
                            <span className="text-slate-500 block text-[10px] mb-0.5">Published On</span>
                            <time className="text-slate-200 font-bold normal-case text-sm">{publishDate}</time>
                        </div>
                    </div>

                </div>
            </header>

            {/* Structured Native Grid System - All Copy Fixed at text-xl for Perfect Readability */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 text-xl font-normal leading-relaxed space-y-8">

                <p className="font-medium text-slate-900 text-2xl">Is "100% hands-off passive income" in Singapore officially dead?</p>

                <p>If you have been tracking the local automated retail sector over the past 24 months, the short answer is yes. The era of the effortless "vending machine side hustle" has collided with hard legal and economic realities. High-profile enforcement actions have sent shockwaves through the Southeast Asian investment landscape, exposing massive structural vulnerabilities in what many thought was a golden ticket to easy retail margins.</p>

                <p>For legitimate marketplace operators, authentic franchisors, and private capital investors, this isn't just bad press—it’s a massive systemic shift. Here is an editorial teardown of the fractional micro-franchising collapse, the warning signs smart investors must look for, and the new rules for building an automated retail network that actually survives.</p>

                <hr className="my-10 border-slate-200" />

                <h2 className="text-3xl font-black text-slate-950 tracking-tight mt-12 mb-4">The Anatomy of a Fractional Franchise Failure</h2>

                <p>The recent reputational shocks rocking Singapore's retail landscape stem from a fundamental disconnect: <strong class="text-slate-950 font-bold">speculative capital fundraising masquerading as real-world unit economics.</strong></p>

                <p>We have seen this play out with high-profile operational failures. Legal proceedings against operators of schemes like <em>Vendshare</em>—who faced active cheating charges in Singapore Courts over allegations of misleading investors on machine co-ownership fractions—have pulled back the curtain on the "Fractional Fallacy."</p>

                <p>When boiled down to its mechanics, the predatory automated retail loop follows a predictable, unsustainable cycle:</p>

                {/* Coded Monospace Flowchart Diagram Container - Strictly Locked Spacing Layout */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 my-8 shadow-md overflow-x-auto w-full">
                    <pre className="font-mono text-xs sm:text-xs text-emerald-400 leading-normal tracking-normal whitespace-pre">
                        {`┌─────────────────────────┐        ┌─────────────────────────┐    
│  High-Yield Arbitrage   │        │ Fractionalized Funding  │    
│ Digital ads promise     ├───────>│ Upfront asset costs cut │    
│ hands-off 30%+ passive  │        │ into accessible lots    │    
│ margins.                │        │ across broad pools.     │    
└─────────────────────────┘        └────────────┬────────────┘    
                                                │    
┌─────────────────────────┐        ┌────────────▼────────────┐    
│  Operational Ghosting   │        │ Deployment Bottlenecks  │    
│ Payouts freeze to S$0;  │<───────│ Lack of high-traffic    │    
│ infrastructure entities │        │ leases prevents real    │    
│ scale down or vanish.   │        │ location installation.  │    
└─────────────────────────┘        └─────────────────────────┘`}
                    </pre>
                </div>

                <div className="my-8 p-6 rounded-2xl bg-slate-50 border-l-4 border-teal-600 text-slate-800 text-xl font-normal leading-relaxed">
                    "The structural flaw is simple: Vending machines require physical space. Without verified, high-traffic prime leases (such as MRT linkways, major bus interchanges, or busy tertiary institutions), the physical assets either fail to generate product velocity or are never deployed at all. When global payment infrastructures interact with these unvetted operational entities, systemic lag quickly turns into total capital containment. The music stops, the capital loop collapses, and the investor is left holding an invisible share of a non-existent machine."
                </div>

                <hr className="my-10 border-slate-200" />

                <h2 className="text-3xl font-black text-slate-950 tracking-tight mt-12 mb-4">The Macro Ripple Effect Across Southeast Asian Franchising</h2>

                <p>The fallout from these structural collapses is fundamentally changing how private capital interacts with legitimate automation platforms across Asia:</p>

                <ul class="space-y-4 my-6 list-none pl-0">
                    <li class="flex items-start gap-3">
                        <span class="text-teal-600 font-bold select-none mt-0.5">✓</span>
                        <span><strong>Skyrocketing Customer Acquisition Costs (CAC):</strong> Authentic automated brands—like smart fresh-juice concepts, automated unstaffed convenience kiosks, and smart lockers—now face intense skepticism. Sales cycles are longer and more expensive because franchisors must first prove they aren't a scam before they can even pitch their business model.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-teal-600 font-bold select-none mt-0.5">✓</span>
                        <span><strong>The Regulatory Overlap Trap:</strong> Regulators across Southeast Asia are clamping down. Automated concepts that mirror <strong>Collective Investment Schemes (CIS)</strong> without holding the appropriate financial licenses are facing immediate operational bans, compliance interventions, and legal scrutiny.</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <span class="text-teal-600 font-bold select-none mt-0.5">✓</span>
                        <span><strong>The Flight to Hard Asset Governance:</strong> The market is aggressively rejecting abstract "profit-sharing" slide decks. Smart capital is shifting exclusively toward franchise configurations that offer undeniable physical asset titles, real-time data access, and ironclad escrow frameworks.</span>
                    </li>
                </ul>

                <hr className="my-10 border-slate-200" />

                <h2 className="text-3xl font-black text-slate-950 tracking-tight mt-12 mb-4">The Action Plan for Authentic Franchisors</h2>

                <p>To maintain long-term institutional value and attract serious private capital, authentic brands must draw a clear line between their operations and unverified, fractional structures.</p>

                <h3 class="text-2xl font-bold text-slate-950 mt-8 mb-3">1. Enforce Hard Asset Allocation</h3>
                <p>Provide absolute transparency. Every dollar deployed by a franchisee must map directly to a serialized physical machine asset, a verified vendor invoice, and a registered location lease. If an investor buys a machine, they should be able to walk up to it, verify the serial number, and physically inspect the installation.</p>

                <h3 class="text-2xl font-bold text-slate-950 mt-8 mb-3">2. Separate Real Retail Revenue from Tech Arbitrage</h3>
                <p>Prove that network revenue is driven entirely by consumer demand—not by recruiting new incoming network participants. If a brand's growth depends more on selling "asset lots" to co-owners than on selling physical products to the public, the underlying business model is fundamentally unstable.</p>

                <h3 class="text-2xl font-bold text-slate-950 mt-8 mb-3">3. Implement Independent Data Audits</h3>
                <p>Let legitimate automated brands leverage verified external integrations—such as independent IoT platforms, third-party POS networks, and smart security frameworks. This gives network partners unalterable, real-time proof of actual transaction volumes, completely eliminating the risk of unverified internal reporting.</p>

                <hr className="my-10 border-slate-200" />

                <h2 className="text-3xl font-black text-slate-950 tracking-tight mt-12 mb-4">The Smart Investor’s Due Diligence Checklist</h2>

                <p>If you are looking to deploy capital safely into the automated retail or vending sector in Singapore and greater Asia, your due diligence must be entirely metrics-driven. Use this risk matrix to evaluate your next investment:</p>

                {/* Fully Rendered Clean Data Matrix Grid matching Homepage Showcase Framework */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 my-8 shadow-sm w-full bg-white">
                    <table className="min-w-full table-fixed border-collapse text-sm sm:text-base">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-4 text-left font-black text-slate-950 uppercase text-xs tracking-wider w-1/4">Risk Element</th>
                                <th className="px-5 py-4 text-left font-bold text-slate-500 uppercase text-xs tracking-wider w-1/3">Predatory Structure</th>
                                <th className="px-5 py-4 text-left font-bold text-teal-700 uppercase text-xs tracking-wider bg-teal-50/20">Institutional Standard</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                            <tr>
                                <td class="px-5 py-5 font-bold text-slate-950">Asset Legal Title</td>
                                <td class="px-5 py-5 text-slate-400 line-through">Abstract fractional "shares", pooled pools, or software licensing margins.</td>
                                <td class="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">100% Direct Equipment Ownership mapped directly to physical serial numbers.</td>
                            </tr>
                            <tr>
                                <td class="px-5 py-5 font-bold text-slate-950">Yield Protections</td>
                                <td class="px-5 py-5 text-slate-400 line-through">Guaranteed 30%+ annual cash flows outperforming standard commercial equity benchmarks.</td>
                                <td class="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">Variable unit revenues calculated directly from audited POS transaction logs.</td>
                            </tr>
                            <tr>
                                <td class="px-5 py-5 font-bold text-slate-950">Site Lease Clarity</td>
                                <td class="px-5 py-5 text-slate-400 line-through">Total operational control with zero physical location disclosure or lease access.</td>
                                <td class="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">Registered site placement agreements counter-signed by commercial building management.</td>
                            </tr>
                            <tr>
                                <td class="px-5 py-5 font-bold text-slate-950">Risk Insulation</td>
                                <td class="px-5 py-5 text-slate-400 line-through">Strict Non-Disclosure Agreements (NDAs) used explicitly to prevent network co-owner communication.</td>
                                <td class="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">Transparent operator networks with access to live referenceable operational unit logs.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr className="my-10 border-slate-200" />

                <h2 className="text-3xl font-black text-slate-950 tracking-tight mt-12 mb-4">The Bottom Line</h2>

                <p>The automated retail sector in Singapore isn't dying; it is maturing. The purge of predatory, asset-light schemes paves the way for transparent, operationally sound brands to dominate the Asian continent. For the modern investor, the lesson is clear: <strong>look past the promise of passive income and demand to see the physical asset.</strong></p>

                <hr className="my-10 border-slate-200" />

                <div class="mt-12 p-8 border border-slate-200 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div class="space-y-1">
                        <h3 class="text-lg font-bold text-slate-950">Share &amp; Navigate</h3>
                        <p class="text-sm text-slate-500">If you found this strategic breakdown valuable, share this article with your network of investors navigating the Southeast Asian franchise sector.</p>
                    </div>
                    <a href="/for-sale" class="inline-flex shrink-0 items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-teal-700 transition-colors duration-200">
                        Discover Verified Opportunities
                    </a>
                </div>

            </main>
        </div>
    );
}