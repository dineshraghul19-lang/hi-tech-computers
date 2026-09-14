import { useData } from '../context/DataContext';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapFallback } from '../components/ui/MapFallback';

const ServiceArea: React.FC = () => {
  const { business: businessConfig } = useData();
  return (
    <>
      <Helmet>
        <title>On-Site Computer Service in Chennai | {businessConfig.businessName}</title>
        <meta name="description" content="We provide on-site computer repair and IT support across Chennai and surrounding areas. We come to you." />
      </Helmet>
      
      <div className="section container page-header">
        <h1 className="page-title">Service Area</h1>
        <p className="page-subtitle">Based in Chennai, providing on-site technical support directly to your location.</p>
      </div>

      <div className="container section pt-0">
        <MapFallback />
      </div>
    </>
  );
};

export default ServiceArea;
