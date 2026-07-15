import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Securely cache the structural map on Edge nodes for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.franchise.sg';

    // 1. Core Active System Footprint Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/insights`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/apply`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    try {
        // 2. Fetch Active Franchise Brand Listings dynamically from Supabase
        const { data: franchises } = await supabase
            .from('franchises')
            .select('slug, updated_at');

        // FIXED: Formatted to broadcast the isolated /franchise/ route parameters to search networks
        const franchiseRoutes: MetadataRoute.Sitemap = (franchises || []).map((item) => ({
            url: `${baseUrl}/franchise/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        // 3. Fallback tracking for static local editorial articles (remains under /insights/)
        const staticEditorialSlugs = [
            'how-to-determine-the-best-food-franchise-to-invest-in-singapore',
            'vending-machine-franchise-analysis-singapore'
        ];

        const editorialRoutes: MetadataRoute.Sitemap = staticEditorialSlugs.map((slug) => ({
            url: `${baseUrl}/insights/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        return [...staticRoutes, ...franchiseRoutes, ...editorialRoutes];
    } catch (error) {
        console.error('Dynamic sitemap sync engine failure:', error);
        return staticRoutes;
    }
}