import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Trash2 } from 'lucide-react';

export const ManageServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hardware Repair');
  const [iconName, setIconName] = useState('Wrench');
  const [ctaText, setCtaText] = useState('REQUEST SERVICE');
  const [ctaAction, setCtaAction] = useState('SERVICE');

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate a simple unique ID
      const id = 's_' + Math.random().toString(36).substr(2, 9);
      
      const { error: dbError } = await supabase
        .from('services')
        .insert({
          id,
          title,
          description,
          category,
          icon_name: iconName,
          cta_text: ctaText,
          cta_action: ctaAction
        });
        
      if (dbError) throw dbError;
      
      // Reset form
      setTitle('');
      setDescription('');
      
      // Refresh list
      fetchServices();
      alert('Service added successfully!');
      
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Error adding service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const { error: dbError } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
        
      if (dbError) throw dbError;
      
      fetchServices();
    } catch (error: any) {
      console.error(error);
      alert('Error deleting service');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Manage Services</h1>
      
      {/* Add Form */}
      <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#60a5fa' }}>Add New Service</h2>
        
        <form onSubmit={handleAddService} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '800px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Service Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Desktop Hardware Troubleshooting"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }} 
            />
          </div>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea 
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }}
            >
              <option value="Computer Sales">Computer Sales</option>
              <option value="Hardware Repair">Hardware Repair</option>
              <option value="Software & OS">Software & OS</option>
              <option value="Custom PC">Custom PC</option>
              <option value="Used Computers">Used Computers</option>
              <option value="Upgrades">Upgrades</option>
              <option value="Printers & Peripherals">Printers & Peripherals</option>
              <option value="Computer & Internet Security">Computer & Internet Security</option>
              <option value="UPS & Power">UPS & Power</option>
              <option value="Business IT">Business IT</option>
              <option value="AMC">AMC</option>
              <option value="E-Waste">E-Waste</option>
              <option value="PC Spares">PC Spares</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Icon Name (Lucide React)</label>
            <input 
              type="text" 
              required
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              placeholder="e.g., Wrench, Monitor, Laptop"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Button Text</label>
            <input 
              type="text" 
              required
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g., REQUEST SERVICE"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Button Action Type</label>
            <select 
              value={ctaAction}
              onChange={(e) => setCtaAction(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }}
            >
              <option value="SERVICE">Service Request</option>
              <option value="QUOTE">Get Quote</option>
              <option value="AMC">Discuss AMC</option>
              <option value="EWASTE">E-Waste</option>
            </select>
          </div>
          
          <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Service'}
            </Button>
          </div>
        </form>
      </div>

      {/* List */}
      <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#60a5fa' }}>Current Services</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : services.length === 0 ? (
          <p>No services found. Click "Seed Initial Data" on the dashboard to load defaults.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {services.map(service => (
              <div key={service.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827', border: '1px solid #374151', padding: '1rem', borderRadius: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{service.title}</h3>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#374151', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>
                      {service.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#2563eb', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>
                      Icon: {service.icon_name}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>{service.description}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Button: {service.cta_text} ({service.cta_action})
                  </p>
                </div>
                
                <button 
                  onClick={() => handleDelete(service.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServices;
