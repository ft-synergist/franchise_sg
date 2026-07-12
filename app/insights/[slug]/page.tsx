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
        <div className="min-h-screen bg-white text-slate-950 antialiased selection:bg-teal-500/10 text-left w-full">

            {/* Search & Brand Positioning Header */}
            <header className="bg-gradient-to-r from-teal-900 via-slate-950 to-slate-950 text-white py-20 px-6 border-b border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">

                    <div className="mb-6 flex items-center justify-between">
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

            {/* Main Grid Engine for Editorial Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div
                    className="content-layer text-slate-600 font-normal text-base sm:text-lg leading-relaxed
            [&_p]:mb-6 [&_p]:leading-relaxed
            [&_strong]:text-slate-950 [&_strong]:font-bold
            [&_h2]:text-2xl sm:text-3xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-950 [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-slate-950 [&_h3]:mt-8 [&_h3]:mb-3
            [&_hr]:my-10 [&_hr]:border-slate-200
            
            /* Flowchart Container Box & Monospace Formatting Fix */
            [&_pre]:bg-slate-950 [&_pre]:p-6 [&_pre]:rounded-2xl [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-normal [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-slate-800 [&_pre]:my-8 [&_pre]:shadow-md [&_pre]:text-emerald-400 [&_pre]:whitespace-pre [&_pre]:tracking-normal
            
            /* Callout/Blockquote Formatting Override (No Italics, High Readability) */
            [&_blockquote]:my-8 [&_blockquote]:p-6 [&_blockquote]:rounded-2xl [&_blockquote]:bg-slate-50 [&_blockquote]:border-l-4 [&_blockquote]:border-teal-600 [&_blockquote]:text-slate-700 [&_blockquote]:leading-relaxed [&_blockquote]:not-italic [&_blockquote]:font-normal
            [&_blockquote_p]:not-italic [&_blockquote_p]:text-slate-700
            
            /* Custom list layout rules */
            [&_ul]:space-y-4 [&_ul]:my-6 [&_ul]:list-none [&_ul]:pl-0
            [&_ul_li]:flex [&_ul_li]:items-start [&_ul_li]:gap-3 [&_ul_li]:text-slate-600
            
            /* Matrix table formatting matching your clean homepage aesthetics */
            [&_table]:min-w-full [&_table]:table-fixed [&_table]:border-collapse [&_table]:my-8 [&_table]:text-sm [&_table]:border [&_table]:border-slate-200 [&_table]:rounded-2xl [&_table]:overflow-hidden
            [&_thead]:bg-slate-50 [&_thead]:border-b [&_thead]:border-slate-200
            [&_th]:px-5 [&_th]:py-4 [&_th]:text-left [&_th]:font-bold [&_th]:text-slate-950 [&_th]:uppercase [&_th]:text-xs [&_th]:tracking-wider
            [&_tbody]:divide-y [&_tbody]:divide-slate-200 [&_tbody]:bg-white
            [&_td]:px-5 [&_td]:py-4 [&_td]:align-top [&_td]:leading-relaxed
          "
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </main>

        </div>
    );
}