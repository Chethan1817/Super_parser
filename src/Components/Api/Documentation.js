import React from 'react';

const Documentation = () => {
  React.useEffect(() => {
    window.location.href = 'https://www.superparser.com/documentation';
  }, []);

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center'
    }}>
      Redirecting to documentation...
    </div>
  );
};

export default Documentation;