import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { businessConfig } from '../../config/business';
import { services } from '../../data/services';
import { Button } from '../../components/ui/Button';

const Dashboard: React.FC = () => {
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedMessage('Seeding database...');
    try {
      // 1. Seed Business Info
      const { error: businessError } = await supabase
        .from('business_info')
        .upsert({
          id: 'main',
          name: businessConfig.businessName,
          phone: businessConfig.phone,
          email: businessConfig.email,
          hours: businessConfig.hours
        });

      if (businessError) throw businessError;

      // 2. Seed Services
      const servicesData = services.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon_name: service.iconName
      }));

      const { error: servicesError } = await supabase
        .from('services')
        .upsert(servicesData);

      if (servicesError) throw servicesError;

      setSeedMessage('Successfully seeded database!');
    } catch (error: any) {
      console.error(error);
      setSeedMessage(`Error: ${error.message}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '1rem', color: '#60a5fa' }}>Welcome to Admin CMS</h2>
          <p style={{ color: '#d1d5db', lineHeight: '1.5', marginBottom: '1rem' }}>
            This is your control panel for HI-TECH COMPUTER SOLUTION. From here you can manage your services, update business information, and control what appears on your website.
          </p>
          
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #374151' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'semibold', marginBottom: '0.75rem' }}>Database Setup</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>Click below to push initial static data to Supabase.</p>
            <Button onClick={handleSeedDatabase} disabled={seeding} variant="primary" size="sm">
              {seeding ? 'Processing...' : 'Seed Initial Data'}
            </Button>
            {seedMessage && <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: seedMessage.startsWith('Error') ? '#ef4444' : '#34d399' }}>{seedMessage}</p>}
          </div>
        </div>
        
        <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '1rem', color: '#60a5fa' }}>Quick Stats</h2>
          <ul style={{ color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Services:</span>
              <span style={{ fontWeight: 'bold' }}>14</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Database Status:</span>
              <span style={{ color: '#34d399', fontWeight: 'bold' }}>Supabase Connected</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
