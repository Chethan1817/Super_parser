import React from 'react';

const Header = () => {
    const handleSignOut = () => {
        window.location.href = 'https://developer.superparser.com/login.html';
      };
    
  return (
    <div className="header" style={{
      width: '100%',
      backgroundColor: 'white',
      borderBottom: '1px solid #ddd',
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="logo" style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 250px'
      }}>
        <span style={{
          fontSize: '22px',
          fontWeight: 'bold'
        }}>
          <span style={{ color: '#FFD700' }}>Super</span>
          <span>Parser</span>
        </span>
        
        <button 
          onClick={handleSignOut}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            fontSize: '16px',
            marginLeft: 'auto'
          }}
        >
          <strong>Sign out</strong>
        </button>
      </div>
    </div>
  );
};

export default Header;