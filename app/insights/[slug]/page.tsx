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

    return (
        <div className="min-h-screen bg-slate-50/50 antialiased font-sans w-full">
            {/* Editorial Content Layout Container */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-left">

                {/* Dynamic Category Badge fixed to Insights */}
                <div className="mb-6">
                    <span className="inline-flex items-center rounded-md bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 ring-1 ring-inset ring-teal-600/20 uppercase tracking-wider">
                        Insights
                    </span>
                </div>

                {/* Unified Title Segment */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-8">
                    {article.title}
                </h1>

                {/* Corporate Contributor Profile Banner */}
                <div className="flex items-center justify-between border border-slate-200/60 bg-white p-5 rounded-2xl shadow-sm mb-12">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contributed By</span>
                        <span className="text-base font-bold text-slate-900">{article.author_name}</span>
                        <span className="text-xs font-medium text-slate-500">{article.author_company}</span>
                    </div>
                </div>

                {/* Strict CSS Target Matrix to override plain rendering layout */}
                <div
                    className="content-layer text-slate-700
            [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-slate-700 [&_p]:mb-6
            [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2
            [&_hr]:my-10 [&_hr]:border-slate-200
            [&_blockquote]:my-8 [&_blockquote]:p-6 [&_blockquote]:rounded-2xl [&_blockquote]:bg-teal-50/40 [&_blockquote]:border [&_blockquote]:border-teal-600/20 [&_blockquote]:text-slate-700 [&_blockquote]:leading-relaxed [&_blockquote]:italic [&_blockquote]:font-medium [&_blockquote]:relative [&_blockquote]:overflow-hidden
            [&_ul]:space-y-4 [&_ul]:mb-8 [&_ul]:list-none [&_ul]:pl-0
            [&_ul_li]:flex [&_ul_li]:items-start [&_ul_li]:gap-3 [&_ul_li]:text-base [&_ul_li]:text-slate-700 [&_ul_li]:leading-relaxed
            [&_pre]:bg-slate-950 [&_pre]:p-6 [&_pre]:rounded-2xl [&_pre]:font-mono [&_pre]:text-xs [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-slate-800 [&_pre]:my-8 [&_pre]:shadow-md [&_pre]:text-emerald-400 [&_pre]:max-w-full
            [&_table]:min-w-full [&_table]:divide-y [&_table]:divide-slate-200 [&_table]:text-sm [&_table]:my-8 [&_table]:border [&_table]:border-slate-200 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_table]:shadow-sm
            [&_thead]:bg-slate-50
            [&_th]:px-5 [&_th]:py-4 [&_th]:text-left [&_th]:font-bold [&_th]:text-slate-900
            [&_tbody]:divide-y [&_tbody]:divide-slate-200 [&_tbody]:text-slate-600 [&_tbody]:bg-white
            [&_td]:px-5 [&_td]:py-4
            [&_strong]:text-slate-900 [&_strong]:font-bold
          "
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </main>
        </div>
    );
}