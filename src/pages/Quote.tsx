import { useData } from '../context/DataContext';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { services } from '../data/services';
import './Forms.css';

const Quote: React.FC = () => {
  const { business: businessConfig } = useData();
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('service');
  
  // Find the preselected service title if it exists
  const initialServiceType = preselectedServiceId 
    ? services.find(s => s.id === preselectedServiceId)?.title || ''
    : '';

  // Determine initial dropdown value
  let mappedInitialType = '';
  if (initialServiceType) {
    if (initialServiceType.includes('Sales') || initialServiceType.includes('Buy') || initialServiceType.includes('Custom')) {
      mappedInitialType = 'Buy a Computer';
    } else if (initialServiceType.includes('AMC')) {
      mappedInitialType = 'AMC';
    } else if (initialServiceType.includes('Upgrade')) {
      mappedInitialType = 'Upgrade';
    } else {
      mappedInitialType = initialServiceType;
    }
  }

  const [formData, setFormData] = useState({
    serviceType: mappedInitialType,
    usage: '',
    brandPreference: '',
    businessName: '',
    systemCount: '1',
    currentSpecs: '',
    name: '',
    phone: '',
    location: '',
    budget: '',
    details: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.serviceType) newErrors.serviceType = 'Please select what you need a quote for';
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.phone.trim()) newErrors.phone = 'Please provide your phone number';
    if (!formData.location.trim()) newErrors.location = 'Please provide your location';
    if (!formData.details.trim()) newErrors.details = 'Please provide details for the quote';
    
    // Conditional validation
    if (formData.serviceType === 'Buy a Computer' && !formData.usage) {
      newErrors.usage = 'Please select usage type';
    }
    if (formData.serviceType === 'AMC' && !formData.businessName.trim()) {
      newErrors.businessName = 'Please provide business/company name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      let extraDetails = '';
      if (formData.serviceType === 'Buy a Computer') {
        extraDetails = `\n*Primary Usage:* ${formData.usage}\n*Brand Preference:* ${formData.brandPreference || 'Any'}`;
      } else if (formData.serviceType === 'AMC') {
        extraDetails = `\n*Business Name:* ${formData.businessName}\n*Number of Systems:* ${formData.systemCount}`;
      } else if (formData.serviceType === 'Upgrade') {
        extraDetails = `\n*Current Specs:* ${formData.currentSpecs || 'Not specified'}`;
      }

      const text = `*Quotation Request*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Location:* ${formData.location}\n\n*Requirement:* ${formData.serviceType}${extraDetails}\n*Budget:* ${formData.budget || 'Not specified'}\n*Details:* ${formData.details}`;
      
      const url = `https://wa.me/${businessConfig.whatsapp.replace('+', '')}?text=${encodeURIComponent(text)}`;
      setWhatsappUrl(url);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Quote Request Ready | {businessConfig.businessName}</title>
        </Helmet>
        <div className="section container form-success-container">
          <div className="form-success-card">
            <h2>Quote Request Ready</h2>
            <p>Your quotation request has been prepared. Please click the button below to send it to us via WhatsApp.</p>
            <Button 
              as="a" 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp" 
              size="lg"
              icon={<MessageCircle size={20} />}
            >
              SEND VIA WHATSAPP
            </Button>
            <button className="btn-text" onClick={() => setIsSubmitted(false)}>
              Edit Request
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Request a Quote | {businessConfig.businessName}</title>
        <meta name="description" content="Request a quotation for computer sales, custom PCs, upgrades, or business IT setups from HI-TECH COMPUTERS." />
      </Helmet>
      
      <div className="section container page-header">
        <h1 className="page-title">Request a Quote</h1>
        <p className="page-subtitle">Provide your requirements and we'll get back to you with pricing details.</p>
      </div>

      <div className="container section pt-0 form-page-container">
        <div className="form-card">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="form-grid">
              
              <div className="form-group full-width">
                <label htmlFor="serviceType">What do you need a quote for? *</label>
                <select 
                  id="serviceType" 
                  name="serviceType" 
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={errors.serviceType ? 'error' : ''}
                >
                  <option value="">Select an option</option>
                  <option value="Buy a Computer">Buy a New/Used Computer</option>
                  <option value="Upgrade">Upgrade Current System</option>
                  <option value="AMC">Annual Maintenance Contract (AMC)</option>
                  <option value="Business IT Setup">Business / Office IT Setup</option>
                  <option value="Printer / Peripherals">Printer or Peripherals</option>
                  <option value="Networking Equipment">Networking / Wi-Fi Equipment</option>
                  <option value="UPS / Power Backup">UPS / Power Backup</option>
                  <option value="Other">Other</option>
                  {/* Keep the mapped ones from URL params if they don't exactly match the options above */}
                  {mappedInitialType && !['Buy a Computer', 'Upgrade', 'AMC', 'Business IT Setup', 'Printer / Peripherals', 'Networking Equipment', 'UPS / Power Backup', 'Other'].includes(mappedInitialType) && (
                    <option value={mappedInitialType}>{mappedInitialType}</option>
                  )}
                </select>
                {errors.serviceType && <span className="error-text">{errors.serviceType}</span>}
              </div>

              {/* Dynamic Flow: Buy a Computer */}
              {formData.serviceType === 'Buy a Computer' && (
                <>
                  <div className="form-group fade-in">
                    <label htmlFor="usage">Primary Usage *</label>
                    <select 
                      id="usage" 
                      name="usage" 
                      value={formData.usage}
                      onChange={handleChange}
                      className={errors.usage ? 'error' : ''}
                    >
                      <option value="">Select usage</option>
                      <option value="Home / Basic use">Home / Basic use</option>
                      <option value="Office / Office work">Office / Business work</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Video Editing / Design">Video Editing / Design</option>
                      <option value="Programming">Programming</option>
                      <option value="Student / Online Classes">Student / Online Classes</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.usage && <span className="error-text">{errors.usage}</span>}
                  </div>
                  <div className="form-group fade-in">
                    <label htmlFor="brandPreference">Brand Preference (Optional)</label>
                    <input 
                      type="text" 
                      id="brandPreference" 
                      name="brandPreference" 
                      value={formData.brandPreference}
                      onChange={handleChange}
                      placeholder="e.g. Dell, HP, Lenovo, Custom Built"
                    />
                  </div>
                </>
              )}

              {/* Dynamic Flow: AMC */}
              {formData.serviceType === 'AMC' && (
                <>
                  <div className="form-group fade-in">
                    <label htmlFor="businessName">Business / Company Name *</label>
                    <input 
                      type="text" 
                      id="businessName" 
                      name="businessName" 
                      value={formData.businessName}
                      onChange={handleChange}
                      className={errors.businessName ? 'error' : ''}
                    />
                    {errors.businessName && <span className="error-text">{errors.businessName}</span>}
                  </div>
                  <div className="form-group fade-in">
                    <label htmlFor="systemCount">Number of Systems</label>
                    <select 
                      id="systemCount" 
                      name="systemCount" 
                      value={formData.systemCount}
                      onChange={handleChange}
                    >
                      <option value="1-5">1 to 5 Systems</option>
                      <option value="6-10">6 to 10 Systems</option>
                      <option value="11-25">11 to 25 Systems</option>
                      <option value="25+">More than 25 Systems</option>
                    </select>
                  </div>
                </>
              )}

              {/* Dynamic Flow: Upgrade */}
              {formData.serviceType === 'Upgrade' && (
                <div className="form-group full-width fade-in">
                  <label htmlFor="currentSpecs">Current PC Specifications (Optional)</label>
                  <input 
                    type="text" 
                    id="currentSpecs" 
                    name="currentSpecs" 
                    value={formData.currentSpecs}
                    onChange={handleChange}
                    placeholder="e.g. Core i3, 4GB RAM, 500GB HDD (Want to add SSD)"
                  />
                </div>
              )}

              {/* Standard Fields */}
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="location">Location *</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? 'error' : ''}
                  placeholder="City / Area"
                />
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="budget">Approximate Budget (Optional)</label>
                <input 
                  type="text" 
                  id="budget" 
                  name="budget" 
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. ₹50,000 or 'As cheap as possible'"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="details">Additional Details *</label>
                <textarea 
                  id="details" 
                  name="details" 
                  rows={4}
                  value={formData.details}
                  onChange={handleChange}
                  className={errors.details ? 'error' : ''}
                  placeholder="Please describe your specific requirements, what you need it for, or any questions..."
                ></textarea>
                {errors.details && <span className="error-text">{errors.details}</span>}
              </div>

            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary" size="lg" icon={<ArrowRight size={18} />} fullWidth>
                REQUEST QUOTE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Quote;
