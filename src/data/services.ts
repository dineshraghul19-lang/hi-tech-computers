export type ServiceCategory = 
  | 'Computer Sales'
  | 'Hardware Repair'
  | 'Software & OS'
  | 'Custom PC'
  | 'Used Computers'
  | 'Upgrades'
  | 'Printers & Peripherals'
  | 'Computer & Internet Security'
  | 'UPS & Power'
  | 'Business IT'
  | 'AMC'
  | 'E-Waste'
  | 'PC Spares'
  | 'Other';

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  iconName: string; // lucide-react icon name
  ctaText: string;
  ctaAction: 'QUOTE' | 'SERVICE' | 'AMC' | 'EWASTE';
}

export const services: Service[] = [
  // --- HARDWARE REPAIR ---
  {
    id: 'h1',
    title: 'Desktop Hardware Troubleshooting',
    description: 'Hardware diagnosis, repair and replacement depending on the fault and equipment.',
    category: 'Hardware Repair',
    iconName: 'Wrench',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },
  {
    id: 'h2',
    title: 'Laptop Hardware Repair',
    description: 'Laptop component troubleshooting and replacement subject to diagnosis.',
    category: 'Hardware Repair',
    iconName: 'Laptop',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },
  {
    id: 'h3',
    title: 'Motherboard & Component Diagnosis',
    description: 'Component-level service where applicable for motherboards, RAM, Storage, CPU, GPU, and Cooling.',
    category: 'Hardware Repair',
    iconName: 'Cpu',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },

  // --- COMPUTER SALES & CUSTOM PC ---
  {
    id: 's1',
    title: 'New Computer Sales',
    description: 'New desktop computers and laptops tailored to your requirements.',
    category: 'Computer Sales',
    iconName: 'Monitor',
    ctaText: 'REQUEST QUOTE',
    ctaAction: 'QUOTE'
  },
  {
    id: 's2',
    title: 'Custom PC Builds',
    description: 'Built exactly around your budget and specific requirements for home, gaming, or office.',
    category: 'Custom PC',
    iconName: 'Server',
    ctaText: 'REQUEST QUOTE',
    ctaAction: 'QUOTE'
  },
  {
    id: 's3',
    title: 'Used Computers & Laptops',
    description: 'Quality used PCs and laptops depending on current availability.',
    category: 'Used Computers',
    iconName: 'Laptop2',
    ctaText: 'REQUEST QUOTE',
    ctaAction: 'QUOTE'
  },

  // --- PC SPARES & UPGRADES ---
  {
    id: 'u1',
    title: 'PC Spares & Components',
    description: 'Replacement components, accessories, and other compatible parts depending on availability.',
    category: 'PC Spares',
    iconName: 'HardDrive',
    ctaText: 'REQUEST QUOTE',
    ctaAction: 'QUOTE'
  },
  {
    id: 'u2',
    title: 'Hardware Upgrades',
    description: 'Improve your existing computer performance with suitable hardware upgrades.',
    category: 'Upgrades',
    iconName: 'Zap',
    ctaText: 'REQUEST QUOTE',
    ctaAction: 'QUOTE'
  },

  // --- SOFTWARE & OS ---
  {
    id: 'so1',
    title: 'OS Installation & Configuration',
    description: 'Operating system installation, reinstallation, and system configuration.',
    category: 'Software & OS',
    iconName: 'MonitorPlay',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },
  {
    id: 'so2',
    title: 'Software & Application Setup',
    description: 'Installation and setup of legitimately licensed software including Microsoft Office.',
    category: 'Software & OS',
    iconName: 'LayoutTemplate',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },

  // --- SECURITY ---
  {
    id: 'sec1',
    title: 'Antivirus & Malware Support',
    description: 'Improve your computer and internet security with proper security software and configuration.',
    category: 'Computer & Internet Security',
    iconName: 'ShieldCheck',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },

  // --- UPS & POWER ---
  {
    id: 'p1',
    title: 'UPS & Power Support',
    description: 'UPS and related computer power-support services and troubleshooting.',
    category: 'UPS & Power',
    iconName: 'BatteryCharging',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },

  // --- PRINTERS ---
  {
    id: 'pr1',
    title: 'Printers & Peripherals',
    description: 'Printer setup, troubleshooting, and computer peripheral support.',
    category: 'Printers & Peripherals',
    iconName: 'Printer',
    ctaText: 'REQUEST SERVICE',
    ctaAction: 'SERVICE'
  },

  // --- BUSINESS IT & AMC ---
  {
    id: 'b1',
    title: 'Business IT Setup',
    description: 'Multiple-PC setup, office computer installation, and basic network assistance.',
    category: 'Business IT',
    iconName: 'Briefcase',
    ctaText: 'DISCUSS REQUIREMENTS',
    ctaAction: 'QUOTE'
  },
  {
    id: 'b2',
    title: 'Annual Maintenance Contracts (AMC)',
    description: 'From one system to multiple systems. Maintenance support for single users to growing businesses.',
    category: 'AMC',
    iconName: 'Users',
    ctaText: 'DISCUSS AMC',
    ctaAction: 'AMC'
  },

  // --- E-WASTE ---
  {
    id: 'ew1',
    title: 'E-Waste Collection & Purchase',
    description: 'Have unused computers? We accept eligible electronic waste for value, subject to condition.',
    category: 'E-Waste',
    iconName: 'Recycle',
    ctaText: 'CHECK E-WASTE VALUE',
    ctaAction: 'EWASTE'
  }
];
