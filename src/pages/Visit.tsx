import { useData } from '../context/DataContext';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import './Forms.css';

const Visit: React.FC = () => {
  const { business: businessConfig } = useData();
  const [formData, setFormData] = useState({
    serviceType: '',
    problemCategory: '',
    systemCount: '1',
    description: '',
    location: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
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
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
    
    const needsProblemCat = ['Repair', 'Software & OS', 'Networking', 'Security'].includes(formData.serviceType);
    if (needsProblemCat && !formData.problemCategory) newErrors.problemCategory = 'Please select the problem type';
    
    if (!formData.description.trim()) newErrors.description = 'Please describe the issue or requirement';
    if (!formData.location.trim()) newErrors.location = 'Please provide your location';
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.phone.trim()) newErrors.phone = 'Please provide your phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const needsProblemCat = ['Repair', 'Software & OS', 'Networking', 'Security'].includes(formData.serviceType);
      const probText = needsProblemCat ? `\n*Problem:* ${formData.problemCategory}` : '';
      
      const text = `*Service Request*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Location:* ${formData.location}\n*Preferred Date/Time:* ${formData.date || 'Any'} ${formData.time || 'Any'}\n\n*Service:* ${formData.serviceType}${probText}\n*Systems count:* ${formData.systemCount}\n*Description:* ${formData.description}`;
      
      const url = `https://wa.me/${businessConfig.whatsapp.replace('+', '')}?text=${encodeURIComponent(text)}`;
      setWhatsappUrl(url);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Request Submitted | {businessConfig.businessName}</title>
        </Helmet>
        <div className="section container form-success-container">
          <div className="form-success-card">
            <h2>Request Ready to Send</h2>
            <p>Your service request has been prepared. Please click the button below to send it to us via WhatsApp.</p>
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

  const isRepairOrSoftware = ['Repair', 'Software & OS', 'Networking', 'Security'].includes(formData.serviceType);

  return (
    <>
      <Helmet>
        <title>Request Service | {businessConfig.businessName}</title>
        <meta name="description" content="Request an on-site computer service, repair, or pickup from HI-TECH COMPUTERS in Chennai." />
      </Helmet>
      
      <div className="section container page-header">
        <h1 className="page-title">Request Service</h1>
        <p className="page-subtitle">Tell us what you need and we'll arrange an on-site diagnosis or pickup.</p>
      </div>

      <div className="container section pt-0 form-page-container">
        <div className="form-card">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="form-grid">
              {/* Step 1 */}
              <div className="form-group full-width">
                <label htmlFor="serviceType">What do you need help with? *</label>
                <select 
                  id="serviceType" 
                  name="serviceType" 
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={errors.serviceType ? 'error' : ''}
                >
                  <option value="">Select an option</option>
                  <option value="Repair">Computer/Hardware Repair</option>
                  <option value="Software & OS">Software / OS Issue</option>
                  <option value="Networking">Networking / Internet</option>
                  <option value="Security">Virus / Security</option>
                  <option value="Setup & Install">New Setup / Installation</option>
                  <option value="AMC">AMC / Maintenance</option>
                  <option value="E-Waste">E-Waste Pickup</option>
                  <option value="Other">Other</option>
                </select>
                {errors.serviceType && <span className="error-text">{errors.serviceType}</span>}
              </div>

              {/* Dynamic Step: Problem Category */}
              {isRepairOrSoftware && (
                <div className="form-group full-width fade-in">
                  <label htmlFor="problemCategory">What's wrong? *</label>
                  <select 
                    id="problemCategory" 
                    name="problemCategory" 
                    value={formData.problemCategory}
                    onChange={handleChange}
                    className={errors.problemCategory ? 'error' : ''}
                  >
                    <option value="">Select the problem</option>
                    <option value="Won't turn on">Won't turn on (No power)</option>
                    <option value="Slow computer">Slow performance / Freezing</option>
                    <option value="Blue screen / system error">Blue screen / System error</option>
                    <option value="No display">PC turns on but no display</option>
                    <option value="Overheating">Overheating / Loud fan</option>
                    <option value="Storage problem">Hard drive / Storage problem</option>
                    <option value="Internet issue">Can't connect to internet</option>
                    <option value="Software issue">Program won't open / install</option>
                    <option value="Virus/security concern">Suspected virus / Malware</option>
                    <option value="Printer issue">Printer not working / connecting</option>
                    <option value="UPS/power issue">UPS / Power backup issue</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.problemCategory && <span className="error-text">{errors.problemCategory}</span>}
                </div>
              )}

              {/* System Count */}
              <div className="form-group full-width">
                <label htmlFor="systemCount">How many systems are involved? *</label>
                <select 
                  id="systemCount" 
                  name="systemCount" 
                  value={formData.systemCount}
                  onChange={handleChange}
                >
                  <option value="1">1 System</option>
                  <option value="2-5">2 to 5 Systems</option>
                  <option value="6-10">6 to 10 Systems</option>
                  <option value="11-25">11 to 25 Systems</option>
                  <option value="25+">More than 25 Systems</option>
                  <option value="Not applicable">Not applicable / Other</option>
                </select>
              </div>

              {/* Step 2 */}
              <div className="form-group full-width">
                <label htmlFor="description">{formData.serviceType === 'E-Waste' ? 'What items need to be picked up? *' : 'Describe the issue or requirement in detail *'}</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'error' : ''}
                  placeholder={formData.serviceType === 'E-Waste' ? 'E.g., 3 old CRT monitors, 2 broken laptops, and a printer...' : 'Please provide details about what needs to be done...'}
                ></textarea>
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              {/* Step 3 */}
              <div className="form-group full-width">
                <label htmlFor="location">Service Location *</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? 'error' : ''}
                  placeholder="Area / Street / Landmark"
                />
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>

              {/* Step 4 & 5 */}
              <div className="form-group">
                <label htmlFor="date">Preferred Date (Optional)</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Preferred Time (Optional)</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>

              {/* Step 6 & 7 */}
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

              {/* Step 8 */}
              <div className="form-group full-width">
                <label htmlFor="email">Email (Optional)</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-notice">
              <AlertCircle size={18} className="notice-icon" />
              <p>On-site diagnosis/visit may involve a minimum service charge. Final charges depend on the work required.</p>
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary" size="lg" icon={<ArrowRight size={18} />} fullWidth>
                REQUEST SERVICE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Visit;
