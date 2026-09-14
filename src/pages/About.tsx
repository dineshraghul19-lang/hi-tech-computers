import { useData } from '../context/DataContext';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, MapPin, Wrench } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  const { business: businessConfig } = useData();
  return (
    <>
      <Helmet>
        <title>About {businessConfig.businessName} | 25+ Years of Experience</title>
        <meta name="description" content={`Meet ${businessConfig.ownerName}, providing expert computer sales and on-site service with over 25 years of experience.`} />
      </Helmet>
      
      <div className="section container page-header">
        <h1 className="page-title">Meet {businessConfig.ownerName}</h1>
        <p className="page-subtitle">Personal, professional technical support delivered directly to your location.</p>
      </div>

      <div className="container section pt-0">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <img 
              src="/images/owner_photo.jpg" 
              alt="Ganesan Subramanian" 
              className="about-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }}
            />
          </div>
          
          <div className="about-content">
            <h2 className="about-heading">Not a call centre. Not a ticket number.</h2>
            <p className="about-text">
              With more than 25 years of hands-on experience, I provide practical computer sales, service and maintenance support directly to customers at their location.
            </p>
            <p className="about-text">
              At {businessConfig.businessName}, you deal directly with an experienced technician. Whether you are an individual needing a quick laptop repair at home, or a small business requiring a complete office network setup, you get straightforward, honest advice and reliable service.
            </p>
            
            <div className="about-features">
              <div className="about-feature">
                <ShieldCheck className="feature-icon" size={24} />
                <span>25+ years of practical IT experience</span>
              </div>
              <div className="about-feature">
                <MapPin className="feature-icon" size={24} />
                <span>Direct personal on-site service</span>
              </div>
              <div className="about-feature">
                <Wrench className="feature-icon" size={24} />
                <span>Serving both individuals and businesses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
