import React, { useState } from 'react';
import Apikey from '../Api/Apikey';
import Profile from '../Settings/Profile';
import Usage from '../Api/Usage';
import Scroll from '../Api/Scroll';
import Header from '../Api/Header';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeSubCategory, setActiveSubCategory] = useState('dashboard');
  
  const currentPlan = 'Advance';

  

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
              <Scroll plan={currentPlan} />
              <Apikey />
              <Usage />
            </div>
          )}

          {activeCategory === 'billing' && activeSubCategory === 'subscriptions' && (
            <div>
              <h2>Subscriptions</h2>
              <p>Subscription-related content goes here.</p>
              <div>
                <h3>Available Plans:</h3>
                <ul>
                  <li>
                    <strong>Basic - $50/mo</strong>
                    <p>500 credits/month, Rate limit: 5 call/sec</p>
                    <p>Excess usage at $0.1/call</p>
                  </li>
                  <li>
                    <strong>Advance - $100/mo</strong>
                    <p>2000 credits/month, Rate limit: 5 call/sec</p>
                    <p>Excess usage at $0.05/call</p>
                  </li>
                  <li>
                    <strong>Premium - $250/mo</strong>
                    <p>5000 credits/month, Rate limit: 5 call/sec</p>
                    <p>Excess usage at $0.05/call</p>
                  </li>
                </ul>
              </div>
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