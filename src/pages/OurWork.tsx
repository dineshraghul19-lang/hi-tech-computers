import { useData } from '../context/DataContext';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import './OurWork.css';

const OurWork: React.FC = () => {
  const { business: businessConfig } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const defaultItems = [
    {
      id: 'default-1',
      title: 'High-End Gaming PC Build',
      description: 'Custom water-cooled gaming rig with RGB lighting and top-tier components.',
      category: 'PC_BUILD',
      image_url: '/images/pc_build.jpg'
    },
    {
      id: 'default-2',
      title: 'Motherboard Component Repair',
      description: 'Micro-soldering and circuit board repair for a damaged motherboard.',
      category: 'REPAIR',
      image_url: '/images/pc_repair.jpg'
    },
    {
      id: 'default-3',
      title: 'Graphics Card Upgrade',
      description: 'Upgrading to a new RTX series graphics card for better gaming performance.',
      category: 'UPGRADE',
      image_url: '/images/pc_upgrade.jpg'
    },
    {
      id: 'default-4',
      title: 'Modern Office Setup',
      description: 'Complete multi-monitor workstation setup for improved productivity.',
      category: 'OFFICE_SETUP',
      image_url: '/images/office_setup.jpg'
    }
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  const filteredItems = activeCategory === 'ALL' 
    ? displayItems 
    : displayItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Work & Portfolio | {businessConfig.businessName}</title>
        <meta name="description" content="View our recent computer repair, custom PC builds, and business IT setup projects." />
      </Helmet>

      <div className="section container page-header">
        <h1 className="page-title">Work We've Done</h1>
        <p className="page-subtitle">Real solutions for real technical problems.</p>
      </div>

      <div className="container section pt-0">
        <div className="dashboard-filters">
          <button className={`filter-btn ${activeCategory === 'ALL' ? 'active' : ''}`} onClick={() => setActiveCategory('ALL')}>All Work</button>
          <button className={`filter-btn ${activeCategory === 'PC_BUILD' ? 'active' : ''}`} onClick={() => setActiveCategory('PC_BUILD')}>PC Builds</button>
          <button className={`filter-btn ${activeCategory === 'REPAIR' ? 'active' : ''}`} onClick={() => setActiveCategory('REPAIR')}>Repairs</button>
          <button className={`filter-btn ${activeCategory === 'UPGRADE' ? 'active' : ''}`} onClick={() => setActiveCategory('UPGRADE')}>Upgrades</button>
          <button className={`filter-btn ${activeCategory === 'OFFICE_SETUP' ? 'active' : ''}`} onClick={() => setActiveCategory('OFFICE_SETUP')}>Office Setup</button>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading projects...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-image-wrapper">
                  <img src={item.image_url} alt={item.title} className="gallery-image" loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="gallery-category">{item.category.replace('_', ' ')}</span>
                  </div>
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-title">{item.title}</h3>
                  <p className="gallery-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No projects found</h3>
            <p>Check back later as we update our portfolio with more recent work.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OurWork;
