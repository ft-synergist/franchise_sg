import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

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
        .select('title, category, slug')
        .eq('slug', resolvedParams.slug)
        .single();

    if (!article) return {};

    return {
        title: `${article.title}`, // Suffix duplication error completely resolved
        description: `Expert insights on Singapore ${article.category} frameworks, compiled by our commercial network editors.`,
        alternates: {
            canonical: `https://franchise.sg/insights/${article.slug}`,
        },
        openGraph: {
            title: `${article.title}`,
            description: `Expert insights on Singapore ${article.category} frameworks, compiled by our commercial network editors.`,
            url: `https://franchise.sg/insights/${article.slug}`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${article.title}`,
            description: `Expert insights on Singapore ${article.category} frameworks, compiled by our commercial network editors.`,
        }
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
        : '12 July 2026';

    // Fluff-Free Operational Setup variables matching directory hub setup
    const isFT = article.author_name?.toLowerCase().includes('ft synergist');
    const displayAuthor = isFT ? 'FT Synergist' : 'Chen Yong Lin';
    const displayRole = isFT ? 'Invited Third-Party Expert' : 'Editor';
    const displayCompany = isFT ? 'Strategic Advisory Panel' : 'Franchise.sg';

    const targetUrl = encodeURIComponent(`https://franchise.sg/insights/${article.slug}`);
    const shareText = encodeURIComponent(`Critical analysis by ${displayAuthor}: ${article.title}`);

    // Structurally clean JSON-LD Metadata Mapping for AI Engines
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': article.title,
        'datePublished': article.created_at || '2026-07-12T08:00:00Z',
        'inLanguage': 'en-SG',
        'author': {
            '@type': 'Person',
            'name': displayAuthor,
            'jobTitle': displayRole,
            'worksFor': {
                '@type': 'Organization',
                'name': displayCompany
            }
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Franchise.sg',
            'url': 'https://franchise.sg'
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 antialiased font-sans w-full text-left">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Dynamic Header Block */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

                    {/* 100% Uniform Singapore Franchise Portal Standardized Tag */}
                    <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Singapore Franchise Portal</span>
                    </div>

                    {/* Bold Header Prefix Section Injection */}
                    <div className="mb-2">
                        <span className="text-base font-bold uppercase tracking-wider text-teal-400 block">
                            Insights:
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
                        {article.title}
                    </h1>

                    {/* Unified Fluid E-E-A-T Block (Author Identity text completely stripped out) */}
                    <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-xs font-semibold uppercase tracking-wider text-slate-400 border-t border-slate-800/80 mt-8 pt-6">
                        <div>
                            <strong className="text-white font-bold text-sm normal-case">{displayAuthor}</strong>
                            <span className="text-slate-400 font-normal normal-case"> · {displayRole}, {displayCompany}</span>
                        </div>
                        <div className="sm:ml-auto">
                            <span className="text-slate-500 block text-[10px] mb-0.5">Published On</span>
                            <time className="text-slate-200 font-bold normal-case text-sm">{publishDate}</time>
                        </div>
                    </div>

                </div>
            </header>

            {/* Core Body Container Framework */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 text-xl sm:text-2xl font-normal leading-relaxed space-y-8">

                <p className="font-bold text-slate-950 text-2xl sm:text-3xl tracking-tight">
                    Is &quot;100% hands-off passive income&quot; in Singapore officially dead?
                </p>

                <p>If you have been tracking the local automated retail sector over the past 24 months, the short answer is yes. The era of the effortless &quot;vending machine side hustle&quot; has collided with hard legal and economic realities. High-profile enforcement actions have sent shockwaves through the Southeast Asian investment landscape, exposing massive structural vulnerabilities in what many thought was a golden ticket to easy retail margins.</p>

                <p>For legitimate marketplace operators, authentic franchisors, and private capital investors, this isn&apos;t just bad press—it’s a massive systemic shift. Here is an editorial teardown of the fractional micro-franchising collapse, the warning signs smart investors must look for, and the new rules for building an automated retail network that actually survives.</p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-14 mb-4">The Anatomy of a Fractional Franchise Failure</h2>

                <p>The recent reputational shocks rocking Singapore&apos;s retail landscape stem from a fundamental disconnect: <strong className="text-slate-950 font-bold">speculative capital fundraising masquerading as real-world unit economics.</strong></p>

                <p>We have seen this play out with high-profile operational failures. Legal proceedings against operators of schemes like <em>Vendshare</em>—where the director was handed 12 criminal cheating charges over allegations of misleading investors on machine co-ownership fractions—have been extensively tracked by state judicial records. These historical milestones are thoroughly documented across official public domain filings, including documented media briefs from <a href="https://www.straitstimes.com/singapore/courts-crime/raymond-ng-spouse-of-anti-vax-group-founder-handed-12-cheating-charges-linked-to-vending-machines" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-medium underline hover:text-teal-700">The Straits Times</a>, active criminal case tracking via <a href="https://www.channelnewsasia.com/singapore/man-testify-cheated-raymond-ng-vendshare-6237541" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-medium underline hover:text-teal-700">Channel NewsAsia</a>, and formal records logged under State Court Registry index <a href="https://www.elitigation.sg/gdviewer/s/2026_SGDC_136" target="_blank" rel="noopener noreferrer" className="text-teal-600 font-medium underline hover:text-teal-700">2026 SGDC 136</a>.</p>

                <p>When boiled down to its mechanics, the predatory automated retail loop follows a predictable, unsustainable cycle:</p>

                {/* Phase Flow Component Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">Phase 1</span>
                            <h4 className="text-lg font-bold text-white mb-2">High-Yield Arbitrage</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">Digital ads promise completely hands-off 30%+ passive margins to retail entrants.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-1">Phase 2</span>
                            <h4 className="text-lg font-bold text-white mb-2">Fractional Funding</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">Upfront infrastructure asset costs cut into small, accessible co-ownership lots across broad funding pools.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">Phase 3</span>
                            <h4 className="text-lg font-bold text-white mb-2">Deployment Bottlenecks</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">Lack of authenticated, high-traffic prime retail leases prevents physical equipment from ever being installed.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">Phase 4</span>
                            <h4 className="text-lg font-bold text-white mb-2">Operational Ghosting</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">Monthly payouts freeze completely; core management entities scale down operational trace parameters or vanish.</p>
                        </div>
                    </div>
                </div>

                <div className="my-8 p-6 rounded-2xl bg-slate-50 border-l-4 border-teal-600 text-slate-800 font-normal leading-relaxed">
                    &quot;The structural flaw is simple: Vending machines require physical space. Without verified, high-traffic prime leases (such as MRT linkways, major bus interchanges, or busy tertiary institutions), the physical assets either fail to generate product velocity or are never deployed at all. When global payment infrastructures interact with these unvetted operational entities, systemic lag quickly turns into total capital containment. The music stops, the capital loop collapses, and the investor is left holding an invisible share of a non-existent machine.&quot;
                </div>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-14 mb-4">The Macro Ripple Effect Across Southeast Asian Franchising</h2>

                <p>The fallout from these structural collapses is fundamentally changing how private capital interacts with legitimate automation platforms across Asia:</p>

                <ul className="space-y-4 my-6 list-none pl-0">
                    <li className="flex items-start gap-3">
                        <span className="text-teal-600 font-bold select-none mt-0.5">✓</span>
                        <span><strong>Skyrocketing Customer Acquisition Costs (CAC):</strong> Authentic automated brands—like smart fresh-juice concepts, automated unstaffed convenience kiosks, and smart lockers—now face intense skepticism. Sales cycles are longer and more expensive because franchisors must first prove they aren&apos;t a scam before they can even pitch their business model.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-teal-600 font-bold select-none mt-0.5">✓</span>
                        <span><strong>The Regulatory Overlap Trap:</strong> Regulators across Southeast Asia are clamping down. Automated concepts that mirror <strong>Collective Investment Schemes (CIS)</strong> without holding the appropriate financial licenses are facing immediate operational bans, compliance interventions, and legal scrutiny.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-teal-600 font-bold select-none mt-0.5">✓</span>
                        <span><strong>The Flight to Hard Asset Governance:</strong> The market is aggressively rejecting abstract &quot;profit-sharing&quot; slide decks. Smart capital is shifting exclusively toward franchise configurations that offer undeniable physical asset titles, real-time data access, and ironclad escrow frameworks.</span>
                    </li>
                </ul>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-14 mb-4">The Action Plan for Authentic Franchisors</h2>

                <p>To maintain long-term institutional value and attract serious private capital, authentic brands must draw a clear line between their operations and unverified, fractional structures.</p>

                <h3 className="text-2xl font-bold text-slate-950 mt-8 mb-3">1. Enforce Hard Asset Allocation</h3>
                <p>Provide absolute transparency. Every dollar deployed by a franchisee must map directly to a serialized physical machine asset, a verified vendor invoice, and a registered location lease. If an investor buys a machine, they should be able to walk up to it, verify the serial number, and physically inspect the installation.</p>

                <h3 className="text-2xl font-bold text-slate-950 mt-8 mb-3">2. Separate Real Retail Revenue from Tech Arbitrage</h3>
                <p>Prove that network revenue is driven entirely by consumer demand—not by recruiting new incoming network participants. If a brand&apos;s growth depends more on selling &quot;asset lots&quot; to co-owners than on selling physical products to the public, the underlying business model is fundamentally unstable.</p>

                <h3 className="text-2xl font-bold text-slate-950 mt-8 mb-3">3. Implement Independent Data Audits</h3>
                <p>Let legitimate automated brands leverage verified external integrations—such as independent IoT platforms, third-party POS networks, and smart security frameworks. This gives network partners unalterable, real-time proof of actual transaction volumes, completely eliminating the risk of unverified internal reporting.</p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-14 mb-4">The Smart Investor’s Due Diligence Checklist</h2>

                <p>If you are looking to deploy capital safely into the automated retail or vending sector in Singapore and greater Asia, your due diligence must be entirely metrics-driven. Use this risk matrix to evaluate your next investment:</p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 my-8 shadow-sm w-full bg-white">
                    <table className="min-w-full table-fixed border-collapse text-sm sm:text-base">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-4 text-left font-black text-slate-950 uppercase text-xs tracking-wider w-1/4">Risk Element</th>
                                <th className="px-5 py-4 text-left font-bold text-slate-400 uppercase text-xs tracking-wider w-1/3">Predatory Structure</th>
                                <th className="px-5 py-4 text-left font-bold text-teal-700 uppercase text-xs tracking-wider bg-teal-50/20">Institutional Standard</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                            <tr>
                                <td className="px-5 py-5 font-bold text-slate-950">Asset Legal Title</td>
                                <td className="px-5 py-5 text-slate-400 line-through">Abstract fractional &quot;shares&quot;, pooled pools, or software licensing margins.</td>
                                <td className="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">100% Direct Equipment Ownership mapped directly to physical serial numbers.</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 font-bold text-slate-950">Yield Protections</td>
                                <td className="px-5 py-5 text-slate-400 line-through">Guaranteed 30%+ annual cash flows outperforming standard commercial equity benchmarks.</td>
                                <td className="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">Variable unit revenues calculated directly from audited POS transaction logs.</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 font-bold text-slate-950">Site Lease Clarity</td>
                                <td className="px-5 py-5 text-slate-400 line-through">Total operational control with zero physical location disclosure or lease access.</td>
                                <td className="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">Registered site placement agreements counter-signed by commercial building management.</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-5 font-bold text-slate-950">Risk Insulation</td>
                                <td className="px-5 py-5 text-slate-400 line-through">Strict Non-Disclosure Agreements (NDAs) used explicitly to prevent network co-owner communication.</td>
                                <td className="px-5 py-5 font-semibold text-teal-800 bg-teal-50/10">Transparent operator networks with access to live referenceable operational unit logs.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-14 mb-4">The Bottom Line</h2>

                <p>The automated retail sector in Singapore isn&apos;t dying; it is maturing. The purge of predatory, asset-light schemes paves the way for transparent, operationally sound brands to dominate the Asian continent. For the modern investor, the lesson is clear: <strong>look past the promise of passive income and demand to see the physical asset.</strong></p>

                <hr className="my-12 border-slate-200" />

                {/* Share Section Wrapper */}
                <div className="mt-12 p-8 border border-slate-200 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl">
                        <h3 className="text-xl font-bold text-slate-950">Share &amp; Syndicate</h3>
                        <p className="text-base text-slate-500 leading-normal">
                            Help regular business owners and private networks avoid structural scams. Route this expert analysis directly to your commercial groups:
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <a
                                href={`https://api.whatsapp.com/send?text=${shareText}%20--%20${targetUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200"
                            >
                                WhatsApp
                            </a>
                            <a
                                href={`https://t.me/share/url?url=${targetUrl}&text=${shareText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors border border-sky-200"
                            >
                                Telegram
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${targetUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <Link href="/for-sale" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-teal-700 transition-colors duration-200 w-full md:w-auto text-center">
                        Discover Active Deals
                    </Link>
                </div>

            </main>
        </div>
    );
}