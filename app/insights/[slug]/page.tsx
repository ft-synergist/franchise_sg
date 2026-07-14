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
        title: `${article.title}`,
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
        : '14 July 2026';

    const isFT = article.author_name?.toLowerCase().includes('ft synergist');
    const displayAuthor = isFT ? 'FT Synergist' : 'Chen Yong Lin';
    const displayRole = isFT ? 'Invited Third-Party Expert' : 'Editor';
    const displayCompany = isFT ? 'Strategic Advisory Panel' : 'Franchise.sg';

    const targetUrl = encodeURIComponent(`https://franchise.sg/insights/${article.slug}`);
    const shareText = encodeURIComponent(`Critical analysis by ${displayAuthor}: ${article.title}`);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': article.title,
        'datePublished': article.created_at || '2026-07-14T08:00:00Z',
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

                    <div className="mb-6 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Singapore Franchise Portal</span>
                    </div>

                    <div className="mb-2">
                        <span className="text-base font-bold uppercase tracking-wider text-teal-400 block">
                            Insights:
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
                        {article.title}
                    </h1>

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

            {/* Core Body Container Framework - FIXED: Renders the actual content string bound to the dynamic slug data query */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 text-base sm:text-lg font-normal leading-relaxed space-y-8 prose prose-slate">
                <div
                    className="whitespace-pre-wrap select-text selection:bg-teal-100"
                    dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />

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