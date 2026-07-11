import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
    const baseUrl = 'https://franchise.sg';
    const currentIsoDate = new Date().toISOString();

    // 1. Core Static Platform Routes
    const coreUrls = [
        `  <url>\n    <loc>${baseUrl}</loc>\n    <lastmod>${currentIsoDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
        `  <url>\n    <loc>${baseUrl}/for-sale</loc>\n    <lastmod>${currentIsoDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`,
        `  <url>\n    <loc>${baseUrl}/apply</loc>\n    <lastmod>${currentIsoDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    ];

    let dynamicUrls: string[] = [];

    try {
        // 2. Optimized Fetch Selecting Only the Guaranteed Slug Column
        const { data: franchises, error: supabaseError } = await supabase
            .from('franchises')
            .select('slug');

        if (supabaseError) {
            console.error('Supabase sitemap fetch failure:', supabaseError.message);
        }

        if (franchises && franchises.length > 0) {
            dynamicUrls = franchises.map((item) => {
                return `  <url>\n    <loc>${baseUrl}/franchise/${item.slug}</loc>\n    <lastmod>${currentIsoDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
            });
        }
    } catch (error) {
        console.error('Sitemap unexpected fatal exception:', error);
    }

    // 3. Construct Unified XML Document Payload
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...coreUrls, ...dynamicUrls].join('\n')}
</urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
    });
}