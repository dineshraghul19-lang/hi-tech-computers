import { useData } from '../context/DataContext';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { portfolioItems } from '../data/portfolio';
import type { PortfolioCategory } from '../data/portfolio';
import './OurWork.css';

const OurWork: React.FC = () => {
  const { business: businessConfig } = useData();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'ALL'>('ALL');

  const filteredItems = activeCategory === 'ALL' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

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

        {filteredItems.length > 0 ? (
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-image-wrapper">
                  <img src={item.imageUrl} alt={item.title} className="gallery-image" loading="lazy" />
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
