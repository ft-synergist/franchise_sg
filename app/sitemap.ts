import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

// Explicitly declare dynamic routing parameters for edge processing
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://franchise.sg';

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
        // Execute a direct, decoupled table fetch query bypassing middleware overhead
        const { data: franchises, error } = await supabase
            .from('franchises')
            .select('slug, updated_at')
            .order('created_at', { ascending: false });

        if (error || !franchises || franchises.length === 0) {
            console.warn('Sitemap builder: No rows returned or execution skipped.', error);
            return coreRoutes;
        }

        const dynamicRoutes = franchises.map((item) => ({
            url: `${baseUrl}/franchise/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [...coreRoutes, ...dynamicRoutes];
    } catch (err) {
        console.error('Sitemap fatal exception:', err);
        return coreRoutes;
    }
}