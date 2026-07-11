import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
    const baseUrl = 'https://franchise.sg';

    // 1. Ingest Core Platform Routing Infrastructure
    const coreUrls = [
        `  <url>\n    <loc>${baseUrl}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
        `  <url>\n    <loc>${baseUrl}/for-sale</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`,
        `  <url>\n    <loc>${baseUrl}/apply</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    ];

    let dynamicUrls: string[] = [];

    try {
        // 2. Direct Runtime Stream Injection from Supabase Table
        const { data: franchises } = await supabase
            .from('franchises')
            .select('slug, updated_at');

        if (franchises && franchises.length > 0) {
            dynamicUrls = franchises.map((item) => {
                const dateStr = item.updated_at ? new Date(item.updated_at).toISOString() : new Date().toISOString();
                return `  <url>\n    <loc>${baseUrl}/franchise/${item.slug}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
            });
        }
    } catch (error) {
        console.error('Sitemap API Stream Execution Error:', error);
    }

    // 3. Construct Raw XML Schema Document Wrapper
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