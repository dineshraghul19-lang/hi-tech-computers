import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext';
import { ServiceCard } from '../components/ui/ServiceCard';
import { Search } from 'lucide-react';
import './Services.css';

const Services: React.FC = () => {
  const { business: businessConfig, services } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | 'ALL'>('ALL');


  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'ALL' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Computer Sales, Repair & AMC Services | {businessConfig.businessName}</title>
        <meta name="description" content={`Comprehensive computer services by ${businessConfig.businessName}. From hardware repair and new PC sales to business IT setups and Annual Maintenance Contracts.`} />
      </Helmet>
      
      <div className="section container page-header">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">From custom builds to enterprise AMC, we deliver practical technical solutions directly to you.</p>
      </div>

      <div className="container section pt-0">
        <div className="services-controls">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search for a service..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="dashboard-filters" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className={`filter-btn ${activeCategory === 'ALL' ? 'active' : ''}`} onClick={() => setActiveCategory('ALL')}>All</button>
            <button className={`filter-btn ${activeCategory === 'Computer Sales' ? 'active' : ''}`} onClick={() => setActiveCategory('Computer Sales')}>💻 Sales</button>
            <button className={`filter-btn ${activeCategory === 'Hardware Repair' ? 'active' : ''}`} onClick={() => setActiveCategory('Hardware Repair')}>🔧 Hardware</button>
            <button className={`filter-btn ${activeCategory === 'Software & OS' ? 'active' : ''}`} onClick={() => setActiveCategory('Software & OS')}>💿 Software</button>
            <button className={`filter-btn ${activeCategory === 'Upgrades' ? 'active' : ''}`} onClick={() => setActiveCategory('Upgrades')}>⚙️ Upgrades</button>
            <button className={`filter-btn ${activeCategory === 'Custom PC' ? 'active' : ''}`} onClick={() => setActiveCategory('Custom PC')}>🖥️ Custom PC</button>
            <button className={`filter-btn ${activeCategory === 'Used Computers' ? 'active' : ''}`} onClick={() => setActiveCategory('Used Computers')}>♻️ Used PC/Laptop</button>
            <button className={`filter-btn ${activeCategory === 'Printers & Peripherals' ? 'active' : ''}`} onClick={() => setActiveCategory('Printers & Peripherals')}>🖨️ Printers</button>
            <button className={`filter-btn ${activeCategory === 'Computer & Internet Security' ? 'active' : ''}`} onClick={() => setActiveCategory('Computer & Internet Security')}>🛡️ Security</button>
            <button className={`filter-btn ${activeCategory === 'UPS & Power' ? 'active' : ''}`} onClick={() => setActiveCategory('UPS & Power')}>⚡ UPS & Power</button>
            <button className={`filter-btn ${activeCategory === 'Business IT' ? 'active' : ''}`} onClick={() => setActiveCategory('Business IT')}>🏢 Business IT</button>
            <button className={`filter-btn ${activeCategory === 'AMC' ? 'active' : ''}`} onClick={() => setActiveCategory('AMC')}>📋 AMC</button>
            <button className={`filter-btn ${activeCategory === 'E-Waste' ? 'active' : ''}`} onClick={() => setActiveCategory('E-Waste')}>♻️ E-Waste</button>
            <button className={`filter-btn ${activeCategory === 'PC Spares' ? 'active' : ''}`} onClick={() => setActiveCategory('PC Spares')}>🔩 PC Spares</button>
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="services-grid">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No services found</h3>
            <p>We couldn't find any services matching your search criteria. Please try different keywords or browse all categories.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Services;
