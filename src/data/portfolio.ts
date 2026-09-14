export type PortfolioCategory = 'PC_BUILD' | 'REPAIR' | 'UPGRADE' | 'OFFICE_SETUP' | 'PRINTER' | 'OTHER';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  imageUrl: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    category: 'PC_BUILD',
    title: 'Custom Gaming PC',
    description: 'High-performance custom build for gaming and streaming.',
    imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    category: 'OFFICE_SETUP',
    title: 'Small Business Network',
    description: 'Complete office IT setup including networking and workstations.',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    category: 'REPAIR',
    title: 'Laptop Motherboard Repair',
    description: 'Diagnosed and repaired power delivery issues on a business laptop.',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    category: 'UPGRADE',
    title: 'SSD & RAM Upgrade',
    description: 'Breathed new life into an older desktop with solid-state storage and memory expansion.',
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502f75d5814?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p5',
    category: 'PC_BUILD',
    title: 'Architecture Workstation',
    description: 'Heavy-duty workstation optimized for CAD and 3D rendering.',
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p6',
    category: 'REPAIR',
    title: 'Data Recovery',
    description: 'Successfully recovered critical data from a failing hard drive.',
    imageUrl: 'https://images.unsplash.com/photo-1606161280803-b0f946859dd6?auto=format&fit=crop&w=800&q=80'
  }
];
