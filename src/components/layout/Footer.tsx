import { useData } from '../../context/DataContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const { business: businessConfig } = useData();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              <Monitor className="footer-logo-icon" size={24} />
              <span>{businessConfig.businessName}</span>
            </Link>
            <p className="footer-tagline">
              Computer Sales • Service • Custom Builds • Upgrades • AMC
            </p>
            <p className="footer-statement text-gradient">
              {businessConfig.taglines.primary}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/work">Our Work</Link></li>
              <li><Link to="/service-area">Service Area</Link></li>
              <li><Link to="/quote">Request a Quote</Link></li>
              <li><Link to="/about">About Ganesan</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <Phone size={18} />
                <a href={`tel:${businessConfig.phone}`}>{businessConfig.phone}</a>
              </li>
              <li>
                <Mail size={18} />
                <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>
              </li>
              <li>
                <Clock size={18} />
                <span>{businessConfig.hours}</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>{businessConfig.serviceArea}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-note">
            * Large/special projects outside the regular service area may be considered based on requirements.
          </p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {businessConfig.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
