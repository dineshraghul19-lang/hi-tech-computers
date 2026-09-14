import { useData } from '../../context/DataContext';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './MapFallback.css';
import { Button } from './Button';

export const MapFallback: React.FC = () => {
  const { business: businessConfig } = useData();
  const [locationQuery, setLocationQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationQuery.trim()) return;
    
    // In a real app with geolocation/Google Maps API, we would check the bounds.
    // For now, we provide the fallback response requested in the instructions.
    setSearchResult("Please contact us on WhatsApp to confirm availability for your location.");
  };

  const whatsappMessage = encodeURIComponent(`Hello HI-TECH COMPUTERS, I would like to confirm if you provide service in ${locationQuery || 'my area'}.`);
  const whatsappUrl = `https://wa.me/${businessConfig.whatsapp.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <div className="map-fallback-container">
      <div className="map-visual-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.1146288629!2d79.92880757788481!3d13.047525471465243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0, minHeight: '350px' }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Service Area - Chennai"
        ></iframe>
      </div>
      
      <div className="service-checker">
        <h3 className="checker-title">Where are you located?</h3>
        <form onSubmit={handleSearch} className="checker-form">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Area / locality / city" 
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <Button type="submit" variant="primary">CHECK AREA</Button>
        </form>

        {searchResult && (
          <div className="checker-result">
            <p>{searchResult}</p>
            <Button 
              as="a" 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="sm"
            >
              Confirm via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
