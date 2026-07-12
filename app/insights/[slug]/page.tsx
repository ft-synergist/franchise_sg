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
        title: `${article.title}`,
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
        <main className="max-w-4xl mx-auto px-4 py-12">
            {/* Category Badge & Title */}
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                {article.category}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6">
                {article.title}
            </h1>

            {/* Author / Contributor Info Card */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 mb-8">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700">Contributed by: {article.author_name}</span>
                    <span className="text-xs text-slate-500 font-medium">{article.author_company}</span>
                </div>
            </div>

            {/* Article Content Area */}
            <article
                className="prose prose-slate max-w-none prose-teal mt-6 text-slate-800 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </main>
    );
}