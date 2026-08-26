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
    },
    'frederick-tan': {
        slug: 'frederick-tan',
        name: 'Frederick Tan',
        role: 'Guest Contributor · Certified Management Consultant',
        vertical: 'Franchise Expansion & IP Commercialization',
        bio: 'Frederick Tan is a Certified Management Consultant and founder of FT Synergist, an accredited Intellectual Property service provider listed on the Singapore GoBusiness IP Grow directory. He advises local Singapore and international brands on franchise expansion, intellectual property commercialization, and go to market strategies.',
        initials: 'FT',
        specialties: ['Franchise System Design', 'Intellectual Property Commercialization', 'Go-To-Market Strategies', 'Cross-Border Master Licensing']
    }
};