import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { Service } from '../../data/services';
import './ServiceCard.css';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[service.iconName];

  return (
    <div className="service-card card-hover">
      <div className="service-card-icon-wrapper">
        {IconComponent && <IconComponent size={28} className="service-card-icon" />}
      </div>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.description}</p>
      <div className="service-card-footer">
        <Link 
          to={service.ctaAction === 'SERVICE' ? `/visit?service=${service.id}` : `/quote?service=${service.id}`} 
          className="service-card-link"
        >
          {service.ctaText} <Icons.ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
