import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Monitor, Phone, MessageCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/Button';
import './Header.css';

export const Header: React.FC = () => {
  const { business: businessConfig } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Our Work', path: '/work' },
    { name: 'Service Area', path: '/service-area' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsappMessage = encodeURIComponent("Hello HI-TECH COMPUTERS, I would like to request computer service.");
  const whatsappUrl = `https://wa.me/${businessConfig.whatsapp.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="header-logo">
          <Monitor className="header-logo-icon" size={28} />
          <span className="header-logo-text">{businessConfig.businessName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <ul className="header-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`header-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions">
          <Button 
            as="a" 
            href={`tel:${businessConfig.phone}`} 
            variant="outline" 
            size="sm"
            icon={<Phone size={16} />}
          >
            Call Now
          </Button>
          <Button 
            as="a" 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp" 
            size="sm"
            icon={<MessageCircle size={16} />}
          >
            WhatsApp
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-nav-actions">
              <Button 
                as="a" 
                href={`tel:${businessConfig.phone}`} 
                variant="outline" 
                fullWidth
                icon={<Phone size={18} />}
              >
                Call Now
              </Button>
              <Button 
                as="a" 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp" 
                fullWidth
                icon={<MessageCircle size={18} />}
              >
                WhatsApp Us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
