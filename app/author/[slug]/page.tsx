import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EDITORS } from '@/lib/editors';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const editor = EDITORS[params.slug];
    if (!editor) return {};

    return {
        title: `${editor.name} - ${editor.role} | Franchise.sg`,
        description: editor.bio,
    };
}

export default function AuthorProfilePage({ params }: { params: { slug: string } }) {
    const editor = EDITORS[params.slug];

    if (!editor) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        'mainEntity': {
            '@type': 'Person',
            'name': editor.name,
            'jobTitle': editor.role,
            'worksFor': {
                '@type': 'Organization',
                'name': 'Franchise.sg',
                'url': 'https://www.franchise.sg'
            },
            'url': `https://www.franchise.sg/author/${editor.slug}`,
            'description': editor.bio,
            'knowsAbout': editor.specialties
        }
    };

    return (
        <main className="w-full bg-slate-50 min-h-screen text-slate-900 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Link
                        href="/editors"
                        className="text-xs font-black uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors inline-block"
                    >
                        ← Back to Editorial Board
                    </Link>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-teal-700 flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-teal-400 shrink-0">
                            {editor.initials}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">{editor.name}</h1>
                            <p className="text-teal-400 text-sm font-bold mt-1">{editor.role} · Franchise.sg</p>
                            <p className="text-slate-400 text-xs mt-0.5">Vertical Focus: {editor.vertical}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-wider text-slate-600">About the Analyst</h2>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{editor.bio}</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">Primary Research Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                        {editor.specialties.map((topic) => (
                            <span key={topic} className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}