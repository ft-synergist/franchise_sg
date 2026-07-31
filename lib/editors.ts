export interface Editor {
    slug: string;
    name: string;
    role: string;
    vertical: string;
    bio: string;
    initials: string;
    specialties: string[];
}

export const EDITORS: Record<string, Editor> = {
    'chen-yong-lin': {
        slug: 'chen-yong-lin',
        name: 'Chen Yong Lin',
        role: 'Editor-in-Chief & Lead Analyst',
        vertical: 'F&B Unit Economics & Site Selection',
        bio: 'Leads market intelligence and editorial research at Franchise.sg. Focuses on Singapore unit economics, commercial lease structuring, and FDD financial transparency.',
        initials: 'CYL',
        specialties: ['Singapore F&B Unit Economics', 'FDD Disclosures', 'Commercial Lease Negotiation']
    },
    'maggie-png': {
        slug: 'maggie-png',
        name: 'Maggie Png',
        role: 'Commercial Property Strategist',
        vertical: 'Retail Leasing & Commercial Tenancy Law',
        bio: 'Maggie Png is a Commercial Property Strategist based in Singapore, advising business owners, investors, and franchisees on office, industrial, retail, and shophouse leasing and acquisition decisions.',
        initials: 'MP',
        specialties: ['Singapore Retail Leasing', 'CoC Tenancy Compliance', 'GFA vs NLA Lease Audits', 'Commercial Site Acquisition']
    }
};