import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, LayoutDashboard, Settings, Image as ImageIcon, MessageSquare } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('master_admin_token') === 'true') {
      setUser({ id: 'master-admin', email: 'ganesansubramanian1969@gmail.com' });
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      if (localStorage.getItem('master_admin_token') === 'true') {
        localStorage.removeItem('master_admin_token');
        setUser(null);
        navigate('/admin/login');
        return;
      }
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111827', color: 'white' }}>
        Loading Admin Area...
      </div>
    );
  }

  // Allow unauthenticated users to view the login page
  if (!user && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  // If user is authenticated and on login page, redirect to dashboard
  if (user && location.pathname === '/admin/login') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If on login page (and not authenticated), just render the Outlet
  if (location.pathname === '/admin/login') {
    return (
      <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
        <Outlet />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#111827', color: 'white' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#1f2937', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '2rem', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#60a5fa' }}>HI-TECH Admin</h2>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => navigate('/admin/dashboard')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
              backgroundColor: location.pathname === '/admin/dashboard' ? '#374151' : 'transparent', 
              color: location.pathname === '/admin/dashboard' ? '#60a5fa' : '#d1d5db',
              border: 'none', borderRadius: '0.375rem', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/admin/services')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
              backgroundColor: location.pathname === '/admin/services' ? '#374151' : 'transparent', 
              color: location.pathname === '/admin/services' ? '#60a5fa' : '#d1d5db',
              border: 'none', borderRadius: '0.375rem', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <Settings size={20} />
            Manage Services
          </button>
          <button 
            onClick={() => navigate('/admin/portfolio')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
              backgroundColor: location.pathname === '/admin/portfolio' ? '#374151' : 'transparent', 
              color: location.pathname === '/admin/portfolio' ? '#60a5fa' : '#d1d5db',
              border: 'none', borderRadius: '0.375rem', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <ImageIcon size={20} />
            Manage Our Work
          </button>
          <button 
            onClick={() => navigate('/admin/reviews')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
              backgroundColor: location.pathname === '/admin/reviews' ? '#374151' : 'transparent', 
              color: location.pathname === '/admin/reviews' ? '#60a5fa' : '#d1d5db',
              border: 'none', borderRadius: '0.375rem', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <MessageSquare size={20} />
            Manage Reviews
          </button>
        </nav>
        <div style={{ borderTop: '1px solid #374151', paddingTop: '1rem' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
              backgroundColor: 'transparent', color: '#ef4444',
              border: 'none', borderRadius: '0.375rem', cursor: 'pointer', textAlign: 'left', width: '100%'
            }}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};
