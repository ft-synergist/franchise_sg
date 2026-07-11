import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://franchise.sg';

    // 1. Core Platform Route Nodes
    const coreRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/for-sale`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/apply`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ];

    try {
        // 2. Dynamic Franchise Record Ingestion (Fetches all 20+ records automatically)
        const { data: franchises } = await supabase
            .from('franchises')
            .select('slug, updated_at');

        if (!franchises) return coreRoutes;

        const dynamicRoutes = franchises.map((item) => ({
            url: `${baseUrl}/franchise/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [...coreRoutes, ...dynamicRoutes];
    } catch (error) {
        console.error('Sitemap streaming error:', error);
        return coreRoutes;
    }
}