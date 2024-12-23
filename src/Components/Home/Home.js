import React, { useState } from 'react';
import Apikey from '../Api/Apikey';
import Profile from '../Settings/Profile';
import UsageMonth from '../Api/UsageMonth';
import UsageHourly from '../Api/UsageHourly'
import MarqueeBanner from '../Api/MarqueeBanner';
import Header from '../Api/Header';
import Subscription from '../Billing/Subscription';
import UserSubDetails from '../Billing/UserSubDetails';
import Billing from '../Billing/Billing';


const Home = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeSubCategory, setActiveSubCategory] = useState('dashboard');

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
    if (subCategory === 'documentation') {
      window.location.href = 'https://www.superparser.com/documentation';
      return;
    }
    setActiveSubCategory(subCategory);
  };

  const renderDownArrow = (isActive) => (
    <span style={{ 
      float: 'right',
      transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      fontSize: '12px'
    }}>
      +
    </span>
  );

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header />
      <div className="HomeOverview" style={{ display: 'flex', flex: 1 }}>
        <div
          className="sidebar"
          style={{
            backgroundColor: '#f1f1f1',
            borderRight: '1px solid #ddd',
            width: '250px',
            padding: '0 10px 10px 10px'
          }}
        >
          <div
            className={`sidebar-item ${activeCategory === 'home' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('home')}
            style={{
              cursor: 'pointer',
              padding: '10px 20px',
              backgroundColor: activeCategory === 'home' ? '#e6e6e6' : 'transparent',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Home</span>
            {renderDownArrow(activeCategory === 'home')}
          </div>
          
          {activeCategory === 'home' && (
            <div style={{ marginBottom: '12px' }}>
              <div
                className={`sidebar-item ${activeSubCategory === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleSubCategoryClick('dashboard')}
                style={{
                  cursor: 'pointer',
                  padding: '8px 20px 8px 40px',
                  backgroundColor: activeSubCategory === 'dashboard' ? '#e6e6e6' : 'transparent',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}
              >
                Dashboard
              </div>
              <div
                className={`sidebar-item ${activeSubCategory === 'documentation' ? 'active' : ''}`}
                onClick={() => handleSubCategoryClick('documentation')}
                style={{
                  cursor: 'pointer',
                  padding: '8px 20px 8px 40px',
                  backgroundColor: activeSubCategory === 'documentation' ? '#e6e6e6' : 'transparent',
                  fontSize: '14px'
                }}
              >
                Documentation
              </div>
            </div>
          )}

          <div
            className={`sidebar-item ${activeCategory === 'billing' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('billing')}
            style={{
              cursor: 'pointer',
              padding: '10px 20px',
              backgroundColor: activeCategory === 'billing' ? '#e6e6e6' : 'transparent',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Billing</span>
            {renderDownArrow(activeCategory === 'billing')}
          </div>
          
          {activeCategory === 'billing' && (
            <div style={{ marginBottom: '12px' }}>
              <div
                className={`sidebar-item ${activeSubCategory === 'subscriptions' ? 'active' : ''}`}
                onClick={() => handleSubCategoryClick('subscriptions')}
                style={{
                  cursor: 'pointer',
                  padding: '8px 20px 8px 40px',
                  backgroundColor: activeSubCategory === 'subscriptions' ? '#e6e6e6' : 'transparent',
                  fontSize: '14px'
                }}
              >
                Subscriptions
              </div>
            </div>
          )}

          <div
            className={`sidebar-item ${activeCategory === 'settings' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('settings')}
            style={{
              cursor: 'pointer',
              padding: '10px 20px',
              backgroundColor: activeCategory === 'settings' ? '#e6e6e6' : 'transparent',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Settings</span>
            {renderDownArrow(activeCategory === 'settings')}
          </div>
          
          {activeCategory === 'settings' && (
            <div style={{ marginBottom: '12px' }}>
              <div
                className={`sidebar-item ${activeSubCategory === 'profile' ? 'active' : ''}`}
                onClick={() => handleSubCategoryClick('profile')}
                style={{
                  cursor: 'pointer',
                  padding: '8px 20px 8px 40px',
                  backgroundColor: activeSubCategory === 'profile' ? '#e6e6e6' : 'transparent',
                  fontSize: '14px'
                }}
              >
                Profile
              </div>
            </div>
          )}
        </div>

        <div
          className="content"
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#fff'
          }}
        >
          {activeCategory === 'home' && activeSubCategory === 'dashboard' && (
            <div>
              <h2 style={{
                marginTop: '0',
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                Dashboard
              </h2>
              <MarqueeBanner/>
              <Apikey />
              <UsageMonth />
              <UsageHourly />
            </div>
          )}

          {activeCategory === 'billing' && activeSubCategory === 'subscriptions' && (
           <div>
            <h2 style={{
              display:"flex",
              fontSize: '24px',
              fontWeight: '600',
              justifyContent:"center"
            }}>Subscriptions & Billing</h2>
            <MarqueeBanner />
            <h2>Subscription Plans</h2>
            <Subscription/>
            <UserSubDetails/>
            <Billing/>
            </div>
          )}

          {activeCategory === 'settings' && activeSubCategory === 'profile' && (
            <div>
              <h2 style={{
                marginTop: '0',
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                Profile Settings
              </h2>
              <Profile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;