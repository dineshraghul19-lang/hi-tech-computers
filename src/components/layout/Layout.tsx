import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  // Add any layout specific props here if needed
}

export const Layout: React.FC<LayoutProps> = () => {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>HI-TECH COMPUTERS | Computer Sales & Service in Chennai</title>
        <meta name="description" content="Computer sales, service, custom builds, upgrades and AMC support — delivered where you need us in Chennai." />
      </Helmet>
      
      <Header />
      
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <Outlet />
      </main>
      
      <Footer />
    </>
  );
};
