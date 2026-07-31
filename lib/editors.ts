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
    // Future editors can be added here easily:
    /*
    'sarah-tan': {
      slug: 'sarah-tan',
      name: 'Sarah Tan',
      role: 'Senior Analyst',
      vertical: 'Education & Children Services',
      bio: 'Specializes in enrichment center operations, licensing frameworks, and preschool franchise valuations in Singapore.',
      initials: 'ST',
      specialties: ['Enrichment Franchises', 'MOE Regulatory Alignment', 'Sub-licensing Models']
    }
    */
};