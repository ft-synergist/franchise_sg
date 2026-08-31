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
            priority: 0.9,
        },
        {
            url: `${baseUrl}/for-sale`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/editors`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/apply`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/author/chen-yong-lin`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/author/maggie-png`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/author/frederick-tan`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    // Core Categories
    const categorySlugs = [
        'food-beverage',
        'education-enrichment',
        'retail-services',
        'health-wellness',
        'services',
    ];

    const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
        url: `${baseUrl}/categories/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    try {
        // 2. Fetch Active Franchise Brand Listings dynamically from Supabase
        const { data: franchises } = await supabase
            .from('crm_franchises')
            .select('slug, updated_at');

        const franchiseRoutes: MetadataRoute.Sitemap = (franchises || []).map((item) => ({
            url: `${baseUrl}/franchise/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        // 3. Editorial articles tracking (under /insights/)
        const staticEditorialSlugs = [
            'mr-coconut-old-chang-kee-top-food-franchise-costs-singapore',
            'lease-or-own-franchise-commercial-property-singapore',
            'bubble-tea-franchise-singapore-cost-profitability-analysis',
            'foot-traffic-lies-predicts-franchise-unit-survival-singapore',
            'how-to-determine-the-best-food-franchise-to-invest-in-singapore',
            'vending-machine-franchise-analysis-singapore',
            'vending-machine-illusion-singapore-franchise-lease'
        ];

        const editorialRoutes: MetadataRoute.Sitemap = staticEditorialSlugs.map((slug) => ({
            url: `${baseUrl}/insights/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        return [...staticRoutes, ...categoryRoutes, ...franchiseRoutes, ...editorialRoutes];
    } catch (error) {
        console.error('Dynamic sitemap sync engine failure:', error);
        return staticRoutes;
    }
}