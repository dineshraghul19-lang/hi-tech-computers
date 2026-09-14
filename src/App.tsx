import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './layouts/AdminLayout';
import { DataProvider } from './context/DataContext';

// Page Placeholders (will be replaced with actual components)
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const OurWork = React.lazy(() => import('./pages/OurWork'));
const ServiceArea = React.lazy(() => import('./pages/ServiceArea'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Quote = React.lazy(() => import('./pages/Quote'));
const Visit = React.lazy(() => import('./pages/Visit'));

// Admin Pages
const AdminLogin = React.lazy(() => import('./pages/admin/Login'));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <DataProvider>
        <BrowserRouter>
          <React.Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', backgroundColor: '#111827' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="work" element={<OurWork />} />
                <Route path="service-area" element={<ServiceArea />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="quote" element={<Quote />} />
                <Route path="visit" element={<Visit />} />
                <Route path="*" element={<div style={{ padding: '8rem 2rem', textAlign: 'center', color: 'white' }}><h2>404 - Page Not Found</h2></div>} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="services" element={<div style={{ color: 'white' }}>Services Management (Coming Soon)</div>} />
              </Route>
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </DataProvider>
    </HelmetProvider>
  );
};

export default App;
