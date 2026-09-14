import { useData } from '../context/DataContext';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import './Contact.css';

const Contact: React.FC = () => {
  const { business: businessConfig } = useData();
  const whatsappMessage = encodeURIComponent("Hello HI-TECH COMPUTERS, I would like to get in touch.");
  const whatsappUrl = `https://wa.me/${businessConfig.whatsapp.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>Contact {businessConfig.businessName} | Call or WhatsApp</title>
        <meta name="description" content="Get in touch with HI-TECH COMPUTERS. We offer on-site computer service and sales in Chennai." />
      </Helmet>
      
      <div className="section container page-header">
        <h1 className="page-title">One Call Away.</h1>
        <p className="page-subtitle">You don't need to find our shop. Tell us where you are and we'll discuss the service.</p>
      </div>

      <div className="container section pt-0">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info-card">
            <h2 className="contact-card-title">Contact Information</h2>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <Phone size={24} className="contact-icon" />
                </div>
                <div>
                  <p className="contact-label">Call Us</p>
                  <a href={`tel:${businessConfig.phone}`} className="contact-value link">{businessConfig.phone}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <Mail size={24} className="contact-icon" />
                </div>
                <div>
                  <p className="contact-label">Email Us</p>
                  <a href={`mailto:${businessConfig.email}`} className="contact-value link">{businessConfig.email}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <Clock size={24} className="contact-icon" />
                </div>
                <div>
                  <p className="contact-label">Business Hours</p>
                  <p className="contact-value">{businessConfig.hours}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <MapPin size={24} className="contact-icon" />
                </div>
                <div>
                  <p className="contact-label">Service Area</p>
                  <p className="contact-value">{businessConfig.serviceArea}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="contact-actions-container">
            <h2 className="contact-card-title">How can we help?</h2>
            <p className="contact-help-text">
              We respond quickly during business hours. For immediate assistance, please call or WhatsApp.
            </p>
            
            <div className="contact-buttons">
              <Button 
                as="a" 
                href={`tel:${businessConfig.phone}`} 
                variant="primary" 
                size="lg"
                icon={<Phone size={20} />}
                fullWidth
              >
                CALL NOW
              </Button>
              
              <Button 
                as="a" 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp" 
                size="lg"
                icon={<MessageCircle size={20} />}
                fullWidth
              >
                WHATSAPP US
              </Button>
              
              <Button 
                as="a" 
                href={`mailto:${businessConfig.email}`} 
                variant="secondary" 
                size="lg"
                icon={<Mail size={20} />}
                fullWidth
              >
                EMAIL US
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
