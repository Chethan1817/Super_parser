// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import DashboardLayout from './Components/Dashboard/DashboardLayout';
import SignIn from './Components/Auth/SignIn';
import VerifyEmail from './Components/Auth/VerifyEmail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('jwt_token');
    setIsAuthenticated(!!token);

    // Add navigation listener
    const handleNavigation = () => {
      const token = localStorage.getItem('jwt_token');
      if (!token && window.location.pathname !== '/verify-email') {
        window.location.href = '/';
      }
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Handle routes
  const renderComponent = () => {
    const path = window.location.pathname;

    if (!isAuthenticated && path !== '/verify-email') {
      return <SignIn />;
    }

    switch (path) {
      case '/verify-email':
        return <VerifyEmail />;
      case '/dashboard':
      case '/':
        return isAuthenticated ? <DashboardLayout /> : <SignIn />;
      default:
        window.location.href = '/';
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderComponent()}
    </div>
  );
}

export default App;