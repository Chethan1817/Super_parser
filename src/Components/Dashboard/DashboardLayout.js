import React, { useState,useEffect } from 'react';
import Header from '../Api/Header';
import MarqueeBanner from '../Api/MarqueeBanner';
import Apikey from '../Api/Apikey';
import UsageMonth from '../Api/UsageMonth';
import UsageHourly from '../Api/UsageDaily';
import Profile from '../Settings/Profile';
import Subscription from '../Billing/Subscription';
import UserSubDetails from '../Billing/UserSubDetails';
import Billing from '../Billing/Billing';
import Documentation from '../Api/Documentation';

const DashboardLayout = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeSubCategory, setActiveSubCategory] = useState('dashboard');

    useEffect(() => {
      if (window.location.hash === '#billing') {
          handleCategoryClick('billing');
          handleSubCategoryClick('subscriptions');
          window.location.hash = ''; 
      }

      const savedCategory = localStorage.getItem('activeCategory');
      const savedSubCategory = localStorage.getItem('activeSubCategory');
      
      if (savedCategory) {
          handleCategoryClick(savedCategory);
          if (savedSubCategory) {
              handleSubCategoryClick(savedSubCategory);
          }
          localStorage.removeItem('activeCategory');
          localStorage.removeItem('activeSubCategory');
      }
  },); 

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      return;
    }
    setActiveCategory(category);
    switch(category) {
      case 'home':
        setActiveSubCategory('dashboard');
        break;
      case 'billing':
        setActiveSubCategory('subscriptions');
        break;
      case 'settings':
        setActiveSubCategory('profile');
        break;
      default:
        setActiveSubCategory(null);
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    setActiveSubCategory(subCategory);
  };

  const renderContent = () => {
    if (activeCategory === 'home' && activeSubCategory === 'dashboard') {
      return (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <MarqueeBanner />
          <Apikey />
          <UsageMonth />
          <UsageHourly />
        </div>
      );
    }
    
    if (activeCategory === 'home' && activeSubCategory === 'documentation') {
      return <Documentation />;
    }
    
    if (activeCategory === 'billing' && activeSubCategory === 'subscriptions') {
      return (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Subscriptions & Billing</h2>
          <MarqueeBanner />
          <h3 className="text-xl font-semibold mb-4">Subscription Plans</h3>
          <Subscription />
          <UserSubDetails />
          <Billing />
        </div>
      );
    }
    
    if (activeCategory === 'settings' && activeSubCategory === 'profile') {
      return (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
          <Profile />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1E2B3C] text-gray-300">
          <nav className="mt-4 px-3">
            {/* Home Section */}
            <div className="mb-2">
              <button
                onClick={() => handleCategoryClick('home')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeCategory === 'home' ? 'bg-[#273548] text-white' : 'hover:bg-[#273548] hover:text-white'
                }`}
              >
                <span className="mr-3">🏠</span>
                <span className="flex-1 text-left">Home</span>
                <span className={`transform transition-transform ${
                  activeCategory === 'home' ? 'rotate-180' : ''
                }`}>▼</span>
              </button>
              
              {activeCategory === 'home' && (
                <div className="ml-9 mt-1 space-y-1">
                  <button
                    onClick={() => handleSubCategoryClick('dashboard')}
                    className={`w-full text-left px-3 py-1 text-sm rounded-md ${
                      activeSubCategory === 'dashboard' ? 'bg-[#273548] text-white' : 'hover:bg-[#273548] hover:text-white'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleSubCategoryClick('documentation')}
                    className={`w-full text-left px-3 py-1 text-sm rounded-md ${
                      activeSubCategory === 'documentation' ? 'bg-[#273548] text-white' : 'hover:bg-[#273548] hover:text-white'
                    }`}
                  >
                    Documentation
                  </button>
                </div>
              )}
            </div>

            {/* Billing Section */}
            <div className="mb-2">
              <button
                onClick={() => handleCategoryClick('billing')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeCategory === 'billing' ? 'bg-[#273548] text-white' : 'hover:bg-[#273548] hover:text-white'
                }`}
              >
                <span className="mr-3">💳</span>
                <span className="flex-1 text-left">Billing</span>
                <span className={`transform transition-transform ${
                  activeCategory === 'billing' ? 'rotate-180' : ''
                }`}>▼</span>
              </button>
              
              {activeCategory === 'billing' && (
                <div className="ml-9 mt-1 space-y-1">
                  <button
                    onClick={() => handleSubCategoryClick('subscriptions')}
                    className={`w-full text-left px-3 py-1 text-sm rounded-md ${
                      activeSubCategory === 'subscriptions' ? 'bg-[#273548] text-white' : 'hover:bg-[#273548] hover:text-white'
                    }`}
                  >
                    Subscriptions
                  </button>
                </div>
              )}
            </div>

            {/* Settings Section */}
            <div className="mb-2">
              <button
                onClick={() => handleCategoryClick('settings')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeCategory === 'settings' ? 'bg-[#273548] text-white' : 'hover:bg-[#273548] hover:text-white'
                }`}
              >
                <span className="mr-3">⚙️</span>
                <span className="flex-1 text-left">Settings</span>
                <span className={`transform transition-transform ${
                  activeCategory === 'settings' ? 'rotate-180' : ''
                }`}>▼</span>
              </button>
              
              {activeCategory === 'settings' && (
                <div className="ml-9 mt-1 space-y-1">
                  <button
                    onClick={() => handleSubCategoryClick('profile')}
                    className={`w-full text-left px-3 py-1 text-sm rounded-md ${
                      activeSubCategory === 'profile' ? 'bg-[#273548] text-white' : 'hover:bg-[#273548] hover:text-white'
                    }`}
                  >
                    Profile
                  </button>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white">
          <div className="py-6 px-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;