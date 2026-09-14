import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { businessConfig as fallbackConfig } from '../config/business';
import { services as fallbackServices, type Service } from '../data/services';

interface BusinessInfo {
  businessName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  serviceArea: string;
  experience: string;
  taglines: {
    primary: string;
    secondary: string;
    optional: string;
  };
}

interface DataContextType {
  business: BusinessInfo;
  services: Service[];
  loading: boolean;
  error: Error | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [business, setBusiness] = useState<BusinessInfo>(fallbackConfig);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Business Info
        const { data: businessData, error: businessError } = await supabase
          .from('business_info')
          .select('*')
          .eq('id', 'main')
          .single();

        if (businessError) throw businessError;

        if (businessData) {
          setBusiness((prev) => ({
            ...prev,
            businessName: businessData.name || prev.businessName,
            phone: businessData.phone || prev.phone,
            email: businessData.email || prev.email,
            hours: businessData.hours || prev.hours,
            whatsapp: businessData.phone ? `+91${businessData.phone}` : prev.whatsapp,
          }));
        }

        // Fetch Services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*');

        if (servicesError) throw servicesError;

        if (servicesData && servicesData.length > 0) {
          const mappedServices = servicesData.map((s: any) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            category: s.category || 'Other',
            iconName: s.icon_name || 'Box',
            ctaText: 'REQUEST SERVICE',
            ctaAction: 'SERVICE'
          })) as Service[];
          
          setServices(mappedServices);
        }
      } catch (err: any) {
        console.error('Error fetching data from Supabase:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ business, services, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
