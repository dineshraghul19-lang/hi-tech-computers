import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Clock, Users, ArrowRight, Building, Monitor, Home as HomeIcon } from 'lucide-react';
import type { ServiceCategory } from '../data/services';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { ServiceCard } from '../components/ui/ServiceCard';
import './Home.css';

const Home: React.FC = () => {
  const { business: businessConfig, services } = useData();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'ALL'>('ALL');

  const featuredIds = ['h1', 's1', 's2', 'b1', 'b2', 'ew1'];
  
  const filteredServices = activeCategory === 'ALL' 
    ? services.filter(s => featuredIds.includes(s.id))
    : services.filter(s => s.category === activeCategory);

  const whatsappMessage = encodeURIComponent("Hello HI-TECH COMPUTERS, I would like to request computer service.");
  const whatsappUrl = `https://wa.me/${businessConfig.whatsapp.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>{businessConfig.businessName} | Computer Sales & Service in Chennai</title>
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="text-gradient">COMPUTER SALES • HARDWARE REPAIR</span><br />
              SERVICE • AMC • IT SUPPORT
            </h1>
            <p className="hero-subtitle">
              FROM ONE PC TO AN ENTIRE OFFICE.
            </p>
            <p className="hero-tagline" style={{ maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Whether you need help with a single home computer or support for multiple systems in a business, HI-TECH COMPUTERS provides practical technical solutions at your location.
            </p>
            <div className="hero-actions">
              <Button 
                as="a" 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp" 
                size="lg"
              >
                WHATSAPP US
              </Button>
              <Button as={Link} to="/visit" variant="primary" size="lg">
                REQUEST SERVICE
              </Button>
              <Button as="a" href={`tel:${businessConfig.phone}`} variant="outline" size="lg" className="hidden-mobile">
                CALL NOW
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <ShieldCheck className="trust-icon" size={32} />
              <div>
                <h4 className="trust-title">25+ YEARS</h4>
                <p className="trust-desc">Hands-on experience</p>
              </div>
            </div>
            <div className="trust-item">
              <MapPin className="trust-icon" size={32} />
              <div>
                <h4 className="trust-title">ON-SITE</h4>
                <p className="trust-desc">We come to you</p>
              </div>
            </div>
            <div className="trust-item">
              <Clock className="trust-icon" size={32} />
              <div>
                <h4 className="trust-title">9 AM – 9 PM</h4>
                <p className="trust-desc">Service hours</p>
              </div>
            </div>
            <div className="trust-item">
              <Users className="trust-icon" size={32} />
              <div>
                <h4 className="trust-title">HOME + BUSINESS</h4>
                <p className="trust-desc">Individuals, offices & firms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scale Visual Section */}
      <section className="scale-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ONE PC OR AN ENTIRE OFFICE.</h2>
            <p className="section-desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Whether it's a single computer at home, a custom-built system, multiple PCs for a growing business, or ongoing AMC support, HI-TECH COMPUTERS takes on jobs according to your requirements.
            </p>
          </div>
          <div className="scale-visual">
            <div className="scale-step">
              <div className="scale-icon-box"><Monitor size={24} /></div>
              <span>ONE PC</span>
            </div>
            <div className="scale-arrow"><ArrowRight size={16} /></div>
            <div className="scale-step">
              <div className="scale-icon-box"><HomeIcon size={24} /></div>
              <span>HOME SETUP</span>
            </div>
            <div className="scale-arrow"><ArrowRight size={16} /></div>
            <div className="scale-step">
              <div className="scale-icon-box"><Users size={24} /></div>
              <span>SMALL OFFICE</span>
            </div>
            <div className="scale-arrow"><ArrowRight size={16} /></div>
            <div className="scale-step">
              <div className="scale-icon-box"><Building size={24} /></div>
              <span>STARTUP / BUSINESS</span>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Button as={Link} to="/quote?type=business" variant="outline" size="lg">
              DISCUSS YOUR BUSINESS REQUIREMENTS
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="dashboard-section section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">WHAT DO YOU NEED?</h2>
            <p className="section-desc">Choose a category to explore our services.</p>
          </div>
          
          <div className="dashboard-filters" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className={`filter-btn ${activeCategory === 'ALL' ? 'active' : ''}`} onClick={() => setActiveCategory('ALL')}>Featured</button>
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

          <div className="services-grid" style={{ marginTop: '2rem' }}>
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {activeCategory === 'ALL' && (
            <div className="text-center" style={{ marginTop: '3rem' }}>
              <Button as={Link} to="/services" variant="primary" size="lg">
                VIEW ALL SERVICES
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Service Area Preview */}
      <section className="service-area-preview section">
        <div className="container">
          <div className="service-area-content">
            <h2 className="section-title">WE COME TO YOU.</h2>
            <p className="service-area-text">
              Based in the Chennai service network, HI-TECH COMPUTERS provides on-site support across Chennai and surrounding areas. Larger or specialized projects outside the regular service area can be discussed based on requirements and budget.
            </p>
            <div className="service-area-tags">
              <span className="tag">CHENNAI</span>
              <span className="tag">PRIMARY SERVICE AREA</span>
              <span className="tag">SURROUNDING AREAS</span>
              <span className="tag">ON-SITE SUPPORT</span>
              <span className="tag">SPECIAL PROJECTS</span>
              <span className="tag">TAMIL NADU / INTERSTATE</span>
            </div>
            <Button as={Link} to="/service-area" variant="primary" icon={<ArrowRight size={18} />}>
              CHECK SERVICE AVAILABILITY
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
