import React from 'react';
import Link from 'next/link';
import { EDITORS } from '@/lib/editors';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Editorial Board & Industry Analysts | Franchise.sg',
    description: 'Meet the market intelligence team and industry vertical editors behind Franchise.sg.',
};

export default function EditorialBoardPage() {
    const editorsList = Object.values(EDITORS);

    return (
        <main className="w-full bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* Header */}
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        Research & Intelligence Desk
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-950">
                        Franchise.sg Editorial Board
                    </h1>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Independent market analysts providing objective unit economics, regulatory compliance, and growth metrics across Singapore’s key franchise verticals.
                    </p>
                </div>

                {/* Editors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {editorsList.map((editor) => (
                        <div
                            key={editor.slug}
                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-teal-700 text-white font-black text-lg flex items-center justify-center shrink-0">
                                        {editor.initials}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-slate-950">
                                            {editor.name}
                                        </h2>
                                        <p className="text-xs font-bold text-teal-700">
                                            {editor.role}
                                        </p>
                                        <p className="text-[11px] font-semibold text-slate-500">
                                            Focus: {editor.vertical}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                                    {editor.bio}
                                </p>
                            </div>

                            <div className="pt-6 mt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                                    Verified Editor
                                </span>
                                <Link
                                    href={`/author/${editor.slug}`}
                                    className="text-xs font-black text-teal-700 hover:text-teal-800 underline underline-offset-2"
                                >
                                    View Profile & Articles →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}